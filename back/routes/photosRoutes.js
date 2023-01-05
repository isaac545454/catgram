const express = require("express");
const router = express.Router();

//comtroller

const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUser,
} = require("../controllers/photosControlle");

//middleware

const { photoInsertValidation } = require("../middlwares/photoValidation");
const authGuard = require("../middlwares/authGuard");
const validate = require("../middlwares/handleValidation");
const { imageUpload } = require("../middlwares/imageUpload");

//routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);

router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUser);
router.delete("/:id", authGuard, deletePhoto);

module.exports = router;
