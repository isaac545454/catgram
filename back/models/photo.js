const mongoose = require("mongoose")
const {Schema} = mongoose

const photoSchema = new Schema(
{
  image: String,
  title: String,
  likes: Array,
  comments: Array,
  userID: mongoose.ObjectId,
  userName: String,
}, 
{
  timestamps: true
})

const Photo = mongoose.model("Photo", photoSchema)

module.exports = Photo