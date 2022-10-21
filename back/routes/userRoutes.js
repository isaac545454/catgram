const express = require('express')
const router = express.Router()

//controller
const {register} = require("../controllers/userController")

//middlewares 
const validate = require("../middlwares/handleValidation")
const { userCreateValidation } = require("../middlwares/userValidation")

//rotas
router.post("/register", userCreateValidation(), validate, register)

module.exports = router