const {body} = require("express-validator")

const userCreateValidation = ()=>{
  return [body("name")
  .isString().withMessage("o nome é obrigatorio")
  .isLength({min: 4}).withMessage("o nome precisa de 4 caracteres no minimo")]
}

module.exports = {userCreateValidation}