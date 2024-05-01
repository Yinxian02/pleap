const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String, 
    required: true, 
    unique: false
  }, 
  password: {
    type: String,
    required: true
  },
  roles: {
    User: {
        type: Number,
        default: 2001
    },
    Editor: Number,
    Admin: Number
  },
  learningPreferences: {
    active: {
      type: Number, 
      min: 0.0,
      max: 1.0, 
      default: 0.5,
    }, 
    reflexive: {
      type: Number, 
      min: 0.0,
      max: 1.0, 
      default: 0.5,
    }, 
    sensing: {
      type: Number, 
      min: 0.0,
      max: 1.0, 
      default: 0.5,
    }, 
    intuitive: {
      type: Number, 
      min: 0.0,
      max: 1.0, 
      default: 0.5,
    }, 
    visual: {
      type: Number, 
      min: 0.0,
      max: 1.0, 
      default: 0.5,
    },
    verbal: {
      type: Number, 
      min: 0.0,
      max: 1.0, 
      default: 0.5,
    },  
    sequential: {
      type: Number, 
      min: 0.0,
      max: 1.0, 
      default: 0.5,
    }, 
    global: {
      type: Number, 
      min: 0.0,
      max: 1.0, 
      default: 0.5,
    }, 
  },
  refreshToken: String
})

const User = mongoose.model('User', userSchema);
module.exports = User;