const express = require('express') 
const router = express.Router()

//comtroller 

//middleware 

const { photoInsertValidation } = require('../middlwares/photoValidation')
const authGuard = require('../middlwares/authGuard')
const validate = require('../middlwares/handleValidation')
//routes 

module.exports = router