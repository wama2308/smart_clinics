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
import { viewDataExternal } from "../../../actions/externalAction";
import Visitor from "./Visitor";
import Map from "../../Configurations/map";
import Geocode from "react-geocode";

import { Formik } from "formik";

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    Geocode.setApiKey("AIzaSyDwl7QwHKe7NFx28t-CbMDTUdQMFVrjEz4&callback");
    this.state = {
      loading: "show",
      contactos: false,
      localizacion: false,
      dataContactos: [],
      isMarkerShown: false,
      visitador: false,
      lat: null,
      lng: null,
      zoom: 14,
      exactDirection: ""
    };
  }

  componentDidMount = () => {
    // this.props.getDataTypes();
    navigator.geolocation.getCurrentPosition(
      position => {
        const obj = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.props.viewDataExternal(this.props.ids);

        this.setState({
          ...obj,
          initialLocation: {
            ...obj
          }
        });
      },
      error => {
        console.log("this error", error);
      }
    );
  };

  componentWillReceiveProps = props => {
    props.viewData
      ? Geocode.fromLatLng(props.viewData.lat, props.viewData.log).then(
          rest => {
            this.setState({
              loading: props.viewData.loading,
              lat: props.viewData.lat,
              lng: props.viewData.log,
              isMarkerShown: true,
              exactDirection: rest.results[0].formatted_address
            });
          }
        )
      : null;
  };

  onSuggestSelect = suggest => {
    if (!suggest || this.props.disabled) {
      return;
    }
    this.setState({
      lat: suggest.location.lat,
      lng: suggest.location.lng,
      isMarkerShown: false
    });
    let i = 6;

    let mapzoom = setInterval(() => {
      if (this.state.zoom === 15) {
        clearInterval(mapzoom);
      } else {
        i = i + 1;
        this.setState({ zoom: i });
      }
    }, 200);
  };

  handleClickmap = (
    event: google.maps.MouseEvent | google.maps.IconMouseEvent
  ) => {
    if (this.props.disabled) {
      return;
    }
    Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(rest => {
      this.setState({ exactDirection: rest.results[0].formatted_address });
    });

    this.setState({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      isMarkerShown: true
    });
  };

  render() {
    const { open, close, disabled, viewData } = this.props;
    // const countrys = validator.filterCountry(medicalCenter.country);
    // const type = !medicalCenter.typeConfig ? [] : medicalCenter.typeConfig.type;
    // const sector = !medicalCenter.typeConfig
    //   ? []
    //   : medicalCenter.typeConfig.sector;

    const InititalValues = {
      ...viewData
    };
    return (
      <Modal
        isOpen={open}
        aria-labelledby="contained-modal-title-lg"
        className="Modal"
        style={{ minWidth: "65%" }}
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
                const ButtonDisabled = true;
                // values.contactoN.length < 1 ||
                // values.telefono.length < 1 ||
                // values.email.length < 1 ||
                // errors.email ||
                // disabled;

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

                        {!disabled && (
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
                              <FormFeedback
                                style={{ display: "block" }}
                                tooltip
                              >
                                {errors.code}
                              </FormFeedback>
                            )}
                          </FormGroup>
                        )}

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
                                <option key={key} value={key}>disabled
                                  {sector}
                                </option>
                              );
                            })} */}
                          </Input>
                          <FormFeedback tooltip>
                            {this.state.sectorError}
                          </FormFeedback>
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-12">
                          <Label for="codigo" className="mr-sm-2">
                            Direccion
                          </Label>

                          <div
                            style={{
                              height: 400,
                              width: "100%"
                            }}
                          >
                            {this.state.lat && (
                              <Map
                                lat={this.state.lat}
                                lng={this.state.lng}
                                onMarkerClick={this.handleMarkerClick}
                                isMarkerShown={this.state.isMarkerShown}
                                initialLocation={this.state.initialLocation}
                                handleClickmap={this.handleClickmap}
                                zoom={this.state.zoom}
                              />
                            )}
                          </div>
                          <Input
                            type="textarea"
                            name="code"
                            rows={5}
                            disabled={true}
                            style={{ backgroundColor: "white" }}
                            value={this.state.exactDirection}
                            id="codigo"
                          />
                          {errors.code && touched.code && (
                            <FormFeedback style={{ display: "block" }} tooltip>
                              {errors.code}
                            </FormFeedback>
                          )}
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
                              {!disabled && (
                                <Form className={this.state.contactview} id="2">
                                  <p className="text-muted">
                                    Agregue la informacion de los contactos
                                  </p>
                                  <div className="row">
                                    <FormGroup className="top form-group col-sm-6">
                                      <Label className="mr-sm-2">
                                        Contactos
                                      </Label>
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
                                      <Label className="mr-sm-2">
                                        Telefono
                                      </Label>
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
                              )}
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
                                  {values.contact &&
                                    values.contact.map((contacto, i) => {
                                      return (
                                        <tr key={i} className="text-center">
                                          <td>{contacto.name}</td>
                                          <td>{contacto.phone}</td>
                                          <td className="text-center">
                                            {contacto.email}
                                          </td>
                                          <td className={this.state.deleteview}>
                                            <div className="sizeIconButton">
                                              <IconButton
                                                className="iconButtons"
                                                aria-label="Delete"
                                                disabled={disabled}
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
                                    })}
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
                          <Collapse isOpen={this.state.visitador}>
                            <Visitor />
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
  countrysData: state.config,
  viewData: state.external.get("viewExternalSelected")
});

// const mapDispatchToProps = dispatch => ({
//   state
// });

export default connect(
  mapStateToProps,
  { viewDataExternal }
)(ModalComponent);
