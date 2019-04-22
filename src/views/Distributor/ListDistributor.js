import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import ModalDistributor from './ModalDistributor.js';

class ListDistributor extends React.Component {
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

  openModal = (option, pos, id) => {  
    if(option === 1){
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Registrar Proveedor',
        modalFooter:'Guardar',
        disabled: false,
        showHide: 'show',         
      })
    }else if(option === 2){
      this.props.LoadDistributorIdFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Proveedor',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',                
      })
    }else if(option === 3){
      this.props.LoadDistributorIdFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Proveedor',
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
      title: "Eliminar Proveedor",
      info: "¿Esta seguro que desea eliminar este Proveedor?"
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
    });                    
  } 

  render() {
     return (
      <div className="container">
        <ModalDistributor 
          option = {this.state.option}
          modal = {this.state.modal}
          modalHeader = {this.state.modalHeader}
          modalFooter = {this.state.modalFooter}
          disabled = {this.state.disabled}
          showHide = {this.state.showHide}   
          userId = {this.state.userId}        
                       
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
                  <th className="text-left">DNI</th>
                  <th className="text-left">Proveedor</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Telefono</th>                                    
                  <th className="text-left">Acciones</th>                  
                </tr>
              </thead>
              <tbody>
               {this.props.listDistributor? this.props.listDistributor.map((distributor, i) => {
                return (
                  <tr key={i} className="text-left">
                    <td>{ i + 1 }</td>
                    <td>{ distributor.typeIdentity } - {distributor.tin}</td>
                    <td>{ distributor.name }</td>
                    <td>{ distributor.email[0] }</td>
                    <td>{ distributor.phone[0] }</td>
                    <td>
                      <div  className="float-left" >
                        <IconButton aria-label="Delete" title="Ver Rol" className="iconButtons" onClick={() => { this.openModal(2, i, distributor.id); }}><Visibility className="iconTable" /></IconButton>
                        <IconButton aria-label="Delete" title="Editar Rol" className="iconButtons" onClick={() => { this.openModal(3, i, distributor.id); }}><Edit className="iconTable" /></IconButton>                        
                        <IconButton aria-label="Delete" title="Editar Rol" className="iconButtons" onClick={() => { this.deleteProveedor(distributor.id); }}><Delete className="iconTable" /></IconButton>                        
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

export default ListDistributor;
