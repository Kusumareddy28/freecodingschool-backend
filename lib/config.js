
const CONFIG = {
    development: {
    },
    production:{    
    },
    error : {
        message: {
            networkError: "Something went wrong. Please check your network connection", 
            dbError: "Database Error",
            emailConfigError: "Incorrect email transport configuration",
            emailSendError: "Email sending failed",
            favError: "You have already added to your favorite list",
            authorizeErr: "Unauthorized accesss",
            emptyField : () => `${field} is required`
        }
    },
    enc: {
        algorithm: "aes-256-cbc",
        password: "newage"
    },

    jwt_secret: "newage",
    otp_length: 6,
    email: {

        host: "smtp.gmail.com",

        port: 465,

        user: "info@freecoding.info",

        password: "R2VVHe3PsCg24tEh",

        header: `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Free Coding</title>
                    <meta charset="UTF-8">
                </head>
                <body>`,
        footer: `
                <p>Thanks,</p>
                <p>USEE Team</p>
                </body>
                </html>
        `,

        subject: {

            reset_code: 'Password Reset Code'

        }

    }
}

module.exports = CONFIG;
