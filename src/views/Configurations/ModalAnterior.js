import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Nav,
    NavItem,
    NavLink,
    Badge,
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
    Collapse,
    Progress,
    Row,
    Form,
    Table,Input, InputGroup, InputGroupAddon, InputGroupText, TabContent, TabPane, FormFeedback, FormGroup,Label } from 'reactstrap';
    import {  AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio  } from 'availity-reactstrap-validation';
   
    import axios from 'axios';
    import Autocomplete from 'react-google-autocomplete';
    import Geosuggest from 'react-geosuggest';
    import './geo.css'
    import './modal.css'
    import MapComponent from './map.js'
    import 'react-perfect-scrollbar/dist/css/styles.css';
    import PerfectScrollbar from 'react-perfect-scrollbar';
    import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaUserEdit,FaExclamationCircle, FaCheckCircle,FaMinusCircle} from 'react-icons/fa';
    import { Scrollbars } from 'react-custom-scrollbars';
    import { datosConexion } from '../../components/Conexion.js';
    import jstz from 'jstz';
   
    export default class ModalComponent extends React.Component {
        constructor(props) {
            super(props);

            let valueConexion = "";
            let arrayConexion = Object.values(datosConexion);
            arrayConexion.forEach(function (elemento, indice, array) {
                if(indice === 0){
                    valueConexion = elemento;
                }            
            });     

            const timezone = jstz.determine();c 

            this.state = { 
                modal: false,
                country: [],
                countryid:'',
                idpais: '',
                paisDropdownOpen: false,
                provinciaDropdownOpen: false,
                optionPais: '',
                optionProvincia: "Seleccionar ",
                sectorDropdownOpen: false,
                tipoDropdownOpen: false,
                optionSector: "Seleccionar ",
                optionTipo: "Seleccionar ",
                contact: [],
                collapse: false,
                collapseFile: false,
                collapseSocial: false,
                delete: '',
                sucursal:'',
                code : '',
                name: '',
                address: '',
                phone: '',
                email: '',
                pais: '',
                provincesid: '',
                contactname: true,
                contacttlf: true,
                contactemail: true,
                logo:null,
                foto1:null,
                foto2:null,
                foto3:null,
                facebook: '',
                instagram: '',
                twitter: '',
                web: '',
                tiposid: '',
                sectorid: '',
                provinces: [],
                tipos: [],
                sector:[],
                editprovince:[],
                position:null,
                zoomchange:16,

                //validate
                sucursalError: '',
                sucursalValid:false,
                sucursalInValid:false,
                tipoError:'',
                tipoValid:false,
                tipoInvalid:false,
                paisError:'',
                paisValid:false,
                paisInvalid:false,
                provinciaError:'',
                provinceValid:false,
                provinceInvalid:false,
                sectorError:'',
                sectorValid:false,
                sectorInvalid:false,
                direccionError:'',
                direccionValid:false,
                direccionInValid:false,

                //validate contact
                nombreError:'',
                nombreValid:false,
                nombreInvalid:false,
                telefonoError:'',
                telefonoValid:false,
                telefonoInValid:false,
                emailError:'',
                emailValid:false,
                emailInvalid:false,
                AddContactInv: false,
                AddContact: '',
                //validate multimedia
                logoError:'',
                logoValid:false,
                logoInvalid:false,
                collapseMap:false,
                modalAlert:false,
                mapValidmodal: false,
                valimsgmap: "¿Desea eliminar el registro?",
                mapValid:false,
                lat:null,
                lng:null,
                zoom: 16,
                // view
                sucursalesview:false,
                operacion:'',
                tipoview: false,
                sectorview:false,
                paisview:false,
                provinciaview:false,
                addressview:false,
                contactview: "formCodeConfirm show",
                deleteview:"text-danger show",
                acciones: "text-center show",
                button: "btn btn-success hide",
                buttoncancel: "hide",
                buttonsave:"hide",
                divhide:"text-center show",
                divfilehide:"row show",
                foto1Error:'',
                foto1Invalid:false,
                foto2Error:'',
                foto2Invalid:false,
                foto3Error:'',
                foto3Invalid:false,
                currentLatLng: {
                lat: null,
                lng: null,
                divLoading2:'hide',
                modaldiv: 'hide',
                check:'',
                divLoading:'sizeDiv show',
                divContainer:'hide',
                estadoModal: '',
                codigoDisabled: '',
                codigoInValid: false,
                codigo: '',
                codigoError: '',
                /*timeZ: timezone.name(),*/
                timeZ: timezone.name(),
                //conexion: 'http://localhost:8000/api/',
                //conexion: 'http://smartclinics.online/sc-admin/web/app.php/api/',
                conexion: valueConexion,
               
                },

            };
         
            this.modalConfirm = this.modalConfirm.bind(this);
            this.handleClickmap = this.handleClickmap.bind(this);
            this.delayedShowMarker=this.delayedShowMarker.bind(this)
            this.handleMarkerClick = this.handleMarkerClick.bind(this)
            this.getGeoLocation=this.getGeoLocation.bind(this)
            this.updatedeletecontact= this.updatedeletecontact.bind(this);
            this.deletecontact = this.deletecontact.bind(this);
            this.countryidEdit = this.countryidEdit.bind(this);
            this.provinceEdit = this.provinceEdit.bind(this);
            this.sectoredit=this.sectoredit.bind(this);
            this.toggleMap=this.toggleMap.bind(this);
            this.validate=this.validate.bind(this);
            this.setSucursal=this.setSucursal.bind(this);
            this.volver=this.volver.bind(this);
            this.fileHandleFoto2 = this.fileHandleFoto2.bind(this);
            this.fileHandleFoto3 = this.fileHandleFoto3.bind(this);
            this.fileHandleFoto1=this.fileHandleFoto1.bind(this);
            this.onSuggestSelect=this.onSuggestSelect.bind(this);
            // this.ValidationContactPhone = this.ValidationContactPhone.bind(this);
            // this.ValidationContactEmail = this.ValidationContactEmail.bind(this);
            this.pais = this.pais.bind(this);
            this.provincesValidation = this.provincesValidation.bind(this)
            // this.Social = this.Social.bind(this);
            this.tipos = this.tipos.bind(this);
            this.sector= this.sector.bind(this);
            this.toggleCancel=this.toggleCancel.bind(this)
            this.toggleContactos = this.toggleContactos.bind(this);
            this.toggleTipo = this.toggleTipo.bind(this);
            this.toggleSector = this.toggleSector.bind(this);
            this.toggleProvincia = this.toggleProvincia.bind(this);
            this.handleChangeCountry = this.handleChangeCountry.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.togglePais = this.togglePais.bind(this);
            this.toggleFiles = this.toggleFiles.bind(this);
            this.fileHandleLogo= this.fileHandleLogo.bind(this);
            this.continuar = this.continuar.bind(this);
            this.handleSubmitContact = this.handleSubmitContact.bind(this);
            this.toggleSocial = this.toggleSocial.bind(this);           
            this.sucursal=this.sucursal.bind(this);
            this.direccion=this.direccion.bind(this);
            this.handlekey3= this.handlekey3.bind(this);
            this.handlekey2= this.handlekey2.bind(this);
            this.handlekey1= this.handlekey1.bind(this);
            this.handleActionParent =this.handleActionParent.bind(this);
            this.refrescarMapa =this.refrescarMapa.bind(this);
        }

        
      
    toggleSocial() {
        this.setState({ collapseSocial: !this.state.collapseSocial });
    }
    toggleMap(){
        this.setState({ collapseMap: !this.state.collapseMap });
    }
    toggleFiles() {
        this.setState({ collapseFile: !this.state.collapseFile });
    }
    toggleContactos() {
        this.setState({ collapse: !this.state.collapse });
    }
    toggleTipo(){
        this.setState(prevState => ({
            tipoDropdownOpen: !prevState.tipoDropdownOpen
        }));
    }
    toggleSector(){
        this.setState(prevState => ({
            sectorDropdownOpen: !prevState.sectorDropdownOpen
        }));
    }
    toggleProvincia(){
        this.setState(prevState => ({
            provinciaDropdownOpen: !prevState.provinciaDropdownOpen
        }));
    }
    togglePais(){
        this.setState(prevState => ({
            paisDropdownOpen: !prevState.paisDropdownOpen
        }));
    }
    modalConfirm(item) {
        item.preventDefault();
    
        if(this.state.lat  || this.state.lng != null){
            this.handleSubmit()
        }else{
            this.setState(prevState => ({
                mapValidmodal: true,
            })); 
        }
    }
    volver(){
        this.setState(prevState => ({
            mapValidmodal: false,

        }));             

    }
    continuar(){
       this.handleSubmit()
    }
    handleChangeCountry(event) {
        this.setState({country: event.target.value});
    }

    fileHandleLogo = event =>{
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
               logo: file})


        }
        .bind(this)
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
        }
    }

    fileHandlerLogo = event =>{ 
      event.preventDefault();
       if(event.target.files[0].size > 25000) {
            this.setState({
                logoError:'El tamaño de la imagen no esta permitido ',
                logoInvalid:true,
                collapseFil:true,
            })
           
       }  
       else {
            this.setState({
                logoError:' ',
                logoInvalid:false,
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
                   logo: file
                })


                }
                .bind(this)
                // Convert data to base64
                fileReader.readAsDataURL(fileToLoad);
            }
       }      
        
    }

    fileHandleFoto1 = event =>{        
        event.preventDefault();
        if(event.target.files[0].size > 25000) {
            this.setState({
                foto1Error:'El tamaño de la imagen no esta permitido ',
                foto1Invalid:true,
                collapseFil:true,
            })
           
        }  
        else {
            this.setState({
                foto1Error:' ',
                foto1Invalid:false,
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
                       foto1: file})


                }.bind(this)
                // Convert data to base64
                fileReader.readAsDataURL(fileToLoad);

            }
        }
    }

    fileHandleFoto2 = event =>{
        event.preventDefault();
        if(event.target.files[0].size > 25000) {
              this.setState({
                foto2Error:'El tamaño de la imagen no esta permitido ',
                foto2Invalid:true,
                collapseFil:true,
              })
           
        }              
        else {
            this.setState({
                foto2Error:' ',
                foto2Invalid:false,
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
                       foto2: file})


                }.bind(this)
                // Convert data to base64
                fileReader.readAsDataURL(fileToLoad);
            }
        }
    }

    fileHandleFoto3 = event =>{
        event.preventDefault();
        if(event.target.files[0].size > 25000) {
              this.setState({
                foto3Error:'El tamaño de la imagen no esta permitido ',
                foto3Invalid:true,
                collapseFil:true,
              })
           
        }  
        else {
            this.setState({
                foto3Error:' ',
                foto3Invalid:false,
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
                           foto3: file
                        })
                    }
                    .bind(this)
                    // Convert data to base64
                    fileReader.readAsDataURL(fileToLoad);
                }
        }
    }
