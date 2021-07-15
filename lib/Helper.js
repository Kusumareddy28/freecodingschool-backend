const config = require('./config');

const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const nodeMailer = require('nodemailer');
const { validationResult } = require('express-validator'); 
jsonfile = require('jsonfile');
class Helper {
    constructor() {  }  
 
    encryptPassword(password = new String()) {
  		if (password != undefined) {
  			let cipher = crypto.createCipher(config.enc.algorithm, config.enc.password);
  			let crypted = cipher.update(password, 'utf8', 'hex');
  			crypted += cipher.final('hex');
  			return crypted;
  		} else return;
    }

    decryptPassword(encrypted = new String()) {
		if (encrypted != undefined) {
			let decipher = crypto.createDecipher(config.enc.algorithm, config.enc.password);
			let dec = decipher.update(encrypted, 'hex', 'utf8');
			dec += decipher.final('utf8');
			return dec;
		} else return;
    }

    generateJWT(details = new Object()){

        if(details){

            let token = jwt.sign(JSON.parse(JSON.stringify(details)), config.jwt_secret, {
                expiresIn: 2592000
            })


            return token;

        } else {

            return;

        }

    }   
    expressValidation(){
        const validation = validationResult.withDefaults({
        formatter: function(param, msg, value) {
            var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;
      
          while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
          }
          return {
            param : formParam,
            msg   : msg,
            value : value
          };
        }});
        return validation;
    }
    

    send(to, subject, html){

        return new Promise((resolve, reject) => {
            let transporter = nodeMailer.createTransport({
                service: 'Gmail',
                pool: true,
                host: config.email.host,
                port: config.email.port,
                secure: true,
                auth: {
                    user: config.email.user,
                    pass: config.email.password
                }

            });

            transporter.verify((err, success) => {
                console.log(err);
                if(err){
                    reject(new Error(config.error.message.emailConfigError));
                    return;
                }

                let mailOptions = {
                    from: '"' + config.appName + '" <' + config.email.user + '>',
                    to: to,
                    subject: subject,
                    html: `${config.email.header} ${html} ${config.email.footer}`
                }

                transporter.sendMail(mailOptions, (err, success) => {

                    if(err){
                        reject(new Error(config.error.message.emailSendError));
                        return;
                    }

                    resolve(success);

                })

            })

        })

    }
    validateToken(token = ''){

        return new Promise((resolve, reject) => {

            if(token) {

                jwt.verify(token, config.jwt_secret, (err, decoded) => {

                    if(err) {
                        if(err.name == 'TokenExpiredError'){

                            let originalDecoded = jwt.decode(token, {complete: true});


                            let newdecoded = originalDecoded.payload;

                             let user = newdecoded;

                            delete user['exp']; delete user['iat'];





                                var refreshed = jwt.sign(user, config.jwt_secret, {
                                    expiresIn: 60
                                });

                                newdecoded.newToken = refreshed;

                                resolve(newdecoded);
                         }

                     }
                    resolve(decoded);
                });

            } else reject(new Error(config.error.message.tokenMissing));

        })

    }
}

module.exports = Helper;
