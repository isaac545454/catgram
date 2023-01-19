const Photo = require("../models/photo");
const mongoose = require("mongoose");
const User = require("../models/User");
const console = require("console");

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
  console.log({ id, reqUser });

  // try {
  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  // Check if photo exists
  console.log(photo);
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

  await Photo.findByIdAndDelete(photo._id);

  res
    .status(200)
    .json({ id: photo._id, message: "Foto excluída com sucesso." });
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userID: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

///getAll fotos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();
  return res.status(200).json(photos);
};

const getPhotosById = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.findById(mongoose.Types.ObjectId(id));

  if (!photos) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
  return res.status(200).json(photos);
};

const updatePhotos = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const reqUser = req.user;

  const photo = await Photo.findById(id);
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  if (!photo.userID.equals(reqUser._id)) {
    res.status(422).json({ errors: ["ocorreu um erro"] });
    return;
  }

  if (title) {
    photo.title = title;
  }
  await photo.save();
  return res
    .status(200)
    .json({ photo, message: "foto atualizada com sucesso!" });
};

const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["voce ja curtiu essa foto"] });
  }

  photo.likes.push(reqUser._id);
  photo.save();
  res.status(200).json({ photosId: id, userID: reqUser._id });
};

const comentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;
  const user = await User.findById(reqUser._id);
  const photo = await Photo.findById(id);
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userID: user._id,
  };

  photo.comments.push(userComment);
  await photo.save();
  res.status(200).json({
    comment: userComment,
    message: "o comentario foi adicionado com sucesso",
  });
  return;
};

const searchPhotos = async (req, res) => {
  const { q } = req.query;
  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();
  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUser,
  getPhotosById,
  updatePhotos,
  likePhoto,
  comentPhoto,
  searchPhotos,
};
