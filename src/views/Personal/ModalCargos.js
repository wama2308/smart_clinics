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
import '../../components/style.css';
import './Personal.css';
import { datosConexion } from '../../components/Conexion.js';
import axios from 'axios';
import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar} from 'react-icons/fa';
import jstz from 'jstz';


class ModalCargos extends React.Component {
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
        
        this.handleSaveCargos = this.handleSaveCargos.bind(this);                 

		this.state = {
			modalCargos: false,
            modalHeaderCargos: '', 
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

            cargo: '',
            cargoError: '',
            cargoInvalid: false,

            descripcion: '',
            descripcionError: '',
            descripcionInvalid: false,

			conexion: valueConexion,
            timeZ: timezone.name(),
		};
	}

	componentDidMount(){
        
        
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }   

	openCargos = (option) => {		
        if(option === "1")
        {
            this.setState({
                divLoading: 'sizeDiv show',
                divContainer: 'container hide',
                modalCargos: !this.state.modalCargos,     
                buttonSave: 'show',
                buttonCancel: 'show',
                varDisabled: '',
                modalHeaderCargos: 'Registrar Cargo',                 
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
            }); 

            this.setState({
                cargo: this.props.label,
                descripcion: this.props.description,
                modalCargos: !this.state.modalCargos,     
                buttonSave: 'hide',
                buttonCancel: 'show',
                varDisabled: 'true',
                modalHeaderCargos: 'Ver Cargo',                 
                modalFooterButton: 'Guardar',
                opcionForm: 2,    
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
            }); 

            this.setState({
                cargo: this.props.label,
                descripcion: this.props.description,
                modalCargos: !this.state.modalCargos,     
                buttonSave: 'show',
                buttonCancel: 'show',
                varDisabled: '',
                modalHeaderCargos: 'Editar Cargo',                 
                modalFooterButton: 'Editar',
                opcionForm: 3,    
            });      

            setTimeout(() => {
                this.setState({
                    divLoading: 'sizeDiv hide',
                    divContainer: 'container show',
                });                          
            }, 1000); 
        }
    }

    closeCargos = () => {
    	this.setState({
          modalCargos: false,
          cargoError: '',
          cargoInvalid: false,
          descripcionError: '',
          descripcionInvalid: false,          
        });
    }   

    validateSaveCargo = () => {

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

    handleSaveCargos = event => {

        event.preventDefault();
        const isValid = this.validateSaveCargo();        
        if (isValid) {  
            if(this.state.opcionForm === 1){

                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })

                const apiCreatePosition = (this.state.conexion+"createPosition");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apiCreatePosition,
                    data: {
                        name:this.state.cargo,
                        description: this.state.descripcion,   
                        timeZ:this.state.timeZ,                     
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    if(res.data === 1){
                        console.log("Operacion exitosa");                    
                        this.setState({ 
                            cargo: '',
                            cargoError: '',
                            cargoInvalid: false,
                            descripcion: '',
                            descripcionError: '',
                            descripcionInvalid: false,
                            alertCheck: 'show check',
                            alertExc: 'hide warning',
                            bodyAlert: '¡Operacion Exitosa!',
                            buttonAceptarAlert: 'hide',                        
                            buttonCancelAlert: 'hide',
                        });   
                        this.props.loadCharges(true);
                        this.toggleAlert();
                        this.closeCargos();                               
                        setTimeout(() => {
                            this.cerrarModalAlert();
                        }, 1000);

                        this.setState({ 
                            divContainer: 'hide',
                            divLoading: 'sizeDiv hide',
                        })
                    }else{
                        console.log(res.data)
                    }
                })                    

                .catch((res)=>{
                    console.log("Error en la operacion");
                });
            }
            else if(this.state.opcionForm === 3){
                
                this.setState({ 
                    divContainer: 'hide',
                    divLoading: 'sizeDiv show',
                })

                const apiEditPosition = (this.state.conexion+"editPosition");
                const token = window.localStorage.getItem('id_token');
                axios({
                    method: 'post',
                    url: apiEditPosition,
                    data: {
                        _id:this.props.cargoId,
                        name:this.state.cargo,
                        description: this.state.descripcion,   
                        timeZ:this.state.timeZ,                     
                    },
                    headers:
                    {'access-token' : token}
                })
                .then((res)=>{
                    if(res.data === 1){
                        console.log("Operacion exitosa");                    
                        this.setState({ 
                            cargo: '',
                            cargoError: '',
                            cargoInvalid: false,
                            descripcion: '',
                            descripcionError: '',
                            descripcionInvalid: false,
                            alertCheck: 'show check',
                            alertExc: 'hide warning',
                            bodyAlert: '¡Operacion Exitosa!',
                            buttonAceptarAlert: 'hide',                        
                            buttonCancelAlert: 'hide',
                        });   
                        
                        this.props.loadCharges(true);
                        this.toggleAlert();
                        this.closeCargos();                                                       
                        setTimeout(() => {
                            this.cerrarModalAlert();                            
                        }, 1000);

                        this.setState({ 
                            divContainer: 'hide',
                            divLoading: 'sizeDiv hide',
                        })
                        
                    }else{
                        console.log(res.data)
                    }
                })                    

                .catch((res)=>{
                    console.log(res);
                });

            }
        }     

    }

    handlekeyCargo = event =>{
        this.setState({
            cargoError: "",
            cargoInvalid: false,            
        })
    }

    handlekeyDescripcion = event =>{
        this.setState({
            descripcionError: "",
            descripcionInvalid: false,            
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

	render() {    

    	return (
            <span>                            
        		{
                    this.props.opcion === 1 && <Button color="success" onClick={() => { this.openCargos('1'); }}>Agregar</Button>                                                                                                              
                }
                {   
                    this.props.opcion === 2 && <a title="Ver Cargo" className=""  onClick={() => { this.openCargos('2'); }}><FaSearch /> </a>
                }
                {   
                    this.props.opcion === 3 && <a title="Editar Cargo" className=""  onClick={() => { this.openCargos('3'); }}><FaUserEdit /> </a>
                }                                              
                <Modal isOpen={this.state.modalCargos} toggle={this.openCargos} className="Modal">
                    <div  className={this.state.divLoading} style={{padding:"1%"}}><img src="assets/loader.gif" width="30%" /></div>
                    <div className={this.state.divContainer}>
                    <ModalHeader toggle={this.closeCargos}>{this.state.modalHeaderCargos}</ModalHeader>
                    <ModalBody className="Scroll">      
                    <form className="formCodeConfirm" onSubmit={this.handleSaveCargos.bind(this)}> 
                        <FormGroup className="top form-group col-sm-12">                                                                 
                            <Label for="plantilla">Cargo</Label>
                            <Input disabled={this.state.varDisabled} invalid={this.state.cargoInvalid} name="cargo" id="cargo" onKeyUp={this.handlekeyCargo} onChange={this.handleChange} value={this.state.cargo} type="text" placeholder="Cargo" />
                            <FormFeedback tooltip>{this.state.cargoError}</FormFeedback>                                                            
                        </FormGroup>    
                        <FormGroup className="top form-group col-sm-12">                                                                 
                            <Label for="direccion">Descripcion:</Label>
                            <Input disabled={this.state.varDisabled} invalid={this.state.descripcionInvalid} name="descripcion" id="descripcion" onKeyUp={this.handlekeyDescripcion} onChange={this.handleChange} value={this.state.descripcion} type="textarea" placeholder="Descripcion" />
                            <FormFeedback tooltip>{this.state.descripcionError}</FormFeedback>                                                                                                                                                            
                        </FormGroup>     
                    </form>                                                                    
                    </ModalBody>
                    <ModalFooter>
                        <Button className={this.state.buttonSave} color="primary" onClick={this.handleSaveCargos}>{this.state.modalFooterButton}</Button>
                        <Button className={this.state.buttonCancel} color="danger" onClick={this.closeCargos}>Cancelar</Button>                                                                                                                                              
                    </ModalFooter>
                    </div>
                </Modal>
                <Modal isOpen={this.state.modalAlert} toggle={this.toggleAlert} className="ModalAlert">
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                        <div color="success" className={this.state.alertCheck}><FaCheckCircle size="4em"/></div>
                        <div color="success" className={this.state.alertExc}><FaExclamationCircle size="4em"/></div>                                    
                        <h4><b>{this.state.bodyAlert}</b></h4>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="hide" color="primary" onClick="">Aceptar</Button>
                        <Button className="hide" color="danger" onClick="">Cancelar</Button>
                    </ModalFooter>
                </Modal>                   
            </span> 
		);
	}

  }
  export default ModalCargos;