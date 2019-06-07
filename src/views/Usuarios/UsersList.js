import React from "react";
import { Table, Button } from "reactstrap";
import ModalUser from './ModalUser.js';
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      modalHeader: '',
      modalFooter: '',
      action: '',
      disabled: '',
      disabledEmail: '',
      showHide: '',
      option:0,
      position: 0,
      userIdEdit: 0      
    };    
  }

  openUser = (option, pos, userId) => {  
    if(option === 1){
      if(this.props.totalBranchOffices > 0){                
        this.setState({
          modal:true,
          option:option,
          modalHeader:'Registrar Usuario',
          modalFooter:'Guardar',
          disabled: false,
          disabledEmail: false,
          showHide: 'show',
          position: 0,        
        });      
      }else{
          this.props.alert("warning", "¡Antes de registrar un usuario debe registrar una sucursal!");
      }      
    }else if(option === 2){
      this.props.LoadIdUsersNoMasterFunction(userId);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Usuario',
        modalFooter:'Guardar',
        disabled: true,
        disabledEmail: true,
        showHide: 'hide',
        position: pos,        
      })
    }else if(option === 3){
      this.props.LoadIdUsersNoMasterFunction(userId);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Usuario',
        modalFooter:'Editar',
        disabled: false,
        disabledEmail: true,
        showHide: 'show',
        userIdEdit: userId,        
      })
    }  
  } 

  deleteUser = (userId) => {  
    const message = {
      title: "Inactivar Usuario",
      info: "¿Esta seguro que desea inactivar este usuario?"
    };
    this.props.confirmDeleteUser(message, res => {
      if (res) {
        this.props.DeleteUserNoMasterAction(userId);
      }
    });    
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
          disabledEmail = {this.state.disabledEmail}
          showHide = {this.state.showHide}
          modules = {this.props.modules}         
          permits = {this.props.permits}  
          totalBranchOffices = {this.props.totalBranchOffices}
          arrayBranchOffices = {this.props.arrayBranchOffices}
          roles = {this.props.roles}     
          valorCloseModalRoles={this.valorCloseModalRoles}     
          saveRolAction = {this.props.saveRolAction}  
          LoadRolIdFunction = {this.props.LoadRolIdFunction}
          saveUserNoMasterAction = {this.props.saveUserNoMasterAction}          
          editUserNoMasterAction = {this.props.editUserNoMasterAction}          
          addSucursalFunction = {this.props.addSucursalFunction}          
          deleteSucursalFunction = {this.props.deleteSucursalFunction}          
          userIdEdit = {this.state.userIdEdit}               
        />     
        
        <Button color="success" onClick={() => { this.openUser(1); }}>Agregar Usuario</Button>
        <br />
        <br />
        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th className="text-left">Nro</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Nombres y Apellidos</th>                  
                  <th className="text-left">Nombre de Usuario</th>                  
                  <th className="text-left" style={{'minWidth':"155px"}}>Acciones</th>                  
                </tr>
              </thead>
              <tbody>
                {this.props.users? this.props.users.map((user, i) => {
                return (
                  <tr key={i} className="text-left">
                    <td>{ i + 1 }</td>
                    <td>{ user.email }</td>
                    <td>{ user.names } { user.surnames }</td>
                    <td>{ user.username }</td>                    
                    <td style={{'minWidth':"155px"}}>
                      <div style={{'height':"15px"}} className={"text-left"} >
                        <IconButton aria-label="Delete" title="Ver Usuario" className="iconButtons" onClick={() => { this.openUser(2, i, user.id); }}><Visibility className="iconTable" /></IconButton>
                        <IconButton aria-label="Delete" title="Editar Usuario" className="iconButtons" onClick={() => { this.openUser(3, i, user.id); }}><Edit className="iconTable" /></IconButton>
                        <IconButton aria-label="Delete" title="Inactivar Usuario" className="iconButtons" onClick={() => { this.deleteUser(user.id); }}><Delete className="iconTable" /></IconButton>
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

export default UsersList;
