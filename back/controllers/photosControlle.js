const photo = require("../models/photo")

const mongoose = require("mongoose") 
const Photo = require("../models/photo")
const User = require("../models/User")

//insert a foto 

const insertPhoto = async (req, res) =>{
    const {title} = req.body 
    const image = req.file.filename 
    const reqUser = req.user 

    const user = await User.findById(reqUser._id)
     
    const newPhoto = await Photo.create({
        image,
        title,
        userID: user._id,
        userName: user.name
    })

    if(!newPhoto){
        res.status(422).json({
            erros: ["houve un problema, por favor tente novamente mais tarde"]
        })
    }

    
    
    
    
    
    return res.status(201).json(newPhoto)

}

module.exports = {
    insertPhoto
}