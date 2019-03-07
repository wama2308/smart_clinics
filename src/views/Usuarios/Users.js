import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import Select from 'react-select';
import axios from 'axios';
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
import './Users.css'
import './loading.css'
import PopoverItem from '../../components/PopoverItem.js';
import { datosConexion } from '../../components/Conexion.js'
import classnames from 'classnames';
import jstz from 'jstz';
import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar} from 'react-icons/fa';


class Usuarios extends Component {

    constructor(props) {
        super(props);
        
        this.toggle = this.toggle.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
        this.toggleInfoEmail = this.toggleInfoEmail.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.cerrarModalInfoEmail = this.cerrarModalInfoEmail.bind(this);
        this.aceptarModalInfoEmail = this.aceptarModalInfoEmail.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeNuevoRol = this.onChangeNuevoRol.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitTable = this.handleSubmitTable.bind(this);
        this.handleSubmitUsers = this.handleSubmitUsers.bind(this);
        this.handlekey = this.handlekey.bind(this);
        this.loadRoles = this.loadRoles.bind(this);
        this.cerrarModalUsers = this.cerrarModalUsers.bind(this);
        this.prueba = this.prueba.bind(this);        
        this.pruebaOnBlur = this.pruebaOnBlur.bind(this);                
        this.deleteListBranchOffice = this.deleteListBranchOffice.bind(this);                
        this.aceptarDeleteListBranchOffice = this.aceptarDeleteListBranchOffice.bind(this);                
        this.cancelarDeleteListBranchOffice = this.cancelarDeleteListBranchOffice.bind(this);                
        this.deleteUser = this.deleteUser.bind(this);                
        this.aceptarDeleteUser = this.aceptarDeleteUser.bind(this);      
        this.toggleModulosPermisos = this.toggleModulosPermisos.bind(this);  
        this.toggleTollTipPermisos = this.toggleTollTipPermisos.bind(this);  
        this.toggleNuevoRol = this.toggleNuevoRol.bind(this);  
        this.toggleTollNuevoRol = this.toggleTollNuevoRol.bind(this);    
        this.handleCancelarNuevoRol = this.handleCancelarNuevoRol.bind(this);    
        this.handleSubmitNuevoRol = this.handleSubmitNuevoRol.bind(this);    
        this.toggleViewRol = this.toggleViewRol.bind(this);    
        this.toggleOpenPopover = this.toggleOpenPopover.bind(this);            
        this.toggleClosePopover = this.toggleClosePopover.bind(this); 

        let valueConexion = "";
        let arrayConexion = Object.values(datosConexion);
        arrayConexion.forEach(function (elemento, indice, array) {
            if(indice === 0){
                valueConexion = elemento;
            }            
        });        

        const timezone = jstz.determine();

        this.state = {
            activeTab: "1",
            modal: false,
            modalAlert: false,
            rol:'',
            selected: [],
            selectedNuevoRol: [],
            modules: [],
            onlyModules: [],
            rolInvalid: false,
            rolError: '',
            selectedInvalid: 0,
            selectedError: '',           
            divListBox: '',
            divLoading:'sizeDiv show',
            divContainer:'hide',
            divLoadingTable:'row hide',
            divContainerTable:'row hide',
            roles: [],
            buttonSave: 'hide', 
            buttonCancel: 'hide',
            varDisabled: '', 
            modalHeader: '', 
            modalFooterButton: '', 
            opcionForm: '',
            posEdit: '',
            /*ESTADOS PARA LOS USUARIOS*/
            modalUsers: false,
            email: '',
            emailInvalid: false,
            emailError: '',
            sucursal: [],
            sucursalExist: '',
            divSelectSucursal: '',
            sucursalError: '',
            rolSelect: [],
            divSelectRol: '',
            rolSelectError: '',
            modalHeaderUsers: '',
            selectedSucursalOption: null,
            selectedRolOption: null,
            alertCheck: 'hide check',
            alertExc: 'hide warning',
            bodyAlert: '',
            selectValidRol: 0,
            usersNoMasters: [],
            infoEmail: [],
            infoMedicalCenterAlert: [],
            infoBrancOfficeAlert: [],
            infoPermissionAlert: [],
            modalInfoEmail: false,
            focus:false,
            estadoUser: '',
            listSucursales: [],
            buttonAceptarAlert: 'hide', 
            buttonAceptarAlertDeleteUser: 'hide', 
            buttonCancelAlert: 'hide',
            posDeleteBranchOffice: '',
            pruebaListSucursales: [],
            emailExist: 0,
            headerModalEmailInfo: '',
            opcionToggleAlert: 0,
            idDeleteUser: '',
            disabledLink: '',
            idUpdateUser: '',
            collapseModulosRoles: false,
            toolTipPermisos: false,
            collapseNuevoRol: false,
            toolTipNuevoRol: false,  
            selectedInvalidNuevoRol: 0, 
            divListBoxNuevoRol: '',
            selectedErrorNuevoRol: '',
            rolSelectErrorNuevoRol: '',
            divSelectRolNuevoRol: '',    
            rolIdView: '',
            ocultarBotones: '',
            colorSpan: 'colorSpan',
            popoverOpen: false,      
            emailConsulta: '',     
            loadRolSave: [],   
            imageButton: <FaPlusCircle size="1em"/>,
            timeZ: timezone.name(),
            //conexion: 'http://localhost:8000/api/',
            conexion: valueConexion,            
                         
        };        
    }
    
    componentDidMount(){
        this.setState({
            divContainerTable: "row hide",
            divLoadingTable: "row show",            
        })

        this.loadUsersNoMaster();
        this.loadRoles();           
    }    

    loadRoles(){

        const token = window.localStorage.getItem('id_token');
        const apiLoadRoles = (this.state.conexion+"LoadRoles");
        const datos={
            headers:
            {'access-token' : token }
        }

        axios.get(apiLoadRoles, datos)
        .then((res) => {
            //console.log(res.data.roles)
            this.setState({
                roles: res.data.roles                
            }) 
            this.setState({
                divContainerTable: "row show",
                divLoadingTable: "row hide",            
            })   

        })
        .catch((error) => {
            console.log(error);
        });
    }

