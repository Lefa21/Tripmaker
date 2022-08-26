var express = require('express');
var router = express.Router();
var UsersModel = require('../model/User')
var bcrypt = require('bcrypt');
var uid2 = require('uid2')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


//enregistrement
router.post('/sign-up', async function (req, res, next) {
  var error = []
  var result = false
  var saveUser = null
  var token = null

  //Regex
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var email = req.body.email.match(regexEmail);

  var regexMdp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  var password = req.body.password.match(regexMdp);

  console.log("mot de passe", password);

  if (email === null) {
    error.push("Votre email n'est pas valide")
  }

  if (password === null) {
    error.push("Votre mot de passe doit contenir au minimum 8 caractère , 1 majuscule, 1 minuscule, 1 chiffre, 1 caracteres spécial.")
  }

  console.log("mot de passe", password);
  console.log("Email", email);




  //chercher l'utilisateur par le mail
  const data = await UsersModel.findOne({
    email: req.body.email
  })

  if (data != null) {
    error.push('utilisateur déjà présent')
  }

  if (req.body.username == ''
    || req.body.email == ''
    || req.body.password == ''
  ) {
    error.push('champs vides!')
  }

  //console.log("Error",error)


  //si le tableau d'erreur est  égale à 0
  if (error.length == 0) {

    var hash = bcrypt.hashSync(req.body.password, 10);
    var newUser = new UsersModel({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      token: uid2(32),
      reponseQuizz:
        [
          {
            climat: req.body.climat,
            continent: req.body.continent,
            transport: req.body.transport,
            activites: req.body.activites,
            budget: req.body.budget
          }
        ]

    })

    saveUser = await newUser.save()


    if (saveUser) {
      result = true
      token = saveUser.token
    }
  }


  res.json({ result, saveUser, error, token })
})






//connexion
router.post('/sign-in', async function (req, res, next) {
  var result = false
  var user = null
  var error = []
  var token = null

  //si l'email et le mot de passe sont vide, renvoie erreur

  if (req.body.email == ''
    || req.body.password == ''
  ) {
    error.push('champs vides!')
  }

  //si pas d'erreur va chercher email dans la base de donnée
  if (error.length == 0) {
    user = await UsersModel.findOne({
      email: req.body.email,
    })

    //si l'user existe alors compare le mdp, sinon renvoie mot de passe incorrect!, si email faux renvoie email incorrect!
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        result = true
        token = user.token
        //console.log("token", token)
      } else {
        result = false
        error.push('mot de passe incorrect!')
      }

    } else {
      error.push('email incorrect!')
    }
  }
  res.json({ result, user, error, token })
});




//tableau de bord
router.post('/dashboard', async function (req, res, next) {

  var user = null

  //on récupére le mail via la page de connexion 
  user = await UsersModel.findOne({
    email: req.body.email,
  })


  res.json({ user });
});



//gestion du mdp
router.put('/modifierMdp', function (req, res, next) {

  //var updateMdp = ""
  //if(mdp modifé){
  //il faut que le mdp respect la regex et soit identique sur les 2 input  et diférent de l'ancien MDP
  //chercher via le token le bon utilisateur 
  // update dans la base de donnée du mdp  en fonction du token utilisateur 

  //var UpdateMDP = "mdp modifié"

  //res.json(UpdateMDP)
  //}else {

  //}
  res.json('respond with a resource');
});



//liste des likes
router.post('/wishlist', function (req, res, next) {

  //ca va etre un tableau 
  //var tabWish = []
  //info de lhotel
  //info de la ville
  //date
  //tarif

  //token
  //res.json(tabWish)
  res.json('respond with a resource');
});



router.delete('/delete-wishlist', function (req, res, next) {


  //on va delete depui la base de donnée via le deleteOne()
  //le supprimer via un filter depui le tableau tabWish creer en haut 


  //token
  //res.json(tabwish)
  res.json('respond with a resource');
});

router.get('/mes-voyages', function (req, res, next) {

  //vat tabOurTravel = [nom de lhotel, prix, date, ville]
  //
  //
  //
  //

  //token
  //res.json(tabOurTravel)
  res.json('respond with a resource');
});


router.post('/logout', function (req, res, next) {
  //deconnexion
  // supprimer le token token

  res.json('respond with a resource');
});
module.exports = router;
