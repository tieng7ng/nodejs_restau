//  This is a Constructor function taking age and passport 

//  as the paramaters
function User(conf) {
    console.log('USER');

    cassandra = require('cassandra-driver');
    // Configuration
    this.conf = conf;
    //Connect to the cluster
    this.client = new cassandra.Client({contactPoints: [this.conf.ip], keyspace: this.conf.db});
    console.log(this.client);
}
  
//*****
// getUser
User.prototype.getUser = function(req) {
    // porte de la variable
    client = this.client;
    
    //*****
    // PROMISE
    return new Promise(function(resolve, reject) {
        let query = "SELECT * FROM users";
        let bWhere = false;
        try{
            if (typeof req.query.lastname !== 'undefined' && req.query.lastname.length>0) {
                    bWhere = true;
                    query = query +" WHERE lastname='"+req.query.lastname+"'";
            }
        }catch(e){
            console.log("YO",e);
        }

        if (bWhere) {
            query = query + " ALLOW FILTERING"
        }
        //*****
        // Traitement query
        this.client.execute(query, function (err, result) {
            console.log(query);

            if (!err){
                resolve(result.rows);
            } else {
                console.log(err);
                reject(err);
            }
        
            // Run next function in series
            //callback(err, null);
        });
        // Traitement query
        //*****
    })
    // PROMISE
    //*****
};
// getUser
//*****

module.exports = User;