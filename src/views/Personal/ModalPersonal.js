import React from 'react';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { Button, Input, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, FormFeedback } from 'reactstrap';
import '../../components/style.css';
import './Personal.css';
import { InitalState } from './InitialStatePersonal.js';
import { FaUserCircle, } from 'react-icons/fa';
import jstz from 'jstz';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import Select from 'react-select';
import { ValidateEmailUsersFunction, savePersonalInternoAction, editPersonalAction, deleteInfoAction } from "../../actions/PersonalInternoActions";
import { deleteInfoUserId, saveRolAction, LoadRolIdFunction, saveUserNoMasterAction, editUserNoMasterAction, addSucursalFunction, deleteSucursalFunction, LoadIdUsersNoMasterFunction } from "../../actions/UserAction";
import { openSnackbars } from "../../actions/aplicantionActions";
import ModalUser from '../Usuarios/ModalUser.js';
import Switch from '@material-ui/core/Switch';

class ModalCargos extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
			...InitalState                              
		};
	}
	componentDidMount(){
        //this.props.loadUsersRoles();
    }    

    testWamix = () => {}

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
        this.props.deleteInfoUserId();        
        this.props.deleteInfoAction();        
    }   

    validate = () => {
        let dniInvalid = false;
        let dniError = "";
        let divChargesSelect = "";
        let chargesSelectError = "";
        let namesInvalid = false;
        let namesError = "";
        let surnamesInvalid = false;
        let surnamesError = "";
        let divSexSelect = "";
        let sexSelectError = "";
        let divBirthDate = "";
        let birthDateError = "";
        let divEstateCivilSelect = "";
        let estateCivilSelectError = "";
        let divProfessionSelect = "";
        let professionSelectError = "";
        let divEspecializationSelect = "";
        let especializationSelectError = "";
        let divSucursalesSelect = "";
        let divSucursalesSelectError = "";
        let divTagsTelefonos = "";
        let tagsTelefonosError = "";
        let divTagsEmails = "";
        let tagsEmailsError = "";
        let divEntryDate = "";
        let entryDateError = "";
        let divProvinceSelect = "";
        let provinceSelectError = "";
        let divDistrictSelect = "";
        let DistrictSelectError = "";
        let direccionInvalid = false;
        let direccionError = "";  
        let divRegisterUserSelect = '';
        let registerUserSelectError = '';
        let divUsersSelect = '';
        let divUsersSelectError = '';
        
        let valueRegisterUser = "";
        if (this.state.arrayRegisterUserSelect !== null){            
            let arrayRegisterUsers = Object.values(this.state.arrayRegisterUserSelect);
            arrayRegisterUsers.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueRegisterUser = elemento;
                }            
            });     
        }        
        if (!this.state.dni){            
            dniInvalid = true;
            dniError = "¡Ingrese el Dni!";                        
        }
        if (!this.state.arrayChargesSelect){            
            divChargesSelect = "borderColor";
            chargesSelectError = "¡Seleccione el cargo!";                        
        } 
        if (!this.state.names){            
            namesInvalid = true;
            namesError = "¡Ingrese los nombres!";                        
        }
        if (!this.state.surnames){            
            surnamesInvalid = true;
            surnamesError = "¡Ingrese los nombres!";                        
        }
        if (!this.state.arraySexSelect){            
            divSexSelect = "borderColor";
            sexSelectError = "¡Seleccione el sexo!";                        
        }       
        if (!this.state.birthDate){            
            divBirthDate = "borderColorFecha";
            birthDateError = "¡Ingrese la fecha de nacimiento!";                        
        }
         if (!this.state.arrayEstatetCivilSelect){            
            divEstateCivilSelect = "borderColor";
            estateCivilSelectError = "¡Seleccione el estado civil!";                        
        }      
        if (!this.state.arrayProfessionSelect){            
            divProfessionSelect = "borderColor";
            professionSelectError = "¡Seleccione la profesion!";                        
        }     
        if (!this.state.arrayEspecializationSelect){            
            divEspecializationSelect = "borderColor";
            especializationSelectError = "¡Seleccione la especializacion!";                        
        }     
        if (!this.state.arraySucursalesSelect){            
            divSucursalesSelect = "borderColor";
            divSucursalesSelectError = "¡Seleccione la(s) sucursales!";                        
        }     
        if (!this.state.entryDate){            
            divEntryDate = "borderColorFecha";
            entryDateError = "¡Ingrese la fecha de ingreso!";                        
        }
        if ((this.state.tagsTelefonos === null) || (this.state.tagsTelefonos.length === 0)){            
            divTagsTelefonos = "borderColor";
            tagsTelefonosError = "¡Ingrese al menos un telefono!";                        
        }       
        if ((this.state.tagsEmails === null) || (this.state.tagsEmails.length === 0)){            
            divTagsEmails = "borderColor";
            tagsEmailsError = "¡Ingrese al menos un correo!";                        
        }
        if (!this.state.arrayProvinceSelect){            
            divProvinceSelect = "borderColor";
            provinceSelectError = "¡Seleccione la provincia!";                        
        }
        if (!this.state.arrayDistrictSelect){            
            divDistrictSelect = "borderColor";
            DistrictSelectError = "¡Seleccione el distrito!";                        
        }
        if (!this.state.direccion){
            direccionInvalid = true;
            direccionError = "¡Ingrese la direccion!";                        
        }
        if (!this.state.arrayRegisterUserSelect){            
            divRegisterUserSelect = "borderColor";
            registerUserSelectError = "¡Seleccione si el personal sera registrado como usuario!";                        
        }    
        if(valueRegisterUser === "SI"){            
            if(!this.state.arrayUsersSelect){
                divUsersSelect = "borderColor";
                divUsersSelectError = "¡Seleccione el usuario registrar!";                        
            }
        }
        if (dniError || chargesSelectError || namesError || surnamesError || sexSelectError || birthDateError || estateCivilSelectError || professionSelectError || 
            especializationSelectError || divSucursalesSelectError || entryDateError || tagsTelefonosError || tagsEmailsError || provinceSelectError || DistrictSelectError || 
            direccionError || registerUserSelectError || divUsersSelectError) {            
            this.setState({ 
                dniInvalid,
                dniError,
                chargesSelectError,
                divChargesSelect,
                namesError,
                namesInvalid,
                surnamesError, 
                surnamesInvalid,
                sexSelectError,
                divSexSelect,
                divBirthDate,
                birthDateError,
                divEstateCivilSelect,
                estateCivilSelectError,
                professionSelectError,
                divProfessionSelect,
                especializationSelectError,
                divEspecializationSelect,
                tagsTelefonosError,
                divTagsTelefonos,
                tagsEmailsError,
                divTagsEmails,
                provinceSelectError,
                divProvinceSelect,
                DistrictSelectError,
                divDistrictSelect,                
                direccionError,
                direccionInvalid,
                divSucursalesSelect,
                divSucursalesSelectError,
                divEntryDate,
                entryDateError,
                divRegisterUserSelect,
                registerUserSelectError,
                divUsersSelect,
                divUsersSelectError,
            });    
            return false;
        }
        return true;
    } 

    handleSavePersonal = event => {
        event.preventDefault();
        const isValid = this.validate();        
        if (isValid) { 
            let birthDate = new Date(this.state.birthDate).toISOString().slice(0,10);
            let entryDate = new Date(this.state.entryDate).toISOString().slice(0,10);

            let valueCivilState = "";
            let arrayCivilState = Object.values(this.state.arrayEstatetCivilSelect);
            arrayCivilState.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueCivilState = elemento;
                }            
            });       

            let valueSex = "";
            let arraySex = Object.values(this.state.arraySexSelect);
            arraySex.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueSex = elemento;
                }            
            });       

            let valueProvince = "";
            let arrayProvince = Object.values(this.state.arrayProvinceSelect);
            arrayProvince.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueProvince = elemento;
                }            
            });    

            let valueDistrito = "";
            let arrayDistrito = Object.values(this.state.arrayDistrictSelect);
            arrayDistrito.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueDistrito = elemento;
                }            
            });   

            let valueCargo = "";
            let arrayCargo = Object.values(this.state.arrayChargesSelect);
            arrayCargo.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueCargo = elemento;
                }            
            });   

            let valueProfesion = "";
            let arrayProfesion = Object.values(this.state.arrayProfessionSelect);
            arrayProfesion.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueProfesion = elemento;
                }            
            });   

            let valueEspecializacion = "";
            let arrayEspecializacion = Object.values(this.state.arrayEspecializationSelect);
            arrayEspecializacion.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueEspecializacion = elemento;
                }            
            });

            let valueSucursales = [];
            if (this.state.arraySucursalesSelect !== null){            
                let arraySucursales = Object.values(this.state.arraySucursalesSelect);
                arraySucursales.forEach(function (elemento, indice, array) {
                    valueSucursales.push(elemento.value)   
                });     
            }   

            let valueRegisterUser = "";
            if (this.state.arrayRegisterUserSelect !== null){            
                let arrayRegisterUsers = Object.values(this.state.arrayRegisterUserSelect);
                arrayRegisterUsers.forEach(function (elemento, indice, array) {
                    if(indice === 1){
                        valueRegisterUser = elemento;
                    }            
                });     
            }
            
            if(this.props.option === 1)
            {
                this.setState({loading:'show'})    
                this.props.savePersonalInternoAction(
                  {
                    user_id: this.props.userId,
                    type_identity:this.state.arrayTypeIdentitySelect,
                    dni:this.state.dni,
                    names:this.state.names,
                    surnames: this.state.surnames,   
                    province_id: valueProvince,   
                    district_id: valueDistrito,   
                    profession_id: valueProfesion,   
                    specialization_id: valueEspecializacion,   
                    sucursales_id: valueSucursales,   
                    address: this.state.direccion,   
                    phone: this.state.tagsTelefonos,   
                    email: this.state.tagsEmails,   
                    sex_id: valueSex,   
                    civil_state_id: valueCivilState,   
                    photo: this.state.foto,   
                    birth_date: birthDate,        
                    entry_date: entryDate,        
                    position_id: valueCargo,     
                    visitor: this.state.checkedA,     
                    timeZ: jstz.determine().name()
                  },
                  () => {
                    this.closeModal();                                        
                  }
                )
            } 
            else if(this.props.option === 3){
                this.setState({loading:'show'})  
                var userId = '';
                if(this.props.userId !== ''){
                    userId = this.props.userId;
                }else{
                    userId = this.props.personaInterno.userId;
                }
                if(valueRegisterUser === 'NO'){
                    userId = '';
                }

                this.props.editPersonalAction(
                  {
                    _id: this.props.id,
                    user_id: userId,
                    type_identity:this.state.arrayTypeIdentitySelect,
                    dni:this.state.dni,
                    names:this.state.names,
                    surnames: this.state.surnames,   
                    province_id: valueProvince,   
                    district_id: valueDistrito,   
                    profession_id: valueProfesion,   
                    specialization_id: valueEspecializacion,   
                    sucursales_id: valueSucursales,   
                    address: this.state.direccion,   
                    phone: this.state.tagsTelefonos,   
                    email: this.state.tagsEmails,   
                    sex_id: valueSex,   
                    civil_state_id: valueCivilState,   
                    photo: this.state.foto,   
                    birth_date: birthDate,        
                    entry_date: entryDate,        
                    position_id: valueCargo,     
                    visitor: this.state.checkedA,     
                    timeZ: jstz.determine().name()
                  },
                  () => {
                    this.closeModal();                    
                  }
                )
            }           
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
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
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
        let valueSelectRegister = "";
        let arraySelectRegister = Object.values(arrayRegisterUserSelect);
        arraySelectRegister.forEach(function (elemento, indice) {
            if(indice === 1){
                valueSelectRegister = elemento;
            }            
        });    
        this.setState({ 
            arrayRegisterUserSelect,
            divRegisterUserSelect: '',
            registerUserSelectError: ''                                
        });  
        if(valueSelectRegister === 'NO'){
            this.setState({
                arrayUsersSelect: null
            })
        }
    }

    handleChangeSucursalesSelect = (arraySucursalesSelect) => {
        this.setState({ 
            arraySucursalesSelect,
            divSucursalesSelect: '',
            divSucursalesSelectError: ''                                
        });  
    }

    handleChangeUsersSelect = (arrayUsersSelect) => {
        let valueEmailUser = "";
        let arrayEmailUSer = Object.values(arrayUsersSelect);
        arrayEmailUSer.forEach(function (elemento, indice) {
            if(indice === 1){
                valueEmailUser = elemento;
            }            
        });            
        if(this.props.option === 3){
            if(this.props.personaInterno.personalId.email_user === valueEmailUser){
                this.props.LoadIdUsersNoMasterFunction(this.props.personaInterno.userId);
                this.setState({
                    arrayUsersSelect,
                    divUsersSelect:'',
                    divUsersSelectError:'',
                    modal:true,
                    option: 6,
                    modalHeader:'Editar Usuario',
                    modalFooter:'Editar',
                    disabled: true,
                    disabledEmail: true,
                    showHide: 'hide',
                })
            }else{                
                this.setState({ 
                    arrayUsersSelect,
                    divUsersSelect:'',
                    divUsersSelectError:'',
                    modal:true,
                    option: 4,
                    modalHeader:'Registrar Usuario',
                    modalFooter:'Guardar',
                    disabled: false,
                    disabledEmail: true,
                    showHide: 'show',
                    emailUserSelect: valueEmailUser
                });          
            }            
        }
        if(this.props.option === 1){            
            this.setState({ 
                arrayUsersSelect,
                divUsersSelect:'',
                divUsersSelectError:'',
                modal:true,
                option: 4,
                modalHeader:'Registrar Usuario',
                modalFooter:'Guardar',
                disabled: false,
                disabledEmail: true,
                showHide: 'show',
                emailUserSelect: valueEmailUser
            });                          
        }
    }

    handleChangebirthDate = (date) => {
        this.setState({
          birthDate: date,
          birthDateError: "",
          divBirthDate: ""
        });
    }

    handleChangeEntryDate = (date) => {
        this.setState({
          entryDate: date,
          entryDateError: "",
          divEntryDate: ""
        });
    }

    valorCloseModalRoles = (valor) => {    
        this.setState({            
            modal: valor,          
            option: 0,            
        });                    
    } 

    componentWillReceiveProps=(props)=>{            
        /*console.log("modal personal personaInterno", props.personaInterno);              
        console.log("modal personal usersRoles", props.usersRoles.toJS()); */                     
        //console.log("modal personal application ", props.aplication);                      
        this.setState({
            modal: props.modal,       
            loading:'show'     
        });   
        if(props.aplication){
            props.aplication.dataGeneral.countries != null && 
            props.aplication.dataGeneral.countries.map((country, i) => {       
                if(country.value === props.aplication.dataGeneral.dataCountries.id){
                    this.setState({
                        arrayProvince:country.provinces,                        
                    })                    
                    if(props.personaInterno.personalId.array_province){
                        country.provinces.map((province, i) => {       
                            if(province.value === props.personaInterno.personalId.array_province.value){
                                this.setState({
                                    arrayDistrict:province.districts,                        
                                })
                            }
                        })
                    }
                }                
            }) 
        }                

        if(props.option === 2 || props.option === 3){
            props.option === 2 ? this.setState({disabledSelectUser:true}) : false
            if(props.personaInterno.personalId.birth_date){
                var parts_date_birth = props.personaInterno.personalId.birth_date.split('-');            
                var birthDate = new Date(parts_date_birth[0], parts_date_birth[1] - 1, parts_date_birth[2]);                 
                var parts_date_entry = props.personaInterno.personalId.entry_date.split('-');            
                var entryDate = new Date(parts_date_entry[0], parts_date_entry[1] - 1, parts_date_entry[2]);                 
            }
            var registarComoUsuario = {};
            var arrayUser = null;
            if(props.personaInterno.personalId.user_id !== ""){
                registarComoUsuario = { value: "SI", label: "SI" }
                arrayUser = { value: props.personaInterno.personalId.email_user, label: props.personaInterno.personalId.email_user }
            }else{
                registarComoUsuario = { value: "NO", label: "NO" }
                arrayUser = null
            }

            if(props.userId !== ""){
                registarComoUsuario = { value: "SI", label: "SI" };
                arrayUser = { value: props.userEmail, label: props.userEmail };
                this.setState({disabledSelectUser:true});
            }
            var emailsTags = [];            
            props.personaInterno.emailUsers.map((emails, i) => { emailsTags.push(emails.label) })
            emailsTags.push(props.personaInterno.personalId.email_user)

            Array.prototype.unique=function(a){
              return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
            });                   
            this.setState({
                arrayTypeIdentitySelect: props.personaInterno.personalId.type_identity,                
                dni: props.personaInterno.personalId.dni,
                arrayChargesSelect: props.personaInterno.personalId.array_positions,                
                names: props.personaInterno.personalId.names,
                surnames: props.personaInterno.personalId.surnames,
                arraySexSelect: props.personaInterno.personalId.array_sex,
                birthDate: birthDate,
                arrayEstatetCivilSelect: props.personaInterno.personalId.array_civil_state,
                arrayProfessionSelect: props.personaInterno.personalId.array_profession,
                arrayEspecializationSelect: props.personaInterno.personalId.array_specialization,
                arraySucursalesSelect: props.personaInterno.personalId.surcursales_id,
                tagsTelefonos: props.personaInterno.personalId.phone?props.personaInterno.personalId.phone:[],
                tagsEmails: emailsTags.unique()?emailsTags.unique():[],
                arrayProvinceSelect: props.personaInterno.personalId.array_province,
                arrayDistrictSelect: props.personaInterno.personalId.array_district,
                direccion: props.personaInterno.personalId.address,
                foto: props.personaInterno.personalId.photo,
                entryDate: entryDate,
                arrayRegisterUserSelect: registarComoUsuario,
                arrayUsersSelect: arrayUser,
                checkedA: props.personaInterno.personalId.visitor,
                userIdEdit: props.personaInterno.userId,
                loading: props.personaInterno.personalId.loading,
            })   
        }else if(props.option === 1){          
            props.userId !== "" ? this.setState({disabledSelectUser: true,}): false            
            this.setState({                
                loading:'hide',
                arrayTypeIdentitySelect: props.aplication.dataGeneral.dataCountries.type_identity[0]["value"],                           
            })                
        }else if(props.option === 0){                     
            this.setState({
                arrayTypeIdentitySelect: props.aplication.dataGeneral.dataCountries.type_identity[0]["value"],                
                ...InitalState
            })    
        }
                 
    }

    viewUserId = () =>{
        if(this.props.option === 1){
            if(this.props.userId !== ''){
                this.props.LoadIdUsersNoMasterFunction(this.props.userId);
                this.setState({
                    modal:true,
                    option: 5,
                    modalHeader:'Ver Usuario',
                    modalFooter:'Guardar',
                    disabled: true,
                    disabledEmail: true,
                    showHide: 'hide',
                })
            }else{
                this.props.alert("warning", "¡No se ha asociado un usuario!");      
            }    
        }else if(this.props.option === 2){
            if(this.props.personaInterno.userId !== ''){
                this.props.LoadIdUsersNoMasterFunction(this.props.personaInterno.userId);
                this.setState({
                    modal:true,
                    option: 5,
                    modalHeader:'Ver Usuario',
                    modalFooter:'Guardar',
                    disabled: true,
                    disabledEmail: true,
                    showHide: 'hide',
                })
            }
        }else if(this.props.option === 3){
            if(this.props.personaInterno.userId !== ''){
                this.props.LoadIdUsersNoMasterFunction(this.props.userId?this.props.userId:this.props.personaInterno.userId);
                this.setState({
                    modal:true,
                    option: 6,
                    modalHeader:'Editar Usuario',
                    modalFooter:'Editar',
                    disabled: true,
                    disabledEmail: true,
                    showHide: 'show',
                })
            }
        }        
    }

    handleChangeSwitch = name => event => {this.setState({ [name]: event.target.checked });};
	render() {   
        return (
            <span>
        		<Modal isOpen={this.props.modal} className="ModalPersonal">
                    {
                        this.state.loading === "hide" ?
                            <div className={this.state.divContainer}>
                            {   (this.state.option === 4 || this.state.option === 5 || this.state.option === 6) && 
                                <ModalUser 
                                  option = {this.state.option}
                                  modal = {this.state.modal}
                                  modalHeader = {this.state.modalHeader}
                                  modalFooter = {this.state.modalFooter}
                                  disabled = {this.state.disabled}
                                  disabledEmail = {this.state.disabledEmail}
                                  showHide = {this.state.showHide}
                                  modules = {this.props.modules}         
                                  permits = {this.props.permits}  
                                  totalBranchOffices = {this.props.totalBranchOffices}
                                  arrayBranchOffices = {this.props.arrayBranchOffices}
                                  roles = {this.props.roles}     
                                  valorCloseModalRoles={this.valorCloseModalRoles}     
                                  saveRolAction = {this.props.saveRolAction}  
                                  LoadRolIdFunction = {this.props.LoadRolIdFunction}
                                  saveUserNoMasterAction = {this.props.saveUserNoMasterAction}          
                                  editUserNoMasterAction = {this.props.editUserNoMasterAction}          
                                  addSucursalFunction = {this.props.addSucursalFunction}          
                                  deleteSucursalFunction = {this.props.deleteSucursalFunction}          
                                  userIdEdit = {this.state.userIdEdit}               
                                  emailUserSelect = {this.state.emailUserSelect}                                                              
                                />
                            }                            
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
                                            <Input disabled={this.props.disabled} invalid={this.state.dniInvalid} name="dni" id="dni" onKeyUp={this.handlekeyDni} onChange={this.handleChange} value={this.state.dni?this.state.dni:''} type="text" placeholder="DNI" />                                                    
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
                                            <Input disabled={this.props.disabled} invalid={this.state.namesInvalid} name="names" id="names" onKeyUp={this.handlekeyNames} onChange={this.handleChange} value={this.state.names?this.state.names:''} type="text" placeholder="Nombres" />
                                            <FormFeedback tooltip>{this.state.namesError}</FormFeedback>                                                                                                                                                            
                                        </FormGroup>
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="surnames">Apellidos:</Label>
                                            <Input disabled={this.props.disabled} invalid={this.state.surnamesInvalid} onKeyUp={this.handlekeySurnames} onChange={this.handleChange} value={this.state.surnames?this.state.surnames:''} name="surnames" id="surnames" type="text" placeholder="Apellidos" />
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
                                            <Label for="especialization">Sucursales</Label>
                                            <div className={this.state.divSucursalesSelect}>
                                                <Select isMulti={true} isSearchable="true" isDisabled={this.props.disabled} name="sucursales" value={this.state.arraySucursalesSelect} onChange={this.handleChangeSucursalesSelect} options={this.props.arrayBranchOffices} />
                                            </div>
                                            <div className="errorSelect">{this.state.divSucursalesSelectError}</div>                                                                
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
                                                    this.state.foto != null && <img alt="foto" style={{width: 100, height: 100}}  className="image"  src={"data:image/jpeg;" + this.state.foto} />
                                                    }
                                                </div>
                                            </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>                                         
                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                            <Label for="registerUser">¿Registrar como Usuario?</Label>
                                            <div className={this.state.divRegisterUserSelect}>
                                                <Select isSearchable="true" isDisabled={this.state.disabledSelectUser} name="registerUser" value={this.state.arrayRegisterUserSelect} onChange={this.handleChangeSelectRegisterUser} options={this.state.arrayRegisterUser} />                                    
                                            </div>
                                            <div className="errorSelect">{this.state.registerUserSelectError}</div>
                                        </FormGroup>   
                                        <FormGroup className={"top form-group col-sm-6 "+this.state.hideFormGroup}>                                                                 
                                            <Label for="usersSelect">Usuario:</Label>
                                            <div className={this.state.divUsersSelect}>
                                                <InputGroup>
                                                    <Select style={{display:'flex'}} className="selectUsers" isSearchable="true" isDisabled={this.state.disabledSelectUser} name="usersSelect" value={this.state.arrayUsersSelect} onChange={this.handleChangeUsersSelect} options={this.props.personaInterno.emailUsers} />
                                                    <InputGroupAddon addonType="prepend">
                                                        <Button className={this.state.buttonView} title="Usuario" onClick={() => this.viewUserId()}><FaUserCircle size="1em"/></Button>
                                                    </InputGroupAddon>
                                                </InputGroup> 
                                            </div>
                                            <div className="errorSelect">{this.state.divUsersSelectError}</div>
                                        </FormGroup> 
                                        <FormGroup check className="top form-group col-sm-6">                                            
                                            <Label for="nombres">Visitador</Label>       
                                            <br />                                                                                 
                                            <Switch
                                              checked={this.state.checkedA?this.state.checkedA:false}
                                              onChange={this.handleChangeSwitch("checkedA")}
                                              value={this.state.checkedA}
                                              color="primary"
                                            />
                                        </FormGroup>
                                    </div>  
                                </form>                                                                
                            </ModalBody>
                            <ModalFooter>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSavePersonal}>{this.props.modalFooter}</Button>
                                <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>                                
                            </ModalFooter>
                            </div>
                        :
                            <div align="center" className={this.state.divLoading} style={{padding:"1%"}}><img alt="loading" src="assets/loader.gif" width="30%" /></div>
                    }
                </Modal>                
            </span> 
		);
	}
  }