// fileUploadHandler = () => {
// }
    setSucursal= event =>{
        this.setState({
            sucursal : event.target.value
        })
    }

    deletecontact = event => {
        this.props.delete(event)
        this.updatedeletecontact()

    }
    //mapp///////////////////////////////////////////////////////////////////////////////
    componentWillMount(){    
        
        let valueConexion = "";
        let arrayConexion = Object.values(datosConexion);
        arrayConexion.forEach(function (elemento, indice, array) {
            if(indice === 0){
                valueConexion = elemento;
            }            
        });    

        const timezone = jstz.determine();
        
        this.setState({
            //conexion: 'http://localhost:8000/api/',
            conexion: valueConexion,
            lat:null,
            lng:null,
            zoom: 5,
            timeZ: timezone.name(),            
        })
        this.getGeoLocation();             
    }
        // componentWillUpdate(){

        //     this.getGeoLocation()
        // }


    onSuggestSelect(suggest) {
        
        if(suggest != undefined){

            this.setState(prevState => ({
                currentLatLng: {
                    ...prevState.currentLatLng,
                    lat: suggest.location.lat,
                    lng: suggest.location.lng
                },
                lat:suggest.location.lat,
                lng:suggest.location.lng,                  
            }))
            
            let i = 3.0;
            let mapzoom = setInterval(() => {
                if(this.state.zoom === 15)
                {
                    clearInterval(mapzoom);                    
                }
                else
                {
                    i = i + 1;                       
                    this.setState({zoom: i})               
                } 
            },200)           
        }
    }


    delayedShowMarker = () => {
        setTimeout(() => {
            this.getGeoLocation()
            this.setState({ isMarkerShown: true })
        }, 5000)
    }

    handleMarkerClick = () => {
        console.log('hola')
    }

    getGeoLocation = () => {       
            // console.log(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(
            position => {
                    // console.log(position.coords);
                this.setState(prevState => ({
                    currentLatLng: {
                        ...prevState.currentLatLng,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },                                         
                   
                }))
            },
            (error) => {
                this.setState(prevState => ({
                    currentLatLng: {
                    ...prevState.currentLatLng,
                    lat: -12.529139230742171,
                    lng: -76.71926610430297
                    }, 
                    zoom: 5
                }))
            }

        ) 
    } 
        

    handleClickmap(event: google.maps.MouseEvent | google.maps.IconMouseEvent){
      
        this.setState(prevState => ({
            currentLatLng: {
                ...prevState.currentLatLng,
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            },
            lat:event.latLng.lat(),
            lng: event.latLng.lng(),
            zoomchange:1

        }))
        let i = 0;
        for (i = 7;i < 10 ; i++) {
             // Se ejecuta 5 veces, con valores desde paso desde 0 hasta 4.
            setTimeout(() => {
                console.log('activado')  
                this.setState({zoom: i})
            },2000)
            console.log(this.state.zoom)
        };
    }

/////////////////////////////////////////////////////////////////////////////////////////////


 

    validate = () => {
        let sucursalError = "";  
        let sucursalInValid =false;   
        let sucursalValid=false; 

        let codigoError = "";  
        let codigoInValid =false;           

        let paisError = "";
        let paisValid = false;
        let paisInvalid=false;

        let provinciaError = "";
        let provinceInvalid=false;
        let provinceValid = false;

        let sectorError='';
        let sectorValid=false;
        let sectorInvalid=false;

        let direccionError='';
        let direccionValid=false;
        let direccionInValid=false;

        let tipoError='';
        let tipoValid=false;
        let tipoInvalid=false;
        let nombreError='';
        let nombreValid=false;
        let nombreInvalid=false;

        let telefonoError='';
        let telefonoValid=false;
        let telefonoInValid=false;

        let emailError='';
        let emailValid=false;
        let emailInvalid=false;

        let AddContactInv=false;


        let logoError='';
        let logoInvalid=false;
        let collapseFile=false;
        let AddContact = '';

        let collapse=false;
        if (this.state.sucursal === '') {
            sucursalError = "¡Ingrese el nombre!";
            sucursalInValid =true
        }

        if (this.state.codigo === '') {
            codigoError = "¡Ingrese el codigo!";
            codigoInValid = true
        }

        if (!this.state.optionPais) {
            paisError = "¡Seleccione el pais!";
            paisInvalid = true
        }

        if (!this.state.provincesid) {
            provinciaError = "¡Seleccione la provincia!";
            provinceInvalid = true;
        }
        if (!this.state.sectorid){
            sectorError="¡Seleccione el sector!",
            sectorInvalid=true;
        }
        if(!this.state.tiposid){
            tipoError='¡Seleccione el tipo!';
            tipoInvalid=true;
        }
        if(!this.state.address){
            direccionError="¡Ingresa la direccion de la sucursal!";
            direccionInValid=true;
        }

        if(this.state.logo === null){
            logoError="¡Ingresa el logo de tu sucursal!";
            logoInvalid=true;
            collapseFile=true;
            console.log(this.props.contacto) 
        }

        if (this.props.contacto.length  === 0 || this.props.contacto=== undefined){
            AddContact= "¡Ingresa al menos un contacto!";
            AddContactInv= true;
            nombreError="¡Ingresa un nombre!";               
            nombreInvalid=true;
            telefonoError="¡Ingresa un numero de telefono!",            
            telefonoInValid=true;
            emailError="¡Ingresa email!";             
            emailInvalid=true;
            collapse=true;
        }

        if (sucursalError || codigoError || paisError || provinciaError || sectorError || tipoError || direccionError || logoError || AddContact  ) {
            this.setState({  
                AddContactInv,
                sucursalError,
                sucursalInValid,
                codigoError,
                codigoInValid,
                paisError,
                paisInvalid,
                provinciaError,
                provinceInvalid,
                sectorError,
                sectorInvalid,
                tipoError,
                tipoInvalid,
                direccionError,
                direccionInValid,
                logoError,
                logoInvalid,
                collapse,
                AddContact,
                nombreError,
                nombreInvalid,
                telefonoError,
                telefonoInValid,
                emailError,
                emailInvalid,
                collapseFile,
            });
            return false;
        }


    return true;
    }   

    handleActionParent = (event) => {        
        //console.log('called from parent') 
        this.setState({
            divLoading: 'hide',
            divContainer: 'show',
            estadoModal: '1',
            modal: true,
        })             
    }

    countryidEdit   = () =>{
        if (this.state.optionPais === "" ){            
            //this.getGeoLocation()
            this.setState({   
                estadoModal: '2', 
                divLoading: 'show',
                divContainer: 'hide',            
                optionPais : this.props.edit.countryId,
                sectorid: this.props.edit.sector,
                contact:this.props.contacto,
                tiposid: this.props.edit.type,
                sucursal: this.props.edit.name,
                codigo: this.props.edit.code,
                logo : this.props.edit.logo ,
                foto1 : this.props.edit.foto1,
                foto2 : this.props.edit.foto2,
                foto3 : this.props.edit.foto3,
                facebook : this.props.edit.facebook,
                twitter : this.props.edit.twitter,
                instagram : this.props.edit.instagram,
                web : this.props.edit.web,
                provincesid: this.props.edit.provinceId,
                address: this.props.edit.direccion,
                lat: this.props.edit.lat,
                lng: this.props.edit.log,
                currentLatLng: {
                    lat: this.props.edit.lat,
                    lng: this.props.edit.log
                },
                position:this.props.posicion,
                sucursalesview:this.props.sucursalesview,
                tipoview: this.props.tipoview,
                sectorview:this.props.sectorview,
                paisview:this.props.paisview,
                provinciaview:this.props.provinciaview,
                addressview:this.props.addressview,
                contactview: this.props.contactview,
                deleteview:this.props.deleteview,
                button: this.props.button,
                buttoncancel: this.props.buttoncancel,
                buttonsave:this.props.buttonsave,
                acciones: this.props.acciones,
                collapse:this.props.collapse,
                collapseFile:this.props.collapseFile,
                collapseMap:this.props.collapseMap,
                collapseSocial:this.props.collapseSocial,
                divhide: this.props.divhide,
                divfilehide:this.props.divfilehide,
                //zoom:7,
                
                
            })

            this.setState(prevState => ({
                currentLatLng: {
                    ...prevState.currentLatLng,
                    lat: this.props.edit.lat,
                    lng: this.props.edit.log
                },
                lat:this.props.edit.lat,
                lng:this.props.edit.log                  
            }))
            
            let i = 3.0;
            let mapzoom = setInterval(() => {
                if(this.state.zoom === 15)
                {
                    clearInterval(mapzoom);                    
                }
                else
                {
                    i = i + 1;                       
                    this.setState({zoom: i})               
                } 
            },200)  
            
            if(this.props.edit.name){
                this.setState({
                    divLoading: 'hide',
                    divContainer: 'show',
                    modal: true,
                })         
            }
        }        
    }

    handleSubmit() {

        this.setState(prevState => ({
            mapValidmodal: false,
        }));       
        const isValid = this.validate();
        
        if(isValid){
            
            this.setState({ divLoading2: 'show', modalAlert:true, check:'hide'})
            const apiBaseUrl =(this.state.conexion+"saveBranchOffices")
            const apiBaseEdit = (this.state.conexion+"editBranchOffices")
                // const apiBaseUrl = ("http://192.168.0.117:8000/api/saveBranchOffices");
                // const apiBaseEdit=("http://192.168.0.117:8000/api/editBranchOffices")
                const token = window.localStorage.getItem('id_token');
                const datoss={
                    data: {
                        posicion: this.state.position,
                        sucursal:this.state.sucursal,
                        code: this.state.codigo,
                        idCountry: this.state.optionPais,
                        provincesid: this.state.provincesid,
                        type : this.state.tiposid,
                        sector: this.state.sectorid,
                        log: this.state.lng,
                        lat: this.state.lat,
                        contactos:this.props.contacto,
                        logo: this.state.logo,
                        foto1: this.state.foto1,
                        foto2: this.state.foto2,
                        foto3: this.state.foto3,
                        facebook: this.state.facebook,
                        twitter: this.state.twitter,
                        instagram: this.state.instagram,
                        web: this.state.web,
                        direccion:this.state.address,
                        timeZ:this.state.timeZ,
                    }
                }
                console.log(datoss)

            if (this.state.position != null){
           
                axios({
                    method: 'post',
                    url: apiBaseEdit,
                    data: {
                        posicion: this.state.position,
                        sucursal:this.state.sucursal,
                        code: this.state.codigo,
                        idCountry: this.state.optionPais,
                        provincesid: this.state.provincesid,
                        type : this.state.tiposid,
                        sector: this.state.sectorid,
                        log: this.state.lng,
                        lat: this.state.lat,
                        contactos:this.props.contacto,
                        logo: this.state.logo,
                        foto1: this.state.foto1,
                        foto2: this.state.foto2,
                        foto3: this.state.foto3,
                        facebook: this.state.facebook,
                        twitter: this.state.twitter,
                        instagram: this.state.instagram,
                        web: this.state.web,
                        direccion:this.state.address,
                        timeZ:this.state.timeZ,
                    },

                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    console.log(res,'edit')
                    this.props.refresh(false)
                  
                })
                .catch((res)=>{
                    console.log(res)
                });

            }
            else{
                axios({
                    method: 'post',
                    url: apiBaseUrl,
                    data: {                    
                        sucursal:this.state.sucursal,
                        code: this.state.codigo,
                        idCountry: this.state.optionPais,
                        provincesid: this.state.provincesid,
                        type : this.state.tiposid,
                        sector: this.state.sectorid,
                        log: this.state.lng,
                        lat: this.state.lat,
                        contactos:this.props.contacto,
                        logo: this.state.logo,
                        foto1: this.state.foto1,
                        foto2: this.state.foto2,
                        foto3: this.state.foto3,
                        facebook: this.state.facebook,
                        twitter: this.state.twitter,
                        instagram: this.state.instagram,
                        web: this.state.web,
                        direccion: this.state.address,
                        timeZ:this.state.timeZ,
                    },

                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                  console.log('save')
                    this.props.refresh(false)
                    this.setState({
                        lat:null,
                        lng:null,
                        address:'',
                        optionPais : '',
                        sucursal   :'',
                        codigo: '',
                        codigoError: '',
                        codigoInValid: false,
                        logo : null ,
                        foto1 :null,
                        foto2 :null,
                        foto3 : null,
                        facebook : '',
                        twitter : '',
                        instagram : '',
                        web : '',
                        provincesid: '',
                        sectorid: '',
                        tiposid: '',
                        countryid: '',
                        provinces: [],
                        contact:[],
                        address:'',
                        sucursalError: '',
                        sucursalInValid: null,
                        paisError: '',
                        paisInvalid:null,
                        provinciaError:'',
                        provinceInvalid:null,
                        sectorError:'',
                        sectorInvalid:null,
                        tipoError:'',
                        tipoInvalid:null,
                        direccionError:'',
                        direccionInValid:null,
                        logoError:'',
                        logoInvalid:null,
                        collapse:null,
                        nombreError:'',
                        nombreInvalid:null,
                        telefonoError:'',
                        telefonoInValid:null,
                        emailError:'',
                        emailInvalid:null,
                        collapseFile:null,
                        AddContactInv: false,
                        AddContact: ' ',
                        isMarkerShown: true,
                        zoom: 5,
                        mapValid: false,
                        mapValidmodal: false,
                        sucursalesview:'',
                        tipoview: '',
                        sectorview:'',
                        paisview:'',
                        provinciaview:'',
                        addressview:'',
                        contactview: "formCodeConfirm show",
                        deleteview:"text-danger show",
                        acciones: "text-center show",
                        button: "btn btn-success hide",
                        buttoncancel: "show",
                        buttonsave:"show",
                        divhide:"text-center show",
                        divfilehide:"row show"

                    })
                         
                    // this.props.loadbranch()
                    
                })
                .catch((res)=>{
                    console.log(res)
                });
            }
        } 
    }

    cerrarmodal(e){
        console.log(e)
        if(e ===true){
            
            this.setState({
                check: 'check show',
                divLoading2: 'hide',
                operacion:"Operacion exitosa!",            
            })

            setTimeout(() => {
                console.log('activado')  
                this.setState({
                    check:'hide check',
                    modalAlert:false,
                    operacion:""

                })
               this.props.Toggle(false)          
               this.toggleCancel()
            },500)
        }
    }

    toggleCancel(e) {        
        this.setState({
            modal: false,
            zoom: 5,
            position:null,
            address:'',
            optionPais : '',
            sucursal   :'',
            codigo: '',
            codigoError: '',
            codigoInValid: false,
            logo : null ,
            foto1 :null,
            foto2 :null,
            foto3 : null,
            facebook : '',
            twitter : '',
            instagram : '',
            web : '',
            provincesid: '',
            sectorid: '',
            tiposid: '',
            countryid: '',
            provinces: [],
            contact:[],
            address:'',
            sucursalError: '',
            sucursalInValid: null,
            paisError: '',
            paisInvalid:null,
            provinciaError:'',
            provinceInvalid:null,
            sectorError:'',
            sectorInvalid:null,
            tipoError:'',
            tipoInvalid:null,
            direccionError:'',
            direccionInValid:null,
            logoError:'',
            logoInvalid:null,
            collapse:null,
            nombreError:'',
            nombreInvalid:null,
            telefonoError:'',
            telefonoInValid:null,
            emailError:'',
            emailInvalid:null,
            collapseFile:null,
            AddContactInv: false,
            AddContact: ' ',
            isMarkerShown: true,
            mapValid: false,
            mapValidmodal: false,
            sucursalesview:'',
            tipoview: '',
            sectorview:'',
            paisview:'',
            provinciaview:'',
            addressview:'',
            contactview: "formCodeConfirm show",
            deleteview:"text-danger show",
            acciones: "text-center show",
            button: "btn btn-success hide",
            buttoncancel: "hide",
            buttonsave:"hide",
            divhide:"text-center show",
            lat:null,
            lng:null,
            divfilehide:"row show",
            estadoModal: '',

        })

       this.props.Toggle(false)

    }

    handleSubmitContact = () =>{
 
        let nombreError='';
        let nombreValid=false;
        let nombreInvalid=false;

        let telefonoError='';
        let telefonoValid=false;
        let telefonoInValid=false;

        let emailError='';
        let emailValid=false;
        let emailInvalid=false;

        if(this.props.contacto != undefined  ){
            Object.keys(this.props.contacto).map((d, i) =>{            
                if(this.props.contacto[i].name === this.state.name){
                    nombreError="¡Este nombre esta siendo usado!"
                    nombreInvalid=true; 
                }
                if(this.props.contacto[i].email === this.state.email){
                    emailError="¡Este correo esa siendo usado!";             
                    emailInvalid=true;
                } 
                if(this.props.contacto[i].phone === this.state.phone){
                    telefonoError="¡Este numero de telefono esta siendo usado!",            
                    telefonoInValid=true;
                }
            })
        }
        if(this.state.name === ''){
            nombreError="¡Ingresa un nombre!";               
            nombreInvalid=true;  
        }
        if(this.state.phone=== '' ){
            telefonoError="¡Ingresa un numero de telefono!",            
            telefonoInValid=true;
        }
        if(this.state.email ===''  || this.state.email.match(/@/) === null){
            emailError="¡Ingresa email!";             
            emailInvalid=true;
        }

        if (nombreError || telefonoError || emailError ) {
            this.setState({  
                nombreError,
                nombreInvalid,
                telefonoError,
                telefonoInValid,
                emailError,
                emailInvalid,
            });
            return false;
        }   
        this.state.contact.push({name: this.state.name, phone: this.state.phone, email: this.state.email})
        this.props.submitContact(this.state.contact)
        console.log(this.state.contact)
        this.setState({
            name : '',
            phone:'',
            email:'',
            AddContact:''

        },function(){
            console.log(this.state.AddContactInv)
        })

        return true;
    }



    provinceEdit = event => {
        if(event === 1 ){
            if (this.state.provinces.length === 0 )
            {
                const apiBaseUrl = (this.state.conexion+"loadCountries");
                // const apiBaseUrl = ("http://192.168.0.117:8000/api/loadCountries");
                const token = window.localStorage.getItem('id_token');

                axios({
                    method: 'post',
                    url: apiBaseUrl,
                    data: {
                    idCountry: this.props.edit.countryId
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    this.setState({
                        provinces : res.data.provinces
                    })
                })
                .catch((res)=>{
                    console.log(res)
                });
            }
        }
    }

    sucursal= event =>{    

        this.setState({
            sucursal:event.target.value,
            sucursalError: '',
            sucursalInValid:false,
        })
    }

    codigo= event =>{    

        this.setState({
            codigo:event.target.value,
            codigoError: '',
            codigoInValid:false,
        })
    }

    pais = event =>{

        event.preventDefault();
        this.setState({
            optionPais: event.target.value,
            paisError:'',
            paisInvalid:false,
        })

        if (this.state.optionPais !== null){
            const apiBaseUrl = (this.state.conexion+"loadCountries");
            // const apiBaseUrl = ("http://192.168.0.117:8000/api/loadCountries");
            const token = window.localStorage.getItem('id_token');
            const idCountry= event.target.value
            axios({
                method: 'post',
                url: apiBaseUrl,
                data: {
                idCountry: idCountry
                },
                headers:
                {'access-token' : token}
            })
            .then((res)=>{
                this.setState({
                    provinces : res.data.provinces
                })
            })
            .catch((res)=>{
                console.log(res)
            });
        } 
    }

    componentDidMount(){        

        this.delayedShowMarker();
        // const apiBaseUrl = ("http://192.168.0.117:8000/api/loadCountries");
        //const apiBaseGeneral= this.state.conexion+"loadGeneralConfiguration"
        const apiBaseGeneral = this.state.conexion+"loadGeneralConfiguration";
        const apiBaseUrl = this.state.conexion+"loadCountries"
        // axios.get(apiBaseUrl+'/api/prueba/')
        const token = window.localStorage.getItem('id_token');
        const datos={
            headers:
                {'access-token' : token }
            }

        axios.get(apiBaseUrl, datos)
        .then((res) => {

            this.setState({
                country: res.data   
            })

        })
        .catch((error) => {
        });

        axios({
            method: 'get',
            url: apiBaseGeneral,
            headers:
            {'access-token' : token}
        })
            .then((res)=>{
            this.setState({
                sector : res.data.sectormedicalcenter
            })w
            this.setState({
                tipos : res.data.typemedicalcenter,                
            })
        })
        .catch((res)=>{
            console.log(res)
        });        
    }


    tipos = event =>{                    
        this.setState({
            tiposid:event.target.value,
            tipoError:'',             
            tipoInvalid:false,
        })
    }

    direccion = event =>{
        this.setState({
            address : event.target.value,  
            direccionError:'',
            direccionInValid:false,
        })
    }

    sectoredit= valor=>{
        if( this.state.sectorid === ''){
            this.setState({
                sectorid: this.props.edit.sector
            })
        }
    }

    handlekey3 = event =>{
        this.setState({
            emailInvalid:false,
        })
    }

    handlekey2 = event =>{
        this.setState({
            telefonoInValid:false,
        })
    }

    handlekey1 = event =>{
        this.setState({
            nombreInvalid:false,
        })
    }

    sector= event =>{
        this.setState({
            sectorid:event.target.value,
            sectorError:'',
            sectorInvalid:false,
        })
    }

    provincesValidation= event =>{
        event.preventDefault();
        this.setState({  
            provinciaError:'',
            provinceInvalid:false,
            provincesid: event.target.value
        })
    }

    updatedeletecontact = () =>{
        setTimeout(() => {
            this.setState({
                contact: this.props.contacto
            })
        }, 500)
    }

    refrescarMapa(){
        if(this.state.estadoModal === "1"){
            this.getGeoLocation();   
            this.setState({            
                lat:null,
                lng:null,
                zoom: 5,
            })
         
        }
        else if(this.state.estadoModal === "2"){
            this.setState(prevState => ({
                currentLatLng: {
                    ...prevState.currentLatLng,
                    lat: this.props.edit.lat,
                    lng: this.props.edit.log
                },
                lat:this.props.edit.lat,
                lng:this.props.edit.log                  
            }))
            
            let i = 3.0;
            let mapzoom = setInterval(() => {
                if(this.state.zoom === 15)
                {
                    clearInterval(mapzoom);                    
                }
                else
                {
                    i = i + 1;                       
                    this.setState({zoom: i})               
                } 
            },200)  
            
            if(this.props.edit.name){
                this.setState({
                    divLoading: 'hide',
                    divContainer: 'show',
                })         
            }
        }
    }

    render() { 

    this.provinceEdit(this.props.update)
    // console.log(this.state.currentLatLng)

    return (
    <div>
        <Modal isOpen={this.state.modal} {...this.props}  aria-labelledby="contained-modal-title-lg"  className="Modal" >
        <div align="center" className={this.state.divLoading} style={{padding:"5%"}}><img src="assets/loader.gif" width="30%"  /></div>
        <div className={this.state.divContainer}>
            <form >
                <ModalHeader>Configuracion Centro Medicos</ModalHeader>
                <ModalBody className="Scroll" >
                    <div className="row">
                        <FormGroup className="top form-group col-sm-6" >
                            <Label for="Sucursal" className="mr-sm-2">Sucursal</Label>
                            <Input type="text" name="Sucursal" id="Sucursal" valid={this.state.sucursalValid} disabled={this.state.sucursalesview} invalid={this.state.sucursalInValid} value={this.state.sucursal}  onChange={event => this.sucursal(event)} />
                            <FormFeedback tooltip>{this.state.sucursalError}</FormFeedback>        
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6" >
                            <Label for="codigo" className="mr-sm-2">Codigo</Label>
                            <Input type="text" name="codigo" id="codigo" disabled={this.state.codigoDisabled} invalid={this.state.codigoInValid} value={this.state.codigo}  onChange={event => this.codigo(event)} />
                            <FormFeedback tooltip>{this.state.codigoError}</FormFeedback>        
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6" >
                            <Label for="tipo">Tipo</Label>
                            <Input type="select" name="tipo" valid={this.state.tipoValid} invalid={this.state.tipoInvalid} disabled={this.state.tipoview} id="tipo"  onChange={event => this.tipos(event)}  >
                            <option value= {null} >Select...</option>
                            {
                                Object.keys(this.state.tipos).map((d, i) =>{

                                    if(d === this.state.tiposid)
                                    {
                                        return(
                                            <option value={d}  selected>{this.state.tipos[d]}</option>
                                        )
                                    }
                                    else
                                    {
                                        return(
                                            <option value={d}   >{this.state.tipos[d]}</option>
                                        )   
                                    }
                                })
                            }                                  
                            </Input> 
                            <FormFeedback tooltip>{this.state.tipoError}</FormFeedback>   
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6" >
                            <Label for="paisid">Pais</Label>
                            <Input type="select" name="pais" id="paisid"  valid={this.state.paisValid} invalid={this.state.paisInvalid} disabled={this.state.paisview}onChange={event =>this.pais(event)}  >
                            <option  value={null}>Select...</option>
                            {
                                Object.keys(this.state.country).map((d, i) =>{

                                    if(this.state.country[d].id === this.state.optionPais){ 
                                    let a = this.state.country[d].provinces 
                                    let b = this.props.edit.countryId
                                        return(
                                            <option value={this.state.country[d].id} selected>{this.state.country[d].name}</option>
                                        )
                                    }
                                    else
                                    {
                                        return(
                                            <option value={this.state.country[d].id} >{this.state.country[d].name}</option>
                                        )
                                    }
                                })
                            }                                   
                            </Input>
                            <FormFeedback tooltip>{this.state.paisError}</FormFeedback>  
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6" >
                            <Label for="provincia">Provincia</Label>
                            <Input type="select" name="provincia" id="provincia" valid={this.state.provinceValid} disabled={this.state.provinciaview} invalid={this.state.provinceInvalid} onChange={event =>    this.provincesValidation(event)}  >
                            <option value= {null} >Select...</option>
                            {   
                                Object.keys(this.state.provinces).map((d) =>{
                                    if( d === this.props.edit.provinceId){
                                        this.countryidEdit(true)
                                        return(
                                            <option value={d} selected  >{this.state.provinces[d].name}</option>
                                        )

                                    }
                                    else
                                    {
                                        return(
                                           <option value={d} >{this.state.provinces[d].name}</option>
                                        )
                                    }
                                })
                            }                                   
                            </Input>
                            <FormFeedback tooltip>{this.state.provinciaError}</FormFeedback>  
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6" >
                            <Label for="tipo">Sector</Label>
                            <Input type="select" name="Sector" valid={this.state.sectorValid}  invalid={this.state.sectorInvalid} id="Sector" disabled={this.state.sectorview} onChange={event => this.sector(event)}  >
                            <option value= {null} >Select...</option>
                            {
                                Object.keys(this.state.sector).map((d, i) =>{

                                if (d === this.state.sectorid){
                                    return(
                                        <option value={d} selected  >{this.state.sector[d]}</option>
                                    )
                                }
                                    return(
                                        <option value={d} >{this.state.sector[d]}</option>
                                    )
                                })
                            }                                   
                            </Input>
                            <FormFeedback tooltip>{this.state.sectorError}</FormFeedback>  
                        </FormGroup>

                        <FormGroup className="top form-group col-sm-6" >
                            <Label for="Direccion" >direccion</Label>
                            <Input type="text" value={this.state.address} name="Direccion" id="Direccion"  valid={this.state.direccionValid} disabled={this.state.addressview}invalid={this.state.direccionInValid} onChange={this.direccion}/>
                            <FormFeedback tooltip>{this.state.direccionError}</FormFeedback>  
                        </FormGroup>


                    </div>  
                    <hr/>
            {/* ---------------------------------------------------------Contactos--------------------------------------------------------------- */}


      

                    <div>
                        <div>
                            <Modal isOpen={this.state.mapValidmodal}  className={this.state.claseModalConfirm}>
                                <ModalHeader align="center"><p align="center"><h5><b>SmartClinic</b></h5></p></ModalHeader>
                                <ModalBody>
                                <div color="warning" className="warning" ><FaExclamationCircle size="4em"/></div>
                                <p align="center"><h5><b></b>Le recomendamos usar la geolocalización porque nos permite ayudarlo en la búsqueda de su centro médico</h5></p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="warning" onClick={this.continuar}>Continuar</Button>
                                    <Button className="primary" onClick={this.volver}>Volver</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
            
                </ModalBody>
                <ModalFooter>
                    <Button   onClick={this.modalConfirm} color="primary" className={this.props.buttonsave} >Guardar</Button>
                    <Button color="danger" className={this.props.buttoncancel} onClick={ this.toggleCancel}>Cancel</Button>
                    <Button  className={this.props.button} onClick={ this.toggleCancel}>Volver</Button>
                </ModalFooter>
            </form>
        </div>
        </Modal>
    </div>     
    );
    }
    }
