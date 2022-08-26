

var mongoose = require('mongoose')

var activitiesSchema = mongoose.Schema({
  plage: Boolean,
  neige: Boolean,
  volcan: Boolean,
  safari: Boolean,
  montagne: Boolean
})

var CitiesSchema = mongoose.Schema({
    name: String,
    temperature: Number,
    photo: String,
    description: String,
    climat: String,
    activities: activitiesSchema,
    country: {type: mongoose.Schema.Types.ObjectId, ref: "Countries"},
    destinationCles: Boolean,
    lat: String,
    lng: String,
    

  });
  
  
 var   CitiesModel = mongoose.model('Cities', CitiesSchema);

 module.exports = CitiesModel