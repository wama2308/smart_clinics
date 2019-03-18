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
  FaUserEdit,
  FaExclamationCircle,
  FaCheckCircle,
  FaMinusCircle
} from "react-icons/fa";
import "./geo.css";
import "./modal.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";
import { loadTypes } from "../../actions/configAction";
import Validator from "../../views/Configurations/utils";
import { Formik } from 'formik';


const validator = new Validator();

class ModalComponent extends React.Component {
  state = {
    loading: "show",
    contactos: false,
    multimedia: false,
    sociales: false
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

  render() {
    const { open, close, medicalCenter } = this.props;
    const countrys = validator.filterCountry(medicalCenter.country);
    const type = !medicalCenter.typeConfig ? [] : medicalCenter.typeConfig.type;
    const provinces = validator.filterProvinces(countrys, countrys[0].id);
    const sector = !medicalCenter.typeConfig
      ? []
      : medicalCenter.typeConfig.sector;

    console.log(provinces);
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
          render = {({values , handleSubmit, setFieldValue, errors }) =>(
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
                      name="Sucursal"
                      id="Sucursal"
                      onChange={event => this.sucursal(event)}
                    />
                    <FormFeedback tooltip>
                      {this.state.sucursalError}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="codigo" className="mr-sm-2">
                      Codigo
                    </Label>
                    <Input
                      type="text"
                      name="codigo"
                      id="codigo"
                      onChange={event => this.codigo(event)}
                    />
                    <FormFeedback tooltip>
                      {this.state.codigoError}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="tipo">Tipo</Label>
                    <Input
                      type="select"
                      name="tipo"
                      id="tipo"
                      onChange={event => this.tipos(event)}
                    >
                      {type.map((type, key) => {
                        return (
                          <option key={key} value={key}>
                            {type}
                          </option>
                        );
                      })}
                    </Input>
                    <FormFeedback tooltip>{this.state.tipoError}</FormFeedback>
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="tipo">Pais</Label>
                    <Input
                      type="select"
                      name="pais"
                      onChange={event => this.tipos(event)}
                    >
                      {countrys.map(country => {
                        return (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        );
                      })}
                    </Input>
                    <FormFeedback tooltip>{this.state.tipoError}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="provincia">Provincia</Label>
                    <Input
                      type="select"
                      name="provincia"
                      id="provincia"
                      onChange={event => this.provincesValidation(event)}
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
                      onChange={event => this.sector(event)}
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
                      value={this.state.address}
                      name="Direccion"
                      id="Direccion"
                    />
                    <FormFeedback tooltip>
                      {this.state.direccionError}
                    </FormFeedback>
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
                          <div className="error">{this.state.AddContact}</div>
                          <div className="row">
                            <FormGroup className="top form-group col-sm-6">
                              <Label for="Nombre">Contacto</Label>
                              <Input
                                name="name"
                                type="text"
                                id="name"
                                value={this.state.name}
                                onKeyUp={this.handlekey1}
                                valid={this.state.nombreValid}
                                invalid={this.state.nombreInvalid}
                                maxLength="10"
                                onChange={event =>
                                  this.setState({ name: event.target.value })
                                }
                                pattern="^[A-Za-z]*$"
                              />
                              <FormFeedback tooltip>
                                {this.state.nombreError}
                              </FormFeedback>
                            </FormGroup>

                            <FormGroup className="top form-group col-sm-6">
                              <Label for="Telefono">Telefono</Label>
                              <Input
                                name="phone"
                                id="telefono"
                                value={this.state.phone}
                                type="number"
                                onKeyUp={this.handlekey2}
                                valid={this.state.telefonoValid}
                                invalid={this.state.telefonoInValid}
                                pattern="^[0-9]*$"
                                maxLength="10"
                                onChange={event =>
                                  this.setState({ phone: event.target.value })
                                }
                              />
                              <FormFeedback tooltip>
                                {this.state.telefonoError}
                              </FormFeedback>
                            </FormGroup>

                            <FormGroup className="top form-group col-sm-6">
                              <Label for="Email" className="mr-sm-2">
                                Email
                              </Label>
                              <Input
                                name="email"
                                id="Email"
                                type="email"
                                value={this.state.email}
                                onKeyUp={this.handlekey3}
                                valid={this.state.emailValid}
                                invalid={this.state.emailInvalid}
                                onChange={event =>
                                  this.setState({ email: event.target.value })
                                }
                              />
                              <FormFeedback tooltip>
                                {this.state.emailError}
                              </FormFeedback>
                            </FormGroup>
                          </div>
                          <div>
                            <Button
                              onClick={this.handleSubmitContact}
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
                              <th className={this.state.acciones}>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.contacto != null &&
                              Object.keys(this.props.contacto).map(
                                (item, i) => {
                                  return (
                                    <tr className="text-center">
                                      <td>{this.props.contacto[item].name}</td>
                                      <td>{this.props.contacto[item].phone}</td>
                                      <td className="text-center">
                                        {this.props.contacto[item].email}
                                      </td>
                                      <td className={this.state.deleteview}>
                                        <a
                                          onClick={() => {
                                            this.deletecontact(item);
                                          }}
                                          key={item}
                                          className={this.state.deleteview}
                                        >
                                          <FaMinusCircle />
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
                        this.setState({ multimedia: !this.state.multimedia })
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
                                    invalid={this.state.logoInvalid}
                                    valid={this.state.logoValid}
                                    onChange={this.fileHandlerLogo}
                                  />
                                  <FormFeedback tooltip>
                                    {this.state.logoError}
                                  </FormFeedback>
                                </div>

                                <div className="top  form-group col-sm-6">
                                  <label>Foto 1</label>
                                  <br />
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={this.fileHandleFoto1}
                                    invalid={this.state.foto1Invalid}
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
                                    onChange={this.fileHandleFoto2}
                                    invalid={this.state.foto2Invalid}
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
                                    onChange={this.fileHandleFoto3}
                                    invalid={this.state.foto3Invalid}
                                  />
                                  <FormFeedback tooltip>
                                    {this.state.foto3Error}
                                  </FormFeedback>
                                </div>
                              </div>
                            </form>

                            <div className={this.state.divfilehide}>
                              {this.state.logo != null && (
                                <img
                                  style={{ width: 150, height: 150 }}
                                  className="image"
                                  src={"data:image/jpeg;" + this.state.logo}
                                />
                              )}
                              {this.state.foto1 != null && (
                                <img
                                  style={{ width: 150, height: 150 }}
                                  className="image"
                                  src={"data:image/jpeg;" + this.state.foto1}
                                />
                              )}
                              {this.state.foto2 != null && (
                                <img
                                  style={{ width: 150, height: 150 }}
                                  className="image"
                                  src={"data:image/jpeg;" + this.state.foto2}
                                />
                              )}
                              {this.state.foto3 != null && (
                                <img
                                  style={{ width: 150, height: 150 }}
                                  className="image"
                                  src={"data:image/jpeg;" + this.state.foto3}
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
                                  value={this.state.twitter}
                                  onChange={event =>
                                    this.setState({
                                      twitter: event.target.value
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group col-sm-6">
                                <label>
                                  <FaInstagram />
                                </label>
                                <Input
                                  placeholder="Ingrese Instagram de Centro Medico"
                                  value={this.state.instagram}
                                  onChange={event =>
                                    this.setState({
                                      instagram: event.target.value
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group col-sm-6">
                                <label>
                                  <FaFacebook />
                                </label>
                                <Input
                                  placeholder="Ingrese Facebook de Centro Medico"
                                  value={this.state.facebook}
                                  onChange={event =>
                                    this.setState({
                                      facebook: event.target.value
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group col-sm-6">
                                <label>
                                  <FaExternalLinkAlt />
                                </label>
                                <Input
                                  placeholder="Ingrese la web del Centro Medico"
                                  value={this.state.web}
                                  onChange={event =>
                                    this.setState({ web: event.target.value })
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
                        {console.log(this.state.modalAlert)}
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
                <Button onClick={this.modalConfirm} color="primary">
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
