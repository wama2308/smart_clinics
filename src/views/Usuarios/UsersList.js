import React from "react";
import { Table, Button } from "reactstrap";
import ModalUser from './ModalUser.js';
import {FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar} from 'react-icons/fa';

class RolesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      modalHeader: '',
      modalFooter: '',
      action: '',
      disabled: '',
      showHide: '',
      option:0,
      position: 0,      
    };    
  }

  openUser = (option, pos, rolId) => {  
    if(option === 1){
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Registrar Usuario',
        modalFooter:'Guardar',
        disabled: false,
        showHide: 'show',
        position: 0,        
      })
    }else if(option === 2){
      /*this.props.LoadRolIdFunction(rolId);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Usuario',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',
        position: pos,        
      })*/
    }else if(option === 3){
      /*this.props.LoadRolIdFunction(rolId);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Rol',
        modalFooter:'Editar',
        disabled: false,
        showHide: 'show',
        position: pos,        
      })*/
    }  
  }  

  valorCloseModalRoles = (valor) => {            
    this.setState({
        modal: valor,          
    });                    
  } 

  render() {
     return (
      <div className="container">
        <ModalUser 
          option = {this.state.option}
          modal = {this.state.modal}
          modalHeader = {this.state.modalHeader}
          modalFooter = {this.state.modalFooter}
          disabled = {this.state.disabled}
          showHide = {this.state.showHide}
          modules = {this.props.modules}         
          permits = {this.props.permits}  
          totalBranchOffices = {this.props.totalBranchOffices}
          arrayBranchOffices = {this.props.arrayBranchOffices}
          roles = {this.props.roles}     
          valorCloseModalRoles={this.valorCloseModalRoles}     
          saveRolAction = {this.props.saveRolAction}  
          LoadRolIdFunction = {this.props.LoadRolIdFunction}
        />
        <Button color="success" onClick={() => { this.openUser(1); }}>Agregar</Button>
        <br />
        <br />
        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th className="text-left">Nro</th>
                  <th className="text-left">Usuario</th>
                  <th className="text-left">Acciones</th>                  
                </tr>
              </thead>
              <tbody>
                {this.props.users? this.props.users.map((user, i) => {
                return (
                  <tr key={i} className="text-left">
                    <td>{ i + 1 }</td>
                    <td>{ user.email }</td>
                    <td>
                      <div  className="float-left" >
                        <a title="Ver Usuario" className=""  onClick={() => { this.openUser(2, i, user._id); }}><FaSearch /> </a>
                        &nbsp;&nbsp;                        
                        <a title="Editar Usuario" className=""  onClick={() => { this.openUser(3, i, user._id); }}><FaUserEdit /> </a>
                      </div>
                    </td>  
                  </tr>
                );
               })
                :
                  null
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default RolesList;
