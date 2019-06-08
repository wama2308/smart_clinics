import React from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { Button, Input, InputGroup, FormGroup, Label, FormText, FormFeedback, Collapse, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import '../../components/style.css';
import './Users.css';
import { FaSearch, FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import jstz from 'jstz';
import { connect } from "react-redux";
import { LoadPermitsMedicalCenterFunction, LoadRolIdFunction, testFunction } from "../../actions/UserAction";
import Select from 'react-select';
import ModalRoles from './ModalRoles.js';

class RolesPermisos extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
            activeTab: "1",
			modalRoles: false,
            rol: '',
            rolError: "",
            rolInvalid: false,            
            selectedNuevoRol:[], 
            divListBoxNuevoRol:'',            
            selectedErrorNuevoRol:'',
            modules: [],
            onlyModules: [],
            selectedInvalid: 0,  
            selectedInvalidNuevoRol:0,
            rolIdView: '',
            imageButton: <FaPlusCircle size="1em"/>,
            varDisabled: false,
            modal:false,
            modalHeader: '',
            modalFooter: '',
            action: '',
            disabled: '',
            showHide: '',
            option:0,
            loading:'show',                                   
		};
	}

	componentDidMount(){
        this.setState({
            modules: this.props.permits,
            onlyModules: this.props.modules,            
        });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    } 

    handleChangeSelectRol = (selectedRolOption) => {
        let valueActualRol = "";
        let arrayRol = Object.values(selectedRolOption);
        arrayRol.forEach(function (elemento, indice, array) {
            if(indice === 1){
                valueActualRol = elemento;
            }            
        });                
        this.setState({ 
            rolIdView: valueActualRol                            
        });     
        this.props.valorSelectRol(selectedRolOption);        
    }

    toggleNuevoRol = () => {
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

    toggleTab(tab){
        this.props.valorTab(tab);     
    }   

    cleanNewRol = () => {
        this.setState({
            rol: '',
            rolInvalid: false,                     
            rolError: '',             
            selectedInvalidNuevoRol: 0, 
            divListBoxNuevoRol: "",
            selectedErrorNuevoRol: "",
            selectedNuevoRol: [],        
            imageButton: <FaPlusCircle size="1em"/>,
            collapseNuevoRol: false,            
        })        
    }   

    onChange = (selected) => {
        this.props.valorSelectPermisos(selected);                   
    }  

    onChangeNuevoRol = (selectedNuevoRol) => {
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
            });
        }                
    }  

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

    handleSaveRoles = event => {
        event.preventDefault();
        const isValid = this.validateNuevoRol();        
        if (isValid) { 
            this.setState({loading:'show'})    
            this.props.saveRolAction(
              {
                rol:this.state.rol,
                selected: this.state.selectedNuevoRol,
                onlyModules: this.state.onlyModules,
                timeZ: jstz.determine().name()
              },
              () => {
                this.cleanNewRol();                    
              }
            )                       
        }
    }

    handlekeyRol = event =>{
        this.setState({
            rolError: "",
            rolInvalid: false,         
        })
    }    

    componentWillReceiveProps=(props)=>{}

    openRoles = (option, rolId) => {  
        if(!rolId){
            this.props.alert("warning", "¡Debe seleccionar un rol!");
        }else{
            this.props.LoadRolIdFunction(rolId);
            this.setState({
                modal:true,
                option:option,
                modalHeader:'Ver Rol',
                modalFooter:'Guardar',
                disabled: true,
                showHide: 'hide',             
            })
        }
    }

    valorCloseModalRoles = (valor) => {       
        this.setState({
            modal: valor,          
        });                    
    } 

	render() {   
        return (
            <div>  
                <ModalRoles 
                    option = {this.state.option}
                    modal = {this.state.modal}
                    modalHeader = {this.state.modalHeader}
                    modalFooter = {this.state.modalFooter}
                    disabled = {this.state.disabled}
                    showHide = {this.state.showHide}
                    modules = {this.props.modules}         
                    permits = {this.props.permits}  
                    valorCloseModalRoles={this.valorCloseModalRoles}  
                />             
        		<Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.props.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                            Roles
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.props.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                            Permisos-Especiales
                        </NavLink>
                    </NavItem>                
                </Nav>
                <TabContent activeTab={this.props.activeTab}>
                    <TabPane tabId="1">
                        <FormGroup className="top form-group col-sm-12">
                            <Label for="rol">Rol</Label>
                            <div className={this.props.divSelectRol}>                                                                        
                                <InputGroup className="form-group col-sm-20">                                                                
                                    <Select isDisabled={this.state.varDisabled} className="selectUsersRoles" name="rol" value={this.props.selectedRolOption} onChange={this.handleChangeSelectRol} options={this.props.rolSelect} />&nbsp;
                                    <div style={{width:'-2%'}}>
                                        <Button title="Ver Rol" className={this.state.ocultarBotones} disabled={this.state.varDisabled} onClick={() => { this.openRoles(2, this.state.rolIdView); }}><FaSearch size="1em"/></Button>&nbsp;
                                        <Button title="Agregar Rol" disabled={this.state.varDisabled} onClick={this.toggleNuevoRol} id="">{this.state.imageButton}</Button>
                                    </div>
                                </InputGroup>                                
                            </div>
                            <div className="errorSelect">{this.props.rolSelectError}</div>                                                                                                                                                                                                        
                        </FormGroup>       
                        <FormGroup className="top form-group col-sm-12">
                            <Collapse isOpen={this.state.collapseNuevoRol}>
                            <Card >
                            <CardBody >                            
                                <FormGroup className="top form-group col-sm-12">                                                                 
                                    <Label for="rol">Rol</Label>
                                    <Input disabled={this.state.varDisabled} invalid={this.state.rolInvalid} name="rol" id="rol" onKeyUp={this.handlekeyRol} onChange={this.handleChange} value={this.state.rol} type="text" placeholder="Rol" />
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
                                        <Button className="" color="primary" onClick={this.handleSaveRoles}>Guardar</Button>&nbsp;&nbsp; 
                                        <Button className="" color="danger" onClick={this.cleanNewRol}>Cancelar</Button> 
                                    </div>
                                </FormGroup>                              
                            </CardBody>
                            </Card>    
                            </Collapse>
                            <hr className={this.state.ocultarBotones}/>
                        </FormGroup>                                         
                    </TabPane>
                    <TabPane tabId="2">
                        <FormGroup className="top form-group col-sm-12">
                            <Label for="modules">Modulos-Permisos</Label>
                                <div className={this.props.divListBox}>
                                    <DualListBox disabled={this.state.varDisabled} className="borderColor" canFilter invalid name="modules" id="modules" options={this.state.modules} selected={this.props.selected} onChange={this.onChange} />
                                </div>
                                <div className="error">{this.props.selectedError}</div>  
                            <hr className={this.state.ocultarBotones}/>
                        </FormGroup>  
                    </TabPane>
                </TabContent>    
                
            </div> 
		);
	}
  }
export default RolesPermisos;