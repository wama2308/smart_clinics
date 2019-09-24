import React, { Component } from 'react';
import { Modal, Button, FormFeedback, InputGroup, InputGroupAddon } from 'reactstrap';
import { ModalHeader } from 'reactstrap';
import { ModalBody } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { Label } from 'reactstrap';
import { ModalFooter } from 'reactstrap';
import { Input } from 'reactstrap';
import { connect } from "react-redux";
import Select from 'react-select';
import { FormControlLabel } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { createBelongingFunction, editBelongingFunction } from '../../actions/GoodsAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InitialState } from './InitialState'

class ModalGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...InitialState
    }
  }

  componentDidMount() {
    if (this.props.option !== 1) {
      this.setState({ loading: 'hide' })
    }
  }

  closeModal = () => {
    this.setState({
      ...InitialState,
    });
    this.props.valorCloseModal(false);
  };

  fileHandlerFoto = (event) => {
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
      let file = []
      if (selectedFile.length > 0) {
        let fileToLoad = selectedFile[0];
        fileName = fileToLoad.name;
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
          file.push(fileLoadedEvent.target.result)

          this.setState({
            foto: file
          })
        }
          .bind(this)
        fileReader.readAsDataURL(fileToLoad);
      }
    }
  }

  validate = () => {

    let nombreError = "";
    let nombreInvalid = false;

    let codigoError = "";
    let codigoInvalid = false;

    let cantidadError = "";
    let cantidadInvalid = false;

    let marcaError = "";
    let marcaInvalid = false;

    let yearError = "";
    let yearInvalid = false;

    let divProviderSelect = "";
    let divProviderSelectError = "";

    let tiempoError = "";
    let tiempoInvalid = false;

    if (this.state.nombre === "") {
      nombreError = "¡Ingrese el Nombre!"
      nombreInvalid = true
    }

    if (this.state.year === "") {
      yearError = "¡Ingrese el Año!"
      yearInvalid = true
    }

    if (this.state.code === "") {
      codigoError = "¡Ingrese el Codigo!"
      codigoInvalid = true
    }

    if (this.state.marca === "") {
      marcaError = "¡Ingrese el Marca!"
      marcaInvalid = true
    }

    if (this.state.cantidad === 0) {
      cantidadError = "¡Ingrese la Cantidad!"
      cantidadInvalid = true
    }

    if (this.state.tiempo === 0) {
      if (this.state.arrayProviderSelect !== "") {
        tiempoError = "¡Ingrese el Tiempo!"
        tiempoInvalid = true
      }
    }

    if (divProviderSelectError || nombreError || yearError || codigoError || marcaError || cantidadError || tiempoError) {
      this.setState({
        divProviderSelectError,
        divProviderSelect,
        nombreError,
        nombreInvalid,
        yearError,
        yearInvalid,
        codigoError,
        codigoInvalid,
        marcaError,
        marcaInvalid,
        cantidadError,
        cantidadInvalid,
        tiempoError,
        tiempoInvalid

      });
      return false;
    }
    return true
  }

  handleProvider = arrayProviderSelect => {
    this.setState({
      arrayProviderSelect,
      divBedroomsStatusSelect: '',
      divBedroomsStatusSelectError: '',
    })
  }

  handlekeyNombre = event => {
    this.setState({
      nombreError: "",
      nombreInvalid: false
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleChangeTime = e => {
    const { name, value } = e.target;
    if (value > 0) {
      this.setState({
        tiempo: parseInt(value)
      });
    }
  }

  handleChangeCantidad = e => {
    const { name, value } = e.target;
    if (value > 0) {
      this.setState({
        cantidad: value
      });
    }
  }

  componentWillReceiveProps(props) {
    if (props.option === 2 || props.option === 3) {
      if (props.goods.goodsOne.mantenance_staff.value !== "") {
        this.setState({
          nombre: props.goods.goodsOne.name,
          cantidad: props.goods.goodsOne.quantity,
          code: props.goods.goodsOne.code,
          marca: props.goods.goodsOne.brand,
          modelo: props.goods.goodsOne.model,
          year: props.goods.goodsOne.year,
          foto: props.goods.goodsOne.photo,
          arrayProviderSelect: props.goods.goodsOne.mantenance_staff,
          tiempo: props.goods.goodsOne.maintenance_time,
          loading: 'show'
        })
      } else {
        this.setState({
          nombre: props.goods.goodsOne.name,
          cantidad: props.goods.goodsOne.quantity,
          code: props.goods.goodsOne.code,
          marca: props.goods.goodsOne.brand,
          modelo: props.goods.goodsOne.model,
          year: props.goods.goodsOne.year,
          foto: props.goods.goodsOne.photo,
          loading: 'show'
        })
      }
    }
  }

  handleSave = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      if (this.props.option === 1) {
        if (this.state.arrayProviderSelect === "") {
          this.setState({ loading: 'hide' })
          this.props.createBelongingFunction({
            name: this.state.nombre,
            code: this.state.code,
            quantity: this.state.cantidad,
            model: this.state.modelo,
            brand: this.state.marca,
            year: this.state.year,
            photo: this.state.foto
          }, () => {
            this.closeModal()
          })
        } else {
          this.setState({ loading: 'hide' })
          this.props.createBelongingFunction({
            name: this.state.nombre,
            code: this.state.code,
            quantity: this.state.cantidad,
            model: this.state.modelo,
            brand: this.state.marca,
            year: this.state.year,
            photo: this.state.foto,
            mantenance_staff: this.state.arrayProviderSelect.value,
            maintenance_time: this.state.tiempo
          }, () => {
            this.closeModal()
          })
        }
      } else if (this.props.option === 3) {
        if (this.state.arrayProviderSelect === "") {
          this.setState({ loading: 'hide' })
          this.props.editBelongingFunction({
            _id: this.props.id,
            name: this.state.nombre,
            code: this.state.code,
            quantity: this.state.cantidad,
            model: this.state.modelo,
            brand: this.state.marca,
            year: this.state.year,
            photo: this.state.foto
          }, () => {
            this.closeModal()
          })
        } else {
          this.setState({ loading: 'hide' })
          this.props.editBelongingFunction({
            _id: this.props.id,
            name: this.state.nombre,
            code: this.state.code,
            quantity: this.state.cantidad,
            model: this.state.modelo,
            brand: this.state.marca,
            year: this.state.year,
            photo: this.state.foto,
            mantenance_staff: this.state.arrayProviderSelect.value,
            maintenance_time: this.state.tiempo
          }, () => {
            this.closeModal()
          })
        }
      }
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
                      <Label for="cantidad">Cantidad</Label>
                      <Input disabled={this.props.disabled}
                        invalid={this.state.cantidadInvalid}
                        name="cantidad"
                        id="cantidad"
                        onKeyUp={this.handlekeyTitulo}
                        onChange={this.handleChangeCantidad}
                        value={this.state.cantidad}
                        type="number"
                        placeholder="Cantidad" />
                      <FormFeedback tooltip>{this.state.cantidadError}</FormFeedback>
                    </FormGroup>

                    <FormGroup className="top form-group col-sm-6">
                      <Label for="nombre">Nombre</Label>
                      <Input disabled={this.props.disabled}
                        invalid={this.state.nombreInvalid}
                        name="nombre"
                        id="nombre"
                        onKeyUp={this.handlekeyNombre}
                        onChange={this.handleChange}
                        value={this.state.nombre}
                        type="text"
                        placeholder="Nombre" />
                      <FormFeedback tooltip>{this.state.nombreError}</FormFeedback>
                    </FormGroup>

                    <FormGroup className="top form-group col-sm-6">
                      <Label for="code">Codigo</Label>
                      <Input disabled={this.props.disabled}
                        invalid={this.state.codigoInvalid}
                        name="code"
                        id="code"
                        onKeyUp={this.handlekeyTitulo}
                        onChange={this.handleChange}
                        value={this.state.code}
                        type="text"
                        placeholder="Codigo" />
                      <FormFeedback tooltip>{this.state.codigoError}</FormFeedback>
                    </FormGroup>

                    <FormGroup className="top form-group col-sm-6">
                      <Label for="marca">Marca</Label>
                      <Input disabled={this.props.disabled}
                        invalid={this.state.marcaInvalid}
                        name="marca"
                        id="marca"
                        onKeyUp={this.handlekeyTitulo}
                        onChange={this.handleChange}
                        value={this.state.marca}
                        type="text"
                        placeholder="Marca" />
                      <FormFeedback tooltip>{this.state.marcaError}</FormFeedback>
                    </FormGroup>

                    <FormGroup className="top form-group col-sm-6">
                      <Label for="modelo">Modelo</Label>
                      <Input disabled={this.props.disabled}
                        invalid={this.state.marcaInvalid}
                        name="modelo"
                        id="modelo"
                        onKeyUp={this.handlekeyTitulo}
                        onChange={this.handleChange}
                        value={this.state.modelo}
                        type="text"
                        placeholder="Modelo" />
                      <FormFeedback tooltip>{this.state.marcaError}</FormFeedback>
                    </FormGroup>

                    <FormGroup className="top form-group col-sm-6">
                      <Label for="year">Año</Label>
                      <Input disabled={this.props.disabled}
                        invalid={this.state.yearInvalid}
                        name="year"
                        id="year"
                        onKeyUp={this.handlekeyTitulo}
                        onChange={this.handleChange}
                        value={this.state.year}
                        type="text"
                        placeholder="Año" />

                      <div className="errorSelect">
                        {this.state.yearError}
                      </div>
                    </FormGroup>

                    {this.props.option != 2 &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="proveedor">Personal De Mantenimiento:</Label>
                        <div className={this.state.divProveedor}>
                          <Select
                            isSearchable="true"
                            isDisabled={this.props.disabled}
                            name="proveedor"
                            value={this.state.arrayProviderSelect}
                            onChange={this.handleProvider}
                            options={this.props.aplication.dataGeneral.dataCountries.provider}
                          />
                        </div>
                        <div className="errorSelect">
                          {this.state.divProviderSelectError}
                        </div>
                      </FormGroup>
                    }

                    {this.props.option != 1 && this.props.option != 3 && this.state.arrayProviderSelect !== "" &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="proveedor">Personal De Mantenimiento:</Label>
                        <div className={this.state.divProveedor}>
                          <Select
                            isSearchable="true"
                            isDisabled={this.props.disabled}
                            name="proveedor"
                            value={this.state.arrayProviderSelect}
                            onChange={this.handleProvider}
                            options={this.props.aplication.dataGeneral.dataCountries.provider}
                          />
                        </div>
                        <div className="errorSelect">
                          {this.state.divProviderSelectError}
                        </div>
                      </FormGroup>
                    }

                    {this.state.arrayProviderSelect !== "" &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="tiempo">Tiempo de Mantenimiento</Label>
                        <Input disabled={this.props.disabled}
                          invalid={this.state.tiempoInvalid}
                          name="tiempo"
                          id="tiempo"
                          onKeyUp={this.handlekeyTitulo}
                          onChange={this.handleChangeTime}
                          value={this.state.tiempo}
                          type="number"
                          placeholder="Tiempo de Mantenimiento" />
                        <FormFeedback tooltip>{this.state.tiempoError}</FormFeedback>
                      </FormGroup>
                    }

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
                              this.state.foto != null && this.state.foto != "" && <img alt="foto" style={{ width: 200, height: 150 }} className="image" src={"data:image/jpeg;" + this.state.foto} />
                            }
                          </div>
                        </InputGroupAddon>
                      </InputGroup>
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
const mapStateToProps = state => ({
  goods: state.goods.toJS(),
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
  createBelongingFunction: (data, callback) => dispatch(createBelongingFunction(data, callback)),
  editBelongingFunction: (data, callback) => dispatch(editBelongingFunction(data, callback))
});


export default connect(mapStateToProps, mapDispatchToProps)(ModalGoods);