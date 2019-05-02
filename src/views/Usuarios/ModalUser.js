import React from 'react';
import Select from 'react-select';
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
import { ValidateEmailUserNoMasterFunction, deleteInfoUser, deleteUserIdView, addEmailStoreAction} from "../../actions/UserAction";
import ModalInfoUserEmail from './ModalInfoUserEmail.js';
import RolesPermisos from './RolesPermisos.js';
import SucursalesList from './SucursalesList.js';
import { openSnackbars, openConfirmDialog } from "../../actions/aplicantionActions";

class ModalUser extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
			modalUser: false,
            email:'',
            emailError:'',
            emailInvalid:false,
            emailConsulta:'',
            selected: [],
            divListBox: "",
            selectedError: "",
            selectedInvalid: 0,  
            selectedRolOption:null,
            divSelectRol:'',
            rolSelectError:'',
            listSucursales: [],
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
            collapseNuevoRol: false,       
            activeTab: "1",   
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
        
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }   

    valorTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
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
            email:'',
            emailInvalid: false,
            emailError: "",
            listSucursales:[],            
            selectedInvalid: 0,
            divListBox:"",
            selectedError: "",
            selectedRolOption:null,
            divSelectRol:"",
            rolSelectError:"",
            selectedSucursalOption:null,
            divSelectSucursal:"",
            sucursalError: "",
            activeTab: "1",
            loading:'show'
        });   
        this.props.valorCloseModalRoles(false);    
        this.props.deleteUserIdView();            
    }  

    pruebaOnBlur = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            emailConsulta: value
        });     
        if(value !== ""){
            this.props.ValidateEmailUserNoMasterFunction(value);
            this.props.addEmailStoreAction(value);
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
        this.props.addSucursalFunction(this.state.email, this.state.listSucursales);
        this.setState({
            selectedSucursalOption: null,
            selectedRolOption: null,
            selected: [],              
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

    componentWillReceiveProps=(props)=>{
        this.setState({
            modalUser: props.modal,
            loading:'show'            
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

        if(props.option !== 1){   
            this.setState({
                loading:'hide',
                email: props.usersRoles.userIdView.email,
                listSucursales: props.usersRoles.userIdView.sucursal,                           
            })              
        }else{  
            this.setState({
                loading:'hide',
                email: props.usersRoles.userIdView.email,
                listSucursales: props.usersRoles.userIdView.sucursal,                
            })   
        }                   
    }

    valorSelectRol = (valor) => {        
        this.setState({
            selectedRolOption: valor,  
            rolSelectError: '',
            divSelectRol: '',
            divListBox: "",
            selectedError: "",  
        });                            
    } 

    valorSelectPermisos = (selected) => { 
        if(Object.keys(selected).length === 0 )
        {
            this.setState({                 
                selected: selected, 
                selectedInvalid: 0, 
                divListBox: "borderColor",
                selectedError: "¡Seleccione los permisos!" 
            });
        }
        else
        {
            this.setState({ 
                selected: selected, 
                selectedInvalid: 1, 
                divListBox: "",
                selectedError: "",
                rolSelectError: '',
                divSelectRol: ''      
            });
        }            
    } 
    
    handleSaveUser = event => {
        if(this.state.listSucursales.length === 0){
            this.props.alert("warning", "¡Debe ingresar datos en la tabla de sucursales!");      
        }
        else{
            if(this.props.option === 1)
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
                this.setState({loading:'show'})    
                    this.props.saveUserNoMasterAction(
                    {
                        email:this.state.email,
                        listSuc: this.state.listSucursales,                        
                        onlyModules: this.props.modules,                                                
                        groupSucursales: grouped,                        
                        timeZ: jstz.determine().name()
                    },
                    () => {
                        this.closeUser();                    
                    }
                )
            }
            else if(this.props.option === 3){
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
                this.setState({loading:'show'})    
                    this.props.editUserNoMasterAction(
                    {
                        id:this.props.userIdEdit,
                        email:this.state.email,
                        listSuc: this.state.listSucursales,                        
                        onlyModules: this.props.modules,                                                
                        groupSucursales: grouped,                        
                        timeZ: jstz.determine().name()
                    },
                    () => {
                        this.closeUser();                    
                    }
                )
            }
        }
    }

	render() {                    
        return (
            <span>                            
        		<Modal isOpen={this.state.modalUser}  className="ModalUsersRoles">
                    {
                        this.state.loading === "hide" ?
                            <div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeUser}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">      
                            <form className="formCodeConfirm" onSubmit={this.handleSaveUser.bind(this)}> 
                                <FormGroup className="top form-group col-sm-12">                                                                 
                                    <Label for="email">Email</Label>
                                    <Input autoFocus={this.state.focus} disabled={this.props.disabledEmail} invalid={this.state.emailInvalid} name="email" id="email" onKeyUp={this.handlekey} onChange={this.handleChange} value={this.state.email} onBlur={this.pruebaOnBlur} type="text" placeholder="ejemplo@gmail.com" />
                                    <FormFeedback tooltip>{this.state.emailError}</FormFeedback>                                                            
                                </FormGroup>
                                {
                                    this.props.option !== 2 &&
                                    <span>
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
                                            valorSelectRol={this.valorSelectRol}
                                            valorSelectPermisos={this.valorSelectPermisos}
                                            valorTab={this.valorTab}
                                            collapseNuevoRol={this.state.collapseNuevoRol}       
                                            activeTab={this.state.activeTab}
                                            divSelectRol={this.state.divSelectRol}
                                            rolSelectError={this.state.rolSelectError}
                                            divListBox={this.state.divListBox}
                                            selectedError={this.state.selectedError}
                                            selectedRolOption={this.state.selectedRolOption}
                                            selected={this.state.selected}
                                        />
                                        <br />
                                        <Button className={this.state.ocultarBotones} disabled={this.state.varDisabled} color="success" onClick={this.handleSubmitTable}>Agregar</Button>
                                        <br />
                                        <br /> 
                                    </span>
                                }                                
                                <SucursalesList 
                                    option={this.props.option}
                                    listSucursales={this.state.listSucursales}
                                    LoadRolIdFunction = {this.props.LoadRolIdFunction}
                                    modules = {this.props.modules}         
                                    permits = {this.props.permits}  
                                    confirmDeleteBranchOffices = {this.props.confirmDeleteBranchOffices}  
                                    deleteRowListBranchOffices = {this.deleteRowListBranchOffices}  
                                    deleteSucursalFunction = {this.props.deleteSucursalFunction}  
                                    alert = {this.props.alert}  
                                />
                            </form>                                                                    
                            </ModalBody>
                            <ModalFooter>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSaveUser}>{this.props.modalFooter}</Button>
                                <Button className="" color="danger" onClick={this.closeUser}>Cancelar</Button>                                                                                                                                                                                                              
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
  addEmailStoreAction: (email) => dispatch(addEmailStoreAction(email)),  
  alert: (type, message) => dispatch(openSnackbars(type, message)), 
  confirmDeleteBranchOffices: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
  confirmDeleteBranchOffices: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
  deleteUserIdView: () =>dispatch(deleteUserIdView()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalUser);