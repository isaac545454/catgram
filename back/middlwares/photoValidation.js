const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("o titulo é obrigatório")
      .isString()
      .withMessage("o titulo é obrigatório")
      .isLength({ min: 3 })
      .withMessage("o titulo precisa de pelo menos 3 caracteres"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatoria");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("o titulo é obrigatorio ")
      .isLength({ min: 3 })
      .withMessage("o titulo precisa de pelo menos 3 caracteres"),
  ];
};

const commentValidation = () => {
  return [body("comment").isString().withMessage("o comentario é obrigatório")];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
