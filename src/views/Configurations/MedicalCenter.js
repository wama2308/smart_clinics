import React from 'react'
import {
  Button,
  Input,
  TabPane,
  Form,
  FormGroup,
  Label,
  FormFeedback
} from "reactstrap";
import "./loading.css";
import "./modal.css";
import { datosConexion } from '../../components/Conexion'
import jstz from "jstz";

export default class MedicalCenter extends React.Component {
    constructor(props) {
        super(props);
        let valueConexion = "";
        let arrayConexion = Object.values(datosConexion);
        arrayConexion.forEach(function(elemento, indice, array) {
          if (indice === 0) {
            valueConexion = elemento;
          }
        });
    
        const timezone = jstz.determine();
    
        this.state = {   
          country: [],
          provinceid: "",
          provinces: [],
        };
      }
    

    render(){
        return(
            <TabPane tabId="1">
            <div
              className={this.state.divLoading}
              style={{ textAlign: "center" }}
            >
              <img src="assets/loader.gif" width="20%" height="5%" />
            </div>
            <div className={this.state.divContainer}>
              <Form
                className="formCodeConfirm"
                onSubmit={this.handleSubmit}
              >
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
                      value={this.state.Sucursal}
                      maxLength="40"
                      onChange={this.handleChange_}
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
                      placeholder={this.state.email}
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
                      {Object.keys(this.state.country).map(d => {
                        if (
                          this.state.country[d].id ===
                          this.state.countryid
                        ) {
                          return (
                            <option
                              value={this.state.country[d].id}
                              selected
                            >
                              {this.state.country[d].name}
                            </option>
                          );
                        } else {
                          return (
                            <option value={this.state.country[d].id}>
                              {this.state.country[d].name}
                            </option>
                          );
                        }
                      })}
                    </Input>
                    <FormFeedback tooltip>
                      {this.state.paisError}
                    </FormFeedback>
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
          </TabPane>
        )
    }
}