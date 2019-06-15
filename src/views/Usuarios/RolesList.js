import React from "react";
import { Table, Button } from "reactstrap";
import ModalRoles from './ModalRoles.js';
import IconButton from "@material-ui/core/IconButton";
import { Edit, Visibility, Delete } from "@material-ui/icons";

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
      id: '',
    };
  }

  componentDidMount(){}

  openRoles = (option, pos, rolId) => {
    if(option === 1){
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Registrar Rol',
        modalFooter:'Guardar',
        disabled: false,
        showHide: 'show',
      })
    }else if(option === 2){
      this.props.LoadRolIdFunction(rolId);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Rol',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',
      })
    }else if(option === 3){
      this.props.LoadRolIdFunction(rolId);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Rol',
        modalFooter:'Editar',
        disabled: false,
        showHide: 'show',
        position: pos,
        id: rolId,
      })
    }
  }

  deleteRoles = (rolId) => {  
    const message = {
      title: "Inactivar Rol",
      info: "¿Esta seguro que desea inactivar este rol?"
    };
    this.props.confirmDeleteUser(message, res => {
      if (res) {
        this.props.disabledRolAction(rolId);
      }
    });    
  } 

  valorCloseModalRoles = (valor) => {
    this.setState({
        modal: valor,
        option: 0
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
            saveRolAction = {this.props.saveRolAction}
            editRolAction = {this.props.editRolAction}
            id = {this.state.id}
            valorCloseModalRoles={this.valorCloseModalRoles}
          />
               

        <Button color="success" onClick={() => { this.openRoles(1); }}>Agregar Rol</Button>
        <br />
        <br />        
          <Table hover responsive borderless>
            <thead className="thead-light">
              <tr>
                <th className="text-left">Nro</th>
                <th className="text-left">Rol</th>
                <th className="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
             {this.props.roles? this.props.roles.map((rol, i) => {
              return (
                <tr key={i} className="text-left">
                  <td>{ i + 1 }</td>
                  <td>{ rol.rol }</td>
                  <td>
                    <div className="float-left" >
                      <IconButton aria-label="Delete" title="Ver Rol" className="iconButtons" onClick={() => { this.openRoles(2, i, rol._id); }}><Visibility className="iconTable" /></IconButton>
                      <IconButton aria-label="Delete" title="Editar Rol" className="iconButtons" onClick={() => { this.openRoles(3, i, rol._id); }}><Edit className="iconTable" /></IconButton>
                      <IconButton aria-label="Delete" title="Inactivar Rol" className="iconButtons" onClick={() => { this.deleteRoles(rol._id); }}><Delete className="iconTable" /></IconButton>
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
    );
  }
}

export default RolesList;
