import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Schema = yup.object({
  name: yup
    .string()
    .min(3, "o nome preciso de seis caracteres no minimo")
    .required("Campo obrigatorio"),
  filePhofile: yup.string(),
  bio: yup.string().required("campo obrigatorio"),
  password: yup.string(),
});
