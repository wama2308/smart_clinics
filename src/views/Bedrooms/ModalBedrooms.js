import React, { Component } from 'react';
import {
  ModalHeader,
  Modal,
  ModalBody,
  Input,
  FormFeedback,
  ModalFooter,
  FormGroup,
  Label,
  Button,
  InputGroup,
  InputGroupAddon,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import {
  createBedroomsFunction,
  searchBelogingFunction,
  actionAcceptFunction,
  setDatasuppies,
  deleteDataSupplies,
  editOneBedroomsFunction,
  dataSuppliesSet,
  oneSuppliesSet,
  editBedroomsFunction,
  queryOneBelongingFunction,
  messageError,
  messageErrorInvalid,
  propsAction,
  setOptionSearch,
  setMasivo,
  setSupplies,
  deleteSupplies
} from '../../actions/bedroomsActions';
import Select from 'react-select';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablaSuplies from './TablaSuplies';
import Switch from '@material-ui/core/Switch';
import { FormControlLabel } from '@material-ui/core';
import { InitalState } from './InitialState';
import classnames from 'classnames';

class ModalBedrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...InitalState,
      activeTab: "1",
      checkAll: false,
      calculo: ""
    }
  }

  componentDidMount() {
    if (this.props.option > 1 && this.props.option < 4) {
      this.setState({ loading: 'hide' })
    } else if (this.props.option === 4) {
      const data = this.filter(this.props.data)
      const min = this.getGroup(data)
      // const max = this.getGroupMax(data)

      this.setState({
        desde: min,
        hasta: min + 1
      })

      if (!this.props.type_name) {
        const data = this.props.type_bedrooms.find(type_bedrooms => {
          return type_bedrooms.value === this.props.id
        })
        this.setState({
          loading: 'show',
          arrayBedroomsTypeSelect: data
        })
      } else {
        const typeSelect = this.props.type_bedrooms.find(type_bedrooms => {
          return type_bedrooms.value === this.props.id
        })

        const data = this.props.type_consulting_room.find(type_consulting_room => {
          return type_consulting_room.value === this.props.type_name
        })

        this.setState({
          loading: 'show',
          arrayBedroomsTypeSelect: typeSelect,
          arrayConsultingRoomSelect: data
        })
      }
    }
  }

  closeModal = () => {
    this.setState({
      ...InitalState
    });
    this.props.valorCloseModal(false);
    this.props.deleteDataSupplies()
    this.props.propsAction(0)

    let set = ""
    this.props.search(set)
  };

  validate = () => {
    let divBedroomsSelect = "";
    let divBedroomsSelectError = "";

    let habitacionesError = "";
    let habitacionesInvalid = false;

    let divBedroomsStatusSelect = ''
    let divBedroomsStatusSelectError = ''

    let nombreError = ""
    let nombreInvalid = false

    let abreviaturaError = ""
    let abreviaturaInvalid = false

    let divConsultingRoomSelect = ""
    let divConsultingRoomSelectError = ''

    let pisoError = ""
    let pisoInvalid = false

    let desdeError = ""
    let desdeInvalid = false

    let hastaError = ""
    let hastaInvalid = false

    let cantidadError = ""
    let cantidadInvalid = false

    let id = []

    if (this.props.option === 1 && this.props.bedrooms.dataAccept.length > 0) {
      this.props.bedrooms.dataAccept.map(list => {
        const cal = list.cantidad * this.state.habitaciones
        if (cal > list.quantity_stock) {
          cantidadError = "¡Cantidad Exedida!"
          cantidadInvalid = true
          this.setState({
            calculo: cal
          })
          id.push({ ...list })
        }
      })
    }

    // if (this.props.option === 3) {
    //   this.state.supplies.map(list => {
    //     if (list.quantity_stock === 0) {
    //       cantidadError = "¡Ingrese la Cantidad!"
    //       cantidadInvalid = true
    //     }
    //   })
    // }

    if (this.props.option === 4) {
      this.props.bedrooms.dataAccept.map(list => {
        if (list.cantidad < 1) {
          cantidadError = "¡Ingrese la Cantidad!"
          cantidadInvalid = true
        } else {
          const cal = list.cantidad * this.state.habitaciones
          if (cal > list.quantity_stock) {
            cantidadError = "¡Cantidad Exedida!"
            cantidadInvalid = true
            this.setState({
              calculo: cal
            })
            id.push({ ...list })
          }
        }
      })
    }

    if (!this.state.arrayBedroomsTypeSelect) {
      divBedroomsSelectError = "¡Seleccione el Tipo de Espacio!";
      divBedroomsSelect = "borderColor";
    }

    if (!this.state.arrayConsultingRoom) {
      divConsultingRoomSelect = "¡Seleccione el Tipo de Departamento!";
      divConsultingRoomSelectError = "borderColor";
    }

    if (this.props.option === 1 && this.state.check) {
      if (this.state.habitaciones < 1) {
        habitacionesError = "¡Ingrese la cantidad de Espacio!";
        habitacionesInvalid = true;
      }
    }

    if (!this.state.arrayBedroomsStatusSelect) {
      divBedroomsStatusSelectError = "¡Seleccione el Estatus!";
      divBedroomsStatusSelect = "borderColor";
    }

    if (!this.state.check) {
      if (this.props.option > 0 && this.props.option < 4) {
        if (!this.state.nombre) {
          nombreError = "¡Ingrese el Nombre!";
          nombreInvalid = true;
        }
      }
    }

    if (!this.state.abreviatura) {
      if (this.props.option > 0 && this.props.option < 4) {
        abreviaturaError = "¡Ingrese la Abreviatura!"
        abreviaturaInvalid = true
      } else {
        if (this.state.checkAll) {
          abreviaturaError = "¡Ingrese la Abreviatura!"
          abreviaturaInvalid = true
        }
      }
    }

    // if (this.state.foto.length === 0 || this.state.foto === null) {
    //   if (this.state.check === false) {
    //     if (this.props.option !== 4) {
    //       fotoError = "¡Ingrese la Foto!";
    //       fotoInvalid = true;
    //     }
    //   }
    // }

    if (!this.state.piso) {
      pisoError = "¡Ingrese el piso!"
      pisoInvalid = true;
    }

    if (this.state.desde < 1 && this.props.option === 4) {
      if (!this.state.checkAll) {
        desdeError = "¡Ingrese el rango!"
        desdeInvalid = true
      }
    }

    if (this.state.hasta < 1 && this.props.option === 4) {
      if (!this.state.checkAll) {
        hastaError = "¡Ingrese el rango!"
        hastaInvalid = true
      }
    }

    if (divBedroomsSelectError || habitacionesError ||
      divBedroomsStatusSelectError || nombreError ||
      abreviaturaError || divConsultingRoomSelectError ||
      pisoError || desdeError || hastaError || cantidadError) {
      this.setState({
        divBedroomsSelectError,
        habitacionesError,
        habitacionesInvalid,
        divBedroomsSelect,
        divBedroomsStatusSelectError,
        divBedroomsStatusSelect,
        nombreError,
        nombreInvalid,
        abreviaturaError,
        abreviaturaInvalid,
        divConsultingRoomSelect,
        divConsultingRoomSelectError,
        pisoError,
        pisoInvalid,
        desdeError,
        desdeInvalid,
        hastaError,
        hastaInvalid,
        cantidadError,
        cantidadInvalid,
        id
      });
      return false;
    }
    return true
  }

  handlekeyHabitaciones = event => {
    this.setState({
      habitacionesError: "",
      habitacionesInvalid: false
    });
  }

  handleChange = e => {
    const { name, value } = e.target;

    if (value > 1) {
      this.setState({
        [name]: parseInt(value)
      });
    }
  };

  getGroup = fields => {
    let min = 0
    if (fields.length > 0) {
      let arrayGroups = [];
      fields[0].spaces.map(field => {
        arrayGroups.push(parseInt(field.number))
      });
      min = Math.min.apply(null, arrayGroups)
    }
    return min
  };

  // getGroupMax = fields => {
  //   if (fields.length !== 0) {
  //     let arrayGroups = [];
  //     fields[0].spaces.map(field => {
  //       arrayGroups.push(field.number)
  //     });
  //     var max = Math.max.apply(null, arrayGroups)
  //   }
  //   return max
  // };

  handleDesde = e => {
    const { value } = e.target;
    const data = this.filter(this.props.data)
    const min = this.getGroup(data)
    // const max = this.getGroupMax(data)
    let number = parseInt(value)
    if (number >= min && number <= data[0].rank - 1) {
      this.setState({
        desde: number,
        hasta: number + 1
      })
    }
  }

  handleHasta = e => {
    const { value } = e.target;
    let number = parseInt(value)
    const data = this.filter(this.props.data)
    // const max = this.getGroupMax(data)
    const min = this.getGroup(data)
    if ((data.length > 0) && ((number > min) && (number <= data[0].rank))) {
      // if (number > min && number <= data[0].rank) {
      this.setState({
        hasta: number
      });
      // }
    }
  }

  handleTypeBedrooms = arrayBedroomsTypeSelect => {
    this.setState({
      arrayBedroomsTypeSelect,
      divBedroomsSelect: '',
      divBedroomsSelectError: '',
      desde: 0,
      hasta: 0
    })
  }

  handleStatusBedrooms = arrayBedroomsStatusSelect => {
    this.setState({
      arrayBedroomsStatusSelect,
      divBedroomsStatusSelect: '',
      divBedroomsStatusSelectError: '',
    })
  }

  handleConsulting = arrayConsultingRoomSelect => {
    this.setState({
      arrayConsultingRoomSelect,
      divConsultingRoomSelect: '',
      divConsultingRoomSelectError: '',
    })
  }

  functionArray = (data) => {
    let arrayClean = []
    data.map(datos => {
      arrayClean.push({
        ...datos,
        quantity: datos.cantidad
      })
    })

    return arrayClean
  }

  allId = () => {
    let data = this.filter(this.props.data)
    let arrayId = []
    if (data.length > 0) {
      data[0].spaces.map(datos => {
        arrayId.push(datos._id)
      })
    }
    return arrayId
  }

  handleSave = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      if (this.props.option === 1) {
        const supplies = this.functionArray(this.props.bedrooms.dataAccept)
        this.setState({ loading: 'hide' })
        this.props.createBedroomsFunction({
          input: this.state.check,
          quantity_rooms: (this.state.check) ? this.state.habitaciones : "",
          type_office: (this.state.arrayConsultingRoomSelect) ? this.state.arrayConsultingRoomSelect.value : "",
          name: this.state.nombre,
          status: this.state.arrayBedroomsStatusSelect.value,
          type: this.state.arrayBedroomsTypeSelect.value,
          floor: this.state.piso,
          abbreviation: this.state.abreviatura,
          photos: this.state.foto,
          belongings: supplies
        }, () => {
          this.closeModal();
          this.setState({
            ...InitalState
          })
        })
      } else if (this.props.option === 4) {
        const bedroomsArray = (!this.state.checkAll) ? this.filterFull(this.props.data) : this.allId()
        let arrayBelongings = []
        if (this.props.bedrooms.dataAccept) {
          this.props.bedrooms.dataAccept.map(data => {
            arrayBelongings.push({
              ...data,
              quantity: data.cantidad,
            })
          })
        }
        this.setState({ loading: 'hide' })
        this.props.editBedroomsFunction({
          input: 1,
          status: this.state.arrayBedroomsStatusSelect.value,
          type: this.state.arrayBedroomsTypeSelect.value,
          floor: this.state.piso,
          abbreviation: this.state.abreviatura,
          bedrooms: bedroomsArray,
          type_office: (this.state.arrayConsultingRoomSelect) ? this.state.arrayConsultingRoomSelect.value : "",
          belongings: arrayBelongings

        }, () => {
          this.props.deleteDataSupplies()
          this.closeModal();
          this.setState({
            ...InitalState
          })
        })
      } else if (this.props.option === 3) {
        let arrayBelongings = []
        if (this.props.bedrooms.bedroomsOne.supplies) {
          this.props.bedrooms.bedroomsOne.supplies.map(data => {
            arrayBelongings.push({
              ...data,
              quantity: data.quantity_stock,
            })
          })
        }

        this.setState({ loading: 'hide' })
        this.props.editBedroomsFunction({
          input: 0,
          _id: this.props.id,
          type: this.state.arrayBedroomsTypeSelect.value,
          status: this.state.arrayBedroomsStatusSelect.value,
          type_office: (this.state.arrayConsultingRoomSelect) ? this.state.arrayConsultingRoomSelect.value : "",
          photos: this.state.foto,
          name: this.state.nombre,
          abbreviation: this.state.abreviatura,
          floor: this.state.piso,
          belongings: arrayBelongings,
        }, () => {
          this.closeModal();
          this.setState({
            ...InitalState
          })
        })
      }
    }
  }

  arrayClean = (data) => {
    let clean = []
    data.map(list => {
      clean.push({
        name: list.name,
        _id: list._id,
        quantity: list.quantity
      })
    })
    return clean
  }

  fileHandlerFoto = (event) => {
    event.preventDefault();
    if (event.target.files[0].size > 25000) {
      this.setState({
        fotoError: 'El tamaño de la imagen no esta permitido',
        fotoInvalid: true,
        collapseFil: true,
      })
    } else {
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
          file.push({ foto: fileLoadedEvent.target.result })

          if (this.state.foto.length === 0) {
            this.setState({
              foto: file
            })
          } else {
            this.state.foto.push({
              foto: fileLoadedEvent.target.result
            })
          }
        }
          .bind(this)
        fileReader.readAsDataURL(fileToLoad);
      }
    }
  }

  filter = (data) => {
    if (data.length > 0) {
      const date = data.filter(data => {
        return this.props.type_name === data.type_office && this.props.id === data._id
      })
      return date

    } else {
      return []
    }
  }

  filterFull = () => {
    let data = this.filter(this.props.data)
    if (data.length > 0) {
      let datos = data[0].spaces.filter(filter => {
        let number = parseInt(filter.number)
        return number >= this.state.desde && number <= this.state.hasta
      })

      let arrayClean = []
      datos.map(datosId => {
        arrayClean.push(datosId._id)
      })

      return arrayClean
    } else {
      return []
    }
  }

  componentWillReceiveProps(props) {
    switch (props.option) {
      case 1:
        this.setState({
          loading: "show"
        })
        break;

      case 2:
        this.setState({
          arrayBedroomsTypeSelect: props.bedrooms.bedroomsOne.type,
          supplies: props.bedrooms.bedroomsOne.supplies,
          arrayBedroomsStatusSelect: props.bedrooms.bedroomsOne.status,
          habitaciones: props.bedrooms.bedroomsOne.number,
          abreviatura: props.bedrooms.bedroomsOne.abbreviation,
          nombre: props.bedrooms.bedroomsOne.name,
          foto: props.bedrooms.bedroomsOne.photos,
          arrayConsultingRoomSelect: !props.bedrooms.bedroomsOne.type_office === "" ? null : props.bedrooms.bedroomsOne.type_office,
          piso: props.bedrooms.bedroomsOne.floor,
          loading: "show"
        })
        break;

      case 3:
        if (!props.bedrooms.propsAction) {
          this.setState({
            arrayBedroomsTypeSelect: props.bedrooms.bedroomsOne.type,
            arrayBedroomsStatusSelect: props.bedrooms.bedroomsOne.status,
            habitaciones: props.bedrooms.bedroomsOne.number,
            abreviatura: props.bedrooms.bedroomsOne.abbreviation,
            nombre: props.bedrooms.bedroomsOne.name,
            foto: props.bedrooms.bedroomsOne.photos,
            arrayConsultingRoomSelect: !props.bedrooms.bedroomsOne.type_office === "" ? null : props.bedrooms.bedroomsOne.type_office,
            piso: props.bedrooms.bedroomsOne.floor,
            loading: "show"
          })
          this.props.propsAction(true)
        }
        this.setState({
          supplies: props.bedrooms.bedroomsOne.supplies,
        })
        break;

      case 4:
        this.setState({
          supplies: props.bedrooms.dataAccept,
        })
        break;

      default:
        break;
    }
  }

  disabled = () => {
    return (this.props.option === 2 || this.props.option === 3) ? true : false
  }

  handleChangeSwitch = name => event => {
    let set = ""
    if (this.props.option > 0) {
      this.setState({
        [name]: event.target.checked
      });
      this.props.setSupplies()
      this.props.search(set)
    } else {
      this.setState({
        [name]: event.target.checked
      });
    }
  }

  handlePiso = e => {
    const { value } = e.target;
    this.setState({
      piso: value
    });
  }

  handleabreviatura = e => {
    const { value } = e.target
    this.setState({
      abreviatura: value
    })
  }

  handleNombre = e => {
    const { value } = e.target
    this.setState({
      nombre: value
    })
  }

  toggleTab(tab) {
    (this.state.activeTab !== tab) &&
      this.setState({
        activeTab: tab
      });
  }

  render() {
    const disable = this.disabled()
    return (
      <span>
        <Modal
          isOpen={this.props.modal}
          toggle={this.closeModal}
          className="ModalStore">

          {this.state.loading === "show" ?
            <div>
              <ModalHeader toggle={this.closeModal}>
                {this.props.modalHeader}
              </ModalHeader>
              <ModalBody className="Scroll">
                <form onSubmit={this.handleSave.bind(this)} >
                  <div className="row">
                    {
                      this.props.option === 1 &&
                      <FormGroup className="top form-group col-sm-6">
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.check}
                              onChange={this.handleChangeSwitch('check')}
                              value="check"
                            />
                          }
                          label="Cargar Varios Espacios"
                        />
                      </FormGroup>
                    }

                    {
                      this.props.option === 4 &&
                      <FormGroup className="top form-group col-sm-6">
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={this.state.checkAll}
                              onChange={this.handleChangeSwitch('checkAll')}
                              value="checkAll"
                            />
                          }
                          label="Editar Todos"
                        />
                      </FormGroup>
                    }

                    {
                      this.props.option === 4 && !this.state.checkAll &&
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

                    {
                      this.props.option === 4 && !this.state.checkAll &&
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

                    {
                      this.state.check &&
                      <FormGroup className="top form-group col-sm-6">
                        {this.props.option === 1 && <Label for="habitaciones">Cantidad de Espacios</Label>}
                        {this.props.option !== 1 && <Label for="habitaciones">Cantidad de Espacios</Label>}
                        <Input
                          disabled={disable}
                          invalid={this.state.habitacionesInvalid}
                          name="habitaciones"
                          id="habitaciones"
                          onKeyUp={this.handlekeyHabitaciones}
                          onChange={this.handleChange}
                          value={this.state.habitaciones}
                          type="number"
                          placeholder="Nro Habitaciones"
                        />
                        <div className="errorSelect">
                          {this.state.habitacionesError}
                        </div>
                      </FormGroup>
                    }

                    <FormGroup className="top form-group col-sm-6">
                      <Label for="estatus">Estatus</Label>
                      <div className={this.state.divBedroomsSelect}>
                        <Select
                          isSearchable="true"
                          isDisabled={this.props.disabled}
                          name="estatus"
                          value={this.state.arrayBedroomsStatusSelect}
                          onChange={this.handleStatusBedrooms}
                          options={this.props.status_room}
                          id="estatus"
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.divBedroomsStatusSelectError}
                      </div>
                    </FormGroup>

                    <FormGroup className="top form-group col-sm-6">
                      <Label for="tipo">Tipo de Espacios</Label>
                      <div className={this.state.divBedroomsSelect}>
                        <Select
                          isSearchable="true"
                          isDisabled={this.props.option !== 4 ? this.props.disabled : true}
                          name="tipo"
                          value={this.state.arrayBedroomsTypeSelect}
                          onChange={this.handleTypeBedrooms}
                          options={this.props.type_bedrooms}
                          id="tipo"
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.divBedroomsSelectError}
                      </div>
                    </FormGroup>

                    {
                      this.state.arrayBedroomsTypeSelect !== null &&
                      this.state.arrayBedroomsTypeSelect.label === "Departamento" &&
                      this.state.arrayBedroomsTypeSelect.value === "5d7facaa3beda80db3462513" &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="departamento">Departamento</Label>
                        <div className={this.state.divBedroomsSelect}>
                          <Select
                            isSearchable="true"
                            isDisabled={this.props.option !== 4 ? this.props.disabled : true}
                            name="departamento"
                            value={this.state.arrayConsultingRoomSelect}
                            onChange={this.handleConsulting}
                            options={this.props.type_consulting_room}
                            id="departamento"
                          />
                        </div>
                        <div className="errorSelect">
                          {this.state.divConsultingRoomSelectError}
                        </div>
                      </FormGroup>
                    }

                    {
                      !this.state.check && this.props.option === 1 &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="nombre">Nombre</Label>
                        <Input
                          disabled={this.props.disabled}
                          invalid={this.state.nombreInvalid}
                          name="nombre"
                          id="1"
                          onKeyUp={this.handlekeyHabitaciones}
                          onChange={this.handleNombre}
                          value={this.state.nombre}
                          type="text"
                          placeholder="Nombre"
                        />
                        <div className="errorSelect">
                          {this.state.nombreError}
                        </div>
                      </FormGroup>
                    }

                    {
                      this.props.option !== 1 && this.props.option !== 4 &&
                      this.props.option === 2 && this.props.bedrooms.bedroomsOne &&
                      this.props.bedrooms.bedroomsOne.name !== "" &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="nombre">Nombre</Label>
                        <Input
                          disabled={this.props.disabled}
                          invalid={this.state.nombreInvalid}
                          name="nombre"
                          id="2"
                          onKeyUp={this.handlekeyHabitaciones}
                          onChange={this.handleNombre}
                          value={this.state.nombre}
                          type="text"
                          placeholder="Nombre"
                        />
                        <div className="errorSelect">
                          {this.state.nombreError}
                        </div>
                      </FormGroup>
                    }

                    {
                      this.props.option === 3 &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="nombre">Nombre</Label>
                        <Input
                          disabled={this.props.disabled}
                          invalid={this.state.nombreInvalid}
                          name="nombre"
                          id="3"
                          onKeyUp={this.handlekeyHabitaciones}
                          onChange={this.handleNombre}
                          value={this.state.nombre}
                          type="text"
                          placeholder="Nombre"
                        />
                        <div className="errorSelect">
                          {this.state.nombreError}
                        </div>
                      </FormGroup>
                    }

                    {
                      this.props.option !== 4 ?
                        <FormGroup className="top form-group col-sm-6">
                          <Label for="abreviatura">Abreviatura</Label>
                          <Input
                            disabled={this.props.disabled}
                            invalid={this.state.abreviaturaInvalid}
                            name="abreviatura"
                            id="abreviatura"
                            onKeyUp={this.handlekeyHabitaciones}
                            onChange={this.handleabreviatura}
                            value={this.state.abreviatura}
                            type="text"
                            placeholder="Abreviatura"
                            maxLength={3}
                          />
                          <div className="errorSelect">
                            {this.state.abreviaturaError}
                          </div>
                        </FormGroup> :
                        this.props.option === 4 && this.state.checkAll &&
                        <FormGroup className="top form-group col-sm-6">
                          <Label for="abreviatura">Abreviatura</Label>
                          <Input
                            disabled={this.props.disabled}
                            invalid={this.state.abreviaturaInvalid}
                            name="abreviatura"
                            id="abreviatura"
                            onKeyUp={this.handlekeyHabitaciones}
                            onChange={this.handleabreviatura}
                            value={this.state.abreviatura}
                            type="text"
                            placeholder="Abreviatura"
                            maxLength={3}
                          />
                          <div className="errorSelect">
                            {this.state.abreviaturaError}
                          </div>
                        </FormGroup>
                    }

                    <FormGroup className="top form-group col-sm-6">
                      <Label for="piso">Piso</Label>
                      <Input
                        disabled={this.props.disabled}
                        invalid={this.state.pisoInvalid}
                        name="piso"
                        id="piso"
                        onChange={this.handlePiso}
                        value={this.state.piso}
                        type="text"
                        placeholder="Piso"
                        min={0}
                      />
                      <div className="errorSelect">
                        {this.state.pisoError}
                      </div>
                    </FormGroup>

                    {
                      !this.state.check && this.props.option !== 4 &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="foto">Foto</Label>
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
                              {this.state.foto ? this.state.foto.map(foto => {
                                return (
                                  foto.foto != null && foto.foto != "" && <img alt="foto" style={{ width: 200, height: 150 }} className="image" src={"data:image/jpeg;" + foto.foto} />
                                )

                              }) : null
                              }
                            </div>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    }
                  </div>

                </form>
                <Row>
                  <Col>
                    <Nav tabs>
                      <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggleTab('1'); }} >
                          Agregar Bienes
                        </NavLink>
                      </NavItem>
                      {/* <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                            Espacios Inactivos
                          </NavLink>
                        </NavItem> */}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <TablaSuplies
                          supplies={this.state.supplies}
                          searchBelogingFunction={this.props.searchBelogingFunction}
                          searchSupplies={this.props.bedrooms.searchSupplies}
                          actionAcceptFunction={this.props.actionAcceptFunction}
                          setDatasuppies={this.props.setDatasuppies}
                          option={this.props.option}
                          dataSuppliesSet={this.props.dataSuppliesSet}
                          oneSuppliesSet={this.props.oneSuppliesSet}
                          disabled={this.props.disabled}
                          queryOneBelongingFunction={this.props.queryOneBelongingFunction}
                          dataAccept={this.props.bedrooms.dataAccept}
                          cantidadError={this.state.cantidadError}
                          cantidadInvalid={this.state.cantidadInvalid}
                          nombre={this.state.nombre}
                          piso={this.state.piso}
                          abreviatura={this.state.abreviatura}
                          id={this.state.id}
                          setOptionSearch={this.props.setOptionSearch}
                          masivo={this.state.check}
                          search={this.props.searchData}
                          setSupplies={this.props.setSupplies}
                          deleteSupplies={this.props.deleteSupplies}
                          check={this.state.check}
                          calculo={this.state.calculo}
                        />
                      </TabPane>
                    </TabContent>

                  </Col>
                </Row>
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
  bedrooms: state.bedrooms.toJS(),
  //type_bedrooms: state.global.dataGeneral.dataGeneral.type_bedrooms,
});

