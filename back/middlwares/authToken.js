const User = require("../models/User");
const jwt = require("jasonwebtoken");
const jsonSecret = process.env.SECRET

const authGuarde =async (req, res, next)=>{
const authHeader = req.headers["authorization"]
const token = authHeader && authHeader.split(" ")[1]
 
if(!token) return res.status(401).json({errors: ["acesso negado"]})

try {
    const verified = jwt.verify(token, jsonSecret)
    req.user = await (await User.findById(verified.id)).isSelected("-password") 
    next()
    
} catch (error) {
    res.status(400).json({errors: ["token invalido"]})
}


}

module.exports = authGuarde