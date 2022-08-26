
var mongoose = require('mongoose')

// useNewUrlParser ;)
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://tripMakerAdmins:I5lcT4J4fGUge0BA@tripmakercluster.qdvyl.mongodb.net/tripmaker?retryWrites=true&w=majority',
options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('connexion à la base de donnée réussi ');
    }
   }
);