const mapDispatchToProps = dispatch => ({
  createBedroomsFunction: (data, callback) => dispatch(createBedroomsFunction(data, callback)),
  searchBelogingFunction: (data, status) => dispatch(searchBelogingFunction(data, status)),
  actionAcceptFunction: (data) => dispatch(actionAcceptFunction(data)),
  setDatasuppies: (data, id, option, obj) => dispatch(setDatasuppies(data, id, option, obj)),
  deleteDataSupplies: () => dispatch(deleteDataSupplies()),
  editOneBedroomsFunction: (data, callback) => dispatch(editOneBedroomsFunction(data, callback)),
  dataSuppliesSet: (data, id) => dispatch(dataSuppliesSet(data, id)),
  oneSuppliesSet: (data) => dispatch(oneSuppliesSet(data)),
  editBedroomsFunction: (data, callback) => dispatch(editBedroomsFunction(data, callback)),
  queryOneBelongingFunction: (id, option, status, callback) => dispatch(queryOneBelongingFunction(id, option, status, callback)),
  messageError: () => dispatch(messageError()),
  messageErrorInvalid: () => dispatch(messageErrorInvalid()),
  propsAction: (data) => dispatch(propsAction(data)),
  setOptionSearch: () => dispatch(setOptionSearch()),
  setSupplies: () => dispatch(setSupplies()),
  deleteSupplies: (data) => dispatch(deleteSupplies(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBedrooms);