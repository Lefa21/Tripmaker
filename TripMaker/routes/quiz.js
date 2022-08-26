var express = require('express');
var router = express.Router();

var request = require("sync-request")
var API_KEY = "75f0434a1c514d2c52b6e948018f2bae"
var citiesModel = require('../model/Cities');
var UsersModel = require('../model/User')


/* 
          Etape #1 --> Je récupère en BDD les réponses de l'utilisateur
          Etape #2 --> Je tri la base de données en fonction des réponses 
          Etape #3 --> J'appel l'API Open Weather Map pour obtenir les lattitudes et longitudes et je renvoi le résultat
*/


// Etape #1

router.post('/result-quizz/', async function (req, res, next) {

  //on récupére le mail via la page MapResult et le store
  userEmail = req.body.email
  console.log("userEmail", userEmail)

  var userData = await UsersModel.findOne({ email: userEmail }); // req.body.email ?
  console.log("userData", userData);

  // donnée du quizz

  var climat = userData.reponseQuizz[0].climat
  //console.log(climat);

  var continent = userData.reponseQuizz[0].continent
  //console.log(continent);

  var transport = userData.reponseQuizz[0].transport
  console.log("transport  :" + transport);

  var activites = userData.reponseQuizz[0].activites
  //console.log(activites);

  // tri par climat

  var climatTrouves = await citiesModel.find({ climat: climat }).populate('country');
  //console.log(climatTrouves)

  // tri par continent

  var ville = climatTrouves.filter(element => {
    return element.country.continent === continent; //|| element.country.continent === "Europe" || element.country.continent === "Amérique" || element.country.continent === "Océanie";
  })
  //console.log("ville" , ville);  

  // tri par transport 

  var transportTri = ville.filter(element => {
    //console.log("route -transportTri : " + transport + " Comment mettre cette variable dynamiquement dans le filter ? ");
    return element.country.moyenDeTransport[transport] === true;//|| element.country.moyenDeTransport.bateau === true || element.country.moyenDeTransport.voiture===true || element.country.moyenDeTransport.avion ===true || element.country.moyenDeTransport.train ===true; 
  })
  console.log("transport :" + transport);
  //console.log("transportTri" +transportTri);

  // tri par activités

  var activitesTri = transportTri.filter(element => {
    //console.log("route -activitesTri : "+activites + " Comment mettre cette variable dynamiquement dans le filter ? ");
    return element.activities[activites] === true;
  })
  //console.log("activites :"+activites);
  //console.log("activitesTri",activitesTri);

  // Etape #3

  // on appelle l'API Open Weather Map pour récupérer la longitude et la latitude de chaque ville
  var tabcoordonees = []

  for (let i = 0; i < activitesTri.length; i++) {
    console.log(activitesTri[i].name)
    var requete = request(
      "GET", `https://api.openweathermap.org/data/2.5/weather?q=${activitesTri[i].name}&lang=fr&appid=${API_KEY}&units=metric`
    )
    var dataAPI = JSON.parse(requete.body)

    //console.log("Si 404, chercher et supprimer ville ----->",dataAPI)
    //console.log("----->",dataAPI.weather[0].description)

    var cityName = dataAPI.name

    //console.log(cityName)

    console.log("dataAPI.name---->", dataAPI.name);
    var cityDesc = await citiesModel.findOne({ name: cityName })

    //console.log("cityDesc.photo---->",cityDesc.photo);
    //console.log("cityDesc.description------->",cityDesc.description);

    tabcoordonees.push({ lat: dataAPI.coord.lat, lng: dataAPI.coord.lon, name: dataAPI.name, description: cityDesc.description, photo: cityDesc.photo, temperature: dataAPI.main.temp, temps: dataAPI.weather[0].description })
  } console.log("tabcoordonees", tabcoordonees);

  res.json({ LongitudeEtLatitude: tabcoordonees, climat: climat, continent: continent }); // liste des résultats , lngLatContinent:lngLatContinent
});

module.exports = router;

