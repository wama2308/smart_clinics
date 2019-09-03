import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, FormFeedback, InputGroupAddon, InputGroup } from 'reactstrap';
import ModalTabla from './ModalTabla';
import Switch from '@material-ui/core/Switch';

class TurnosModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto: null,
      logoStatus: false,

      width: '',
      widthError: '',
      widthInvalid: false,

      height: '',
      heightError: '',
      heightInvalid: false,
    }
  }

  closeModal = () => {
    this.setState({

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

    if (this.state.width === "" || this.state.width === "e" ) {
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
    console.log(isValid);

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
    if (props.option === 2 || props.option === 3) {
      this.setState({
        width: '',
        height: ''
      })
    }
  }


  render() {
    const disableFoto = this.disabledfoto()
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
              <form onSubmit={this.handleSave.bind(this)}>
                <div className="row">
                  <FormGroup className="top form-group col-sm-6">
                    <Label for="motivo">Ancho del Ticket</Label>
                    <Input disabled={this.props.disabled}
                      invalid={this.state.widthInvalid}
                      name="width"
                      id="width"
                      onKeyUp={this.handlekeywidth}
                      onChange={this.handleChange}
                      value={this.state.width}
                      type="number"
                      placeholder="Titulo" />
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
                      placeholder="Titulo" />
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
                    />
                  </FormGroup>

                  <FormGroup className="top form-group col-sm-6">
                    <Label for="foto">Foto:</Label>
                    <InputGroup>
                      <Input className="top"
                        type="file"
                        accept="image/*"
                        invalid={this.state.fotoInvalid}
                        onChange={this.fileHandlerFoto}
                        disabled={disableFoto}
                      />
                      <FormFeedback tooltip>{this.state.fotoError}</FormFeedback>
                      <InputGroupAddon addonType="append">
                        <div>
                          {
                            this.state.foto != null && <img alt="foto" style={{ width: 100, height: 150 }} className="image" src={"data:image/jpeg;" + this.state.foto} />
                          }
                        </div>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </div>
                <ModalTabla

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
          </div>
        </Modal>
      </span>
    );
  }
}

export default TurnosModal;