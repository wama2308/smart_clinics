import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
	Table,Input, InputGroup, InputGroupAddon, ModalHeader, ModalBody, ModalFooter, InputGroupText, TabContent, TabPane,Modal, Form, FormGroup, Label, FormFeedback
} from 'reactstrap';
import './loading.css'
import classnames from 'classnames';
import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle} from 'react-icons/fa';
import authservices from '../../components/AuthService.js'
import axios from 'axios';
import ModalContainer from './modalcomponen'
import FormModal from './modal'
import './modal.css';
import { datosConexion } from '../../components/Conexion.js';
import jstz from 'jstz';

import {
	compose,
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";
class Configurations extends Component {
	constructor(props){
		super(props);
		this.toggleTab = this.toggleTab.bind(this);
		this.toggle = this.toggle.bind(this);

		let valueConexion = "";
        let arrayConexion = Object.values(datosConexion);
        arrayConexion.forEach(function (elemento, indice, array) {
            if(indice === 0){
                valueConexion = elemento;
            }            
        });     

        const timezone = jstz.determine();

		this.state = {
			update : 0,
			tipoDropdownOpen: false,
			activeTab: "1",
			country: [],
			provincesSelect: [],
			modal: false,
			defaultCenter:null,
			email:'',
			countryid:'',
			licenses:[],
			branchoffices:[],
			provinceid:'',
			provinces:[],
			Sucursal:'',
			SucursalError: '',
			countryname:'',
			provinceedit: [],
			editbranchoffices:[],
			contacto:[],
			contactoName:'',
			contactoPhone:'',
			contactoEmail:'',
			posicion: '',
			countryIdSelect:'',
			valorProvince: '',
			inicio: '0',
			pais: '',
			paisError: '',
			provincia: '',
			provinciaError: '',
			SucursalInValid:false,
			SucursalValid:false,
			paisInvalid:false,
			paisValid:false,
			provinceInvalid:false,
			provinceValid:false,
			className: '',
			update0:0,
			divContainer:'hide',
			divLoading:'show',
			deletediv:'hide',
			divLoading2:'hide delete',
			modalAlert: false,
			claseModalConfirm: 'ModalConfirm',
			itemPos:'',
			view: null,
			check:'hide check',
			warning:'hide warning',
			///
			success:false,
			delete:'',
			sucursalesview:false,
            tipoview: false,
            sectorview:false,
            paisview:false,
            provinciaview:false,
            addressview:false,
            contactview: "formCodeConfirm show",
            deleteview:"text-danger show",
            acciones: "show",
            button: "hide",
            buttoncancel: "show",
            buttonsave:"show",
            collapse:false,
            collapseFile:false,
            collapseMap:false,
            collapseSocial:false,
            sucursaladd:1,
            divhide:"text-center show",
            aceptar: 'hide',
  			cancelar:'hide',
  			currencySymbol: '',    
  			countSucursales: '',    
  			modalWarning: false,
  			bodyAlert: '',     			  
  			timeZ: timezone.name(),
  			countTableBranchOffices: 0,
  			//conexion: 'http://localhost:8000/api/',
          	//conexion: 'http://smartclinics.online/sc-admin/web/app.php/api/',
          	conexion: valueConexion,

		};
		this.view = this.view.bind(this);
		this.refresh = this.refresh.bind(this);
		this.handlekey = this.handlekey.bind(this);
		//this.validationsu = this.validationsu.bind(this)
		this.submitContact =this.submitContact.bind(this)
		this.deleteContact=this.deleteContact.bind(this)
		this.toggleCancel=this.toggleCancel.bind(this)
		this.callChildFunction = this.callChildFunction.bind(this)
		this.loadCountryId = this.loadCountryId.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.modaledit = this.modaledit.bind(this)
		this.modalConfirm = this.modalConfirm.bind(this)
		this.modalCancel = this.modalCancel.bind(this)
		this.buttonDeleteBranchOffices = this.buttonDeleteBranchOffices.bind(this)
		this.number_format = this.number_format.bind(this)
	}

	handlekey= event =>{
		this.setState({
			SucursalInValid: false
		})
	}

	refresh= event =>{
		const apiBaseMedical = this.state.conexion+"LoadMedicalCenter"
		//const apiBaseMedical= "http://192.168.0.112:8000/api/LoadMedicalCenter";
		const token = window.localStorage.getItem('id_token');
		const datos={
			headers:
			{'access-token' : token }
		}

		axios.get(apiBaseMedical, datos)
		.then((res) => {
		console.log(this.state.success)
			this.setState({
				success:true,	
				editbranchoffices:[],
				contacto: [],
				branchoffices: res.data.branchoffices,
			})

			this.ModalContainer.cerrarmodal(this.state.success);
			this.ModalContainer.getGeoLocation()
		})

		.catch((error) => {
			console.log("Error consultando la api medical center");
		});
	}

	handleChange_ = event => {
		this.setState({
			provinceInvalid:false
		})

		const isCheckbox = event.target.type === "checkbox";

		this.setState({
			[event.target.name]: isCheckbox
			? event.target.checked
			: event.target.value
		});
	}

	validate = () => {

		let SucursalError = "";
		let paisError = "";
		let provinciaError = "";
		let className = '';
		let SucursalInValid =false;
		let paisInvalid=false;
		let provinceInvalid=false;
		let SucursalValid=false;
		let paisvalid = false;
		let provincevalid= false;
		if (this.state.Sucursal.length === 0) {
			SucursalError = "¡Ingrese el nombre!";
			SucursalInValid =true
		}
		if (this.state.Sucursal.length  <  2 ) {
			SucursalError = "¡Escriba el nombre completo de su centro medico !";
			SucursalInValid =true
		}
		if (!this.state.pais) {
			paisError = "¡Seleccione el pais!";
			paisInvalid = true
		}
		if (this.state.valorProvince === null) {
			
			provinciaError = "¡Seleccione la provincia!";
			provinceInvalid = true;
		}
		if (SucursalError || paisError || provinciaError) {
			this.setState({ SucursalError, paisError, provinciaError, SucursalInValid, paisInvalid, provinceInvalid  });
			return false;
		}

		this.setState({ SucursalError:'', paisError:'', provinciaError:'', SucursalValid:false, paisInvalid: false , provinceInvalid: false   });

		return true;
	}

	handleSubmit = event => {
		event.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			this.setState({
				modalAlert: true,
				divLoading2:'show',
				
			})
			this.handleValidSubmit()
		}
	}	

	handleChange(e) {
		this.setState({
			paisInvalid: false
		})

		this.statusinicio();
		const countryIdSelect = e.target.value;
		const pais = e.target.value;
		this.setState({pais});   //do the setState here
		this.setState({countryIdSelect});   //do the setState here
		if(countryIdSelect != "")
		{
			this.loadProvinces(countryIdSelect);
		}else
		{
			this.setState({
				provinces: '',
				provincia: ''
			})
		}
	}

	statusinicio(){
		this.setState({
			inicio: '2'
		})
	}

	handleValidSubmit() {
		//console.log(this.state.timeZ);
		const apiBaseUrl = this.state.conexion+"editPerfilMedicalCenter"
		//const apiBaseUrl = ("http://192.168.0.117:8000/api/editPerfilMedicalCenter");
		const token = window.localStorage.getItem('id_token');

		axios({
			method: 'post',
			url: apiBaseUrl,
			data: {
				name:this.state.Sucursal,
				idCountry: this.state.pais,
				provinceid:this.state.valorProvince,
				timeZ:this.state.timeZ,
			},
			headers:
			{'access-token' : token}
		})
		.then((res)=>{
			this.setState({
				divLoading2:'hide',
				modalAlert: true,
				deletediv:'show',
				check:'show check',
				delete:'Operacion exitosa!',
					aceptar: 'hide',
				  	cancelar:'hide',


			})
			 setTimeout(() => {
		                this.setState({
		                	check:'hide check',
							modalAlert: false,
							delete:'',
							deletediv:'hide',

		                })
		                }, 1000)
			 
			
		})
		.catch((res)=>{
			//console.log(res, this.state.valorProvince)
			console.log("Error modificando el medical center");
		});
	}

	handleInvalidSubmit(event, errors, values) {
		this.setState({email: values.email, error: true});
	}

	toggle(e) {	
		let countTableBranchOffices = this.state.countTableBranchOffices;
		let countBranchOfficesPermit = this.state.countSucursales;		

		if(countTableBranchOffices < countBranchOfficesPermit){
			this.ModalContainer.handleActionParent();		
			this.setState({
				modal: !this.state.modal,
				button: "btn btn-success hide",
				buttoncancel: "show",
				buttonsave:"show",
				contacto:[],
				editbranchoffices:[]	    
			});
		}else{
			this.setState({
                alertCheck: 'hide check',
                alertExc: 'show warning',            
                bodyAlert: '¡Esta licencia solo permite registrar '+ countBranchOfficesPermit +' sucursales!',
            });
                
            this.toggleAlert();                

            setTimeout(() => {

                this.cerrarModalAlert();                   
                    
            }, 3000);   
		}
	}

	toggleCancel(id){
		this.setState({
			modal: id  ,
			update: 0,
			contacto:[],
			sucursalesview:false,
			editbranchoffices:[],
			tipoview: false,
			sectorview:false,
			paisview:false,
			provinciaview:false,
	        addressview:false,
			contactview: "formCodeConfirm show",
			deleteview:"text-danger show",
	        acciones: "show",
	        button: "hide",
	        buttoncancel: "hide",
	        buttonsave:"hide",
	        collapse:false,
	        collapseFile:false,
	        collapseMap:false,
	        collapseSocial:false,
	        divhide:"text-center show"


		})
	}

	modaledit(e){		
		// console.log(e);
		// console.log(this.state.medical[e].name)
		// console.log(this.state.medical[e].contacto)
		//this.ModalContainer.getGeoLocation()
		this.setState({
			modal: !this.state.modal,
			update : 1,
			editbranchoffices:this.state.branchoffices[e],
			contacto: this.state.branchoffices[e].contacto,
			posicion: e,
			button: "btn btn-success hide",
			buttoncancel: "show",
			buttonsave:"show",
		});

	}

	view(e){	
		// console.log(e);
		// console.log(this.state.medical[e].name)
		// console.log(this.state.medical[e].contacto)
		//this.ModalContainer.getGeoLocation()

		this.setState({
			
			modal: !this.state.modal,
			update : 1,
			editbranchoffices:this.state.branchoffices[e],
			contacto: this.state.branchoffices[e].contacto,
			posicion: e,
			sucursalesview:true,
		    tipoview: true,
		    sectorview:true,
		    paisview:true,
		    provinciaview:true,
		    addressview:true,
		    contactview: "formCodeConfirm hide",
		    deleteview:"text-danger hide",
		    acciones: "text-center hide",
		    button: "btn btn-success show",
			buttoncancel: "hide",
			buttonsave:"hide",
		    collapse:true,
		    collapseFile:true,
		    collapseMap:true,
		    collapseSocial:true,
		    divhide:"text-center hide",
		    divfilehide:"row show"

		});
		//console.log(this.state.editbranchoffices)

	}

	submitContact(name){

		let contactsu = this.state.contacto
		contactsu = [...name]
		// this.setState({contactoName: name, contactoPhone: phone, contactoEmail: email});
		// console.log(todos,this.state.contactoName,this.state.contactoPhone,this.state.contactoEmail)
		// todos.push({name:this.state.contactoName, phone: this.state.contactoPhone, email: this.state.contactoEmail})
		this.setState({contacto : contactsu})
	}

	deleteContact(e){
		
		var contacts =[...this.state.contacto];
		console.log(contacts)
		contacts.splice(e, 1);
		this.setState({contacto :contacts}, function (){
			console.log(this.state.contacto)
		});
	}

	modalDelete(item){
		//item.isDefaultPrevented()
		this.setState({
			warning:'hide warning', 
			divLoading2:'show',
		 	delete:'',
			aceptar:'hide',
			cancelar:'hide',
		})

		const apiBaseDelete=(this.state.conexion+"deleteBranchOffices")
		//const apiBaseDelete=("http://192.168.0.117:8000/api/deleteBranchOffices")
		const token = window.localStorage.getItem('id_token');
		axios({
			method: 'post',
			url: apiBaseDelete,
			data: {
				posicion: item,
				timeZ:this.state.timeZ,
			},
			headers:
			{'access-token' : token}
		})
		.then((res)=>{
			console.log("Eliminacion exitosa");
			this.setState({
					divLoading2:'hide',
					check:'show check',
				  	delete:'Sucursal eliminada con exito!',

			})
			 setTimeout(() => {
			            this.setState({
			            	check:'hide check',
							modalAlert: false,
							itemPos: '',
							delete:'',
							deletediv:'hide',
			            })
			            }, 1000)
			      
			this.refresh();
		})
		.catch((res)=>{
			console.log("Problemas al eliminar la sucursal", res);
		});
	}

	loadBranchOffices(){

		const apiMedical = this.state.conexion+"apiLoadMedicalCenter"
		//const apiMedical= "http://192.168.0.117:8000/api/LoadMedicalCenter";
		const token = window.localStorage.getItem('id_token');
		const datos={
			headers:
			{'access-token' : token }
		}
		axios.get(apiMedical, datos)
		.then((res) => {
		//console.log(res)
		this.setState({
			branchoffices: res.data.branchoffices
		})
		})
		.catch((error) => {
			console.log("Problemas al consultar la api de centro medicos", error);
		});
	}

	modalConfirm(item) {
		this.setState({
			modalAlert: !this.state.modalAlert,
			itemPos: item,
			warning:'show warning',
			delete:'¿Desea eliminar el registro?',
			aceptar:'show',
			cancelar:'show',
			deletediv:'show',

		});
	}

	modalCancel() {
		this.setState({
			modalAlert: false,
			itemPos: '',
			warning:'hide warning',
			delete:'',
			aceptar:'hide',
			cancelar:'hide',
		});
	}

	buttonDeleteBranchOffices(){	
		this.modalDelete(this.state.itemPos);
	}

// console.log(id)
// console.log(this.state.medical[id])
// const edit = this.state.medical[id]
	componentDidMount(){

		const apiLicenses = (this.state.conexion+"LoadLicense");
		const apiBaseMedical= this.state.conexion+"LoadMedicalCenter";
		const apiBaseUrl = (this.state.conexion+"loadCountries");
		const apiLoadCountBranchOffices = (this.state.conexion+"LoadCountBranchOffices");
		const apiCountTableBranchOffices = (this.state.conexion+"countTableBranchOffices");
		//const apiLicenses = ("http://192.168.0.117:8000/api/LoadLicense");
		//const apiBaseMedical= "http://192.168.0.117:8000/api/LoadMedicalCenter";
		//const apiBaseUrl = ("http://192.168.0.117:8000/api/loadCountries");
		const token = window.localStorage.getItem('id_token');

		const datos={
			headers:
			{'access-token' : token }
		}

		axios.get(apiBaseMedical, datos)
		.then((res) => {
			console.log(res)
			this.setState({
				branchoffices: res.data.branchoffices,
				Sucursal: res.data.name,
				countryid: res.data.countryid ,
				contacto: res.data.branchoffices.contacto,
				pais: res.data.countryid,
				provincia: res.data.provinceid,
				valorProvince: res.data.provinceid,
			})
			this.loadCountryId(res.data.countryid);
		})
		.catch((error) => {
			console.log("Error consultando la api medical center");
		});

		axios.get(apiLicenses, datos)
		.then((res) => {
			this.setState({
				licenses: res.data,
			})
		})
		.catch((error) => {
			console.log("Error consultando la api licenses");
		});

		axios.get(apiLoadCountBranchOffices, datos)
		.then((res) => {
			this.setState({
				countSucursales: res.data,
			})
		})
		.catch((error) => {
			console.log("Error consultando la api para la cantidad de sucursales");
		});

		axios.get(apiCountTableBranchOffices, datos)
		.then((res) => {
			this.setState({
				countTableBranchOffices: res.data,
			})
		})
		.catch((error) => {
			console.log("Error consultando la api para la cantidad de sucursales");
		});		

		const apiProvinces =(this.state.conexion+"loadCountries")
		// const apiProvinces = ("http://192.168.0.117:8000/api/loadCountries");
		axios.get(apiBaseUrl, datos)
		.then((res) => {

			this.setState({
				country: res.data,		
			})
		}).catch((error) => {
			console.log("Error consultando la api paises");
		});
		// -----------------------------------------------------------------------------
		this.setState({
			email: window.localStorage.getItem('email')
		})
	}

	toggleTab(tab){
		if(this.state.activeTab !== tab){
			this.setState({
				activeTab: tab
			});
		}
	}

	loadCountryId(valor){

		const token = window.localStorage.getItem('id_token');
		const apiProvinces =(this.state.conexion+"loadCountries")
		// const apiProvinces = ("http://192.168.0.117:8000/api/loadCountries");
		axios({
			method: 'post',
			url: apiProvinces,
			data: {
				idCountry: valor
			},
			headers:
			{'access-token' : token}
		})
		.then((res)=>{
			//console.log(res)
			this.setState({
				provinces : res.data.provinces,
				inicio: '1',
				divContainer: 'container show',
				divLoading: 'hide',
				currencySymbol: res.data.currencySymbol
			})
		})
		.catch((res)=>{
			//console.log(res)
			console.log("Error consultando la api de paises para provincias");
		});
	}

	loadProvinces(valor){

		const token = window.localStorage.getItem('id_token');
		const apiProvinces =(this.state.conexion+"loadCountries")
		//const apiProvinces = ("http://192.168.0.117:8000/api/loadCountries");
		axios({
			method: 'post',
			url: apiProvinces,
			data: {
				idCountry: valor
			},
			headers:
			{'access-token' : token}
		})
		.then((res)=>{
		//console.log(res)
			this.setState({
				provinces : res.data.provinces

			})
		}).catch((res)=>{
			console.log("Error consultando la api de paises para provincias");
		});
	}

 	callChildFunction = () => {
 		this.ModalContainer.handleActionParent(true);  ///calling a child function here
  	} 

	number_format(amount, decimals) {
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

	toggleAlert = () => {
        this.setState({
            modalWarning: !this.state.modalWarning           
        });    
    }

    cerrarModalAlert = () => {
        this.setState({
          modalWarning: false          
        });
    }

render() {

	return (
		<div className="animated fadeIn">
			<Row>
				<Col>
					<Card>
						<CardHeader>
							Configuracion del Centro Medico
						</CardHeader>
						<CardBody>
							<div>
								<Nav tabs>
									<NavItem>
										<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }}>
											Perfil Centro Medico
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }}>
											Sucursales
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggleTab('3'); }}>
											Licencias
										</NavLink>
									</NavItem>
								</Nav>
							</div>
							<TabContent activeTab={this.state.activeTab}>
								<TabPane tabId="2">
									<div className="container">
										<div className="">
											<p className="text-muted">Ajuste la informacion de las sucursales de su Centro Medico</p>
										</div>
										<div className="App">
											<Button color="success" onClick={this.toggle}>Agregar Sucursal</Button>
											{
												<ModalContainer
													ref={(cd) => this.ModalContainer = cd}
													edit={this.state.editbranchoffices}
													contactedit={this.state.contactedit}
													submitContact={this.submitContact.bind(this)}
													contacto={this.state.contacto}
													Toggle={this.toggleCancel.bind(this)}
													modal={this.state.modal}
													posicion={this.state.posicion}
													update ={this.state.update}
													update0={this.state.update0}
													delete={this.deleteContact.bind(this)}
													refresh={this.refresh.bind(this)}
													loadbranch={this.loadBranchOffices.bind(this)}
													sucursalesview= {this.state.sucursalesview}
										            tipoview= {this.state.tipoview}
										            sectorview= {this.state.sectorview}
										            paisview= {this.state.paisview}
										            provinciaview = {this.state.provinciaview}
										            addressview = {this.state.addressview}
										            contactview = {this.state.contactview}
										            deleteview = {this.state.deleteview}
										            acciones = {this.state.acciones}
										            button= {this.state.button}
										            buttoncancel= {this.state.buttoncancel}
										            buttonsave= { this.state.buttonsave}
										            collapse= {this.state.collapse}
										            collapseFile= {this.state.collapseFile}
													collapseMap= {this.state.collapseMap}
													collapseSocial= {this.state.collapseSocial}
													divhide={this.state.divhide}
													sucursaladd={this.state.sucursaladd}
													divfilehide={this.state.divfilehide}
													success={this.props.success} >

												</ModalContainer> 
											}
										</div>
										<br />
										<Table hover responsive borderless >
											<thead className="thead-light">
												<tr>
													<th>Sucursal</th>
													<th>Codigo</th>
													<th>Pais</th>
													<th>Provincia</th>
													<th >Acciones</th>
												</tr>
											</thead>
											<tbody>
											{
												Object.keys(this.state.branchoffices).map((item,i)=>{
													if(this.state.branchoffices[item].status === true){
														var a = this.state.branchoffices[item].countryId
														var b= ''
														var c= []
														var d = this.state.branchoffices[item].provinceId
														var f = ''
														Object.keys(this.state.country).map((item) =>{
															if(a === this.state.country[item].id){
																b = this.state.country[item].name
																c= this.state.country[item].provinces
																f=(this.state.country[item].provinces[d])

															}				
														})
														return   (
															<tr>
																<td>{this.state.branchoffices[item].name}</td>
																<td>{this.state.branchoffices[item].code}</td>
																<td>
																{
																	b
																}
																</td>
																<td>{f.name}</td>
																<td>
																<div  className="float-left" >
																<a title="edit" className="icon" onClick={() => { this.view(item)}}><FaSearch /></a>
																<a title="edit" className="icon" onClick={() => { this.modaledit(item)}}><FaUserEdit /></a>
																<a className="text-danger icon"  onClick={() => { this.modalConfirm(item)}}><FaMinusCircle /> </a>
																</div></td>
															</tr>
														)
													}
												})
											}
											</tbody>
										</Table>
									</div>
									<div>
										<Modal isOpen={this.state.modalAlert} modalConfirm={this.modalConfirm} className={this.state.claseModalConfirm}>
											<ModalHeader modalConfirm={this.modalConfirm}></ModalHeader>
											<ModalBody>
											<div color="success" className={this.state.check}><FaCheckCircle size="4em"/></div>
											<div color="warning" className={this.state.warning} ><FaExclamationCircle size="4em"/></div>
											<div  className={this.state.divLoading2} style={{textAlign: 'center'}}> 
											<img src="assets/loader.gif" width="20%" height="5%" />
											</div>
											<div align="center" className={this.state.deletediv}><h5><b>{this.state.delete}</b></h5></div>
											</ModalBody>
											<ModalFooter>
												<Button color="primary" className={this.state.aceptar}onClick={this.buttonDeleteBranchOffices}>Aceptar</Button>{' '}
												<Button color="secondary" className={this.state.cancelar}onClick={this.modalCancel}>Cancelar</Button>
											</ModalFooter>
										</Modal>
									</div>
									<div>
										<Modal isOpen={this.state.modalWarning} toggle={this.toggleWarning} className="ModalAlert">
			                                <ModalHeader></ModalHeader>
			                                <ModalBody>
			                                    <div color="success" className={this.state.alertCheck}><FaCheckCircle size="4em"/></div>
			                                    <div color="success" className={this.state.alertExc}><FaExclamationCircle size="4em"/></div>                                    
			                                    <h5 align="center"><b>{this.state.bodyAlert}</b></h5>
			                                </ModalBody>
			                                <ModalFooter></ModalFooter>
			                            </Modal>
									</div>
								</TabPane>

								<TabPane tabId="1">
									<div  className={this.state.divLoading} style={{textAlign: 'center'}}> 
										<img src="assets/loader.gif" width="20%" height="5%" />
									</div>
									<div className={this.state.divContainer}>
										<Form className="formCodeConfirm" onSubmit={this.handleSubmit}>
											<p className="text-muted">Ajuste la informacion basica de su Centro Medico</p>
											<div className="row">											
												<FormGroup className="top form-group col-sm-6" >
													<Label for="Sucursal" className="mr-sm-2">Nombre</Label>
													<Input invalid={this.state.SucursalInValid} onKeyUp={this.handlekey} valid={this.state.SucursalValid} type="text" name="Sucursal" id="Sucursal" value={this.state.Sucursal} maxLength="40" onChange={this.handleChange_}/>
													<FormFeedback tooltip>{this.state.SucursalError}</FormFeedback>
												</FormGroup>
												<FormGroup className="top form-group col-sm-6" >
													<Label for="exampleEmail" className="mr-sm-2">Email Master</Label>
													<Input type="email" name="email" id="exampleEmail" placeholder={this.state.email}  disabled/>
												</FormGroup>											
												<FormGroup className=" top form-group col-sm-6" >
													<Label for="pais">Pais</Label>
													<Input type="select" name="pais" id="pais" invalid= {this.state.paisInvalid}onChange={this.handleChange.bind(this)} >
													<option value="">Select...</option>
													{
														Object.keys(this.state.country).map((d) =>{
															if(this.state.country[d].id === this.state.countryid){
																return(
																	<option value={this.state.country[d].id} selected>{this.state.country[d].name}</option>
																)
															}
															else
															{
																return(
																	<option value={this.state.country[d].id}>{this.state.country[d].name}</option>
																)
															}
														})
													}
													</Input>
													<FormFeedback tooltip>{this.state.paisError}</FormFeedback>
												</FormGroup>
												<FormGroup className="top form-group col-sm-6">
													<Label for="provincia">Provincia</Label>
													<Input type="select" invalid={this.state.provinceInvalid} name="valorProvince" id="valorProvince" onChange={this.handleChange_} >
													<option value="">Select...</option>
													{
														Object.keys(this.state.provinces).map((d, i) =>{
															if(this.state.inicio == '1'){
																if(d == this.state.valorProvince)
																{
																	return(
																		<option value={d} selected>{this.state.provinces[d].name}</option>
																	)
																}
																else
																{
																	return(
																		<option value={d}>{this.state.provinces[d].name}</option>
																	)
																}
															}
															else if(this.state.inicio == '2')
															{
																return(
																	<option value={d}>{this.state.provinces[d].name}</option>
																)
															}
														})
													}
													</Input>
													<FormFeedback tooltip> {this.state.provinciaError}</FormFeedback>
												</FormGroup>
												<div className= "top form-group col-sm-6">
													<Button type="submit" color="primary">Guardar</Button>
												</div>
											</div>
										</Form>
									</div>
								</TabPane>

								<TabPane tabId="3">
									<div className="container">
										<p className="text-muted">Licencias de su Centro Medico</p>
										<div className="row">
											<div className="form-group col-sm-12">
												<Table hover responsive borderless>
													<thead className="thead-light">
														<tr>
															<th class="text-center" >Licencia</th>
															<th class="text-center" >Numero de clientes</th>
															<th class="text-center" >Numero de examenes</th>
															<th class="text-center">Monto</th>
															<th class="text-center">Fecha de expiracion</th>
														</tr>
													</thead>
													<tbody>
													{											
														Object.keys(this.state.licenses).map((item,i)=>{
															var date = new Date(this.state.licenses[item].expiration_date.sec  * 1000)
															var date2 =	new Intl.DateTimeFormat('en-GB').format(date)
															return(
																<tr class="text-center">
																	<td>{this.state.licenses[item].license}</td>
																	<td>{this.state.licenses[item].numberclients}</td>
																	<td>{this.state.licenses[item].numberexams}</td>
																	<td>{this.number_format(this.state.licenses[item].amount, 2)} {this.state.currencySymbol}</td>
																	<td>{
																		date2
																	}</td>
																</tr>
															)
														})
													}
													</tbody>
												</Table>
											</div>
										</div>
									</div>
								</TabPane>
							</TabContent>
							<br />
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
);
}
}
export default Configurations;
