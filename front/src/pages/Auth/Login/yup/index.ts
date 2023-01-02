import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("email invalido")
    .required("o email é obrigatório")
    .required(),
  password: yup
    .string()
    .min(6, "a senha de pelo menos seis caracteres")
    .required("a senha é obrigatório"),
});

export default schema;
