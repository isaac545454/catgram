const multer = require('multer');
const path = require('path');


//destination 
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folter = ""
        if(req.baseUrl.includes("users")){
            folder = "users"
        }  else if(req.baseUrl.includes("photos")){
          folder = "photos"
        }
        cb(null, `uploads/${folder}/`) 
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() +  path.extname(file.originalname));
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: function(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("por favor envie apenas pnj ou jpg"))
        }
        cb(undefined, true)
    },
})

module.exports = { imageUpload }