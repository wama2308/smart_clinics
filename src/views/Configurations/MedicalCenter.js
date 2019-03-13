import React from "react";
import {
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  FormFeedback,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal
} from "reactstrap";
import "./loading.css";
import "./modal.css";
import Validator from "./utils";
import jstz from "jstz";

const validator = new Validator();

export default class MedicalCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: [],
      countryid: 0,
      provinceid: 0,
      provinces: [],
      SucursalInValid: false,
      loading: "hide",
      SucursalError: "",
      email: "",
      Sucursal: "",
      selectedCountry: 0,
      SucursalError: "",
      paisError: "",
      SucursalError: "",
      provinciaError: "",
      SucursalValid: false,
      paisInvalid: false,
      provinceInvalid: false,
      master: [],
      name: ""
    };
  }

  componentWillReceiveProps(props) {
    props.data.countryid
      ? this.setState({
          selectedCountry: props.data.countryid,
          provinceid: props.data.provinceid,
          name: props.data.name
        })
      : 0;
  }

  handleSubmit = async event => {
    event.preventDefault();
    const valid = await this.validate();
    valid
      ? this.props.editAction({
          name: this.state.name,
          idCountry: this.state.selectedCountry,
          provinceid: this.state.provinceid,
          timeZ: jstz.determine().name()
        })
      : alert("not valid");
  };

  validate = () => {
    let SucursalError = "";
    let SucursalInValid = false;

    if (this.state.name.length === 0) {
      SucursalError = "¡Ingrese el nombre!";
      SucursalInValid = true;
    }
    if (this.state.name.length < 2) {
      SucursalError = "¡Escriba el nombre completo de su centro medico !";
      SucursalInValid = true;
    }
    if (SucursalError) {
      this.setState({
        SucursalError,
        SucursalInValid
      });
      return false;
    }
    return true;
  };

  filterProvinces = countries => {
    const array = countries.filter(countries => {
      return countries.id.includes(this.state.selectedCountry);
    });
    const provinces = array.length !== 0 ? array[0].provinces : [];

    return provinces;
  };

  render() {
    const data = !this.props.data ? this.state : this.props.data;
    const countrys = data.country ? validator.filterCountry(data.country) : [];
    const provinces = this.filterProvinces(countrys);

    return (
      <div>
        <div>
          <Modal
            isOpen={this.state.modalAlert}
            modalConfirm={this.modalConfirm}
            className={this.state.claseModalConfirm}
          >
            <ModalHeader modalConfirm={this.modalConfirm} />
            <ModalBody>
              <div color="success" className={this.state.check}>
                <FaCheckCircle size="4em" />
              </div>
              <div color="warning" className={this.state.warning}>
                <FaExclamationCircle size="4em" />
              </div>
              <div
                className={this.state.divLoading2}
                style={{ textAlign: "center" }}
              >
                <img src="assets/loader.gif" width="20%" height="5%" />
              </div>
              <div align="center" className={this.state.deletediv}>
                <h5>
                  <b>{this.state.delete}</b>
                </h5>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className={this.state.aceptar}
                onClick={this.buttonDeleteBranchOffices}
              >
                Aceptar
              </Button>{" "}
              <Button
                color="secondary"
                className={this.state.cancelar}
                onClick={this.modalCancel}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <div>
          <Modal
            isOpen={true}
            toggle={this.toggleWarning}
            className="ModalAlert"
          >
            <ModalHeader />
            <ModalBody>
              <div color="success" className={this.state.alertCheck}>
                <FaCheckCircle size="4em" />
              </div>
              <div color="success" className={this.state.alertExc}>
                <FaExclamationCircle size="4em" />
              </div>
              <h5 align="center">
                <b>{this.state.bodyAlert}</b>
              </h5>
            </ModalBody>
            <ModalFooter />
          </Modal>
        </div>
        <div className={data.loading} style={{ textAlign: "center" }}>
          <img src="assets/loader.gif" width="20%" height="5%" />
        </div>
        {data.loading === "hide" && (
          <div>
            <Form className="formCodeConfirm" onSubmit={this.handleSubmit}>
              <p className="text-muted">
                Ajuste la informacion basica de su Centro Medico
              </p>
              <div className="row">
                <FormGroup className="top form-group col-sm-6">
                  <Label for="Sucursal" className="mr-sm-2">
                    Nombre
                  </Label>
                  <Input
                    invalid={this.state.SucursalInValid}
                    onKeyUp={this.handlekey}
                    valid={this.state.SucursalValid}
                    type="text"
                    name="Sucursal"
                    id="Sucursal"
                    value={this.state.name}
                    maxLength="40"
                    onChange={event => {
                      this.setState({ name: event.target.value });
                    }}
                  />
                  <FormFeedback tooltip>
                    {this.state.SucursalError}
                  </FormFeedback>
                </FormGroup>
                <FormGroup className="top form-group col-sm-6">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Email Master
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    value={data.master.length > 0 ? data.master[0].email : ""}
                    disabled
                  />
                </FormGroup>
                <FormGroup className=" top form-group col-sm-6">
                  <Label for="pais">Pais</Label>
                  <Input
                    type="select"
                    name="pais"
                    id="pais"
                    defaultValue={data.provinceid - 1}
                    disabled={countrys.length < 1}
                    invalid={this.state.paisInvalid}
                    onChange={event => {
                      this.setState({ selectedCountry: event.target.value });
                    }}
                  >
                    {countrys.map(country => {
                      return (
                        <option value={country.id} selected>
                          {country.name}
                        </option>
                      );
                    })}
                  </Input>
                  <FormFeedback tooltip>{this.state.paisError}</FormFeedback>
                </FormGroup>
                <FormGroup className="top form-group col-sm-6">
                  <Label for="provincia">Provincia</Label>
                  <Input
                    type="select"
                    invalid={this.state.provinceInvalid}
                    value={this.state.provinceid}
                    name="valorProvince"
                    id="valorProvince"
                    disabled={provinces.length < 1}
                    onChange={event => {
                      this.setState({ provinceid: event.target.value });
                    }}
                  >
                    {provinces.map((province, key) => {
                      return (
                        <option value={key} selected>
                          {province.name}
                        </option>
                      );
                    })}
                  </Input>
                  <FormFeedback tooltip>
                    {" "}
                    {this.state.provinciaError}
                  </FormFeedback>
                </FormGroup>
                <div className="top form-group col-sm-6">
                  <Button type="submit" color="primary">
                    Guardar
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </div>
    );
  }
}
