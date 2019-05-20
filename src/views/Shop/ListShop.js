import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import ModalShop from './ModalShop.js';
import {listShop} from './datosShop.js';
import { number_format } from "../../core/utils";

class ListShop extends React.Component {
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
      userId: '',      
    };    
  }

  componentDidMount(){}  

  openModal = (option, pos, id) => {  
    if(option === 1){
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Registrar Compras-Productos',
        modalFooter:'Guardar',
        disabled: false,
        showHide: 'show',       
        isClearable: true,  
      })
    }else if(option === 2){
      this.props.LoadDistributorIdFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Compras-Productos',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',                
      })
    }else if(option === 3){
      this.props.LoadDistributorIdFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Compras-Productos',
        modalFooter:'Editar',
        disabled: false,
        showHide: 'show',
        position: pos,        
        userId:id       
      })
    }  
  }  

  deleteProveedor = (proveedorId) => {  
    const message = {
      title: "Eliminar Registro",
      info: "¿Esta seguro que desea eliminar este registro?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.DeleteDistributorAction(proveedorId);
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
      <div className="container">
        <ModalShop 
          option = {this.state.option}
          modal = {this.state.modal}
          modalHeader = {this.state.modalHeader}
          modalFooter = {this.state.modalFooter}
          disabled = {this.state.disabled}
          showHide = {this.state.showHide}             
          isClearable = {this.state.isClearable}             
          branchOfficces={this.props.branchOfficces}                       
          valorCloseModal = {this.valorCloseModal}          
        />
        <Button color="success" onClick={() => { this.openModal(1); }}>Agregar</Button>
        <br />
        <br />
        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th className="text-left">Nro</th>
                  <th className="text-left">Compra</th>
                  <th className="text-left">Control</th>
                  <th className="text-left">Tipo</th>                  
                  <th className="text-left">SubTotal</th>                  
                  <th className="text-left">IGV</th>                  
                  <th className="text-left">Total</th>                  
                  <th className="text-left" style={{'minWidth':"105px"}}>Acciones</th>                  
                </tr>
              </thead>
              <tbody>
               {listShop? listShop.map((shop, i) => {
                return (
                  <tr key={i} className="text-left">
                    <td>{ i + 1 }</td>
                    <td>{ shop.nro_compra }</td>
                    <td>{ shop.nro_control }</td>
                    <td>{ shop.type }</td>
                    <td>{ number_format(shop.subtotal, 2) }</td>
                    <td>{ number_format(shop.igv, 2) }</td>
                    <td>{ number_format(shop.total, 2) }</td>
                    <td style={{'minWidth':"205px"}}>
                      <div className="float-left" >
                        {/*<IconButton aria-label="Delete" title="Ver Rol" className="iconButtons" onClick={() => { this.openModal(2, i, distributor.id); }}><Visibility className="iconTable" /></IconButton>
                        <IconButton aria-label="Delete" title="Editar Rol" className="iconButtons" onClick={() => { this.openModal(3, i, distributor.id); }}><Edit className="iconTable" /></IconButton>                        
                        <IconButton aria-label="Delete" title="Editar Rol" className="iconButtons" onClick={() => { this.deleteProveedor(distributor.id); }}><Delete className="iconTable" /></IconButton>*/}
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

export default ListShop;