import React from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { Button, Col, Row, Table, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText, FormFeedback, Tooltip, } from 'reactstrap';
import classnames from 'classnames';
import '../../components/style.css';
import './Users.css';
import axios from 'axios';
import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar} from 'react-icons/fa';
import jstz from 'jstz';
import { connect } from "react-redux";
import { ValidateEmailUserNoMasterFunction, deleteInfoUser, } from "../../actions/UserAction";
import ModalInfoUserEmail from './ModalInfoUserEmail.js';
import RolesPermisos from './RolesPermisos.js';
import Select from 'react-select';
import { openSnackbars } from "../../actions/aplicantionActions";

const rolNew = {
                  "_id": {
                      "inc": 5684630,
                      "pID": 5129,
                      "timestamp": 1547656304
                  },
                  "rol": "NEW WAMA",
                  "modules": [
                      {
                          "name": "Configuracion",
                          "permits": [
                              "create"                    
                          ]
                      },
                      {
                          "name": "guevo",
                          "permits": [
                              "create"                    
                          ]
                      }
                  ],
                  "status": true,
                  "created_at": {
                      "sec": 1547656303,
                      "usec": 989000
                  },
                  "created_by": "5c34f40c7464200aee61bd28",
                  "updated_at": {
                      "sec": 1552486524,
                      "usec": 0
                  },
                  "updated_by": "5c34f40c7464200aee61bd28"
              }

