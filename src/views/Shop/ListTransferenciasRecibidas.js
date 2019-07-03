import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility, SwapHoriz, Done, Clear } from "@material-ui/icons";
import ModalShop from './ModalShop.js';
import ModalTransferencias from './ModalTransferencias.js';
import { number_format } from "../../core/utils";

class ListTransferenciasRecibidas extends React.Component {
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
      isClearable: false,
      transfer_id: '0', 
      status: ''    
    };    
  }

  componentDidMount(){}  

  openModal = (option, pos, id, status) => {  
    if(option === 7){
      this.props.queryOneTransferFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Transferencia',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',                
      })
    }  
  }  

  deleteRegister = (id, status) => {      
    const message = {
      title: "Rechazar Transferencia",
      info: "¿Esta seguro que desea rechazar la transferencia?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.rejectTransferAction(id);
        
      }
    });    
  } 

  aceptarRegister = (id, status) => {      
    const message = {
      title: "Aceptar Transferencia",
      info: "¿Esta seguro que desea aceptar la transferencia?"
    };
    this.props.confirm(message, res => {
      if (res) {        
          this.props.acceptTransferAction(id);        
      }
    });    
  }

  valorCloseModal = (valor) => {            
    this.setState({
        modal: valor,   
        option: 0,       
    });                    
  } 

  render() {
     return (
      <div>
        {
          (this.state.option === 7) &&
          <ModalTransferencias 
            option = {this.state.option}
            modal = {this.state.modal}
            modalHeader = {this.state.modalHeader}
            modalFooter = {this.state.modalFooter}
            disabled = {this.state.disabled}
            showHide = {this.state.showHide}             
            isClearable = {this.state.isClearable}             
            transfer_id = {this.state.transfer_id}       
            status = {this.state.status}      
            branchOfficces={this.props.branchOfficces}                       
            valorCloseModal = {this.valorCloseModal}          
          />
        }
        <br />
          <Table hover responsive borderless>
            <thead className="thead-light">
              <tr>
                <th className="text-left">Nro</th>
                <th className="text-left">Transferencia</th>
                <th className="text-left">Control</th>
                <th className="text-left">SubTotal</th>                  
                <th className="text-left">IGV</th>                  
                <th className="text-left">Total</th>                  
                <th className="text-left">Emisor</th>                  
                <th className="text-left">Estatus</th>                  
                <th className="text-left" style={{'minWidth':"105px"}}>Acciones</th>                  
              </tr>
            </thead>
            <tbody>
             {this.props.data? this.props.data.map((data, i) => {
              return (
                <tr key={i} className="text-left">
                  <td>{ i + 1 }</td>
                  <td>{ data.number_invoice }</td>
                  <td>{ data.number_controll }</td>
                  <td>{ number_format(data.subtotal, 2) }</td>
                  <td>{ number_format(data.igv, 2) }</td>
                  <td>{ number_format(data.total, 2) }</td>
                  <td>{ data.transmitter }</td>
                  <td>{ data.status }</td>
                  <td style={{'minWidth':"205px"}}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete" title="Ver Transferencia" className="iconButtons" onClick={() => { this.openModal(7, i, data._id, data.status); }}><Visibility className="iconTable" /></IconButton>                      
                      {
                        data.status === "Pendiente" &&
                        <span>
                          <IconButton aria-label="Delete" title="Aceptar Transferencia" className="iconButtons" onClick={() => { this.aceptarRegister(data._id, data.status); }}><Done className="iconTable" /></IconButton>                      
                          <IconButton aria-label="Delete" title="Rechazar Transferencia" className="iconButtons" onClick={() => { this.deleteRegister(data._id, data.status); }}><Clear className="iconTable" /></IconButton>                      
                        </span>
                      }                      
                      
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

export default ListTransferenciasRecibidas;