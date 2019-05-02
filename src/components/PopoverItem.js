import React from 'react';
import { 
  Button, 
  Popover, 
  PopoverHeader, 
  PopoverBody,
  Table, 
} from 'reactstrap';
import classnames from 'classnames';
import './style.css'
import { datosConexion } from './Conexion.js'
import axios from 'axios';
import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar} from 'react-icons/fa';

class PopoverItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleClose = this.toggleClose.bind(this);

    let valueConexion = "";
    let arrayConexion = Object.values(datosConexion);
    arrayConexion.forEach(function (elemento, indice, array) {
        if(indice === 0){
            valueConexion = elemento;
        }            
    });        


    this.state = {
      popoverOpen: false,
      bodyPopover: [],
      //conexion: 'http://localhost:8000/api/',
      //conexion: 'http://smartclinics.online/sc-admin/web/app.php/api/',
      conexion: valueConexion,
    };
  }

  toggle(email, medicalCenterId, branchOfficeId) {
    
    const apiRolesPermisosValidateEmailUserNoMaster = this.state.conexion+"RolesPermisosValidateEmailUserNoMaster";
    const token = window.localStorage.getItem('id_token');
    const datos={
      headers:
      {'access-token' : token }
    }

    axios({
        method: 'post',
        url: apiRolesPermisosValidateEmailUserNoMaster,
        data: {  
            email: email,          
            medicalCenterId: medicalCenterId,
            branchOfficeId: branchOfficeId,
        },
        headers:
        {'access-token' : token}
    }).then((res)=>{
        console.log("roles y permisos cargados");
        this.setState({
            bodyPopover: res.data,            
        });        

    }).catch((res)=>{
        console.log("problemas al cargar los roles y permisos");
    });


    this.setState({
      popoverOpen: !this.state.popoverOpen,      
    });
    
  }

  toggleClose(){
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {    

    return (
      <span>
        <Button className="borderButton" color="secondary" id={'Popover-' + this.props.id} onClick={(e) => this.toggle(this.props.email, this.props.medicalCenterId, this.props.branchOfficeId)}>
          <FaSearch size="1em"/>
        </Button>
        <Popover placement="top-start" isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggleClose}>
          <PopoverHeader align="center">Roles - Permisos</PopoverHeader>
          <PopoverBody>
             <Table hover responsive borderless>
              <tbody>
                {
                  this.state.bodyPopover != null && 
                  this.state.bodyPopover.map((rolesPermisos, i) => {                                                                
                      return (
                          <tr>
                              <td>{i + 1 } - {rolesPermisos.name}</td>                                                                                      
                          </tr>   
                      )
                  })                                                        
                }                                                                                                         
              </tbody>
             </Table>
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}
export default PopoverItem;