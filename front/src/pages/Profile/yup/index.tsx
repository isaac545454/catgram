import * as yup from "yup";

export const Schema = yup.object({
  title: yup
    .string()
    .min(3, "o nome preciso de seis caracteres no minimo")
    .required("Campo obrigatorio"),
  filePhofile: yup.mixed().test((value) => {
    if (value.length === 0) {
      return false;
    }

    return true;
  }),
});

export const SchemaUpdate = yup.object({
  titleUpdate: yup
    .string()
    .min(3, "o nome preciso de seis caracteres no minimo")
    .required("Campo obrigatorio"),
});
