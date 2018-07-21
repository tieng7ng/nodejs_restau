// Récupération du client mongodb
var mongoClient = require('mongodb').MongoClient;


// Paramètres de connexion
var url = 'mongodb://adminRestau:azerty@172.17.0.2/restau';



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
    var user1 = {login:'FF',firstname: 'Foo', lastname: 'Fighters'};
    var user2 = {login:'BD', firstname: 'Bob', lastname: 'Dylan'};

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

