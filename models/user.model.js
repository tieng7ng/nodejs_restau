const mongoose = require('mongoose');

/*
const adress = mongoose.Schema({
  name    : String,
});
*/
const user = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: [true, 'Why no eggs?']
  },
  lastname:   {
    type: String, 
    required: false
  },
  firstname:  {
    type: String, 
    required: false
  },
  password: {
    type: String, 
    required: true
  }
  /*,
  address : [{ 
    type: Schema.Types.ObjectId, ref: 'Address',
    required: false 
  }]
*/
});

module.exports = mongoose.model('personnages', user);