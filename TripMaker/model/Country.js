

var mongoose = require('mongoose')

var moyenDeTransportSchema = mongoose.Schema({
  velo: Boolean,
  avion: Boolean,
  train: Boolean,
  voiture: Boolean,
  bateau: Boolean
})

var CountrySchema = mongoose.Schema({
    name: String,
    description: String,
    moyenDeTransport: moyenDeTransportSchema,
    photoDrapeau: String,
    continent: String,
    budget: Number,
  });
  
  
 var   CountriesModel = mongoose.model('Countries', CountrySchema);

 module.exports = CountriesModel