const mapStateToProps = state => ({
  personaInterno: state.personaInterno.toJS(),
  authData: state.auth,
  aplication: state.global,
  usersRoles: state.usersRoles,
});
const mapDispatchToProps = dispatch => ({  
    savePersonalInternoAction: (data, callback) => dispatch(savePersonalInternoAction(data, callback)),  
    editPersonalAction: (data, callback) => dispatch(editPersonalAction(data, callback)),  
    alert: (type, message) => dispatch(openSnackbars(type, message)), 
    ValidateEmailUsersFunction: (arrayEmails, callback) => dispatch(ValidateEmailUsersFunction(arrayEmails, callback)), 
    //loadUsersRoles: () => dispatch(LoadAllUsersNoMasterFunction()),
    saveRolAction: (data, callback) => dispatch(saveRolAction(data, callback)),
    LoadRolIdFunction: pos => dispatch(LoadRolIdFunction(pos)),
    saveUserNoMasterAction: (data, callback) => dispatch(saveUserNoMasterAction(data, callback)),  
    editUserNoMasterAction: (data, callback) => dispatch(editUserNoMasterAction(data, callback)),  
    addSucursalFunction: (email, arraySucursal) => dispatch(addSucursalFunction(email, arraySucursal)),  
    deleteSucursalFunction: (key, callback) => dispatch(deleteSucursalFunction(key, callback)),  
    LoadIdUsersNoMasterFunction: id => dispatch(LoadIdUsersNoMasterFunction(id)),
    deleteInfoUserId: () => dispatch(deleteInfoUserId()),    
    deleteInfoAction: () => dispatch(deleteInfoAction()),    
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCargos);