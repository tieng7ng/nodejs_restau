
//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const conf = require('../conf/conf.json');

const Token = require('../services/token');
const token = new Token(conf);

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

console.log(conf.ip);
//const port = config.port; 


//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
const myRouter = express.Router();


//*****
// ROUTER
// Je vous rappelle notre route (/piscines).  

// J'implémente les méthodes GET, PUT, UPDATE et DELETE

//=====
// Verification authent
myRouter.get('/token', function (req, res) {
  //=====
  // Validation TOKEN
  const sToken = req.query.token || req.body.token;
  const tabTokenValid = token.valid(sToken);

  console.log(sToken, tabTokenValid);

  if (!tabTokenValid['return']) {
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  }
  // Validation TOKEN
  //=====

  return res.status(200).send({
    auth: true,
    result: tabTokenValid.decoded
  });
});
// Verification authent
//=====

// GET
myRouter.get('', async function (req, res) {
  //=====
  // Build query search
  const tabSearch = {};
  for (var index in User.schema.obj) {
    if (typeof req.query[index] !== 'undefined' && req.query[index].length > 0) {
      tabSearch[index] = req.query[index];
    }
  }
  // Build query search
  //=====

  console.log(tabSearch);
  User.findOne(tabSearch)
    .exec()
    .then(function (user) {
      console.log(user);
      return res.status(200).json({
        success: 'Welcome to the JWT AuthX',
        result: user
      });

    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });;

});


//=====
// Add user
myRouter.post('', function (req, res) {
  console.log('POST');
  console.log(req.body);

  //=====
  // Validation TOKEN
  const sToken = req.query.token || req.body.token;
  const tabTokenValid = token.valid(sToken);

  console.log(sToken, tabTokenValid);

  if (!tabTokenValid['return']) {
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  }
  // Validation TOKEN
  //=====

  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }
    else {
      console.log('hash ' + req.body.email + ' - ' + hash);
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });
      console.log(user);
      user.save().then(function (result) {
        console.log(result);
        res.status(200).json({
          success: 'New user has been created'
        });
      }).catch(error => {
        console.log('save error' + error);
        res.status(500).json({
          error: error
        });
      });
    }
  });
});
// Add user
//=====


//=====
// Authent
myRouter.post('/signin', function (req, res) {
  console.log('signin : ', req.body);

  User.findOne({ email: req.body.email })
    .exec()
    .then(function (user) {
      console.log('user');
      console.log(user);
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          return res.status(401).json({
            failed: 'Unauthorized Access'
          });
        }
        if (result) {
          //=====
          // Genere token
          return res.status(200).json({
            success: 'Welcome to the JWT AuthX',
            firstnameXX: user.firstname,
            lastname: user.lastname,
            token: token.create(req.body.email, user._id)
          });
          // Genere token
          //=====
        }

        return res.status(401).json({
          failed: 'Unauthorized Access'
        });
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });;
});
// Authent
//=====

//PUT
myRouter.put(function (req, res) {
  res.json({ message: "Mise à jour des informations d'une piscine dans la liste", methode: req.method });
});
//DELETE
myRouter.delete(function (req, res) {
  res.json({ message: "Suppression d'une piscine dans la liste", methode: req.method });
});
// ROUTER
//*****

module.exports = myRouter;