import React from 'react';
import { 
	Nav,
    NavItem, 
    NavLink, 
    Badge, 
    Button, 
    ButtonDropdown, 
    ButtonGroup, 
    ButtonToolbar, 
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    CardTitle,
    CardText, 
    Col, 
    Dropdown, 
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table, 
    Input, 
    InputGroup, 
    InputGroupAddon, 
    InputGroupText, 
    TabContent, 
    TabPane, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Form, 
    FormGroup, 
    Label, 
    FormText,
    FormFeedback,
    Collapse,
    Alert,
    Tooltip,
    Popover, 
    PopoverHeader, 
    PopoverBody,
} from 'reactstrap';
import classnames from 'classnames';
import Select from 'react-select';
import '../../components/style.css';
import './Personal.css';
import { datosConexion } from '../../components/Conexion.js';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import axios from 'axios';
import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar} from 'react-icons/fa';
import jstz from 'jstz';
import jwt_decode from 'jwt-decode';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import ModalUser from './ModalUser.js';
import store from '../../store';
import { openModalUser } from '../../actionCreators';
import { openModalUserView } from '../../actionCreators';
import { openModalUserEdit } from '../../actionCreators';

class ModalPersonal extends React.Component {
	constructor(props) {
		super(props);		

		let valueConexion = "";
		let arrayConexion = Object.values(datosConexion);
		arrayConexion.forEach(function (elemento, indice, array) {
			if(indice === 0){
				valueConexion = elemento;
			}            
		});   

        const timezone = jstz.determine();   

        const selectRegisterUser = 
        [
          { value: 'SI', label: 'SI' },
          { value: 'NO', label: 'NO' },
  
        ];  
        
        this.handleSavePersonal = this.handleSavePersonal.bind(this);                 
        this.openModalUser = this.openModalUser.bind(this);
        this.openModalUserView = this.openModalUserView.bind(this);
        this.openModalUserEdit = this.openModalUserEdit.bind(this);

		this.state = {
            opcionForm: 0,
			modalPersonal: false,
            modalHeaderPersonal: '', 
            modalFooterButton: '',             
            buttonSave: 'hide', 
            buttonCancel: 'hide',

            modalAlert: false,
            bodyAlert: '',
            buttonAceptarAlert: 'hide',             
            buttonCancelAlert: 'hide',
            alertCheck: 'hide check',
            alertExc: 'hide warning',

            divLoading:'sizeDiv show',
            divContainer:'hide',            
            varDisabled: '', 
            varDisabledDatePicker: false, 
            isClearable: false,

            /*SELECTS*/       
            arrayTypeIdentity: [],
            arrayTypeIdentitySelect: [],
            selectedTypeIdentity: 0,

            arraySex:[],
            arraySexSelect: null,
            divSexSelect: '',
            sexSelectError: '',

            arrayCharges:[],
            arrayChargesSelect: null,
            divChargesSelect: '',
            chargesSelectError: '',

            arrayProvince:[],
            arrayProvinceSelect: null,
            divProvinceSelect: '',
            provinceSelectError: '',

            arrayDistrict:[],
            arrayDistrictSelect: null,
            divDistrictSelect: '',
            DistrictSelectError: '',

            arrayEstateCivil:[],
            arrayEstatetCivilSelect: null,
            divEstateCivilSelect: '',
            estateCivilSelectError: '',

            arrayEspecialization:[],
            arrayEspecializationSelect: null,
            divEspecializationSelect: '',
            especializationSelectError: '',

            arrayProfession:[],
            arrayProfessionSelect: null,
            divProfessionSelect: '',
            professionSelectError: '',

            arrayRegisterUser: selectRegisterUser,
            arrayRegisterUserSelect: null,
            divRegisterUserSelect: '',
            registerUserSelectError: '',

            /*SELECTS*/   

             /*INPUTS*/    
            dni: '',
            dniInvalid: false,
            dniError: '', 

            names: '',
            namesError: '',
            namesInvalid: false,

            surnames: '',
            surnamesError: '',
            surnamesInvalid: false,

            direccion: '',
            direccionError: '',
            direccionInvalid: false,

            tagsTelefonos: [],  
            divTagsTelefonos: '',
            tagsTelefonosError: '',

            tagsEmails: [],  
            divTagsEmails: '',
            tagsEmailsError: '',

            birthDate: new Date(),
            divBirthDate:'',
            birthDateError:'',

            entryDate: new Date(),
            divEntryDate:'',
            entryDateError:'',

            fotoInvalid: false,
            fotoError: '',            
            foto: null,

            /*INPUTS*/                        
			conexion: valueConexion,
            timeZ: timezone.name(),
            open: { valor: 1 },
            arrayEmails: [],
            posDeletePersonal: '',
            emailRegister:'',
            userIdRegister:'',
            varDisabledRegisterUser: '',
            varDisabledEmailRegister: '',
            hideFormGroup: 'hide',
            buttonEdit: 'hide',
            buttonView: 'hide',
		};
        
	}

