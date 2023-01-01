const {body} = require("express-validator")

const userCreateValidation = ()=>{
  return [body("name")
  .isString()
  .withMessage("o nome é obrigatorio")
  .isLength({min: 4})
  .withMessage("o nome precisa de 4 caracteres no minimo"),
  body("email") 
  .isString()
  .withMessage("o email é obrigatorio") 
  .isEmail()
  .withMessage("insira um email valido"),
  body("password")
 .isString()
 .withMessage("o password é obrigatorio")
 .isLength({min: 6})
 .withMessage("o password precisa de 6 caracteres no minimo"),
  body("confirmPassword") 
  .isString()
  .withMessage("a confirmação de password é obrigatoria")
  .custom((value, {req})=>{
  if(value!== req.body.password){
      throw new Error("as senhas não são iguais")
   }
   return true
  }
  )

]
}


const loginValidation = ()=>{
  return [
    body('email')
    .isString()
    .withMessage('o email é obrigatorio')
    .isEmail()
    .withMessage("insira um email valido"),
    body("password")
    .isString()
    .withMessage("A senha é obrigatoria")
  ]
}


const userUpdate = ()=>{
  return[
    body('name')
    .optional()
    .isLength({min: 3})
    .withMessage("o nome precida de pelo menos tres letras"),
    body('password')
    .optional()
    .isLength({min:5})
    .withMessage("a senha precisa de pelo menos tres letras")

  ]
}



module.exports = {userCreateValidation, loginValidation, userUpdate}