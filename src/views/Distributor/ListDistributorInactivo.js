import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { HowToReg } from "@material-ui/icons";
import ModalDistributor from './ModalDistributor.js';

class ListDistributorInactivo extends React.Component {
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
      userId: '',      
    };    
  }

  componentDidMount(){}  

  activarProveedor = (proveedorId) => {  
    const message = {
      title: "Activar Proveedor",
      info: "¿Esta seguro que desea activar este Proveedor?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enableProviderFunction(proveedorId);
      }
    });    
  } 

  valorCloseModal = (valor) => {            
    this.setState({
        modal: valor,          
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
                <th className="text-left" style={{'minWidth':"105px"}}>DNI</th>
                <th className="text-left">Proveedor</th>
                <th className="text-left">Email</th>
                <th className="text-left">Telefono</th>                                    
                <th className="text-left" style={{'minWidth':"205px"}}>Acciones</th>                  
              </tr>
            </thead>
            <tbody>
             {this.props.listDistributor? this.props.listDistributor.map((distributor, i) => {
              return (
                <tr key={i} className="text-left">
                  <td>{ i + 1 }</td>
                  <td style={{'minWidth':"105px"}}>{ distributor.typeIdentity }-{distributor.tin}</td>
                  <td>{ distributor.name }</td>
                  <td>{ distributor.email[0] }</td>
                  <td>{ distributor.phone[0] }</td>
                  <td style={{'minWidth':"205px"}}>
                    <div className="float-left" >                      
                      <IconButton aria-label="Delete" title="Activar Proveedor" className="iconButtons" onClick={() => { this.activarProveedor(distributor.id); }}><HowToReg className="iconTable" /></IconButton>                        
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

export default ListDistributorInactivo;
