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
  const {email, name, password} = req.body

  //garantindo que o usuario não existe 
  const user = await User.findOne({email})
   
  if(user){
    res.status(422).json({errors: ["por favor, utilize outro email"]})
    return 
   }

   //gerando hash 
   const salt = await bcrypt.genSalt()
   const passwordHash = await bcrypt.hash(password, salt)
  

   //criando usuario 
   const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  })

  //usuario criado 
  if(!newUser){
    res.status(422).json({errors: ["Não foi possível criar usuário."]})
    return 
    
   }

   res.status(201).json({
    _id: newUser._id, 
    token: generaToken(newUser._id)
   })

}


const login = (req, res) => {
  res.send("login")
}

module.exports = {
  register,
  login,
  generaToken
}