	componentDidMount(){

       
    }

    cleanState = () =>{
        this.setState({
            names: '',
            namesInvalid: false,
            namesError: '',

            surnames: '',
            surnamesInvalid:false,
            surnamesError:'',

            dni:'',
            dniInvalid:false,
            dniError:'',

            direccion:'',
            direccionInvalid:false,
            direccionError:'',

            foto: null,
            fotoError:'',
            fotoInvalid: false,

            birthDate: new Date(),
            divBirthDate: '',
            birthDateError: '',

            tagsTelefonos: [],
            tagsTelefonosError: '',
            divTagsTelefonos: '',

            tagsEmails: [],
            tagsEmailsError: '',
            divTagsTelefonos: '',

            arrayTypeIdentity: [],
            arrayTypeIdentitySelect: [],
            selectedTypeIdentity: 0,

            arraySex:[],
            arraySexSelect: null,
            divSexSelect: '',
            sexSelectError: '',

            arrayCharges:[],
            arrayChargesSelect: null,
            divChargesSelect: '',
            chargesSelectError: '',

            arrayProvince:[],
            arrayProvinceSelect: null,
            divProvinceSelect: '',
            provinceSelectError: '',

            arrayDistrict:[],
            arrayDistrictSelect: null,
            divDistrictSelect: '',
            DistrictSelectError: '',

            arrayEstateCivil:[],
            arrayEstatetCivilSelect: null,
            divEstateCivilSelect: '',
            estateCivilSelectError: '',

            arrayEspecialization:[],
            arrayEspecializationSelect: null,
            divEspecializationSelect: '',
            especializationSelectError: '',

            arrayProfession:[],
            arrayProfessionSelect: null,
            divProfessionSelect: '',
            professionSelectError: '',

            arrayRegisterUserSelect: null,
            divRegisterUserSelect: '',
            registerUserSelectError: '',
        });

    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }   

	openPersonal = (option) => {	

        this.setState({
            arraySex: this.props.sex,
            arrayCharges: this.props.charges,
            arrayEstateCivil: this.props.civilState,
            arrayProfession: this.props.profession,
            arrayEspecialization: this.props.especialization,
            arrayProvince: this.props.province,
            arrayTypeIdentity: this.props.typeIdentity,
        })

        if(option === "1")
        {             
            
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
                isClearable: true,
                varDisabledDatePicker: true,
                modalPersonal: !this.state.modalPersonal,     
                buttonSave: 'show',
                buttonCancel: 'show',
                varDisabled: '',
                modalHeaderPersonal: 'Registrar Personal',                 
                modalFooterButton: 'Guardar',
                opcionForm: 1,              
            });   

