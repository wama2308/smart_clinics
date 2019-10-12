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
      ...InitialState,
      masivo: false,
      existe: false,
      total: false,
      divGoodsSelect: "",
      divGoodsSelectError: "",
      arrayGoodsSelect: null,

      modelo: "",
      modeloError: "",
      modeloInvalid: false,

      desde: 0,
      desdeError: '',
      desdeInvalid: false,

      hasta: 0,
      hastaError: '',
      hastaInvalid: false,
    }
  }

  componentDidMount() {
    if (this.props.option !== 1 && this.props.option !== 4) {
      this.setState({ loading: 'hide' })
    } else if (this.props.option === 4) {
      const data = this.filter(this.props.data)
      const min = this.getGroup(data)
      const max = this.getGroupMax(data)

      this.setState({
        desde: min,
        hasta: min + 1,
        nombre: this.props.name,
        code: this.props.code
      })
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

    let serialError = "";
    let serialInvalid = false;

    let divGoodsSelect = "";
    let divGoodsSelectError = "";

    let modeloError = ""
    let modeloInvalid = false

    let desdeError = ""
    let desdeInvalid = false

    let hastaError = ""
    let hastaInvalid = false

    if (this.state.nombre === "") {
      if (this.state.existe === false) {
        nombreError = "¡Ingrese el Nombre!"
        nombreInvalid = true
      }
    }

    if (this.state.year === "") {
      if (this.state.total === false) {
        yearError = "¡Ingrese el Año!"
        yearInvalid = true
      }
    }

    if (this.state.code === "") {
      if (this.state.masivo === false && this.state.existe === false && this.props.option === 1) {
        if (this.props.option !== 4 && this.state.masivo === false) {
          codigoError = "¡Ingrese el Codigo!"
          codigoInvalid = true
        }
      } else if (this.state.masivo === true && this.state.existe === false) {
        codigoError = "¡Ingrese el Codigo!"
        codigoInvalid = true
      } else if (this.state.masivo === true && this.state.existe === true) {
        codigoError = ''
        codigoInvalid = false
      } else if (this.props.option === 4) {
        codigoError = "¡Ingrese el Codigo!"
        codigoInvalid = true
      }
    }

    if (this.state.marca === "") {
      if (this.state.total === false) {
        marcaError = "¡Ingrese la Marca!"
        marcaInvalid = true
      }
    }

    if (this.state.modelo === "") {
      if (this.state.total === false) {
        modeloError = "¡Ingrese el Modelo!"
        modeloInvalid = true
      }
    }

    if (this.state.cantidad === 0) {
      if (this.state.masivo === true && this.props.option === 1) {
        cantidadError = "¡Ingrese la Cantidad!"
        cantidadInvalid = true
      }
    }


    // if (this.state.tiempo === 0) {
    //   if (this.state.arrayProviderSelect !== null) {
    //     tiempoError = "¡Ingrese el Tiempo!"
    //     tiempoInvalid = true
    //   }
    // }

    if (this.state.desde === 0 && this.props.option === 4) {
      if (this.state.checkAll === false) {
        desdeError = "¡Ingrese el rango!"
        desdeInvalid = true
      }
    }

    if (this.state.desde === 0 && this.props.option === 4) {
      if (this.state.checkAll === false) {
        hastaError = "¡Ingrese el rango!"
        hastaInvalid = true
      }
    }

    if (this.state.arrayGoodsSelect === null || this.state.arrayGoodsSelect.length === 0) {
      if (this.state.existe === true) {
        divGoodsSelectError = "¡Seleccione el Bien!"
        divGoodsSelect = "borderColor"
      }
    }

    if (divProviderSelectError || nombreError || yearError || codigoError ||
      marcaError || cantidadError || tiempoError || serialError || divGoodsSelectError
      || cantidadError || modeloError || desdeError || hastaError) {
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
        tiempoInvalid,
        serialError,
        serialInvalid,
        divGoodsSelectError,
        divGoodsSelect,
        modeloError,
        modeloInvalid,
        desdeError,
        desdeInvalid,
        hastaError,
        hastaInvalid,
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

  handleGoods = arrayGoodsSelect => {
    this.setState({
      arrayGoodsSelect,
      divGoodsSelect: "",
      divGoodsSelectError: "",
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

  handleChangeSwitch = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  }

  getGroup = fields => {
    if (fields.length !== 0) {
      let arrayGroups = [];
      fields[0].belogings.map(field => {
        const number = parseInt(field.number)
        arrayGroups.push(number)
      });
      var min = Math.min.apply(null, arrayGroups)
    }
    return min
  };

  getGroupMax = fields => {
    if (fields.length !== 0) {
      let arrayGroups = [];
      fields[0].belogings.map(field => {
        arrayGroups.push(field.number)
      });
      var max = Math.max.apply(null, arrayGroups)
    }
    return max
  };

  handleDesde = e => {
    const { name, value } = e.target;
    const data = this.filter(this.props.data)
    const min = this.getGroup(data)
    const max = this.getGroupMax(data)

    if (parseInt(value) >= min && value <= data[0].quantity - 1) {
      this.setState({
        desde: parseInt(value),
        hasta: parseInt(value) + 1

      })
    }
  }

  handleHasta = e => {
    const { name, value } = e.target;
    const data = this.filter(this.props.data)
    const max = this.getGroupMax(data)
    const min = this.getGroup(data)
    if (this.props.data.length > 0) {
      if (parseInt(value) > min && parseInt(value) <= data[0].quantity) {
        this.setState({
          hasta: parseInt(value)
        });
      }
    }
  }

  filter = (data) => {
    if (data.length != 0) {
      const date = data.filter(data => {
        if (this.props.name != "") {
          return data.name === this.props.name
        }
      })
      return date

    } else {
      return []
    }
  }

  filterFull = () => {
    const data = this.filter(this.props.data)
    if (data.length !== 0) {
      const datos = data[0].belogings.filter(data => {
        return parseInt(data.number) >= this.state.desde && parseInt(data.number) <= this.state.hasta
      })

      const arrayClean = []
      datos.map(datos => {
        arrayClean.push(datos._id)
      })

      return arrayClean
    } else {
      return []
    }
  }

  componentWillReceiveProps(props) {
    if (props.option === 2 || props.option === 3) {
      if (props.goods.goodsOne.mantenance_staff) {
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
          serial: props.goods.goodsOne.serial,
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
          arrayProviderSelect: props.goods.goodsOne.mantenance_staff,
          tiempo: props.goods.goodsOne.maintenance_time,
          serial: props.goods.goodsOne.serial,
          loading: 'show'
        })
      }
    }
  }

  allId = () => {
    const data = this.filter(this.props.data)
    const array = []
    if (data.length !== 0) {
      data[0].belogings.map(data => {
        array.push(data._id)
      })
    }
    return array
  }

  handleSave = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      if (this.props.option === 1) {
        if (this.state.existe === false && this.state.masivo === false) {
          this.setState({ loading: 'hide' })
          this.props.createBelongingFunction({
            input: 0,
            name: this.state.nombre,
            code: this.state.code,
            model: this.state.modelo,
            brand: this.state.marca,
            year: this.state.year,
            photo: this.state.foto,
            mantenance_staff: this.state.arrayProviderSelect.value,
            maintenance_time: this.state.tiempo
          }, () => {
            this.closeModal()
          })
        } else if (this.state.existe === true && this.state.masivo === false) {
          this.setState({ loading: 'hide' })
          this.props.createBelongingFunction({
            input: 0,
            exists: this.state.arrayGoodsSelect.value,
            code: this.state.code,
            model: this.state.modelo,
            brand: this.state.marca,
            year: this.state.year,
            photo: this.state.foto,
            mantenance_staff: this.state.arrayProviderSelect.value,
            maintenance_time: this.state.tiempo
          }, () => {
            this.closeModal()
          })
        } else if (this.state.existe === false && this.state.masivo === true) {
          this.setState({ loading: 'hide' })
          this.props.createBelongingFunction({
            input: 1,
            quantity: this.state.cantidad,
            code: this.state.code,
            name: this.state.nombre,
            model: this.state.modelo,
            brand: this.state.marca,
            year: this.state.year,
            serial: this.state.serial,
            photo: this.state.foto,
            mantenance_staff: this.state.arrayProviderSelect.value,
            maintenance_time: this.state.tiempo
          }, () => {
            this.closeModal()
          })
        } else if (this.state.existe === true && this.state.masivo === true) {
          this.setState({ loading: 'hide' })
          this.props.createBelongingFunction({
            input: 1,
            quantity: this.state.cantidad,
            exists: this.state.arrayGoodsSelect.value,
            model: this.state.modelo,
            brand: this.state.marca,
            year: this.state.year,
            serial: this.state.serial,
            photo: this.state.foto,
            mantenance_staff: this.state.arrayProviderSelect.value,
            maintenance_time: this.state.tiempo
          }, () => {
            this.closeModal()
          })
        }
      } else if (this.props.option === 3) {
        this.setState({ loading: 'hide' })
        this.props.editBelongingFunction({
          input: 0,
          _id: this.props.id,
          belongings: this.props.specifict_id,
          name: this.state.nombre,
          code: this.state.code,
          model: this.state.modelo,
          brand: this.state.marca,
          serial: this.state.serial,
          year: this.state.year,
          photo: this.state.foto
        }, () => {
          this.closeModal()
        })
      } else if (this.props.option === 4) {
        if (this.state.total === false) {
          const arrayFilter = this.filterFull()
          this.setState({ loading: 'hide' })
          this.props.editBelongingFunction({
            input: 1,
            _id: this.props.id,
            belongings: arrayFilter,
            name: this.state.nombre,
            code: this.state.code,
            model: this.state.modelo,
            brand: this.state.marca,
            year: this.state.year,
          }, () => {
            this.closeModal()
          })
        } else {
          const arrayFilter = this.allId()
          this.setState({ loading: 'hide' })
          this.props.editBelongingFunction({
            input: 1,
            _id: this.props.id,
            belongings: arrayFilter,
            name: this.state.nombre,
            code: this.state.code,
            mantenance_staff: this.state.arrayProviderSelect.value,
            maintenance_time: this.state.tiempo
          }, () => {
            this.closeModal()
          })
        }
      }
    }
  }

  selectGoods = () => {
    const array = []
    this.props.data.map(data => {
      array.push({
        label: data.name,
        value: data._id
      })
    })
    return array
  }

  disabled = () => {
    if (this.props.option === 1) {
      return false
    } else if (this.props.option === 2) {
      return true
    } else if (this.props.option === 3) {
      return true
    } else if (this.props.option === 4) {
      if (this.state.total === false) {
        return true
      } else {
        return false
      }
    }
  }

  render() {
    const filter = this.filterFull(this.props.data)
    console.log(this.state);

    const disable = this.disabled()

    const select = this.selectGoods()
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

                    {this.props.option === 1 &&
                      <FormGroup className="top form-group col-sm-6">
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.check}
                              onChange={this.handleChangeSwitch('masivo')}
                              value="masivo"
                            />
                          }
                          label="Cargar Varios Bienes"
                        />
                      </FormGroup>
                    }

                    {this.props.option === 1 &&
                      <FormGroup className="top form-group col-sm-6">
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.check}
                              onChange={this.handleChangeSwitch('existe')}
                              value="existe"
                            />
                          }
                          label="Existe"
                        />
                      </FormGroup>
                    }

                    {this.props.option === 4 &&
                      <FormGroup className="top form-group col-sm-6">
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.check}
                              onChange={this.handleChangeSwitch('total')}
                              value="total"
                            />
                          }
                          label="Editar Todos"
                        />
                      </FormGroup>
                    }

                    {this.props.option === 4 && this.state.total === false &&
                      <FormGroup className="top form-group col-sm-3">
                        <Label for="desde">Rango Inicial</Label>
                        <Input
                          disabled={this.props.disabled}
                          invalid={this.state.desdeInvalid}
                          name="desde"
                          id="desde"
                          onKeyUp={this.handlekeyHabitaciones}
                          onChange={this.handleDesde}
                          value={this.state.desde}
                          type="number"
                          placeholder="Nro Habitaciones"
                        />
                        <div className="errorSelect">
                          {this.state.desdeError}
                        </div>
                      </FormGroup>
                    }

                    {this.props.option === 4 && this.state.total === false &&
                      <FormGroup className="top form-group col-sm-3">
                        <Label for="hasta">Rango Final</Label>
                        <Input
                          disabled={this.props.disabled}
                          invalid={this.state.hastaInvalid}
                          name="hasta"
                          id="hasta"
                          onKeyUp={this.handlekeyHabitaciones}
                          onChange={this.handleHasta}
                          value={this.state.hasta}
                          type="number"
                          placeholder="Nro Habitaciones"
                          min={0}
                          max={this.props.data}
                        />
                        <div className="errorSelect">
                          {this.state.hastaError}
                        </div>
                      </FormGroup>
                    }


                    {this.state.masivo === true && this.props.option !== 4 &&
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
                    }

                    {this.state.existe === true &&
                      < FormGroup className="top form-group col-sm-6">
                        <Label for="bienes">Bienes Registrados</Label>
                        <div className={this.state.divGoodsSelect}>
                          <Select
                            isSearchable="true"
                            //isDisabled={this.props.option !== 3 ? this.props.disabled : true}
                            name="bienes"
                            value={this.state.arrayGoodsSelect}
                            onChange={this.handleGoods}
                            options={select}
                          />
                        </div>
                        <div className="errorSelect">
                          {this.state.divGoodsSelectError}
                        </div>
                      </FormGroup>
                    }

                    {this.state.existe === false &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="nombre">Nombre</Label>
                        <Input
                          disabled={this.state.total === false && this.props.option === 4 ? disable : disable}
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
                    }

                    {this.state.existe === false && this.state.masivo === false &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="code">Codigo</Label>
                        <Input disabled={disable}
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
                    }

                    {this.state.existe === false && this.state.masivo === true &&
                      < FormGroup className="top form-group col-sm-6">
                        <Label for="code">Codigo</Label>
                        <Input disabled={disable}
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
                    }

                    {this.state.total === false &&
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
                        {/* <FormFeedback tooltip>{this.state.marcaError}</FormFeedback> */}
                        <div className="errorSelect">
                          {this.state.marcaError}
                        </div>
                      </FormGroup>
                    }
                    {this.state.total === false &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="modelo">Modelo</Label>
                        <Input disabled={this.props.disabled}
                          invalid={this.state.modeloInvalid}
                          name="modelo"
                          id="modelo"
                          onKeyUp={this.handlekeyTitulo}
                          onChange={this.handleChange}
                          value={this.state.modelo}
                          type="text"
                          placeholder="Modelo" />
                        <FormFeedback tooltip>{this.state.modeloError}</FormFeedback>
                      </FormGroup>
                    }
                    {this.state.total === false &&
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
                    }

                    {this.state.masivo === false && this.props.option != 1 && this.props.option != 4 &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="serial">Serial</Label>
                        <Input disabled={this.props.disabled}
                          invalid={this.state.serialInvalid}
                          name="serial"
                          id="serial"
                          onKeyUp={this.handlekeyTitulo}
                          onChange={this.handleChange}
                          value={this.state.serial}
                          type="text"
                          placeholder="Serial" />
                        <FormFeedback tooltip>{this.state.serialError}</FormFeedback>
                      </FormGroup>
                    }

                    {this.props.option === 3 && this.state.existe === false &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="proveedor">Personal De Mantenimiento:</Label>
                        <div className={this.state.divProveedor}>
                          <Select
                            isSearchable="true"
                            isDisabled={this.props.option === 4 ? false : disable}
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

                    {this.props.option != 2 && this.state.existe === false && this.state.total === true &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="proveedor">Personal De Mantenimiento:</Label>
                        <div className={this.state.divProveedor}>
                          <Select
                            isSearchable="true"
                            isDisabled={this.props.option === 4 ? false : disable}
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

                    {this.props.option != 1 && this.props.option != 3 && this.props.option != 4 && this.state.arrayProviderSelect !== "" &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="proveedor">Personal De Mantenimiento:</Label>
                        <div className={this.state.divProveedor}>
                          <Select
                            isSearchable="true"
                            isDisabled={disable}
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

                    {this.state.arrayProviderSelect !== "" && this.state.existe === false && this.props.option !== 4 &&
                      < FormGroup className="top form-group col-sm-6">
                        <Label for="tiempo">Tiempo de Mantenimiento (Dias)</Label>
                        <Input disabled={disable}
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

                    {this.state.arrayProviderSelect !== "" && this.state.existe === false && this.props.option === 4 &&
                      this.state.total === true &&
                      < FormGroup className="top form-group col-sm-6">
                        <Label for="tiempo">Tiempo de Mantenimiento (Dias)</Label>
                        <Input disabled={this.props.option === 4 ? false : disable}
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

                    {this.state.masivo === false && this.props.option !== 4 &&
                      < FormGroup className="top form-group col-sm-6">
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
                    }
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
      </span >
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