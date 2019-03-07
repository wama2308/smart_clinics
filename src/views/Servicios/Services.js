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
import './Services.css'
import './loading.css'
import PopoverItem from '../../components/PopoverItem.js';
import classnames from 'classnames';
import { datosConexion } from '../../components/Conexion.js';
import { Editor } from '@tinymce/tinymce-react';
import jstz from 'jstz';
import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar, FaFileAlt} from 'react-icons/fa';


class Usuarios extends Component {

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

        this.handleEditorChange = this.handleEditorChange.bind(this); 
        this.handleEditorPlantillaChange = this.handleEditorPlantillaChange.bind(this); 
        this.handleSaveServicio = this.handleSaveServicio.bind(this);
        this.handleSavePlantilla = this.handleSavePlantilla.bind(this);
        this.handlekeyServicio = this.handlekeyServicio.bind(this);
        this.handlekeyMonto = this.handlekeyMonto.bind(this);        
        this.handlekeyPlantilla = this.handlekeyPlantilla.bind(this);        

        this.state = {
            activeTab: "1",
            conexion: valueConexion,  
            modal: false,
            modalPlantilla: false,
            modalAlert: false,
            buttonAceptarAlert: 'hide',             
            buttonCancelAlert: 'hide',
            divLoadingTable:'row hide',
            divContainerTable:'row hide',
            bodyAlert: '',
            alertCheck: 'hide check',
            alertExc: 'hide warning',
            services: [],
            buttonSave: 'hide', 
            buttonCancel: 'hide',
            varDisabled: '', 
            modalHeader: '', 
            modalFooterButton: '', 
            divLoading:'sizeDiv show',
            divContainer:'hide',
            servicioInvalid: false,
            servicioError: '',
            divSelectCategoria: '',
            categoriaError: '',
            selectedCategoriaOption: null,
            categoria: [],
            divFormato: '',
            formatoError: '',
            contentFormat: '',
            fields: '',
            fieldsSplit: [],
            fieldsLenght: '',
            fieldsReplace: '',
            arrayFields: [],   
            monto:'0.00',
            montoInvalid:'',
            montoError:'',       
            currencySymbol: '',  
            opcionForm: '',
            licenseIdState: '',
            serviceIdState: '',
            labelMonto: 'hide', 
            plantilla: '',
            plantillaInvalid: false,
            plantillaError: '',
            contentFormatPlantilla: '',
            plantillasArray: [],
            idDeletePlantilla: '',
            posEditPlantilla: '',
            arrayTemplatesTinyMce: [],
            timeZ: timezone.name(),
        };        
    }

    /*handleEditorChange(contentFormat) {
        console.log(contentFormat);
        this.setState({ 
            contentFormat 
        });
        console.log(this.state.contentFormat);
    }
*/
    handleEditorChange = (e) => {
        /*console.log('Content was updated:', e.target.getContent());*/
        this.setState({
            contentFormat: e.target.getContent(),            
        });
        //console.log(this.state.contentFormat);
    }    

    handleEditorPlantillaChange = (e) => {
        /*console.log('Content was updated:', e.target.getContent());*/
        this.setState({
            contentFormatPlantilla: e.target.getContent(),            
            formatoError: '',            
            divFormato: '',            
        });
        //console.log(this.state.contentFormatPlantilla);
    }    
    
    componentDidMount(){

        this.setState({
            divContainerTable: "row hide",
            divLoadingTable: "row show",            
        })
        
        this.LoadServices();              
        this.LoadPlantillas();             
        
    }        

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }    

    LoadServices = () => {

        const token = window.localStorage.getItem('id_token');
        const apiLoadServices = (this.state.conexion+"LoadServicesPreloaded");
        const datos={
            headers:
            {'access-token' : token }
        }

        axios.get(apiLoadServices, datos)
        .then((res) => {
            //console.log(res.data.roles)
            this.setState({
                services: res.data                
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

    LoadPlantillas = () => {

        const token = window.localStorage.getItem('id_token');
        const apiLoadTemplates = (this.state.conexion+"LoadTemplates");
        const apiLoadTemplatesTinymce = (this.state.conexion+"LoadTemplatesTinymce");
        const datos={
            headers:
            {'access-token' : token }
        }

        axios.get(apiLoadTemplates, datos)
        .then((res) => {
            //console.log(res.data.roles)
            this.setState({
                plantillasArray: res.data.templates                
            }) 
            this.setState({
                divContainerTable: "row show",
                divLoadingTable: "row hide",            
            })   

        })
        .catch((error) => {
            console.log(error);
        });

        axios.get(apiLoadTemplatesTinymce, datos)
        .then((res) => {
            //console.log(res.data.roles)
            this.setState({
                arrayTemplatesTinyMce: res.data                
            }) 
        })
        .catch((error) => {
            console.log(error);
        });
    }

    toggle = (opcion, licenseId, serviceId) => {
        if(opcion === "1")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
                //modal: !this.state.modal
               
            });   

            const apiLoadServicesPreloadedOriginalId = this.state.conexion+"LoadServicesPreloadedOriginalId";  
            const apiLoadSelectCategory = this.state.conexion+"LoadSelectCategory";          
            const token = window.localStorage.getItem('id_token');

            const datos={
                headers:
                {'access-token' : token }
            }

            axios.get(apiLoadSelectCategory, datos)
            .then((res) => {
                this.setState({
                    categoria: res.data
                })                    
            })

            .catch((error) => {
                console.log("Error consultando las categorias", error)
            });  
            /////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////
            axios({
                method: 'post',
                url: apiLoadServicesPreloadedOriginalId,
                data: {
                    licenseId: licenseId,
                    serviceId: serviceId
                },
                headers:
                {'access-token' : token}
            })
            .then((res)=>{

                let dataFields = res.data.fields;
                let fields = dataFields.toString();
                let fields_split = fields.split(",");
                let fields_lenght = fields_split.length;
                let fields_replace = fields.replace(/,/g, " | ");
                
                this.setState({
                    arrayFields: res.data.fields,
                    fields: fields,
                    fieldsSplit: fields_split,
                    fieldsLenght: fields_lenght,
                    fieldsReplace: fields_replace,      
                    servicio: res.data.serviceName,
                    contentFormat: res.data.format,
                    selectedCategoriaOption: res.data.category,
                    currencySymbol: res.data.currencySymbol,
                    buttonSave: 'hide',
                    buttonCancel: 'show',
                    varDisabled: 'true',
                    modalHeader: 'Ver Servicio Original', 
                    modal: !this.state.modal,
                    opcionForm: 1,
                    labelMonto: 'hide',
                });                                
            })

            .catch((res)=>{
                console.log("Problemas al consultar los datos del servicio");
            });

            setTimeout(() => {

                this.setState({
                    divLoading: 'sizeDiv hide',
                    divContainer: 'container show',
                    
               
                });  
                        
            }, 3000);      
            
        }
        else if(opcion === "2")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
            });   

            const apiLoadServicesPreloadedId = this.state.conexion+"LoadServicesPreloadedId";  
            const apiLoadSelectCategory = this.state.conexion+"LoadSelectCategory";          
            const token = window.localStorage.getItem('id_token');

            const datos={
                headers:
                {'access-token' : token }
            }

            axios.get(apiLoadSelectCategory, datos)
            .then((res) => {
                this.setState({
                    categoria: res.data
                })                    
            })

            .catch((error) => {
                console.log("Error consultando las categorias", error)
            });  
            /////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////
            axios({
                method: 'post',
                url: apiLoadServicesPreloadedId,
                data: {
                    licenseId: licenseId,
                    serviceId: serviceId
                },
                headers:
                {'access-token' : token}
            })

            .then((res)=>{

                let dataFields = res.data.fields;
                let fields = dataFields.toString();
                let fields_split = fields.split(",");
                let fields_lenght = fields_split.length;
                let fields_replace = fields.replace(/,/g, " | ");                                
                
                this.setState({
                    arrayFields: res.data.fields,
                    fields: fields,
                    fieldsSplit: fields_split,
                    fieldsLenght: fields_lenght,
                    fieldsReplace: fields_replace,      
                    servicio: res.data.serviceName,
                    contentFormat: res.data.format,
                    monto: res.data.amount,
                    selectedCategoriaOption: res.data.category,
                    currencySymbol: res.data.currencySymbol,
                    buttonSave: 'show',
                    buttonCancel: 'show',
                    varDisabled: '',
                    modalHeader: 'Modificar Servicio', 
                    modalFooterButton: 'Guardar',
                    modal: !this.state.modal,
                    opcionForm: 2,
                    licenseIdState: licenseId,
                    serviceIdState: serviceId,
                    labelMonto: 'show',
                });                                
            })

            .catch((res)=>{
                console.log("Problemas al consultar los datos del servicio");
            });

            setTimeout(() => {

                this.setState({
                    divLoading: 'sizeDiv hide',
                    divContainer: 'container show',
                });  
                        
            }, 3000);      
            
        }
        else if (opcion === "3"){

            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
                //modal: !this.state.modal
               
            });   

            const apiLoadServicesPreloadedId = this.state.conexion+"LoadServicesPreloadedId";  
            const apiLoadSelectCategory = this.state.conexion+"LoadSelectCategory";          
            const token = window.localStorage.getItem('id_token');

            const datos={
                headers:
                {'access-token' : token }
            }

            axios.get(apiLoadSelectCategory, datos)
            .then((res) => {
                this.setState({
                    categoria: res.data
                })                    
            })

            .catch((error) => {
                console.log("Error consultando las categorias", error)
            });  
            /////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////
            axios({
                method: 'post',
                url: apiLoadServicesPreloadedId,
                data: {
                    licenseId: licenseId,
                    serviceId: serviceId
                },
                headers:
                {'access-token' : token}
            })

            .then((res)=>{

                let dataFields = res.data.fields;
                let fields = dataFields.toString();
                let fields_split = fields.split(",");
                let fields_lenght = fields_split.length;
                let fields_replace = fields.replace(/,/g, " | ");                                
                
                this.setState({
                    arrayFields: res.data.fields,
                    fields: fields,
                    fieldsSplit: fields_split,
                    fieldsLenght: fields_lenght,
                    fieldsReplace: fields_replace,      
                    servicio: res.data.serviceName,
                    contentFormat: res.data.format,
                    monto: res.data.amount,
                    selectedCategoriaOption: res.data.category,
                    currencySymbol: res.data.currencySymbol,
                    buttonSave: 'hide',
                    buttonCancel: 'show',
                    varDisabled: 'true',
                    modalHeader: 'Ver Servicio Modificado', 
                    modalFooterButton: 'Guardar',
                    modal: !this.state.modal,
                    opcionForm: 3,                    
                    labelMonto: 'show',
                });                                
            })

            .catch((res)=>{
                console.log("Problemas al consultar los datos del servicio");
            });

            setTimeout(() => {

                this.setState({
                    divLoading: 'sizeDiv hide',
                    divContainer: 'container show',
                    
               
                });  
                        
            }, 3000);    
        }
    }

    cerrarModal = () => {
        this.setState({
            modal: false,
            servicioError: '',                         
            servicioInvalid: false, 
            divSelectCategoria: '', 
            categoriaError: '',
            montoError: '',
            montoInvalid: false,
            divFormato: '',
            formatoError: '',
            /*fields: '',
            fieldsSplit: [],
            fieldsLenght: '',
            fieldsReplace: '',
            arrayFields: [],  */
            /*divContainer: 'container hide',            
            rol: '',
            selected: [],
            varDisabled: '',
            buttonSave: 'show'*/
        });
    }    

    handleChangeSelectCategory = (selectedCategoriaOption) => {
        this.setState({ 
                selectedCategoriaOption,
                categoriaError: '',
                divSelectCategoria: ''                                
            });                
    }

    validateSaveServicios = () => {

        let servicioInvalid = false;
        let servicioError = "";

        let divSelectCategoria = "";
        let categoriaError = "";

        let divFormato = "";
        let formatoError = "";        

        let montoInvalid = false;
        let montoError = "";

        if (this.state.servicio === "") {
            
            servicioError = "¡Ingrese el servicio!";
            servicioInvalid = true;

        }

        if ((this.state.selectedCategoriaOption === null) || (this.state.selectedCategoriaOption.length === 0)){
            
            divSelectCategoria = "borderColor";
            categoriaError = "¡Seleccione la categoria!";            
            
        }   

        if (this.state.monto === "0.00") {
            
            montoError = "¡Ingrese el monto!";
            montoInvalid = true;

        }

        if (this.state.contentFormat === "") {
            
            divFormato = "borderColor";
            formatoError = "Ingrese el contenido";

        }

         if (servicioError || categoriaError || montoError || formatoError) {
            
            this.setState({ 
                    servicioError,                         
                    servicioInvalid, 
                    divSelectCategoria, 
                    categoriaError,
                    montoError,
                    montoInvalid,
                    divFormato,
                    formatoError,
            });                
           
            return false;

        }
        
        return true;
    }
    

    handleSaveServicio = event => {
        
        event.preventDefault();
        const isValid = this.validateSaveServicios();        
        if (isValid) {  
            if(this.state.opcionForm === 2)
            {
                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })

                let valueCategoria = "";
                let categoria = Object.values(this.state.selectedCategoriaOption);
                categoria.forEach(function (elemento, indice, array) {
                    if(indice === 0){
                        valueCategoria = elemento;
                    }            
                });   

                const apiEditService = (this.state.conexion+"EditService");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apiEditService,
                    data: {
                        service:this.state.servicio,
                        category: valueCategoria,
                        amount: this.state.monto,
                        format: this.state.contentFormat,
                        fields: this.state.arrayFields,
                        licenseId: this.state.licenseIdState,
                        serviceId: this.state.serviceIdState,
                        timeZ:this.state.timeZ,
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    console.log("Operacion exitosa");                    
                    this.setState({ 
                        servicio: '',
                        selectedCategoriaOption: null,
                        monto: '0.00',
                        contentFormat: '',
                        arrayFields: [],
                        servicioError: '',
                        servicioInvalid: false,
                        divSelectCategoria: '',
                        categoriaError: '',
                        montoError: '',
                        montoInvalid: false,
                        divFormato: '',
                        formatoError: '',
                        alertCheck: 'show check',
                        alertExc: 'hide warning',
                        bodyAlert: '¡Operacion Exitosa!',
                        buttonAceptarAlert: 'hide',                        
                        buttonCancelAlert: 'hide',
                    });   
                    this.LoadServices();
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
        }

    }

    handlekeyServicio = event =>{
        this.setState({
            servicioError: "",
            servicioInvalid: false,            
        })
    }

    handlekeyMonto = event =>{
        this.setState({            
            montoError: '',
            montoInvalid: false
        })
    }

    prueba = () => {
        /*console.log(this.state.servicio);
        console.log(this.state.selectedCategoriaOption);
        console.log(this.state.monto);
        console.log(this.state.contentFormat);
        console.log(this.state.arrayFields);      */  
        console.log(this.state.plantilla);
        console.log(this.state.contentFormatPlantilla);
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

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    togglePlantilla = (opcion, id, pos) => {
        if(opcion === "1")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
                //modal: !this.state.modal
               
            });   
                
            this.setState({
                buttonSave: 'show',
                buttonCancel: 'show',
                varDisabled: '',
                modalHeader: 'Registrar Plantilla', 
                modalPlantilla: !this.state.modalPlantilla,
                modalFooterButton: 'Guardar',
                opcionForm: 4,                           
            });                                
            
            setTimeout(() => {

                this.setState({
                    divLoading: 'sizeDiv hide',
                    divContainer: 'container show',
                    
               
                });  
                        
            }, 3000);      
        }
        else if(opcion === "2")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
            }); 

            const apiLoadTemplateslId = this.state.conexion+"LoadTemplateslId";          
            const token = window.localStorage.getItem('id_token');

            axios({
                method: 'post',
                url: apiLoadTemplateslId,
                data: {
                    posicion: pos,                    
                },
                headers:
                {'access-token' : token}
            })
            .then((res)=>{
                
                this.setState({
                    plantilla: res.data.template,
                    contentFormatPlantilla: res.data.content,
                    buttonSave: 'hide',
                    buttonCancel: 'show',
                    varDisabled: 'true',
                    modalHeader: 'Ver Plantilla', 
                    modalPlantilla: !this.state.modalPlantilla,
                    modalFooterButton: 'Guardar',
                    opcionForm: 5,    
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
                        
            }, 3000);   
        }
        else if(opcion === "3")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
            }); 

            const apiLoadTemplateslId = this.state.conexion+"LoadTemplateslId";          
            const token = window.localStorage.getItem('id_token');

            axios({
                method: 'post',
                url: apiLoadTemplateslId,
                data: {
                    posicion: pos,                    
                },
                headers:
                {'access-token' : token}
            })
            .then((res)=>{
                
                this.setState({
                    plantilla: res.data.template,
                    contentFormatPlantilla: res.data.content,
                    buttonSave: 'show',
                    buttonCancel: 'show',
                    varDisabled: '',
                    modalHeader: 'Modificar Plantilla', 
                    modalPlantilla: !this.state.modalPlantilla,
                    modalFooterButton: 'Guardar',
                    opcionForm: 6,  
                    posEditPlantilla: pos  
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
                        
            }, 3000);   
        }
    }

    handlekeyPlantilla = event =>{
        this.setState({
            plantillaError: "",
            plantillaInvalid: false,            
        })
    }

    cerrarModalPlantilla = () => {
        this.setState({
            modalPlantilla: false,
            plantilla: '',
            plantillaError: '',                         
            plantillaInvalid: false, 
            contentFormatPlantilla: '',            
            divFormato: '',
            formatoError: '',
            
        });
    }    

    validateSavePlantilla = () => {

        let plantillaInvalid = false;
        let plantillaError = "";        

        let divFormato = "";
        let formatoError = ""; 
                   

        if (this.state.plantilla === "") {
            plantillaError = "¡Ingrese el servicio!";
            plantillaInvalid = true;

        }

        if (this.state.contentFormatPlantilla === "") {
            divFormato = "borderColor";
            formatoError = "Ingrese el contenido";

        }

         if (plantillaError || formatoError) {
            
            this.setState({ 
                    plantillaError,
                    plantillaInvalid,                         
                    formatoError,    
                    divFormato,                 
            });                
           
            return false;

        }
        
        return true;
    }

    handleSavePlantilla = event => {

        event.preventDefault();
        const isValid = this.validateSavePlantilla();        
        if (isValid) {  
            if(this.state.opcionForm === 4)
            {
                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })

                const apiSaveTemplate = (this.state.conexion+"saveTemplate");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apiSaveTemplate,
                    data: {
                        plantilla:this.state.plantilla,
                        formato: this.state.contentFormatPlantilla,   
                        timeZ:this.state.timeZ,                     
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    console.log("Operacion exitosa");                    
                    this.setState({ 
                        plantilla: '',
                        plantillaError: '',
                        plantillaInvalid: false,
                        contentFormatPlantilla: '',
                        divFormato: '',
                        formatoError: '',
                        alertCheck: 'show check',
                        alertExc: 'hide warning',
                        bodyAlert: '¡Operacion Exitosa!',
                        buttonAceptarAlert: 'hide',                        
                        buttonCancelAlert: 'hide',
                    });   
                    this.LoadPlantillas();
                    this.toggleAlert();
                    this.cerrarModalPlantilla();                               
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
            else if(this.state.opcionForm === 6)
            {
                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })

                const apiEditTemplate = (this.state.conexion+"editTemplate");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apiEditTemplate,
                    data: {
                        plantilla:this.state.plantilla,
                        formato: this.state.contentFormatPlantilla,    
                        posicion: this.state.posEditPlantilla,
                        timeZ:this.state.timeZ,                    
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    console.log("Operacion exitosa");                    
                    this.setState({ 
                        plantilla: '',
                        plantillaError: '',
                        plantillaInvalid: false,
                        contentFormatPlantilla: '',
                        divFormato: '',
                        formatoError: '',
                        alertCheck: 'show check',
                        alertExc: 'hide warning',
                        bodyAlert: '¡Operacion Exitosa!',
                        buttonAceptarAlert: 'hide',                        
                        buttonCancelAlert: 'hide',
                        posEditPlantilla: '',
                    });   
                    this.LoadPlantillas();
                    this.toggleAlert();
                    this.cerrarModalPlantilla();                               
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
    }

    deletePlantilla = (id) => {

        this.setState({
            idDeletePlantilla: id,
            alertCheck: 'hide check',
            alertExc: 'show warning',
            bodyAlert: '¿Desea eliminar esta plantilla?',
            buttonAceptarAlert: 'show',                      
            buttonCancelAlert: 'show',                      
        });

        this.toggleAlert();
        
    } 

    aceptarDeletePlantilla = () => {

        const apiDeleteTemplateId = (this.state.conexion+"deleteTemplateId");
        const token = window.localStorage.getItem('id_token');
        axios({
            method: 'post',
            url: apiDeleteTemplateId,
            data: {
                posicion:this.state.idDeletePlantilla,
                timeZ:this.state.timeZ,                
            },
            headers:
            {'access-token' : token}
        })
        .then((res)=>{
            console.log("Operacion exitosa");   
            this.setState({ 
                idDeletePlantilla: '',
                buttonAceptarAlert: 'hide',                      
                buttonCancelAlert: 'hide',                                    
                alertCheck: 'show check',
                alertExc: 'hide warning',
                bodyAlert: 'Plantilla eliminada con exito!',
            });   
            this.LoadPlantillas();
            //this.toggleAlert();
                                        
            setTimeout(() => {
                this.cerrarModalAlert();
            }, 1000);                                    

        })

        .catch((res)=>{
            console.log("Error al eliminar la plantilla");
        });

    }

    render() {        
        const arrayContextMenu = this.state.fieldsSplit;
        const contexMenu = this.state.fieldsReplace;
        const arrayTemplates = this.state.arrayTemplatesTinyMce;

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
                                Servicios
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                                Plantillas
                            </NavLink>
                        </NavItem>                
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>      
                    <TabPane tabId="1">            
                        <div className="container">
                            <form className="formCodeConfirm" onSubmit={this.handleSaveServicio.bind(this)}>                                
                                <br />
                                <div align="center" className={this.state.divLoadingTable}><img src="assets/loader.gif" width="20%" height="5%"/></div>
                                <div className={this.state.divContainerTable}>
                                    <Table hover responsive borderless>
                                        <thead className="thead-light">
                                          <tr>
                                            <th style={{width:"10%"}}>Nro</th>                                                        
                                            <th style={{width:"30%"}}>Servicio</th>
                                            <th style={{width:"30%"}}>Categoria</th>
                                            <th style={{width:"15%"}}>Modificado</th>
                                            <th style={{width:"15%"}}>Acciones</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.services != null && 
                                                this.state.services.map((service, i) => {                
                                                    let estatus = "";
                                                    if(service.status === 1){
                                                        estatus = "SI";
                                                    }
                                                    else
                                                    {
                                                        estatus = "NO";
                                                    }
                                                    return (
                                                        <tr>
                                                            <td scope="row" style={{width:"10%"}}>{i + 1}</td>
                                                            <td style={{width:"30%"}}>{service.serviceName}</td>                                                        
                                                            <td style={{width:"30%"}}>{service.category}</td>                                                                                                                                                                          
                                                            <td style={{width:"15%"}}>{estatus}</td>                                                                                                                                                                          
                                                            <td style={{width:"15%"}}>
                                                                <div  className="float-left" >
                                                                    <a title="Ver Servicio Original" className=""  onClick={() => { this.toggle('1', service.licenseId, service.serviceId); }}><FaFileAlt /> </a>&nbsp;&nbsp;
                                                                    <a title="Ver Servicio Modificada" className=""  onClick={() => { this.toggle('3', service.licenseId, service.serviceId); }}><FaSearch /> </a>&nbsp;&nbsp;&nbsp;
                                                                    <a title="Modificar Servicio" className="" onClick={() => { this.toggle('2', service.licenseId, service.serviceId); }}><FaUserEdit /></a>&nbsp;&nbsp;&nbsp;                                                                    
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
                                        <div  className={this.state.divLoading} style={{padding:"2%"}}><img src="assets/loader.gif" width="30%" /></div>
                                        <div className={this.state.divContainer}>
                                        <ModalHeader toggle={this.cerrarModal}>{this.state.modalHeader}</ModalHeader>
                                        <ModalBody className="Scroll">      
                                            <FormGroup className="top form-group col-sm-12">                                                                 
                                                <Label for="servicio">Servicio</Label>
                                                <Input disabled={this.state.varDisabled} invalid={this.state.servicioInvalid} name="servicio" id="servicio" onKeyUp={this.handlekeyServicio} onChange={this.handleChange} value={this.state.servicio} type="text" placeholder="Servicio" />
                                                <FormFeedback tooltip>{this.state.servicioError}</FormFeedback>                                                            
                                            </FormGroup>
                                            <FormGroup className="top form-group col-sm-12">                                                                 
                                                <Label for="categoria">Categoria</Label>
                                                <div className={this.state.divSelectCategoria}>
                                                    <Select isSearchable="true" isDisabled={this.state.varDisabled} name="categoria" value={this.state.selectedCategoriaOption} onChange={this.handleChangeSelectCategory} options={this.state.categoria} />
                                                </div>
                                                <div className="errorSelect">{this.state.categoriaError}</div>                                                                
                                            </FormGroup>
                                            <FormGroup className= {"top form-group col-sm-12 " + this.state.labelMonto}>                                                                 
                                                <Label for="monto">Monto</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">{this.state.currencySymbol}</InputGroupAddon>
                                                    <Input disabled={this.state.varDisabled} invalid={this.state.montoInvalid} name="monto" id="monto" onKeyUp={this.handlekeyMonto} onChange={this.handleChange} value={this.state.monto} type="text" placeholder="Monto" onKeyPress={this.enterDecimal} onPaste = "false"  onBlur ={this.eventoBlur} onFocus = {this.eventoFocus}/>                                                             
                                                </InputGroup>
                                                <FormFeedback tooltip>{this.state.montoError}</FormFeedback>                                                            
                                            </FormGroup>
                                            <FormGroup className="top form-group col-sm-12">                                                                 
                                                <Label for="categoria">Formato</Label>
                                                <div className={this.state.divFormato}>
                                                    <Editor
                                                        apiKey = "https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=oq05o4hhb17qaasizya3qaal9dnl5pbc189e4mxw09npjjmj"
                                                        initialValue={this.state.contentFormat}
                                                        init={{
                                                            language_url: 'http://smartclinics.online/sc-front/es.js',
                                                            height: 500,    
                                                            theme: 'modern',
                                                            plugins: 'print preview fullpage paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
                                                            toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | demoItem | paciente',
                                                            image_advtab: true,
                                                            templates: arrayTemplates,
                                                            contextmenu: contexMenu,
                                                            setup: function (editor) {
                                                                var miArray = arrayContextMenu;
                                                                miArray.forEach(function (valor, indice, array) {
                                                                    editor.addMenuItem(valor, {
                                                                        text: valor,
                                                                        context: 'tools',
                                                                        onclick: function () {
                                                                            editor.insertContent(valor.toString());
                                                                        }
                                                                    });
                                                                });
                                                            }
                                                            
                                                        }}
                                                        onChange={this.handleEditorChange}                                                        
                                                        disabled={this.state.varDisabled}
                                                    />                                                    
                                                </div>
                                                <div className="errorSelect">{this.state.formatoError}</div>                                                                
                                            </FormGroup>                                            
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button className={this.state.buttonSave} color="primary" onClick={this.handleSaveServicio}>{this.state.modalFooterButton}</Button>
                                            <Button className={this.state.buttonCancel} color="danger" onClick={this.cerrarModal}>Cancelar</Button>                                                                                                              
                                            {/*<Button className={this.state.buttonCancel} color="danger" onClick={this.prueba}>Cancelar</Button>*/}                                                                                                              
                                        </ModalFooter>
                                        </div>
                                    </Modal>
                                </div>                                                                                                      
                            </form>
                        </div>
                    </TabPane>    
                    <TabPane tabId="2">            
                        <div className="container">
                            <form className="formCodeConfirm" onSubmit={this.handleSavePlantilla.bind(this)}>   
                            <div className="row">
                                <Button color="success" onClick={() => { this.togglePlantilla('1'); }}>Agregar</Button>                                                
                            </div>                             
                            <br />
                                <div align="center" className={this.state.divLoadingTable}><img src="assets/loader.gif" width="20%" height="5%"/></div>
                                <div className={this.state.divContainerTable}>
                                    <Table hover responsive borderless>
                                        <thead className="thead-light">
                                          <tr>
                                            <th style={{width:"30%"}}>Nro</th>                                                        
                                            <th style={{width:"40%"}}>Plantilla</th>
                                            <th style={{width:"30%"}}>Acciones</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.plantillasArray != null && 
                                                this.state.plantillasArray.map((plantilla, i) => {   
                                                    if(plantilla.status === true)
                                                    {                                                                 
                                                        return (
                                                            <tr>
                                                                <td scope="row" style={{width:"30%"}}>{i + 1}</td>
                                                                <td style={{width:"40%"}}>{plantilla.template}</td>                                                                                                                    
                                                                <td style={{width:"30%"}}>
                                                                    <div  className="float-left" >
                                                                        <a title="Ver Plantilla" className=""  onClick={() => { this.togglePlantilla('2', plantilla._id, i); }}><FaSearch /> </a>&nbsp;&nbsp;&nbsp;
                                                                        <a title="Modificar Plantilla" className=""  onClick={() => { this.togglePlantilla('3', plantilla._id, i); }}><FaUserEdit /> </a>&nbsp;&nbsp;&nbsp;
                                                                        <a title="Eliminar Plantilla" className="" onClick={() => { this.deletePlantilla(i); }}><FaMinusCircle /></a>&nbsp;&nbsp;&nbsp;                                                                    
                                                                    </div>
                                                                </td>
                                                            </tr>   
                                                        )
                                                    }
                                                })                                                        
                                            }      
                                        </tbody>
                                    </Table>                                                
                                </div> 
                                <div>
                                    <Modal isOpen={this.state.modalPlantilla} toggle={this.togglePlantilla} className="Modal">
                                        <div  className={this.state.divLoading} style={{padding:"2%"}}><img src="assets/loader.gif" width="30%" /></div>
                                        <div className={this.state.divContainer}>
                                        <ModalHeader toggle={this.cerrarModalPlantilla}>{this.state.modalHeader}</ModalHeader>
                                        <ModalBody className="Scroll">      
                                            <FormGroup className="top form-group col-sm-12">                                                                 
                                                <Label for="plantilla">Plantilla</Label>
                                                <Input disabled={this.state.varDisabled} invalid={this.state.plantillaInvalid} name="plantilla" id="plantilla" onKeyUp={this.handlekeyPlantilla} onChange={this.handleChange} value={this.state.plantilla} type="text" placeholder="Plantilla" />
                                                <FormFeedback tooltip>{this.state.plantillaError}</FormFeedback>                                                            
                                            </FormGroup>                                            
                                            <FormGroup className="top form-group col-sm-12">                                                                 
                                                <Label for="categoria">Plantilla</Label>
                                                <div className={this.state.divFormato}>
                                                    <Editor
                                                        apiKey = "https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=oq05o4hhb17qaasizya3qaal9dnl5pbc189e4mxw09npjjmj"
                                                        initialValue={this.state.contentFormatPlantilla}
                                                        init={{
                                                            height: 500,    
                                                            theme: 'modern',
                                                            plugins: 'print preview fullpage paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
                                                            toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | demoItem | paciente',
                                                            image_advtab: true
                                                        }}
                                                        onChange={this.handleEditorPlantillaChange}                                                        
                                                        disabled={this.state.varDisabled}
                                                    />                                                    
                                                </div>
                                                <div className="errorSelect">{this.state.formatoError}</div>                                                              
                                            </FormGroup>                                            
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button className={this.state.buttonSave} color="primary" onClick={this.handleSavePlantilla}>{this.state.modalFooterButton}</Button>
                                            <Button className={this.state.buttonCancel} color="danger" onClick={this.cerrarModalPlantilla}>Cancelar</Button>                                                                                                              
                                            {/*<Button className={this.state.buttonCancel} color="danger" onClick={this.prueba}>Cancelar</Button>*/}
                                        </ModalFooter>
                                        </div>
                                    </Modal>
                                </div>   
                            </form>    
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
                            <Button className={this.state.buttonAceptarAlert} color="primary" onClick={this.aceptarDeletePlantilla}>Aceptar</Button>
                            <Button className={this.state.buttonCancelAlert} color="danger" onClick="">Cancelar</Button>
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

export default Usuarios;
