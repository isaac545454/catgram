const express = require("express");
const router = express.Router();

//comtroller

const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUser,
  getPhotosById,
  updatePhotos,
  likePhoto,
  searchPhotos,
  comentPhoto,
} = require("../controllers/photosControlle");

//middleware

const {
  photoInsertValidation,
  commentValidation,
  photoUpdateValidation,
} = require("../middlwares/photoValidation");
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
router.get("/search", authGuard, searchPhotos);
router.get("/", authGuard, getAllPhotos);
router.get("/:id", authGuard, getPhotosById);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhotos);
router.get("/user/:id", authGuard, getUser);
router.delete("/:id", authGuard, deletePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  comentPhoto
);

module.exports = router;
