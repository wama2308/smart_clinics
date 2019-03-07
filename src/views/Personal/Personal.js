import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import Select from 'react-select';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Pusher from 'pusher-js';
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
import ModalCargos from './ModalCargos.js';
import ModalPersonal from './ModalPersonal.js';
import './Personal.css';
import './loading.css';
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
        
        this.state = {            
            activeTab: "1",
            conexion: valueConexion,  
            divLoadingTable:'row hide',
            divContainerTable:'row hide',
            varDisabled: '', 
            arrayCharges: [],
            arrayTypeIdentity: [],
            arraySex: [],
            arrayEstateCivil: [],
            arrayProfession: [],
            arrayEspecialization: [],    
            arrayPersonal: [],        
            timeZ: timezone.name(),            
        };        
    }
    
    componentDidMount(){

        const pusher = new Pusher('5bcdc3131ca4f64ce87c', {
            cluster: 'us2',
            encrypted: true
        });

        const channel_charges = pusher.subscribe('charges');
        channel_charges.bind('dataCharges', data => {
            this.setState({ 
                arrayCharges: data,             
            });        
        });

        const channel_personal = pusher.subscribe('personal');
        channel_personal.bind('dataPersonal', data => {
            this.setState({ 
                arrayPersonal: data,             
            });        
        });

        this.setState({
            divContainerTable: "row hide",
            divLoadingTable: "row show",            
        })
        this.LoadCharges();  
        this.LoadPersonal();  

        const token = window.localStorage.getItem('id_token');  
        var decoded = jwt_decode(token);
        let sex = '';
        let civilState = '';
        let profession = '';
        let especialization = '';

        Object.keys(decoded.general_configuration[0]).map((i)=>{
            sex = decoded.general_configuration[0].sex;
            civilState = decoded.general_configuration[0].civil_state;
            profession = decoded.general_configuration[0].profession;
            especialization = decoded.general_configuration[0].specialization;            
        })

        this.setState({
            arraySex: sex,
            arrayEstateCivil: civilState,
            arrayProfession: profession,
            arrayEspecialization: especialization,            
        })   

        this.LoadSelects();       
    }        

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }   

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    } 

    LoadCharges = () => {

        const token = window.localStorage.getItem('id_token');
        const apiQueryPosition = (this.state.conexion+"queryPosition");
        const datos={
            headers:
            {'access-token' : token }
        }

        axios.get(apiQueryPosition, datos)
        .then((res) => {
            //console.log(res.data.roles)
            if(res.data === 0){

                this.setState({
                    arrayCharges: []                
                })  

                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

            }else{

                this.setState({
                    arrayCharges: res.data                
                }) 

                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })   

                const payload = this.state.arrayCharges;   
                //axios.post('http://localhost:5000/listCharges', payload);
                axios.post('http://smartclinics.online/server-pusher/listCharges', payload);
            }            

        })
        .catch((error) => {
            console.log(error);
        });
    }

    LoadSelects = () => {

        const token = window.localStorage.getItem('id_token');
        const apiQueryProvinces = (this.state.conexion+"queryProvinces");        
        const apiQueryNationalPayments = (this.state.conexion+"queryNationalPayments");        
         /*----------------------------------------------------------------------*/
        const datos={
            headers:
            {'access-token' : token }
        }
        /*-------------------------------------1--------------------------------*/        
        axios.get(apiQueryProvinces, datos)
        .then((res) => {
            
            if(res.data.length > 0){
                this.setState({
                    arrayProvince: res.data                
                })                 

            }else{
                this.setState({
                    arrayProvince: []                
                })                 
            }
            

        })
        .catch((error) => {
            console.log(error);
        });        
        /*-------------------------------------2--------------------------------*/        
        axios.get(apiQueryNationalPayments, datos)
        .then((res) => {
            
            this.setState({
                arrayTypeIdentity: res.data.type_identity
            })    
        })
        .catch((error) => {
            console.log(error);
        });      
        
    }

    LoadPersonal = () => {

        const token = window.localStorage.getItem('id_token');
        const apiQueryListInternalStaff = (this.state.conexion+"queryListInternalStaff");
        const datos={
            headers:
            {'access-token' : token }
        }

        axios.get(apiQueryListInternalStaff, datos)
        .then((res) => {
            if(res.data === 0){

                this.setState({
                    arrayPersonal: []              
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })  

            }else{

                this.setState({
                    arrayPersonal: res.data              
                }) 
                this.setState({
                    divContainerTable: "row show",
                    divLoadingTable: "row hide",            
                })  

                const payload = this.state.arrayPersonal;   
                //axios.post('http://localhost:5000/listPersonal', payload); 
                axios.post('http://smartclinics.online/server-pusher/listPersonal', payload); 
            }            

        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {        
        
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                    <Card>
                    <CardHeader>
                        Personal-Cargos
                    </CardHeader>
                    <CardBody>  
                    <div>    
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                                Personal
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                                Cargos
                            </NavLink>
                        </NavItem>                
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>      
                    <TabPane tabId="1">            
                        <div className="container">    
                            
                            <div className="row">
                                <ModalPersonal 
                                    opcion = {1}
                                    LoadPersonal = {this.LoadPersonal.bind(this)} 
                                    charges = {this.state.arrayCharges}
                                    sex = {this.state.arraySex}
                                    civilState = {this.state.arrayEstateCivil}
                                    profession = {this.state.arrayProfession}
                                    especialization = {this.state.arrayEspecialization}
                                    province = {this.state.arrayProvince}
                                    typeIdentity = {this.state.arrayTypeIdentity}
                                />                                
                            </div>                             
                            <br />
                                <div align="center" className={this.state.divLoadingTable}><img src="assets/loader.gif" width="20%" height="5%"/></div>
                                <div className={this.state.divContainerTable}>
                                    <Table hover responsive borderless>
                                        <thead className="thead-light">
                                            <tr>
                                                <th style={{width:"5%"}}>Nro</th>                                                        
                                                <th style={{width:"14%"}}>DNI</th>
                                                <th style={{width:"25%"}}>Personal</th>
                                                <th style={{width:"13%"}}>Cargo</th>
                                                <th style={{width:"10%"}}>Email</th>
                                                <th style={{width:"10%"}}>Telefono</th>
                                                <th style={{width:"13%"}}>Ingreso</th>                                                
                                                <th style={{width:"10%"}}>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.arrayPersonal != null && 
                                                this.state.arrayPersonal.map((personal, i) => {                
                                                    return (
                                                        <tr>
                                                            <td scope="row" style={{width:"5%"}}>{i + 1}</td>
                                                            <td style={{width:"14%"}}>{personal.type_identity} - {personal.dni}</td>                                                                                                                    
                                                            <td style={{width:"25%"}}>{personal.names} {personal.surnames}</td>                                                                                                                    
                                                            <td style={{width:"13%"}}>{personal.positions}</td>                                                                                                                    
                                                            <td style={{width:"10%"}}>{personal.email[0]}</td>                                                                                                                    
                                                            <td style={{width:"10%"}}>{personal.phone[0]}</td>                                                                                                                    
                                                            <td style={{width:"13%"}}>{personal.entry_date}</td>                                                                                                                    
                                                            <td style={{width:"10%"}} >
                                                                <div  className="float-left" >
                                                                     <ModalPersonal 
                                                                        opcion = {2}
                                                                        charges = {this.state.arrayCharges}
                                                                        sex = {this.state.arraySex}
                                                                        civilState = {this.state.arrayEstateCivil}
                                                                        profession = {this.state.arrayProfession}
                                                                        especialization = {this.state.arrayEspecialization}
                                                                        province = {this.state.arrayProvince}
                                                                        typeIdentity = {this.state.arrayTypeIdentity}
                                                                        idPersonal = {personal._id}                                                                       
                                                                        
                                                                    />
                                                                    <ModalPersonal
                                                                        opcion = {3}
                                                                        LoadPersonal = {this.LoadPersonal.bind(this)} 
                                                                        charges = {this.state.arrayCharges}
                                                                        sex = {this.state.arraySex}
                                                                        civilState = {this.state.arrayEstateCivil}
                                                                        profession = {this.state.arrayProfession}
                                                                        especialization = {this.state.arrayEspecialization}
                                                                        province = {this.state.arrayProvince}
                                                                        typeIdentity = {this.state.arrayTypeIdentity}
                                                                        idPersonal = {personal._id}       
                                                                    />
                                                                    <ModalPersonal
                                                                        opcion = {4}
                                                                        position = {i}
                                                                        idPersonal = {personal._id}    
                                                                        LoadPersonal = {this.LoadPersonal.bind(this)}    
                                                                    />
                                                                
                                                                </div>
                                                            </td>
                                                            
                                                        </tr>   
                                                    )
                                                })                                                        
                                            } 
                                        </tbody>
                                    </Table>     
                                </div>                            
                        
                        </div>
                    </TabPane>    
                    <TabPane tabId="2">            
                        <div className="container">                            
                            <div className="row">
                                <ModalCargos 
                                    opcion = {1}
                                    loadCharges = {this.LoadCharges.bind(this)} 
                                />
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
                                                this.state.arrayCharges != null && 
                                                this.state.arrayCharges.map((charges, i) => {                
                                                    return (
                                                        <tr>
                                                            <td scope="row" style={{width:"30%"}}>{i + 1}</td>
                                                            <td style={{width:"40%"}}>{charges.label}</td>                                                                                                                    
                                                            <td style={{width:"15%"}} >
                                                                <div  className="float-left" >
                                                                    <ModalCargos 
                                                                        opcion = {2}
                                                                        cargoId = {charges.value}
                                                                        label = {charges.label}
                                                                        description = {charges.description}
                                                                    />
                                                                    <ModalCargos 
                                                                        opcion = {3}
                                                                        cargoId = {charges.value}
                                                                        label = {charges.label}
                                                                        description = {charges.description}
                                                                        loadCharges = {this.LoadCharges.bind(this)} 
                                                                    />
                                                                </div>
                                                            </td>
                                                            
                                                        </tr>   
                                                    )
                                                })                                                        
                                            } 
                                        </tbody>
                                    </Table>     
                                </div>                            
                        </div>
                    </TabPane>        
                    </TabContent>                     
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
