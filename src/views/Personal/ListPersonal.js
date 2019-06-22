import React from "react";
import { Table, Button } from "reactstrap";
import ModalPersonal from './ModalPersonal.js';
import IconButton from "@material-ui/core/IconButton";
import { GetDisabledPermits } from "../../core/utils";
import { Delete, Edit, Visibility } from "@material-ui/icons";

class ListPersonal extends React.Component {
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

  openModal = (option, pos, id) => {  
    if(option === 1){
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Registrar Personal',
        modalFooter:'Guardar',
        disabled: false,
        showHide: 'show', 
        isClearable: true,           
      })
    }else if(option === 2){
      this.props.LoadPersonalIdFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Personal',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',  
        isClearable: false,                     
      })
    }else if(option === 3){
      this.props.LoadPersonalIdFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Personal',
        modalFooter:'Editar',
        disabled: false,
        showHide: 'show',        
        isClearable: true,           
        id: id            
      })
    }  
  } 

  deletePersonal = (id) => {  
    const message = {
      title: "Eliminar Personal",
      info: "¿Esta seguro que desea eliminar este personal?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.DeletePersonalInternoAction(id);
      }
    });    
  }  

  valorCloseModal = (valor) => {            
    this.setState({
        modal: valor,   
        option: 0       
    });                    
  } 

  render() {
     const disabledCreate =  GetDisabledPermits(this.props.permitsPersonal, "Create")
     const disabledUpdate =  GetDisabledPermits(this.props.permitsPersonal, "Update")
     const disabledDelete =  GetDisabledPermits(this.props.permitsPersonal, "Delete")
     return (
      <div>
       <ModalPersonal 
          option = {this.state.option}
          modal = {this.state.modal}
          modalHeader = {this.state.modalHeader}
          modalFooter = {this.state.modalFooter}
          disabled = {this.state.disabled}
          showHide = {this.state.showHide}       
          isClearable = {this.state.isClearable}                                 
          id = {this.state.id}                                 
          userId = {this.props.userId}                                 
          userEmail = {this.props.userEmail}                                 
          modules = {this.props.modules}                                 
          permits = {this.props.permits}                                 
          totalBranchOffices = {this.props.totalBranchOffices}                                 
          arrayBranchOffices = {this.props.arrayBranchOffices}                                 
          roles = {this.props.roles}                                 
          valorCloseModal={this.valorCloseModal}  
        />
        <Button color="success" disabled={disabledCreate} onClick={() => { this.openModal(1); }}>Agregar Personal</Button>
        <br />
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
             {this.props.personal? this.props.personal.map((personal, i) => {
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
                      <IconButton aria-label="Delete" title="Ver Personal"  className="iconButtons" onClick={() => { this.openModal(2, i, personal._id); }}><Visibility className="iconTable" /></IconButton>
                      <IconButton aria-label="Delete" title="Editar Personal" disabled={disabledUpdate} className="iconButtons" onClick={() => { this.openModal(3, i, personal._id); }}><Edit className="iconTable" /></IconButton>                        
                      <IconButton aria-label="Delete" title="Eliminar Personal" disabled={disabledDelete} className="iconButtons" onClick={() => { this.deletePersonal(personal._id); }}><Delete className="iconTable" /></IconButton>                        
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

export default ListPersonal;