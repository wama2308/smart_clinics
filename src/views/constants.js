import * as yup from "yup";


export const MedicalInitialValues = {
  posicion: undefined,
  name: '',
  code: '',
  idCountry: '',
  provincesid: '',
  type: '',
  sector: '',
  logo: undefined,
  foto1: undefined,
  foto2: undefined,
  foto3: undefined,
  facebook: '',
  twitter: '',
  instagram: '',
  web: '',
  address: '',
};

const data = {
  require: "Este campo es requerido"
};

const imageValidator=(value)=>{
  if(!value){return 1}

  let padding;
       if(value.endsWith("==")){ padding = 2}
       else if (value.endsWith("=")) {padding = 1;}
       else padding = 0;

      let result =  (value.length / 4 ) * 3 - padding

     return  result = result / 1000

 }

 export const MedicalValidacion = yup.object().shape({
   name: yup.string().required(data.require),
   code: yup.string().required(data.require),
   address: yup
     .string()
     .label("Direccion")
     .required(data.require),
   email: yup.string().email(),
   logo: yup.mixed().required().test(
     "Logo",
     "tamaño de la imagen no esta permitido",
     value => value && imageValidator(value) <= 26
   ),
   file1: yup.mixed().test(
     "File",
     "Tamaño de la imagen no esta permitido",
     value => imageValidator(value) <= 26
   ),
   file2: yup.mixed().test(
     "File",
     "Tamaño de la imagen no esta permitido",
      value => imageValidator(value) <= 26   ),
   file3: yup.mixed().test(
     "File",
     "Tamaño de la imagen no esta permitido",
     value => imageValidator(value) <= 26
   )
 });


export const contactos = {
  contacto: "",
  telefono: "",
  email: ""
};
