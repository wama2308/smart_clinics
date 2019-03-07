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
    import {
        withGoogleMap,
        GoogleMap,
        Marker,
    } from "react-google-maps";
    import axios from 'axios';
    import './modal.css'
    import MapComponent from './map.js'
    import 'react-perfect-scrollbar/dist/css/styles.css';
    import PerfectScrollbar from 'react-perfect-scrollbar';
    import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaUserEdit, FaMinusCircle} from 'react-icons/fa';
    import { Scrollbars } from 'react-custom-scrollbars';
    const MapWithAMarker = withGoogleMap(props =>
        <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
        <Marker
        position={{ lat: -34.397, lng: 150.644 }}
        />
        </GoogleMap>
        );
    export default class ModalComponent extends React.Component {
        constructor(props) {
            super(props);
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
                    tipoview: false,
                    sectorview:false,
                    paisview:false,
                    provinciaview:false,
                    addressview:false,
                    contactview: "formCodeConfirm show",
                    deleteview:"text-danger show",
                    acciones: "text-center show",
                    button: "btn btn-green hide",
                    buttoncancel: "show",
                    buttonsave:"show",
                    divhide:"text-center show"




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
            this.tiposedit = this.tiposedit.bind(this);
        }

        toggleCancel(e) {

           this.setState({
               address:'',
               optionPais : '',
               sucursal   :'',
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
               lat:null,
               lng:null,
               isMarkerShown: false,
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
                    button: "btn btn-green hide",
                    buttoncancel: "show",
                    buttonsave:"show",
                    divhide:"text-center show"

           })


           this.props.Toggle(false)

       }
       deleteContact(e){

        this.props.delete(e)
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
        if(this.state.mapValid ===false){

            this.setState(prevState => ({
                mapValidmodal: true,

            }));             

        }else{
            this.handleSubmit()


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


    }.bind(this)
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);

        }



    }
    fileHandlerLogo = event =>{
        event.preventDefault();
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


            }.bind(this)
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);

        }
    }
    fileHandleFoto1 = event =>{
     event.preventDefault();
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
    fileHandleFoto2 = event =>{
     event.preventDefault();
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
    fileHandleFoto3 = event =>{
     event.preventDefault();
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
               foto3: file})


        }.bind(this)
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);

        }



    }
// fileUploadHandler = () => {
// }
setSucursal= event =>{
    this.setState({
        sucursal : event.target.value
    })
}
updatedeletecontact = event =>{
   this.setState({
    contact : this.props.contacto
})
}
deletecontact = event => {
    this.props.delete(event)

}



handleSubmitContact(e){
  let nombreError='';
  let nombreValid=false;
  let nombreInvalid=false;

  let telefonoError='';
  let telefonoValid=false;
  let telefonoInValid=false;

  let emailError='';
  let emailValid=false;
  let emailInvalid=false;
  let collapse=false;

  if(this.state.name === ''){
   nombreError="¡Ingresa un nombre!";               
   nombreInvalid=true;  
}
if(this.state.phone=== '' ){
    telefonoError="¡Ingresa un numero de telefono!",            
    telefonoInValid=true;
}
if(this.state.email ===''){
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
this.setState({
 name : '',
 phone:'',
 email:'',
})
return true;
};


    //mapp///////////////////////////////////////////////////////////////////////////////
    componentWillMount(){
        this.getGeoLocation()}
        // componentWillUpdate(){

        //     this.getGeoLocation()
        // }



        delayedShowMarker = () => {
            setTimeout(() => {
              this.getGeoLocation()
              this.setState({ isMarkerShown: true })
          }, 5000)
        }

        handleMarkerClick = () => {
            this.setState({ isMarkerShown: false })
            this.delayedShowMarker()
        }

        getGeoLocation = () => {
           
                console.log(navigator.geolocation)
                navigator.geolocation.getCurrentPosition(
                    position => {
                            console.log(position.coords);
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
                           zoom: 4
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


            }))
        }

/////////////////////////////////////////////////////////////////////////////////////////////

validate = () => {
    let sucursalError = "";  
    let sucursalInValid =false;   
    let sucursalValid=false; 

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
}

if (this.props.contacto  === undefined ){
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




if (sucursalError || paisError || provinciaError || sectorError || tipoError || direccionError || logoError || AddContact  ) {
    this.setState({  
        AddContactInv,
        sucursalError,
        sucursalInValid,
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
};

handleSubmit() {

    this.setState(prevState => ({
        mapValidmodal: false,

    }));       
    const isValid = this.validate();
    if(isValid){
        const apiBaseUrl =("http://smartclinics.online/sc-admin/web/app.php/api/saveBranchOffices")
        const apiBaseEdit = ("http://smartclinics.online/sc-admin/web/app.php/api/editBranchOffices")
            // const apiBaseUrl = ("http://192.168.0.112:8000/api/saveBranchOffices");
            // const apiBaseEdit=("http://192.168.0.112:8000/api/editBranchOffices")
            const token = window.localStorage.getItem('id_token');
            const datoss={
             data: {
                posicion: this.props.posicion,
                sucursal:this.state.sucursal,
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
                direccion:this.state.address

            }
        }
        console.log(datoss)

        if (this.props.posicion != ''){
            console.log('subtmit')
            axios({
                method: 'post',
                url: apiBaseEdit,
                data: {
                    posicion: this.props.posicion,
                    sucursal:this.state.sucursal,
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
                    direccion:this.state.address
                },

                headers:
                {'access-token' : token}
            }).then((res)=>{
                console.log(res)
                this.props.refresh(false)
                this.setState({
                    optionPais : '',
                    sucursal   :'',
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
                    address:'',
                    modalAlert: false,
                    log: null,
                    lat: null,
                })
                this.props.loadBranchOffices()
                setTimeout(() => {
                  this.setState({ mapValid: false })
              }, 2000)
            }).catch((res)=>{
                console.log(res)
            });
        }else{
            axios({
                method: 'post',
                url: apiBaseUrl,
                data: {
                    posicion: this.props.posicion,
                    sucursal:this.state.sucursal,
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
                    direccion: this.state.address
                },

                headers:
                {'access-token' : token}
            }).then((res)=>{
                this.props.refresh(false)
                this.setState({
                    optionPais : '',
                    sucursal   :'',
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
                    address:'',
                    provinces: [],
                    log: null,
                    lat: null,

                })
                this.props.loadBranchOffices()
                setTimeout(() => {

                  this.setState({ mapValid: false })
              }, 2000)
                console.log(res)
            }).catch((res)=>{
                console.log(res)
            });
        }
    } 
}


provinceEdit = event => {

    if(event === 1 ){


       if (this.state.provinces.length === 0 ){
        const apiBaseUrl = ("http://smartclinics.online/sc-admin/web/app.php/api/loadCountries");
     // const apiBaseUrl = ("http://192.168.0.112:8000/api/loadCountries");
     const token = window.localStorage.getItem('id_token');

     axios({
        method: 'post',
        url: apiBaseUrl,
        data: {
            idCountry: this.props.edit.countryId
        },
        headers:
        {'access-token' : token}
    }).then((res)=>{
     console.log('ya llego provincia ')
     this.setState({
        provinces : res.data.provinces
    })
 }).catch((res)=>{
    console.log(res)
});


}


}

}


pais = event =>{
    event.preventDefault();
    this.setState({optionPais: event.target.value,
    })

    if (this.state.optionPais !== null){
        const apiBaseUrl = ("http://smartclinics.online/sc-admin/web/app.php/api/loadCountries");
      // const apiBaseUrl = ("http://192.168.0.112:8000/api/loadCountries");
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
    }).then((res)=>{

        this.setState({
            provinces : res.data.provinces
        })
    }).catch((res)=>{
        console.log(res)
    });
} 
}
// componentWillMount(){
//     console.log('hola')
//     if(this.props.contacto != null) {


//      Object.keys(this.props.contacto).map((item,i)=>{
//  this.state.contact.push({
//     name: this.props.contacto[item].name, 
//     phone: this.props.contacto[item].phone, 
//     email: this.props.contacto[item].email
//     })



//         })
//     }
// }
componentDidMount(){

    this.delayedShowMarker();
  // const apiBaseUrl = ("http://192.168.0.112:8000/api/loadCountries");
  const apiBaseGeneral=" http://smartclinics.online/sc-admin/web/app.php/api/loadGeneralConfiguration"
    // const apiBaseGeneral= "http://192.168.0.112:8000/api/loadGeneralConfiguration";

    const apiBaseUrl = "http://smartclinics.online/sc-admin/web/app.php/api/loadCountries"
// axios.get(apiBaseUrl+'/api/prueba/')
const token = window.localStorage.getItem('id_token');
const datos={
    headers:
    {'access-token' : token }
}
axios.get(apiBaseUrl, datos)
.then((res) => {

  this.setState({
    country: res.data   })

}).catch((error) => {
});

axios({
    method: 'get',
    url: apiBaseGeneral,
    headers:
    {'access-token' : token}
}).then((res)=>{
  this.setState({
    sector : res.data.sectormedicalcenter
})

  this.setState({

    tipos : res.data.typemedicalcenter

})
}).catch((res)=>{
    console.log(res)
});
}
// edit ()={
//     const sucursal = this.props.edit.
//     const tipo = this.props.edit.type
//     const pais = this.props.edit.
//     const provincia = this.props.edit.countryid
//     const sector = this.props.edit.sector
//     const direccion = this.props.edit.direccion
//     const logo = this.props.edit.logo
//     const foto1 = this.props.edit.foto1
//     const foto2 = this.props.edit.foto2
//     const foto3 = this.props.edit.foto3
//     const twitter = this.props.edit.twitter
//     const instagram = this.props.edit.instagram
//     const facebook = this.props.edit.facebook
//     const web = this.props.edit.web

//     this.setState({
//         sucursal   : sucursal
//         optionPais : tipo
//         provincesid : pais
//         tiposid : provincia
//         sectorid : sector
//         log : 
//         lat : 

//         logo : logo 
//         foto1 : foto1
//         foto2 : foto2
//         foto3 : foto3
//         facebook : facebook
//         twitter : twitter
//         instagram : instagram
//         web : web
//     })
// }
tiposedit= event => {
    console.log('no sirve')
}

tipos = event =>{

    console.log('testtipos')
}
sectoredit= valor=>{

    if( this.state.sectorid === ''){
        console.log('sector')
        this.setState({
            sectorid: this.props.edit.sector
        })
    }

}

countryidEdit = event =>{

    if (this.state.optionPais === '' ){
        this.setState({
            optionPais : this.props.edit.countryId,
            sectorid: this.props.edit.sector,
            contact:this.props.contacto,
            tiposid: this.props.edit.type,
            sucursal   : this.props.edit.name,
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
            lng: this.props.edit.lng,
            currentLatLng: {
                lat: this.props.edit.lat,
                lng: this.props.edit.lng
            },

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
            divhide: this.props.divhide

        })

    }

   
    }


sector= event =>{
    console.log(event.target.selected)
    this.setState({sectorid:event.target.value})
}
provincesValidation= event =>{
    event.preventDefault();
    this.setState({
     provincesid: event.target.value
 })
}



// validate (){

// }

// handleChange(){

// }

render() { 
   this.provinceEdit(this.props.update)
  console.log(this.state.sectorview)
   return (
    <div>
  
    <Modal  isOpen={this.props.view} {...this.props}  aria-labelledby="contained-modal-title-lg"  className="Modal" >
    <form >
    <ModalHeader>Configuracion Centro Medicos</ModalHeader>
    <ModalBody className="Scroll" >
    <div className="row">

    <FormGroup className="top form-group col-sm-6" >
    <Label for="Sucursal" className="mr-sm-2">Sucursal</Label>
    <Input type="text" name="Sucursal" id="Sucursal" valid={this.state.sucursalValid} disabled={this.state.sucursalesview} invalid={this.state.sucursalInValid} value={this.state.sucursal}  onChange={event => this.setState({sucursal:event.target.value})} />
    <FormFeedback tooltip>{this.state.sucursalError}</FormFeedback>        
    </FormGroup>

    <FormGroup className="top form-group col-sm-6" >
    <Label for="tipo">Tipo</Label>
    <Input type="select" name="tipo" valid={this.state.tipoValid} invalid={this.state.tipoInvalid} disabled={this.state.tipoview} id="tipo"  onChange={event => this.tipos(event)}  >

    <option value= {null} >Select...</option>

    {
        Object.keys(this.state.tipos).map((d, i) =>{

            if(d === this.state.tiposid){
                this.tiposedit(true)
                return(
                    <option value={d}  selected>{this.state.tipos[d]}</option>)
            }
            else{
               return(
                <option value={d}   >{this.state.tipos[d]}</option>)   
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
            }else{
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
{/*     AlzaSyDwl7QwHKe7NFx28t-CbMDTUdQMFVrjEz4*/}
{
  Object.keys(this.state.provinces).map((d) =>{

    if( d === this.props.edit.provinceId){
        this.countryidEdit(true)
        return(
         <option value={d} selected  >{this.state.provinces[d].name}</option>
         )

    }else{
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
    }
    )
}                                   
</Input>
<FormFeedback tooltip>{this.state.sectorError}</FormFeedback>  
</FormGroup>

<FormGroup className="top form-group col-sm-6" >
<Label for="Direccion" >direccion</Label>
<Input type="text" value={this.state.address} name="Direccion" id="Direccion"  valid={this.state.direccionValid} disabled={this.state.addressview}invalid={this.state.direccionInValid} onChange={event => this.setState({address : event.target.value})}/>

<FormFeedback tooltip>{this.state.direccionError}</FormFeedback>  
</FormGroup>


</div>  
<hr/>
{/* ---------------------------------------------------------Contactos--------------------------------------------------------------- */}


<div className="form-group col-lg-12 Widht">
<Button color="primary" onClick={this.toggleContactos} style={{ marginBottom: '1rem' }}>Contactos</Button>
<Collapse isOpen={this.state.collapse}>
<Card >
<CardBody >
<Form  className={this.state.contactview} id="2">
<p className="text-muted">Ajuste sus datos de contacto del Centro Medico</p>  
<div className="error">{this.state.AddContact}</div>
<div className="row">
<FormGroup className="top form-group col-sm-6" >
<Label for="Nombre">Nombre</Label>
<Input name="name"   type="text" id="name"  value={this.state.name} valid={this.state.nombreValid} invalid={this.state.nombreInvalid} maxLength="10"onChange={event => this.setState({name: event.target.value})} pattern="^[A-Za-z]*$" />
<FormFeedback tooltip>{this.state.nombreError}</FormFeedback>  
</FormGroup>

<FormGroup className="top form-group col-sm-6" >
<Label for="Telefono" >Telefono</Label>
<Input name="phone" id="telefono" value={this.state.phone}  type="number"  valid={this.state.telefonoValid} invalid={this.state.telefonoInValid} pattern="^[0-9]*$" maxLength="10" onChange={event => this.setState({phone: event.target.value})} />
<FormFeedback tooltip>{this.state.telefonoError}</FormFeedback>  
</FormGroup>


<FormGroup className="top form-group col-sm-6" >
<Label for="Email" className="mr-sm-2">Email</Label>
<Input name="email" id="Email"  type="email" value={this.state.email} valid={this.state.emailValid} invalid={this.state.emailInvalid} onChange={event => this.setState({email: event.target.value})} />
<FormFeedback tooltip>{this.state.emailError}</FormFeedback>  
</FormGroup>
</div>      
<div >
<Button  onClick={this.handleSubmitContact} className="add"color="primary">Añadir</Button>
</div>

</Form>
<Table   hover responsive borderless >
<thead className="thead-light">
<tr class="text-center">
<th>Nombre</th>
<th>Telefono</th>
<th>E-mail</th>
<th className={this.state.acciones}>Acciones</th>
</tr>
</thead>
<tbody>

{
    this.props.contacto != null &&
    

    Object.keys(this.props.contacto).map((item,i)=>{

      return   (
        <tr className="text-center">
        <td>
        {this.props.contacto[item].name}
        </td>
        <td>

        {this.props.contacto[item].phone}

        </td>
        <td className="text-center">

        {this.props.contacto[item].email}

        </td>
        <td className="text-center">
        <div className="float-right">



        <a onClick={() => { this.deletecontact(item)}} key={item}className={this.state.deleteview}><FaMinusCircle /></a>


        </div>
        </td>
        </tr>
        )
  })
}
          </tbody>
          </Table>

          </CardBody>
          </Card>    
          </Collapse>
          <hr/>
          <div >
          <Button color="primary" onClick={this.toggleMap} style={{ marginBottom: '1rem' }}>Localizacion</Button>
          <Collapse isOpen={this.state.collapseMap}>
          <Card>
          <CardBody>

         
          <MapComponent
          lat={this.state.lat}
          lng={this.state.lng}
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          currentLocation={this.state.currentLatLng}
          handleClickmap = { this.handleClickmap}
          zoom = { this.state.zoom}
          />
          </CardBody>  
          </Card>
          </Collapse>
          </div>
          <hr/>

          <div>
          <Button color="primary" onClick={this.toggleFiles} style={{ marginBottom: '1rem' }}>Multimedia</Button>
          <Collapse isOpen={this.state.collapseFile}>
          <Card>
          <CardBody>
          <div className="container">
          <form className="formCodeConfirm">
          <p className="text-muted">Ajuste el contenido multimedia de su Centro Medico</p>
          <div className="row">
          <div className="form-group col-sm-6">
          <label>
          Logo
          </label>
          <br />

          <Input className="top"
          type="file" accept="image/*" invalid={this.state.logoInvalid} valid={this.state.logoValid} onChange={this.fileHandlerLogo}
          />
          <FormFeedback tooltip>{this.state.logoError}</FormFeedback>  
          </div>
          <div className="form-group col-sm-6">
          <label>
          Foto 1
          </label>
          <br />
          <Input
          type="file" accept="image/*"onChange={this.fileHandleFoto1}

          />
          </div>
      {/* <div>  <img src={"data:image/jpeg;" + this.state.foto1} /> </div>*/}
      <div className="form-group col-sm-6">
      <label>
      Foto 2
      </label>
      <br />
      <Input
      type="file" accept="image/*" onChange={this.fileHandleFoto2} 
      />
      </div>
      <div className="form-group col-sm-6">
      <label>
      Foto 3
      </label>
      <br />
      <Input
      type="file" accept="image/*" onChange={this.fileHandleFoto3}
      />
      </div>
      </div>

      </form>
      </div>
      </CardBody>
      </Card>
      </Collapse>
      </div>
      <hr/>
      <div>
      <Button color="primary" onClick={this.toggleSocial} style={{ marginBottom: '1rem' }}>Sociales</Button>
      <Collapse isOpen={this.state.collapseSocial}>
      <Card>
      <CardBody>
      <div className="container">
      <p className="text-muted">Ajuste la configuracion de su centro medico</p>
      <div className="row">
      <div className="form-group col-sm-6">
      <label>
      <FaTwitter />
      </label>
      <Input
      placeholder="Ingrese Twitter de Centro Medico" onChange={event => this.setState({twitter:event.target.value})}
      />
      </div>
      <div className="form-group col-sm-6">
      <label>
      <FaInstagram />
      </label>
      <Input
      placeholder="Ingrese Instagram de Centro Medico" onChange={event => this.setState({instagram:event.target.value})}
      />
      </div>
      <div className="form-group col-sm-6">
      <label>
      <FaFacebook />
      </label>
      <Input
      placeholder="Ingrese Facebook de Centro Medico" onChange={event => this.setState({facebook:event.target.value})}
      />
      </div>
      <div className="form-group col-sm-6">
      <label>
      <FaExternalLinkAlt />
      </label>
      <Input
      placeholder="Ingrese la web del Centro Medico" onChange={event => this.setState({web:event.target.value})}
      />
      </div>
      </div>
      </div>
      </CardBody>
      </Card>
      </Collapse>
      </div>
      <div>
      <Modal isOpen={this.state.modalAlert} modalConfirm={this.modalConfirm} className={this.state.claseModalConfirm}>
      <ModalHeader><p align="center"><h5><b>SmartClinic</b></h5></p></ModalHeader>
      <ModalBody>
      <p align="center"><h5><b>Operacion Exitosa</b></h5></p>
      </ModalBody>
      </Modal>
      </div>
      </div>
      <div>
      <div>
      <Modal isOpen={this.state.mapValidmodal}  className={this.state.claseModalConfirm}>
      <ModalHeader align="center"><p align="center"><h5><b>SmartClinic</b></h5></p></ModalHeader>
      <ModalBody>
      <p align="center"><h5><b></b>Le recomendamos usar la geolocalización porque nos permite ayudarlo en la búsqueda de su centro médico</h5></p>

      
      </ModalBody>
      <ModalFooter>
      <Button color="warning" onClick={this.continuar}>Continuar</Button>
      <Button className="primary" onClick={this.volver}>Volver</Button>
      </ModalFooter>
      </Modal>
      </div>
      </div>

  {/* </Scrollbars>              */}
  </ModalBody>
  <ModalFooter>
  <button color="primary" className={this.state.button} onClick={ this.toggleCancel}> Volver</button>
  </ModalFooter>
  </form>
  </Modal>
  </div>
  );
}
}
