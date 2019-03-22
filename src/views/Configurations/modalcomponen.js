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
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaMinusCircle
} from "react-icons/fa";
import "./modal.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import Autocomplete from "react-google-autocomplete";
import Geosuggest from "react-geosuggest";
import "./geo.css";
import { connect } from "react-redux";
import { loadTypes } from "../../actions/configAction";
import Validator from "../../views/Configurations/utils";
import { openSnackbars } from "../../actions/aplicantionActions";
import { setDataSucursal, branchEdit } from "../../actions/configAction";
import MapComponent from "./map.js";
import { MedicalInitialValues, MedicalValidacion } from "../constants";
import jstz from "jstz";
import { Formik } from "formik";

const validator = new Validator();

class ModalComponent extends React.Component {
  state = {
    loading: "show",
    contactos: false,
    multimedia: false,
    sociales: false,
    localizacion: false,
    dataContactos: [],
    isMarkerShown: false,
    lat: null,
    lng: null,
    zoom: 14,
    initialLocation: []
  };

  componentDidMount = () => {
    this.props.getDataTypes();
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

  componentWillReceiveProps(props) {
    props.medicalCenter.typeConfig
      ? this.setState({
          loading: "hide"
        })
      : null;

    props.dataEdit
      ? this.setState({
          dataContactos: props.dataEdit.contacto,
          isMarkerShown: true
        })
      : null;
  }

  refrescarMapa = () => {
    this.setState({
      lat: this.state.initialLocation.lat,
      lng: this.state.initialLocation.lng,
      zoom: 13
    });
  };

  handleSubmit = (values, formik) => {
    this.setState({ loading: "show" });
    if (this.state.isMarkerShown) {
      delete values.provinceId;
      const obj = {
        ...values,
        sucursal: values.name,
        contactos: this.state.dataContactos,
        posicion: !this.props.dataEdit
          ? this.state.initialLocation
          : this.props.dataEdit.key,
        lat: this.state.lat,
        log: this.state.lng,
        timeZ: jstz.determine().name()
      };
      console.log("dios mio", obj , this.props.dataEdit);
      if (!this.props.dataEdit) {
        this.props.setDataSucursal(obj, () => {
          this.props.close();
        });
      } else {
        this.props.branchEdit(obj, () => {
          this.props.close();
        });
      }
    } else {
      this.props.openSnackbars(
        "error",
        "Debe seleccionar la ubicacion del su centro medico"
      );
    }
  };

  fileHandler = (setField, name, data) => {
    const file = data;
    if (!file) {
      return;
    }
    let reader = new FileReader();

    reader.readAsDataURL(data);

    reader.onloadend = () => {
      setField(name, reader.result);
    };
  };

  delete = key => {
    if (this.props.disabled) {
      return;
    }
    const data = this.state.dataContactos;
    const array = data.filter((data, i) => {
      return key !== i;
    });
    this.setState({ dataContactos: array });
  };

  addedContact = (values, reset) => {
    const obj = {
      telefono: values.telefono,
      contacto: values.contactoN,
      email: values.email
    };
    const initialContacts = { telefono: "", contacto: "", email: "" };
    this.setState({ dataContactos: this.state.dataContactos.concat(obj) });

    reset({ ...values, ...initialContacts });
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
    this.setState({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      isMarkerShown: true
    });
  };

  render() {
    const { dataEdit, disabled } = this.props;
    const { open, close, medicalCenter } = this.props;
    const countrys = validator.filterCountry(medicalCenter.country);
    const type = !medicalCenter.typeConfig ? [] : medicalCenter.typeConfig.type;
    const sector = !medicalCenter.typeConfig
      ? []
      : medicalCenter.typeConfig.sector;

    const values = this.props.dataEdit
      ? this.props.dataEdit
      : MedicalInitialValues;

    const InititalValues = {
      ...values,
      idCountry: dataEdit ? dataEdit.countryId : countrys[0].id.toString(),
      type: dataEdit ? dataEdit.type : "0",
      provincesid: dataEdit ? dataEdit.provinceId : "0",
      sector: dataEdit ? dataEdit.sector : "0"
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
              validationSchema={MedicalValidacion}
              render={({
                values,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                handleBlur,
                resetForm
              }) => {
                const ButtonDisabled = false || disabled;
                //   values.contacto.length < 1 ||
                //   values.telefono.length < 1 ||
                //   values.email.length < 1;
                const provinces = validator.filterProvinces(
                  countrys,
                  values.idCountry
                );
                return (
                  <div>
                    <ModalHeader>Configuracion Centro Medicos</ModalHeader>
                    <ModalBody className="Scroll">
                      <div className="row">
                        <FormGroup className="top form-group col-sm-6">
                          <Label for="Sucursal" className="mr-sm-2">
                            Sucursal
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
                            Codigo
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
                            {type.map((type, key) => {
                              return (
                                <option key={key} value={key}>
                                  {type}
                                </option>
                              );
                            })}
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
                            {countrys.map(country => {
                              return (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              );
                            })}
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
                            {provinces.map((province, key) => {
                              return (
                                <option key={key} value={key}>
                                  {province.name}
                                </option>
                              );
                            })}
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
                            {sector.map((sector, key) => {
                              return (
                                <option key={key} value={key}>
                                  {sector}
                                </option>
                              );
                            })}
                          </Input>
                          <FormFeedback tooltip>
                            {this.state.sectorError}
                          </FormFeedback>
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6">
                          <Label for="Direccion">direccion</Label>
                          <Input
                            type="text"
                            value={values.direccion}
                            name="Direccion"
                            disabled={disabled}
                            id="Direccion"
                            onChange={event =>
                              setFieldValue("direccion", event.target.value)
                            }
                          />
                          {errors.direccion && touched.direccion && (
                            <FormFeedback style={{ display: "block" }} tooltip>
                              {errors.direccion}
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
                                    {errors.contacto && touched.contacto && (
                                      <FormFeedback
                                        style={{ display: "block" }}
                                        tooltip
                                      >
                                        {errors.sucursal}
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
                                              <a
                                                onClick={() => {
                                                  this.delete(i);
                                                }}
                                                className={
                                                  this.state.deleteview
                                                }
                                              >
                                                <FaMinusCircle
                                                  style={{
                                                    cursor: "pontier"
                                                  }}
                                                />
                                              </a>
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
                                multimedia: !this.state.multimedia
                              })
                            }
                            style={{ marginBottom: "1rem" }}
                          >
                            Multimedia
                          </Button>
                          <Collapse isOpen={this.state.multimedia}>
                            <Card>
                              <CardBody>
                                <div className="container">
                                  <form className={this.state.contactview}>
                                    <p className="text-muted">
                                      Ajuste el contenido multimedia de su
                                      Centro Medico
                                    </p>
                                    <div className="row">
                                      <div
                                        className={"top  form-group col-sm-6"}
                                      >
                                        <label>Logo</label>
                                        <br />
                                        <Input
                                          className="top"
                                          type="file"
                                          onBlur={handleBlur}
                                          name="logo"
                                          disabled={disabled}
                                          accept="image/*"
                                          onChange={event =>
                                            this.fileHandler(
                                              setFieldValue,
                                              "logo",
                                              event.currentTarget.files[0]
                                            )
                                          }
                                          invalid={this.state.logoInvalid}
                                          valid={this.state.logoValid}
                                        />
                                        {errors.logo && touched.logo && (
                                          <FormFeedback
                                            style={{ display: "block" }}
                                            tooltip
                                          >
                                            {errors.logo}
                                          </FormFeedback>
                                        )}
                                      </div>

                                      <div className="top  form-group col-sm-6">
                                        <label>Foto 1</label>
                                        <br />
                                        <Input
                                          type="file"
                                          accept="image/*"
                                          onBlur={handleBlur}
                                          disabled={disabled}
                                          name="foto1"
                                          onChange={event =>
                                            this.fileHandler(
                                              setFieldValue,
                                              "foto1",
                                              event.currentTarget.files[0]
                                            )
                                          }
                                        />
                                        {errors.foto1 && touched.foto1 && (
                                          <FormFeedback
                                            style={{ display: "block" }}
                                            tooltip
                                          >
                                            {errors.foto1}
                                          </FormFeedback>
                                        )}
                                      </div>
                                      <div className="top form-group col-sm-6">
                                        <label>Foto 2</label>
                                        <br />
                                        <Input
                                          type="file"
                                          accept="image/*"
                                          onBlur={handleBlur}
                                          disabled={disabled}
                                          name="foto2"
                                          onChange={event =>
                                            this.fileHandler(
                                              setFieldValue,
                                              "foto2",
                                              event.currentTarget.files[0]
                                            )
                                          }
                                        />
                                        {errors.foto2 && touched.foto2 && (
                                          <FormFeedback
                                            style={{ display: "block" }}
                                            tooltip
                                          >
                                            {errors.foto2}
                                          </FormFeedback>
                                        )}
                                      </div>
                                      <div className="top  form-group col-sm-6">
                                        <label>Foto 3</label>
                                        <br />
                                        <Input
                                          type="file"
                                          accept="image/*"
                                          onBlur={handleBlur}
                                          disabled={disabled}
                                          name="foto3"
                                          onChange={event =>
                                            this.fileHandler(
                                              setFieldValue,
                                              "foto3",
                                              event.currentTarget.files[0]
                                            )
                                          }
                                        />
                                        {errors.foto3 && touched.foto3 && (
                                          <FormFeedback
                                            style={{ display: "block" }}
                                            tooltip
                                          >
                                            {errors.foto3}
                                          </FormFeedback>
                                        )}
                                      </div>
                                    </div>
                                  </form>

                                  <div className={this.state.divfilehide}>
                                    {values.logo && (
                                      <img
                                        style={{ width: 150, height: 150 }}
                                        className="image"
                                        src={values.logo}
                                      />
                                    )}
                                    {values.file1 && (
                                      <img
                                        style={{ width: 150, height: 150 }}
                                        className="image"
                                        src={values.file1}
                                      />
                                    )}
                                    {values.file2 && (
                                      <img
                                        style={{ width: 150, height: 150 }}
                                        className="image"
                                        src={values.file2}
                                      />
                                    )}
                                    {values.file3 && (
                                      <img
                                        style={{ width: 150, height: 150 }}
                                        className="image"
                                        src={values.file3}
                                      />
                                    )}
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </Collapse>
                        </div>
                        <hr />

                        <div>
                          <Button
                            color="primary"
                            onClick={() =>
                              this.setState({
                                sociales: !this.state.sociales
                              })
                            }
                            style={{ marginBottom: "1rem" }}
                          >
                            Sociales
                          </Button>
                          <Collapse isOpen={this.state.sociales}>
                            <Card>
                              <CardBody>
                                <div className="container">
                                  <p className="text-muted">
                                    Ajuste la configuracion de su centro medico
                                  </p>
                                  <div className="row">
                                    <div className="form-group col-sm-6">
                                      <label>
                                        <FaTwitter />
                                      </label>
                                      <Input
                                        placeholder="Ingrese Twitter de Centro Medico"
                                        value={values.twitter}
                                        disabled={disabled}
                                        onChange={event =>
                                          setFieldValue(
                                            "twitter",
                                            event.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-sm-6">
                                      <label>
                                        <FaInstagram />
                                      </label>
                                      <Input
                                        placeholder="Ingrese Instagram de Centro Medico"
                                        value={values.instagram}
                                        disabled={disabled}
                                        onChange={event =>
                                          setFieldValue(
                                            "instagram",
                                            event.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-sm-6">
                                      <label>
                                        <FaFacebook />
                                      </label>
                                      <Input
                                        placeholder="Ingrese Facebook de Centro Medico"
                                        value={values.facebook}
                                        disabled={disabled}
                                        onChange={event =>
                                          setFieldValue(
                                            "facebook",
                                            event.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="form-group col-sm-6">
                                      <label>
                                        <FaExternalLinkAlt />
                                      </label>
                                      <Input
                                        placeholder="Ingrese la web del Centro Medico"
                                        value={values.web}
                                        disabled={disabled}
                                        onChange={event =>
                                          setFieldValue(
                                            "web",
                                            event.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </Collapse>
                        </div>
                        <hr />
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
                                <div>
                                  {!this.props.disabled && (
                                    <Geosuggest
                                      placeholder="Buscar en el mapa"
                                      onSuggestSelect={this.onSuggestSelect}
                                      location={
                                        new google.maps.LatLng(
                                          this.state.lat
                                            ? this.state.lat
                                            : this.props.dataEdit.lat,
                                          this.state.lng
                                            ? this.state.lng
                                            : this.props.dataEdit.log
                                        )
                                      }
                                      radius="20"
                                    />
                                  )}
                                </div>

                                <MapComponent
                                  lat={
                                    this.state.lat
                                      ? this.state.lat
                                      : this.props.dataEdit.lat
                                  }
                                  lng={
                                    this.state.lng
                                      ? this.state.lng
                                      : this.props.dataEdit.log
                                  }
                                  onMarkerClick={this.handleMarkerClick}
                                  isMarkerShown={this.state.isMarkerShown}
                                  initialLocation={this.state.initialLocation}
                                  currentLocation={this.state.currentLatLng}
                                  handleClickmap={this.handleClickmap}
                                  ref={cd => (this.map = cd)}
                                  zoom={this.state.zoom}
                                />
                                <br />
                                <Button
                                  color="success"
                                  onClick={this.refrescarMapa}
                                >
                                  Refrescar
                                </Button>
                              </CardBody>
                            </Card>
                          </Collapse>
                        </div>
                        <hr />
                        <div>
                          <Modal
                            isOpen={this.state.modalAlert}
                            className={this.state.claseModalConfirm}
                          >
                            <ModalHeader>
                              <p align="center">
                                <h5>
                                  <b>SmartClinic</b>
                                </h5>
                              </p>
                            </ModalHeader>
                            <ModalBody>
                              <div
                                className={this.state.divLoading2}
                                style={{ textAlign: "center" }}
                              >
                                <img
                                  src="assets/loader.gif"
                                  width="20%"
                                  height="5%"
                                />
                              </div>
                              <div color="success" className={this.state.check}>
                                <FaCheckCircle size="4em" />
                              </div>
                              <p align="center">
                                <h5>
                                  <b>{this.state.operacion}</b>
                                </h5>
                              </p>
                            </ModalBody>
                          </Modal>
                        </div>
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
  medicalCenter: state.config.toJS()
});

const mapDispatchToProps = dispatch => ({
  getDataTypes: () => dispatch(loadTypes()),
  openSnackbars: (type, message) => dispatch(openSnackbars(type, message)),
  setDataSucursal: (data, cb) => dispatch(setDataSucursal(data, cb)),
  branchEdit: (data, callback) => dispatch(branchEdit(data, callback))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalComponent);
