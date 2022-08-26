var express = require('express');
var router = express.Router();
var countryModel = require('../model/Country')
var citiesModel = require('../model/Cities');WishesModel
const { isObjectIdOrHexString } = require('mongoose');
var userModel = require('../model/User')
var WishesModel = require('../model/wishlist');

/* GET home page. */
router.get('/', function(req, res, next) {

  //homepage
  //si bouton connexion redirect vers page connexion
  //si bouton quiz redirect vers la page quizz exemple de redirect : redirect(/quiz/questionnaire)
  // si hover sur les cartes ne rien faire 
  res.render('index', { title: 'Express' });
});

router.post("/addToWishList" ,async function(req, res, next) {

  var idUser = await userModel.find({email:req.body.email})
  console.log("idUser[0]._id)",idUser[0]._id);

  var addWishList = new WishesModel( {
    users: idUser[0]._id,
    Name: req.body.name,
    Description: req.body.description,
    Longitude: req.body.lng,
    Latitude: req.body.lat,
    Photo: req.body.photo,
    Temps:req.body.temps,
    Climat: req.body.climat,
    Continent:req.body.continent,
    Temperature:req.body.temperature
  })


  var wishListSaved = await addWishList.save();
  
 console.log("wishListSaved",wishListSaved);

 wishList=[]

 wishList.push({})

console.log("wishList------->",wishList);

  res.json({wishListSaved})
});


//avoir la wishlist du user
router.post("/wishlist" ,async function(req, res, next) {

  var userID = await userModel.find({email:req.body.email})
  console.log("userWishlist[0]._id)",userID[0]._id);

  
  var userWishlist = await WishesModel.find({users:userID[0]._id})
  console.log("userWishlist)",userWishlist);

  res.json({userWishlist})
});


//supprimer la wishlist du user
router.delete("/wishlist" ,async function(req, res, next) {

  var result = false
  var user = await userModel.findOne({ email: req.body.email })
  console.log("req.body ", req.body )

  var deletewishlistes = await WishesModel.deleteOne({users: user._id,
    _id: req.body.id})



console.log(deletewishlistes)

if(deletewishlistes.deletedCount ==1){
  result = true
}

  // if (user !== null) {
  //   user.articles = user.articles.filter(article => article.title !== req.body.title)

  //   var userUpdated = await user.save()
  //   if (userUpdated) {
  //     result = true
  //   }
  // }

  res.json({ result })
});

//creation pays  dans la base de données

// router.post('/addpays', async function(req, res, next) {


//   //exemple
//   var tabPays = [{
//     name: "République Dominicaine",
//     description: "La République dominicaine est un pays des Caraïbes qui partage l'île d'Hispaniola avec Haïti à l'ouest. Elle est connue pour ses plages, ses stations balnéaires et ses golfs. Son territoire se compose de forêt tropicale, de savane et de montagnes dont Pico Duarte, le plus haut sommet des Caraïbes. Saint-Domingue, la capitale, abrite des monuments construits par les Espagnols comme la cathédrale gothique Catedral Primada de America (ou cathédrale Notre-Dame de l'Incarnation) dans le quartier Zona Colonial datant du XVIe siècle.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true

