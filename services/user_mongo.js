// Récupération du client mongodb
var mongoClient = require('mongodb').MongoClient;


//  This is a Constructor function taking age and passport 

//  as the paramaters
function UserMongo(conf) {
    // Récupération du client mongodb
    this.mongoClient = require('mongodb').MongoClient;

    // Configuration
    this.conf = conf;

    // Paramètres de connexion
    this.url = 'mongodb://'+conf.mongodbLogin+':'+conf.mongodbPassword+'@'+conf.ip+'/'+conf.mongodb;
    console.log('>> URL '+this.url);

    //*****
    // Initialisation des champs
    this.querySearch = ['login', 'firstname', 'lastname'];
    // Initialisation des champs
    //*****
}
  
//*****
// getUser
UserMongo.prototype.getUser = function(req) {
    //=====
    // porte des variables
    client  = this.client;
    url     = this.url;
    querySearch = this.querySearch;
    // porte des variables
    //=====

    //*****
    // PROMISE
    return new Promise(function(resolve, reject) {

        // Connexion au serveur avec la méthode connect
        mongoClient.connect(this.url, function (err, db) {
            if (err) {
                return console.error('Connection failed', err);
            }
            console.log('Connection successful on ', url);

            //=====
            // conf connexion DB
            const myAwesomeDB = db.db('restau')
            try {
                // Récupération de la collection users
                var collection = myAwesomeDB.collection('personnages');
            }catch(e){
                console.log("YO",e);
                return;
            }
            // conf connexion DB
            //=====

            //=====
            // build search
            // liste des champs a chercher
            var objSearch = {};
            for(var index in this.querySearch) {
                var fieldName = this.querySearch[index];
                if (typeof req.query[fieldName] !== 'undefined' && req.query[fieldName].length>0) {
                    objSearch[fieldName] = req.query[fieldName];
                }
            }
            // build search
            //=====
            
            //=====
            // do search
            collection.find(objSearch).toArray(function (err, result) {
                if (err) {
                    console.error('Find failed', err);
                } else {
                    resolve(result);
                    console.log('Find successful', result);
                }
            });
            // do search
            //=====

            // Fermeture de la connexion
            db.close()
        });
    })
    // PROMISE
    //*****
};
// getUser
//*****


//*****
// addUser
UserMongo.prototype.addUser = function(req) {
    // porte de la variable
    client = this.client;
    
    //*****
    // PROMISE
    return new Promise(function(resolve, reject) {

        // Connexion au serveur avec la méthode connect
        mongoClient.connect(url, function (err, db) {
            if (err) {
                return console.error('Connection failed', err);
            }
            console.log('Connection successful on ', url);

            //=====
            // conf connexion DB
            const myAwesomeDB = db.db('restau')
            try {
                // Récupération de la collection users
                var collection = myAwesomeDB.collection('personnages');
            }catch(e){
                console.log("YO",e);
                return;
            }
            // conf connexion DB
            //=====

            //=====
            // Création de deux objets users
            var user1 = {firstName: 'Foo', lastName: 'Fighters'};
            var user2 = {firstName: 'Bob', lastName: 'Dylan'};

            // Enregistrement de plusieurs objets en db avec insertMany
            collection.insertMany([user1, user2], function (err, result) {
                if (err) {
                    console.error('Insert failed', err);
                } else {
                    console.log('Insert successful', result);
                }
            });    
            // Création de deux objets users
            //=====

            // Fermeture de la connexion
            db.close()
        });
    })
    // PROMISE
    //*****
};
// getUser
//*****

module.exports = UserMongo;