    		setTimeout(() => {
                this.setState({
                    divLoading: 'sizeDiv hide',
                    divContainer: 'container show',
                });                          
            }, 1000);      
        }
        else if (option === "2"){
            
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
                isClearable: false,
                varDisabledDatePicker: false,
            }); 

            const apiQueryOneInternalStaff = this.state.conexion+"queryOneInternalStaff";          
            const token = window.localStorage.getItem('id_token');

            axios({
                method: 'post',
                url: apiQueryOneInternalStaff,
                data: {
                    _id: this.props.idPersonal,                    
                },
                headers:
                {'access-token' : token}
            })
            .then((res)=>{
                let registerUser = '';
                if(res.data.user_id !== ''){
                    registerUser = [{ value: 'SI', label: 'SI' }];
                }

                let varArrayEmails = [{ value: res.data.email_user, label: res.data.email_user }];
                
                this.setState({
                    arrayTypeIdentitySelect: res.data.type_identity,
                    dni: res.data.dni,                    
                    arrayChargesSelect: res.data.array_positions,
                    names: res.data.names,
                    surnames: res.data.surnames,
                    arraySexSelect: res.data.array_sex,
                    birthDate: res.data.birth_date,
                    arrayEstatetCivilSelect: res.data.array_civil_state,
                    arrayProfessionSelect: res.data.array_profession,
                    arrayEspecializationSelect: res.data.array_specialization,
                    tagsTelefonos: res.data.phone,
                    tagsEmails: res.data.email,
                    arrayProvinceSelect: res.data.array_province,
                    arrayDistrictSelect: res.data.array_district,
                    direccion: res.data.address,
                    foto: res.data.photo,
                    entryDate: res.data.entry_date,
                    arrayRegisterUserSelect: registerUser,
                    emailRegister: res.data.email_user,
                    userIdRegister: res.data.user_id,
                    arrayEmails: varArrayEmails,
                    buttonSave: 'hide',
                    buttonCancel: 'show',
                    varDisabled: 'true',
                    varDisabledEmailRegister: true,
                    varDisabledRegisterUser:true,
                    hideFormGroup: 'show',
                    modalHeaderPersonal: 'Ver Personal', 
                    modalPersonal: !this.state.modalPersonal,
                    modalFooterButton: 'Ver',
                    opcionForm: 2,   
                    buttonView: 'show',
                    buttonEdit: 'hide',
                });                    
            })

            .catch((res)=>{
                console.log("Problemas al consultar los datos de la plantilla ");
            });

            setTimeout(() => {

                this.setState({
                    divLoading: 'sizeDiv hide',
                    divContainer: 'container show',
                });  
                        
            }, 1000);  

           
        }else if(option === "3"){
            
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
                isClearable: true,
                varDisabledDatePicker: true,
            }); 

            const apiQueryOneInternalStaff = this.state.conexion+"queryOneInternalStaff";          
            const token = window.localStorage.getItem('id_token');

            axios({
                method: 'post',
                url: apiQueryOneInternalStaff,
                data: {
                    _id: this.props.idPersonal,                    
                },
                headers:
                {'access-token' : token}
            })
            .then((res)=>{

                let registerUser = '';
                if(res.data.user_id !== ''){
                    registerUser = [{ value: 'SI', label: 'SI' }];
                }

                let varArrayEmails = [{ value: res.data.email_user, label: res.data.email_user }];
                
                this.setState({
                    arrayTypeIdentitySelect: res.data.type_identity,
                    dni: res.data.dni,                    
                    arrayChargesSelect: res.data.array_positions,
                    names: res.data.names,
                    surnames: res.data.surnames,
                    arraySexSelect: res.data.array_sex,
                    birthDate: res.data.birth_date,
                    arrayEstatetCivilSelect: res.data.array_civil_state,
                    arrayProfessionSelect: res.data.array_profession,
                    arrayEspecializationSelect: res.data.array_specialization,
                    tagsTelefonos: res.data.phone,
                    tagsEmails: res.data.email,
                    arrayProvinceSelect: res.data.array_province,
                    arrayDistrictSelect: res.data.array_district,
                    direccion: res.data.address,
                    foto: res.data.photo,
                    entryDate: res.data.entry_date,
                    arrayRegisterUserSelect: registerUser,
                    emailRegister: res.data.email_user,
                    userIdRegister: res.data.user_id,
                    arrayEmails: varArrayEmails,
                    varDisabledEmailRegister: true,
                    varDisabledRegisterUser: true,
                    buttonSave: 'show',
                    buttonCancel: 'show',
                    varDisabled: '',
                    modalHeaderPersonal: 'Editar Personal', 
                    modalPersonal: !this.state.modalPersonal,
                    modalFooterButton: 'Editar',
                    opcionForm: 3,    
                    hideFormGroup: 'show',
                    buttonView: 'hide',
                    buttonEdit: 'show',
                });    
            })

            .catch((res)=>{
                console.log("Problemas al consultar los datos de la plantilla ");
            });

            setTimeout(() => {

                this.setState({
                    divLoading: 'sizeDiv hide',
                    divContainer: 'container show',
                });  
                        
            }, 1000);  
        }
    }

    closePersonal = () => {
    	this.setState({
            modalPersonal: false,
        });
        this.cleanState();
    }   

    validateSavePersonal = () => {

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

        let divTagsTelefonos = "";
        let tagsTelefonosError = "";

        let divTagsEmails = "";
        let tagsEmailsError = "";

        let divProvinceSelect = "";
        let provinceSelectError = "";

        let divDistrictSelect = "";
        let DistrictSelectError = "";       

        let direccionInvalid = false;
        let direccionError = ""; 

        let acumEmail = 0;

        this.state.tagsEmails != null && 
        this.state.tagsEmails.map((email, i) => {          
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                acumEmail++;
            }
        })
        
        if (this.state.dni === ""){
            
            dniInvalid = true;
            dniError = "¡Ingrese el Dni!";            
            
        }       

        if ((this.state.arrayChargesSelect === null) || (this.state.arrayChargesSelect.length === 0)){
            
            divChargesSelect = "borderColor";
            chargesSelectError = "¡Seleccione el cargo!";            
            
        }       

        if (this.state.names === ""){
            
            namesInvalid = true;
            namesError = "¡Ingrese los nombres!";            
            
        }       

        if (this.state.surnames === ""){
            
            surnamesInvalid = true;
            surnamesError = "¡Ingrese los nombres!";            
            
        }

        if ((this.state.arraySexSelect === null) || (this.state.arraySexSelect.length === 0)){
            
            divSexSelect = "borderColor";
            sexSelectError = "¡Seleccione el sexo!";            
            
        }       

        if (this.state.birthDate === null){
            
            divBirthDate = "borderColorFecha";
            birthDateError = "¡Ingrese la fecha de nacimiento!";            
            
        }

         if ((this.state.arrayEstatetCivilSelect === null) || (this.state.arrayEstatetCivilSelect.length === 0)){
            
            divEstateCivilSelect = "borderColor";
            estateCivilSelectError = "¡Seleccione el estado civil!";            
            
        }      

        if ((this.state.arrayProfessionSelect === null) || (this.state.arrayProfessionSelect.length === 0)){
            
            divProfessionSelect = "borderColor";
            professionSelectError = "¡Seleccione la profesion!";            
            
        }     

        if ((this.state.arrayEspecializationSelect === null) || (this.state.arrayEspecializationSelect.length === 0)){
            
            divEspecializationSelect = "borderColor";
            especializationSelectError = "¡Seleccione la especializacion!";            
            
        }     

        if ((this.state.tagsTelefonos === null) || (this.state.tagsTelefonos.length === 0)){
            
            divTagsTelefonos = "borderColor";
            tagsTelefonosError = "¡Ingrese al menos un telefono!";            
            
        }       

        if ((this.state.tagsEmails === null) || (this.state.tagsEmails.length === 0)){
            
            divTagsEmails = "borderColor";
            tagsEmailsError = "¡Ingrese al menos un correo!";            
            
        }

        if(acumEmail > 0){ 
            divTagsEmails = "borderColor";
            tagsEmailsError = "¡Formato de email invalido!";     
        }

        if ((this.state.arrayProvinceSelect === null) || (this.state.arrayProvinceSelect.length === 0)){
            
            divProvinceSelect = "borderColor";
            provinceSelectError = "¡Seleccione la provincia!";            
            
        }

        if ((this.state.arrayDistrictSelect === null) || (this.state.arrayDistrictSelect.length === 0)){
            
            divDistrictSelect = "borderColor";
            DistrictSelectError = "¡Seleccione el distrito!";            
            
        }

        if (this.state.direccion === ""){

            direccionInvalid = true;
            direccionError = "¡Ingrese la direccion!";            
            
        }        

        if (dniError || chargesSelectError || namesError || surnamesError || sexSelectError || birthDateError || estateCivilSelectError || professionSelectError || 
            especializationSelectError || tagsTelefonosError || tagsEmailsError || provinceSelectError || DistrictSelectError || 
            direccionError) {
            
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
            });                
           
            return false;

        }

        return true;
    } 

    handleSavePersonal = event => {

        event.preventDefault();
        const isValid = this.validateSavePersonal();        
        if (isValid) {  
            if(this.state.opcionForm === 1){
                
                let birthDate = new Date(this.state.birthDate).toISOString().slice(0,10);
                let entryDate = new Date(this.state.entryDate).toISOString().slice(0,10);

                let typeIdentity = "";

                if(this.state.selectedTypeIdentity === 0){

                    typeIdentity = this.state.arrayTypeIdentity[0]["value"];

                }else{

                    typeIdentity = this.state.arrayTypeIdentitySelect;

                }

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
                    if(indice === 2){
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

                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })

                const apiCreateInternalStaff = (this.state.conexion+"createInternalStaff");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apiCreateInternalStaff,
                    data: {
                        user_id: this.state.userIdRegister,
                        type_identity:typeIdentity,
                        dni:this.state.dni,
                        names:this.state.names,
                        surnames: this.state.surnames,   
                        province_id: valueProvince,   
                        district_id: valueDistrito,   
                        profession_id: valueProfesion,   
                        specialization_id: valueEspecializacion,   
                        address: this.state.direccion,   
                        phone: this.state.tagsTelefonos,   
                        email: this.state.tagsEmails,   
                        sex_id: valueSex,   
                        civil_state_id: valueCivilState,   
                        photo: this.state.foto,   
                        birth_date: birthDate,        
                        birth_date: birthDate,        
                        entry_date: entryDate,        
                        position_id: valueCargo,                   
                        timeZ:this.state.timeZ,                     
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    if(res.data === 1){
                        console.log("Operacion exitosa");                    
                        this.setState({ 
                            alertCheck: 'show check',
                            alertExc: 'hide warning',
                            bodyAlert: '¡Operacion Exitosa!',
                            buttonAceptarAlert: 'hide',                        
                            buttonCancelAlert: 'hide',
                        });   
                        this.props.LoadPersonal(true);
                        this.toggleAlert();
                        this.closePersonal();                               
                        setTimeout(() => {
                            this.cerrarModalAlert();
                        }, 1000);

                        this.setState({ 
                            divContainer: 'hide',
                            divLoading: 'sizeDiv hide',
                        })
                    } 
                    else if(res.data === 2)
                    {

                        this.setState({ 
                            alertCheck: 'hide check',
                            alertExc: 'show warning',
                            bodyAlert: '¡Este personal ya se encuentra registrado(a)!',
                            buttonAceptarAlert: 'hide',                        
                            buttonCancelAlert: 'hide',
                            selectedTypeIdentity: 0,
                        });
                        this.toggleAlert();                    
                        setTimeout(() => {
                            this.cerrarModalAlert();
                            this.setState({ 
                                divContainerModal: 'show',
                                divLoadingModal: 'sizeDiv hide',
                            })
                        }, 2000);  
                    }        
                    else{
                        console.log(res.data)
                    }
                })                    

                .catch((res)=>{
                    console.log("Error en la operacion");
                });
            }
            else if(this.state.opcionForm === 3){
                
                let birthDate = new Date(this.state.birthDate).toISOString().slice(0,10);
                let entryDate = new Date(this.state.entryDate).toISOString().slice(0,10);

                let typeIdentity = "";

                if(this.state.selectedTypeIdentity === 0){

                    typeIdentity = this.state.arrayTypeIdentity[0]["value"];

                }else{

                    typeIdentity = this.state.arrayTypeIdentitySelect;

                }

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
                
                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })

                const apiEditInternalStaff = (this.state.conexion+"editInternalStaff");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apiEditInternalStaff,
                    data: {
                        _id:this.props.idPersonal,
                        type_identity:typeIdentity,
                        dni:this.state.dni,
                        names:this.state.names,
                        surnames: this.state.surnames,   
                        province_id: valueProvince,   
                        district_id: valueDistrito,   
                        profession_id: valueProfesion,   
                        specialization_id: valueEspecializacion,   
                        address: this.state.direccion,   
                        phone: this.state.tagsTelefonos,   
                        email: this.state.tagsEmails,   
                        sex_id: valueSex,   
                        civil_state_id: valueCivilState,   
                        photo: this.state.foto,   
                        birth_date: birthDate,        
                        entry_date: entryDate,                                      
                        position_id: valueCargo,                   
                        timeZ:this.state.timeZ,                     
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    if(res.data === 1){
                        console.log("Operacion exitosa");                    
                        this.setState({ 
                            alertCheck: 'show check',
                            alertExc: 'hide warning',
                            bodyAlert: '¡Operacion Exitosa!',
                            buttonAceptarAlert: 'hide',                        
                            buttonCancelAlert: 'hide',
                        });   
                        this.props.LoadPersonal(true);
                        this.toggleAlert();
                        this.closePersonal();                               
                        setTimeout(() => {
                            this.cerrarModalAlert();
                        }, 1000);

                        this.setState({ 
                            divContainer: 'hide',
                            divLoading: 'sizeDiv hide',
                        })
                    } 
                    else{
                        console.log(res.data)
                    }
                })                    

                .catch((res)=>{
                    console.log("Error en la operacion");
                });

            }
        }     

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

    toggleAlert = () => {
        this.setState({
            modalAlert: !this.state.modalAlert           
        });    
    }

    cerrarModalAlert = () => {
        this.setState({
          modalAlert: false          
        });
    }  

    handleChangeSelectSex = (arraySexSelect) => {
        this.setState({ 
            arraySexSelect,
            divSelectSexo: '',
            sexSelectError: ''                                
        });                
    }  

    handleChangeSelectProvincia = (arrayProvinceSelect) => {

        let valueProvincia = "";
        let arrayProvincia = Object.values(arrayProvinceSelect);
        arrayProvincia.forEach(function (elemento, indice, array) {

            if(indice === 1){
                valueProvincia = elemento;
            }            
        });      
        
        this.setState({ 
            arrayProvinceSelect,
            divProvinceSelect: '',
            provinceSelectError: '',
            arrayDistrictSelect: []                                
        });  

        /////////////////////////////////////////////////////////////
        const apiqueryDistricts = this.state.conexion+"queryDistricts";  
        const token = window.localStorage.getItem('id_token');

        const datos={
            headers:
            {'access-token' : token }
        }

        /////////////////////////////////////////////////////////////
        axios({
            method: 'post',
            url: apiqueryDistricts,
            data: {
                _id: valueProvincia                
            },
            headers:
            {'access-token' : token}
        })
        .then((res)=>{
             if(res.data.length > 0){

                this.setState({
                    arrayDistrict: res.data                
                })                

            }else{

                this.setState({
                    arrayDistrict: []                
                })                 
            }
                                          
        })

        .catch((res)=>{
            console.log("Problemas al consultar los distritos");
        });        
    } 

    handleChangeSelectDistrito = (arrayDistrictSelect) => {
        this.setState({ 
            arrayDistrictSelect,
            divDistrictSelect: '',
            DistrictSelectError: ''                                
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

    handleChangeSelectRegisterUser = (arrayRegisterUserSelect) => {

        if ((this.state.tagsEmails === null) || (this.state.tagsEmails.length === 0)){

            this.setState({ 
                alertCheck: 'hide check',
                alertExc: 'show warning',
                bodyAlert: '¡Debe ingresar al menos un email!',
                buttonAceptarAlert: 'hide',                        
                buttonCancelAlert: 'hide',
            });   
            this.toggleAlert();
            
            setTimeout(() => {
                this.cerrarModalAlert();
            }, 2000);


        }else{

            let acumEmail = 0;

            this.state.tagsEmails != null && 
            this.state.tagsEmails.map((email, i) => {          
                let lastAtPos = email.lastIndexOf('@');
                let lastDotPos = email.lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                    acumEmail++;
                }
            })

            if(acumEmail > 0){
                this.setState({ 
                    alertCheck: 'hide check',
                    alertExc: 'show warning',
                    bodyAlert: '¡Formato de email invalido!',
                    buttonAceptarAlert: 'hide',                        
                    buttonCancelAlert: 'hide',
                });   
                this.toggleAlert();
                
                setTimeout(() => {
                    this.cerrarModalAlert();
                }, 2000);
            }
            else{

                let valueRegisterUser = "";
                let arrayUserRegister = Object.values(arrayRegisterUserSelect);
                arrayUserRegister.forEach(function (elemento, indice, array) {

                    if(indice === 1){
                        valueRegisterUser = elemento;
                    }            
                });      

                this.setState({ 
                    arrayRegisterUserSelect,
                    divRegisterUserSelect: '',
                    registerUserSelectError: ''                                
                });  


                const apiQueryEmailInternalStaff = this.state.conexion+"queryEmailInternalStaff";          
                const token = window.localStorage.getItem('id_token');
                let a =[];
                axios({
                    method: 'post',
                    url: apiQueryEmailInternalStaff,
                    data: {
                        array_email: this.state.tagsEmails,                    
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    
                    if(res.data === 0){

                        this.setState({ 
                            alertCheck: 'hide check',
                            alertExc: 'show warning',
                            bodyAlert: '¡Los correos ingresados ya se encuentran asignados!',
                            buttonAceptarAlert: 'hide',                        
                            buttonCancelAlert: 'hide',
                            arrayRegisterUserSelect: null,
                            divRegisterUserSelect: '',
                            registerUserSelectError: '',

                        });   
                        this.toggleAlert();
                        
                        setTimeout(() => {
                            this.cerrarModalAlert();
                        }, 2000);

                    }else{
                        
                        this.setState({
                            arrayEmails: res.data,                   
                        });    

                        if(valueRegisterUser === "SI"){

                            this.openModalUser(this.state.arrayEmails, 1)

                        }
                    }                
                    
                })

                .catch((res)=>{
                    console.log("Problemas al consultar los datos de la plantilla ");
                });
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
    
        this.setState({
            tagsEmails,
            divTagsEmails: "",
            tagsEmailsError: "",
        })
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

    typeIdentity = event =>{                    
        this.setState({
            arrayTypeIdentitySelect:event.target.value,    
            selectedTypeIdentity: 1,        
        })
    } 

    openModalUser(valor, opcion) {
        store.dispatch(openModalUser(valor, opcion))
    }

    openModalUserView(valor, opcion, userId) {
        store.dispatch(openModalUserView(valor, opcion, userId))
    }  

    openModalUserEdit(valor, opcion, userId) {
        store.dispatch(openModalUserEdit(valor, opcion, userId))
    }  

    deletePersonal = (pos) => {
        console.log(pos);
        this.setState({
            posDeletePersonal: pos,
            alertCheck: 'hide check',
            alertExc: 'show warning',
            bodyAlert: '¿Desea eliminar este personal?',
            buttonAceptarAlert: 'show',                      
            buttonCancelAlert: 'show',                      
        });

        this.toggleAlert();
        
    } 

    aceptarDeletePersonal = () => {

        const apiDeleteInternalStaff = (this.state.conexion+"deleteInternalStaff");
        const token = window.localStorage.getItem('id_token');
        axios({
            method: 'post',
            url: apiDeleteInternalStaff,
            data: {
                posicion:this.state.posDeletePersonal,
                timeZ:this.state.timeZ,                
            },
            headers:
            {'access-token' : token}
        })
        .then((res)=>{
            console.log("Operacion exitosa");   
            this.setState({ 
                posDeletePersonal: '',
                buttonAceptarAlert: 'hide',                      
                buttonCancelAlert: 'hide',                                    
                alertCheck: 'show check',
                alertExc: 'hide warning',
                bodyAlert: 'Personal eliminado con exito!',
            });   
            this.props.LoadPersonal(true);
                                        
            setTimeout(() => {
                this.cerrarModalAlert();
            }, 2000);                                    

        })

        .catch((res)=>{
            console.log("Error al eliminar la plantilla");
        });

    }

    getData = (email,userId) => {
    // do not forget to bind getData in constructor
        alert(email);        
        alert(userId);        
        this.setState({
            emailRegister: email, 
            userIdRegister: userId, 
            varDisabledEmailRegister: true,
            varDisabledRegisterUser: true,
            hideFormGroup: 'show',
        });            
    }

    render() {         

    	return (
            <span>                            
        		{
                    this.props.opcion === 1 && <Button color="success" onClick={() => { this.openPersonal('1'); }}>Agregar</Button>                                                                                                                                  
                }
                {   
                    this.props.opcion === 2 && <a title="Ver Personal" className=""  onClick={() => { this.openPersonal('2'); }}><FaSearch /> </a>
                }
                {   
                    this.props.opcion === 3 && <a title="Editar Personal" className=""  onClick={() => { this.openPersonal('3'); }}><FaUserEdit /> </a>
                }                                              
                {   
                    this.props.opcion === 4 && <a title="Eliminar Personal" className="text-danger"  onClick={() => { this.deletePersonal(this.props.position); }}><FaMinusCircle /> </a>
                }                                              
                <Modal isOpen={this.state.modalPersonal} toggle={this.openPersonal} className="Modal">
                    <div  className={this.state.divLoading} style={{padding:"1%"}}><img src="assets/loader.gif" width="30%" /></div>
                    <div className={this.state.divContainer}>
                    <ModalHeader toggle={this.closePersonal}>{this.state.modalHeaderPersonal}</ModalHeader>
                    <ModalBody className="Scroll">      
                    <form className="formCodeConfirm" onSubmit={this.handleSavePersonal.bind(this)}> 
                        <div className="row"> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="dni">DNI</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <Input disabled={this.state.varDisabled} type="select" name="typeIdentity" id="typeIdentity" onChange={event =>this.typeIdentity(event)} >                                                            
                                        {
                                            this.state.arrayTypeIdentity != null && 
                                            this.state.arrayTypeIdentity.map((typeIdentity, i) => {       
                                                if(typeIdentity.label === this.state.arrayTypeIdentitySelect){
                                                    return(
                                                        <option value={typeIdentity.label} selected>{typeIdentity.label}</option>
                                                    )
                                                }else{
                                                    return(
                                                        <option value={typeIdentity.label} >{typeIdentity.label}</option>
                                                    )
                                                }                                                                                                
                                            })
                                        } 
                                        </Input>
                                    </InputGroupAddon>&nbsp;&nbsp;
                                    <Input disabled={this.state.varDisabled} invalid={this.state.dniInvalid} name="dni" id="dni" onKeyUp={this.handlekeyDni} onChange={this.handleChange} value={this.state.dni} type="text" placeholder="DNI" />                                                    
                                    <FormFeedback tooltip>{this.state.dniError}</FormFeedback>                                                                                                                                                                     
                                </InputGroup> 
                            </FormGroup>  
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="cargo">Cargo</Label>
                                <div className={this.state.divChargesSelect}>
                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="cargo" value={this.state.arrayChargesSelect} onChange={this.handleChangeSelectCharges} options={this.state.arrayCharges} />
                                </div>
                                <div className="errorSelect">{this.state.chargesSelectError}</div>                                                                
                            </FormGroup>  
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="nombres">Nombres:</Label>
                                <Input disabled={this.state.varDisabled} invalid={this.state.namesInvalid} name="names" id="names" onKeyUp={this.handlekeyNames} onChange={this.handleChange} value={this.state.names} type="text" placeholder="Nombres" />
                                <FormFeedback tooltip>{this.state.namesError}</FormFeedback>                                                                                                                                                            
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="surnames">Apellidos:</Label>
                                <Input disabled={this.state.varDisabled} invalid={this.state.surnamesInvalid} name="surnames" id="surnames" onKeyUp={this.handlekeySurnames} onChange={this.handleChange} value={this.state.surnames} type="text" placeholder="Apellidos" />
                                <FormFeedback tooltip>{this.state.surnamesError}</FormFeedback>                                                                                                                                                            
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="sexo">Sexo</Label>
                                <div className={this.state.divSexSelect}>
                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="sex" value={this.state.arraySexSelect} onChange={this.handleChangeSelectSex} options={this.state.arraySex} />
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
                                        isClearable={this.state.isClearable}    
                                        showYearDropdown
                                        dateFormatCalendar="MMMM"
                                        className="form-control"
                                        disabled={this.state.varDisabledDatePicker}
                                    />
                                </div>
                                <div className="errorSelect">{this.state.birthDateError}</div>                                                                
                            </FormGroup>    
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="civilState">Estado Civil</Label>
                                <div className={this.state.divEstateCivilSelect}>
                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="civilState" value={this.state.arrayEstatetCivilSelect} onChange={this.handleChangeSelectCivilState} options={this.state.arrayEstateCivil} />
                                </div>
                                <div className="errorSelect">{this.state.estateCivilSelectError}</div>                                                                
                            </FormGroup>   
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="profession">Profesion</Label>
                                <div className={this.state.divProfessionSelect}>
                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="profession" value={this.state.arrayProfessionSelect} onChange={this.handleChangeSelectProfession} options={this.state.arrayProfession} />
                                </div>
                                <div className="errorSelect">{this.state.professionSelectError}</div>                                                                
                            </FormGroup>   
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="especialization">Especializacion</Label>
                                <div className={this.state.divEspecializationSelect}>
                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="especialization" value={this.state.arrayEspecializationSelect} onChange={this.handleChangeSelectEspecialization} options={this.state.arrayEspecialization} />
                                </div>
                                <div className="errorSelect">{this.state.especializationSelectError}</div>                                                                
                            </FormGroup>   
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="telefonos">Telefonos</Label>
                                <div className={this.state.divTagsTelefonos}>
                                    <TagsInput value={this.state.tagsTelefonos} disabled={this.state.varDisabled} onChange={this.handleChangeTagsTelefonos} />
                                </div>
                                <div className="errorSelect">{this.state.tagsTelefonosError}</div>                                                                
                            </FormGroup>
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="emails">Emails</Label>
                                <div className={this.state.divTagsEmails}>
                                    <TagsInput value={this.state.tagsEmails} disabled={this.state.varDisabled} onChange={this.handleChangeTagsEmails} />
                                </div>
                                <div className="errorSelect">{this.state.tagsEmailsError}</div>                                                                
                            </FormGroup>   
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="province">Provincia</Label>
                                <div className={this.state.divProvinceSelect}>
                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="province" value={this.state.arrayProvinceSelect} onChange={this.handleChangeSelectProvincia} options={this.state.arrayProvince} />
                                </div>
                                <div className="errorSelect">{this.state.provinceSelectError}</div>                                                                
                            </FormGroup>
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="distrito">Distrito</Label>
                                <div className={this.state.divDistrictSelect}>
                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="distrito" value={this.state.arrayDistrictSelect} onChange={this.handleChangeSelectDistrito} options={this.state.arrayDistrict} />
                                </div>
                                <div className="errorSelect">{this.state.DistrictSelectError}</div>                                                                
                            </FormGroup>                               
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="direccion">Direccion:</Label>
                                <Input disabled={this.state.varDisabled} invalid={this.state.direccionInvalid} name="direccion" id="direccion" onKeyUp={this.handlekeyDireccion} onChange={this.handleChange} value={this.state.direccion} type="textarea" placeholder="Direccion" />
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
                                <Label for="emails">Fecha de Ingreso</Label>
                                <div className={this.state.divEntryDate}>
                                    <DatePicker
                                        selected={this.state.entryDate}
                                        onChange={this.handleChangeEntryDate}
                                        dateFormat="dd-MM-yyyy"       
                                        isClearable={this.state.isClearable}    
                                        showYearDropdown
                                        dateFormatCalendar="MMMM"
                                        className="form-control"
                                        disabled={this.state.varDisabledDatePicker}
                                    />
                                </div>
                                <div className="errorSelect">{this.state.entryDateError}</div>                                                                
                            </FormGroup>   
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="registerUser">¿Registrar como Usuario?</Label>
                                <div className={this.state.divRegisterUserSelect}>
                                    <Select isSearchable="true" isDisabled={this.state.varDisabledRegisterUser} name="registerUser" value={this.state.arrayRegisterUserSelect} onChange={this.handleChangeSelectRegisterUser} options={this.state.arrayRegisterUser} />                                    
                                </div>
                                <div className="errorSelect">{this.state.registerUserSelectError}</div>                                                                
                            </FormGroup>   
                            <FormGroup className={"top form-group col-sm-6 "+this.state.hideFormGroup}>                                                                 
                                <Label for="userRegister">Usuario Registrado:</Label>
                                <InputGroup>
                                    <Input disabled={this.state.varDisabledEmailRegister} name="emailRegister" id="emailRegister" onChange={this.handleChange} value={this.state.emailRegister} type="text" placeholder="Usuario Registrado" />
                                    <InputGroupAddon addonType="prepend">
                                        <Button className={this.state.buttonView} title="Ver Usuario" onClick={() => this.openModalUserView(this.state.arrayEmails, 2, this.state.userIdRegister)}><FaSearch size="1em"/></Button>
                                        <Button className={this.state.buttonEdit} title="Editar Usuario" onClick={() => this.openModalUserEdit(this.state.arrayEmails, 3, this.state.userIdRegister)}><FaUserEdit size="1em"/></Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                {/*<FormFeedback tooltip>{this.state.namesError}</FormFeedback>*/}                                                                                                                                                            
                            </FormGroup> 
                        </div>  
                    </form>                                                                    
                    </ModalBody>
                    <ModalFooter>
                        <Button className={this.state.buttonSave} color="primary" onClick={this.handleSavePersonal}>{this.state.modalFooterButton}</Button>
                        <Button className={this.state.buttonCancel} color="danger" onClick={this.closePersonal}>Cancelar</Button>                                                                                                                                              
                    </ModalFooter>                    
                    <ModalUser sendDataUser={this.getData}/>
                    </div>
                </Modal>                
                <Modal isOpen={this.state.modalAlert} toggle={this.toggleAlert} className="ModalAlert">
                    <ModalHeader toggle={this.cerrarModalAlert}></ModalHeader>
                    <ModalBody>
                        <div color="success" className={this.state.alertCheck}><FaCheckCircle size="4em"/></div>
                        <div color="success" className={this.state.alertExc}><FaExclamationCircle size="4em"/></div>                                    
                        <h4><b>{this.state.bodyAlert}</b></h4>
                    </ModalBody>
                    <ModalFooter>
                        <Button className={this.state.buttonAceptarAlert} color="primary" onClick={this.aceptarDeletePersonal}>Aceptar</Button>
                        <Button className={this.state.buttonCancelAlert} color="danger" onClick={this.cerrarModalAlert}>Cancelar</Button>
                    </ModalFooter>
                </Modal>                   
            </span> 
		);
	}      

  }
  export default ModalPersonal;