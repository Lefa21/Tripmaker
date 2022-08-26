

var mongoose = require('mongoose')



var wishlistSchema = mongoose.Schema({
    users: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    Name: String,
    Description: String,
    Longitude: Number,
    Latitude: Number,
    Photo: String,
    Temperature:Number,
    Temps:String,
    Climat: String,
    Continent:String,


  });
  
  
 var   WishesModel = mongoose.model('Wishes', wishlistSchema);

 module.exports = WishesModel