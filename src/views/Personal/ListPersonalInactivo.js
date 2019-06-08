import React from "react";
import { Table, Button } from "reactstrap";
import ModalPersonal from './ModalPersonal.js';
import IconButton from "@material-ui/core/IconButton";
import { HowToReg } from "@material-ui/icons";

class ListPersonalInactivo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      modalHeader: '',
      modalFooter: '',
      action: '',
      disabled: false,
      showHide: '',
      isClearable: false,
      option:0,
      position: 0, 
      id:''     
    };    
  }

  componentDidMount(){}  

  activarPersonal = (id) => {  
    const message = {
      title: "Activar Personal",
      info: "¿Esta seguro que desea activar este personal?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enabledInternalStaffAction(id);
      }
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
                <th className="text-left" style={{'minWidth':"110px"}}>DNI</th>
                <th className="text-left">Personal</th>
                <th className="text-left">Cargo</th>
                <th className="text-left">Email</th>
                <th className="text-left">Telefonos</th>                                                      
                <th className="text-left" style={{'minWidth':"155px"}}>Acciones</th>                  
              </tr>
            </thead>
            <tbody>
             {this.props.personalInactivo? this.props.personalInactivo.map((personal, i) => {
              return (
                <tr key={i} className="text-left">
                  <td>{ i + 1 }</td>
                  <td style={{'minWidth':"110px"}}>{personal.type_identity} - {personal.dni}</td>
                  <td>{personal.names} {personal.surnames}</td>
                  <td>{personal.positions}</td>
                  <td>{personal.email[0]}</td>
                  <td>{personal.phone[0]}</td>
                  <td style={{'minWidth':"155px"}}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete" title="Activar Personal" className="iconButtons" onClick={() => { this.activarPersonal(personal._id); }}><HowToReg className="iconTable" /></IconButton>
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

export default ListPersonalInactivo;