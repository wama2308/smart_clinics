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
  propsAction
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
      checkAll: false
    }
  }

  componentDidMount() {
    if (this.props.option !== 1 && this.props.option !== 4) {
      this.setState({ loading: 'hide' })
    }
  }

  closeModal = () => {
    this.setState({
      ...InitalState
    });
    this.props.valorCloseModal(false);
    this.props.deleteDataSupplies()
    this.props.propsAction(0)
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

    if (this.props.option === 1 && this.props.bedrooms.dataAccept.length !== 0) {
      this.props.bedrooms.dataAccept.map(list => {
        if (list.cantidad === 0) {
          cantidadError = "¡Ingrese la Cantidad!"
          cantidadInvalid = true
          id.push({ ...list })
        }
      })
    }

    if (this.props.option === 3) {
      this.state.supplies.map(list => {
        if (list.quantity_stock === 0) {
          cantidadError = "¡Ingrese la Cantidad!"
          cantidadInvalid = true
        }
      })
    }

    if (this.props.option === 4) {
      this.props.bedrooms.dataAccept.map(list => {
        if (list.quantity_stock === 0) {
          cantidadError = "¡Ingrese la Cantidad!"
          cantidadInvalid = true
        }
      })
    }

    if (this.state.arrayBedroomsTypeSelect === null || this.state.arrayBedroomsTypeSelect.length === 0) {
      divBedroomsSelectError = "¡Seleccione el Tipo de Espacio!";
      divBedroomsSelect = "borderColor";
    }


    if (this.state.arrayConsultingRoom === null) {
      divConsultingRoomSelect = "¡Seleccione el Tipo de Departamento!";
      divConsultingRoomSelectError = "borderColor";
    }


    if (this.props.option === 1 && this.state.check === true) {
      if (this.state.habitaciones === 0 || this.state.habitaciones < 0) {
        habitacionesError = "¡Ingrese la cantidad de Espacio!";
        habitacionesInvalid = true;
      }
    }

    if (this.state.arrayBedroomsStatusSelect === null || this.state.arrayBedroomsStatusSelect.length === 0) {
      divBedroomsStatusSelectError = "¡Seleccione el Estatus!";
      divBedroomsStatusSelect = "borderColor";
    }

    if (this.state.check === false) {
      if (this.props.option !== 4) {
        if (this.state.nombre === "") {
          nombreError = "¡Ingrese el Nombre!";
          nombreInvalid = true;
        }
      }
    }

    if (this.state.abreviatura === "") {
      abreviaturaError = "¡Ingrese la Abreviatura!"
      abreviaturaInvalid = true
    }

    // if (this.state.foto.length === 0 || this.state.foto === null) {
    //   if (this.state.check === false) {
    //     if (this.props.option !== 4) {
    //       fotoError = "¡Ingrese la Foto!";
    //       fotoInvalid = true;
    //     }
    //   }
    // }

    if (this.state.piso === "") {
      pisoError = "¡Ingrese el piso!"
      pisoInvalid = true;
    }

    if (this.state.desde === 0 && this.props.option === 4) {
      desdeError = "¡Ingrese el rango!"
      desdeInvalid = true
    }

    if (this.state.desde === 0 && this.props.option === 4) {
      hastaError = "¡Ingrese el rango!"
      hastaInvalid = true
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
    if (this.state.check === false) {
      this.setState({
        [name]: 1
      });
    } else {
      if (value > 0) {
        this.setState({
          [name]: parseInt(value)
        });
      }
    }
  };

  getGroup = fields => {
    if (fields.length !== 0) {
      let arrayGroups = [];
      fields.map(field => {
        arrayGroups.push(field.number)
      });
      var min = Math.min.apply(null, arrayGroups)
    }
    return min
  };

  getGroupMax = fields => {
    if (fields.length !== 0) {
      let arrayGroups = [];
      fields.map(field => {
        arrayGroups.push(field.number)
      });
      var max = Math.max.apply(null, arrayGroups)
    }
    return max
  };

  handleDesde = e => {
    const { name, value } = e.target;
    const data = this.filterRange(this.props.data)
    const min = this.getGroup(data)
    const max = this.getGroupMax(data)
    this.handleAction()

    if (this.props.data.length > 0) {
      if (value >= min && value <= max - 1) {
        this.setState({
          desde: parseInt(value),
          hasta: parseInt(value) + 1
        });
      }
    }
  }

  handleAction = () => {
    const data = this.filterRange(this.props.data)
    const min = this.getGroup(data)

    if (min != undefined) {
      this.setState({
        desde: min,
        hasta: min + 1
      });
    } else {
      this.setState({
        desde: 0,
        hasta: 0
      });
    }
  }

  handleHasta = e => {
    const { name, value } = e.target;
    const data = this.filterRange(this.props.data)
    const max = this.getGroupMax(data)
    if (this.props.data.length > 0) {
      if (value > this.state.desde && value <= max && this.state.desde <= max) {
        this.setState({
          hasta: parseInt(value)
        });
      }
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

  arraySupplies = (data) => {
    const array = []
    if (data) {
      data.map(data => {
        array.push({
          brand: data.brand,
          code: data.code,
          maintenance_time: data.maintenance_time,
          mantenance_staff: data.mantenance_staff,
          mantenance_staff_id: data.mantenance_staff_id,
          model: data.model,
          name: data.name,
          photo: data.photo,
          quantity: data.cantidad,
          year: data.year,
          _id: data._id
        })
      })
    }

    return array
  }

  pruebaFunction = (data) => {
    const array = []
    data.map(data => {
      array.push({
        ...data,
        quantity: data.quantity_stock
      })
    })
    return array
  }

  functionArray = (data) => {
    const array = []
    data.map(data => {
      array.push({
        ...data,
        quantity: data.cantidad
      })
    })

    return array
  }

  handleSave = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      if (this.props.option === 1) {
        if (this.state.arrayConsultingRoomSelect !== null) {
          const supplies = this.functionArray(this.props.bedrooms.dataAccept)
          this.setState({ loading: 'hide' })
          this.setState({ loading: 'hide' })
          if (this.state.check === true) {
            this.props.createBedroomsFunction({
              input: this.state.check,
              quantity_rooms: this.state.habitaciones,
              type_office: this.state.arrayConsultingRoomSelect.value,
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
          } else {
            this.props.createBedroomsFunction({
              input: this.state.check,
              //quantity_rooms: this.state.habitaciones,
              type_office: this.state.arrayConsultingRoomSelect.value,
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
          }

        } else {
          const supplies = this.functionArray(this.props.bedrooms.dataAccept)
          this.setState({ loading: 'hide' })
          this.setState({ loading: 'hide' })
          this.props.createBedroomsFunction({
            input: this.state.check,
            quantity_rooms: this.state.habitaciones,
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

        }
      } else if (this.props.option === 4) {
        const bedroomsArray = this.filter(this.props.data)
        const supplies = this.pruebaFunction(this.props.bedrooms.dataAccept)
        if (this.state.arrayConsultingRoomSelect !== null) {
          if (this.state.checkAll === false) {
            const array = []
            if (this.props.bedrooms.dataAccept) {
              this.props.bedrooms.dataAccept.map(data => {
                array.push({
                  ...data,
                  quantity: data.quantity_stock,
                })
              })
            }
            this.setState({ loading: 'hide' })
            this.props.editBedroomsFunction({
              bedrooms: bedroomsArray,
              status: this.state.arrayBedroomsStatusSelect.value,
              type: this.state.arrayBedroomsTypeSelect.value,
              type_office: this.state.arrayConsultingRoomSelect.value,
              floor: this.state.piso,
              abbreviation: this.state.abreviatura,
              belongings: array

            }, () => {
              this.props.deleteDataSupplies()
              this.closeModal();
              this.setState({
                ...InitalState
              })
            })
          } else {
            ///Aqui entra la validacion si es "Editar Todas" 
            const bedroomsArrayAll = this.filterAll(this.props.data)
            const array = []
            if (this.props.bedrooms.dataAccept) {
              this.props.bedrooms.dataAccept.map(data => {
                array.push({
                  ...data,
                  quantity: data.quantity_stock,
                })
              })
            }
            this.setState({ loading: 'hide' })
            this.props.editBedroomsFunction({
              bedrooms: bedroomsArrayAll,
              status: this.state.arrayBedroomsStatusSelect.value,
              type: this.state.arrayBedroomsTypeSelect.value,
              type_office: this.state.arrayConsultingRoomSelect.value,
              floor: this.state.piso,
              abbreviation: this.state.abreviatura,
              belongings: array

            }, () => {
              this.props.deleteDataSupplies()
              this.closeModal();
              this.setState({
                ...InitalState
              })
            })
          }
        } else {
          this.setState({ loading: 'hide' })

          const array = []
          if (this.props.bedrooms.dataAccept) {
            this.props.bedrooms.dataAccept.map(data => {
              array.push({
                ...data,
                quantity: data.quantity_stock,
              })
            })
          }

          this.props.editBedroomsFunction({
            bedrooms: bedroomsArray,
            status: this.state.arrayBedroomsStatusSelect.value,
            type: this.state.arrayBedroomsTypeSelect.value,
            floor: this.state.piso,
            abbreviation: this.state.abreviatura,
            belongings: array
          }, () => {
            this.props.deleteDataSupplies()
            this.closeModal();
            this.setState({
              ...InitalState
            })
          })
        }
      } else if (this.props.option === 3) {
        this.setState({ loading: 'hide' })

        const array = []
        if (this.props.bedrooms.bedroomsOne.supplies) {
          this.props.bedrooms.bedroomsOne.supplies.map(data => {
            array.push({
              ...data,
              quantity: data.quantity_stock,
            })
          })
        }

        if (this.state.arrayConsultingRoomSelect != null) {
          if (array.length !== 0) {
            this.setState({ loading: 'hide' })
            this.props.editOneBedroomsFunction({
              _id: this.props.id,
              type: this.state.arrayBedroomsTypeSelect.value,
              status: this.state.arrayBedroomsStatusSelect.value,
              type_office: this.state.arrayConsultingRoomSelect.value,
              photos: this.state.foto,
              name: this.state.nombre,
              abbreviation: this.state.abreviatura,
              floor: this.state.piso,
              belongings: array,
            }, () => {
              this.closeModal();
              this.setState({
                ...InitalState
              })
            })
          } else {
            this.props.messageError()
          }
        }
      } else {
        if (this.props.bedrooms.bedroomsOne.supplies.length !== 0) {
          this.setState({ loading: 'hide' })
          this.props.editOneBedroomsFunction({
            _id: this.props.id,
            type: this.state.arrayBedroomsTypeSelect.value,
            status: this.state.arrayBedroomsStatusSelect.value,
            photos: this.state.foto,
            name: this.state.nombre,
            abbreviation: this.state.abreviatura,
            floor: this.state.piso,
            belongings: this.props.bedrooms.bedroomsOne.supplies,
          }, () => {
            this.closeModal();
            this.setState({
              ...InitalState
            })
          })
        } else {
          this.props.messageError()
        }
      }
    }
  }

  arrayClean = (data) => {
    const clean = []
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
    if (data.length != 0) {
      const bedrooms = this.filterRange(this.props.data)
      const date = data.filter(data => {
        if (this.state.arrayBedroomsTypeSelect !== null && this.state.arrayBedroomsTypeSelect.label !== "Oficina") {
          return data.type === this.state.arrayBedroomsTypeSelect.label && data.number >= this.state.desde && data.number <= this.state.hasta
        } else {
          if (this.state.arrayConsultingRoomSelect !== null) {
            return data.type === "Oficina" && data.number >= this.state.desde && data.number <= this.state.hasta &&
              this.state.arrayConsultingRoomSelect.value === data.type_office.value
          }
        }
      })
      const arrayClean = []
      date.map(datos => {
        arrayClean.push(datos._id)
      })
      return arrayClean

    } else {
      return []
    }
  }

  filterAll = (data) => {
    if (data.length != 0) {
      const date = data.filter(data => {
        if (this.state.arrayBedroomsTypeSelect !== null && this.state.arrayBedroomsTypeSelect.label !== "Oficina") {
          return data.type === this.state.arrayBedroomsTypeSelect.label
        } else {
          if (this.state.arrayConsultingRoomSelect !== null) {
            return data.type === "Oficina" && this.state.arrayConsultingRoomSelect.value === data.type_office.value
          }
        }
      })
      const arrayClean = []
      date.map(datos => {
        arrayClean.push(datos._id)
      })
      return arrayClean

    } else {
      return []
    }
  }

  filterRange = (data) => {
    if (data.length > 0) {
      const date = data.filter(data => {
        if (this.state.arrayBedroomsTypeSelect !== null && this.state.arrayBedroomsTypeSelect.label !== "Oficina") {
          return data.type === this.state.arrayBedroomsTypeSelect.label
        } else {
          if (this.state.arrayConsultingRoomSelect !== null) {
            return data.type === "Oficina" && this.state.arrayConsultingRoomSelect.value === data.type_office.value
          }
        }
      })

      return date
    } else {
      return []
    }
  }

  componentWillReceiveProps(props) {

    if (props.option === 4) {
      this.setState({
        supplies: props.bedrooms.dataAccept,
      })
    } else if (props.option === 3) {
      if (props.bedrooms.propsAction === 0) {
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
        this.props.propsAction(1)
      }
      this.setState({
        supplies: props.bedrooms.bedroomsOne.supplies,
      })

    } else if (props.option === 2) {
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
    } else if (props.option === 1) {
      this.setState({
        loading: "show"
      })
    }
  }

  disabled = () => {
    if (this.props.option === 2 || this.props.option === 3) {
      return true
    } else {
      return false
    }
  }

  handleChangeSwitch = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  }

  handlePiso = e => {
    const { name, value } = e.target;
    this.setState({
      piso: value
    });
  }

  handleabreviatura = e => {
    const { value, name } = e.target
    this.setState({
      abreviatura: value
    })
  }

  handleNombre = e => {
    const { value, name } = e.target
    this.setState({
      nombre: value
    })
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const disable = this.disabled()
    console.log("foto", this.state.foto);


    const mod =
    {
      enabled: [{
        _id: "123",
        type_id: '321',
        category: "category 1",
        status: true,
        spaces: [{
          _id: "52525",
          floor: "piso1",
          code: "hfghf1",
          type: "type",
          status: "ocupado",
          name: "name1"
        }]
      },
      {
        _id: "123",
        type_id: '321',
        category: "category 2",
        status: false,
        spaces: [{
          _id: "52525",
          floor: "piso1",
          code: "hfghf1",
          type: "type",
          status: "ocupado",
          name: "name1"
        }]
      },
      {
        _id: "123",
        type_id: '321',
        category: "category 3",
        status: false,
        spaces: [{
          _id: "52525",
          floor: "piso1",
          code: "hfghf1",
          type: "type",
          status: "ocupado",
          name: "name1"
        }]
      }]
    }
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
                <form onSubmit={this.handleSave.bind(this)} >
                  <div className="row">
                    {this.props.option === 1 &&
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
                    {this.state.check === true &&
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
                          isDisabled={this.props.disabled}
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

                    {this.state.arrayBedroomsTypeSelect !== null &&
                      this.state.arrayBedroomsTypeSelect.label === "Oficina" &&
                      this.state.arrayBedroomsTypeSelect.value === "5d7facaa3beda80db3462513" &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="departamento">Departamento</Label>
                        <div className={this.state.divBedroomsSelect}>
                          <Select
                            isSearchable="true"
                            isDisabled={this.props.disabled}
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

                    {this.state.check === false && this.props.option === 1 &&
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

                    {this.props.option !== 1 && this.props.option !== 4 && this.props.option === 2 && this.props.bedrooms.bedroomsOne && this.props.bedrooms.bedroomsOne.name !== "" &&
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

                    {this.props.option === 3 &&
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

                    {this.state.checkAll === false && this.props.option === 4 &&
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

                    {this.props.option === 4 && this.state.checkAll === false &&
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
                          min={0}
                        />
                        <div className="errorSelect">
                          {this.state.desdeError}
                        </div>
                      </FormGroup>
                    }

                    {this.props.option === 4 && this.state.checkAll === false &&
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
                          max={mod.enabled.length}
                        />
                        <div className="errorSelect">
                          {this.state.hastaError}
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

                    {this.state.check === false && this.props.option !== 4 &&
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
                  {/* {this.props.modal === true &&
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
                      />
                    } */}
                </form>
                <Row>
                  <Col>
                    <Nav tabs>
                      <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                          Espacios Activos
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
                          id={this.state.id} />
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
});

const mapDispatchToProps = dispatch => ({
  createBedroomsFunction: (data, callback) => dispatch(createBedroomsFunction(data, callback)),
  searchBelogingFunction: (data, obj) => dispatch(searchBelogingFunction(data, obj)),
  actionAcceptFunction: (data) => dispatch(actionAcceptFunction(data)),
  setDatasuppies: (data, id, option, obj) => dispatch(setDatasuppies(data, id, option, obj)),
  deleteDataSupplies: () => dispatch(deleteDataSupplies()),
  editOneBedroomsFunction: (data, callback) => dispatch(editOneBedroomsFunction(data, callback)),
  dataSuppliesSet: (data, id) => dispatch(dataSuppliesSet(data, id)),
  oneSuppliesSet: (data) => dispatch(oneSuppliesSet(data)),
  editBedroomsFunction: (data, callback) => dispatch(editBedroomsFunction(data, callback)),
  queryOneBelongingFunction: (id, option) => dispatch(queryOneBelongingFunction(id, option)),
  messageError: () => dispatch(messageError()),
  messageErrorInvalid: () => dispatch(messageErrorInvalid()),
  propsAction: (data) => dispatch(propsAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBedrooms);