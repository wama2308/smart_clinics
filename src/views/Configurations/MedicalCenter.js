import React from "react";
import {
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  FormFeedback
} from "reactstrap";
import "./loading.css";
import "./modal.css";
import jstz from "jstz";
import { Loading } from "../../components/Modals";
import Validator from "./utils";

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
      loading: "show",
      SucursalError: "",
      email: "",
      selectedCountry: 0,
      SucursalError: "",
      paisError: "",
      SucursalError: "",
      provinciaError: "",
      SucursalValid: false,
      paisInvalid: false,
      provinceInvalid: false,
      name: "",
      modal: false,
      modalType: "loading"
    };
  }

  componentDidMount = () => {
    this.setState({ loading: "show" });
    if (this.props.data.name) {
      this.setState({
        selectedCountry: this.props.data.countryid,
        provinceid: this.props.data.provinceid,
        name: this.props.data.name
      });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      modal: true,
      modalType: "loading"
    });
    const valid = await this.validate();
    const data={
      name: this.state.name,
      idCountry: this.state.selectedCountry,
      provinceid: this.state.provinceid,
      timeZ: jstz.determine().name()
    }
    valid
      ? this.props.editAction(
          {
            name: this.state.name,
            idCountry: this.state.selectedCountry,
            provinceid: this.state.provinceid,
            timeZ: jstz.determine().name()
          },
          () => {
            this.setState({
              modal: false
            });
          }
        )
      : this.setState({ modal: false });
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
      if (SucursalError) {
        this.setState({
          SucursalError,
          SucursalInValid
        });
        return false;
      }
      return true;
    }
    return true;
  };

  filterProvinces = () => {
    const result = this.props.info.countries.find(country =>
      country.value.includes(this.state.selectedCountry)
    );
    return result.provinces;
  };

  render() {
    const data = !this.props.data ? this.state : this.props.data;
    const provinces = this.filterProvinces();

    return (
      <div>
        {this.state.modal && <Loading type={this.state.modalType} />}
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
                    value={this.state.selectedCountry}
                    disabled={this.props.info.countries.length < 1}
                    onChange={event => {
                      this.setState({ selectedCountry: event.target.value });
                    }}
                  >
                    {this.props.info.countries.map((country, key) => {
                      return (
                        <option key={country.value} value={country.value}>
                          {country.label}
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
                        <option key={provinces.value} value={province.value}>
                          {province.label}
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
