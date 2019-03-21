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
import {Loading} from "../../components/Modals";
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
      modal:false,
      modalType:"loading"
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

  componentDidMount=()=>{
    this.setState({loading:'show'})
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      modal:true,
      modalType:'loading'
    })
    const valid = await this.validate();
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
              modal:false,
            })
          }
        )
      : null;
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

  filterProvinces = (countries) => {
    const array = countries.filter(countries => {
      return countries.id.includes(this.state.selectedCountry);
    });
    const provinces = array.length !== 0 ? array[0].provinces : [];

    return provinces;
  };

  render() {
    const data = !this.props.data ? this.state : this.props.data;
    const countrys = data.country ? validator.filterCountry(data.country) : [];
    const provinces = validator.filterProvinces(countrys, this.state.selectedCountry);

    return (
      <div>
        {this.state.modal && <Loading type={this.state.modalType}/>}
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
                    onChange={event => {
                      this.setState({ selectedCountry: event.target.value });
                    }}
                  >
                    {countrys.map((country ,key) => {
                      return (
                        <option key={key} value={country.id}>
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
                        <option key={key} value={key}>
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