//     },
//     photoDrapeau: "blablabla",
//     continent: "Amérique",
//     budget: 3000,
//   },{
//     name: "Porto Rico",
//     description: "Porto Rico est une île des Caraïbes et un territoire non incorporé des États-Unis dont le paysage est constitué de montagnes, de chutes d'eau et de la forêt tropicale d'El Yunque. À San Juan, la capitale et la plus grande ville de l'île, la région d'Isla Verde est réputée pour ses hôtels, ses bars sur la plage et ses casinos. Le quartier Old San Juan abrite des bâtiments coloniaux espagnols colorés, ainsi que le fort El Morro et La Fortaleza, d'immenses forteresses vieilles de plusieurs siècles.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Amérique",
//     budget: 3000,
//   },{
//     name: "Panama",
//     description: "Le Panama est un pays situé sur l'isthme rattachant l'Amérique centrale et l'Amérique du Sud. Le canal de Panama, célèbre prouesse d'ingénierie, coupe cet isthme en son centre pour relier les océans Atlantique et Pacifique, créant ainsi une voie de navigation essentielle. Dans la capitale du même nom, les gratte-ciel modernes, casinos et discothèques contrastent avec les bâtiments de style colonial du quartier de Casco Viejo et la forêt tropicale du parc naturel métropolitain.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Amérique",
//     budget: 3000,
//   },{
//     name: "Venezuela",
//     description: "Le Venezuela est un pays de la côte nord de l’Amérique du Sud, aux attractions naturelles variées. Le long de sa côte caribéenne se trouvent des îles tropicales de villégiature, dont l'île Margarita et l'archipel de Los Roques. Au nord-ouest s'étend la cordillère des Andes, et la ville coloniale de Mérida, point de départ des visites du parc national Sierra Nevada. Caracas, la capitale, se situe au nord.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Amérique",
//     budget: 3000,
//   },
//   {
//     name: "Suriname",
//     description: "Le Suriname est un petit pays de la côte nord-est de l'Amérique du Sud. On y trouve de grandes zones recouvertes de forêt tropicale, une architecture coloniale hollandaise et une culture métissée. Sur sa côte Atlantique, Paramaribo, sa capitale, abrite des palmeraies à côté du fort Zeelandia, qui protégeait un comptoir commercial du XVIIe siècle. La ville est également dotée de la cathédrale Saints-Pierre-et-Paul, un édifice en bois imposant consacré en 1885.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Amérique",
//     budget: 3000,
//   },
//   {
//     name: "Guatemala",
//     description: "Guatemala est la capitale du Guatemala, en Amérique centrale. Elle est réputée pour son histoire maya, ses hautes altitudes et les volcans de ses environs. Sur la Plaza Mayor dans le centre, également appelée Parque Central, la Cathédrale métropolitaine présente des peintures coloniales et des sculptures religieuses. Le Palais national de la culture offre une vue sur la place depuis son balcon. Dans le sud de la ville, des sentiers de randonnée mènent au volcan actif Pacaya.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Amérique",
//     budget: 3000,
//   },
//   {
//     name: "Nicaragua",
//     description: "Le Nicaragua, entre l'océan Pacifique et la mer des Caraïbes, est un pays d'Amérique centrale connu pour la force de son relief formé de lacs, de volcans et de plages. Le grand lac Managua et l'emblématique stratovolcan Momotombo se trouvent au nord de la capitale, Managua. Au sud, la ville de Granada se distingue par son architecture coloniale hispanique et un archipel d'îlots navigables et peuplés d'oiseaux tropicaux.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Amérique",
//     budget: 3000,
//   },
//   {
//     name: "Guyane Française",
//     description: "La Guyane française est une région d'outre-mer située sur la côte nord-est de l'Amérique du Sud, couverte en grande partie de forêt tropicale. Les ruines du fort Cépérou, datant du XVIIe siècle, surplombent la capitale, Cayenne, ses maisons créoles colorées et ses marchés de rue. Des boutiques et des cafés entourent la place principale dite des Palmistes qui tire son nom des nombreux palmiers qui s'y élèvent. La banlieue de Remire-Montjoly est bordée de plages donnant sur l'océan Atlantique.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Amérique",
//     budget: 3000,
//   },
//   {
//     name: "Bolivie",
//     description: "La Bolivie est un pays d’Amérique du Sud qui dispose d’une géographie variée : on y trouve aussi bien la vaste cordillère des Andes, que le désert d’Atacama, ou la forêt tropicale du bassin amazonien. Sa capitale administrative, La Paz, est perchée à plus de 3 500 m d’altitude sur la plaine de l’Altiplano, surplombée par le mont Illimani enneigé en arrière-plan. Non loin de là se trouvent les eaux calmes du lac Titicaca, le plus grand lac du continent, traversé par la frontière entre la Bolivie et le Pérou.",
//     moyenDeTransport: {
//       velo: false,
//       avion: true,
//       train: false,
//       voiture: false,
//       bateau: true
//     },
//     photoDrapeau: "blablabla",
//     continent: "Amérique",
//     budget: 3000,
//   }
// ]


//   for(i =0; i<tabPays.length; i++){
//     let newPays=  new countryModel({
//       name: tabPays[i].name,
//     description:  tabPays[i].description,
//     moyenDeTransport:  tabPays[i].moyenDeTransport,
//     photoDrapeau: tabPays[i].photoDrapeau,
//     continent: tabPays[i].continent,
//     budget: tabPays[i].budget,
//     })

  
//     var countrySaved = await newPays.save()

//   }
  
//   res.json('respond with a resource');
// });




//creation ville  dans la base de données

// router.post('/addcities', async function(req, res, next) {
// var idCountry = await countryModel.find({name: "Bolivie"})
// console.log(idCountry[0]._id)
  
//   var tabcities = [
//     {
//     name: "Departamento de Cochabamba",
//     temperature: 10,
//     photo: "blabla",
//     description: "Cochabamba est une ville de Bolivie, siège du Parlement sud-américain, capitale du département de Cochabamba et de la province de Cercado. Elle est située à 234 km au sud-est de La Paz.",
//     climat: "tropical",
//     activities: {
//       plage: false,
//       neige: false,
//       volcan: false,
//       safari: true,
//       montagne: true
//     },
//     country: idCountry[0]._id,
//     destinationCles: false,
//   }, {
//     name: "Departamento de Oruro",
//     temperature: 10,
//     photo: "blabla",
//     description: "Le département d'Oruro est un département de l'ouest de la Bolivie, situé dans les Andes. Sa capitale est la ville d'Oruro. Sa population s'élève à 494 587 habitants en 2012. Le département est créé le 5 septembre 1826 par un décret du président Antonio José de Sucre.",
//     climat: "tropical",
//     activities: {
//       plage: true,
//       neige: false,
//       volcan: false,
//       safari: false,
//       montagne: true
//     },
//     country: idCountry[0]._id,
//     destinationCles: false,
//   },{
//     name: "Departamento de Tarija",
//     temperature: 10,
//     photo: "blabla",
//     description: "Le département de Tarija est un département du sud de la Bolivie. Sa capitale est la ville de Tarija.",
//     climat: "tropical",
//     activities: {
//       plage: false,
//       neige: false,
//       volcan: false,
//       safari: true,
//       montagne: true
//     },
//     country: idCountry[0]._id,
//     destinationCles: false,
//   },
// ]


//   for(i =0; i<tabcities.length; i++){
//     let newCities=  new citiesModel({

//       name: tabcities[i].name,
//     temperature: tabcities[i].temperature,
//     photo: tabcities[i].photo,
//     description: tabcities[i].description,
//     climat: tabcities[i].climat,
//     activities: tabcities[i].activities,
//     country: tabcities[i].country,
//     destinationCles: tabcities[i].destinationCles,

//     })

//     var citieSaved = await newCities.save()


//   }
//   console.log(citieSaved)
  
//   res.json(idCountry);
// });



//effacer les users
router.delete('/deleteUser', async function(req, res, next) {




  var deleteUser = await userModel.deleteMany()

  //console.log(deleteMovie)

    res.json({result: true});
  });



module.exports = router;
