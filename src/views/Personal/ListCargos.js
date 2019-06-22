import React from "react";
import { Table, Button } from "reactstrap";
import ModalCargos from './ModalCargos.js';
import IconButton from "@material-ui/core/IconButton";
import { Edit, Visibility, Delete } from "@material-ui/icons";
import { GetDisabledPermits } from "../../core/utils";

class ListCargos extends React.Component {
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

  openModal = (option, pos, cargoId, label, description) => {  
    if(option === 1){
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Registrar Cargo',
        modalFooter:'Guardar',
        disabled: false,
        showHide: 'show',    
        cargoId: '',     
        cargo: '',
        descripcion: ''                      
      })
    }else if(option === 2){
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Cargo',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',    
        cargo: label,
        descripcion: description         
      })
    }else if(option === 3){
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Cargo',
        modalFooter:'Editar',
        disabled: false,
        showHide: 'show',
        cargoId: cargoId,     
        cargo: label,
        descripcion: description            
      })
    }  
  }  

  deleteCargo = (id) => {  
    const message = {
      title: "Eliminar Cargo",
      info: "¿Esta seguro que desea eliminar este cargo?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.disabledPositionAction(id);
      }
    });    
  }   

  valorCloseModal = (valor) => {            
    this.setState({
        modal: valor,          
    });                    
  } 

  render() { 
     const createDisabled = GetDisabledPermits(this.props.permitsCargos, "Create")
     const updateDisabled = GetDisabledPermits(this.props.permitsCargos, "Update")
     const deleteDisabled = GetDisabledPermits(this.props.permitsCargos, "Delete")
     return (
      <div>
       <ModalCargos 
          option = {this.state.option}
          modal = {this.state.modal}
          modalHeader = {this.state.modalHeader}
          modalFooter = {this.state.modalFooter}
          disabled = {this.state.disabled}
          showHide = {this.state.showHide}
          cargo={this.state.cargo}
          descripcion={this.state.descripcion}
          cargoId={this.state.cargoId}
          valorCloseModal={this.valorCloseModal}  
        />        
        <Button color="success" disabled={createDisabled} onClick={() => { this.openModal(1); }}>Agregar Cargos</Button>
        <br />
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
             {this.props.cargos? this.props.cargos.map((cargo, i) => {
              return (
                <tr key={i} className="text-left">
                  <td>{ i + 1 }</td>
                  <td>{ cargo.label }</td>
                  <td>
                    <div className="float-left" >
                      <IconButton aria-label="Delete" title="Ver Cargo" className="iconButtons" onClick={() => { this.openModal(2, i, cargo.value, cargo.label, cargo.description); }}><Visibility className="iconTable" /></IconButton>
                      <IconButton aria-label="Delete" disabled={updateDisabled} title="Editar Cargo" className="iconButtons" onClick={() => { this.openModal(3, i, cargo.value, cargo.label, cargo.description); }}><Edit className="iconTable" /></IconButton>                        
                      <IconButton aria-label="Delete" disabled={deleteDisabled} title="Eliminar Cargo" className="iconButtons" onClick={() => { this.deleteCargo(cargo.value); }}><Delete className="iconTable" /></IconButton>                        
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
export default ListCargos;

