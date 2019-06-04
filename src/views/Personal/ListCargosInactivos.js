import React from "react";
import { Table, Button } from "reactstrap";
import ModalCargos from './ModalCargos.js';
import IconButton from "@material-ui/core/IconButton";
import { HowToReg } from "@material-ui/icons";

class ListCargosInactivos extends React.Component {
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
      cargo: '',
      descripcion: '',
      cargoId: ''     
    };    
  }

  componentDidMount(){}

  activarCargo = (id) => {  
    const message = {
      title: "Activar Cargo",
      info: "¿Esta seguro que desea activar este cargo?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enabledPositionAction(id);
      }
    });    
  }   

  render() {
     return (
      <div className="container">       
        <br />        
          <Table hover responsive borderless>
            <thead className="thead-light">
              <tr>
                <th className="text-left">Nro</th>
                <th className="text-left">Cargo</th>
                <th className="text-left">Acciones</th>                  
              </tr>
            </thead>
            <tbody>
            {
              this.props.cargosInactivos? this.props.cargosInactivos.map((cargo, i) => {
              return (
                <tr key={i} className="text-left">
                  <td>{ i + 1 }</td>
                  <td>{ cargo.label }</td>
                  <td>
                    <div className="float-left" >
                      <IconButton aria-label="Delete" title="Activar Cargo" className="iconButtons" onClick={() => { this.activarCargo(cargo.value); }}><HowToReg className="iconTable" /></IconButton>                        
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
export default ListCargosInactivos;

