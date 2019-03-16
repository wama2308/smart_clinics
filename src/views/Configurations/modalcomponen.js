import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormFeedback,
  FormGroup,
  Label
} from "reactstrap";
import "./geo.css";
import "./modal.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";
import { loadTypes } from "../../actions/configAction";
import Validator from "../../views/Configurations/utils";

const validator = new Validator();

class ModalComponent extends React.Component {
  state = {
    loading: "show"
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
    const provinces = validator.filterProvinces(
      countrys,
      countrys[0].id
    );
    const sector = !medicalCenter.typeConfig
      ? []
      : medicalCenter.typeConfig.sector;

    console.log(provinces)
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
            <form>
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
                       {provinces.map( (province, key) => {
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
              </ModalBody>
              <ModalFooter>
                <Button onClick={this.modalConfirm} color="primary">
                  Guardar
                </Button>
                <Button color="danger" onClick={close}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
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
