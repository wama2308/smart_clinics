import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  InputGroupAddon,
  InputGroup
} from 'reactstrap';
import {
  setSwitchTableTurnos,
  editTurnosFunction,
  setSizeTableTurnos,
  setPositionTableTurnos,
  setGroupTableTurnos
} from '../../../actions/TurnosAction';
import ModalTabla from './ModalTabla';
import Switch from '@material-ui/core/Switch';
import { openConfirmDialog } from '../../../actions/aplicantionActions';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

class TurnosModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto: null,
      logoStatus: false,
      tabla: [],

      width: '',
      widthError: '',
      widthInvalid: false,

      height: '',
      heightError: '',
      heightInvalid: false,
      loading: "show",
      checked: false
    }
  }

  closeModal = () => {
    this.setState({
      loading: "show"
    });
    this.props.valorCloseModal(false);

  };

  fileHandlerFoto = event => {
    event.preventDefault();
    if (event.target.files[0].size > 25000) {
      this.setState({
        fotoError: 'El tamaño de la imagen no esta permitido ',
        fotoInvalid: true,
        collapseFil: true,
      })
    }
    else {
      this.setState({
        fotoError: ' ',
        fotoInvalid: false,
      })
      let selectedFile = event.target.files;
      let fileName = "";
      let file = null
      if (selectedFile.length > 0) {
        let fileToLoad = selectedFile[0];
        fileName = fileToLoad.name;
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
          file = fileLoadedEvent.target.result;
          this.setState({
            foto: file
          })
        }
          .bind(this)
        fileReader.readAsDataURL(fileToLoad);
      }
    }
  }

  handleChangeSwitch = name => event => {
    this.setState({
      [name]: event.target.checked
    });

    // if(this.state.checked === false && this.state !== ""){
    //   this.setState({
    //    foto: null
    //   });
    // }
  };

  disabledfoto = () => {
    if (this.state.logoStatus === true) {
      return false
    } else {
      if (this.state.foto !== null) {
        this.setState({
          foto: null
        })
        return true
      } else {
        return true
      }
    }
  }

  validate = () => {
    let widthError = "";
    let widthInvalid = false;

    let heightError = "";
    let heightInvalid = false;

    if (this.state.width === "" || this.state.width === "e") {
      widthError = "¡Ingrese el largo!";
      widthInvalid = true;
    }
    if (this.state.height === "" || this.state.width === "e") {
      heightError = "¡Ingrese el ancho!";
      heightInvalid = true;
    }

    if (widthError || heightError) {
      this.setState({
        heightError,
        heightInvalid,
        widthError,
        widthInvalid
      });
      return false;
    }
    return true;
  }

  handleSave = (event) => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid === true) {

      if (this.props.option === 3) {
        this.setState({ loading: 'hide' })
        this.props.editTurnosFunction({
          width: this.state.width,
          height: this.state.height,
          logo: this.state.foto,
          logo_status: this.state.logoStatus,
          fields: this.state.tabla
        },
          () => {
            this.closeModal();

          }
        )
      }
    }
  }

  handlekeywidth = event => {
    this.setState({
      widthError: "",
      widthInvalid: false
    });
  };

  handlekeyheight = event => {
    this.setState({
      heightError: "",
      heightInvalid: false
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  componentWillReceiveProps(props) {
    if (props.option === 2 || props.option === 3 || props.option === 4) {
      this.setState({ loading: 'hide' })
      this.setState({
        width: props.turnos.oneTurnos.width,
        height: props.turnos.oneTurnos.height,
        logoStatus: props.turnos.oneTurnos.logo_status,
        foto: props.turnos.oneTurnos.logo,
        tabla: props.turnos.oneTurnos.fields,
        loading: 'show'
      })
    }
  }

  componentDidMount() {
    if (this.props.option !== 1) {
      this.setState({ loading: 'hide' })
    }
  }


  render() {
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
                <form onSubmit={this.handleSave.bind(this)}>
                  <div className="row">
                    <FormGroup className="top form-group col-sm-6">
                      <Label for="width">Ancho del Ticket</Label>
                      <Input disabled={this.props.disabled}
                        invalid={this.state.widthInvalid}
                        name="width"
                        id="width"
                        onKeyUp={this.handlekeywidth}
                        onChange={this.handleChange}
                        value={this.state.width}
                        type="number"
                        placeholder="Ancho"
                        disabled={this.props.disabled}
                      />
                      <FormFeedback tooltip>{this.state.widthError}</FormFeedback>
                    </FormGroup>

                    <FormGroup className="top form-group col-sm-6">
                      <Label for="height">Largo del Ticket</Label>
                      <Input disabled={this.props.disabled}
                        invalid={this.state.heightInvalid}
                        name="height"
                        id="height"
                        onKeyUp={this.handlekeyheight}
                        onChange={this.handleChange}
                        value={this.state.height}
                        type="number"
                        placeholder="Largo"
                        disabled={this.props.disabled}
                      />
                      <FormFeedback tooltip>{this.state.heightError}</FormFeedback>
                    </FormGroup>

                    <FormGroup check className="top form-group col-sm-6">
                      <Label for="nombres">Logo</Label>
                      <br />
                      <Switch
                        checked={this.state.logoStatus ? this.state.logoStatus : false}
                        onChange={this.handleChangeSwitch("logoStatus")}
                        value={this.state.logoStatus}
                        color="primary"
                        disabled={this.props.disabled}
                      />
                    </FormGroup>

                    {this.state.logoStatus === true &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="foto">Foto:</Label>
                        <InputGroup>
                          <Input className="top"
                            type="file"
                            accept="image/*"
                            invalid={this.state.fotoInvalid}
                            onChange={this.fileHandlerFoto}
                            disabled={this.props.disabled}
                          />
                          <FormFeedback tooltip>{this.state.fotoError}</FormFeedback>
                          <InputGroupAddon addonType="append">
                            <div>
                              {
                                this.state.foto != null && <img alt="foto" style={{ width: 200, height: 150 }} className="image" src={"data:image/jpeg;" + this.state.foto} />
                              }
                            </div>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    }
                  </div>
                  <ModalTabla
                    data={this.state.tabla}
                    setSwitchTableTurnos={this.props.setSwitchTableTurnos}
                    disabled={this.props.disabled}
                    setSizeTableTurnos={this.props.setSizeTableTurnos}
                    setPositionTableTurnos={this.props.setPositionTableTurnos}
                    setGroupTableTurnos={this.props.setGroupTableTurnos}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button className="" color="danger" onClick={this.closeModal}>
                  Cancelar
                </Button>
                <Button
                  className={this.props.showHide}
                  color="primary"
                  onClick={this.handleSave}
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
  confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  setSwitchTableTurnos: (id, status) => dispatch(setSwitchTableTurnos(id, status)),
  editTurnosFunction: (data, callback) => dispatch(editTurnosFunction(data, callback)),
  setSizeTableTurnos: (id, data) => dispatch(setSizeTableTurnos(id, data)),
  setPositionTableTurnos: (id, data) => dispatch(setPositionTableTurnos(id, data)),
  setGroupTableTurnos: (id, data) => dispatch(setGroupTableTurnos(id, data))
})

const mapStateToProps = state => ({
  turnos: state.configTurnos.toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(TurnosModal);