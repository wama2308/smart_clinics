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
import {connect} from 'react-redux'
import { loadTypes }  from '../../actions/configAction'

class ModalComponent extends React.Component {
  state = {
    divLoading: "hide"
  };

  componentDidMount = () =>{
    this.props.getDataTypes()
  }

  render() {
    const { open, close, medicalCenter } = this.props;
    console.log(medicalCenter)
    return (
      <Modal
        isOpen={open}
        aria-labelledby="contained-modal-title-lg"
        className="Modal"
      >
        <div
          align="center"
          className={this.state.divLoading}
          style={{ padding: "5%" }}
        >
          <img src="assets/loader.gif" width="30%" />
        </div>
        <div className={this.state.divContainer}>
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
                    valid={this.state.sucursalValid}
                    disabled={this.state.sucursalesview}
                    invalid={this.state.sucursalInValid}
                    value={this.state.sucursal}
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
                    disabled={this.state.codigoDisabled}
                    invalid={this.state.codigoInValid}
                    value={this.state.codigo}
                    onChange={event => this.codigo(event)}
                  />
                  <FormFeedback tooltip>{this.state.codigoError}</FormFeedback>
                </FormGroup>

                <FormGroup className="top form-group col-sm-6">
                  <Label for="tipo">Tipo</Label>
                  <Input
                    type="select"
                    name="tipo"
                    valid={this.state.tipoValid}
                    invalid={this.state.tipoInvalid}
                    disabled={this.state.tipoview}
                    id="tipo"
                    onChange={event => this.tipos(event)}
                  >
                    <option value={null}>Select...</option>
                  </Input>
                  <FormFeedback tooltip>{this.state.tipoError}</FormFeedback>
                </FormGroup>

                <FormGroup className="top form-group col-sm-6">
                  <Label for="paisid">Pais</Label>
                  <Input
                    type="select"
                    name="pais"
                    id="paisid"
                    valid={this.state.paisValid}
                    invalid={this.state.paisInvalid}
                    disabled={this.state.paisview}
                    onChange={event => this.pais(event)}
                  />
                  <FormFeedback tooltip>{this.state.paisError}</FormFeedback>
                </FormGroup>

                <FormGroup className="top form-group col-sm-6">
                  <Label for="provincia">Provincia</Label>
                  <Input
                    type="select"
                    name="provincia"
                    id="provincia"
                    valid={this.state.provinceValid}
                    disabled={this.state.provinciaview}
                    invalid={this.state.provinceInvalid}
                    onChange={event => this.provincesValidation(event)}
                  >
                    <option value={null}>Select...</option>
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
                    valid={this.state.sectorValid}
                    invalid={this.state.sectorInvalid}
                    id="Sector"
                    disabled={this.state.sectorview}
                    onChange={event => this.sector(event)}
                  >
                    <option value={null}>Select...</option>
                  </Input>
                  <FormFeedback tooltip>{this.state.sectorError}</FormFeedback>
                </FormGroup>

                <FormGroup className="top form-group col-sm-6">
                  <Label for="Direccion">direccion</Label>
                  <Input
                    type="text"
                    value={this.state.address}
                    name="Direccion"
                    id="Direccion"
                    valid={this.state.direccionValid}
                    disabled={this.state.addressview}
                    invalid={this.state.direccionInValid}
                    onChange={this.direccion}
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
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
   medicalCenter: state.config.toJS()
})

const mapDispatchToProps = (dispatch) => ({
   getDataTypes: ()=>dispatch(loadTypes)
})

export default connect(mapStateToProps, null) (ModalComponent) 