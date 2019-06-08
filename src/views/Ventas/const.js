import * as yup from "yup";

export const InitialValue = {
  type_identity: "E",
  dni: "",
  names: "rosa",
  surnames: "melo",
  country_id: "5ae7206468fdbc134c007013",
  province_id: "5ae7206468fdbc134c007025",
  district_id: "5ae7206468fdbc134c007080",
  address: "Mi casa",
  phone: ["0426-0159852", "0416-0123458"],
  email: ["melorosa69@correo.com"],
  sex_id: "5b636e357464200921288661",
  civil_state_id: "5b636e357464200921288633",
  photo: "",
  birth_date: "07/07/77"
};

const data = {
  require: "Este campo es requerido"
};

export const validationSquema = yup.object().shape({
  names: yup.string().required(data.require),
  surnames: yup.string().required(data.require),
  dni: yup.number().required(data.require),
  address: yup
    .string()
    .label("Direccion")
    .required(data.require),
  birth_date: yup.string().required(),
  phone: yup.array().of(
    yup.number().test('len', 'Debe ingresar numero telefonico valido', val => val.toString().length > 7)
  )
  .required(data.require),
  email: yup.array().of(yup.string().email("este campo no es un email valido"))
  .required(data.require)
});
