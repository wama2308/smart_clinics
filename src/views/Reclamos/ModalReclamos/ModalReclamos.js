import React, { Component } from 'react';
import { ModalHeader, Modal, ModalBody, Input, FormFeedback } from 'reactstrap';
import { InitalState } from './InitialState';
import { FormGroup } from 'reactstrap';
import { Label } from 'reactstrap';
import Select from 'react-select';
import { ModalFooter } from 'reactstrap';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

class ModalReclamos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...InitalState
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  toggle = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  closeModal = () => {
    this.setState({
      ...InitalState,
      loading: "show"
    });
    this.props.valorCloseModal(false);
  };

  validate = () => {
    let divSucursalesSelect = "";
    let divSucursalesSelectError = "";

    let divCentroMedicoSelect = "";
    let divCentroMedicoSelectError = "";

    let descripcionError = "";
    let descripcionInvalid = false;

    let divVisitadorSelect = ""
    let divVisitadorSelectError = "";

    if (this.state.arraySucursalesSelect === null) {
      divSucursalesSelectError = "¡Seleccione la sucursal!";
      divSucursalesSelect = "borderColor";
    }
    if (this.state.arrayCentroMedicoSelect === null) {
      divCentroMedicoSelectError = "¡Seleccione el Centro Medico!";
      divCentroMedicoSelect = "borderColor"
    }
    if (this.state.descripcion === "") {
      descripcionError = "¡Ingrese la descripcion!";
      descripcionInvalid = true;
    }
    if (this.state.arrayVisitadorSelect === null) {
      divVisitadorSelectError = "¡Seleccione el Visitador!";
      divVisitadorSelect = "borderColor"
    }

    if (divCentroMedicoSelectError || divSucursalesSelectError || descripcionError || divVisitadorSelectError) {
      this.setState({
        divSucursalesSelectError,
        divSucursalesSelect,
        descripcionError,
        descripcionInvalid,
        divVisitadorSelectError,
        divVisitadorSelect,
        divCentroMedicoSelect,
        divCentroMedicoSelectError
      });
      return false;
    }
    return true;
  }

  handlekeyDescripcion = event => {
    this.setState({
      descripcionError: "",
      descripcionInvalid: false
    });
  };

  handleChangeSucursalesSelect = arraySucursalesSelect => {
    this.setState({
      arraySucursalesSelect,
      divSucursalesSelect: "",
      divSucursalesSelectError: ""
    });
  };

  handleChangeCentroMedicoSelect = arrayCentroMedicoSelect => {
    this.setState({
      arrayCentroMedicoSelect,
      divCentroMedicoSelect: "",
      divCentroMedicoSelectError: ""
    });
  };

  handleVisitadorSelect = arrayVisitadorSelect => {
    this.setState({
      arrayVisitadorSelect,
      divVisitadorSelect: '',
      divVisitadorSelectError: '',
    });
  };
  render() {
    return (
      <span>
        <Modal
          isOpen={this.props.modal}
          toggle={this.closeModal}
          className="ModalStore">
          <div>
            <ModalHeader toggle={this.closeModal}>
              {this.props.modalHeader}</ModalHeader>
            <ModalBody className="Scroll">
              <form>
                <div className="row">
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="sucursales">Centro Medico</Label>
                    <div className={this.state.divCentroMedicoSelect}>
                      <Select
                        isSearchable="true"
                        isDisabled={this.props.disabled}
                        name="sucursales"
                        value={this.state.arrayCentroMedicoSelect}
                        onChange={this.handleChangeCentroMedicoSelect}
                      //options={this.props.branchOfficces}
                      />
                    </div>
                    <div className="errorSelect">
                      {this.state.divCentroMedicoSelectError}
                    </div>
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="sucursales">Sucursales</Label>
                    <div className={this.state.divSucursalesSelect}>
                      <Select
                        isSearchable="true"
                        isDisabled={this.props.disabled}
                        name="sucursales"
                        value={this.state.arraySucursalesSelect}
                        onChange={this.handleChangeSucursalesSelect}
                      //options={this.props.branchOfficces}
                      />
                    </div>
                    <div className="errorSelect">
                      {this.state.divSucursalesSelectError}
                    </div>
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="sucursales">Visitador</Label>
                    <div className={this.state.divVisitadorSelect}>
                      <Select
                        isSearchable="true"
                        isDisabled={this.props.disabled}
                        name="sucursales"
                        value={this.state.arrayVisitadorSelect}
                        onChange={this.handleVisitadorSelect}
                      //options={this.props.branchOfficces}
                      />
                    </div>
                    <div className="errorSelect">
                      {this.state.divVisitadorError}
                    </div>
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="descripcion">Descripcion:</Label>
                    <Input
                      disabled={this.props.disabled}
                      invalid={this.state.descripcionInvalid}
                      name="descripcion"
                      id="descripcion"
                      onKeyUp={this.handlekeyDescripcion}
                      onChange={this.handleChange}
                      value={this.state.descripcion}
                      type="textarea"
                      placeholder="Descripcion"
                    />
                    <FormFeedback tooltip>
                      {this.state.descripcionError}
                    </FormFeedback>
                  </FormGroup>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button className="" color="danger" onClick={this.closeModal}>
                Cancelar
                </Button>
              <Button
                className={this.props.showHide}
                color="primary"
                onClick={this.handleSaveAlmacen}
              >
                {this.props.modalFooter}
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </span>
    );
  }
}

export default connect(
  null,
  null
)(ModalReclamos);