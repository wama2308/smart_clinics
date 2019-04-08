import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import Select from 'react-select';
import axios from 'axios';

/*https://www.youtube.com/watch?v=8avC3hHNeSE&list=PLydyvfdcmeqA6wAiEUpo5jscTykFEoZlP*/
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
import './Ventas.css'
import './loading.css'
import PopoverItem from '../../components/PopoverItem.js';
import classnames from 'classnames';
import { datosConexion } from '../../components/Conexion.js';
import { Editor } from '@tinymce/tinymce-react';
import jstz from 'jstz';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

import Autocomplete from '../../components/Autocomplete.js';
import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar, FaFileAlt} from 'react-icons/fa';


class Ventas extends Component {

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
        this.handleChangebirthDate = this.handleChangebirthDate.bind(this);
        this.handleSubmitServicios = this.handleSubmitServicios.bind(this);
        this.handleSavePatient = this.handleSavePatient.bind(this);
        this.handleSubmitFormaPago = this.handleSubmitFormaPago.bind(this);

        this.state = {
            activeTab: "1",
            conexion: valueConexion,  
            /*cuca: wama,  */
            modalRegistrarPaciente: false,
            modalAlert: false,
            buttonSave: 'hide', 
            buttonCancel: 'hide',
            buttonAceptarAlert: 'hide',             
            buttonCancelAlert: 'hide',
            divLoadingTable:'row hide',
            divContainerTable:'row hide',
            bodyAlert: '',
            alertCheck: 'hide check',
            alertExc: 'hide warning',
            varDisabled: '', 
            modalHeaderRegistrarPaciente: '', 
            modalFooterButton: '', 
            divLoading:'sizeDiv show',
            divContainer:'hide',
            divLoadingModal:'sizeDiv hide',
            divContainerModal:'show',
            timeZ: timezone.name(),
            collapseServicios: false,
            collapseFormaPago: false,
            collapsefichaPaciente: false,
            referidoOption: null,
            referidoError: '',
            divReferidoError: '',      
            especifiqueOption: null,
            especifiqueError: '',
            divEspecifiqueError: '',      
            servicioOption: null,
            servicioError: '',
            divServicioError: '',      
            pacienteOption: null,
            pacienteError: '',
            divPacienteError: '',   
            tagsTelefonos: [],   
            tagsEmails: [],   
            foto:null,            
            startDate: new Date(),
            arrayPatients: [],
            divAttentionPatients: 'hide',
            idPatient: '',
            arrayServices: [],
            arrayFormaPago:[],
            formaPagoOption: null,
            formaPagoError: '',
            divFormaPagoError: '',       
            tipoPagoError: '',
            divTipoPagoError: '',
            arrayTipoPago: [],
            tipoPagoOption: null,  
            arrayBancoEmisor:[],
            bancoEmisorOption: null,
            divBancoEmisorError: '',
            bancoEmisorError: '',
            arrayBancoReceptor:[],
            bancoReceptorOption: null,
            bancoReceptorError: '',
            divBancoReceptorError: '',
            arrayReferred:[],
            dniInvalid: false,
            dniError: '',
            dni: '',
            divSelectEstadoCivil: '',
            estadoCivilError: '',
            selectedEstadoCivilOption: null,         
            arrayEstadoCivil: [],
            nombresInvalid: false,
            nombresError: '',
            nombres: '',
            apellidosInvalid: false,
            apellidosError: '',
            apellidos: '',
            divSelectSexo: '',
            sexoError: '',
            selectedSexoOption: null,
            arraySex: [],
            divFechaNacimiento:'',
            fechaNacimientoError:'',
            divTagsTelefonos: '',
            tagsTelefonosError: '',
            divTagsEmails: '',
            tagsEmailsError: '',
            divSelectProvincia: '',
            provinciaError: '',
            selectedOptionProvincia: null,
            arrayProvincia: [],
            divSelectDistrito:'',
            distritoError:'',
            selectedOptionDistrito:null,            
            arrayDistrito: [],
            direccionInvalid: false,
            direccionError: '',
            direccion: '',
            fotoInvalid: false,
            fotoError: '',
            fotoValid: '',
            arrayTypeIdentity: [],
            arrayTypeIdentityOption: '',
            infoDetailsPatients: [],
            infoPhonePatients:'',
            infoEmailsPatients:'',
            infoSexPatients:'',
            infoCivilStatePatients:'',
            infoBirthDatePatients:'',
            infoProvincePatients:'',
            infoDistritoPatients:'',
            infoAddressPatients:'',
            arrayEspecifique: [],
            listServices: [],
            posDeleteServices: '',
            montoDeleteServices: 0,
            acumMonto: 0,
            subTotal: 0,
            igv: 0,
            total: 0,
            porPagar: 0,
            monto: 0,
            listFormaPago: [],
            nroOperacion: '',
            nroOperacionError: '',
            nroOperacionInvalid: '',
            montoError: '',
            montoInvalid: '',
            acumPagos:0,
            posDeletePago: '',
            posPagoDelete:'',
            optionDelete:0,
            selectedTypeIdentity: 0,
            currentSymbol: '',
        };        
    }     
    
    componentDidMount(){
        
        this.setState({
            divContainer: "row show",
            divLoading: "row hide",  
            /*divContainerModal: "hide",
            divLoadingModal: "show",   */
            collapseServicios: true,     
            collapseFormaPago: true,    
        })
        this.LoadPatients();
        //this.LoadSelects();        
    }   

    LoadSelects = () => {

        const token = window.localStorage.getItem('id_token');
        const apiLoadServicesSelect = (this.state.conexion+"LoadServicesSelect");
        const apiqueryWaytopay = (this.state.conexion+"queryWaytopay");
        const apiqueryPaymentType = (this.state.conexion+"queryPaymentType");
        const apiqueryIssuingbank = (this.state.conexion+"queryIssuingbank");
        const apiqueryReceivingbank = (this.state.conexion+"queryReceivingbank");
        const apiqueryReferred = (this.state.conexion+"queryReferred");
        const apiqueryTypeIdentity = (this.state.conexion+"queryTypeIdentity");
        const apiqueryCivilState = (this.state.conexion+"queryCivilState");
        const apiquerySex = (this.state.conexion+"querySex");
        const apiqueryProvinces = (this.state.conexion+"queryProvinces");
        const apiLoadCurrentSymbol = (this.state.conexion+"LoadCurrentSymbol");
        /*----------------------------------------------------------------------*/
        const datos={
            headers:
            {'access-token' : token }
        }
        /*-------------------------------------1--------------------------------*/        
        axios.get(apiLoadServicesSelect, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arrayServices: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
        /*------------------------------------2---------------------------------*/
        axios.get(apiqueryWaytopay, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arrayFormaPago: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
        /*------------------------------------3---------------------------------*/
        axios.get(apiqueryPaymentType, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arrayTipoPago: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
        /*------------------------------------4---------------------------------*/
        axios.get(apiqueryIssuingbank, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arrayBancoEmisor: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
        /*------------------------------------5---------------------------------*/
        axios.get(apiqueryReceivingbank, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arrayBancoReceptor: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
        /*------------------------------------6---------------------------------*/
        axios.get(apiqueryReferred, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arrayReferred: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
        /*------------------------------------7---------------------------------*/
        axios.get(apiqueryTypeIdentity, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arrayTypeIdentity: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
        /*------------------------------------8---------------------------------*/
        axios.get(apiqueryCivilState, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arrayEstadoCivil: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
        /*------------------------------------9---------------------------------*/
        axios.get(apiquerySex, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arraySex: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
        /*------------------------------------10---------------------------------*/
        axios.get(apiqueryProvinces, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arrayProvincia: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
        /*------------------------------------11---------------------------------*/
        axios.get(apiLoadCurrentSymbol, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                    currentSymbol: res.data                
                })                 

            }else{

                this.setState({
                    currentSymbol: ''                
                })                 
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
    }

    LoadPatients = () => {

        const token = window.localStorage.getItem('id_token');
        const apiLoadPatients = (this.state.conexion+"queryPatients");
        const datos={
            headers:
            {'access-token' : token }
        }

        axios.get(apiLoadPatients, datos)
        .then((res) => {
            
            if(res.data.length > 0){

                this.setState({
                arrayPatients: res.data                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                arrayPatients: []                
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   
            }
            

        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleChangebirthDate(date) {
        this.setState({
          startDate: date,
          fechaNacimientoError: "",
          divFechaNacimiento: ""
        });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }         

    prueba = () => {

       /* let typeIdentity = "";

        if(this.state.selectedTypeIdentity === 0){

            typeIdentity = this.state.arrayTypeIdentity[0]["value"];

        }else{

            typeIdentity = this.state.arrayTypeIdentityOption;

        }
        console.log(typeIdentity);*/

/*        let a = this.state.arrayPatients;
        let b = a.reverse();
        console.log(b[0]);*/

        /*this.setState({
            pacienteOption: [{ value: '0011', label: 'la wama' }]                         
        });*/

        /*let typeIdentity = "";

        if(this.state.selectedTypeIdentity === 0){

            typeIdentity = this.state.arrayTypeIdentity[0]["label"];

        }else{

            typeIdentity = this.state.arrayTypeIdentityOption;

        }

        let a = new Date(this.state.startDate).toISOString().slice(0,10);
        console.log(typeIdentity);
        console.log(this.state.dni);
        console.log(this.state.selectedEstadoCivilOption);
        console.log(this.state.nombres);
        console.log(this.state.apellidos);
        console.log(this.state.selectedSexoOption);
        console.log(a);
        console.log(this.state.tagsTelefonos);
        console.log(this.state.tagsEmails);
        console.log(this.state.selectedOptionProvincia);
        console.log(this.state.selectedOptionDistrito);
        console.log(this.state.direccion);
        console.log(this.state.foto);*/
        

    }     

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }   

    handleChangeSelectPaciente = (pacienteOption) => {
        //console.log(pacienteOption);
        let valuePaciente = "";
        let arrayPaciente = Object.values(pacienteOption);
        arrayPaciente.forEach(function (elemento, indice, array) {

            if(indice === 1){
                valuePaciente = elemento;
            }            
        });        
        
        this.setState({ 
            pacienteOption,
            pacienteError: '',
            divPacienteError: '' ,
            idPatient: valuePaciente                               
        });                


    }

    handleChangeSelectReferido = (referidoOption) => {

        let valueReferido = "";
        let arrayReferido = Object.values(referidoOption);
        arrayReferido.forEach(function (elemento, indice, array) {

            if(indice === 1){
                valueReferido = elemento;
            }            
        });   

        this.setState({ 
            referidoOption,
            referidoError: '',
            divReferidoError: '',                                
            especifiqueOption:[]
        });                

        if(valueReferido === "5c50646757d9f6173dfbd000"){

            const token = window.localStorage.getItem('id_token');       
            const apiloadExternalStaff = (this.state.conexion+"loadExternalStaff");
            /*----------------------------------------------------------------------*/
            const datos={
                headers:
                {'access-token' : token }
            }
            /*-------------------------------------1--------------------------------*/      

            axios.get(apiloadExternalStaff, datos)
            .then((res) => {
                
                if(res.data.length > 0){

                    this.setState({
                        arrayEspecifique: res.data                
                    }) 
                    this.setState({
                        divContainerTable: "row show",
                        divLoadingTable: "row hide",            
                    })   

                }else{

                    this.setState({
                        arrayEspecifique: []                
                    }) 
                    this.setState({
                        divContainerTable: "row show",
                        divLoadingTable: "row hide",            
                    })   
                }
                

            })
            .catch((error) => {
                console.log(error);
            });

        } else if(valueReferido === "5c50646757d9f6173dfbd001"){

            const token = window.localStorage.getItem('id_token');       
            const apiLoadInternalStaff = (this.state.conexion+"LoadInternalStaff");
            /*----------------------------------------------------------------------*/
            const datos={
                headers:
                {'access-token' : token }
            }
            /*-------------------------------------1--------------------------------*/      

            axios.get(apiLoadInternalStaff, datos)
            .then((res) => {
                
                if(res.data.length > 0){

                    this.setState({
                        arrayEspecifique: res.data                
                    }) 
                    this.setState({
                        divContainerTable: "row show",
                        divLoadingTable: "row hide",            
                    })   

                }else{

                    this.setState({
                        arrayEspecifique: []                
                    }) 
                    this.setState({
                        divContainerTable: "row show",
                        divLoadingTable: "row hide",            
                    })   
                }
                

            })
            .catch((error) => {
                console.log(error);
            });

        }else if(valueReferido === "5c50646757d9f6173dfbd002"){

            const token = window.localStorage.getItem('id_token');       
            const apiqueryPatients = (this.state.conexion+"queryPatients");
            /*----------------------------------------------------------------------*/
            const datos={
                headers:
                {'access-token' : token }
            }
            /*-------------------------------------1--------------------------------*/      

            axios.get(apiqueryPatients, datos)
            .then((res) => {
                
                if(res.data.length > 0){

                    this.setState({
                        arrayEspecifique: res.data                
                    }) 
                    this.setState({
                        divContainerTable: "row show",
                        divLoadingTable: "row hide",            
                    })   

                }else{

                    this.setState({
                        arrayEspecifique: []                
                    }) 
                    this.setState({
                        divContainerTable: "row show",
                        divLoadingTable: "row hide",            
                    })   
                }
                

            })
            .catch((error) => {
                console.log(error);
            });

        } else {

            this.setState({
                arrayEspecifique: []                
            }) 
            this.setState({
                divContainerTable: "row show",
                divLoadingTable: "row hide",            
            })   

        }

    }

    handleChangeSelectFormaPago = (formaPagoOption) => {
        //console.log(formaPagoOption);
        this.setState({ 
            formaPagoOption,
            formaPagoError: '',
            divFormaPagoError: ''                                
        });                
    }

    handleChangeSelectEspecifique = (especifiqueOption) => {
        this.setState({ 
            especifiqueOption,
            especifiqueError: '',
            divEspecifiqueError: ''                                
        });                
    }

    handleChangeSelectServicio = (servicioOption) => {
        this.setState({ 
            servicioOption,
            servicioError: '',
            divServicioError: ''                                
        });                
    }

    handleChangeSelectTipoPago = (tipoPagoOption) => {

        let valueTipoPago = "";
        let arrayTipoPago = Object.values(tipoPagoOption);
        arrayTipoPago.forEach(function (elemento, indice, array) {

            if(indice === 1){
                valueTipoPago = elemento;
            }            
        });      

        this.setState({ 
            tipoPagoOption,
            tipoPagoError: '',
            divTipoPagoError: '',            
        });     

        if(valueTipoPago === "5c50646757d9f6173dfbd066"){
            this.setState({                 
                monto: this.number_format(this.state.acumMonto, 2),                                
            });     
        }else{
            this.setState({                 
                monto: 0,                                
            });     
        }           
    }

    handleChangeSelectBancoEmisor = (bancoEmisorOption) => {
        this.setState({ 
            bancoEmisorOption,
            bancoEmisorError: '',
            divBancoEmisorError: ''                                
        });                
    }

    handleChangeSelectBancoReceptor = (bancoReceptorOption) => {
        this.setState({ 
            bancoReceptorOption,
            bancoReceptorError: '',
            divBancoReceptorError: ''                                
        });                
    }

    handleChangeSelectEstadoCivil = (selectedEstadoCivilOption) => {
        this.setState({ 
            selectedEstadoCivilOption,
            estadoCivilError: '',
            divSelectEstadoCivil: ''                                
        });                
    }

    handleChangeSelectSexo = (selectedSexoOption) => {
        this.setState({ 
            selectedSexoOption,
            sexoError: '',
            divSelectSexo: ''                                
        });                
    }

    handleChangeSelectProvincia = (selectedOptionProvincia) => {

        let valueProvincia = "";
        let arrayProvincia = Object.values(selectedOptionProvincia);
        arrayProvincia.forEach(function (elemento, indice, array) {

            if(indice === 1){
                valueProvincia = elemento;
            }            
        });      
        
        this.setState({ 
            selectedOptionProvincia,
            provinciaError: '',
            divSelectProvincia: '',
            selectedOptionDistrito: []                                
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
                    arrayDistrito: res.data                
                })                

            }else{

                this.setState({
                    arrayDistrito: []                
                })                 
            }
                                          
        })

        .catch((res)=>{
            console.log("Problemas al consultar los distritos");
        });        
    }    

    handleChangeSelectDistrito = (selectedOptionDistrito) => {
        this.setState({ 
            selectedOptionDistrito,
            distritoError: '',
            divSelectDistrito: ''                                
        });                
    }

    toggleCollapseServicios =() => {
        this.setState({ 
            collapseServicios: !this.state.collapseServicios 
        });        
    }

    toggleCollapseFormaPago =() => {
        this.setState({ 
            collapseFormaPago: !this.state.collapseFormaPago 
        });        
    }

    toggleCollapseFichaPaciente =() => {
        this.setState({ 
            collapsefichaPaciente: !this.state.collapsefichaPaciente 
        });        
    }

    toggleRegistrarPaciente = () => {            

        this.setState({
            modalRegistrarPaciente: !this.state.modalRegistrarPaciente,            
            divLoadingModal:'sizeDiv hide',
            divContainerModal:'show',
            modalHeaderRegistrarPaciente: 'Registrar Paciente',
            modalFooterButton:'Guardar',
            buttonSave:'show',
            buttonCancel:'show',
        });              

    }

    cerrarModalRegistrarPacientes = () => {
        this.setState({
            modalRegistrarPaciente: false,
        });
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

    toggleViewPatient = (id) => {
        //console.log(id);
        if(!id){

            this.setState({
                    alertCheck: 'hide check',
                    alertExc: 'show warning',
                    buttonAceptarAlert: 'hide',
                    buttonCancelAlert: 'hide',
                    bodyAlert: '¡Debe seleccionar un paciente!',                    
                    
                });
                
                this.toggleAlert();                

                setTimeout(() => {

                    this.cerrarModalAlert();                    
                        
                }, 3000);    

        }
        else{
            /////////////////////////////////////////////////////////////
            const apiqueryOnePatients = this.state.conexion+"queryOnePatients";  
            const token = window.localStorage.getItem('id_token');

            const datos={
                headers:
                {'access-token' : token }
            }

            /////////////////////////////////////////////////////////////
            axios({
                method: 'post',
                url: apiqueryOnePatients,
                data: {
                    _id: id                
                },
                headers:
                {'access-token' : token}
            })
            .then((res)=>{
                
                if(res.data.length > 0){

                    var stringPhone = res.data[0]['phone'].toString();
                    var phone = stringPhone.replace(",", " / ");

                    var stringEmail = res.data[0]['email'].toString();
                    var email = stringEmail.replace(",", " / ");

                    this.setState({
                        infoDetailsPatients: res.data[0]['names']+" "+res.data[0]['surnames']+" / "+res.data[0]['type_identity']+"-"+res.data[0]['dni'],                
                        infoPhonePatients: phone,
                        infoEmailPatients: email,
                        infoSexPatients: res.data[0]['sex'],
                        infoCivilStatePatients: res.data[0]['civil_state'],                        
                        infoBirthDatePatients: res.data[0]['birth_date'],
                        infoProvincePatients: res.data[0]['province'],
                        infoDistritoPatients: res.data[0]['district'],
                        infoAddressPatients: res.data[0]['address'],
                        divAttentionPatients: 'show'
                    })  

                }else{

                    this.setState({
                        infoDetailsPatients: []                
                    })                 
                }
                                              
            })

            .catch((res)=>{
                console.log("Problemas al consultar los detalles del paciente");
            });     

            }
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

    handlekeyDni = event =>{
        this.setState({
            dniError: "",
            dniInvalid: false,            
        })
    }

    handlekeyNombres = event =>{
        this.setState({
            nombresError: "",
            nombresInvalid: false,            
        })
    }

    handlekeyApellidos = event =>{
        this.setState({
            apellidosError: "",
            apellidosInvalid: false,            
        })
    }

    handlekeyDireccion = event =>{
        this.setState({
            direccionError: "",
            direccionInvalid: false,            
        })
    }

    typeIdentity = event =>{                    
        this.setState({
            arrayTypeIdentityOption:event.target.value,    
            selectedTypeIdentity: 1,        
        })
    }

    validateServicios = () => {

        let servicioError = "";
        let divServicioError = "";

        if ((this.state.servicioOption === null) || (this.state.servicioOption.length === 0)){
            
            divServicioError = "borderColor";
            servicioError = "¡Seleccione el servicio!";            
            
        }       

        if (servicioError) {
            
            this.setState({ 
                servicioError,
                divServicioError

            });                
           
            return false;

        }

        let valueServicio = "";
        let nameServicio = "";
        let montoServicio = "";
        let montoConDescuento = "0";
        let acumMonto = this.state.acumMonto;

        let arrayServicesSelect = Object.values(this.state.servicioOption);
        arrayServicesSelect.forEach(function (elemento, indice, array) {

            if(indice === 0){
                nameServicio = elemento;
            }            
            if(indice === 1){
                valueServicio = elemento;
            }            
            if(indice === 2){
                montoServicio = parseFloat(elemento);
            }            
        });  
        acumMonto = acumMonto + montoServicio
        /*console.log(montoServicio);
        console.log(acumMonto);*/
        this.state.listServices.push(
            { 
                nameServices: nameServicio,
                valueServices: valueServicio,
                montoServices: montoServicio,
                montoDescuentoServices: '0',  
                autorizadoPor:'',                              
            }
        )
        
        this.setState({
            servicioOption: null,
            servicioError: "",
            divServicioError: "",
            acumMonto: acumMonto,
            subTotal: this.number_format(acumMonto, 2),
            porPagar: this.number_format(acumMonto, 2),
        })   
        
        return true;   

    }

    handleSubmitServicios = event => {
        
        event.preventDefault();
        const isValid = this.validateServicios();        
        if (isValid) {                  
            console.log(this.state.listServices);                 
        }
    }

    deleteRegisterTable(option, pos, montoServices) {

        if(option === 1){

            if(this.state.listFormaPago.length !== 0){
                this.setState({                
                    alertCheck: 'hide check',
                    alertExc: 'show warning',
                    bodyAlert: '¡Debe eliminar los pagos, para poder eliminar un servicio!',
                    buttonAceptarAlert: 'hide',                                  
                    buttonCancelAlert: 'hide',                      
                });

                this.toggleAlert();

                setTimeout(() => {
                    this.cerrarModalAlert();
                }, 2000);

            }else{

                this.setState({
                    posDeleteServices: pos,
                    montoDeleteServices: montoServices,
                    alertCheck: 'hide check',
                    alertExc: 'show warning',
                    bodyAlert: '¿Desea Eliminar este servicio?',
                    buttonAceptarAlert: 'show',                                  
                    buttonCancelAlert: 'show',                      
                });

                this.toggleAlert();
            }
        }

        if(option === 2){

            var pagoState = montoServices;
            var pagoString = pagoState.replace(",", "");
            var pagoDelete = parseFloat(pagoString);            

            this.setState({
                posDeletePago: pos,
                posPagoDelete: pagoDelete,
                alertCheck: 'hide check',
                alertExc: 'show warning',
                bodyAlert: '¿Desea Eliminar este registro de pago?',
                buttonAceptarAlert: 'show',                                  
                buttonCancelAlert: 'show',                      
            });

            this.toggleAlert();
        }

        this.setState({
            optionDelete: option
        });


    }   

    aceptarDeleteRegister = () => {

        if(this.state.optionDelete === 1){

            var acumMonto = this.state.acumMonto;
            var montoDelete = parseFloat(this.state.montoDeleteServices);
            
            var acumMontoFinal = acumMonto - montoDelete;

            var listService = this.state.listServices;
            listService.splice(this.state.posDeleteServices, 1);

            
            this.setState({
                acumMonto: acumMontoFinal,
                subTotal: this.number_format(acumMontoFinal, 2),            
                porPagar: this.number_format(acumMontoFinal, 2),            
                listServices: listService,                                  
                posDeleteServices: '',
                montoDeleteServices: 0,
                buttonAceptarAlert: 'hide',                      
                buttonCancelAlert: 'hide', 
                alertCheck: 'show check',
                alertExc: 'hide warning',
                bodyAlert: 'Servicio eliminado con exito!',       
            });
            console.log(this.state.listServices);

        }   

        if(this.state.optionDelete === 2){

            let pagoEliminar = parseFloat(this.state.posPagoDelete);
            let acumPagos = parseFloat(this.state.acumPagos);
            let acumMonto = parseFloat(this.state.acumMonto);

            console.log(pagoEliminar);
            console.log(acumPagos);
            console.log(acumMonto);

            acumPagos = acumPagos - pagoEliminar;

            let porPagar = acumMonto - acumPagos;            

            var listPago = this.state.listFormaPago;
            listPago.splice(this.state.posDeletePago, 1);

            
            this.setState({
                acumPagos: acumPagos,
                porPagar: this.number_format(porPagar, 2),
                listFormaPago: listPago,                                  
                posDeletePago: '',
                posPagoDelete: 0,
                buttonAceptarAlert: 'hide',                      
                buttonCancelAlert: 'hide', 
                alertCheck: 'show check',
                alertExc: 'hide warning',
                bodyAlert: 'Registro de pago eliminado con exito!',       
            });
            console.log(this.state.listFormaPago);
        }   

        setTimeout(() => {
            this.cerrarModalAlert();
        }, 1000);
        

    } 

    cancelarDeleteRegister = () => {

        this.setState({
            posDeleteServices: '',            
            buttonAceptarAlert: 'hide',                                  
            buttonCancelAlert: 'hide',                      
        });

        this.cerrarModalAlert();

    }

    number_format = (amount, decimals) => {
        amount += ''; // por si pasan un numero en vez de un string
        amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

        decimals = decimals || 0; // por si la variable no fue fue pasada

        // si no es un numero o es igual a cero retorno el mismo cero
        if (isNaN(amount) || amount === 0)
            return parseFloat(0).toFixed(decimals);

        // si es mayor o menor que cero retorno el valor formateado como numero
        amount = '' + amount.toFixed(decimals);

        var amount_parts = amount.split('.'),
                regexp = /(\d+)(\d{3})/;

        while (regexp.test(amount_parts[0]))
            amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

        return amount_parts.join('.');
    }

    formatValor = (campo,preformat) => {        

        var vr = campo.value;

        //vr = vr.replace( ".", "" );

        vr = this.replaceAll( vr, "," );

        vr = this.replaceAll( vr, "." );

        campo.value = "";

        var sign = "";

        if (vr.indexOf('-') != -1) {

            vr = this.replaceAll( vr, "-" );

            sign = "-";

        }   

        var tam = (preformat) ? vr.length : vr.length + 1;        

        campo.maxLength = 12;

        if ( tam <= 2 ){ 

            campo.value = "0."+vr ;
        }

        if ( (tam > 2) && (tam <= 5) ){

            campo.maxLength = 12;

            campo.value = vr.substr( 0, tam - 2 ) + '.' + vr.substr( tam - 2, tam ) ;
        }

        if ( (tam >= 6) && (tam <= 8) ){

            campo.maxLength = 12;

            campo.value = vr.substr( 0, tam - 5 ) + ',' + vr.substr( tam - 5, 3 ) + '.' + vr.substr( tam - 2, tam ) ;
        }

        if ( (tam >= 9) && (tam <= 11) ){

            campo.maxLength = 12;

            campo.value = vr.substr( 0, tam - 8 ) + ',' + vr.substr( tam - 8, 3 ) + ',' + vr.substr( tam - 5, 3 ) + '.' + vr.substr( tam - 2, tam ) ;
        }

        if ( (tam >= 12) && (tam <= 14) ){

            campo.maxLength = 12;

            campo.value = vr.substr( 0, tam - 11 ) + ',' + vr.substr( tam - 11, 3 ) + ',' + vr.substr( tam - 8, 3 ) + ',' + vr.substr( tam - 5, 3 ) + '.' + vr.substr( tam - 2, tam ) ;
        }

        if ( (tam >= 15) && (tam <= 17) ){

            campo.maxLength = 12;

            campo.value = vr.substr( 0, tam - 14 ) + ',' + vr.substr( tam - 14, 3 ) + ',' + vr.substr( tam - 11, 3 ) + ',' + vr.substr( tam - 8, 3 ) + ',' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;
        }

        var pos = campo.value.indexOf('.');

        if (pos != -1) {

            vr = campo.value.substr( 0, pos );

            if (vr == "00" || (vr.length == 2 && vr.substr( 0, 1) == "0")) campo.value =  campo.value.substr(1, tam);

        }

        campo.value = sign + campo.value;   
    
    }    

    replaceAll = (value,charte) => {

        var result = value;

        var posi = value.indexOf(charte);

        if(posi > -1){

            while(posi > -1){

                result = value.substring(0,posi);

                result = result + value.substring(posi+1);

                posi = result.indexOf(charte);

                value = result;

            }    

        } 
        return(result);
    }

    enterDecimal = (elEvento) => {

        var amountformat = true;
        var event = elEvento || window.event;
        var elem=event.currentTarget ||event.srcElement;
        var kcode= event.which || event.keyCode;
        //alert(kcode);
        var val;
        var newVal="";
        if (amountformat) elem.value = this.replaceAll(elem.value, "." );
        switch (kcode){
            case 66:
            case 98:
            {
               if (amountformat) this.formatValor(elem,true);
                //break;
                return false;
            }
            case 72:
            case 104:
            {
                if (amountformat) this.formatValor(elem,true);
                //break;
                return false;
            }
            case 77:
            case 109:
            {
                if (amountformat) this.formatValor(elem,true);
                //break;
                return false;
            }
            case 84:
            case 116:
            {
                if (amountformat) this.formatValor(elem,true);
                //break;
                return false;
            }
            default: {
                if (amountformat) {
                    if ((kcode < 48 || kcode > 57) && kcode != 13){
                        if(kcode==37 || kcode==39){
                            //event.returnValue = true;
                            //formatValor(elem,true);
                            return true;
                        }else if(kcode==8){
                            //event.returnValue = true;
                            //formatValor(elem,true);
                            if(elem.value=="0" || elem.value=="00" || elem.value=="0.00" || elem.value=="0.00" || elem.value==""){
                                elem.value="0.00";
                            }
                            return true;
                        }else{
                            //event.returnValue = false;
                            this.formatValor(elem,true);
                            return false;
                        }
                    //break;
                    }else if(kcode != 13){
                        this.formatValor(elem,false);
                        //break;
                        return true;
                    }else{
                        this.formatValor(elem,true);
                        if(elem.value=="0" || elem.value=="00" || elem.value=="0.00" || elem.value=="0.00" || elem.value==""){
                            elem.value="0.00";
                        }
                        //break;
                        return true;
                    }
                } else {
                    if ((kcode < 48 || kcode > 57) && kcode != 13){
                        //event.returnValue = false;
                        return false;
                    } else if (kcode == 46 && elem.value.indexOf('.')!==-1) {
                        //event.returnValue = false;
                        return false;
                    }
                }
            }
        }
    }

    eventoBlur = (e) => {
        if(this.state.monto == ''){
            this.setState({
                monto: '0.00'                      
            }); 
        }        
    }

    eventoFocus = (e) => {        
        if(this.state.monto == '0.00'){
            this.setState({
                monto: ''                      
            }); 
        }        
    }

    handlekeyMonto = event =>{
        this.setState({            
            montoError: '',
            montoInvalid: ''
        })
    }

    handlekeyNroOperacion = event =>{
        this.setState({            
            nroOperacionError: '',
            nroOperacionInvalid: ''
        })
    }

    validatePatient = () => {

        let dniInvalid = false;
        let dniError = "";

        let divSelectEstadoCivil = "";
        let estadoCivilError = "";

        let nombresInvalid = false;
        let nombresError = "";

        let apellidosInvalid = false;
        let apellidosError = "";

        let divSelectSexo = "";
        let sexoError = "";

        let divFechaNacimiento = "";
        let fechaNacimientoError = "";

        let divTagsTelefonos = "";
        let tagsTelefonosError = "";

        let divTagsEmails = "";
        let tagsEmailsError = "";

        let divSelectProvincia = "";
        let provinciaError = "";

        let divSelectDistrito = "";
        let distritoError = "";

        let direccionInvalid = false;
        let direccionError = "";

        let fotoInvalid = false;
        let fotoError = "";

        if (this.state.dni === ""){
            
            dniInvalid = true;
            dniError = "¡Ingrese el Dni!";            
            
        }       

        if ((this.state.selectedEstadoCivilOption === null) || (this.state.selectedEstadoCivilOption.length === 0)){
            
            divSelectEstadoCivil = "borderColor";
            estadoCivilError = "¡Seleccione el estado civil!";            
            
        }       

        if (this.state.nombres === ""){
            
            nombresInvalid = true;
            nombresError = "¡Ingrese los nombres!";            
            
        }       

        if (this.state.apellidos === ""){
            
            apellidosInvalid = true;
            apellidosError = "¡Ingrese los nombres!";            
            
        }

        if ((this.state.selectedSexoOption === null) || (this.state.selectedSexoOption.length === 0)){
            
            divSelectSexo = "borderColor";
            sexoError = "¡Seleccione el sexo!";            
            
        }       

        if (this.state.startDate === null){
            
            divFechaNacimiento = "borderColorFecha";
            fechaNacimientoError = "¡Ingrese la fecha de nacimiento!";            
            
        }

        if ((this.state.tagsTelefonos === null) || (this.state.tagsTelefonos.length === 0)){
            
            divTagsTelefonos = "borderColor";
            tagsTelefonosError = "¡Ingrese al menos un telefono!";            
            
        }       

        if ((this.state.tagsEmails === null) || (this.state.tagsEmails.length === 0)){
            
            divTagsEmails = "borderColor";
            tagsEmailsError = "¡Ingrese al menos un correo!";            
            
        }

        if ((this.state.selectedOptionProvincia === null) || (this.state.selectedOptionProvincia.length === 0)){
            
            divSelectProvincia = "borderColor";
            provinciaError = "¡Seleccione la provincia!";            
            
        }

        if ((this.state.selectedOptionDistrito === null) || (this.state.selectedOptionDistrito.length === 0)){
            
            divSelectDistrito = "borderColor";
            distritoError = "¡Seleccione el distrito!";            
            
        }

        if (this.state.direccion === ""){

            direccionInvalid = true;
            direccionError = "¡Ingrese la direccion!";            
            
        }

        if (dniError || estadoCivilError || nombresError || apellidosError || sexoError || fechaNacimientoError || tagsTelefonosError || tagsEmailsError || provinciaError || distritoError || direccionError) {
            
            this.setState({ 
                dniInvalid,
                dniError,
                estadoCivilError,
                divSelectEstadoCivil,
                nombresInvalid,
                nombresError,
                apellidosError,
                apellidosInvalid,
                sexoError,
                divSelectSexo,
                fechaNacimientoError,
                divFechaNacimiento,
                tagsTelefonosError,
                divTagsTelefonos,
                tagsEmailsError,
                divTagsEmails,
                divSelectProvincia,
                provinciaError,
                divSelectDistrito,
                distritoError,
                direccionError,
                direccionInvalid,
            });                
           
            return false;

        }

        return true;

    }

    handleSavePatient = event => {

        event.preventDefault();
        const isValid = this.validatePatient();        
        if (isValid) {  

            let birth_date = new Date(this.state.startDate).toISOString().slice(0,10);
            let typeIdentity = "";

            if(this.state.selectedTypeIdentity === 0){

                typeIdentity = this.state.arrayTypeIdentity[0]["value"];

            }else{

                typeIdentity = this.state.arrayTypeIdentityOption;

            }

            let valueCivilState = "";
            let arrayCivilState = Object.values(this.state.selectedEstadoCivilOption);
            arrayCivilState.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueCivilState = elemento;
                }            
            });       

            let valueSex = "";
            let arraySex = Object.values(this.state.selectedSexoOption);
            arraySex.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueSex = elemento;
                }            
            });       

            let valueProvince = "";
            let arrayProvince = Object.values(this.state.selectedOptionProvincia);
            arrayProvince.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueProvince = elemento;
                }            
            });    

            let valueDistrito = "";
            let arrayDistrito = Object.values(this.state.selectedOptionDistrito);
            arrayDistrito.forEach(function (elemento, indice, array) {
                if(indice === 1){
                    valueDistrito = elemento;
                }            
            });   

            this.setState({ 
                divContainerModal: 'hide',
                divLoadingModal: 'sizeDiv show',
            })

            const apicreatePatients = (this.state.conexion+"createPatients");
            const token = window.localStorage.getItem('id_token');
            axios({
                method: 'post',
                url: apicreatePatients,
                data: {
                    type_identity: typeIdentity,
                    dni: this.state.dni,   
                    names:this.state.nombres,                     
                    surnames:this.state.apellidos,                     
                    province_id: valueProvince,                     
                    district_id: valueDistrito,                     
                    address:this.state.direccion,                     
                    phone:this.state.tagsTelefonos,                     
                    email:this.state.tagsEmails,                     
                    sex_id: valueSex,                     
                    civil_state_id: valueCivilState,                     
                    photo:this.state.foto,                     
                    birth_date:birth_date,   
                    timeZ:this.state.timeZ,                                      
                },
                headers:
                {'access-token' : token}
            })
            .then((res)=>{
                
                if(res.data === 1)
                {
                    this.setState({ 
                        dniError: '',
                        dniInvalid: false,
                        dni: '',
                        divSelectEstadoCivil: '',
                        estadoCivilError: '',
                        selectedEstadoCivilOption: null,
                        nombres: '',
                        nombresInvalid: false,
                        nombresError: '',
                        apellidos: '',
                        apellidosInvalid: false,
                        apellidosError: '',
                        selectedSexoOption: null,
                        divSelectSexo: '',
                        sexoError: '',
                        startDate: new Date(),
                        fechaNacimientoError: '',
                        divFechaNacimiento: '',
                        tagsTelefonos: [],
                        tagsTelefonosError: '',
                        divTagsTelefonos: '',
                        tagsEmails: [],
                        tagsEmailsError: '',
                        divTagsEmails: '',
                        selectedOptionProvincia: null,
                        divSelectProvincia: '',
                        provinciaError: '',
                        selectedOptionDistrito: null,
                        divSelectDistrito: '',
                        distritoError: '',
                        direccion: '',
                        direccionError: '',
                        direccionInvalid: false,
                        foto: null,
                        fotoError:'',
                        fotoInvalid: false,
                        alertCheck: 'show check',
                        alertExc: 'hide warning',
                        bodyAlert: '¡Operacion Exitosa!',
                        buttonAceptarAlert: 'hide',                        
                        buttonCancelAlert: 'hide',
                        selectedTypeIdentity: 0,
                    });   
                    this.LoadPatients();
                    this.LoadSelects();
                    this.toggleAlert();
                    this.cerrarModalRegistrarPacientes();                               
                    setTimeout(() => {
                        this.cerrarModalAlert();
                        let arrayPatientsCurrent = this.state.arrayPatients;
                        let arrayPatientsLatest = arrayPatientsCurrent.reverse();

                        this.setState({
                            pacienteOption: arrayPatientsLatest[0]
                        })

                    }, 2000);  
                }    

                if(res.data === 2)
                {

                    this.setState({ 
                        alertCheck: 'hide check',
                        alertExc: 'show warning',
                        bodyAlert: '¡Esta paciente ya se encuentra registrado(a)!',
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

            })                    

            .catch((res)=>{
                console.log("Error en la operacion");
            });
            
        }
    }

    validateFormaPago = () => {

        let formaPagoError = "";
        let divFormaPagoError = "";

        let tipoPagoError = "";
        let divTipoPagoError = "";

        let montoInvalid = "";
        let montoError = "";

        let nroOperacionInvalid = '';
        let nroOperacionError = "";

        let bancoEmisorError = "";
        let divBancoEmisorError = "";

        let bancoReceptorError = "";
        let divBancoReceptorError = "";   

        let infoNroOperacion = "";     
        let infoBancoEmisor = "";     
        let idBancoEmisor = "";     
        let infoBancoReceptor = "";     
        let idBancoReceptor = "";     
        //console.log(this.state.monto);

        console.log("estado acum pago "+this.state.acumPagos);
        console.log("estado acum monto "+this.state.acumMonto);

        var pagoState = this.state.monto;
        var pagoString = pagoState.replace(",", "");

        let pago = parseFloat(pagoString);
        let acumPagos = parseFloat(this.state.acumPagos);

        console.log(pago);
        console.log(acumPagos);

        acumPagos = acumPagos + pago;
        
        let acumMonto = this.state.acumMonto;

        console.log("acum pagos "+acumPagos);

        let porPagar = acumMonto - acumPagos;

        console.log("por pagar "+porPagar);
        
        

        if ((this.state.formaPagoOption === null) || (this.state.formaPagoOption.length === 0)){
            
            divFormaPagoError = "borderColor";
            formaPagoError = "¡Seleccione la forma de pago!";            
            
        }  

        if(acumPagos > acumMonto){

            montoError = "¡Total de pago es excedente!";
            montoInvalid = "borderColor";     

        }

         if (formaPagoError || montoError) {
            
                this.setState({ 
                    formaPagoError,
                    divFormaPagoError,
                    montoError,
                    montoInvalid,
                });                
               
                return false;

        }    

        let valueFormaPago = "";
        if (this.state.formaPagoOption){

            let arrayFormaPago = Object.values(this.state.formaPagoOption);
            arrayFormaPago.forEach(function (elemento, indice, array) {
                if(indice === 0){
                    valueFormaPago = elemento;
                }            
            });        

        }

        if(valueFormaPago === "EFECTIVO"){
            //console.log(this.state.monto);
            if ((this.state.tipoPagoOption === null) || (this.state.tipoPagoOption.length === 0)){
            
                divTipoPagoError = "borderColor";
                tipoPagoError = "¡Seleccione el tipo de pago!";            
            
            }    

            if ((this.state.monto === 0) || (this.state.monto === 0.00) || (this.state.monto === "0.00") || (this.state.monto === "0")){

                montoError = "¡Ingrese el monto!";
                montoInvalid = "borderColor";   

            }              

            if (tipoPagoError || montoError) {
            
                this.setState({                     
                    tipoPagoError,     
                    divTipoPagoError,                    
                    montoError,     
                    montoInvalid,                   
                });                
               
                return false;

            }

            infoNroOperacion = "No Aplica";
            infoBancoEmisor = "No Aplica";
            idBancoEmisor = "0";
            infoBancoReceptor = "No Aplica";
            idBancoReceptor = "0";

        } 

        if(valueFormaPago !== "EFECTIVO"){

            if ((this.state.tipoPagoOption === null) || (this.state.tipoPagoOption.length === 0)){
            
                divTipoPagoError = "borderColor";
                tipoPagoError = "¡Seleccione el tipo de pago!";            
            
            }    

            if ((this.state.monto === 0) || (this.state.monto === 0.00) || (this.state.monto === "0.00") || (this.state.monto === "0")){

                montoError = "¡Ingrese el monto!";
                montoInvalid = "borderColor"; 

            }  

            if (this.state.nroOperacion === "") {

                nroOperacionError = "¡Ingrese el numero de operacion!";
                nroOperacionInvalid = "borderColor";    

            }

            if ((this.state.bancoEmisorOption === null) || (this.state.bancoEmisorOption.length === 0)){
            
                divBancoEmisorError = "borderColor";
                bancoEmisorError = "¡Seleccione el banco emisor!";            
            
            }  

            if ((this.state.bancoReceptorOption === null) || (this.state.bancoReceptorOption.length === 0)){
            
                divBancoReceptorError = "borderColor";
                bancoReceptorError = "¡Seleccione el banco receptor!";            
            
            }  

            if (formaPagoError || tipoPagoError || montoError || nroOperacionError || bancoEmisorError || bancoReceptorError) {
            
                this.setState({ 
                    tipoPagoError,                         
                    divTipoPagoError,
                    montoError,     
                    montoInvalid,                   
                    nroOperacionError,
                    nroOperacionInvalid,
                    bancoEmisorError,  
                    divBancoEmisorError,                       
                    bancoReceptorError,
                    divBancoReceptorError                        
                });                
               
                return false;
            
            }

            infoNroOperacion = this.state.nroOperacion;

            let arrayBancoEmisor = Object.values(this.state.bancoEmisorOption);
            arrayBancoEmisor.forEach(function (elemento, indice, array) {

                if(indice === 0){
                    infoBancoEmisor = elemento;
                }            
                if(indice === 1){
                    idBancoEmisor = elemento;
                }            
            });   

            let arrayBancoReceptor = Object.values(this.state.bancoReceptorOption);
            arrayBancoReceptor.forEach(function (elemento, indice, array) {

                if(indice === 0){
                    infoBancoReceptor = elemento;
                }            
                if(indice === 1){
                    idBancoReceptor = elemento;                    
                }            
            });              

        }         

        this.state.listFormaPago.push(
            { 
                formaPago: this.state.formaPagoOption,
                tipoPago: this.state.tipoPagoOption,
                pago: this.number_format(this.state.monto, 2),
                nroOperacion: infoNroOperacion,
                bancoEmisor: infoBancoEmisor,
                idBancoEmisor: idBancoEmisor,
                bancoReceptor: infoBancoReceptor,
                idbancoReceptor: idBancoReceptor,
            }
        )
        
        this.setState({
            acumPagos: acumPagos,
            porPagar: this.number_format(porPagar, 2),
            monto:'',
            nroOperacion:'',
            formaPagoOption: null,
            divFormaPagoError: '',
            formaPagoError: '',
            tipoPagoOption: null,
            divTipoPagoError: '',
            tipoPagoError: '',
            montoError:'',
            montoInvalid:'',
            nroOperacionError:'',
            nroOperacionInvalid:'',
            bancoEmisorOption: null,
            bancoEmisorError: '',
            divBancoEmisorError:'',
            bancoReceptorOption: null,
            bancoReceptorError: '',
            divBancoReceptorError:'',

            
            
        })   
        
        return true;   

    }

    handleSubmitFormaPago = event => {
        
        event.preventDefault();
        if(this.state.listServices.length === 0){

             this.setState({
                alertCheck: 'hide check',
                alertExc: 'show warning',
                bodyAlert: '¡Para realizar un pago, debe agregar un servicio!',
                buttonAceptarAlert: 'hide',                                  
                buttonCancelAlert: 'hide',                      
            });
            this.toggleAlert();

            setTimeout(() => {
                this.cerrarModalAlert();
            }, 3000);

        }else{

            const isValid = this.validateFormaPago();        
            if (isValid) {                  
                console.log(this.state.listFormaPago);                             
            }

        }
    }    

    render() {        

        const optionsReferido = [
          { value: 'v-18617014 wilfredo medina', label: 'v-18617014 wilfredo medina', monto: '50.00' },
          { value: 'v-17449426 gabriela paredes', label: 'v-17449426 gabriela paredes', monto: '150.00' },
          { value: 'v-21278551 joyce ruiz', label: 'v-21278551 joyce ruiz', monto: '100.00' },

        ];             

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                    <Card>
                    <CardHeader>
                        Configuracion de Servicios
                    </CardHeader>
                    <CardBody>  
                    <div>    
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                                Atencion al Cliente
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                                Consulta de Actividades
                            </NavLink>
                        </NavItem>                
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggleTab('3'); }} >
                                Entrega de Resultados
                            </NavLink>
                        </NavItem>                
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>      
                    <TabPane tabId="1">            
                        <div className="container">    
                        <form className="formCodeConfirm" onSubmit="">                          
                            <div align="center" className={this.state.divLoading}><img src="assets/loader.gif" width="20%" height="5%"/></div>
                            <div className={this.state.divContainer}>
                                <br />                                                                        
                                <div className="row">                                             
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="enlace">Paciente: </Label>
                                        <div className={this.state.divPacienteError}>
                                            <Select placeholder="Buscar Paciente..." isSearchable="true" isDisabled={this.state.varDisabled} name="enlace" value={this.state.pacienteOption} onChange={this.handleChangeSelectPaciente} options={this.state.arrayPatients} />
                                        </div>                                                
                                        <div className="errorSelect">{this.state.pacienteError}</div>                                                                
                                    </FormGroup>
                                    <FormGroup className="col-sm-6">                                                                 
                                        <Label for="enlace" style={{color: "#FFFFFF"}}>-</Label>                                        
                                        <div>
                                            <Button title="Buscar Paciente" disabled={this.state.varDisabled} onClick={() => { this.toggleViewPatient(this.state.idPatient); }}><FaSearch size="1em"/></Button>&nbsp;
                                            <Button title="Registrar Paciente" disabled={this.state.varDisabled} onClick={() => { this.toggleRegistrarPaciente(); }} id=""><FaPlusCircle size="1em"/></Button>&nbsp;
                                        </div>
                                    </FormGroup>
                                </div>    
                                <div className={this.state.divAttentionPatients}>
                                <div className="row">                                
                                    <FormGroup className="col-sm-12">
                                        <h5 className="form-control"><b>Paciente:</b> {this.state.infoDetailsPatients}</h5>   
                                    </FormGroup>    
                                    <FormGroup className="col-sm-12">
                                    <Button color="primary" onClick={this.toggleCollapseFichaPaciente} style={{ marginBottom: '1rem' }}>Ver mas</Button>
                                        <Collapse isOpen={this.state.collapsefichaPaciente}>
                                            <Card>
                                                <CardBody>
                                                    <h5 className="form-control"><b>Telefonos: </b>{this.state.infoPhonePatients}</h5>   
                                                    <h5 className="form-control"><b>Emails: </b>{this.state.infoEmailPatients}</h5>   
                                                    <h5 className="form-control"><b>Sexo: </b>{this.state.infoSexPatients}</h5>   
                                                    <h5 className="form-control"><b>Estado Civil: </b>{this.state.infoCivilStatePatients}</h5>   
                                                    <h5 className="form-control"><b>Fecha de Nacimiento: </b>{this.state.infoBirthDatePatients}</h5>   
                                                    <h5 className="form-control"><b>Provincia: </b>{this.state.infoProvincePatients}</h5>   
                                                    <h5 className="form-control"><b>Distrito: </b>{this.state.infoDistritoPatients}</h5>   
                                                    <h5 className="form-control"><b>Direccion: </b>{this.state.infoAddressPatients}</h5>   
                                                </CardBody>
                                            </Card>    
                                        </Collapse>    
                                    </FormGroup>                                    
                                    <FormGroup className="col-sm-6">                                                                 
                                        <Label for="enlace" >Referido:</Label>
                                        <div className={this.state.divReferidoError}>
                                            <Select isSearchable="true" isDisabled={this.state.varDisabled} name="enlace" value={this.state.referidoOption} onChange={this.handleChangeSelectReferido} options={this.state.arrayReferred} />
                                        </div>
                                        <div className="errorSelect">{this.state.referidoError}</div>                                                                
                                    </FormGroup>
                                    <FormGroup className="top form-group col-sm-6">                                                                 
                                        <Label for="enlace">Especifique:</Label>
                                        <div className={this.state.divEspecifiqueError}>
                                            <Select isSearchable="true" isDisabled={this.state.varDisabled} name="enlace" value={this.state.especifiqueOption} onChange={this.handleChangeSelectEspecifique} options={this.state.arrayEspecifique} />
                                        </div>
                                        <div className="errorSelect">{this.state.especifiqueError}</div>                                                                
                                    </FormGroup>    
                                    <FormGroup className="col-sm-12">                                                                 
                                        <div align="center" style={{display: "block"}}><h4 className="h4Div">Servicios</h4></div>
                                    </FormGroup>

                                    <FormGroup className="col-sm-12">
                                        <Collapse isOpen={this.state.collapseServicios}>
                                            <Card >
                                                <CardBody >
                                                    <div className="row">                                             
                                                        <FormGroup className="top form-group col-sm-6">                                                                 
                                                            <Label for="enlace">Servicio:</Label>
                                                                <div className={this.state.divServicioError} >
                                                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="enlace" value={this.state.servicioOption} onChange={this.handleChangeSelectServicio} options={this.state.arrayServices} />
                                                                </div>
                                                                <div className="errorSelect">{this.state.servicioError}</div>                                                                
                                                        </FormGroup>
                                                         <FormGroup className="top form-group col-sm-6">                                                                 
                                                            <Label for="enlace" style={{color: "#FFFFFF"}}>-</Label>                                        
                                                            <div>
                                                                <Button title="Agregar Servicio" className={this.state.ocultarBotones} disabled={this.state.varDisabled} onClick={this.handleSubmitServicios}><FaPlusCircle size="1em"/></Button>&nbsp;
                                                            </div>
                                                        </FormGroup>
                                                        <FormGroup className="top form-group col-sm-12"> 
                                                             <div className="">
                                                                <Table hover responsive borderless>
                                                                    <thead className="thead-light">
                                                                        <tr>
                                                                            <th style={{width:"10%"}}>Nro</th>
                                                                            <th style={{width:"25%"}}>Servicio</th>                                                        
                                                                            <th style={{width:"15%"}}>Monto/Desc</th>                                                        
                                                                            <th style={{width:"15%"}}>Descuento</th>                                                        
                                                                            <th style={{width:"25%"}}>Autorizado por</th>                                                        
                                                                            <th style={{width:"10%"}}>Acciones</th>                                                        
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                       {
                                                                            this.state.listServices != null && 
                                                                            this.state.listServices.map((list, i) => {                                                                                                                                                                      
                                                                                return (
                                                                                    <tr>
                                                                                        <td scope="row" style={{width:"10%"}}>{i+1}</td>
                                                                                        <td style={{width:"25%"}}>{list.nameServices}</td>                                                                                                                                                    
                                                                                        <td style={{width:"15%"}}>{this.number_format(list.montoServices, 2)} {this.state.currentSymbol}</td>                                                                                                                                                                                                                                                
                                                                                        <td style={{width:"15%"}}>{this.number_format(list.montoDescuentoServices, 2)}</td> 
                                                                                        <td style={{width:"25%"}}>{list.autorizadoPor}</td> 
                                                                                        <td style={{width:"10%"}}>
                                                                                            <a className="text-danger" title="Eliminar Servicio" onClick={() => { this.deleteRegisterTable(1, i, list.montoServices); }} key={i}><FaMinusCircle /></a>&nbsp;&nbsp; 
                                                                                        </td> 
                                                                                    </tr>   
                                                                                )

                                                                            })
                                                                        
                                                                        }
                                                                    </tbody>
                                                                </Table>
                                                            </div>     
                                                        </FormGroup>
                                                    </div>    
                                                </CardBody>
                                            </Card>    
                                        </Collapse>                                    
                                    </FormGroup>   

                                    <FormGroup className="col-sm-12">                                                                 
                                        <div align="center" style={{display: "block"}}><h4 className="h4Div">Forma de Pago</h4></div>
                                    </FormGroup>

                                    <FormGroup className="top form-group col-sm-12">                                    
                                        <Collapse isOpen={this.state.collapseServicios}>
                                            <Card >
                                                <CardBody >
                                                    <div className="row">                                
                                                        <FormGroup className="col-sm-6">                                                                 
                                                            <Label for="formaPago">Forma de Pago:</Label>
                                                            <div className={this.state.divFormaPagoError}>
                                                                <Select isSearchable="true" isDisabled={this.state.varDisabled} name="formaPago" value={this.state.formaPagoOption} onChange={this.handleChangeSelectFormaPago} options={this.state.arrayFormaPago} />
                                                            </div>
                                                            <div className="errorSelect">{this.state.formaPagoError}</div>                                                                
                                                        </FormGroup>     
                                                        <FormGroup className="col-sm-6">                                                                 
                                                            <Label for="tipoPago">Tipo de Pago:</Label>
                                                            <div className={this.state.divTipoPagoError}>
                                                                <Select isSearchable="true" isDisabled={this.state.varDisabled} name="tipoPago" value={this.state.tipoPagoOption} onChange={this.handleChangeSelectTipoPago} options={this.state.arrayTipoPago} />
                                                            </div>
                                                            <div className="errorSelect">{this.state.tipoPagoError}</div>                                                                
                                                        </FormGroup>   
                                                        <FormGroup className= "col-sm-6 ">                                                                 
                                                            <Label for="monto">Monto</Label>
                                                            <div className={this.state.montoInvalid}>
                                                            <InputGroup>                                                            
                                                                <InputGroupAddon addonType="prepend">{this.state.currentSymbol}</InputGroupAddon>
                                                                <Input disabled={this.state.varDisabled} name="monto" id="monto" onKeyUp={this.handlekeyMonto} onChange={this.handleChange} value={this.state.monto} type="text" placeholder="Monto" onKeyPress={this.enterDecimal} onPaste = "false"  onBlur ={this.eventoBlur} onFocus = {this.eventoFocus}/>                                                                                                                           
                                                            </InputGroup>                                                            
                                                            </div>    
                                                            <div className="errorSelect">{this.state.montoError}</div> 
                                                        </FormGroup>
                                                        <FormGroup className="col-sm-6">                                                                 
                                                            <Label for="nroOperacion">Nro Operacion:</Label>
                                                            <div className={this.state.nroOperacionInvalid}>
                                                                <Input disabled={this.state.varDisabled}  name="nroOperacion" id="nroOperacion" onKeyUp={this.handlekeyNroOperacion} onChange={this.handleChange} value={this.state.nroOperacion} type="text" placeholder="Nro Operacion" />
                                                            </div>
                                                            <div className="errorSelect">{this.state.nroOperacionError}</div>                                                                
                                                        </FormGroup> 
                                                        <FormGroup className="col-sm-6">                                                                 
                                                            <Label for="bancoEmisor">Banco Emisor:</Label>
                                                            <div className={this.state.divBancoEmisorError}>
                                                                <Select isSearchable="true" isDisabled={this.state.varDisabled} name="bancoEmisor" value={this.state.bancoEmisorOption} onChange={this.handleChangeSelectBancoEmisor} options={this.state.arrayBancoEmisor} />
                                                            </div>
                                                            <div className="errorSelect">{this.state.bancoEmisorError}</div>                                                                
                                                        </FormGroup>   
                                                        <FormGroup className="col-sm-6">                                                                 
                                                            <Label for="bancoReceptor">Banco Receptor:</Label>
                                                            <div className={this.state.divBancoReceptorError}>
                                                                <Select isSearchable="true" isDisabled={this.state.varDisabled} name="bancoReceptor" value={this.state.bancoReceptorOption} onChange={this.handleChangeSelectBancoReceptor} options={this.state.arrayBancoReceptor} />
                                                            </div>
                                                            <div className="errorSelect">{this.state.bancoReceptorError}</div>                                                                
                                                        </FormGroup>  
                                                         <FormGroup className="col-sm-6">                                                                 
                                                            <div>
                                                                <Button color="primary" onClick={this.handleSubmitFormaPago} style={{ marginBottom: '1rem' }}>Agregar</Button>
                                                            </div>
                                                        </FormGroup> 
                                                        <FormGroup className="top form-group col-sm-12"> 
                                                             <div className="">
                                                                <Table hover responsive borderless>
                                                                    <thead className="thead-light">
                                                                        <tr>
                                                                            <th style={{width:"10%"}}>Nro</th>
                                                                            <th style={{width:"20%"}}>Forma Pago</th>                                                        
                                                                            <th style={{width:"10%"}}>Monto</th>                                                        
                                                                            <th style={{width:"20%"}}>Banco Emisor</th>                                                        
                                                                            <th style={{width:"20%"}}>Banco Receptor</th>                                                        
                                                                            <th style={{width:"10%"}}>Referencia</th>                                                        
                                                                            <th style={{width:"10%"}}>Acciones</th>                                                        
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                       {
                                                                            this.state.listFormaPago != null && 
                                                                            this.state.listFormaPago.map((list, i) => {                                                                                                                                                                      
                                                                                return (
                                                                                    <tr>
                                                                                        <td scope="row" style={{width:"10%"}}>{i+1}</td>
                                                                                        <td style={{width:"20%"}}>{list.formaPago.label}</td>                                                                                                                                                    
                                                                                        <td style={{width:"10%"}}>{list.pago}</td>                                                                                                                                                                                                                                                
                                                                                        <td style={{width:"20%"}}>{list.bancoEmisor}</td> 
                                                                                        <td style={{width:"20%"}}>{list.bancoReceptor}</td> 
                                                                                        <td style={{width:"10%"}}>{list.nroOperacion}</td> 
                                                                                        <td style={{width:"10%"}}>
                                                                                            <a className="text-danger" title="Eliminar Servicio" onClick={() => { this.deleteRegisterTable(2, i, list.pago); }} key={i}><FaMinusCircle /></a>&nbsp;&nbsp; 
                                                                                        </td> 
                                                                                    </tr>   
                                                                                )

                                                                            })
                                                                        
                                                                        }
                                                                    </tbody>
                                                                </Table>
                                                            </div>     
                                                        </FormGroup>   
                                                    </div>                                                     
                                                </CardBody>
                                            </Card>    
                                        </Collapse>                                    
                                    </FormGroup>  
                                </div>

                                <div className="" align="right">    
                                    <FormGroup className= "col-sm-6 ">                                                                 
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                              <InputGroupText>Sub Total</InputGroupText>                                              
                                            </InputGroupAddon>
                                            <Input readonly="true" name="subTotal" id="subTotal" onChange={this.handleChange} value={this.state.subTotal} type="text" />                                                             
                                            <InputGroupAddon addonType="append">{this.state.currentSymbol}</InputGroupAddon>
                                        </InputGroup>                                        
                                    </FormGroup>
                                    <FormGroup className= "col-sm-6 ">                                                                 
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                              <InputGroupText>IGV</InputGroupText>                                              
                                            </InputGroupAddon>
                                            <Input disabled="true" name="igv" id="igv" onChange={this.handleChange} value={this.state.igv} type="text" />                                                             
                                            <InputGroupAddon addonType="append">{this.state.currentSymbol}</InputGroupAddon>
                                        </InputGroup>                                        
                                    </FormGroup>                                           
                                    <FormGroup className= "col-sm-6 ">                                                                 
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                              <InputGroupText>Total</InputGroupText>                                              
                                            </InputGroupAddon>
                                            <Input disabled="true" name="total" id="total" onChange={this.handleChange} value={this.state.total} type="text" />                                                             
                                            <InputGroupAddon addonType="append">{this.state.currentSymbol}</InputGroupAddon>
                                        </InputGroup>                                        
                                    </FormGroup>                                           
                                    <FormGroup className= "col-sm-6 ">                                                                 
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                              <InputGroupText>Por pagar</InputGroupText>                                              
                                            </InputGroupAddon>
                                            <Input disabled="true" name="porPagar" id="porPagar" onChange={this.handleChange} value={this.state.porPagar} type="text" />                                                             
                                            <InputGroupAddon addonType="append">{this.state.currentSymbol}</InputGroupAddon>
                                        </InputGroup>                                        
                                    </FormGroup>                                           
                                </div>   
                                </div>
                                <div> 
                                    <Modal isOpen={this.state.modalRegistrarPaciente} toggle={this.toggleRegistrarPaciente} className="Modal">
                                    <div  className={this.state.divLoadingModal} style={{padding:"1%"}}><img src="assets/loader.gif" width="30%"  /></div>
                                    <div className={this.state.divContainerModal}>
                                        <ModalHeader toggle={this.cerrarModalRegistrarPacientes}>{this.state.modalHeaderRegistrarPaciente}</ModalHeader>
                                        <ModalBody className="Scroll">    
                                        <div className="row">  
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="dni">DNI</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <Input type="select" name="typeIdentity" id="typeIdentity" onChange={event =>this.typeIdentity(event)} >                                                            
                                                        {
                                                            this.state.arrayTypeIdentity != null && 
                                                            this.state.arrayTypeIdentity.map((typeIdentity, i) => {       

                                                                return(
                                                                    <option value={typeIdentity.value}  selected>{typeIdentity.label}</option>
                                                                )
                                                                
                                                            })
                                                        } 
                                                        </Input>
                                                    </InputGroupAddon>&nbsp;&nbsp;
                                                    <Input disabled={this.state.varDisabled} invalid={this.state.dniInvalid} name="dni" id="dni" onKeyUp={this.handlekeyDni} onChange={this.handleChange} value={this.state.dni} type="text" placeholder="DNI" />                                                    
                                                    <FormFeedback tooltip>{this.state.dniError}</FormFeedback>                                                                                                                                                                     
                                                </InputGroup> 

                                                
                                            </FormGroup>  
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="estadoCivil">Estado Civil</Label>
                                                <div className={this.state.divSelectEstadoCivil}>
                                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="estadoCivil" value={this.state.selectedEstadoCivilOption} onChange={this.handleChangeSelectEstadoCivil} options={this.state.arrayEstadoCivil} />
                                                </div>
                                                <div className="errorSelect">{this.state.estadoCivilError}</div>                                                                
                                            </FormGroup>     
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="nombres">Nombres:</Label>
                                                <Input disabled={this.state.varDisabled} invalid={this.state.nombresInvalid} name="nombres" id="nombres" onKeyUp={this.handlekeyNombres} onChange={this.handleChange} value={this.state.nombres} type="text" placeholder="Nombres" />
                                                <FormFeedback tooltip>{this.state.nombresError}</FormFeedback>                                                                                                                                                            
                                            </FormGroup> 
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="apellidos">Apellidos:</Label>
                                                <Input disabled={this.state.varDisabled} invalid={this.state.apellidosInvalid} name="apellidos" id="apellidos" onKeyUp={this.handlekeyApellidos} onChange={this.handleChange} value={this.state.apellidos} type="text" placeholder="Apellidos" />
                                                <FormFeedback tooltip>{this.state.apellidosError}</FormFeedback>                                                                                                                                                            
                                            </FormGroup> 
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="sexo">Sexo</Label>
                                                <div className={this.state.divSelectSexo}>
                                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="categoria" value={this.state.selectedSexoOption} onChange={this.handleChangeSelectSexo} options={this.state.arraySex} />
                                                </div>
                                                <div className="errorSelect">{this.state.sexoError}</div>                                                                
                                            </FormGroup>     
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="emails">Fecha de Nacimiento</Label>
                                                <div className={this.state.divFechaNacimiento}>
                                                    <DatePicker
                                                        selected={this.state.startDate}
                                                        onChange={this.handleChangebirthDate}
                                                        dateFormat="dd-MM-yyyy"       
                                                        isClearable={true}    
                                                        showYearDropdown
                                                        dateFormatCalendar="MMMM"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="errorSelect">{this.state.fechaNacimientoError}</div>                                                                
                                            </FormGroup>                                       
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="telefonos">Telefonos</Label>
                                                <div className={this.state.divTagsTelefonos}>
                                                    <TagsInput value={this.state.tagsTelefonos} onChange={this.handleChangeTagsTelefonos} />
                                                </div>
                                                <div className="errorSelect">{this.state.tagsTelefonosError}</div>                                                                
                                            </FormGroup>
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="emails">Emails</Label>
                                                <div className={this.state.divTagsEmails}>
                                                    <TagsInput value={this.state.tagsEmails} onChange={this.handleChangeTagsEmails} />
                                                </div>
                                                <div className="errorSelect">{this.state.tagsEmailsError}</div>                                                                
                                            </FormGroup>                                            
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="provincia">Provincia</Label>
                                                <div className={this.state.divSelectProvincia}>
                                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="provincia" value={this.state.selectedOptionProvincia} onChange={this.handleChangeSelectProvincia} options={this.state.arrayProvincia} />
                                                </div>
                                                <div className="errorSelect">{this.state.provinciaError}</div>                                                                
                                            </FormGroup>
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="distrito">Distrito</Label>
                                                <div className={this.state.divSelectDistrito}>
                                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="distrito" value={this.state.selectedOptionDistrito} onChange={this.handleChangeSelectDistrito} options={this.state.arrayDistrito} />
                                                </div>
                                                <div className="errorSelect">{this.state.distritoError}</div>                                                                
                                            </FormGroup>
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="direccion">Direccion:</Label>
                                                <Input disabled={this.state.varDisabled} invalid={this.state.direccionInvalid} name="direccion" id="direccion" onKeyUp={this.handlekeyDireccion} onChange={this.handleChange} value={this.state.direccion} type="textarea" placeholder="Direccion" />
                                                <FormFeedback tooltip>{this.state.direccionError}</FormFeedback>                                                                                                                                                            
                                            </FormGroup> 
                                            <FormGroup className="top form-group col-sm-6">                                                                 
                                                <Label for="direccion">Foto:</Label>
                                                <br />
                                                <InputGroup>
                                                <Input className="top" type="file" accept="image/*" invalid={this.state.fotoInvalid} valid={this.state.fotoValid} onChange={this.fileHandlerFoto} />
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
                                        </div>                                                                    
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button className={this.state.buttonSave} color="primary" onClick={this.handleSavePatient}>{this.state.modalFooterButton}</Button>
                                            <Button className={this.state.buttonCancel} color="danger" onClick={this.cerrarModalRegistrarPacientes}>Cancelar</Button>                                                                                                              
                                            <Button className={this.state.buttonCancel} color="danger" onClick={this.prueba}>Cancelar</Button>
                                        </ModalFooter>  
                                        </div>                      
                                    </Modal>
                                </div>                                                         
                            </div>   
                        </form>                                    
                        </div>
                    </TabPane>    
                    <TabPane tabId="2">            
                        <div className="container">
                            
                        </div>
                    </TabPane>        
                    <TabPane tabId="3">            
                        <div className="container">
                            
                        </div>
                    </TabPane>        
                    </TabContent>                      
                    <Modal isOpen={this.state.modalAlert} toggle={this.toggleAlert} className="ModalAlert">
                        <ModalHeader></ModalHeader>
                        <ModalBody>
                            <div color="success" className={this.state.alertCheck}><FaCheckCircle size="4em"/></div>
                            <div color="success" className={this.state.alertExc}><FaExclamationCircle size="4em"/></div>                                    
                            <h4><b>{this.state.bodyAlert}</b></h4>
                        </ModalBody>
                        <ModalFooter>
                            <Button className={this.state.buttonAceptarAlert} color="primary" onClick={this.aceptarDeleteRegister}>Aceptar</Button>
                            <Button className={this.state.buttonCancelAlert} color="danger" onClick={this.cancelarDeleteRegister}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>   
                    </div>    
                    </CardBody>
                    </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Ventas;
