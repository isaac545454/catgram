const express = require('express')
const router = express.Router()

//controller
const {register, login, getCurrentUser } = require("../controllers/userController")

//middlewares 
const validate = require("../middlwares/handleValidation")
const { userCreateValidation, loginValidation } = require("../middlwares/userValidation")
const authGuard = require("../middlwares/authGuard")

//rotas
router.post("/register", userCreateValidation(), validate, register) 

router.post("/login", loginValidation(), validate, login)

router.get("/profile", authGuard, getCurrentUser)



module.exports = router