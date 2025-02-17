import React from 'react';
import { Button, Input, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, FormFeedback, } from 'reactstrap';
import '../../components/style.css';
import './Distributor.css';
import Select from 'react-select';
import jstz from 'jstz';
import { connect } from "react-redux";
import TagsInput from 'react-tagsinput';
import ContacDistributor from './ContacDistributor.js';
import { openConfirmDialog } from "../../actions/aplicantionActions";
import { cleanContacs, saveDistributorAction, editDistributorAction, actionProps } from "../../actions/DistributorActions";
import CircularProgress from "@material-ui/core/CircularProgress";
/*import 'react-tagsinput/react-tagsinput.css';*/

class ModalDistributor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      collapse: false,
      arrayTypeIdentity: [],
      arrayTypeIdentitySelect: [],
      dni: '',
      dniInvalid: false,
      dniError: '',
      name: '',
      nameError: '',
      nameInvalid: false,
      direccion: '',
      direccionError: '',
      direccionInvalid: false,
      tagsTelefonos: [],
      divTagsTelefonos: '',
      tagsTelefonosError: '',
      tagsEmails: [],
      divTagsEmails: '',
      tagsEmailsError: '',
      arrayPais: [],
      arrayPaisSelect: null,
      divPaisSelect: '',
      paisSelectError: '',
      arrayProvince: [],
      arrayProvinceSelect: null,
      divProvinceSelect: '',
      provinceSelectError: '',
      arrayDistrict: [],
      arrayDistrictSelect: null,
      divDistrictSelect: '',
      districtSelectError: '',
      errorListContacs: '',
      loading: 'show',
    };
  }

  componentDidMount() {
    if (this.props.option === 4) {
      this.setState({
        modal: this.props.modal
      });
      let type_identity = "";
      this.props.aplication.dataGeneral.dataCountries.type_identity.map((typeIdentity, i) => {
        if (typeIdentity.default === 1) {
          type_identity = typeIdentity.label;
        }
      })
      if ((this.props.distributor.contacs.length === 0) && (this.props.distributor.tableContac === 0)) {
        this.setState({
          loading: 'hide',
          arrayTypeIdentitySelect: type_identity,
        })
      } else if ((this.props.distributor.contacs.length !== 0) && (this.props.distributor.tableContac === 1)) {
        this.setState({
          loading: 'hide',
          errorListContacs: "",
          collapse: true
        })
      } else if ((this.props.distributor.contacs.length === 0) && (this.props.distributor.tableContac === 1)) {
        this.setState({
          loading: 'hide',
          errorListContacs: "¡Ingrese al menos un  contacto!",
          collapse: true
        })
      }
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  testOnclick = () => { }

  closeModal = () => {
    this.cleanState();
    this.setState({
      modal: false,
      loading: 'show'
    });
    this.props.cleanContacs();
    this.props.valorCloseModal(false);
  }

  onChange = (selected) => {
    if (Object.keys(selected).length === 0) {
      this.setState({
        selected,
        selectedInvalid: 0,
        divListBox: "borderColor",
        selectedError: "¡Seleccione los permisos!"
      });
    }
    else {
      this.setState({
        selected,
        selectedInvalid: 1,
        divListBox: "",
        selectedError: "",
      });
    }
  }

  validate = () => {
    let dniInvalid = false;
    let dniError = "";
    let nameInvalid = false;
    let nameError = "";
    let tagsTelefonosError = "";
    let divTagsTelefonos = "";
    let tagsEmailsError = "";
    let divTagsEmails = "";
    let divPaisSelect = "";
    let paisSelectError = "";
    let divProvinceSelect = "";
    let provinceSelectError = "";
    let divDistrictSelect = "";
    let districtSelectError = "";
    let direccionInvalid = false;
    let direccionError = "";
    let errorListContacs = "";
    let collapse = false;
    let acumEmail = 0;

    this.state.tagsEmails != null &&
      this.state.tagsEmails.map((email, i) => {
        let lastAtPos = email.lastIndexOf('@');
        let lastDotPos = email.lastIndexOf('.');
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
          acumEmail++;
        }
      })

    if (this.state.dni === "") {
      dniError = "¡Ingrese el DNI!";
      dniInvalid = true;
    }
    if (this.state.name === "") {
      nameError = "¡Ingrese el nombre!";
      nameInvalid = true;
    }
    if (this.state.name === "") {
      nameError = "¡Ingrese el nombre!";
      nameInvalid = true;
    }
    if ((this.state.tagsTelefonos === null) || (this.state.tagsTelefonos.length === 0)) {
      divTagsTelefonos = "borderColor";
      tagsTelefonosError = "¡Ingrese al menos un telefono!";
    }
    if ((this.state.tagsEmails === null) || (this.state.tagsEmails.length === 0)) {
      divTagsEmails = "borderColor";
      tagsEmailsError = "¡Ingrese al menos un correo!";
    }
    if (acumEmail > 0) {
      divTagsEmails = "borderColor";
      tagsEmailsError = "¡Formato de email invalido!";
    }
    if ((this.state.arrayPaisSelect === null) || (this.state.arrayPaisSelect.length === 0)) {
      divPaisSelect = "borderColor";
      paisSelectError = "¡Seleccione el pais!";
    }
    if ((this.state.arrayProvinceSelect === null) || (this.state.arrayProvinceSelect.length === 0)) {
      divProvinceSelect = "borderColor";
      provinceSelectError = "¡Seleccione la provincia!";
    }
    if ((this.state.arrayDistrictSelect === null) || (this.state.arrayDistrictSelect.length === 0)) {
      divDistrictSelect = "borderColor";
      districtSelectError = "¡Seleccione el distrito!";
    }
    if (this.state.direccion === "") {
      direccionInvalid = true;
      direccionError = "¡Ingrese la direccion!";
    }
    if ((this.props.distributor.contacs === null) || (this.props.distributor.contacs.length === 0)) {
      errorListContacs = "¡Ingrese al menos un  contacto!";
      collapse = true;

    }
    if (dniError || nameError || tagsTelefonosError || tagsEmailsError || paisSelectError ||
      provinceSelectError || districtSelectError || direccionError || errorListContacs) {
      this.setState({
        dniInvalid,
        dniError,
        nameError,
        nameInvalid,
        tagsTelefonosError,
        divTagsTelefonos,
        tagsEmailsError,
        divTagsEmails,
        paisSelectError,
        divPaisSelect,
        provinceSelectError,
        divProvinceSelect,
        divDistrictSelect,
        districtSelectError,
        direccionError,
        direccionInvalid,
        errorListContacs,
        collapse
      });
      return false;
    }
    return true;
  };

  handleSaveProveedor = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      let valueTypeIdentity = "";
      let arrayTypeIdentity = Object.values(this.state.arrayTypeIdentitySelect);
      arrayTypeIdentity.forEach(function (elemento, indice) {
        if (indice === 0) {
          valueTypeIdentity = elemento;
        }
      });

      let valuePais = "";
      let arrayPais = Object.values(this.state.arrayPaisSelect);
      arrayPais.forEach(function (elemento, indice) {
        if (indice === 1) {
          valuePais = elemento;
        }
      });

      let valueProvince = "";
      let arrayProvince = Object.values(this.state.arrayProvinceSelect);
      arrayProvince.forEach(function (elemento, indice) {
        if (indice === 1) {
          valueProvince = elemento;
        }
      });

      let valueDistrict = "";
      let arrayDistrict = Object.values(this.state.arrayDistrictSelect);
      arrayDistrict.forEach(function (elemento, indice) {
        if (indice === 1) {
          valueDistrict = elemento;
        }
      });
      if (this.props.option === 1) {
        this.setState({ loading: 'show' })
        this.props.saveDistributorAction(
          {
            name: this.state.name,
            type_identity: valueTypeIdentity,
            tin: this.state.dni,
            email: this.state.tagsEmails,
            phone: this.state.tagsTelefonos,
            country: valuePais,
            province: valueProvince,
            district: valueDistrict,
            address: this.state.direccion,
            contact: this.props.distributor.contacs,
            timeZ: jstz.determine().name()
          },
          () => {
            this.closeModal();
          },
          this.props.option
        )
      }
      else if (this.props.option === 3) {
        this.setState({ loading: 'show' })
        this.props.editDistributorAction(
          {
            id: this.props.userId,
            name: this.state.name,
            type_identity: valueTypeIdentity,
            tin: this.state.dni,
            email: this.state.tagsEmails,
            phone: this.state.tagsTelefonos,
            country: valuePais,
            province: valueProvince,
            district: valueDistrict,
            address: this.state.direccion,
            contact: this.props.distributor.contacs,
            timeZ: jstz.determine().name()
          },
          () => {
            this.closeModal();
          }
        )
      } else if (this.props.option === 4) {
        this.setState({ loading: 'show' })
        this.props.saveDistributorAction(
          {
            name: this.state.name,
            type_identity: valueTypeIdentity,
            tin: this.state.dni,
            email: this.state.tagsEmails,
            phone: this.state.tagsTelefonos,
            country: valuePais,
            province: valueProvince,
            district: valueDistrict,
            address: this.state.direccion,
            contact: this.props.distributor.contacs,
            timeZ: jstz.determine().name()
          },
          () => {
            this.closeModal();
          },
          this.props.option
        )
      }
    }
  }

  handlekeyDni = event => {
    this.setState({
      dniError: "",
      dniInvalid: false,
    })
  }

  handlekeyName = event => {
    this.setState({
      nameError: '',
      nameInvalid: false
    })
  }

  handlekeyDireccion = event => {
    this.setState({
      direccionError: '',
      direccionInvalid: false
    })
  }

  handleChangeTagsTelefonos = (tagsTelefonos) => {
    this.setState({
      tagsTelefonos,
      divTagsTelefonos: "",
      tagsTelefonosError: "",
    })
  }

  handleChangeTagsEmails = (tagsEmails) => {
    this.setState({
      tagsEmails,
      divTagsEmails: "",
      tagsEmailsError: "",
    })
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      modal: props.modal
    });

    if (props.option === 0) {
      this.cleanState();
    }
    if (props.option === 1) {
      let type_identity = "";
      props.aplication.dataGeneral.dataCountries.type_identity.map((typeIdentity, i) => {
        if (typeIdentity.default === 1) {
          type_identity = typeIdentity.label;
        }
      })
      if ((props.distributor.contacs.length === 0) && (props.distributor.tableContac === 0)) {
        this.setState({
          loading: 'hide',
          arrayTypeIdentitySelect: type_identity,
        })
      } else if ((props.distributor.contacs.length !== 0) && (props.distributor.tableContac === 1)) {
        this.setState({
          loading: 'hide',
          errorListContacs: "",
          collapse: true
        })
      } else if ((props.distributor.contacs.length === 0) && (props.distributor.tableContac === 1)) {
        this.setState({
          loading: 'hide',
          errorListContacs: "¡Ingrese al menos un  contacto!",
          collapse: true
        })
      }
    }
    if (props.option === 2 || props.option === 3) {
      if (props.distributor.distributorId.id) {
        if (props.aplication) {
          props.aplication.dataGeneral.countries != null &&
            props.aplication.dataGeneral.countries.map((country, i) => {
              if (country.value === props.aplication.dataGeneral.dataCountries.id) {
                this.setState({
                  arrayProvince: country.provinces,
                })
                country.provinces.map((province, i) => {
                  if (province.value === props.distributor.distributorId.address.id_province) {
                    this.setState({
                      arrayDistrict: province.districts,
                    })
                  }
                })
              }
            })
        }
        const selectPais = {
          label: props.distributor.distributorId.address.name_country,
          value: props.distributor.distributorId.address.id_country
        };

        const selectProvince = {
          label: props.distributor.distributorId.address.name_province,
          value: props.distributor.distributorId.address.id_province
        };

        const selectDistrict = {
          label: props.distributor.distributorId.address.name_district,
          value: props.distributor.distributorId.address.id_district
        };

        if (props.distributor.action === 0) {
          this.setState({
            arrayTypeIdentitySelect: props.distributor.distributorId.type_identity,
            dni: props.distributor.distributorId.tin,
            name: props.distributor.distributorId.name,
            tagsTelefonos: props.distributor.distributorId.phones,
            tagsEmails: props.distributor.distributorId.emails,
            arrayPaisSelect: selectPais,
            arrayProvinceSelect: selectProvince,
            arrayDistrictSelect: selectDistrict,
            direccion: props.distributor.distributorId.address.address,
            collapse: true,
            loading: 'hide',
          })
          this.props.actionProps();
        }

        if ((props.distributor.contacs.length !== 0) && (props.distributor.tableContac === 1)) {
          this.setState({
            errorListContacs: "",
            collapse: true
          })
        } else if ((props.distributor.contacs.length === 0) && (props.distributor.tableContac === 1)) {
          this.setState({
            errorListContacs: "¡Ingrese al menos un  contacto!",
            collapse: true
          })
        }
      }
    }
    if (props.option === 4) {
      let type_identity = "";
      props.aplication.dataGeneral.dataCountries.type_identity.map((typeIdentity, i) => {
        if (typeIdentity.default === 1) {
          type_identity = typeIdentity.label;
        }
      })
      if ((props.distributor.contacs.length === 0) && (props.distributor.tableContac === 0)) {
        this.setState({
          loading: 'hide',
          arrayTypeIdentitySelect: type_identity,
        })
      } else if ((props.distributor.contacs.length !== 0) && (props.distributor.tableContac === 1)) {
        this.setState({
          loading: 'hide',
          errorListContacs: "",
          collapse: true
        })
      } else if ((props.distributor.contacs.length === 0) && (props.distributor.tableContac === 1)) {
        this.setState({
          loading: 'hide',
          errorListContacs: "¡Ingrese al menos un  contacto!",
          collapse: true
        })
      }
    }
  }

  handleChangeSelectPais = (arrayPaisSelect) => {
    this.setState({
      arrayPaisSelect,
      arrayProvince: arrayPaisSelect.provinces,
      divPaisSelect: '',
      paisSelectError: '',
      arrayProvinceSelect: [],
      arrayDistrictSelect: [],
    });
  }

  handleChangeSelectProvincia = (arrayProvinceSelect) => {
    this.setState({
      arrayProvinceSelect,
      arrayDistrict: arrayProvinceSelect.districts,
      divProvinceSelect: '',
      provinceSelectError: '',
      arrayDistrictSelect: []
    });
  }

  handleChangeSelectDistrito = (arrayDistrictSelect) => {
    this.setState({
      arrayDistrictSelect,
      divDistrictSelect: '',
      DistrictSelectError: ''
    });
  }

  typeIdentityOnchange = event => {
    this.setState({
      arrayTypeIdentitySelect: event.target.value,
    })
  }

  cleanState = () => {
    this.setState({
      modal: false,
      dni: '',
      dniInvalid: false,
      dniError: '',
      name: '',
      nameError: '',
      nameInvalid: false,
      direccion: '',
      direccionError: '',
      direccionInvalid: false,
      tagsTelefonos: [],
      divTagsTelefonos: '',
      tagsTelefonosError: '',
      tagsEmails: [],
      divTagsEmails: '',
      tagsEmailsError: '',
      arrayPaisSelect: null,
      divPaisSelect: '',
      paisSelectError: '',
      arrayProvinceSelect: null,
      divProvinceSelect: '',
      provinceSelectError: '',
      arrayDistrictSelect: null,
      divDistrictSelect: '',
      districtSelectError: '',
      errorListContacs: '',
      collapse: false,
      loading: 'show',
    })
  }

  render() {
    return (
      <span>
        <Modal isOpen={this.state.modal} toggle={this.closeModal} className="ModalDistributor">
          {
            this.state.loading === "hide" ?
              <div className={this.state.divContainer}>
                <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                <ModalBody className="Scroll">
                  <form className="formCodeConfirm" onSubmit={this.handleSaveProveedor.bind(this)}>
                    <div className="row">
                      <FormGroup className="top form-group col-sm-6">
                        <Label for="dni">DNI</Label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <Input disabled={this.props.disabled} value={this.state.arrayTypeIdentitySelect} type="select" name="typeIdentity" id="typeIdentity" multiple={false} onChange={event => this.typeIdentityOnchange(event)} >
                              {
                                this.props.aplication.dataGeneral.dataCountries.type_identity != null &&
                                this.props.aplication.dataGeneral.dataCountries.type_identity.map((typeIdentity, i) => {
                                  return (
                                    <option key={i} value={typeIdentity.label} >{typeIdentity.label}</option>
                                  )
                                })
                              }
                            </Input>
                          </InputGroupAddon>
                          <Input disabled={this.props.disabled}
                            invalid={this.state.dniInvalid}
                            name="dni"
                            id="dni"
                            onKeyUp={this.handlekeyDni}
                            onChange={this.handleChange}
                            value={this.state.dni}
                            type="text"
                            placeholder="DNI" />
                          <FormFeedback tooltip>{this.state.dniError}</FormFeedback>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="name">Nombre:</Label>
                        <Input disabled={this.props.disabled}
                          invalid={this.state.nameInvalid}
                          name="name"
                          id="name"
                          onKeyUp={this.handlekeyName}
                          onChange={this.handleChange}
                          value={this.state.name}
                          type="text"
                          placeholder="Nombre" />
                        <FormFeedback tooltip>{this.state.nameError}</FormFeedback>
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="telefonos">Telefonos</Label>
                        <div className={this.state.divTagsTelefonos}>
                          <TagsInput
                            className='react-tagsinputMy'
                            inputProps={{ placeholder: "Telefono", className: 'react-tagsinput-inputMy' }}
                            focusedClassName='react-tagsinput-focusedMy'
                            tagProps={{ className: "react-tagsinput-tagMy", classNameRemove: 'react-tagsinput-removeMy' }}
                            value={this.state.tagsTelefonos}
                            disabled={this.props.disabled}
                            onChange={this.handleChangeTagsTelefonos}
                          />
                        </div>
                        <div className="errorSelect">{this.state.tagsTelefonosError}</div>
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="emails">Emails</Label>
                        <div className={this.state.divTagsEmails}>
                          <TagsInput
                            className='react-tagsinputMy'
                            inputProps={{ placeholder: "Email", className: 'react-tagsinput-inputMy' }}
                            focusedClassName='react-tagsinput-focusedMy'
                            tagProps={{ className: "react-tagsinput-tagMy", classNameRemove: 'react-tagsinput-removeMy' }}
                            value={this.state.tagsEmails}
                            disabled={this.props.disabled}
                            onChange={this.handleChangeTagsEmails} />
                        </div>
                        <div className="errorSelect">{this.state.tagsEmailsError}</div>
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="pais">Pais</Label>
                        <div className={this.state.divPaisSelect}>
                          <Select isSearchable="true"
                            isDisabled={this.props.disabled}
                            name="pais"
                            value={this.state.arrayPaisSelect}
                            onChange={this.handleChangeSelectPais}
                            options={this.props.aplication.dataGeneral.countries} />
                        </div>
                        <div className="errorSelect">{this.state.paisSelectError}</div>
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="province">Provincia</Label>
                        <div className={this.state.divProvinceSelect}>
                          <Select isSearchable="true"
                            isDisabled={this.props.disabled}
                            name="province"
                            value={this.state.arrayProvinceSelect}
                            onChange={this.handleChangeSelectProvincia}
                            options={this.state.arrayProvince} />
                        </div>
                        <div className="errorSelect">{this.state.provinceSelectError}</div>
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="distrito">Distrito</Label>
                        <div className={this.state.divDistrictSelect}>
                          <Select isSearchable="true"
                            isDisabled={this.props.disabled}
                            name="distrito"
                            value={this.state.arrayDistrictSelect}
                            onChange={this.handleChangeSelectDistrito}
                            options={this.state.arrayDistrict} />
                        </div>
                        <div className="errorSelect">{this.state.districtSelectError}</div>
                      </FormGroup>

                      <FormGroup className="top form-group col-sm-6">
                        <Label for="direccion">Direccion:</Label>
                        <Input disabled={this.props.disabled}
                          invalid={this.state.direccionInvalid}
                          name="direccion"
                          id="direccion"
                          onKeyUp={this.handlekeyDireccion}
                          onChange={this.handleChange}
                          value={this.state.direccion}
                          type="textarea"
                          placeholder="Direccion" />
                        <FormFeedback tooltip>{this.state.direccionError}</FormFeedback>
                      </FormGroup>
                    </div>
                    <ContacDistributor
                      confirm={this.props.confirm}
                      errorListContacs={this.state.errorListContacs}
                      collapse={this.state.collapse}
                      disabled={this.props.disabled}
                      option={this.props.option}
                    />
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>
                  <Button className={this.props.showHide} color="primary" onClick={this.handleSaveProveedor}>{this.props.modalFooter}</Button>
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
  distributor: state.distributor.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
  confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  saveDistributorAction: (data, callback, option) => dispatch(saveDistributorAction(data, callback, option)),
  editDistributorAction: (data, callback) => dispatch(editDistributorAction(data, callback)),
  cleanContacs: () => dispatch(cleanContacs()),
  actionProps: () => dispatch(actionProps()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDistributor);