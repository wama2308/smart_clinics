import React, { Component } from 'react';
import { ModalHeader, Modal, ModalBody, Input, FormFeedback } from 'reactstrap';
import { InitalState } from './InitialState';
import { FormGroup } from 'reactstrap';
import { Label } from 'reactstrap';
import Select from 'react-select';
import { ModalFooter } from 'reactstrap';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { cleanReclamos, saveReclamosAction, updateReclamosFuction, cancelVisitorClaimFunction, registerVisitorClaimFunction, updateReclamosVisitorFuction } from '../../../actions/reclamosAction';
import CircularProgress from '@material-ui/core/CircularProgress';



class ModalVisitador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...InitalState,

      motivo: '',
      motivoError: '',
      motivoInvalid: false,
    }
  }

  componentDidMount() {
    if (this.props.option !== 1) {
      this.setState({ loading: 'hide' })
    }
  }

  componentWillReceiveProps(props) {
    if (props.option === 2 || props.option === 3) {
      if (props.reclamos.reclamosId) {
        if (props.reclamos.reclamosId.rason !== "") {
          this.setState({
            descripcion: props.reclamos.reclamosId.claim,
            arrayCentroMedicoSelect: props.reclamos.reclamosId.medical_center_receiver,
            arraySucursalesSelect: props.reclamos.reclamosId.branchoffice_receiver,
            arrayVisitadorSelect: props.reclamos.reclamosId.visitor,
            motivo: props.reclamos.reclamosId.rason,
            loading: 'show'
          })
        }
      }
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
    this.props.cleanReclamos();
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

    let motivoError = "";
    let motivoInvalid = false;

    if (this.state.arraySucursalesSelect === null || this.state.arraySucursalesSelect.length === 0) {
      divSucursalesSelectError = "¡Seleccione la sucursal!";
      divSucursalesSelect = "borderColor";
    }
    if (this.state.arrayCentroMedicoSelect === null || this.state.arrayCentroMedicoSelect.length === 0) {
      divCentroMedicoSelectError = "¡Seleccione el Centro Medico!";
      divCentroMedicoSelect = "borderColor"
    }
    if (this.state.descripcion === "") {
      descripcionError = "¡Ingrese la descripcion!";
      descripcionInvalid = true;
    }
    if (this.state.arrayVisitadorSelect === null || this.state.arrayVisitadorSelect.length === 0) {
      divVisitadorSelectError = "¡Seleccione el Visitador!";
      divVisitadorSelect = "borderColor"
    }
    if (this.state.motivo === "") {
      motivoError = "¡Ingrese el Motivo!";
      motivoInvalid = true;
    }

    if (divCentroMedicoSelectError || divSucursalesSelectError || descripcionError || divVisitadorSelectError || motivoError) {
      this.setState({
        divSucursalesSelectError,
        divSucursalesSelect,
        descripcionError,
        descripcionInvalid,
        divVisitadorSelectError,
        divVisitadorSelect,
        divCentroMedicoSelect,
        divCentroMedicoSelectError,
        motivoError,
        motivoInvalid
      });
      return false;
    }
    return true;
  }

  validateVisitor = () => {
    let divSucursalesSelect = "";
    let divSucursalesSelectError = "";

    let divCentroMedicoSelect = "";
    let divCentroMedicoSelectError = "";

    let descripcionError = "";
    let descripcionInvalid = false;

    let motivoError = "";
    let motivoInvalid = false;

    if (this.state.arraySucursalesSelect === null || this.state.arraySucursalesSelect.length === 0) {
      divSucursalesSelectError = "¡Seleccione la sucursal!";
      divSucursalesSelect = "borderColor";
    }
    if (this.state.arrayCentroMedicoSelect === null || this.state.arrayCentroMedicoSelect.length === 0) {
      divCentroMedicoSelectError = "¡Seleccione el Centro Medico!";
      divCentroMedicoSelect = "borderColor"
    }
    if (this.state.descripcion === "") {
      descripcionError = "¡Ingrese la descripcion!";
      descripcionInvalid = true;
    }
    if (this.state.motivo === "") {
      motivoError = "¡Ingrese el Motivo!";
      motivoInvalid = true;
    }

    if (divCentroMedicoSelectError || divSucursalesSelectError || descripcionError  || motivoError) {
      this.setState({
        divSucursalesSelectError,
        divSucursalesSelect,
        descripcionError,
        descripcionInvalid,
        divCentroMedicoSelect,
        divCentroMedicoSelectError,
        motivoError,
        motivoInvalid
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

  handleChangeCentroMedicoSelect = arrayCentroMedicoSelect => {
    this.setState({
      arrayCentroMedicoSelect,
      arraySucursales: arrayCentroMedicoSelect.branchoffices,
      divCentroMedicoSelect: "",
      divCentroMedicoSelectError: "",
      arraySucursalesSelect: [],
      arrayVisitadorSelect: []
    });
  };

  handleChangeSucursalesSelect = arraySucursalesSelect => {
    this.setState({
      arraySucursalesSelect,
      arrayVisitador: arraySucursalesSelect.visitor,
      divSucursalesSelect: "",
      divSucursalesSelectError: "",
    });
  };

  handleVisitadorSelect = arrayVisitadorSelect => {
    this.setState({
      arrayVisitadorSelect,
      divVisitadorSelect: '',
      divVisitadorSelectError: '',
    });
  }

  handleSaveUser = (event) => {
    event.preventDefault();
    const isValid = this.validateVisitor();
    if (isValid) {
      if (this.props.option === 1) {
        this.setState({ loading: 'hide' })
        this.props.registerVisitorClaimFunction(
          {
            medical_center_id: this.state.arrayCentroMedicoSelect.value,
            branchoffice_id: this.state.arraySucursalesSelect.value,
            rason: this.state.motivo,
            claim: this.state.descripcion

          },
          () => {
            this.closeModal();
            this.setState({
              ...InitalState,
              motivo: '',
              motivoError: '',
              motivoInvalid: false,
            })
          }
        )
      } else if (this.props.option === 3) {
        this.setState({ loading: 'hide' })
        this.props.updateReclamosVisitorFuction(
          {
            id_claim_transmitter: this.props.id_transmitter,
            id_claim_receiver: this.props.id_receiber,
            medical_center_id: this.state.arrayCentroMedicoSelect.value,
            branchoffice_id: this.state.arraySucursalesSelect.value,
            rason: this.state.motivo,
            claim: this.state.descripcion

          },
          () => {
            this.closeModal();
            this.setState({
              ...InitalState,
              motivo: '',
              motivoError: '',
              motivoInvalid: false,
            })
          }
        )
      }
    }
  }

  handlekeyTitulo = event => {
    this.setState({
      motivoError: "",
      motivoInvalid: false
    });
  }

  render() {
    console.log(this.props.reclamos.visitor_id);
    
    return (
      <span>
        <Modal
          isOpen={this.props.modal}
          toggle={this.closeModal}
          className="ModalStore">

          {this.state.loading === "show" ?
            <div>
              <ModalHeader toggle={this.closeModal}>
                {this.props.modalHeader}</ModalHeader>
              <ModalBody className="Scroll">
                <form onSubmit={this.handleSaveUser.bind(this)}>
                  <div className="row">
                    <FormGroup className="top form-group col-sm-6">
                      <Label for="CentroMedico">Centro Medico</Label>
                      <div className={this.state.divCentroMedicoSelect}>
                        <Select
                          isSearchable="true"
                          isDisabled={this.props.disabled}
                          name="CentroMedico"
                          value={this.state.arrayCentroMedicoSelect}
                          onChange={this.handleChangeCentroMedicoSelect}
                          options={this.props.branchOffices}
                          id="CentroMedico"
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
                          options={this.state.arraySucursales}
                          id="sucursales"
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.divSucursalesSelectError}
                      </div>
                    </FormGroup>

                    {this.props.visitor_disable === true &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="visitador">Visitador</Label>
                        <div className={this.state.divVisitadorSelect}>
                          <Select
                            isSearchable="true"
                            isDisabled={this.props.disabled}
                            name="visitador"
                            value={this.state.arrayVisitadorSelect}
                            onChange={this.handleVisitadorSelect}
                            options={this.state.arrayVisitador}
                            id="visitador"
                          />
                        </div>
                        <div className="errorSelect">
                          {this.state.divVisitadorError}
                        </div>
                      </FormGroup>
                    }

                    <FormGroup className="top form-group col-sm-6">
                      <Label for="motivo">Titulo:</Label>
                      <Input disabled={this.props.disabled}
                        invalid={this.state.motivoInvalid}
                        name="motivo"
                        id="motivo"
                        onKeyUp={this.handlekeyTitulo}
                        onChange={this.handleChange}
                        value={this.state.motivo}
                        type="text"
                        placeholder="Titulo" />
                      <FormFeedback tooltip>{this.state.motivoError}</FormFeedback>
                    </FormGroup>
                    <FormGroup className="top form-group col-sm-12">
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
                        rows="4"
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
                  onClick={this.handleSaveUser}
                >
                  {this.props.modalFooter}
                </Button>
              </ModalFooter>
            </div> :
            <div style={{ height: "55vh" }}>
              <CircularProgress style={{ position: " absolute", height: 40, top: "45%", right: "50%", zIndex: 2 }} />
            </div>
          }
        </Modal>
      </span>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  cleanReclamos: () => dispatch(cleanReclamos()),
  saveReclamosAction: (data, callback) => dispatch(saveReclamosAction(data, callback)),
  updateReclamosFuction: (data, callback) => dispatch(updateReclamosFuction(data, callback)),
  registerVisitorClaimFunction: (data, callback) => dispatch(registerVisitorClaimFunction(data, callback)),
  updateReclamosVisitorFuction: (data, callback) => dispatch(updateReclamosVisitorFuction(data, callback))
})
const mapStateToProps = state => ({
  reclamos: state.reclamos.toJS()
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalVisitador);