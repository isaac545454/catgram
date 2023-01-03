const express = require('express')
const router = express.Router()


router.use("/api/users", require("./userRoutes"))
router.use("/api/photos", require("./photosRoutes"))

router.get('/', (req, res)=>{
  res.send('api funcionando')
})
     
   





module.exports = router