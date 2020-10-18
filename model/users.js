var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
 email: {
 type: String,
 required: true,
 unique: 1,
 trim: true
 },
 password: {
 type: String,
 required: true,
 minlength: 6
 }
});

module.exports = mongoose.model('User', userSchema);

