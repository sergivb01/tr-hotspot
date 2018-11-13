const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  email: String
  /*
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user'
  }
  */
})

const User = mongoose.model('user', userSchema)

module.exports = User
