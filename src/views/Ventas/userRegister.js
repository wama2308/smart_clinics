import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormFeedback,
  FormGroup
} from "reactstrap";
import { connect } from "react-redux";
import { Formik } from "formik";
import TagsInput from "react-tagsinput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class UserRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: [],
      email: [],
      date: new Date()
    };
  }
  save = () => {
    console.log("aca");
    alert("save");
  };

  filterProvince = (data, selected) => {
    console.log(selected);
    const result = data.find(country => {
      return country.value === selected;
    });

    return result;
  };

  render() {
    const { open, close, aplication } = this.props;
    const InitialValue = {
      type_identity: aplication.dataCountries.type_identity[0].value,
      dni: "",
      names: "",
      surnames: "",
      country_id: aplication.countries[0].value,
      province_id: aplication.countries[0].provinces[0].value,
      district_id: aplication.countries[0].provinces[0].districts[0].value,
      address: "Mi casa",
      phone: ["0412-4085672", "04144085672"],
      email: ["kevinvelasco190@gmail.com"],
      sex_id: aplication.dataGeneral.sex[0].value,
      civil_state_id: aplication.dataGeneral.civil_state[2].value,
      photo: "",
      birth_date: new Date()
    };
    return (
      <Formik
        onSubmit={this.save}
        initialValues={InitialValue}
        render={({
          values,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          handleBlur
        }) => {
          console.log("valor", values);
          const result = this.filterProvince(
            aplication.countries,
            values.country_id
          );
          console.log("data", result);
          return (
            <Modal isOpen={open} toggle={close} style={{ minWidth: "60%" }}>
              <ModalHeader>Nuevo usuario</ModalHeader>
              <ModalBody>
                <div className="row">
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="Sucursal" className="mr-sm-2">
                      Apellidos
                    </Label>
                    <Input
                      type="text"
                      name="names"
                      className="inputStyle"
                      value={values.names}
                      onBlur={handleBlur}
                      onChange={event =>
                        setFieldValue("names", event.target.value)
                      }
                    />

                    {errors.names && touched.names && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.names}
                      </FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="Sucursal" className="mr-sm-2">
                      Apellidos
                    </Label>
                    <Input
                      type="text"
                      name="surnames"
                      className="inputStyle"
                      value={values.surnames}
                      onBlur={handleBlur}
                      onChange={event =>
                        setFieldValue("surnames", event.target.value)
                      }
                    />

                    {errors.surnames && touched.surnames && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.surnames}
                      </FormFeedback>
                    )}
                  </FormGroup>

                  <FormGroup
                    className="top form-group col-sm-6"
                    style={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <div>
                      <Label for="codigo" className="mr-sm-2">
                        DNI
                      </Label>
                      <Input
                        type="select"
                        name="pais"
                        className="inputStyle"
                        value={values.type_identity}
                        style={{
                          maxWidth: 55,
                          height: 35,
                          border: "1px solid #e4e7ea",
                          borderRight: "none"
                        }}
                        onChange={event =>
                          setFieldValue("type_identity", event.target.value)
                        }
                      >
                        {this.props.aplication.dataCountries.type_identity.map(
                          type => {
                            return (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            );
                          }
                        )}
                      </Input>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Input
                        type="number"
                        name="dni"
                        value={values.dni}
                        id="codigo"
                        className="inputStyle"
                        onChange={event =>
                          setFieldValue("dni", event.target.value)
                        }
                      />
                      {errors.dni && touched.dni && (
                        <FormFeedback style={{ display: "block" }} tooltip>
                          {errors.dni}
                        </FormFeedback>
                      )}
                    </div>
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="tipo">Sexo</Label>
                    <Input
                      type="select"
                      name="pais"
                      className="inputStyle"
                      value={values.idCountry}
                      onChange={event =>
                        setFieldValue("sexo", event.target.value)
                      }
                    >
                      {aplication.dataGeneral.sex.map(sex => {
                        return (
                          <option key={sex.value} value={sex.value}>
                            {sex.label}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="tipo">Pais</Label>
                    <Input
                      type="select"
                      name="pais"
                      className="inputStyle"
                      value={values.country_id}
                      onChange={event =>
                        setFieldValue("country_id", event.target.value)
                      }
                    >
                      {aplication.countries.map(country => {
                        return (
                          <option key={country.value} value={country.value}>
                            {country.label}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="provincia">Provincia</Label>
                    <Input
                      type="select"
                      name="provincia"
                      id="provincia"
                      className="inputStyle"
                      value={values.provincesid}
                      onChange={event =>
                        setFieldValue(
                          "provincesid",
                          event.target.value.toString()
                        )
                      }
                    >
                      {result.provinces.map((province, key) => {
                        return (
                          <option key={key} value={province.value}>
                            {province.label}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="provincia">Ciudad</Label>
                    <Input
                      type="select"
                      name="provincia"
                      id="provincia"
                      className="inputStyle"
                      value={values.provincesid}
                      onChange={event =>
                        setFieldValue(
                          "provincesid",
                          event.target.value.toString()
                        )
                      }
                    >
                      {/* {provinces.map((province, key) => {
                        return (
                          <option key={key} value={province.value}>
                            {province.label}
                          </option>
                        );
                      })} */}
                    </Input>
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="Direccion">direccion</Label>
                    <Input
                      type="text"
                      className="inputStyle"
                      value={values.address}
                      name="address"
                      onChange={event =>
                        setFieldValue("address", event.target.value)
                      }
                    />
                    {errors.address && touched.address && (
                      <FormFeedback style={{ display: "block" }} tooltip>
                        {errors.address}
                      </FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="telefonos">Telefonos</Label>
                    <div>
                      <TagsInput
                        name="phone"
                        className="react-tagsinputMy"
                        inputProps={{
                          placeholder: "Telefono",
                          className: "react-tagsinput-inputMy"
                        }}
                        focusedClassName="react-tagsinput-focusedMy"
                        tagProps={{
                          className: "react-tagsinput-tagMy",
                          classNameRemove: "react-tagsinput-removeMy"
                        }}
                        value={values.phone}
                        onChange={event => setFieldValue("phone", event)}
                      />
                    </div>
                    <div className="errorSelect">{errors.phone}</div>
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="emails">Emails</Label>
                    <div>
                      <TagsInput
                        name="email"
                        className="react-tagsinputMy"
                        inputProps={{
                          placeholder: "Email",
                          className: "react-tagsinput-inputMy"
                        }}
                        focusedClassName="react-tagsinput-focusedMy"
                        tagProps={{
                          className: "react-tagsinput-tagMy",
                          classNameRemove: "react-tagsinput-removeMy"
                        }}
                        value={values.email}
                        onChange={event => setFieldValue("email", event)}
                      />
                    </div>
                    <div className="errorSelect">{errors.email}</div>
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="emails">Fecha de Nacimiento</Label>
                    <div className={this.state.divBirthDate}>
                      <DatePicker
                        selected={values.birth_date}
                        dateFormat="dd-MM-yyyy"
                        showYearDropdown
                        style={{ height: 44 }}
                        dateFormatCalendar="MMMM"
                        className="form-control inputStyle"
                        onChange={date => setFieldValue("birth_date", date)}
                      />
                    </div>
                    <div className="errorSelect">
                      {this.state.birthDateError}
                    </div>
                  </FormGroup>
                </div>
                <hr />
              </ModalBody>
              <ModalFooter>
                <Button onClick={close}>Atras</Button>
                <Button color="success" onClick={handleSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </Modal>
          );
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  aplication: state.global.dataGeneral
});

export default connect(
  mapStateToProps,
  null
)(UserRegister);
