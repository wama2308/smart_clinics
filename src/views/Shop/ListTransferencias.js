import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility, SwapHoriz } from "@material-ui/icons";
import ModalShop from './ModalShop.js';
import ModalTransferencias from './ModalTransferencias.js';
import { number_format } from "../../core/utils";

class ListTransferencias extends React.Component {
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
    if(option === 5){
      this.props.queryOneTransferFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Transferencia',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',                
      })
    }else if(option === 6){
      this.props.queryOneTransferFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Transferencia',
        modalFooter:'Editar',
        disabled: false,
        showHide: 'show',
        position: pos,        
        transfer_id:id,
        status: status       
      })
    }  
  }  

  deleteRegister = (id, status) => {      
    const message = {
      title: "Eliminar Registro",
      info: "¿Esta seguro que desea eliminar este registro?"
    };
    this.props.confirm(message, res => {
      if (res) {
        if(status === "Pendiente" || status === "Rechazada"){
          this.props.disableTransferAction(id);
        }else{
          this.props.alert("warning", "¡La transferencia no puede ser eliminada porque ya fue aceptada!");
        }        
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
          (this.state.option === 5 || this.state.option === 6) &&
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
                <th className="text-left">Receptor</th>                  
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
                  <td>{ data.receiver }</td>
                  <td>{ data.status }</td>
                  <td style={{'minWidth':"205px"}}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete" title="Ver Transferencia" className="iconButtons" onClick={() => { this.openModal(5, i, data._id, data.status); }}><Visibility className="iconTable" /></IconButton>
                      <IconButton aria-label="Delete" title="Editar Transferencia" className="iconButtons" onClick={() => { this.openModal(6, i, data._id, data.status); }}><Edit className="iconTable" /></IconButton>                        
                      <IconButton aria-label="Delete" title="Eliminar Transferencia" className="iconButtons" onClick={() => { this.deleteRegister(data._id, data.status); }}><Delete className="iconTable" /></IconButton>                      
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

export default ListTransferencias;