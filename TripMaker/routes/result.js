var express = require('express');
var router = express.Router();
var request = require('sync-request');




// page des resultats
router.get('/result-country', function(req, res, next) {
    //tabPays[]
    //liste des pays avec redirect vers liste des ville  result-cities si le bouton voir les ville est cliqué
  //res.json(tabPays)
    res.json('index', { title: 'Express' });
});

router.get('/result-cities', function(req, res, next) {
    //tabVille = []
    //liste des ville redirect vers hotel  result-hotel ssi le btn des hotel est cliqué
 //res.json(tabVille)
    res.json('index', { title: 'Express' });
});


//listes des hotels

router.get('/result-hotel', function(req, res, next) {


  var requete = request("GET",) //api de l'hotel
  var dataAPI = JSON.parse(requete.body)


    //creer une api avec des variables 
    //tabHotel=[nom, desc, prix, villes]

    
    //redirect  vers route reservation sil clique sur le bouton reserver
  //res.json(tabHotel)
    res.json('index', { title: 'Express' });
});


router.get('/reservation', function(req, res, next) {

   //page reservation en récupérant les info de lhotel dans la carte hotel 
    //nom
    //nombre de personnes mettre un select
    //prix Total en recupérant le prix sur l'api
    //villes?
    
    //redirect  vers stripe

  res.json('index', { title: 'Express' });
});


module.exports = router;
