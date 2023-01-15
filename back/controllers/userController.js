const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtSecret = process.env.SECRET;

//token generico
const generaToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  const { email, name, password } = req.body;

  //garantindo que o usuario não existe
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["por favor, utilize outro email"] });
    return;
  }

  //gerando hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //criando usuario
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  //usuario criado
  if (!newUser) {
    res.status(422).json({ errors: ["Não foi possível criar usuário."] });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generaToken(newUser._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ errors: ["usuario não encontrado."] });
      return;
    }

    //check senhas
    if (!(await bcrypt.compare(password, user.password))) {
      res.status(422).json({ errors: ["Senha ou email incorreta."] });
      return;
    }
    res.status(201).json({
      _id: user._id,
      profileImage: user.profileImage,
      token: generaToken(user._id),
    });
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

const update = async (req, res) => {
  const { name, password, bio } = req.body;
  const data = req.body;
  console.log(data);

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select(
    "-password"
  );

  if (name) {
    user.name = name;
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(mongoose.Types.ObjectId(id)).select(
      "-password"
    );
    if (!user) {
      res.status(404).json({ errors: ["usuario não encontrado."] });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(422).json({ errors: ["usuario não encontrado"] });
  }
};

module.exports = {
  register,
  login,
  generaToken,
  getCurrentUser,
  update,
  getUserById,
};
