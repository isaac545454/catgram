const Photo = require("../models/photo");
const mongoose = require("mongoose");
const User = require("../models/User");

//insert a foto

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const newPhoto = await Photo.create({
    image,
    title,
    userID: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    res.status(422).json({
      erros: ["houve un problema, por favor tente novamente mais tarde"],
    });
    return;
  }

  return res.status(201).json(newPhoto);
};

//removendo foto

const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }

    // Check if photo belongs to user
    if (!photo.userID.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
      return;
    }
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  await Photo.findByIdAndDelete(photo._id);

  res
    .status(200)
    .json({ id: photo._id, message: "Foto excluída com sucesso." });
};

///getAll fotos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();
  return res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
};
