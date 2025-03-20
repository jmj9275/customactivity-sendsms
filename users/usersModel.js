/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;*/

var userSchema = new Schema({
  telephoneMobile: String,
  codePostalVille: String,
  created_at: Date,
  nomEnquete: String,
  SubscriberKey: String,
});

userSchema.pre("save", function (next) {
  //TODO methode pr user

  next(); // next middleware !!! à qui le tour ?
});

//module.exports = mongoose.model('User', userSchema);
