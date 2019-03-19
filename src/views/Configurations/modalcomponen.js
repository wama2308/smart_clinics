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
import "./geo.css";
import "./modal.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";
import { loadTypes } from "../../actions/configAction";
import Validator from "../../views/Configurations/utils";
import { MedicalInitialValues, MedicalValidacion } from "../constants";
import { Formik } from "formik";

const validator = new Validator();

class ModalComponent extends React.Component {
  state = {
    loading: "show",
    contactos: false,
    multimedia: false,
    sociales: false,
    dataContactos: []
  };

  componentDidMount = () => {
    this.props.getDataTypes();
  };

  componentWillReceiveProps(props) {
    props.medicalCenter.typeConfig
      ? this.setState({
          loading: "hide"
        })
      : null;
  }

  handleSubmit = values => {
    console.log(values);
  };

  fileHandler = (setField, name, data) => {
    const file = data;
    console.log(file);
    let reader = new FileReader();

    reader.readAsDataURL(data);

    reader.onloadend = () => {
      setField(name, reader.result);
    };
  };

  delete = key => {
    const data = this.state.dataContactos;
    const array = data.filter((data, i) => {
      return key !== i;
    });
    console.log(array);
    this.setState({ dataContactos: array });
  };

  addedContact = (values, reset) => {
    const obj = {
      telefono: values.telefono,
      contacto: values.contacto,
      email: values.email
    };
    const initialContacts = { telefono: "", contacto: "", email: "" };
    this.setState({ dataContactos: this.state.dataContactos.concat(obj) });

    reset({ ...values, ...initialContacts });
  };

  render() {
    const { open, close, medicalCenter } = this.props;
    const countrys = validator.filterCountry(medicalCenter.country);
    const type = !medicalCenter.typeConfig ? [] : medicalCenter.typeConfig.type;
    const provinces = validator.filterProvinces(countrys, countrys[0].id);
    const sector = !medicalCenter.typeConfig
      ? []
      : medicalCenter.typeConfig.sector;

    const InititalValues = {
      ...MedicalInitialValues,
      country: countrys[0].id,
      type: 0,
      province: 0,
      sector: 0
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
              }) => (
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
                          name="sucursal"
                          value={values.sucursal}
                          id="Sucursal"
                          onBlur={handleBlur}
                          onChange={event =>
                            setFieldValue("sucursal", event.target.value)
                          }
                        />
                        {errors.sucursal && touched.sucursal && (
                          <FormFeedback style={{ display: "block" }} tooltip>
                            {errors.sucursal}
                          </FormFeedback>
                        )}
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="codigo" className="mr-sm-2">
                          Codigo
                        </Label>
                        <Input
                          type="text"
                          name="codigo"
                          id="codigo"
                          onChange={event =>
                            setFieldValue("codigo", event.target.value)
                          }
                        />
                        {errors.codigo && touched.codigo && (
                          <FormFeedback style={{ display: "block" }} tooltip>
                            {errors.codigo}
                          </FormFeedback>
                        )}
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="tipo">Tipo</Label>
                        <Input
                          type="select"
                          name="tipo"
                          id="tipo"
                          value={values.type}
                          onChange={event =>
                            setFieldValue("type", event.target.value)
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
                          value={values.country}
                          onChange={event =>
                            setFieldValue("country", event.target.value)
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
                          onChange={event =>
                            setFieldValue("provincia", event.target.value)
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
                          onChange={event =>
                            setFieldValue("sector", event.target.value)
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
                          this.setState({ contactos: !this.state.contactos })
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
                                    value={values.contacto}
                                    id="Sucursal"
                                    onBlur={handleBlur}
                                    onChange={event =>
                                      setFieldValue(
                                        "contacto",
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
                                  <Label className="mr-sm-2">Telefono</Label>
                                  <Input
                                    type="number"
                                    name="telefono"
                                    value={values.telefono}
                                    id="Sucursal"
                                    onBlur={handleBlur}
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
                                    onBlur={handleBlur}
                                    onChange={event =>
                                      setFieldValue("email", event.target.value)
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
                                          <td className={this.state.deleteview}>
                                            <a
                                              onClick={() => {
                                                this.delete(i);
                                              }}
                                              className={this.state.deleteview}
                                            >
                                              <FaMinusCircle
                                                style={{ cursor: "pontier" }}
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
                                    Ajuste el contenido multimedia de su Centro
                                    Medico
                                  </p>
                                  <div className="row">
                                    <div className={"top  form-group col-sm-6"}>
                                      <label>Logo</label>
                                      <br />
                                      <Input
                                        className="top"
                                        type="file"
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
                                      {console.log(values)}
                                      <FormFeedback  style={{ display: "block" }} tooltip>
                                        {errors.logo}
                                      </FormFeedback>
                                    </div>

                                    <div className="top  form-group col-sm-6">
                                      <label>Foto 1</label>
                                      <br />
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={event =>
                                          this.fileHandler(
                                            setFieldValue,
                                            "file1",
                                            event.currentTarget.files[0]
                                          )
                                        }
                                      />
                                      <FormFeedback tooltip>
                                        {this.state.foto1Error}
                                      </FormFeedback>
                                    </div>
                                    <div className="top form-group col-sm-6">
                                      <label>Foto 2</label>
                                      <br />
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={event =>
                                          this.fileHandler(
                                            setFieldValue,
                                            "file2",
                                            event.currentTarget.files[0]
                                          )
                                        }
                                      />
                                      <FormFeedback tooltip>
                                        {this.state.foto2Error}
                                      </FormFeedback>
                                    </div>
                                    <div className="top  form-group col-sm-6">
                                      <label>Foto 3</label>
                                      <br />
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={event =>
                                          this.fileHandler(
                                            setFieldValue,
                                            "file3",
                                            event.currentTarget.files[0]
                                          )
                                        }
                                      />

                                      <FormFeedback  style={{ display: "block" }} tooltip>
                                        {errors.logo}
                                      </FormFeedback>
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
                            this.setState({ sociales: !this.state.sociales })
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
                                      onChange={event =>
                                        setFieldValue("web", event.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Collapse>
                      </div>

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
                    <Button color="danger" onClick={close}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                      Guardar
                    </Button>
                  </ModalFooter>
                </div>
              )}
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
  getDataTypes: () => dispatch(loadTypes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalComponent);
