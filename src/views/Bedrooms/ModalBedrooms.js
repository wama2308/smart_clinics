import React, { Component } from 'react';
import { ModalHeader, Modal, ModalBody, Input, FormFeedback, ModalFooter, FormGroup, Label, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core/CircularProgress';
import { createBedroomsFunction, searchBelogingFunction, actionAcceptFunction, setDatasuppies, deleteDataSupplies, editOneBedroomsFunction, dataSuppliesSet, oneSuppliesSet, editBedroomsFunction, queryOneBelongingFunction } from '../../actions/bedroomsActions';
import TablaSuplies from './TablaSuplies';
import { data } from '../Ventas/mockData';

class ModalBedrooms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayBedroomsTypeSelect: null,
      divBedroomsSelect: '',
      divBedroomsSelectError: '',
      arrayBedrooms: [],

      arrayBedroomsStatusSelect: null,
      divBedroomsStatusSelect: '',
      divBedroomsStatusSelectError: '',
      arrayBedroomsStatus: [],

      habitacionesError: '',
      habitacionesInvalid: false,
      loading: "show",
      habitaciones: 0,

      foto: null,
      supplies: null,

      desde: this.props.data[0].number,
      desdeError: '',
      desdeInvalid: false,

      hasta: this.props.data[0].number + 1,
      hastaError: '',
      hastaInvalid: false,
    }
  }

  closeModal = () => {
    this.setState({
      arrayBedroomsTypeSelect: null,
      divBedroomsSelect: '',
      divBedroomsSelectError: '',
      arrayCentroMedico: [],

      arrayBedroomsStatusSelect: null,
      divBedroomsStatusSelect: '',
      divBedroomsStatusSelectError: '',
      arrayBedroomsStatus: [],

      habitaciones: 0,
      habitacionesError: '',
      habitacionesInvalid: false,
      loading: "show"
    });
    this.props.valorCloseModal(false);
    this.props.deleteDataSupplies()
  };

  validate = () => {
    let divBedroomsSelect = "";
    let divBedroomsSelectError = "";

    let habitacionesError = "";
    let habitacionesInvalid = false;

    let divBedroomsStatusSelect = ''
    let divBedroomsStatusSelectError = ''


    if (this.state.arrayBedroomsTypeSelect === null || this.state.arrayBedroomsTypeSelect.length === 0) {
      divBedroomsSelectError = "¡Seleccione el Tipo de Habitaciones!";
      divBedroomsSelect = "borderColor";
    }
    if (this.props.option === 1) {
      if (this.state.habitaciones === 0 || this.state.habitaciones < 0) {
        habitacionesError = "¡Ingrese la cantidad de habitaciones!";
        habitacionesInvalid = true;
      }
    }

    if (this.state.arrayBedroomsTypeSelect === null || this.state.arrayBedroomsTypeSelect.length === 0) {
      divBedroomsStatusSelectError = "¡Seleccione el Estatus!";
      divBedroomsStatusSelect = "borderColor";
    }

    if (divBedroomsSelectError || habitacionesError || divBedroomsStatusSelectError) {
      this.setState({
        divBedroomsSelectError,
        habitacionesError,
        habitacionesInvalid,
        divBedroomsSelect,
        divBedroomsStatusSelectError,
        divBedroomsStatusSelect
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
    if (value > 0) {
      this.setState({
        [name]: parseInt(value)
      });
    }
  };

  handleDesde = e => {
    const { name, value } = e.target;
    if (value >= this.props.data[0].number && value <= this.props.data.length - 1) {
      this.setState({
        desde: parseInt(value),
        hasta: parseInt(value) + 1
      });
    }
  }

  handleHasta = e => {
    const { name, value } = e.target;
    if (value > this.state.desde && value <= this.props.data.length) {
      this.setState({
        hasta: parseInt(value)
      });
    }
  }

  handleTypeBedrooms = arrayBedroomsTypeSelect => {
    this.setState({
      arrayBedroomsTypeSelect,
      divBedroomsSelect: '',
      divBedroomsSelectError: '',
    })
  }

  handleStatusBedrooms = arrayBedroomsStatusSelect => {
    this.setState({
      arrayBedroomsStatusSelect,
      divBedroomsStatusSelect: '',
      divBedroomsStatusSelectError: '',
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

  handleSave = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      if (this.props.option === 1) {
        this.props.createBedroomsFunction({
          quantity_rooms: this.state.habitaciones,
          type: this.state.arrayBedroomsTypeSelect.value
        }, () => {
          this.closeModal();
          this.setState({
            arrayBedroomsTypeSelect: null,
            divBedroomsSelect: '',
            divBedroomsSelectError: '',
            arrayCentroMedico: [],

            arrayBedroomsStatusSelect: null,
            divBedroomsStatusSelect: '',
            divBedroomsStatusSelectError: '',
            arrayBedroomsStatus: [],

            habitaciones: 0,
            habitacionesError: '',
            habitacionesInvalid: false,
            loading: "show"
          })
        })
      } else if (this.props.option === 4) {
        const bedroomsArray = this.filter(this.props.data)
        const supplies = this.arrayClean(this.props.bedrooms.dataAccept)

        const prueba = this.arraySupplies(this.props.bedrooms.dataAccept);


        this.props.editBedroomsFunction({
          bedrooms: bedroomsArray,
          type: this.state.arrayBedroomsTypeSelect.value,
          status: this.state.arrayBedroomsStatusSelect.value,
          supplies: prueba
        }, () => {
          this.props.deleteDataSupplies()
          this.closeModal();
          this.setState({
            arrayBedroomsTypeSelect: null,
            divBedroomsSelect: '',
            divBedroomsSelectError: '',
            arrayCentroMedico: [],

            arrayBedroomsStatusSelect: null,
            divBedroomsStatusSelect: '',
            divBedroomsStatusSelectError: '',
            arrayBedroomsStatus: [],

            habitaciones: 0,
            habitacionesError: '',
            habitacionesInvalid: false,
            loading: "show"
          })
        })
      } else if (this.props.option === 3) {
        const bedroomsArray = this.filter(this.props.data)
        const prueba = this.props.bedrooms.bedroomsOne.supplies ? this.arraySupplies(this.props.bedrooms.bedroomsOne.supplies) : []

        this.props.editOneBedroomsFunction({
          type: this.state.arrayBedroomsTypeSelect.value,
          status: this.state.arrayBedroomsStatusSelect.value,
          supplies: prueba,
          _id: this.props.id
        }, () => {
          this.closeModal();
          this.setState({
            arrayBedroomsTypeSelect: null,
            divBedroomsSelect: '',
            divBedroomsSelectError: '',
            arrayCentroMedico: [],

            arrayBedroomsStatusSelect: null,
            divBedroomsStatusSelect: '',
            divBedroomsStatusSelectError: '',
            arrayBedroomsStatus: [],

            habitaciones: 0,
            habitacionesError: '',
            habitacionesInvalid: false,
            loading: "show"
          })
        })
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

  filter = (data) => {
    const date = data.filter(data => {
      return data.number >= this.state.desde && data.number <= this.state.hasta
    })

    const arrayClean = []

    date.map(datos => {
      arrayClean.push(datos._id)
    })

    return arrayClean
  }

  componentWillReceiveProps(props) {

    if (props.option === 4) {
      this.setState({
        supplies: props.bedrooms.dataAccept,
      })
    } else if (props.option === 3) {
      this.setState({
        arrayBedroomsTypeSelect: props.bedrooms.bedroomsOne.type,
        supplies: props.bedrooms.bedroomsOne.supplies,
        arrayBedroomsStatusSelect: props.bedrooms.bedroomsOne.status,
        habitaciones: props.bedrooms.bedroomsOne.number
      })
    } else if (props.option === 2) {
      this.setState({
        arrayBedroomsTypeSelect: props.bedrooms.bedroomsOne.type,
        supplies: props.bedrooms.bedroomsOne.supplies,
        arrayBedroomsStatusSelect: props.bedrooms.bedroomsOne.status,
        habitaciones: props.bedrooms.bedroomsOne.number
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
                {this.props.modalHeader}</ModalHeader>
              <ModalBody className="Scroll">
                <form onSubmit={this.handleSave.bind(this)} >
                  <div className="row">
                    {this.props.option !== 4 &&
                      <FormGroup className="top form-group col-sm-6">
                        {this.props.option === 1 && <Label for="descripcion">Numero de Habitaciones</Label>}
                        {this.props.option !== 1 && <Label for="descripcion">Numero de Habitacion</Label>}
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
                      <Label for="CentroMedico">Tipo de habitaciones</Label>
                      <div className={this.state.divBedroomsSelect}>
                        <Select
                          isSearchable="true"
                          isDisabled={this.props.disabled}
                          name="CentroMedico"
                          value={this.state.arrayBedroomsTypeSelect}
                          onChange={this.handleTypeBedrooms}
                          options={this.props.type_bedrooms}
                          id="CentroMedico"
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.divBedroomsSelectError}
                      </div>
                    </FormGroup>
                    {this.props.option !== 1 &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="CentroMedico">Estatus</Label>
                        <div className={this.state.divBedroomsSelect}>
                          <Select
                            isSearchable="true"
                            isDisabled={this.props.disabled}
                            name="CentroMedico"
                            value={this.state.arrayBedroomsStatusSelect}
                            onChange={this.handleStatusBedrooms}
                            options={this.props.status_room}
                            id="CentroMedico"
                          />
                        </div>
                        <div className="errorSelect">
                          {this.state.divBedroomsSelectError}
                        </div>
                      </FormGroup>
                    }
                    {/* {this.props.option !== 4 &&
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
                    } */}
                    {this.props.option === 4 &&
                      <FormGroup className="top form-group col-sm-3">
                        <Label for="desde">Rango</Label>
                        <Input
                          disabled={this.props.disabled}
                          invalid={this.state.habitacionesInvalid}
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
                          {this.state.habitacionesError}
                        </div>
                      </FormGroup>
                    }
                    {this.props.option === 4 &&
                      <FormGroup className="top form-group col-sm-3">
                        <Label for="hasta">Rango</Label>
                        <Input
                          disabled={this.props.disabled}
                          invalid={this.state.habitacionesInvalid}
                          name="hasta"
                          id="hasta"
                          onKeyUp={this.handlekeyHabitaciones}
                          onChange={this.handleHasta}
                          value={this.state.hasta}
                          type="number"
                          placeholder="Nro Habitaciones"
                          min={0}
                          max={this.props.data.length}
                        />
                        <div className="errorSelect">
                          {this.state.habitacionesError}
                        </div>
                      </FormGroup>
                    }

                  </div>
                  {this.props.modal === true && this.props.option !== 1 &&
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
                    />
                  }
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
  bedrooms: state.bedrooms.toJS(),
});

const mapDispatchToProps = dispatch => ({
  createBedroomsFunction: (data, callback) => dispatch(createBedroomsFunction(data, callback)),
  searchBelogingFunction: (data) => dispatch(searchBelogingFunction(data)),
  actionAcceptFunction: (data) => dispatch(actionAcceptFunction(data)),
  setDatasuppies: (data, id, option) => dispatch(setDatasuppies(data, id, option)),
  deleteDataSupplies: () => dispatch(deleteDataSupplies()),
  editOneBedroomsFunction: (data, callback) => dispatch(editOneBedroomsFunction(data, callback)),
  dataSuppliesSet: (data, id) => dispatch(dataSuppliesSet(data, id)),
  oneSuppliesSet: (data) => dispatch(oneSuppliesSet(data)),
  editBedroomsFunction: (data, callback) => dispatch(editBedroomsFunction(data, callback)),
  queryOneBelongingFunction: (id, option) => dispatch(queryOneBelongingFunction(id, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBedrooms);