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
import {
  createPatients,
  getOptionsPersonal,
  cleanSearch
} from "../../actions/ventasAction";
import { validationSquema } from "./const";
import Search from "../../components/DefaultSearch";

class UserRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searched: {
        name: "",
        dni: ""
      }
    };
  }

  save = values => {
    this.setState({ loading: false });
    this.props.createPatients(values, () => {
      this.setState({ loading: true });
      this.props.close();
    });
  };

  filterProvince = (data, selected) => {
    const result = data.find(country => {
      return country.value === selected;
    });
    if (result) {
      return result.provinces;
    }
    return [];
  };

  filterDistrict = (data, selected) => {
    const result = data.find(province => {
      return province.value === selected;
    });
    return result ? result.districts : [];
  };

  initalSelected = (array, selected, action) => {
    action("country_id", selected);
    const result = array.find(country => {
      return country.value === selected;
    });

    if (result) {
      action("province_id", result.provinces[0].value);
      action("district_id", result.provinces[0].districts[0].value);
    }
  };

  initialDistrict = (array, selected, action) => {
    action("province_id", selected);
    const result = array.find(province => {
      return province.value === selected;
    });

    if (result) {
      action("district_id", result.districts[0].value);
    }
  };

  onchangeRef = (value, setFieldValue) => {
    setFieldValue("reference", value.target.value);
    this.setState({
      reference: value.target.value,
      searched: {
        name: "",
        dni: ""
      }
    });
  };

  getOptions = value => {
    const staff = this.state.reference === "Personal interno" ? 0 : 1;
    this.props.getOptionsPersonal(staff, value);
  };

  orderOptions = value => {
    if (!value) {
      return;
    }
    const array = [];
    value.map(val => {
      array.push({
        label: `${val.names} ${val.surnames}  ${val.type_identity}-${val.dni} `,
        value: val.dni
      });
    });

    return array;
  };

  orderExternalOptions = value => {
    if (!value) {
      return;
    }
    const array = [];
    value.map(val => {
      array.push({
        label: val.branchoffices_name,
        value: val._id
      });
    });

    return array;
  };

  searchAction = values => {
    if (this.state.reference === "Personal interno") {
      const result = this.props.optionsInternal.find(data => {
        return values.value === data.dni;
      });

      this.setState({
        searched: {
          name: `${result.names} ${result.surnames}`,
          dni: `${result.type_identity}-${result.dni}`
        }
      });
    } else {
      const result = this.props.optionsExternal.find(data => {
        return values.value === data._id;
      });

      this.setState({
        searched: {
          name: `${result.name}`,
          dni: `${result.code}`,
          branchoffices: `${result.branchoffices_name}`
        }
      });
    }

    this.props.cleanSearch();
  };

  render() {
    const {
      open,
      close,
      aplication,
      patient,
      disabled,
      optionsInternal,
      optionsExternal
    } = this.props;

    const reference = [
      { label: "Cuenta propia", value: "Cuenta propia" },
      { label: "Personal interno", value: "Personal interno" },
      { label: "Centro medico externo", value: "Centro medico externo" },
      { label: "Redes sociales", value: "Redes sociales" }
    ];

    const options =
      this.state.reference === "Personal interno"
        ? this.orderOptions(optionsInternal)
        : this.orderExternalOptions(optionsExternal);

    const InitialValue = {
      type_identity: aplication.dataCountries.type_identity[0].value,
      dni: "",
      names: "",
      surnames: "",
      country_id: aplication.countries[0].value,
      province_id: aplication.countries[0].provinces[0].value,
      district_id: aplication.countries[0].provinces[0].districts[0].value,
      address: "",
      phone: [],
      email: [],
      sex_id: aplication.dataGeneral.sex[0].value,
      civil_state_id: aplication.dataGeneral.civil_state[2].value,
      photo: "",
      reference: reference[0].label,
      birth_date: new Date()
    };

    const values = patient ? patient : InitialValue;
    return (
      <Formik
        onSubmit={this.save}
        initialValues={values}
        validationSchema={validationSquema}
        render={({
          values,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          handleBlur
        }) => {
          const provinces = this.filterProvince(
            aplication.countries,
            values.country_id,
            setFieldValue
          );

          const district = this.filterDistrict(
            provinces,
            values.province_id,
            setFieldValue
          );

          return (
            <Modal isOpen={open} toggle={close} style={{ minWidth: "60%" }}>
              {this.state.loading === false && (
                <div
                  align="center"
                  className={"show"}
                  style={{ padding: "5%" }}
                >
                  <img src="assets/loader.gif" width="30%" />
                </div>
              )}
              {this.state.loading && (
                <div style={{ flex: 1 }}>
                  <ModalHeader>Nuevo usuario</ModalHeader>
                  <ModalBody>
                    <div className="row">
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="Sucursal" className="mr-sm-2">
                          Nombres
                        </Label>
                        <Input
                          type="text"
                          name="names"
                          className="inputStyle"
                          value={values.names}
                          disabled={disabled}
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
                          disabled={disabled}
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
                            disabled={disabled}
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
                            disabled={disabled}
                            value={values.dni}
                            id="codigo"
                            className="inputStyle"
                            onChange={event =>
                              setFieldValue("dni", event.target.value)
                            }
                          />
                        </div>
                        {errors.dni && touched.dni && (
                          <FormFeedback style={{ display: "block" }} tooltip>
                            {errors.dni}
                          </FormFeedback>
                        )}
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="tipo">Sexo</Label>
                        <Input
                          type="select"
                          name="pais"
                          disabled={disabled}
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
                          disabled={disabled}
                          className="inputStyle"
                          value={values.country_id}
                          onChange={event =>
                            this.initalSelected(
                              aplication.countries,
                              event.target.value,
                              setFieldValue
                            )
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
                          disabled={disabled}
                          className="inputStyle"
                          value={values.province_id}
                          onChange={event =>
                            this.initialDistrict(
                              provinces,
                              event.target.value,
                              setFieldValue
                            )
                          }
                        >
                          {provinces.map((province, key) => {
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
                          disabled={disabled}
                          className="inputStyle"
                          value={values.provincesid}
                          onChange={event =>
                            setFieldValue(
                              "provincesid",
                              event.target.value.toString()
                            )
                          }
                        >
                          {district.map((province, key) => {
                            return (
                              <option key={key} value={province.value}>
                                {province.label}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="Direccion">direccion</Label>
                        <Input
                          type="text"
                          className="inputStyle"
                          value={values.address}
                          name="address"
                          disabled={disabled}
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
                            disabled={disabled}
                            className="react-tagsinputMy"
                            inputProps={{
                              placeholder: "Telefono",
                              className: "react-tagsinput-inputMy",
                              type: "number",
                              disabled: disabled
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
                        {errors.phone && touched.phone && (
                          <div className="errorSelect">{errors.phone}</div>
                        )}
                      </FormGroup>
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="emails">Emails</Label>
                        <div>
                          <TagsInput
                            name="email"
                            disabled={disabled}
                            className="react-tagsinputMy"
                            inputProps={{
                              placeholder: "Email",
                              className: "react-tagsinput-inputMy",
                              type: "email",
                              disabled: disabled
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
                        {errors.email && touched.email && (
                          <div className="errorSelect">{errors.email}</div>
                        )}
                      </FormGroup>
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="emails">Fecha de Nacimiento</Label>
                        <div className={this.state.divBirthDate}>
                          <DatePicker
                            selected={values.birth_date}
                            dateFormat="dd-MM-yyyy"
                            showYearDropdown
                            disabled={disabled}
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

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="provincia">Referencias</Label>
                        <Input
                          type="select"
                          disabled={disabled}
                          className="inputStyle"
                          value={values.reference}
                          onChange={event =>
                            this.onchangeRef(event, setFieldValue)
                          }
                        >
                          {reference.map((reference, key) => {
                            return (
                              <option key={key} value={reference.value}>
                                {reference.label}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>

                      <hr />

                      {(values.reference === "Personal interno" ||
                        values.reference === "Centro medico externo") && (
                        <div
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            flexDirection: "column",
                            display: "flex",
                            minWidth: "40%",
                            paddingTop: 20
                          }}
                        >
                          <div style={{ width: "40%" }}>
                            <Search
                              placeholder={`Nombre del ${values.reference}`}
                              getOptions={this.getOptions}
                              options={options}
                              searchAction={this.searchAction}
                            />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexWrap: "wrap"
                            }}
                          >
                            <FormGroup className="top form-group col-sm-6">
                              <Label for="Sucursal" className="mr-sm-2">
                                {`Nombre del ${values.reference}`}
                              </Label>
                              <Input
                                type="text"
                                name="names"
                                className="inputStyle"
                                value={this.state.searched.name}
                                disabled={true}
                                onBlur={handleBlur}
                                onChange={event =>
                                  setFieldValue("names", event.target.value)
                                }
                              />
                            </FormGroup>

                            <FormGroup className="top form-group col-sm-6">
                              <Label for="Sucursal" className="mr-sm-2">
                                {`DNI ${values.reference}`}
                              </Label>
                              <Input
                                type="text"
                                name="surnames"
                                className="inputStyle"
                                disabled={true}
                                value={this.state.searched.dni}
                                onBlur={handleBlur}
                                onChange={event =>
                                  setFieldValue("surnames", event.target.value)
                                }
                              />

                              {errors.surnames && touched.surnames && (
                                <FormFeedback
                                  style={{ display: "block" }}
                                  tooltip
                                >
                                  {errors.surnames}
                                </FormFeedback>
                              )}
                            </FormGroup>

                            {values.reference === "Centro medico externo" && (
                              <FormGroup className="top form-group col-sm-6">
                                <Label for="Sucursal" className="mr-sm-2">
                                  {`Sucursal  de ${values.reference}`}
                                </Label>
                                <Input
                                  type="text"
                                  name="surnames"
                                  className="inputStyle"
                                  disabled={true}
                                  value={this.state.searched.branchoffices}
                                />
                              </FormGroup>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={close}>Atras</Button>
                    <Button
                      color="success"
                      disabled={disabled}
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </div>
              )}
            </Modal>
          );
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  aplication: state.global.dataGeneral,
  optionsInternal: state.ventas.get("options_internal"),
  optionsExternal: state.ventas.get("options_external")
});

export default connect(
  mapStateToProps,
  { createPatients, getOptionsPersonal, cleanSearch }
)(UserRegister);
