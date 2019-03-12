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

export default class MedicalCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: [],
      provinceid: "",
      provinces: [],
      SucursalInValid: false,
      loading: "hide",
      SucursalError: "",
      email: "",
      Sucursal: "",
      SucursalValid: false,
      provinceInvalid: false,
      SucursalInValid: false,
      SucursalValid: false,
      paisInvalid: false,
      master: []
    };
  }

  render() {
    const data = !this.props.data ? this.state : this.props.data
    const provinces = data.loading === 'hide' ? data.provincia.provinces : [] 
  
    return (
      <div>
        <div className={data.loading} style={{ textAlign: "center" }}>
          <img src="assets/loader.gif" width="20%" height="5%" />
        </div>
        { data.loading === 'hide' &&
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
                      value={data.name}
                      maxLength="40"
                      onChange={this.handleChange_}
                    />
                    <FormFeedback tooltip>{this.state.SucursalError}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="exampleEmail" className="mr-sm-2">
                      Email Master
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      value={data.master.length > 0 ? data.master[0].email:'' }
                      disabled
                    />
                  </FormGroup>
                  <FormGroup className=" top form-group col-sm-6">
                    <Label for="pais">Pais</Label>
                    <Input
                      type="select"
                      name="pais"
                      id="pais"
                      invalid={this.state.paisInvalid}
                      onChange={this.handleChange}
                    >
                      <option value="">Select...</option>
                      {provinces.map( (provincia , key) => {
                          return (
                            <option value={key} selected>
                              {provincia.name}
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
                      name="valorProvince"
                      id="valorProvince"
                      onChange={this.handleChange_}
                    >
                      <option value="">Select...</option>
                      {Object.keys(this.state.provinces).map((d, i) => {
                        if (this.state.inicio == "1") {
                          if (d == this.state.valorProvince) {
                            return (
                              <option value={d} selected>
                                {this.state.provinces[d].name}
                              </option>
                            );
                          } else {
                            return (
                              <option value={d}>
                                {this.state.provinces[d].name}
                              </option>
                            );
                          }
                        } else if (this.state.inicio == "2") {
                          return (
                            <option value={d}>
                              {this.state.provinces[d].name}
                            </option>
                          );
                        }
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
      }
      </div>
    );
  }
}
