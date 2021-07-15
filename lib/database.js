const mongoose = require('mongoose');
let config = require('./config');
const database = () => {
    const db = mongoose.connection;  
    mongoose.connect(process.env.DB_HOSTNAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });  
    db.on('connected', function (err) {
        console.log("Connected to DB");
    });        
    db.on("error",(err) =>{        
        console.log("Database is connected"+err);
    });
    db.on('disconnected', function() {
        console.log('MongoDB disconnected!');
        mongoose.connect(process.env.DB_HOSTNAME, {server:{autoReconnect:true}});
    });
    mongoose.set('debug', true);
}
module.exports ={
    database,
    mongoose
};