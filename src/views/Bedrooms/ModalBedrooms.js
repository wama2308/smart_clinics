import React, { Component } from 'react';
import { ModalHeader, Modal, ModalBody, Input, FormFeedback, ModalFooter, FormGroup, Label, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core/CircularProgress';
import { createBedroomsFunction, searchBelogingFunction, actionAcceptFunction, setDatasuppies, deleteDataSupplies, editOneBedroomsFunction, dataSuppliesSet, oneSuppliesSet, editBedroomsFunction, queryOneBelongingFunction } from '../../actions/bedroomsActions';
import TablaSuplies from './TablaSuplies';
import { data } from '../Ventas/mockData';
import Switch from '@material-ui/core/Switch';
import { FormControlLabel } from '@material-ui/core';

class ModalBedrooms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayBedroomsTypeSelect: null,
      divBedroomsSelect: '',
      divBedroomsSelectError: '',
      arrayBedrooms: [],

      arrayConsultingRoomSelect: null,
      divConsultingRoomSelect: '',
      divConsultingRoomSelectError: '',
      arrayConsultingRoom: [],

      arrayBedroomsTypeSelect: null,
      divBedroomsSelect: '',
      divBedroomsSelectError: '',
      arrayBedrooms: [],

      habitacionesError: '',
      habitacionesInvalid: false,
      loading: "show",
      habitaciones: 0,

      foto: null,
      fotoError: '',
      fotoInvalid: false,

      supplies: null,

      desde: 0 /*this.props.data[0].number*/,
      desdeError: '',
      desdeInvalid: false,

      hasta: 0  /*this.props.data[0].number + 1*/,
      hastaError: '',
      hastaInvalid: false,

      check: false,

      piso: 0,
      pisoError: '',
      pisoInvalid: false,

      abreviatura: '',
      abreviaturaError: '',
      abreviaturaInvalid: false,

      nombre: '',
      nombreError: '',
      nombreInvalid: false,

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

    let nombreError = ""
    let nombreInvalid = false

    let abreviaturaError = ""
    let abreviaturaInvalid = false

    let fotoError = ""
    let fotoInvalid = false

    let divConsultingRoomSelect = ""
    let divConsultingRoomSelectError = ''

    if (this.state.arrayBedroomsTypeSelect === null || this.state.arrayBedroomsTypeSelect.length === 0) {
      divBedroomsSelectError = "¡Seleccione el Tipo de Habitaciones!";
      divBedroomsSelect = "borderColor";
    }

    if (this.state.arrayBedroomsTypeSelect.label === "Oficina") {
      if (this.state.arrayConsultingRoom === null || this.state.arrayConsultingRoomSelect.length === 0) {
        divConsultingRoomSelect = "¡Seleccione el Tipo de Habitaciones!";
        divConsultingRoomSelectError = "borderColor";
      }
    }

    if (this.props.option === 1 && this.state.check === true) {
      if (this.state.habitaciones === 0 || this.state.habitaciones < 0) {
        habitacionesError = "¡Ingrese la cantidad de habitaciones!";
        habitacionesInvalid = true;
      }
    }

    if (this.state.arrayBedroomsTypeSelect === null || this.state.arrayBedroomsTypeSelect.length === 0) {
      divBedroomsStatusSelectError = "¡Seleccione el Estatus!";
      divBedroomsStatusSelect = "borderColor";
    }
    if (this.state.check === false) {
      if (this.state.nombre === "") {

        nombreError = "¡Ingrese el Nombre!";
        nombreInvalid = true;
      }
    }

    if (this.state.abreviatura === "") {
      abreviaturaError = "¡Ingrese la Abreviatura!"
      abreviaturaInvalid = true
    }

    if (this.state.foto === "" || this.state.foto === null) {
      if (this.state.check === false) {
        fotoError = "¡Ingrese la Foto!";
        fotoInvalid = true;
      }
    }

    if (divBedroomsSelectError || habitacionesError || divBedroomsStatusSelectError || nombreError || abreviaturaError || fotoError || divConsultingRoomSelectError) {
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
        fotoError,
        fotoInvalid,
        divConsultingRoomSelect,
        divConsultingRoomSelectError
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
    if (this.props.data.length > 0) {
      if (value >= this.props.data[0].number && value <= this.props.data.length - 1) {
        this.setState({
          desde: parseInt(value),
          hasta: parseInt(value) + 1
        });
      }
    }
  }

  handleHasta = e => {
    const { name, value } = e.target;
    if (this.props.data.length > 0) {
      if (value > this.state.desde && value <= this.props.data.length) {
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

  handleSave = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      if (this.props.option === 1) {
        this.props.createBedroomsFunction({
          input: this.state.check,
          quantity_rooms: this.state.habitaciones,
          name: this.state.nombre,
          status: this.state.arrayBedroomsStatusSelect.value,
          type: this.state.arrayBedroomsTypeSelect.value,
          type_office: this.state.arrayConsultingRoomSelect,
          floor: this.state.piso,
          abbreviation: this.state.abreviatura,
          photos: this.state.foto,
          belongings: this.props.bedrooms.dataAccept
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
    if (data.length != 0) {
      const date = data.filter(data => {
        return data.number >= this.state.desde && data.number <= this.state.hasta
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

  handleChangeSwitch = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  }

  handlePiso = e => {
    const { name, value } = e.target;
    if (value >= 0) {
      this.setState({
        [name]: parseInt(value)
      });
    }
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

  render() {
    const disable = this.disabled()
    console.log(this.props);

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
                          label="Masivo"
                        />
                      </FormGroup>
                    }
                    {this.props.option !== 4 && this.state.check === true &&
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

                    {this.state.arrayBedroomsTypeSelect !== null &&
                      this.state.arrayBedroomsTypeSelect.label === "Oficina" &&
                      this.state.arrayBedroomsTypeSelect.value === "5d7facaa3beda80db3462513" &&
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="especialidad">Especialidad</Label>
                        <div className={this.state.divBedroomsSelect}>
                          <Select
                            isSearchable="true"
                            isDisabled={this.props.disabled}
                            name="especialidad"
                            value={this.state.arrayConsultingRoomSelect}
                            onChange={this.handleConsulting}
                            options={this.props.type_consulting_room}
                            id="especialidad"
                          />
                        </div>
                        <div className="errorSelect">
                          {this.state.divConsultingRoomSelectError}
                        </div>
                      </FormGroup>
                    }

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
                              {
                                this.state.foto != null && this.state.foto != "" && <img alt="foto" style={{ width: 200, height: 150 }} className="image" src={"data:image/jpeg;" + this.state.foto} />
                              }
                            </div>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    }

                    <FormGroup className="top form-group col-sm-5">
                      <Label for="piso">Piso</Label>
                      <Input
                        disabled={this.props.disabled}
                        //invalid={this.state.habitacionesInvalid}
                        name="piso"
                        id="piso"
                        // onKeyUp={this.handlekeyHabitaciones}
                        onChange={this.handleChange}
                        value={this.state.piso}
                        type="number"
                        placeholder="Nro Habitaciones"
                        min={0}
                      />
                      <div className="errorSelect">
                        {/* {this.state.habitacionesError} */}
                      </div>
                    </FormGroup>

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

                    {this.state.check === false &&
                      <FormGroup className="top form-group col-sm-5">
                        <Label for="abreviatura">Nombre</Label>
                        <Input
                          disabled={this.props.disabled}
                          invalid={this.state.nombreInvalid}
                          name="nombre"
                          id="nombre"
                          onKeyUp={this.handlekeyHabitaciones}
                          onChange={this.handleNombre}
                          value={this.state.nombre}
                          type="text"
                          placeholder="nombre"
                        />
                        <div className="errorSelect">
                          {this.state.nombreError}
                        </div>
                      </FormGroup>
                    }

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
                  {this.props.modal === true &&
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