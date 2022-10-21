const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.SECRET 

//token generico 
const generaToken = (id)=>{
  return jwt.sign({id}, jwtSecret, 
    {
      expiresIn: '7d',
    })
}

const register = async (req, res)=>{
  res.send("registro")
}

module.exports = {
  register,
  generaToken
}