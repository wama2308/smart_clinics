import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import ModalProduct from './ModalProduct.js';
import { number_format } from "../../core/utils";

class ListProduct extends React.Component {
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
      productoId: '',      
    };    
  }

  componentDidMount(){}  

  openModal = (option, pos, id) => {  
    if(option === 1){
      this.props.queryOneSupplieWithLotFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Producto',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',                
      })
    }else if(option === 2){
      this.props.queryOneSupplieWithLotFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Producto',
        modalFooter:'Editar',
        disabled: false,
        showHide: 'show',
        position: pos,        
        productoId:id       
      })
    }  
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
        <ModalProduct
          option = {this.state.option}
          modal = {this.state.modal}
          modalHeader = {this.state.modalHeader}
          modalFooter = {this.state.modalFooter}
          disabled = {this.state.disabled}
          showHide = {this.state.showHide}             
          productoId = {this.state.productoId}             
          valorCloseModal = {this.valorCloseModal}          
        />        
        <br />         
          <Table hover responsive borderless>
            <thead className="thead-light">
              <tr>
                <th className="text-left">Nro</th>
                <th className="text-left">Producto</th>
                <th className="text-left">Codigo</th>
                <th className="text-left">Tipo</th>                                    
                <th className="text-left" style={{'minWidth':"105px"}}>Acciones</th>                  
              </tr>
            </thead>
            <tbody>
             {this.props.allProducts? this.props.allProducts.map((product, i) => {
              return (
                <tr key={i} className="text-left">
                  <td>{ i + 1 }</td>
                  <td>{ product.name }</td>
                  <td>{ product.code }</td>
                  <td>{ product.type }</td>
                  <td style={{'minWidth':"205px"}}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete" title="Ver Producto" className="iconButtons" onClick={() => { this.openModal(1, i, product._id); }}><Visibility className="iconTable" /></IconButton>
                      <IconButton aria-label="Delete" title="Editar Producto/Lote" className="iconButtons" onClick={() => { this.openModal(2, i, product._id); }}><Edit className="iconTable" /></IconButton>                        
                      {/*<IconButton aria-label="Delete" title="Producto Defectuoso/vencido" className="iconButtons" ><Delete className="iconTable" /></IconButton>*/}
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

export default ListProduct;