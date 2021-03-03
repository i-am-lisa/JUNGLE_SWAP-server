const { Schema, model } = require("mongoose");

// 1. Define your schema
let UserSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String, 
    required: true,
    unique: true
  },

   passwordHash: {
    type: String, 
    required: true,
   }, 
  
  image: {
    type: String,
    default: "https://i.pinimg.com/originals/b7/21/26/b721265eb826b20e6f91d6643b95c122.jpg"
  }
})

// 2. Define your model
let UserModel = model('user', UserSchema)

// 3. Export your Model with 'module.exports'
module.exports = UserModel