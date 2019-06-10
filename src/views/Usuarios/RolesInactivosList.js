import React from "react";
import { Table, Button } from "reactstrap";
import ModalRoles from './ModalRoles.js';
import IconButton from "@material-ui/core/IconButton";
import { HowToReg } from "@material-ui/icons";

class RolesInactivosList extends React.Component {
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

  componentDidMount(){}

  activateRoles = (rolId) => {  
    const message = {
      title: "Activar Rol",
      info: "¿Esta seguro que desea activar este rol?"
    };
    this.props.confirmDeleteUser(message, res => {
      if (res) {
        this.props.enabledRolAction(rolId);
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
      <div>        
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
                      <IconButton aria-label="Delete" title="Activar Rol" className="iconButtons" onClick={() => { this.activateRoles(rol._id); }}><HowToReg className="iconTable" /></IconButton>
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

export default RolesInactivosList;