    handlekey= event =>{
        this.setState({
            rolError: "",
            rolInvalid: false,
            emailError: '',
            emailInvalid: false
        })
    }
    
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }

    pruebaOnBlur(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });     
        const apiValidateEmailUserNoMaster = this.state.conexion+"ValidateEmailUserNoMaster";
        const token = window.localStorage.getItem('id_token');
        const datos={
                headers:
                {'access-token' : token }
        }

        axios({
            method: 'post',
            url: apiValidateEmailUserNoMaster,
            data: {
                email: value
            },
            headers:
            {'access-token' : token}
        }).then((res)=>{
            console.log("Si existen datos asociados a este email");
            this.setState({
                infoEmail: res.data.infoEmail,
                estadoUser: res.data.estado,
                emailExist: res.data.exist,
                emailConsulta: value,
                
            });
            if(this.state.estadoUser === 0){

                this.setState({
                    alertCheck: 'hide check',
                    alertExc: 'show warning',
                    buttonAceptarAlert: 'hide',
                    buttonAceptarAlertDeleteUser: 'hide',
                    buttonCancelAlert: 'hide',
                    bodyAlert: '¡Este usuario se encuentra inactivo!',
                    email: '',
                    
                });
                
                this.toggleAlert();                

                setTimeout(() => {

                    this.cerrarModalAlert();
                    document.getElementById("email").focus();                
                        
                }, 3000);                                
                
            }else{
                if(this.state.emailExist === 1){
                    this.setState({                    
                        headerModalEmailInfo: '¡Este email ya esta registrado en este centro medico!',
                    });
                }
                else{
                    this.setState({                    
                        headerModalEmailInfo: '¡Este email esta siendo utilizado de la siguiente manera!',
                    });   
                }

                this.toggleInfoEmail();    

            }

        }).catch((res)=>{
            console.log("No existen datos asociados a este email");
        });
    }
    
    handleChange_ = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
                [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggle(opcion, pos) {
        if(opcion === "1")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
            })
            const apiLoadPermitsMedicalCenter = this.state.conexion+"LoadPermitsMedicalCenter";
            const apiLoadModulesMedicalCenter = this.state.conexion+"LoadModulesMedicalCenter";
            const token = window.localStorage.getItem('id_token');

            const datos={
                    headers:
                    {'access-token' : token }
            }
            axios.get(apiLoadPermitsMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                modules: res.data,
                                buttonSave: 'show',
                                buttonCancel: 'show',
                                varDisabled: '',
                                rolInvalid:false, 
                                divListBox: "",
                                selectedError: "",
                                divLoading: 'sizeDiv hide',
                                divContainer: 'container show',
                                modalHeader: 'Registrar Rol',
                                modalFooterButton: 'Guardar',
                                opcionForm: 1
                                
                        })                    
                        //console.log(this.state.modules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los permisos del medical center", error)
                });

            axios.get(apiLoadModulesMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                onlyModules: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los modulos del medical center", error)
                });    
        
            this.setState({
                modal: !this.state.modal
               
            });    
        }   
        else if(opcion === "2")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
            })
            const apiLoadRolId = this.state.conexion+"LoadRolId";
            const apiLoadPermitsMedicalCenter = this.state.conexion+"LoadPermitsMedicalCenter";
            const apiLoadModulesMedicalCenter = this.state.conexion+"LoadModulesMedicalCenter";
            const token = window.localStorage.getItem('id_token');

            const datos={
                headers:
                {'access-token' : token }
            }

            axios({
                method: 'post',
                url: apiLoadRolId,
                data: {
                    posicion: pos
                },
                headers:
                {'access-token' : token}
            }).then((res)=>{
                
                this.setState({
                    rol: res.data.rol,
                    selected: res.data.modules
                });
                
            }).catch((res)=>{
                console.log("Problemas al consultar los datos del rol");
            });

            axios.get(apiLoadPermitsMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                modules: res.data,
                                buttonSave: 'hide',
                                buttonCancel: 'show',
                                varDisabled: 'true',
                                rolInvalid:false, 
                                selectedError: "",                                
                                divListBox: "",
                                selectedError: "",
                                modalHeader: 'Ver Rol', 
                                modal: !this.state.modal,                                
                        })                    
                        setTimeout(() => {
                            this.setState({
                                divLoading: 'sizeDiv hide',
                                divContainer: 'container show',
                            });                          
                        }, 2000);  
                        //console.log(this.state.modules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los permisos del medical center", error)
                });

            axios.get(apiLoadModulesMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                onlyModules: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los modulos del medical center", error)
                });            
             
            
        } 
        else if(opcion === "3")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
            })
            const apiLoadRolId = this.state.conexion+"LoadRolId";
            const apiLoadPermitsMedicalCenter = this.state.conexion+"LoadPermitsMedicalCenter";
            const apiLoadModulesMedicalCenter = this.state.conexion+"LoadModulesMedicalCenter";
            const token = window.localStorage.getItem('id_token');

            const datos={
                    headers:
                    {'access-token' : token }
            }

            axios({
                method: 'post',
                url: apiLoadRolId,
                data: {
                    posicion: pos
                },
                headers:
                {'access-token' : token}
            }).then((res)=>{
                
                this.setState({
                    rol: res.data.rol,
                    selected: res.data.modules
                });
                
            }).catch((res)=>{
                console.log("Problemas al consultar los datos del rol");
            });

            axios.get(apiLoadPermitsMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                modules: res.data,
                                buttonSave: 'show',
                                buttonCancel: 'show',
                                varDisabled: '',
                                rolInvalid:false, 
                                selectedError: "",
                                selectedInvalid: 1,                                 
                                divListBox: "",
                                selectedError: "",
                                modalHeader: 'Editar Rol',
                                modalFooterButton: 'Editar',
                                opcionForm: 2,
                                posEdit: pos, 
                                modal: !this.state.modal,
                        })       
                        setTimeout(() => {
                            this.setState({
                                divLoading: 'sizeDiv hide',
                                divContainer: 'container show',
                            });                          
                        }, 2000);              
                        //console.log(this.state.modules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los permisos del medical center", error)
                });

            axios.get(apiLoadModulesMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                onlyModules: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los modulos del medical center", error)
                });           
            
        } 
        else if(opcion === "4")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
            })
            const apiLoadPermitsMedicalCenter = this.state.conexion+"LoadPermitsMedicalCenter";
            const apiLoadModulesMedicalCenter = this.state.conexion+"LoadModulesMedicalCenter";
            const token = window.localStorage.getItem('id_token');

            const datos={
                    headers:
                    {'access-token' : token }
            }
            axios.get(apiLoadPermitsMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                modules: res.data,
                                buttonSave: 'show',
                                buttonCancel: 'show',
                                varDisabled: '',
                                rolInvalid:false, 
                                divListBox: "",
                                selectedError: "",
                                modalHeader: 'Registrar Rol',
                                modalFooterButton: 'Guardar',
                                opcionForm: 3,
                                modal: !this.state.modal,
                        })      
                        setTimeout(() => {
                            this.setState({
                                divLoading: 'sizeDiv hide',
                                divContainer: 'container show',
                            });                          
                        }, 2000);    
                        //console.log(this.state.modules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los permisos del medical center", error)
                });

            axios.get(apiLoadModulesMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                onlyModules: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los modulos del medical center", error)
                });           
            
        }
    }   

    toggleAlert() {
        this.setState({
            modalAlert: !this.state.modalAlert           
        });    
    }
    
    cerrarModal(){
        this.setState({
            divContainer: 'container show',
            modal: false,
            rol: '',
            selected: [],
            varDisabled: '',
            buttonSave: 'show'
        });
    }

    cerrarModalAlert(){
        this.setState({
          modalAlert: false          
        });
    }    
    
    onChange(selected) {
        /*console.log(selected);*/
        if(Object.keys(selected).length === 0 )
        {
            this.setState({ 
                selected, 
                selectedInvalid: 0, 
                divListBox: "borderColor",
                selectedError: "¡Seleccione los permisos!" 
            });
        }
        else
        {
            this.setState({ 
                selected, 
                selectedInvalid: 1, 
                divListBox: "",
                selectedError: "",
                rolSelectError: '',
                divSelectRol: ''       
            });
        }              
    }  

    onChangeNuevoRol(selectedNuevoRol) {
        if(Object.keys(selectedNuevoRol).length === 0 )
        {
            this.setState({                 
                selectedNuevoRol, 
                selectedInvalidNuevoRol: 0, 
                divListBoxNuevoRol: "borderColor",
                selectedErrorNuevoRol: "¡Seleccione los permisos!" 
            });
        }
        else
        {
            this.setState({ 
                selectedNuevoRol, 
                selectedInvalidNuevoRol: 1, 
                divListBoxNuevoRol: "",
                selectedErrorNuevoRol: "",
                rolSelectErrorNuevoRol: '',
                divSelectRolNuevoRol: ''       
            });
        }                
    }  
    
    validate = () => {
        
        let rolInvalid = false;
        let rolError = "";
        let selectedInvalid = 0;
        let selectedError = "";
        let divListBox = "";
        
        if (this.state.rol === "") {
            
            rolError = "¡Ingrese el rol!";
            rolInvalid =true;

        }
        
        if (this.state.selectedInvalid === 0) {

            divListBox = "borderColor";
            selectedError = "¡Seleccione los permisos!";
            selectedInvalid = 0;

        }        
        
        if (rolError || selectedError) {
            
            this.setState({ 
                    rolInvalid,                         
                    rolError, 
                    selectedInvalid, 
                    selectedError,
                    divListBox
            });                
           
            return false;

        }
        
        return true;
    };

    validateNuevoRol = () => {
        
        let rolInvalid = false;
        let rolError = "";
        let selectedInvalidNuevoRol = false;
        let selectedErrorNuevoRol = "";
        let divListBoxNuevoRol = "";
        
        if (this.state.rol === "") {
            
            rolError = "¡Ingrese el rol!";
            rolInvalid =true;

        }
        
        if (this.state.selectedInvalidNuevoRol === 0) {

            divListBoxNuevoRol = "borderColor";
            selectedErrorNuevoRol = "¡Seleccione los permisos!";
            selectedInvalidNuevoRol = 0;

        }        
        
        if (rolError || selectedErrorNuevoRol) {
            
            this.setState({ 
                    rolInvalid,                         
                    rolError, 
                    selectedInvalidNuevoRol, 
                    selectedErrorNuevoRol,
                    divListBoxNuevoRol
            });                
           
            return false;

        }
        
        return true;
    };
    
    handleSubmit = event => {
        
        event.preventDefault();
        const isValid = this.validate();        
        if (isValid) {      
            if(this.state.opcionForm === 1)
            {
                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })
                const apisaveRol = (this.state.conexion+"saveRol");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apisaveRol,
                    data: {
                        rol:this.state.rol,
                        selected: this.state.selected,
                        onlyModules: this.state.onlyModules,
                        timeZ:this.state.timeZ,
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    console.log("Operacion exitosa");                    
                    this.setState({ 
                        rolError:'', 
                        selectedError:'', 
                        rolInvalid:false, 
                        selectedInvalid: 0,
                        rol: '',                        
                        divListBox: "",
                        selectedError: "",
                        selected: [],
                        alertCheck: 'show check',
                        alertExc: 'hide warning',
                        bodyAlert: '¡Operacion Exitosa!',
                        buttonAceptarAlert: 'hide',
                        buttonAceptarAlertDeleteUser: 'hide',
                        buttonCancelAlert: 'hide',
                    });   
                    this.loadRoles();
                    this.toggleAlert();
                    this.cerrarModal();                               
                    setTimeout(() => {
                        this.cerrarModalAlert();
                    }, 1000);

                    this.setState({ 
                        divContainer: 'hide',
                        divLoading: 'sizeDiv hide',
                    })

                    })                    

                .catch((res)=>{
                    console.log("Error en la operacion");
                });
            }
            else if(this.state.opcionForm === 2)
            {                
                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })
                const apisaveRol = (this.state.conexion+"editRol");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apisaveRol,
                    data: {
                        posicion: this.state.posEdit,
                        rol:this.state.rol,
                        selected: this.state.selected,
                        onlyModules: this.state.onlyModules,
                        timeZ:this.state.timeZ,
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    console.log("Operacion exitosa");
                    this.setState({ 
                        rolError:'', 
                        selectedError:'', 
                        rolInvalid:false, 
                        selectedInvalid: 0,
                        rol: '',                        
                        divListBox: "",
                        selectedError: "",
                        selected: [],
                        alertCheck: 'show check',
                        alertExc: 'hide warning',
                        bodyAlert: '¡Operacion Exitosa!',
                        buttonAceptarAlert: 'hide',
                        buttonAceptarAlertDeleteUser: 'hide',
                        buttonCancelAlert: 'hide',
                    });   
                    this.loadRoles();
                    this.toggleAlert();
                    this.cerrarModal();                               
                    setTimeout(() => {
                        this.cerrarModalAlert();
                    }, 1000);

                    this.setState({ 
                        divContainer: 'hide',
                        divLoading: 'sizeDiv hide',
                    })

                    })                    

                .catch((res)=>{
                    console.log("Error en la operacion");
                });
            }
            else if(this.state.opcionForm === 3)
            {              
                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })  
                const apisaveRol = (this.state.conexion+"saveRol");
                const apiLoadSelectRoles = this.state.conexion+"LoadSelectRoles";
                const token = window.localStorage.getItem('id_token');

                const datos={
                    headers:
                    {'access-token' : token }
                }


                axios({
                    method: 'post',
                    url: apisaveRol,
                    data: {
                        rol:this.state.rol,
                        selected: this.state.selected,
                        onlyModules: this.state.onlyModules
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    console.log("Operacion exitosa");   

                    axios.get(apiLoadSelectRoles, datos)
                        .then((res) => {
                                this.setState({
                                        rolSelect: res.data
                                })                    
                                //console.log(this.state.onlyModules);
                        }).catch((error) => {
                            console.log("Error consultando la api para cargar los roles", error)
                        });  

                    this.setState({ 
                        rolError:'', 
                        selectedError:'', 
                        rolInvalid:false, 
                        selectedInvalid: 0,
                        rol: '',                        
                        divListBox: "",
                        selectedError: "",
                        selected: [],
                        alertCheck: 'show check',
                        alertExc: 'hide warning',
                        bodyAlert: '¡Operacion Exitosa!',
                        buttonAceptarAlert: 'hide',
                        buttonAceptarAlertDeleteUser: 'hide',
                        buttonCancelAlert: 'hide',
                    });   
                    this.loadRoles();
                    this.toggleAlert();
                    this.cerrarModal();                               
                    setTimeout(() => {
                        this.cerrarModalAlert();
                    }, 1000);

                    this.setState({ 
                        divContainer: 'hide',
                        divLoading: 'sizeDiv show',
                    })

                    })


                .catch((res)=>{
                    console.log("Error en la operacion");
                });
            }
        }
    };

    handleSubmitNuevoRol = event => {
        
        event.preventDefault();
        const isValid = this.validateNuevoRol();        
        if (isValid) {    
            
            const apisaveRol = (this.state.conexion+"saveRol");
            const apiLoadSelectRoles = this.state.conexion+"LoadSelectRoles";
            const token = window.localStorage.getItem('id_token');
            let variableRol = this.state.rol;
            const datos={
                headers:
                {'access-token' : token }
            }            
            axios({
                method: 'post',
                url: apisaveRol,
                data: {
                    rol:this.state.rol,
                    selected: this.state.selectedNuevoRol,
                    onlyModules: this.state.onlyModules
                },
                headers:
                {'access-token' : token}
            })
            .then((res)=>{
                console.log(res);   

                axios.get(apiLoadSelectRoles, datos)
                    .then((res) => {
                            this.setState({
                                    rolSelect: res.data
                            })                    
                            //console.log(this.state.onlyModules);
                    }).catch((error) => {
                        console.log("Error consultando la api para cargar los roles", error)
                    });  

                this.setState({                     
                    rolError:'', 
                    rolInvalid:false,                     
                    rol: '',
                    selectedInvalidNuevoRol: 0, 
                    divListBoxNuevoRol: "",
                    selectedErrorNuevoRol: "",
                    selectedNuevoRol: [],
                    alertCheck: 'show check',
                    alertExc: 'hide warning',
                    bodyAlert: '¡Operacion Exitosa!',
                    buttonAceptarAlert: 'hide',
                    buttonAceptarAlertDeleteUser: 'hide',
                    buttonCancelAlert: 'hide',
                    imageButton: <FaPlusCircle size="1em"/>,
                });   
                this.loadRoles();
                this.toggleAlert();
                this.cerrarModal();                               
                this.toggleViewRolName(variableRol);
                setTimeout(() => {
                    this.cerrarModalAlert();
                }, 1000);

                this.setState({                     
                    collapseNuevoRol: false,                                           
                })                
            })

            .catch((res)=>{
                console.log("Error en la operacion");
            });
        }
    }

    /*AQUI COMIENZA LA LOGICA DE LA PARTE DE USUARIOS*/
    toggleUsuarios(opcion, id) {
        if(opcion === "1")
        {
            const apiLoadPermitsMedicalCenter = this.state.conexion+"LoadPermitsMedicalCenter";
            const apiLoadModulesMedicalCenter = this.state.conexion+"LoadModulesMedicalCenter";
            const apiLoadSelectBranchOffices = this.state.conexion+"LoadSelectBranchOffices";
            const apiLoadSelectRoles = this.state.conexion+"LoadSelectRoles";
            const apiConsultBranchOffices = this.state.conexion+"consultBranchOffices";
            const token = window.localStorage.getItem('id_token');

            const datos={
                    headers:
                    {'access-token' : token }
            }

            
                axios.get(apiLoadPermitsMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                modules: res.data,
                                buttonSave: 'show',
                                buttonCancel: 'show',
                                varDisabled: '',
                                emailInvalid:false, 
                                emailError:'', 
                                sucursalInvalid:false, 
                                sucursalError:'',
                                rolSelectInvalid:false, 
                                rolSelectError:'',
                                rolInvalid: false,
                                rolError: '',
                                divListBoxNuevoRol: '',
                                selectedErrorNuevoRol: '',                                
                                modalHeaderUsers: 'Registro de Usuario',
                                modalFooterButton: 'Guardar',
                                opcionForm: 1,    
                                listSucursales: [],     
                                disabledLink: 'text-danger'
                                
                        })     
                        axios.get(apiConsultBranchOffices, datos)
                        .then((res) => {
                            this.setState({
                                    sucursalExist: res.data
                            })   
                            
                            if((this.state.sucursalExist === null) || (this.state.sucursalExist.length === 0))
                            {
                                this.setState({
                                    alertCheck: 'hide check',
                                    alertExc: 'show warning',
                                    bodyAlert: '¡Antes de registrar un usuario debe registrar una sucursal!',
                                    buttonAceptarAlert: 'hide',
                                    buttonAceptarAlertDeleteUser: 'hide',
                                    buttonCancelAlert: 'hide',
                                })    
                                this.toggleAlert();                                                     
                                setTimeout(() => {
                                    this.cerrarModalAlert();
                                }, 3000);
                                                            
                            }
                            else
                            {
                                this.setState({
                                    modalUsers: true,
                                    divLoading: 'sizeDiv show',
                                    divContainer: 'container hide',
                                })  
                                setTimeout(() => {
                                    this.setState({                                        
                                        divLoading: 'sizeDiv hide',
                                        divContainer: 'container show',
                                    })  
                                }, 2000);
                            }                 
                        //console.log(this.state.sucursalExist);
                        }).catch((error) => {
                            console.log("Error consultando la api para cargar las sucusales", error)
                        });      


                            //console.log(this.state.modules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los permisos del medical center", error)
                });

                axios.get(apiLoadModulesMedicalCenter, datos)
                    .then((res) => {
                            this.setState({
                                    onlyModules: res.data
                            })                    
                            //console.log(this.state.onlyModules);
                    }).catch((error) => {
                        console.log("Error consultando la api para consultar los modulos del medical center", error)
                    }); 

                axios.get(apiLoadSelectBranchOffices, datos)
                    .then((res) => {
                            this.setState({
                                    sucursal: res.data
                            })                    
                            //console.log(this.state.onlyModules);
                    }).catch((error) => {
                        console.log("Error consultando la api para cargar las sucusales", error)
                    });   

                axios.get(apiLoadSelectRoles, datos)
                    .then((res) => {                            
                            this.setState({
                                    rolSelect: res.data
                            })                    
                            //console.log(this.state.onlyModules);
                    }).catch((error) => {                        
                        console.log("Error consultando la api para cargar los roles", error)
                    });    
            
        }
        else if(opcion === "2")
        {
            const apiLoadIdUsersNoMaster = this.state.conexion+"LoadIdUsersNoMaster";
            const apiLoadPermitsMedicalCenter = this.state.conexion+"LoadPermitsMedicalCenter";
            const apiLoadModulesMedicalCenter = this.state.conexion+"LoadModulesMedicalCenter";
            const apiLoadSelectBranchOffices = this.state.conexion+"LoadSelectBranchOffices";
            const apiLoadSelectRoles = this.state.conexion+"LoadSelectRoles";            
            const token = window.localStorage.getItem('id_token');

            const datos={
                    headers:
                    {'access-token' : token }
            }

            axios({
                method: 'post',
                url: apiLoadIdUsersNoMaster,
                data: {
                    id: id
                },
                headers:
                {'access-token' : token}
            }).then((res)=>{
                
                this.setState({
                    listSucursales: res.data.sucursal,                    
                    email: res.data.email,                    
                });
                
            }).catch((res)=>{
                console.log("Problemas al consultar los datos del rol");
            });

            axios.get(apiLoadPermitsMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                opcionForm: 2,  
                                modules: res.data,
                                buttonSave: 'hide',
                                buttonCancel: 'show',
                                varDisabled: 'true',
                                emailInvalid:false, 
                                emailError:'', 
                                sucursalInvalid:false, 
                                sucursalError:'',
                                rolSelectInvalid:false, 
                                rolSelectError:'',
                                rolInvalid: false,
                                rolError: '',
                                divListBoxNuevoRol: '',
                                selectedErrorNuevoRol: '',
                                divLoading: 'sizeDiv show',
                                divContainer: 'container hide',
                                modalHeaderUsers: 'Ver Usuario',
                                modalFooterButton: 'Guardar',                                                                              
                                disabledLink: 'text-danger disablelinks',
                                ocultarBotones: 'hide',
                                
                        })                    
                        this.setState({
                            divLoading: 'sizeDiv hide',
                            divContainer: 'container show',
                        })
                        //console.log(this.state.modules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los permisos del medical center", error)
                });

            axios.get(apiLoadModulesMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                onlyModules: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los modulos del medical center", error)
                }); 

            axios.get(apiLoadSelectBranchOffices, datos)
                .then((res) => {
                        this.setState({
                                sucursal: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para cargar las sucusales", error)
                });   

            axios.get(apiLoadSelectRoles, datos)
                .then((res) => {
                        this.setState({
                                rolSelect: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para cargar los roles", error)
                });    

            setTimeout(() => {
                this.setState({
                    modalUsers: !this.state.modalUsers

                })
            }, 500)    
        
            /*this.setState({
                
                modalUsers: !this.state.modalUsers
               
            });  */

            
        }
        else if(opcion === "3")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
            })               
            const apiLoadIdUsersNoMaster = this.state.conexion+"LoadIdUsersNoMaster";
            const apiLoadPermitsMedicalCenter = this.state.conexion+"LoadPermitsMedicalCenter";
            const apiLoadModulesMedicalCenter = this.state.conexion+"LoadModulesMedicalCenter";
            const apiLoadSelectBranchOffices = this.state.conexion+"LoadSelectBranchOffices";
            const apiLoadSelectRoles = this.state.conexion+"LoadSelectRoles";            
            const token = window.localStorage.getItem('id_token');

            const datos={
                    headers:
                    {'access-token' : token }
            }

            axios({
                method: 'post',
                url: apiLoadIdUsersNoMaster,
                data: {
                    id: id
                },
                headers:
                {'access-token' : token}
            }).then((res)=>{
                
                this.setState({
                    listSucursales: res.data.sucursal,                                                                                
                    email: res.data.email,                    
                });
                
            }).catch((res)=>{
                console.log("Problemas al consultar los datos del rol");
            });

            axios.get(apiLoadPermitsMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                modules: res.data,
                                buttonSave: 'show',
                                buttonCancel: 'show',
                                varDisabled: '',
                                emailInvalid:false, 
                                emailError:'', 
                                sucursalInvalid:false, 
                                sucursalError:'',
                                rolSelectInvalid:false, 
                                rolSelectError:'',
                                rolInvalid: false,
                                rolError: '',
                                divListBoxNuevoRol: '',
                                selectedErrorNuevoRol: '',
                                divLoading: 'sizeDiv hide',
                                divContainer: 'container show',
                                modalHeaderUsers: 'Editar Usuario',
                                modalFooterButton: 'Guardar',
                                opcionForm: 3,                                 
                                disabledLink: 'text-danger',
                                idUpdateUser: id,
                                
                        })     
                        
                        //console.log(this.state.modules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los permisos del medical center", error)
                });

            axios.get(apiLoadModulesMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                onlyModules: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los modulos del medical center", error)
                }); 

            axios.get(apiLoadSelectBranchOffices, datos)
                .then((res) => {
                        this.setState({
                                sucursal: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para cargar las sucusales", error)
                });   

            axios.get(apiLoadSelectRoles, datos)
                .then((res) => {
                        this.setState({
                                rolSelect: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para cargar los roles", error)
                });    
        
            this.setState({
                modalUsers: !this.state.modalUsers
               
            });  

            
        }  
    }

    cerrarModalUsers(){
        setTimeout(() => {
                this.setState({
                    divContainer: 'container hide',
                    email: '',
                    sucursal:[],
                    rolSelect: [],
                    selected: [],
                    selectedNuevoRol: [],
                    rol: '',
                    rolSelectError: '',
                    divSelectRol: '',    
                    sucursalError: '',
                    divSelectSucursal: '',
                    selectedSucursalOption: null,
                    selectedRolOption: null,
                    focus:false,
                    collapseNuevoRol: false,
                    collapseModulosRoles: false,
                    ocultarBotones: '',
                    modalUsers: false,
                })
        }, 100)    
        /*this.setState({
            divContainer: 'container hide',
            email: '',
            sucursal:[],
            rolSelect: [],
            selected: [],
            selectedNuevoRol: [],
            rol: '',
            rolSelectError: '',
            divSelectRol: '',    
            sucursalError: '',
            divSelectSucursal: '',
            selectedSucursalOption: null,
            selectedRolOption: null,
            focus:false,
            collapseNuevoRol: false,
            collapseModulosRoles: false,
            ocultarBotones: '',
            modalUsers: false,
        });*/
    }

    prueba () {
        /*console.log(this.state.email);
        console.log(this.state.selectedSucursalOption);
        console.log(this.state.selectedRolOption);
        console.log(this.state.selected);*/
    }

    handleChangeSelectMultiple = (selectedSucursalOption) => {
        this.setState({ 
                selectedSucursalOption,
                sucursalError: '',
                divSelectSucursal: ''                                
            });        
        //console.log(selectedSucursalOption);
    }

    handleChangeSelectRol = (selectedRolOption) => {
        /*console.log(selectedRolOption);*/
        let valueActualRol = "";
        let arrayRol = Object.values(selectedRolOption);
        arrayRol.forEach(function (elemento, indice, array) {

            if(indice === 0){

                valueActualRol = elemento;

            }            

        });        
        
        this.setState({ 
            selectedRolOption,
            rolSelectError: '',
            divSelectRol: '',
            divListBox: "",
            selectedError: "",  
            rolIdView: valueActualRol                            
        });     
        
    }

    validateUsers = () => {
        
        let emailInvalid = false;
        let emailError = "";

        let selectedInvalid = this.state.selectedInvalid;
        let selectedError = "";
        let divListBox = "";

        let sucursalError = "";
        let divSelectSucursal = "";

        let rolSelectError = "";
        let divSelectRol = "";        

        let valueActualSucursal = "";

        if (this.state.selectedSucursalOption){

            let arraySuc = Object.values(this.state.selectedSucursalOption);
            arraySuc.forEach(function (elemento, indice, array) {
                if(indice === 0){
                    valueActualSucursal = elemento;
                }            
            });        

        }

        let valueActualRol = "";
        if (this.state.selectedRolOption){

            let arrayRol = Object.values(this.state.selectedRolOption);
            arrayRol.forEach(function (elemento, indice, array) {
                if(indice === 0){
                    valueActualRol = elemento;
                }            
            });        

        }
        
        if (this.state.email === "") {
            
            emailError = "¡Ingrese el email!";
            emailInvalid = true;

        }

        if(typeof this.state.email !== ""){
           let lastAtPos = this.state.email.lastIndexOf('@');
           let lastDotPos = this.state.email.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                emailError = "¡Email invalido!";
                emailInvalid = true;
            }
       }  
        
        if ((this.state.selectedInvalid === 0) && ((this.state.selectedRolOption === null) || (this.state.selectedRolOption.length === 0) || (valueActualRol === "0"))) {

            divListBox = "borderColor";
            selectedError = "¡Seleccione los permisos!";
            selectedInvalid = 0;
            this.setState({ 
                collapseModulosRoles: true
            });     


        }   

        if ((this.state.selectedSucursalOption === null) || (this.state.selectedSucursalOption.length === 0)){
            
            divSelectSucursal = "borderColor";
            sucursalError = "¡Seleccione las sucursales!";            
            
        }        

        if (((this.state.selectedRolOption === null) || (this.state.selectedRolOption.length === 0) || (valueActualRol === "0")) && (this.state.selectedInvalid === 0)){
            
            divSelectRol = "borderColor sizeDivGroup";
            rolSelectError = "¡Seleccione los roles!";            
            
        } 

        let valueTableSucursal = "";
        let valueTableRol = "";
        let valueTablePermit = "";
        let acum = 0;
        let acumSucRol = 0;
        let acumSucPermit = 0;
        let sucursalIgual = 0;
        if(this.state.listSucursales != null){ 
                                                                                
            this.state.listSucursales.map((list, i) => {        
                valueTableSucursal = list.value;
                valueTableRol = list.rol.value;
                valueTablePermit = list.modulos;

                if(valueTableSucursal == valueActualSucursal){
                    acum++;
                }
                if((valueTableSucursal == valueActualSucursal) && (valueTableRol === valueActualRol)){
                    acumSucRol++;
                }


                let arrayMod = Object.values(this.state.selected);
                arrayMod.forEach((elemento, indice, array) => {

                    let valorPermit = elemento;      
                    if((valueTableSucursal == valueActualSucursal) && (valorPermit === valueTablePermit)){
                        acumSucPermit++;
                    }
                    
                }); 
                
            })

            if(acum > 0){
                sucursalIgual = 1;
            }

            if(acumSucRol > 0){
                divSelectSucursal = "borderColor";
                sucursalError = "¡Esta sucursal ya se encuentra agregada!";   

                divSelectRol = "borderColor sizeDivGroup";
                rolSelectError = "¡Este rol ya se encuentra agregado con la sucursal seleccionada!";         
            }

            if(acumSucPermit > 0){
                divSelectSucursal = "borderColor";
                sucursalError = "¡Esta sucursal ya se encuentra agregada!";   

                divListBox = "borderColor";
                selectedError = "¡Estos permisos ya estan agregados con la sucursal seleccionada!";
                selectedInvalid = 0;
                this.setState({ 
                    collapseModulosRoles: true
                });     
            }
        }     

        if (emailError || selectedError || sucursalError || rolSelectError) {
            
            this.setState({ 
                    emailInvalid,                         
                    emailError, 
                    selectedInvalid, 
                    selectedError,
                    divListBox,
                    sucursalError,
                    divSelectSucursal,
                    rolSelectError,
                    divSelectRol

            });                
           
            return false;

        }

        let valueSucursal = "";
        let labelSucursal = "";
        if (this.state.selectedSucursalOption){

            let arraySuc = Object.values(this.state.selectedSucursalOption);
            arraySuc.forEach(function (elemento, indice, array) {
                if(indice === 0){
                    valueSucursal = elemento;
                }            
                if(indice === 1){
                    labelSucursal = elemento;
                }            
            });        

        }

        let rolValue = "";
        if((this.state.selectedRolOption === null) || (this.state.selectedRolOption.length === 0)){
            
            rolValue= {};

        }
        else{
            rolValue = this.state.selectedRolOption;
            
            this.state.listSucursales.push(
                { 
                    label: labelSucursal,
                    value: valueSucursal,
                    rol: rolValue,
                    modulos: '',
                    moduloMostrar: '',                    
                }
            )                                                                    
        }
          
        if(this.state.selectedInvalid !== 0){

            let variable = "";
            let arrayMod = Object.values(this.state.selected);
            arrayMod.forEach((elemento, indice, array) => {

                let valor = elemento;
                var arreglo = valor.split("-");
                var permiso = arreglo[0]+"-"+arreglo[2];

                this.state.listSucursales.push(
                    { 
                        label: labelSucursal,
                        value: valueSucursal,
                        rol: '',
                        modulos: valor,
                        moduloMostrar: permiso,
                    }
                )                                                                                
            });  
            
        }        

        this.setState({
            selectedSucursalOption: null,
            selectedRolOption: null,
            selected: [],  
            collapseModulosRoles: false,          
            collapseNuevoRol: false,       
            activeTab: "1",   
            selectedInvalid: 0,                    
            emailInvalid: false,                         
            emailError: "",             
            selectedError: "",
            divListBox: "",
            sucursalError: "",
            divSelectSucursal: "",
            rolSelectError: "",
            divSelectRol: "",
        })   
        
        return true;   
           
        
    }

    handleSubmitTable = event => {
        
        event.preventDefault();
        const isValid = this.validateUsers();        
        if (isValid) {                  
            console.log(this.state.listSucursales);                 
        }
    }    

    handleSubmitUsers = event => {
        if(this.state.listSucursales.length === 0){
            this.setState({
                alertCheck: 'hide check',
                alertExc: 'show warning',
                bodyAlert: '¡Debe ingresar datos en la tabla de sucursales!',
                buttonAceptarAlert: 'hide',
                buttonAceptarAlertDeleteUser: 'hide',
                buttonCancelAlert: 'hide',
            })    
            this.toggleAlert();                                                     
            setTimeout(() => {
                this.cerrarModalAlert();
            }, 3000);
        }
        else{
            if(this.state.opcionForm === 1)
            {
                var array = this.state.listSucursales,
                    groups = Object.create(null),
                    grouped = [];

                array.forEach(function (o) {
                    if (!groups[o.label]) {
                        groups[o.label] = [];
                        grouped.push({ label: o.label, value: o.value });
                    }
                    groups[o.label].push(o.value);
                });
                 
                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })
                const apiSaveUserNoMaster = (this.state.conexion+"saveUserNoMaster");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apiSaveUserNoMaster,
                    data: {
                        email:this.state.email,
                        listSuc: this.state.listSucursales,                        
                        onlyModules: this.state.onlyModules,                                                
                        groupSucursales: grouped,
                        timeZ:this.state.timeZ,
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    console.log(res);   
                    this.setState({ 
                        email: '',
                        selected: [],
                        selectedSucursalOption: null,
                        selectedRolOption: null,
                        listSucursales: [],
                        emailError: '',
                        emailInvalid: false,
                        divListBox: '',
                        selectedError: '',
                        selectedInvalid: 0,
                        divSelectSucursal: '',
                        sucursalError: '',   
                        divSelectRol: '',
                        rolSelectError: '',
                        alertCheck: 'show check',
                        alertExc: 'hide warning',
                        bodyAlert: '¡Operacion Exitosa!',
                    });   
                    this.loadUsersNoMaster();
                    this.toggleAlert();
                    this.cerrarModalUsers();                               
                    setTimeout(() => {
                        this.cerrarModalAlert();
                    }, 1000);     
                    this.setState({ 
                        divContainer: 'hide',
                        divLoading: 'sizeDiv hide',
                    })                               

                })

                .catch((res)=>{
                    console.log("Error en la operacion");
                });                 
            }   
            else if(this.state.opcionForm === 3)
            {
                var array = this.state.listSucursales,
                    groups = Object.create(null),
                    grouped = [];

                array.forEach(function (o) {
                    if (!groups[o.label]) {
                        groups[o.label] = [];
                        grouped.push({ label: o.label, value: o.value });
                    }
                    groups[o.label].push(o.value);
                });

                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })
                const apiEditUserNoMaster = (this.state.conexion+"editUserNoMaster");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apiEditUserNoMaster,
                    data: {
                        id:this.state.idUpdateUser,
                        email:this.state.email,
                        listSuc: this.state.listSucursales,                        
                        onlyModules: this.state.onlyModules,                                                
                        groupSucursales: grouped,   
                        timeZ:this.state.timeZ,                                          
                    },
                    headers:
                    {'access-token' : token}

                })
                .then((res)=>{
                    console.log(res);   
                    this.setState({ 
                        idUpdateUser: '',
                        email: '',
                        selected: [],
                        selectedSucursalOption: null,
                        selectedRolOption: null,
                        listSucursales: [],                        
                        emailError: '',
                        emailInvalid: false,
                        divListBox: '',
                        selectedError: '',
                        selectedInvalid: 0,
                        divSelectSucursal: '',
                        sucursalError: '',   
                        divSelectRol: '',
                        rolSelectError: '',                        
                        alertCheck: 'show check',
                        alertExc: 'hide warning',
                        bodyAlert: '¡Operacion Exitosa!',
                    });   
                    this.loadUsersNoMaster();
                    this.toggleAlert();
                    this.cerrarModalUsers();                               
                    setTimeout(() => {
                        this.cerrarModalAlert();
                    }, 1000);                                    
                    this.setState({ 
                        divContainer: 'hide',
                        divLoading: 'sizeDiv hide',
                    })                               

                })

                .catch((res)=>{
                    console.log("Error en la operacion");
                });
            }    
        }
        //console.log(this.state.listSucursales); 
        
    }

    loadUsersNoMaster(){

        const token = window.localStorage.getItem('id_token');
        const apiLoadAllUsersNoMaster = (this.state.conexion+"LoadAllUsersNoMaster");
        const datos={
            headers:
            {'access-token' : token }
        }

        axios.get(apiLoadAllUsersNoMaster, datos)
        .then((res) => {
            //console.log(res.data.roles)
            this.setState({
                usersNoMasters: res.data.users                
            })    
            this.setState({
                divContainerTable: "row show",
                divLoadingTable: "row hide",
            })   
        })
        .catch((error) => {
            console.log(error);
        });
    }

    toggleInfoEmail() {
        this.setState({
            modalInfoEmail: !this.state.modal
               
        });    
    }


    cerrarModalInfoEmail(){
        this.setState({
            modalInfoEmail: false,
            email: '',    
            focus: false 
        });
        setTimeout(() => {
            document.getElementById("email").focus();
        }, 500);
        
    }   

    aceptarModalInfoEmail(){
        if(this.state.emailExist === 1)
        {
            this.setState({
                modalInfoEmail: false,
                email: '',    
                focus: false 
            });
            setTimeout(() => {
                document.getElementById("email").focus();
            }, 500);    
        }
        else{
            this.setState({
                modalInfoEmail: false,                      
            });    
        }
        
        
    }   

    deleteListBranchOffice(pos) {

        this.setState({
            posDeleteBranchOffice: pos,
            alertCheck: 'hide check',
            alertExc: 'show warning',
            bodyAlert: '¿Desea Eliminar esta sucursal?',
            buttonAceptarAlert: 'show',                      
            buttonAceptarAlertDeleteUser: 'hide',                      
            buttonCancelAlert: 'show',                      
        });

        this.toggleAlert();
        
                    
        
    } 

    aceptarDeleteListBranchOffice() {

        var listSucursal = this.state.listSucursales;
        listSucursal.splice(this.state.posDeleteBranchOffice, 1);

        this.setState({
            listSucursales: listSucursal,                                  
            posDeleteBranchOffice: '',
            buttonAceptarAlert: 'hide',                      
            buttonAceptarAlertDeleteUser: 'hide',                      
            buttonCancelAlert: 'hide', 
            alertCheck: 'show check',
            alertExc: 'hide warning',
            bodyAlert: 'Registro eliminado con exito!',       
        });
        setTimeout(() => {
            this.cerrarModalAlert();
        }, 1000);
        //console.log(this.state.listSucursales);

    }

    aceptarDeleteUser() {

        const apiDeleteUserNoMaster = (this.state.conexion+"DeleteUserNoMaster");
        const token = window.localStorage.getItem('id_token');
        axios({
            method: 'post',
            url: apiDeleteUserNoMaster,
            data: {
                userId:this.state.idDeleteUser                
            },
            headers:
            {'access-token' : token}
        })
        .then((res)=>{
            console.log("Operacion exitosa");   
            this.setState({ 
                posDeleteBranchOffice: '',
                idDeleteUser: '',
                buttonAceptarAlert: 'hide',                      
                buttonAceptarAlertDeleteUser: 'hide',                      
                buttonCancelAlert: 'hide',                                    
                alertCheck: 'show check',
                alertExc: 'hide warning',
                bodyAlert: '¡Usuario eliminado con exito!',
            });   
            this.loadUsersNoMaster();
            //this.toggleAlert();
                                        
            setTimeout(() => {
                this.cerrarModalAlert();
            }, 1000);                                    

        })

        .catch((res)=>{
            console.log("Error al eliminar el usuario");
        });

    }

    cancelarDeleteListBranchOffice() {

        this.setState({
            posDeleteBranchOffice: '',
            idDeleteUser: '',
            buttonAceptarAlert: 'hide',                      
            buttonAceptarAlertDeleteUser: 'hide',                      
            buttonCancelAlert: 'hide',                      
        });

        this.cerrarModalAlert();

    }

    deleteUser(id) {

        this.setState({
            idDeleteUser: id,
            alertCheck: 'hide check',
            alertExc: 'show warning',
            bodyAlert: '¿Desea Eliminar este usuario?',
            buttonAceptarAlert: 'hide',                      
            buttonAceptarAlertDeleteUser: 'show',                      
            buttonCancelAlert: 'show',                      
        });

        this.toggleAlert();
        
    } 

    toggleModulosPermisos() {
        this.setState({ collapseModulosRoles: !this.state.collapseModulosRoles });
    }

    toggleTollTipPermisos() {
        this.setState({
          toolTipPermisos: !this.state.toolTipPermisos
        });
    }

    toggleNuevoRol() {
        this.setState({ 
            collapseNuevoRol: !this.state.collapseNuevoRol 
        });
        if(this.state.collapseNuevoRol === true){
            this.setState({ 
                imageButton: <FaPlusCircle size="1em"/>
            });
        }else{
            this.setState({ 
                imageButton: <FaMinusCircle size="1em"/>
            });
        }
    }

    toggleTollNuevoRol() {
        this.setState({
          toolTipNuevoRol: !this.state.toolTipNuevoRol
        });
    }

    handleCancelarNuevoRol() {
        this.setState({
            collapseNuevoRol: false,
            rol: '',
            selectedNuevoRol: [],
            divListBoxNuevoRol: '',
            selectedErrorNuevoRol: '',
            rolInvalid: false,
            rolError: '',
            selectedInvalidNuevoRol: 0,
        });
    }

    toggleViewRol(id){
        if(!id){

            this.setState({
                    alertCheck: 'hide check',
                    alertExc: 'show warning',
                    buttonAceptarAlert: 'hide',
                    buttonAceptarAlertDeleteUser: 'hide',
                    buttonCancelAlert: 'hide',
                    bodyAlert: '¡Debe seleccionar un rol!',
                    email: '',
                    
                });
                
                this.toggleAlert();                

                setTimeout(() => {

                    this.cerrarModalAlert();                    
                        
                }, 3000);    

        }
        else{

            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',                
            })
            const apiViewRolId = this.state.conexion+"ViewRolId";
            const apiLoadPermitsMedicalCenter = this.state.conexion+"LoadPermitsMedicalCenter";
            const apiLoadModulesMedicalCenter = this.state.conexion+"LoadModulesMedicalCenter";
            const token = window.localStorage.getItem('id_token');

            const datos={
                headers:
                {'access-token' : token }
            }

            axios({
                method: 'post',
                url: apiViewRolId,
                data: {
                    rolId: id
                },
                headers:
                {'access-token' : token}
            }).then((res)=>{
                
                this.setState({
                    rol: res.data.rol,
                    selected: res.data.modules
                });
                
            }).catch((res)=>{
                console.log("Problemas al consultar los datos del rol");
            });

            axios.get(apiLoadPermitsMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                modules: res.data,
                                buttonSave: 'hide',
                                buttonCancel: 'show',
                                varDisabled: 'true',
                                rolInvalid:false, 
                                selectedError: "",                                
                                divListBox: "",
                                selectedError: "",
                                modalHeader: 'Ver Rol',
                                                                                                                               
                                
                        })                            
                        this.setState({
                            divLoading: 'sizeDiv hide',
                            divContainer: 'container show',
                            modal: !this.state.modal,                  
                        }); 
                        
                        //console.log(this.state.modules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los permisos del medical center", error)
                });

            axios.get(apiLoadModulesMedicalCenter, datos)
                .then((res) => {
                        this.setState({
                                onlyModules: res.data
                        })                    
                        //console.log(this.state.onlyModules);
                }).catch((error) => {
                    console.log("Error consultando la api para consultar los modulos del medical center", error)
                });                                                

        }        
        
    }

    toggleViewRolListSuc = (id) =>{        

        this.setState({
            divLoading: 'sizeDiv show',
            divContainer: 'container hide',                
        })
        const apiViewRolId = this.state.conexion+"ViewRolId";
        const apiLoadPermitsMedicalCenter = this.state.conexion+"LoadPermitsMedicalCenter";
        const apiLoadModulesMedicalCenter = this.state.conexion+"LoadModulesMedicalCenter";
        const token = window.localStorage.getItem('id_token');

        const datos={
            headers:
            {'access-token' : token }
        }

        axios({
            method: 'post',
            url: apiViewRolId,
            data: {
                rolId: id
            },
            headers:
            {'access-token' : token}
        }).then((res)=>{
            
            this.setState({
                rol: res.data.rol,
                selected: res.data.modules
            });
            
        }).catch((res)=>{
            console.log("Problemas al consultar los datos del rol");
        });

        axios.get(apiLoadPermitsMedicalCenter, datos)
            .then((res) => {
                    this.setState({
                            modules: res.data,
                            buttonSave: 'hide',
                            buttonCancel: 'show',
                            varDisabled: 'true',
                            rolInvalid:false, 
                            selectedError: "",                                
                            divListBox: "",
                            selectedError: "",
                            modalHeader: 'Ver Rol',
                                                                                                                           
                            
                    })                            
                    this.setState({
                        divLoading: 'sizeDiv hide',
                        divContainer: 'container show',
                        modal: !this.state.modal,                  
                    }); 
                    
                    //console.log(this.state.modules);
            }).catch((error) => {
                console.log("Error consultando la api para consultar los permisos del medical center", error)
            });

        axios.get(apiLoadModulesMedicalCenter, datos)
            .then((res) => {
                    this.setState({
                            onlyModules: res.data
                    })                    
                    //console.log(this.state.onlyModules);
            }).catch((error) => {
                console.log("Error consultando la api para consultar los modulos del medical center", error)
            });                                                
    }

    toggleViewRolName = (rol) => {

        const apiViewRolName = this.state.conexion+"ViewRolName";
        const apiLoadPermitsMedicalCenter = this.state.conexion+"LoadPermitsMedicalCenter";
        const apiLoadModulesMedicalCenter = this.state.conexion+"LoadModulesMedicalCenter";
        const token = window.localStorage.getItem('id_token');

        const datos={
            headers:
            {'access-token' : token }
        }

        axios({
            method: 'post',
            url: apiViewRolName,
            data: {
                rolName: rol
            },
            headers:
            {'access-token' : token}
        }).then((res)=>{
            
            this.setState({
                selectedRolOption: res.data                
            });
            
        }).catch((res)=>{
            console.log("Problemas al consultar los datos del rol registrado y seleccionado");
        });                                                                   
        
    }

    toggleOpenPopover(medicalCenterId, branchOfficeId) {
        /*console.log(medicalCenterId);
        console.log(branchOfficeId);*/
        
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    toggleClosePopover() {
        
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }
    
    render() {        
        
        const dropWidth = {
            position: 'relative',
            width: '100%',
            inline: 'block',
        }             
        
        return (
                <div className="animated fadeIn">
                    <Row>
                        <Col>
                        <Card>
                        <CardHeader>
                            Configuracion de Usuarios
                        </CardHeader>
                        <CardBody>
                            <div>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                                        Usuarios
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                                        Roles
                                    </NavLink>
                                </NavItem>                
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <div className="container">
                                        <form className="formCodeConfirm" onSubmit={this.handleSubmitUsers.bind(this)}>                                
                                            <div className="row">
                                                <Button color="success" onClick={() => { this.toggleUsuarios('1'); }}>Agregar</Button>                                                
                                            </div>
                                            <br />
                                            <div align="center" className={this.state.divLoadingTable}><img src="assets/loader.gif" width="20%" height="5%"/></div>
                                            <div className={this.state.divContainerTable}>
                                                <Table hover responsive borderless>
                                                    <thead className="thead-light">
                                                      <tr>
                                                        <th style={{width:"25%"}}>Nro</th>                                                        
                                                        <th style={{width:"50%"}}>Usuario</th>
                                                        <th style={{width:"25%"}}>Acciones</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.usersNoMasters != null && 
                                                            this.state.usersNoMasters.map((user, i) => {                                                                
                                                                return (
                                                                    <tr>
                                                                        <td scope="row" style={{width:"25%"}}>{i + 1}</td>
                                                                        <td style={{width:"50%"}}>{user.email}</td>                                                        
                                                                        <td style={{width:"25%"}}>
                                                                            <div  className="float-left" >
                                                                                <a title="Ver" className=""  onClick={() => { this.toggleUsuarios('2', user.id); }}><FaSearch /> </a>&nbsp;&nbsp;&nbsp;
                                                                                <a title="Editar" className="" onClick={() => { this.toggleUsuarios('3', user.id); }}><FaUserEdit /></a>&nbsp;&nbsp;&nbsp;
                                                                                <a title="Eliminar" className="text-danger"  onClick={() => { this.deleteUser(user.id); }}><FaMinusCircle /> </a>&nbsp;&nbsp;&nbsp;
                                                                            </div>
                                                                        </td>
                                                                    </tr>   
                                                                )
                                                            })                                                        
                                                        }                                                                                                         
                                                    </tbody>
                                                </Table>                                                
                                            </div>   
                                            <div>
                                                <Modal isOpen={this.state.modalUsers} toggle={this.toggleUsuarios} className="Modal" autoFocus={false}>
                                                    <div  className={this.state.divLoading} style={{padding:"1%"}}><img src="assets/loader.gif" width="30%"  /></div>
                                                    <div className={this.state.divContainer}>
                                                    <ModalHeader toggle={this.cerrarModalUsers}>{this.state.modalHeaderUsers}</ModalHeader>
                                                    <ModalBody className="Scroll"> 
                                                            <FormGroup className="top form-group col-sm-12">                                                                 
                                                                <Label for="email">Email</Label>
                                                                <Input autoFocus={this.state.focus} disabled={this.state.varDisabled} invalid={this.state.emailInvalid} name="email" id="email" onKeyUp={this.handlekey} onChange={this.handleChange} value={this.state.email} onBlur={this.pruebaOnBlur} type="text" placeholder="ejemplo@gmail.com" />
                                                                <FormFeedback tooltip>{this.state.emailError}</FormFeedback>                                                            
                                                            </FormGroup>
                                                            <FormGroup tag="fieldset">
                                                            <div className={this.state.ocultarBotones}>
                                                            <h5>Sucursales-Roles-Permisos</h5>
                                                            
                                                                <FormGroup className="top form-group col-sm-12">                                                                 
                                                                    <Label for="sucursal">Sucursal</Label>
                                                                    <div className={this.state.divSelectSucursal}>
                                                                        <Select isSearchable isDisabled={this.state.varDisabled} name="sucursal" value={this.state.selectedSucursalOption} onChange={this.handleChangeSelectMultiple} options={this.state.sucursal} />
                                                                    </div>
                                                                    <div className="errorSelect">{this.state.sucursalError}</div>                                                                
                                                                </FormGroup>

                                                                <div>
                                                                    <Nav tabs>
                                                                        <NavItem>
                                                                            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                                                                                Roles
                                                                            </NavLink>
                                                                        </NavItem>
                                                                        <NavItem>
                                                                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                                                                                Permisos-Especiales
                                                                            </NavLink>
                                                                        </NavItem>                
                                                                    </Nav>
                                                                    <TabContent activeTab={this.state.activeTab}>
                                                                        <TabPane tabId="1">
                                                                            
                                                                            <FormGroup className="top form-group col-sm-12">
                                                                                <Label for="rol">Rol</Label>
                                                                                <div className={this.state.divSelectRol}>                                                                        
                                                                                    <InputGroup className="top form-group col-sm-20">                                                                
                                                                                        <Select isDisabled={this.state.varDisabled} className="select" name="rol" value={this.state.selectedRolOption} onChange={this.handleChangeSelectRol} options={this.state.rolSelect} />&nbsp;
                                                                                        <div style={{width:'-2%'}}>
                                                                                            <Button title="Ver Rol" className={this.state.ocultarBotones} disabled={this.state.varDisabled} onClick={() => { this.toggleViewRol(this.state.rolIdView); }}><FaSearch size="1em"/></Button>&nbsp;
                                                                                            <Button title="Agregar Rol" disabled={this.state.varDisabled} onClick={this.toggleNuevoRol} id="">{this.state.imageButton}</Button>
                                                                                        </div>
                                                                                    </InputGroup>
                                                                                </div>
                                                                                <div className="errorSelect">{this.state.rolSelectError}</div>                                                                                                                                                                                                        
                                                                            </FormGroup>
                                                                            <FormGroup className="top form-group col-sm-12">
                                                                                {/*<Tooltip class="fa-stack fa-lg tooltip-arrow" placement="top-start" isOpen={this.state.toolTipNuevoRol} target="TooltipNuevoRol" toggle={this.toggleTollNuevoRol}>
                                                                                    <b>¡Aqui puede agregar un nuevo rol si aun no lo tiene configurado!</b>
                                                                                </Tooltip>*/}
                                                                                <Collapse isOpen={this.state.collapseNuevoRol}>
                                                                                <Card >
                                                                                <CardBody >
                                                                                    <FormGroup className="top form-group col-sm-12">                                                                 
                                                                                        <Label for="rol">Rol</Label>
                                                                                        <Input disabled={this.state.varDisabled} invalid={this.state.rolInvalid} name="rol" id="rol" onKeyUp={this.handlekey} onChange={this.handleChange} value={this.state.rol} type="text" placeholder="Rol" />
                                                                                        <FormFeedback tooltip>{this.state.rolError}</FormFeedback>                                                            
                                                                                    </FormGroup>
                                                                                     <FormGroup className="top form-group col-sm-12">
                                                                                        <Label for="modules">Modulos-Permisos</Label>
                                                                                        <div className={this.state.divListBoxNuevoRol}>
                                                                                            <DualListBox disabled={this.state.varDisabled} className="borderColor" canFilter invalid name="modulesNuevoRol" id="modulesNuevoRol" options={this.state.modules} selected={this.state.selectedNuevoRol} onChange={this.onChangeNuevoRol} />
                                                                                        </div>
                                                                                        <div className="error">{this.state.selectedErrorNuevoRol}</div>
                                                                                    </FormGroup>  
                                                                                    <FormGroup className="top form-group col-sm-12">  
                                                                                        <div align="right">
                                                                                            <Button className="" color="primary" onClick={this.handleSubmitNuevoRol}>Guardar</Button>&nbsp;&nbsp; 
                                                                                            <Button className="" color="danger" onClick={this.handleCancelarNuevoRol}>Cancelar</Button> 
                                                                                        </div>
                                                                                    </FormGroup>  
                                                                                </CardBody>
                                                                                </Card>    
                                                                                </Collapse>
                                                                                <hr className={this.state.ocultarBotones}/>
                                                                            </FormGroup>
                                                                        </TabPane>
                                                                    </TabContent>    
                                                                    <TabContent activeTab={this.state.activeTab}>
                                                                        <TabPane tabId="2">
                                                                            <FormGroup className="top form-group col-sm-12">
                                                                                <Label for="modules">Modulos-Permisos</Label>
                                                                                    <div className={this.state.divListBox}>
                                                                                        <DualListBox disabled={this.state.varDisabled} className="borderColor" canFilter invalid name="modules" id="modules" options={this.state.modules} selected={this.state.selected} onChange={this.onChange} />
                                                                                    </div>
                                                                                    <div className="error">{this.state.selectedError}</div>  
                                                                                <hr className={this.state.ocultarBotones}/>
                                                                            </FormGroup>  
                                                                        </TabPane>
                                                                    </TabContent>    
                                                                </div>
                                                                <br />
                                                                <Button className={this.state.ocultarBotones} disabled={this.state.varDisabled} color="success" onClick={this.handleSubmitTable}>Agregar</Button>
                                                                <br />
                                                                <br />  
                                                                </div>
                                                                <div className="">
                                                                {
                                                                    this.state.opcionForm !== 2  &&  
                                                                    <Table hover responsive borderless>
                                                                        <thead className="thead-light">
                                                                            <tr>
                                                                                <th style={{width:"10%"}}>Nro</th>
                                                                                <th style={{width:"25%"}}>Sucursal</th>                                                        
                                                                                <th style={{width:"25%"}}>Rol</th>                                                        
                                                                                <th style={{width:"30%"}}>Permiso-Especial</th>                                                        
                                                                                <th style={{width:"10%"}}>Acciones</th>                                                        
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                this.state.listSucursales != null && 
                                                                                this.state.listSucursales.map((list, i) => {                                                                                                                                                                      
                                                                                    if(list.moduloMostrar == ""){
                                                                                        return (
                                                                                            <tr>
                                                                                                <td scope="row" style={{width:"10%"}}>{i+1}</td>
                                                                                                <td style={{width:"25%"}}>{list.label}</td>                                                                                                                                                    
                                                                                                <td style={{width:"25%"}}>{list.rol.label}</td>                                                                                                                                                    
                                                                                                <td style={{width:"30%"}}>{list.moduloMostrar}</td>                                                                                                                                                    
                                                                                                <td className="text-rigth" style={{width:"10%"}}>
                                                                                                    <div className="float-rigth">
                                                                                                        <a className={this.state.disabledLink} title="Eliminar Registro" onClick={() => { this.deleteListBranchOffice(i); }} key={i}><FaMinusCircle /></a>&nbsp;&nbsp; 
                                                                                                        <a className="" title="Ver Rol" onClick={() => { this.toggleViewRolListSuc(list.rol.value); }} key={i}><FaSearch /></a>
                                                                                                        
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>   
                                                                                        )    
                                                                                    }else{
                                                                                        return (
                                                                                            <tr>
                                                                                                <td scope="row" style={{width:"10%"}}>{i+1}</td>
                                                                                                <td style={{width:"25%"}}>{list.label}</td>                                                                                                                                                    
                                                                                                <td style={{width:"25%"}}>{list.rol.label}</td>                                                                                                                                                    
                                                                                                <td style={{width:"30%"}}>{list.moduloMostrar}</td>                                                                                                                                                    
                                                                                                <td className="text-rigth" style={{width:"10%"}}>
                                                                                                    <div className="float-rigth">                                                                                                        
                                                                                                        <a className={this.state.disabledLink} title="Eliminar Registro" onClick={() => { this.deleteListBranchOffice(i); }} key={i}><FaMinusCircle /></a>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>   
                                                                                        )
                                                                                    }
                                                                                    

                                                                                })
                                                                            
                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                }
                                                                {
                                                                    this.state.opcionForm === 2 &&     
                                                                    <Table hover responsive borderless>
                                                                        <thead className="thead-light">
                                                                            <tr>
                                                                                <th style={{width:"10%"}}>Nro</th>
                                                                                <th style={{width:"30%"}}>Sucursal</th>                                                        
                                                                                <th style={{width:"30%"}}>Rol</th>                                                        
                                                                                <th style={{width:"30%"}}>Permiso-Especial</th>                                                                                                                                                                                                                                                                         
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                this.state.listSucursales != null && 
                                                                                this.state.listSucursales.map((list, i) => {                                                                                                                                                                      

                                                                                    return (
                                                                                        <tr>
                                                                                            <td scope="row" style={{width:"10%"}}>{i+1}</td>
                                                                                            <td style={{width:"30%"}}>{list.label}</td>                                                                                                                                                    
                                                                                            <td style={{width:"30%"}}>{list.rol.label}</td>                                                                                                                                                                                                                                                
                                                                                            <td style={{width:"30%"}}>{list.moduloMostrar}</td> 
                                                                                        </tr>   
                                                                                    )

                                                                                })
                                                                            
                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                }
                                                                </div>  
                                                            </FormGroup>                                                                                                                                                                              
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button className={this.state.buttonSave} color="primary" onClick={this.handleSubmitUsers}>{this.state.modalFooterButton}</Button>
                                                        <Button className={this.state.buttonCancel} color="danger" onClick={this.cerrarModalUsers}>Cancelar</Button>                                                      
                                                        {/*<Button className={this.state.buttonCancel} color="danger" onClick={this.prueba}>Prueba</Button>*/}                                                                                                             
                                                    </ModalFooter>
                                                    </div>
                                                </Modal>
                                            </div>                                      
                                        </form>
                                    </div>
                                </TabPane>                            
                                <TabPane tabId="2">
                                    <div className="container">
                                        <form className="formCodeConfirm" onSubmit={this.handleSubmit.bind(this)}>                                
                                            <div className="row">
                                                <Button color="success" onClick={() => { this.toggle('1'); }}>Agregar</Button>                                                
                                            </div>
                                            <br />
                                            <div align="center" className={this.state.divLoadingTable}><img src="assets/loader.gif" width="20%" height="5%" /></div>
                                            <div className={this.state.divContainerTable}>                                            
                                                <Table hover responsive borderless> 
                                                    <thead className="thead-light">
                                                      <tr>
                                                        <th style={{width:"25%"}}>Nro</th>                                                        
                                                        <th style={{width:"50%"}}>Rol</th>
                                                        <th style={{width:"25%"}}>Acciones</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.roles != null && 
                                                            this.state.roles.map((rol, i) => {

                                                                return (
                                                                    <tr>
                                                                        <td scope="row" style={{width:"25%"}}>{i+1}</td>
                                                                        <td style={{width:"50%"}}>{rol.rol}</td>                                                        
                                                                        <td style={{width:"25%"}}>
                                                                            <div  className="float-left" >
                                                                                <a title="Ver" className=""  onClick={() => { this.toggle('2', i); }}><FaSearch /> </a>&nbsp;&nbsp;&nbsp;
                                                                                <a title="Editar" className="" onClick={() => { this.toggle('3', i); }}><FaUserEdit /></a>
                                                                                {/*<a title="Eliminar" className="text-danger"  onClick=""><FaMinusCircle /> </a>*/}
                                                                                
                                                                            </div>
                                                                        </td>
                                                                    </tr>   
                                                                )

                                                            })                                                        
                                                        }                                                                                                         
                                                    </tbody>
                                                </Table>                                                    
                                            </div>
                                            <div>
                                                <Modal isOpen={this.state.modal} toggle={this.toggle} className="Modal">
                                                    <div  className={this.state.divLoading} style={{padding:"1%"}}><img src="assets/loader.gif" width="30%" /></div>
                                                    <div className={this.state.divContainer}>
                                                    <ModalHeader toggle={this.cerrarModal}>{this.state.modalHeader}</ModalHeader>
                                                    <ModalBody>      
                                                            <FormGroup className="top form-group col-sm-12">                                                                 
                                                                <Label for="rol">Rol</Label>
                                                                <Input disabled={this.state.varDisabled} invalid={this.state.rolInvalid} name="rol" id="rol" onKeyUp={this.handlekey} onChange={this.handleChange} value={this.state.rol} type="text" placeholder="Rol" />
                                                                <FormFeedback tooltip>{this.state.rolError}</FormFeedback>                                                            
                                                            </FormGroup>
                                                            <FormGroup className="top form-group col-sm-12">
                                                                <Label for="modules">Modulos-Permisos</Label>
                                                                <div className={this.state.divListBox}>
                                                                    <DualListBox disabled={this.state.varDisabled} className="borderColor" canFilter invalid name="modules" id="modules" options={this.state.modules} selected={this.state.selected} onChange={this.onChange} />
                                                                </div>
                                                                <div className="error">{this.state.selectedError}</div>
                                                            </FormGroup>                                                                                                                                                                                
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button className={this.state.buttonSave} color="primary" onClick={this.handleSubmit}>{this.state.modalFooterButton}</Button>
                                                        <Button className={this.state.buttonCancel} color="danger" onClick={this.cerrarModal}>Cancelar</Button>                                                                                                              
                                                    </ModalFooter>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </form>
                                    </div>                                    
                                </TabPane>
                            </TabContent>
                            </div>
                            <Modal isOpen={this.state.modalAlert} toggle={this.toggleAlert} className="ModalAlert">
                                <ModalHeader></ModalHeader>
                                <ModalBody>
                                    <div color="success" className={this.state.alertCheck}><FaCheckCircle size="4em"/></div>
                                    <div color="success" className={this.state.alertExc}><FaExclamationCircle size="4em"/></div>                                    
                                    <h4><b>{this.state.bodyAlert}</b></h4>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className={this.state.buttonAceptarAlert} color="primary" onClick={this.aceptarDeleteListBranchOffice}>Aceptar</Button>
                                    <Button className={this.state.buttonAceptarAlertDeleteUser} color="primary" onClick={this.aceptarDeleteUser}>Aceptar</Button>
                                    <Button className={this.state.buttonCancelAlert} color="danger" onClick={this.cancelarDeleteListBranchOffice}>Cancelar</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.modalInfoEmail} toggle={this.toggleInfoEmail} className="ModalInfoEmail">
                                <ModalHeader></ModalHeader>
                                <ModalBody className="Scroll">
                                <div className="">
                                    <Card>
                                        <CardHeader>
                                            <i className="warning_"><FaExclamationCircle size="1.5em"/></i><span className={this.state.colorSpan}>{this.state.headerModalEmailInfo}</span>
                                        </CardHeader>
                                        <CardBody>

                                             <Table hover responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Centro Medico</th>
                                                        <th>Sucursal</th>
                                                        <th>Rol-Permisos</th>                                                    
                                                    </tr>
                                                </thead>
                                                {
                                                    this.state.infoEmail != null && 
                                                    this.state.infoEmail.map((info, i) => {
                                                        return (
                                                            <tbody>
                                                                {info.branchOffice.map((branchOffice, j) =>
                                                                    
                                                                    <tr>
                                                                        <td>{info.name}</td>
                                                                        <td>{branchOffice.name}</td>
                                                                        <td>
                                                                            &nbsp;&nbsp;&nbsp;<PopoverItem key={j} branchOfficeId={branchOffice.branchOfficeId} id={i} medicalCenterId={info.medicalCenterId} email={this.state.emailConsulta}/>
                                                                        </td>                                                        
                                                                    </tr>  
                                                                    
                                                                )}                           
                                                            </tbody>
                                                        )
                                                    })
                                                }
                                            </Table> 
                                        </CardBody>
                                    </Card>                                                  
                                </div>                                    
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.aceptarModalInfoEmail}>Aceptar</Button>
                                    <Button color="danger" onClick={this.cerrarModalInfoEmail}>Cancelar</Button>                                                                                                              
                                </ModalFooter>
                            </Modal>
                            <br />
                        </CardBody>
                        </Card>
                        </Col>
                    </Row>
                </div>
                );
    }
}

export default Usuarios;
