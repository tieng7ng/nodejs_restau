//  This is a Constructor function taking age and passport 

const jwt = require('jsonwebtoken');


//  as the paramaters
function Token(conf) {
  // Configuration
  this.conf = conf;

}

/**
 * 
 * @param {string} email 
 * @param {string} id 
 */
Token.prototype.create = function (email, id) {
  console.log('token create ' + this.conf.tokenSecret)


  //=====
  // Genere token
  const JWTToken = jwt.sign({
    email: email,
    _id: id
  },
    this.conf.tokenSecret,
    {
      expiresIn: '2h'
    });
  return JWTToken;
  // Genere token
  //=====
};

/**
 * 
 * @param {string} token 
 */
Token.prototype.valid = function (token) {
  console.log('token valid ' + this.conf.tokenSecret)
  const tabReturn = [];
  jwt.verify(token, this.conf.tokenSecret, function (err, decoded) {
    if (err) {
      console.log('valid KO');
      tabReturn['return'] = false;
    } else {
      console.log('valid OK');
      tabReturn['return'] = true;
      tabReturn['decoded'] = decoded;
    }
  });
  return tabReturn;
}


module.exports = Token;