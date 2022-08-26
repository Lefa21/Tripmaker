

var mongoose = require('mongoose')

var réponseQuizzSchema = mongoose.Schema({
  climat: String,
  continent: String,
  transport: String,
  activites: String,
  budget: String
})



var usersSchema = mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    token: String, 
    
    reponseQuizz: [réponseQuizzSchema]
  });
  
  
 var   UsersModel = mongoose.model('Users', usersSchema);

 module.exports = UsersModel