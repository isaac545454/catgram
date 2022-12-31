const express = require('express')
const router = express.Router()

//controller
const {register, login } = require("../controllers/userController")

//middlewares 
const validate = require("../middlwares/handleValidation")
const { userCreateValidation, loginValidation } = require("../middlwares/userValidation")

//rotas
router.post("/register", userCreateValidation(), validate, register) 

router.post("/login", loginValidation(), validate, login)



module.exports = router