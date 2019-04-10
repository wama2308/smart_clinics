import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Card,
  CardBody,
  Collapse,
  Form,
  Table,
  Input,
  FormFeedback,
  FormGroup
} from "reactstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";
import { ExternalInitialValues } from "./constants";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import Validator from "../../Configurations/utils";
import Visitor from './Visitor'
import Map from "../../Configurations/map";

import { Formik } from "formik";

const validator = new Validator();

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "hide",
      contactos: false,
      localizacion: false,
      dataContactos: [],
      isMarkerShown: false,
      visitador:false,
      lat: null,
      lng: null,
      zoom: 14
    };
  }

  componentDidMount = () => {
    // this.props.getDataTypes();
    navigator.geolocation.getCurrentPosition(position => {
      const obj = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      this.setState({
        ...obj,
        initialLocation: {
          ...obj
        }
      });
    });
  };

  render() {
    const { open, close, disabled } = this.props;
    // const countrys = validator.filterCountry(medicalCenter.country);
    // const type = !medicalCenter.typeConfig ? [] : medicalCenter.typeConfig.type;
    // const sector = !medicalCenter.typeConfig
    //   ? []
    //   : medicalCenter.typeConfig.sector;

    const InititalValues = {
      ExternalInitialValues,
      contactoN: "",
      telefono: "",
      email: "",
      idCountry: "0",
      type: "0",
      provincesid: "0",
      sector: "0"
    };

    return (
      <Modal
        isOpen={open}
        aria-labelledby="contained-modal-title-lg"
        className="Modal"
      >
        {this.state.loading === "show" && (
          <div align="center" className={"show"} style={{ padding: "5%" }}>
            <img src="assets/loader.gif" width="30%" />
          </div>
        )}
        <div className={this.state.divContainer}>
          {this.state.loading === "hide" && (
            <Formik
              onSubmit={this.handleSubmit}
              initialValues={InititalValues}
              // validationSchema={MedicalValidacion}
              render={({
                values,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                handleBlur,
                resetForm
              }) => {
                const ButtonDisabled =
                  values.contactoN.length < 1 ||
                  values.telefono.length < 1 ||
                  values.email.length < 1 ||
                  errors.email ||
                  disabled;

                // const provinces = validator.filterProvinces(
                //   countrys,
                //   values.idCountry
                // );
                return (
                  <div>
                    <ModalHeader>Datos de Afiliacion</ModalHeader>
                    <ModalBody className="Scroll">
                      <div className="row">
                        <FormGroup className="top form-group col-sm-6">
                          <Label for="Sucursal" className="mr-sm-2">
                            Nombre
                          </Label>
                          <Input
                            type="text"
                            name="name"
                            value={values.name}
                            disabled={disabled}
                            id="Sucursal"
                            onBlur={handleBlur}
                            onChange={event =>
                              setFieldValue("name", event.target.value)
                            }
                          />
                          {errors.name && touched.name && (
                            <FormFeedback style={{ display: "block" }} tooltip>
                              {errors.name}
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6">
                          <Label for="codigo" className="mr-sm-2">
                            Rif
                          </Label>
                          <Input
                            type="text"
                            name="code"
                            disabled={disabled}
                            value={values.code}
                            id="codigo"
                            onChange={event =>
                              setFieldValue("code", event.target.value)
                            }
                          />
                          {errors.code && touched.code && (
                            <FormFeedback style={{ display: "block" }} tooltip>
                              {errors.code}
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6">
                          <Label for="codigo" className="mr-sm-2">
                            Correo De Afiliacion
                          </Label>
                          <Input
                            type="text"
                            name="code"
                            disabled={disabled}
                            value={values.code}
                            id="codigo"
                            onChange={event =>
                              setFieldValue("code", event.target.value)
                            }
                          />
                          {errors.code && touched.code && (
                            <FormFeedback style={{ display: "block" }} tooltip>
                              {errors.code}
                            </FormFeedback>
                          )}
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6">
                          <Label for="tipo">Tipo</Label>
                          <Input
                            type="select"
                            name="tipo"
                            disabled={disabled}
                            id="tipo"
                            value={values.type}
                            onChange={event =>
                              setFieldValue(
                                "type",
                                event.target.value.toString()
                              )
                            }
                          >
                            <option value="0">Select</option>
                            {/* {type.map((type, key) => {
                              return (
                                <option key={key} value={key}>
                                  {type}
                                </option>
                              );
                            })} */}
                          </Input>
                          <FormFeedback tooltip>
                            {this.state.tipoError}
                          </FormFeedback>
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6">
                          <Label for="tipo">Pais</Label>
                          <Input
                            type="select"
                            name="pais"
                            disabled={disabled}
                            value={values.idCountry}
                            onChange={event =>
                              setFieldValue(
                                "idCountry",
                                event.target.value.toString()
                              )
                            }
                          >
                            <option value="0">Select</option>
                            {/* {countrys.map(country => {
                              return (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              );
                            })} */}
                          </Input>
                          <FormFeedback tooltip>
                            {this.state.tipoError}
                          </FormFeedback>
                        </FormGroup>
                        <FormGroup className="top form-group col-sm-6">
                          <Label for="provincia">Provincia</Label>
                          <Input
                            type="select"
                            name="provincia"
                            id="provincia"
                            disabled={disabled}
                            value={values.provincesid}
                            onChange={event =>
                              setFieldValue(
                                "provincesid",
                                event.target.value.toString()
                              )
                            }
                          >
                            <option value="0">Select</option>
                            {/* {provinces.map((province, key) => {
                              return (
                                <option key={key} value={key}>
                                  {province.name}
                                </option>
                              );
                            })} */}
                          </Input>
                          <FormFeedback tooltip>
                            {this.state.provinciaError}
                          </FormFeedback>
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6">
                          <Label for="tipo">Sector</Label>
                          <Input
                            type="select"
                            name="Sector"
                            value={values.sector}
                            disabled={disabled}
                            onChange={event =>
                              setFieldValue(
                                "sector",
                                event.target.value.toString()
                              )
                            }
                          >
                            <option value="0">Select</option>
                            {/* {sector.map((sector, key) => {
                              return (
                                <option key={key} value={key}>
                                  {sector}
                                </option>
                              );
                            })} */}
                          </Input>
                          <FormFeedback tooltip>
                            {this.state.sectorError}
                          </FormFeedback>
                        </FormGroup>
                      </div>
                      <hr />

                      {/* ---------------------------------------------------------divider---------------------------- */}

                      <div className="form-group col-lg-12 Widht">
                        <Button
                          color="primary"
                          onClick={() =>
                            this.setState({
                              contactos: !this.state.contactos
                            })
                          }
                          style={{ marginBottom: "1rem" }}
                        >
                          Contactos
                        </Button>
                        <Collapse isOpen={this.state.contactos}>
                          <Card>
                            <CardBody>
                              <Form className={this.state.contactview} id="2">
                                <p className="text-muted">
                                  Agregue la informacion de los contactos
                                </p>
                                <div className="row">
                                  <FormGroup className="top form-group col-sm-6">
                                    <Label className="mr-sm-2">Contactos</Label>
                                    <Input
                                      type="text"
                                      name="contacto"
                                      disabled={disabled}
                                      value={values.contactoN}
                                      id="Sucursal"
                                      onBlur={handleBlur}
                                      onChange={event =>
                                        setFieldValue(
                                          "contactoN",
                                          event.target.value
                                        )
                                      }
                                    />
                                    {errors.contactoN && touched.contactoN && (
                                      <FormFeedback
                                        style={{ display: "block" }}
                                        tooltip
                                      >
                                        {errors.sucursal}
                                      </FormFeedback>
                                    )}
                                  </FormGroup>
                                  <FormGroup className="top form-group col-sm-6">
                                    <Label className="mr-sm-2">Telefono</Label>
                                    <Input
                                      type="number"
                                      name="telefono"
                                      value={values.telefono}
                                      id="Sucursal"
                                      onBlur={handleBlur}
                                      disabled={disabled}
                                      onChange={event =>
                                        setFieldValue(
                                          "telefono",
                                          event.target.value
                                        )
                                      }
                                    />
                                    {errors.contacto && touched.contacto && (
                                      <FormFeedback
                                        style={{ display: "block" }}
                                        tooltip
                                      >
                                        {errors.sucursal}
                                      </FormFeedback>
                                    )}
                                  </FormGroup>

                                  <FormGroup className="top form-group col-sm-6">
                                    <Label className="mr-sm-2">email</Label>
                                    <Input
                                      type="text"
                                      name="email"
                                      value={values.email}
                                      id="Sucursal"
                                      disabled={disabled}
                                      onBlur={handleBlur}
                                      onChange={event =>
                                        setFieldValue(
                                          "email",
                                          event.target.value
                                        )
                                      }
                                    />
                                    {errors.email && touched.email && (
                                      <FormFeedback
                                        style={{ display: "block" }}
                                        tooltip
                                      >
                                        {errors.email}
                                      </FormFeedback>
                                    )}
                                  </FormGroup>
                                </div>
                                <div>
                                  <Button
                                    disabled={ButtonDisabled}
                                    onClick={() => {
                                      this.addedContact(values, resetForm);
                                    }}
                                    className="add top"
                                    color="primary"
                                  >
                                    Añadir
                                  </Button>
                                </div>
                              </Form>
                              <Table hover responsive borderless>
                                <thead className="thead-light">
                                  <tr className="text-center">
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>E-mail</th>
                                    <th className={this.state.acciones}>
                                      Acciones
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.dataContactos.length > 0 &&
                                    this.state.dataContactos.map(
                                      (contacto, i) => {
                                        return (
                                          <tr key={i} className="text-center">
                                            <td>{contacto.contacto}</td>
                                            <td>{contacto.telefono}</td>
                                            <td className="text-center">
                                              {contacto.email}
                                            </td>
                                            <td
                                              className={this.state.deleteview}
                                            >
                                              <div className="sizeIconButton">
                                                <IconButton
                                                  className="iconButtons"
                                                  aria-label="Delete"
                                                  onClick={() => {
                                                    this.delete(i);
                                                  }}
                                                >
                                                  <Delete className="iconTable" />
                                                </IconButton>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                </tbody>
                              </Table>
                            </CardBody>
                          </Card>
                        </Collapse>

                        <hr />
                        <div>
                          <Button
                            color="primary"
                            onClick={() =>
                              this.setState({
                                visitador: !this.state.visitador
                              })
                            }
                            style={{ marginBottom: "1rem" }}
                          >
                            Visitador
                          </Button>
                          <Collapse  isOpen={this.state.visitador}>
                            <Visitor/>
                          </Collapse>
                        </div>

                        <div>
                          <Button
                            color="primary"
                            onClick={() =>
                              this.setState({
                                localizacion: !this.state.localizacion
                              })
                            }
                            style={{ marginBottom: "1rem" }}
                          >
                            Localizacion
                          </Button>
                          <Collapse isOpen={this.state.localizacion}>
                            <Card>
                              <CardBody>

                                <Map
                                  lat={this.state.lat}
                                  lng={this.state.lng}
                                  // onMarkerClick={this.handleMarkerClick}
                                  isMarkerShown={this.state.isMarkerShown}
                                  initialLocation={this.state.initialLocation}
                                  currentLocation={this.state.currentLatLng}
                                  // handleClickmap={this.handleClickmap}
                                  ref={cd => (this.map = cd)}
                                />
                                <br />
                              </CardBody>
                            </Card>
                          </Collapse>
                        </div>
                        <hr />
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      {this.props.disabled && (
                        <Button color="secondary" onClick={close}>
                          volver
                        </Button>
                      )}
                      {!this.props.disabled && (
                        <div>
                          <Button color="danger" onClick={close}>
                            Cancel
                          </Button>{" "}
                          <Button onClick={handleSubmit} color="primary">
                            Guardar
                          </Button>
                        </div>
                      )}
                    </ModalFooter>
                  </div>
                );
              }}
            />
          )}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  countrysData: state.config
});

// const mapDispatchToProps = dispatch => ({
//   state
// });

export default connect(
  mapStateToProps,
  null
)(ModalComponent);
