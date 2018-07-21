
//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
const express = require('express');
// Nous créons un objet de type Express. 
const app = express();

const conf = require('./conf/conf.json');

// Nous définissons ici les paramètres du serveur.
const hostname = 'localhost'; 

const mongoose = require('mongoose');
mongoose.connect('mongodb://adminRestau:azerty@172.17.0.2/restau');

const userRoute = require('./routes/user.route');

// Autorise XHR cross domain
const cors = require('cors');
// Active XHR cross domain
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//*****
// ROUTER
// Je vous rappelle notre route (/piscines).  
app.get('/checking', function(req, res){
	res.json({
	   "Tutorial": "Welcome to the Node express JWT Tutorial"
	});
 });
app.use('/users', userRoute);

// ROUTER
//*****

// Démarrer le serveur 
app.listen(conf.port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+conf.port); 
});