class ModalUser extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
			modalUser: false,
            email:'',
            emailError:'',
            emailInvalid:false,
            emailConsulta:'',
            selectedSucursalOption: null,
            sucursalError: '',
            divSelectSucursal: '',   
            sucursal: [],       
            rolSelect:[],                      
            
            openModalInfoEmail:false,
            totalBranchOffices: 0,
            arrayBranchOffices: [],
            infoEmail: [],
            estadoUser: "",
            emailExist: 0,
            modules: [],
            onlyModules: [],
            loading:'show',                                   
		};
	}

	componentDidMount(){
        this.setState({
            totalBranchOffices: this.props.totalBranchOffices,
            sucursal: this.props.arrayBranchOffices,            
        })

        this.props.roles != null && 
        this.props.roles.map((list, i) => {            
            this.state.rolSelect.push(
                { 
                    label: list.rol,
                    value: list._id,                    
                }
            )         
        })        
    }

    testWama = () => {
        let a = rolNew._id;
        a = {};
        console.log(a);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }   

	openUser = (option) => {	 
        
        if(option === "1")
        {            
            if(this.state.totalBranchOffices > 0){                
                this.setState({
                    modalUser: true,                                 
                });      
            }else{
                this.props.alert("warning", "¡Antes de registrar un usuario debe registrar una sucursal!");
            }
        }
        else if (option === "2"){
            //this.props.LoadRolViewId(this.props.position);
            this.setState({
                modalUser: true,                                 
            });      
        }else if(option === "3"){
            //this.props.LoadRolViewId(this.props.position);
            this.setState({
                modalUser: true,                  
            }); 
        }
    }

     handlekey= event =>{
        this.setState({
            emailError: '',
            emailInvalid: false
        })
    }    

    closeUser = () => {
    	this.setState({                     
            modalUser: false,  
            openModalInfoEmail: false,  
            email:''
        });   
        this.props.valorCloseModalRoles(false);          
    }  

    pruebaOnBlur = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            emailConsulta: value
        });     
        if(value !== ""){
            this.props.ValidateEmailUserNoMasterFunction(value);
        }
        
    }     

    handleSaveUser = event => {
        event.preventDefault();
    }

    valorCloseModalInfoUser = (valor) => {
        if(valor === 0){
            this.setState({
                openModalInfoEmail: false,  
                email:''
            });            
        }else{
            this.setState({
                openModalInfoEmail: false,                  
            });            
        }
    } 

    handleChangeSelectSucursales = (selectedSucursalOption) => {
        this.setState({ 
                selectedSucursalOption,
                sucursalError: '',
                divSelectSucursal: ''                                
            });        
        //console.log(selectedSucursalOption);
    }   

    componentWillReceiveProps=(props)=>{
        this.setState({
            modalUser: props.modal,
            loading:'hide'            
        });        

        if(props.aplication.snackBars){
            if(props.aplication.snackBars.open === true){
                this.setState({email:''})
            }
        }

        if(props.usersRoles.infoEmailUser){            
            if(props.usersRoles.infoEmailUser.data.infoEmail){
                this.setState({
                    openModalInfoEmail: true,
                    infoEmail: props.usersRoles.infoEmailUser.data.infoEmail,
                    estadoUser: props.usersRoles.infoEmailUser.data.estado,
                    emailExist: props.usersRoles.infoEmailUser.data.exist,
                })
                if(props.usersRoles.infoEmailUser.data.infoEmail.exist === 1){
                    this.setState({email:''})    
                }
            }
            else{
                if(props.usersRoles.infoEmailUser.data.exist === 1){
                    this.setState({email:''})    
                }
                if((props.usersRoles.infoEmailUser.data.exist === 0) && (props.usersRoles.infoEmailUser.data.clean === 0)){
                    this.setState({email:''})    
                }
            }
        }else{            
            this.setState({email:''})
        }        
    }

	render() {                    
        return (
            <span>                            
        		<Modal isOpen={this.state.modalUser}  className="Modal">
                    {
                        this.state.loading === "hide" ?
                            <div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeRoles}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">      
                            <form className="formCodeConfirm" onSubmit={this.handleSaveUser.bind(this)}> 
                                <FormGroup className="top form-group col-sm-12">                                                                 
                                    <Label for="email">Email</Label>
                                    <Input autoFocus={this.state.focus} disabled={this.state.varDisabled} invalid={this.state.emailInvalid} name="email" id="email" onKeyUp={this.handlekey} onChange={this.handleChange} value={this.state.email} onBlur={this.pruebaOnBlur} type="text" placeholder="ejemplo@gmail.com" />
                                    <FormFeedback tooltip>{this.state.emailError}</FormFeedback>                                                            
                                </FormGroup>
                                <FormGroup tag="fieldset">
                                    <h5>Sucursales-Roles-Permisos</h5>                                                            
                                    <FormGroup className="top form-group col-sm-12">                                                                 
                                        <Label for="sucursal">Sucursal</Label>
                                        <div className={this.state.divSelectSucursal}>
                                            <Select isSearchable isDisabled={this.state.varDisabled} name="sucursal" value={this.state.selectedSucursalOption} onChange={this.handleChangeSelectSucursales} options={this.state.sucursal} />
                                        </div>
                                        <div className="errorSelect">{this.state.sucursalError}</div>                                                                
                                    </FormGroup>
                                </FormGroup>
                                <RolesPermisos 
                                    rolSelect = {this.state.rolSelect}
                                    modules = {this.props.modules}         
                                    permits = {this.props.permits}  
                                    saveRolAction = {this.props.saveRolAction}
                                    LoadRolIdFunction = {this.props.LoadRolIdFunction}
                                    alert = {this.props.alert}
                                />
                            </form>                                                                    
                            </ModalBody>
                            <ModalFooter>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSaveUser}>{this.props.modalFooter}</Button>
                                <Button className="" color="danger" onClick={this.closeUser}>Cancelar</Button>                                                                                                                                                                              
                                <Button className="" color="danger" onClick={this.testWama}>Cancelar</Button>                                                                                                                                                                              
                            </ModalFooter>
                            </div>
                        :
                            <div align="center" className={this.state.divLoading} style={{padding:"1%"}}><img src="assets/loader.gif" width="30%" /></div>
                    }
                </Modal>                  
                <ModalInfoUserEmail  
                    open={this.state.openModalInfoEmail}
                    infoEmail={this.state.infoEmail}
                    estadoUser={this.state.estadoUser}
                    emailExist={this.state.emailExist}
                    emailConsulta={this.state.emailConsulta}   
                    deleteInfoUser={this.props.deleteInfoUser}      
                    valorCloseModalInfoUser={this.valorCloseModalInfoUser}                
                />                
            </span>
		);
	}
  }
const mapStateToProps = state => ({
  usersRoles: state.usersRoles.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
  ValidateEmailUserNoMasterFunction: (email) => dispatch(ValidateEmailUserNoMasterFunction(email)),    
  deleteInfoUser: (clean, exist) => dispatch(deleteInfoUser(clean, exist)),  
  alert: (type, message) => dispatch(openSnackbars(type, message)), 
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUser);