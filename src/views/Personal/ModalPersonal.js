import React from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { Button, Col, Row, Table, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText, FormFeedback, Tooltip, } from 'reactstrap';
import classnames from 'classnames';
import '../../components/style.css';
import './Personal.css';
import { InitalState } from './InitialStatePersonal.js';
import axios from 'axios';
import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar} from 'react-icons/fa';
import jstz from 'jstz';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import Select from 'react-select';
import { saveCargoAction, editCargoAction, ValidateEmailUsersFunction } from "../../actions/PersonalInternoActions";
import { openSnackbars, openConfirmDialog } from "../../actions/aplicantionActions";

class ModalCargos extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
			...InitalState                              
		};
	}

	componentDidMount(){       
        
        /*this.setState({
            arrayProvince: this.props.aplication.dataGeneral.dataCountries,
        })*/
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }

    closeModal = () => {
        this.setState({
            ...InitalState                
        })        
    	this.props.valorCloseModal(false); 
    }   

    validate = () => {
        let cargoInvalid = false;
        let cargoError = "";        
        let descripcionInvalid = false;
        let descripcionError = "";       

        if (this.state.cargo === "") {
            cargoError = "¡Ingrese el cargo!";
            cargoInvalid = true;
        }
        if (this.state.descripcion === "") {
            descripcionError = "¡Ingrese la descripcion!";
            descripcionInvalid = true;
        }        
        if (cargoError || descripcionError) {            
            this.setState({ 
                cargoError,
                cargoInvalid,                         
                descripcionError,    
                descripcionInvalid,                 
            });                           
            return false;
        }        
        return true;
    } 

    handleSavePersonal = event => {
        event.preventDefault();
        const isValid = this.validate();        
        if (isValid) { 
            alert(1111)
            /*if(this.props.option === 1)
            {
                this.setState({loading:'show'})    
                this.props.saveCargoAction(
                  {
                    name:this.state.cargo,
                    description: this.state.descripcion,   
                    timeZ: jstz.determine().name()
                  },
                  () => {
                    this.closeModal();                    
                  }
                )
            } 
            else if(this.props.option === 3){
                this.setState({loading:'show'})    
                this.props.editCargoAction(
                  {
                    _id:this.props.cargoId,
                    name:this.state.cargo,
                    description: this.state.descripcion,   
                    timeZ: jstz.determine().name()
                  },
                  () => {
                    this.closeModal();                    
                  }
                )
            }   */        
        }
    }

    typeIdentityOnchange = event =>{    
        this.setState({
            arrayTypeIdentitySelect:event.target.value,    
            selectedTypeIdentity: 1,        
        })
    } 

    handlekeyDni = event =>{
        this.setState({
            dniError: "",
            dniInvalid: false,            
        })
    }

    handlekeyNames = event =>{
        this.setState({
            namesError: "",
            namesInvalid: false,            
        })
    }

    handlekeySurnames = event =>{
        this.setState({
            surnamesError: "",
            surnamesInvalid: false,            
        })
    }

    handlekeyDireccion = event =>{
        this.setState({
            direccionError: "",
            direccionInvalid: false,            
        })
    }

    handleChangeSelectSex = (arraySexSelect) => {
        this.setState({ 
            arraySexSelect,
            divSelectSexo: '',
            sexSelectError: ''                                
        });                
    }  

    handleChangeSelectCivilState = (arrayEstatetCivilSelect) => {
        this.setState({ 
            arrayEstatetCivilSelect,
            divEstateCivilSelect: '',
            estateCivilSelectError: ''                                
        });                
    }    

    handleChangeSelectCharges = (arrayChargesSelect) => {
        this.setState({ 
            arrayChargesSelect,
            divChargesSelect: '',
            chargesSelectError: ''                                
        });                
    }

    handleChangeSelectProfession = (arrayProfessionSelect) => {
        this.setState({ 
            arrayProfessionSelect,
            divProfessionSelect: '',
            professionSelectError: ''                                
        });                
    }    

    handleChangeSelectEspecialization = (arrayEspecializationSelect) => {
        this.setState({ 
            arrayEspecializationSelect,
            divEspecializationSelect: '',
            especializationSelectError: ''                                
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

    fileHandlerFoto = event =>{ 
      event.preventDefault();
       if(event.target.files[0].size > 25000) {
            this.setState({
                fotoError:'El tamaño de la imagen no esta permitido ',
                fotoInvalid:true,
                collapseFil:true,
            })           
       }  
       else {
            this.setState({
                fotoError:' ',
                fotoInvalid:false,
            })
            let selectedFile = event.target.files;
            let fileName = "";
            let file = null
            if (selectedFile.length > 0) {
                let fileToLoad = selectedFile[0];
                fileName = fileToLoad.name;
                let fileReader = new FileReader();
                fileReader.onload = function(fileLoadedEvent) {
                    file = fileLoadedEvent.target.result;
                    this.setState({
                       foto: file
                    })
                }
                .bind(this)
                // Convert data to base64
                fileReader.readAsDataURL(fileToLoad);
            }
       }              
    }

    handleChangeTagsTelefonos = (tagsTelefonos) => {
        this.setState({
            tagsTelefonos,
            divTagsTelefonos: "",
            tagsTelefonosError: "",
        })
    }

    handleChangeTagsEmails = (tagsEmails) => {    
        let acumEmail = 0;
        tagsEmails!= null && 
        tagsEmails.map((email, i) => {          
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                acumEmail++;
            }
        })
        if(acumEmail > 0){
            this.props.alert("warning", "¡Formato de correo invalido!");      
        }else{
            this.props.ValidateEmailUsersFunction(
                tagsEmails, 
                () => {
                    this.setState({
                        tagsEmails,
                        divTagsEmails: "",
                        tagsEmailsError: "",            
                    })
                })            
            
        }        
    }

    handleChangeSelectRegisterUser = (arrayRegisterUserSelect) => {
        this.setState({ 
            arrayRegisterUserSelect,
            divRegisterUserSelect: '',
            registerUserSelectError: ''                                
        });  
    }

    handleChangeUsersSelect = (arrayUsersSelect) => {
        this.setState({ 
            arrayUsersSelect,
            divUsersSelect:'',
            divUsersSelectError:'',
        });  
    }

    componentWillReceiveProps=(props)=>{    
        console.log("modal personal personaInterno", props.personaInterno);              
        /*console.log("modal personal aplication", props.aplication);  */  
        if(props.aplication){
            let arrayProvinces = [];
            props.aplication.dataGeneral.countries != null && 
            props.aplication.dataGeneral.countries.map((country, i) => {       
                if(country.value === props.aplication.dataGeneral.dataCountries.id){
                    this.setState({
                        arrayProvince:country.provinces
                    })
                }                
            }) 
        }
        this.setState({
            modal: props.modal,       
            loading:'show'     
        });       
        if(props.option !== 1){

        }else{
            this.setState({
                loading:'hide',
                arrayTypeIdentitySelect: this.props.aplication.dataGeneral.dataCountries.type_identity[0]["value"],                
            })    
        }
                 
    }

	render() {   
        return (
            <span>                            
        		<Modal isOpen={this.props.modal} className="ModalUsersRoles">
                    {
                        this.state.loading === "hide" ?
                            <div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">    
                                <form className="formCodeConfirm" onSubmit={this.handleSavePersonal.bind(this)}> 
                                    <div className="row"> 
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="dni">DNI</Label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <Input disabled={this.props.disabled} value={this.state.arrayTypeIdentitySelect} type="select" name="typeIdentity" id="typeIdentity" multiple={false} onChange={event =>this.typeIdentityOnchange(event)} >                                                            
                                                        {
                                                            this.props.aplication.dataGeneral.dataCountries.type_identity != null && 
                                                            this.props.aplication.dataGeneral.dataCountries.type_identity.map((typeIdentity, i) => {       
                                                                return(
                                                                    <option key={i} value={typeIdentity.label} >{typeIdentity.label}</option>                                                            
                                                                )                                                        
                                                            })
                                                        } 
                                                    </Input>
                                                </InputGroupAddon>&nbsp;&nbsp;
                                                <Input disabled={this.props.disabled} invalid={this.state.dniInvalid} name="dni" id="dni" onKeyUp={this.handlekeyDni} onChange={this.handleChange} value={this.state.dni} type="text" placeholder="DNI" />                                                    
                                                <FormFeedback tooltip>{this.state.dniError}</FormFeedback>                                                                                                                                                                     
                                            </InputGroup> 
                                        </FormGroup>  
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="cargo">Cargo</Label>
                                            <div className={this.state.divChargesSelect}>
                                                <Select isSearchable="true" isDisabled={this.props.disabled} name="cargo" value={this.state.arrayChargesSelect} onChange={this.handleChangeSelectCharges} options={this.props.personaInterno.cargos} />
                                            </div>
                                            <div className="errorSelect">{this.state.chargesSelectError}</div>                                                                
                                        </FormGroup>  
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="nombres">Nombres:</Label>
                                            <Input disabled={this.props.disabled} invalid={this.state.namesInvalid} name="names" id="names" onKeyUp={this.handlekeyNames} onChange={this.handleChange} value={this.state.names} type="text" placeholder="Nombres" />
                                            <FormFeedback tooltip>{this.state.namesError}</FormFeedback>                                                                                                                                                            
                                        </FormGroup> 
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="surnames">Apellidos:</Label>
                                            <Input disabled={this.props.disabled} invalid={this.state.surnamesInvalid} name="surnames" id="surnames" onKeyUp={this.handlekeySurnames} onChange={this.handleChange} value={this.state.surnames} type="text" placeholder="Apellidos" />
                                            <FormFeedback tooltip>{this.state.surnamesError}</FormFeedback>                                                                                                                                                            
                                        </FormGroup> 
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="sexo">Sexo</Label>
                                            <div className={this.state.divSexSelect}>
                                                <Select isSearchable="true" isDisabled={this.props.disabled} name="sex" value={this.state.arraySexSelect} onChange={this.handleChangeSelectSex} options={this.props.aplication.dataGeneral.dataGeneral.sex} />
                                            </div>
                                            <div className="errorSelect">{this.state.sexSelectError}</div>                                                                
                                        </FormGroup>  
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="emails">Fecha de Nacimiento</Label>
                                            <div className={this.state.divBirthDate}>
                                                <DatePicker
                                                    selected={this.state.birthDate}
                                                    onChange={this.handleChangebirthDate}
                                                    dateFormat="dd-MM-yyyy"       
                                                    isClearable={this.props.isClearable}    
                                                    showYearDropdown
                                                    dateFormatCalendar="MMMM"
                                                    className="form-control"
                                                    disabled={this.props.disabled}
                                                />
                                            </div>
                                            <div className="errorSelect">{this.state.birthDateError}</div>                                                                
                                        </FormGroup>    
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="civilState">Estado Civil</Label>
                                            <div className={this.state.divEstateCivilSelect}>
                                                <Select isSearchable="true" isDisabled={this.props.disabled} name="civilState" value={this.state.arrayEstatetCivilSelect} onChange={this.handleChangeSelectCivilState} options={this.props.aplication.dataGeneral.dataGeneral.civil_state} />
                                            </div>
                                            <div className="errorSelect">{this.state.estateCivilSelectError}</div>                                                                
                                        </FormGroup>   
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="profession">Profesion</Label>
                                            <div className={this.state.divProfessionSelect}>
                                                <Select isSearchable="true" isDisabled={this.props.disabled} name="profession" value={this.state.arrayProfessionSelect} onChange={this.handleChangeSelectProfession} options={this.props.aplication.dataGeneral.dataGeneral.profession} />
                                            </div>
                                            <div className="errorSelect">{this.state.professionSelectError}</div>                                                                
                                        </FormGroup>   
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="especialization">Especializacion</Label>
                                            <div className={this.state.divEspecializationSelect}>
                                                <Select isSearchable="true" isDisabled={this.props.disabled} name="especialization" value={this.state.arrayEspecializationSelect} onChange={this.handleChangeSelectEspecialization} options={this.props.aplication.dataGeneral.dataGeneral.specialization} />
                                            </div>
                                            <div className="errorSelect">{this.state.especializationSelectError}</div>                                                                
                                        </FormGroup>   
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="telefonos">Telefonos</Label>
                                            <div className={this.state.divTagsTelefonos}>
                                                <TagsInput 
                                                    className='react-tagsinputMy'  
                                                    inputProps={{placeholder:"Telefono", className:'react-tagsinput-inputMy'}} 
                                                    focusedClassName='react-tagsinput-focusedMy' 
                                                    tagProps={{className:"react-tagsinput-tagMy", classNameRemove:'react-tagsinput-removeMy'}} 
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
                                                    inputProps={{placeholder:"Email", className:'react-tagsinput-inputMy'}} 
                                                    focusedClassName='react-tagsinput-focusedMy' 
                                                    tagProps={{className:"react-tagsinput-tagMy", classNameRemove:'react-tagsinput-removeMy'}} 
                                                    value={this.state.tagsEmails} 
                                                    disabled={this.props.disabled} 
                                                    onChange={this.handleChangeTagsEmails} 
                                                />
                                            </div>
                                            <div className="errorSelect">{this.state.tagsEmailsError}</div>                                                                
                                        </FormGroup>   
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="emails">Fecha de Ingreso</Label>
                                            <div className={this.state.divEntryDate}>
                                                <DatePicker
                                                    selected={this.state.entryDate}
                                                    onChange={this.handleChangeEntryDate}
                                                    dateFormat="dd-MM-yyyy"       
                                                    isClearable={this.props.isClearable}    
                                                    showYearDropdown
                                                    dateFormatCalendar="MMMM"
                                                    className="form-control"
                                                    disabled={this.props.disabled}
                                                />
                                            </div>
                                            <div className="errorSelect">{this.state.entryDateError}</div>                                                                
                                        </FormGroup>   
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="province">Provincia</Label>
                                            <div className={this.state.divProvinceSelect}>
                                                <Select isSearchable="true" isDisabled={this.props.disabled} name="province" value={this.state.arrayProvinceSelect} onChange={this.handleChangeSelectProvincia} options={this.state.arrayProvince} />
                                            </div>
                                            <div className="errorSelect">{this.state.provinceSelectError}</div>                                                                
                                        </FormGroup>
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="distrito">Distrito</Label>
                                            <div className={this.state.divDistrictSelect}>
                                                <Select isSearchable="true" isDisabled={this.props.disabled} name="distrito" value={this.state.arrayDistrictSelect} onChange={this.handleChangeSelectDistrito} options={this.state.arrayDistrict} />
                                            </div>
                                            <div className="errorSelect">{this.state.DistrictSelectError}</div>                                                                
                                        </FormGroup>                               
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="direccion">Direccion:</Label>
                                            <Input disabled={this.props.disabled} invalid={this.state.direccionInvalid} name="direccion" id="direccion" onKeyUp={this.handlekeyDireccion} onChange={this.handleChange} value={this.state.direccion} type="textarea" placeholder="Direccion" />
                                            <FormFeedback tooltip>{this.state.direccionError}</FormFeedback>                                                                                                                                                            
                                        </FormGroup> 
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="foto">Foto:</Label>
                                            <br />
                                            <InputGroup>
                                            <Input className="top" type="file" accept="image/*" invalid={this.state.fotoInvalid} onChange={this.fileHandlerFoto} />
                                            <FormFeedback tooltip>{this.state.fotoError}</FormFeedback>  
                                            <InputGroupAddon addonType="append">
                                                <div>
                                                    {
                                                    this.state.foto != null && <img style={{width: 150, height: 150}}  className="image"  src={"data:image/jpeg;" + this.state.foto} />
                                                    }
                                                </div>
                                            </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>                                         
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="registerUser">¿Registrar como Usuario?</Label>
                                            <div className={this.state.divRegisterUserSelect}>
                                                <Select isSearchable="true" isDisabled={this.state.varDisabledRegisterUser} name="registerUser" value={this.state.arrayRegisterUserSelect} onChange={this.handleChangeSelectRegisterUser} options={this.state.arrayRegisterUser} />                                    
                                            </div>
                                            <div className="errorSelect">{this.state.registerUserSelectError}</div>
                                        </FormGroup>   
                                        <FormGroup className={"top form-group col-sm-6 "+this.state.hideFormGroup}>                                                                 
                                            <Label for="usersSelect">Usuario:</Label>
                                            <div className={this.state.divUsersSelect}>
                                            
                                                <Select isSearchable="true" isDisabled={this.state.varDisabledRegisterUser} name="usersSelect" value={this.state.arrayUsersSelect} onChange={this.handleChangeUsersSelect} options={this.props.personaInterno.emailUsers} />
                                                <div style={{width:'-2%'}}>
                                                    <Button title="Ver Rol" className={this.state.ocultarBotones} disabled={this.state.varDisabled} onClick={() => { this.openRoles(2, this.state.rolIdView); }}><FaSearch size="1em"/></Button>&nbsp;
                                                    <Button title="Agregar Rol" disabled={this.state.varDisabled} onClick={this.toggleNuevoRol} id="">{this.state.imageButton}</Button>
                                                </div>
                                            
                                            </div>
                                            <div className="errorSelect">{this.state.divUsersSelectError}</div>                                            
                                        </FormGroup> 
                                    </div>  
                                </form>                                                                
                            </ModalBody>
                            <ModalFooter>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSaveCargos}>{this.props.modalFooter}</Button>
                                <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>                                                                                                                                                                                                                                                                                                                           
                            </ModalFooter>
                            </div>
                        :
                            <div align="center" className={this.state.divLoading} style={{padding:"1%"}}><img src="assets/loader.gif" width="30%" /></div>
                    }
                </Modal>                
            </span> 
		);
	}
  }
const mapStateToProps = state => ({
  personaInterno: state.personaInterno.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({  
    saveCargoAction: (data, callback) => dispatch(saveCargoAction(data, callback)),  
    editCargoAction: (data, callback) => dispatch(editCargoAction(data, callback)),  
    alert: (type, message) => dispatch(openSnackbars(type, message)), 
    ValidateEmailUsersFunction: (arrayEmails, callback) => dispatch(ValidateEmailUsersFunction(arrayEmails, callback)), 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCargos);