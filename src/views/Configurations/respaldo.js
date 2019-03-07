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
    Table,Input, InputGroup, InputGroupAddon, InputGroupText, TabContent, TabPane, FormFeedback, FormGroup,Label } from 'reactstrap';
    import {  AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio  } from 'availity-reactstrap-validation';
    import {
        withGoogleMap,
        GoogleMap,
        Marker,
    } from "react-google-maps";
    import axios from 'axios';
    import './modal.css'
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
                optionPais: "Seleccionar ",
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
                Sucursal:'',
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
            };
            
            this.fileHandleFoto2 = this.fileHandleFoto2.bind(this);
            this.fileHandleFoto3 = this.fileHandleFoto3.bind(this);
            this.fileHandleFoto1=this.fileHandleFoto1.bind(this);
            this.ValidationContactPhone = this.ValidationContactPhone.bind(this);
            this.ValidationContactEmail = this.ValidationContactEmail.bind(this);
            this.pais = this.pais.bind(this);
            this.countryvalidation = this.countryvalidation.bind(this)
// this.Social = this.Social.bind(this);
this.tipos = this.tipos.bind(this);
this.sector= this.sector.bind(this);
this.ValidationArea = this.ValidationArea.bind(this);
this.toggleContactos = this.toggleContactos.bind(this);
this.toggleTipo = this.toggleTipo.bind(this);
this.toggleSector = this.toggleSector.bind(this);
this.toggleProvincia = this.toggleProvincia.bind(this);
this.toggle = this.toggle.bind(this);
this.ValidationName = this.ValidationName.bind(this);
this.ValidationCode = this.ValidationCode.bind(this);
this.handleChangeCountry = this.handleChangeCountry.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.togglePais = this.togglePais.bind(this);
this.toggleFiles = this.toggleFiles.bind(this);
this.fileHandleLogo= this.fileHandleLogo.bind(this);
this.handleDeleteContact = this.handleDeleteContact.bind(this);
this.handleSubmitContact = this.handleSubmitContact.bind(this);
this.toggleSocial = this.toggleSocial.bind(this);
}
ValidationArea() {
    if (this.state.address === ''){
        return <AvFeedback>Debes ingresar la direccion de la sucursal</AvFeedback>
    }
}
toggle() {
   this.props.actualizar
    this.setState({
        modal: !this.state.modal,
    });
}
toggleSocial() {
    this.setState({ collapseSocial: !this.state.collapseSocial });
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
ValidationName() {
    if(this.state.Sucursal === ''){
        return <AvFeedback>Debes ingresar una sucursal</AvFeedback>
    }
}
ValidationContactName() {
    if(this.state.name === ''){
    return <AvFeedback>Debes Ingresar un nombre</AvFeedback>
    }
}
ValidationContactPhone() {
    if(this.state.Phone === ''){
    return <AvFeedback>Debes Ingresar un telefono</AvFeedback>
    }
}
ValidationContactEmail() {
    if(this.state.email === ''){
        return <AvFeedback>Ingresa un correo electronico</AvFeedback>
    }
// } else if (this.state.optionPais === 'Seleccionar' ){
//     return <AvFeedback>Debes seleccionar una opcion</AvFeedback>
// } else if (this.state.optionProvincia === 'Seleccionar' ){
//     return <AvFeedback>Debes seleccionar una opcion</AvFeedback>
// } else if (this.state.address === ''){
//     return <AvFeedback>Debes seleccionar una opcion</AvFeedback>
// }
}
ValidationCode() {
    if (this.state.code === ''){
        return <AvFeedback>Debes ingresar una serial</AvFeedback>}
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


handleDeleteContact = index => {

var contacts =[...this.state.contact];
contacts.splice(index, 1);
this.setState({contact :contacts});
}
handleSubmitContact(e, values){
    e.preventDefault();
    this.setState({name: values.name, phone: values.phone, email: values.email});
    // let todos = [...this.state.contact];
    this.state.contact.push({name: this.state.name, phone: this.state.phone, email: this.state.email})
    // this.setState({contact : todos})
    this.setState({
        name: '',
        phone: '',
        email: ''
    })
}

handleSubmit() {
  
const apiBaseUrl = ("http://192.168.0.112:8000/api/editBranchOffices");
const token = window.localStorage.getItem('id_token');

const lat = "12.2.35.45"
const log = "O77.1.41.66"
     const datoss={
       data: {
            sucursal:this.state.Sucursal,
            code: this.state.code,
            idCountry: this.state.optionPais,
            provincesid: this.state.provincesid,
            type : this.state.tiposid,
            sector: this.state.sectorid,
            log: log,
            lat: lat,
            contactos: this.state.contact,
            // logo: this.state.logo,
            // // foto1: this.state.foto1,
            // // foto2: this.state.foto2,
            // // foto3: this.state.foto3,
            // // facebook: this.state.facebook,
            // // twitter: this.state.twitter,
            // // instagram: this.state.instagram,
            // // web: this.state.web,
        }
  }
  console.log(datoss)
    if(this.state.Sucursal === ''){

    }
    axios({
        method: 'post',
        url: apiBaseUrl,
        data: {
            sucursal:this.state.Sucursal,
            
            idCountry: this.state.optionPais,
            provincesid: this.state.provincesid,
            type : this.state.tiposid,
            sector: this.state.sectorid,
            log: log,
            lat: lat,
            contactos: this.state.contact,
            // logo: this.state.logo,
            // foto1: this.state.foto1,
            // foto2: this.state.foto2,
            // foto3: this.state.foto3,
            // facebook: this.state.facebook,
            // twitter: this.state.twitter,
            // instagram: this.state.instagram,
            // web: this.state.web,
        },
      
        headers:
        {'Authorization' : token}
    }).then((res)=>{

        console.log(res.data)
    }).catch((res)=>{
        console.log(res)
    });
} 

pais = event =>{
    event.preventDefault();
    this.setState({optionPais: event.target.value })
    if (this.state.optionPais !== null){
      const apiBaseUrl = ("http://192.168.0.112:8000/api/loadCountries");
      const token = window.localStorage.getItem('id_token');
    const idCountry= event.target.value
    axios({
        method: 'post',
        url: apiBaseUrl,
        data: {
            idCountry: idCountry
        },
        headers:
        {'Authorization' : token}
    }).then((res)=>{
        this.setState({
            provinces : res.data.provinces
        })
    }).catch((res)=>{
        console.log(res)
    });
} 
}
componentDidMount(){

  // const apiBaseUrl = ("http://192.168.0.112:8000/api/loadCountries");
 const apiBaseGeneral=" http://smartclinics.online/sc-admin/web/app.php/api/loadGeneralConfiguration"
    // const apiBaseGeneral= "http://192.168.0.112:8000/api/loadGeneralConfiguration";
// const apiBaseUrl = "http://192.168.0.112:8000/api/prueba"
const apiBaseUrl = "http://smartclinics.online/sc-admin/web/app.php/api/loadCountries"
// axios.get(apiBaseUrl+'/api/prueba/')
const token = window.localStorage.getItem('id_token');
const datos={
    headers:
    {'Authorization' : token }
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
        {'Authorization' : token}
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
tipos = event =>{
       event.preventDefault();
    this.setState({tiposid: event.target.value})
}
sector= event =>{
       event.preventDefault();
    this.setState({sectorid:event.target.value})
}
countryvalidation= event =>{
    event.preventDefault();
    this.setState({
       provincesid: event.target.value
    })
}
render() {  


return (
    <div>
    <Button color="success" onClick={this.toggle}>Agregar Sucursal</Button>
    <Modal  isOpen={this.state.modal} {...this.props}  aria-labelledby="contained-modal-title-lg"  className="Modal" >
        <form onSubmit={this.handleSubmit}>
         <ModalHeader>Configuracion Centro Medicos</ModalHeader>
          <ModalBody className="Scroll" >
            <div className="row">
                 <div className="form-group col-sm-6">
                     <AvForm >
                         <AvGroup>
                        <Label for="Sucursal">Ingrese una sucursal</Label>
                        <AvInput name="Sucursal" id="Sucursal" onChange={event => this.setState({Sucursal:event.target.value})}  required/>
                        {this.ValidationName()}
                        </AvGroup>
                    </AvForm>
                </div>
           <div className="form-group col-sm-6">
        <AvForm onChange={this.tipos}>
             <AvField type="select" name="tipo" label="Tipo">
              <option value= {null} >Seleccionar</option>
                              {
                    Object.keys(this.state.tipos).map((d, i) =>{
                  return(
                         <option value={d}  >{this.state.tipos[d]}</option>
                        )})}
            </AvField>
        </AvForm>          
            </div>
                            <hr/>
                                 <div className="form-group col-sm-6">
                                     <AvForm onChange={this.pais} >
                                          <AvField  name="country" type="select" label="Pais"   >
                                            <option value= {null} >Seleccionar</option>
                                                  {
                                                    Object.keys(this.state.country).map((d, i) =>{
                                                        return(
                                                            <option value={this.state.country[d].id}  >{this.state.country[d].name}</option>
                                                            )})
                                                 }
                                            </AvField>
                                    </AvForm>  
        
                            </div>
                             <div className="form-group col-sm-6">
                                 <AvForm onChange= { this.countryvalidation}>
                                     <AvField type="select" name="provinces" label="Provincia"   >
                                          <option value= {null} >Seleccionar</option>
                                              {
                                            Object.keys(this.state.provinces).map((d) =>{
                                               return(
                                               <option value={d} >{this.state.provinces[d].name}</option>
                                               )})
                                                }  
                                      </AvField>
                                  </AvForm>
                            </div>
                        <div className="form-group col-sm-6">
                            <AvForm onChange={this.sector}>
                              <AvField type="select" name="sector" label="Sector" >
                                 <option value= {null} >Seleccionar</option>
                                {
                                Object.keys(this.state.sector).map((d, i) =>{
                                    return(
                                        <option value={d}  >{this.state.sector[d]}</option>
                                        )})
                                    }
                              </AvField>
                                </AvForm>
                        </div>
                    
                        <div className="form-group col-sm-6">
                    <AvForm>
                     <AvGroup>
                     <Label for="Adres">Direccion de la sucursal</Label>
                      <AvInput name="address" id="Adres" type="textarea" onChange={event => this.setState({address: event.target.value})} required />
                        {this.ValidationArea()}
                    </AvGroup>
                    </AvForm>                      
                        </div>
           </div>  
                <hr/>
            {/* ---------------------------------------------------------Contactos--------------------------------------------------------------- */}
                          <div className="form-group col-lg-12 Widht">
                <label>Contactos</label>
                </div>
                 <div className="form-group col-lg-12 Widht">
                 <Button color="primary" onClick={this.toggleContactos} style={{ marginBottom: '1rem' }}>Agregar</Button>
                 <Collapse isOpen={this.state.collapse}>
                 <Card >
                 <CardBody >
            <AvForm onValidSubmit={ this.handleSubmitContact}>
            <p className="text-muted">Ajuste sus datos de contacto del Centro Medico</p>
            <div div className="form-group col-sm-6">
           
                    <AvGroup>
                <Label for="Nombre">Nombre</Label>
                <AvInput name="name" id="Nombre"  value={this.state.name} onChange={event => this.setState({name: event.target.value})} pattern="^[A-Za-z]*$" required/>
                {this.ValidationContactName()}
                     </AvGroup>

            </div>
            <div div className="form-group col-sm-6">
   <AvGroup>
                <Label for="telefono">telefono</Label>
                <AvInput name="phone" id="telefono" value={this.state.phone}  type="number" pattern="^[0-9]*$" maxLength="10" onChange={event => this.setState({phone: event.target.value})} required/>
                {this.ValidationContactPhone()}
                     </AvGroup>
         
            </div>
            <div div className="form-group col-sm-6">   
            <AvGroup>
                <Label for="Email">Email</Label>
                <AvInput name="email" id="Email"  type="email" value={this.state.email} onChange={event => this.setState({email: event.target.value})} required/>
                {this.ValidationContactEmail()}
                     </AvGroup>
 
           </div>
         
            <Button type="submit"  color="primary">Añadir</Button>
            </AvForm>
            <Table striped bordered condensed hover>
            <thead className="thead-light">
            <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>E-mail</th>
            <th className="text-right">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <br />
            {
                Object.keys(this.state.contact).map((item,i)=>{
                  return   (
                    <tr>
                     <td>
                         <div>{this.state.contact[item].name}</div>
                             </td>
                                <td>
                                      <div className="small text-muted">
                                         {this.state.contact[item].phone}
                                     </div>
                                 </td>
                                  <td>
                                     <div className="small text-muted">
                                       {this.state.contact[item].email}
                                 </div>
                              </td>
                                 <td>
                                    <div className="float-right">
                                <tr>
                             <td>
                              <div><a ><FaUserEdit /></a></div>
                             </td>
                                  <td>
                                    <div><a onClick={() => { this.handleDeleteContact(item)}} key={item}className="text-danger"><FaMinusCircle /></a></div>
                                 </td>
                            </tr>
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



            <div>
            <Button color="primary" onClick={this.toggleFiles} style={{ marginBottom: '1rem' }}>Archivos</Button>
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
         
            <Input
            type="file" accept="image/*" onChange={this.fileHandlerLogo}
            />
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
            <Button color="primary" onClick={this.toggleSocial} style={{ marginBottom: '1rem' }}>Archivos</Button>
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
            </div>
       
        {/* </Scrollbars>              */}
        </ModalBody>
        <ModalFooter>
        <Button  onClick={this.handleSubmit} color="primary" className="btn btn-primary" >Guardar</Button>
        <Button color="danger" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
        </form>
        </Modal>
        </div>
        );
}
}
