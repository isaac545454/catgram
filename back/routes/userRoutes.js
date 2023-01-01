const express = require('express')
const router = express.Router()

//controller
const {register, login, getCurrentUser, update,getUserById } = require("../controllers/userController")

//middlewares 
const validate = require("../middlwares/handleValidation")
const { userCreateValidation, loginValidation, userUpdate } = require("../middlwares/userValidation")
const authGuard = require("../middlwares/authGuard")
const { imageUpload } = require('../middlwares/imageUpload')

//rotas
router.post("/register", userCreateValidation(), validate, register) 

router.post("/login", loginValidation(), validate, login)

router.get("/profile", authGuard, getCurrentUser)

router.get("/:id", getUserById)

router.put("/", authGuard, userUpdate(), validate, imageUpload.single("profileImage"), update )



module.exports = router