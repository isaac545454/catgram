import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "o nome precisa ter no minimo cinco caracteres")
    .required("o nome é obrigatório"),
  email: yup.string().email().required("o email é obrigatório").required(),
  password: yup
    .string()
    .min(6, "a senha de pelo menos seis caracteres")
    .required("a senha é obrigatório"),
  confirmePassword: yup
    .string()
    .min(6)
    .required("a confirmação da senha é obrigatório"),
});

export default schema;
