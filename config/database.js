const mongoose = require("mongoose");

// Copia la URL del sitio de mongo DB
const MONGOURI = "mongodb+srv://test:1234@cluster0.zrgp9.mongodb.net/AppWeb4?retryWrites=true&w=majority";

const InitiateMongoServer = async() => {
 try {
 await mongoose.connect(MONGOURI, {
 useNewUrlParser: true
 });
 console.log("Conectado a la BD !!!");
 } catch (e) {
 console.log(e);
 throw e;
 }
};
module.exports = InitiateMongoServer;
