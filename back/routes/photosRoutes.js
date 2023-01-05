const express = require("express");
const router = express.Router();

//comtroller

const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUser,
  getPhotosById,
} = require("../controllers/photosControlle");

//middleware

const { photoInsertValidation } = require("../middlwares/photoValidation");
const authGuard = require("../middlwares/authGuard");
const validate = require("../middlwares/handleValidation");
const { imageUpload } = require("../middlwares/imageUpload");
const { getUserById } = require("../controllers/userController");

//routes
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);

router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUser);
router.get("/:id", authGuard, getPhotosById);

module.exports = router;
