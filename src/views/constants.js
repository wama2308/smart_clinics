import * as yup from "yup";

export const MedicalInitialValues = {
  sucursal: "",
  codigo: "",
  direccion: "",
  instagram: "",
  twitter: "",
  facebook: "",
  web: "",
  contacto: "",
  telefono: "",
  email: "",
  logo:undefined,
  file1:undefined,
  file2:undefined,
  file3:undefined
};

const data = {
  require: "Este campo es requerido"
};

export const MedicalValidacion = yup.object().shape({
  sucursal: yup.string().required(data.require),
  codigo: yup.string().required(data.require),
  direccion: yup
    .string()
    .label("Direccion")
    .required(data.require),
  logo: yup.mixed().required()  
});

export const contactos = {
  contacto: "",
  telefono: "",
  email: ""
};
