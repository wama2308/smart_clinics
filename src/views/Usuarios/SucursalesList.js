import React from "react";
import { Table, Button } from "reactstrap";
import ModalRoles from './ModalRoles.js';
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";

class SucursalesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };    
  }

  componentDidMount(){}

  openRoles = (option, rolId) => {          
    this.props.LoadRolIdFunction(rolId);
    this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Rol',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',             
    })        
  }

  deleteBranchOffices = key => {
    const message = {
      title: "Eliminar registro",
      info: "¿Esta seguro que desea eliminar este registro?"
    };
    this.props.confirmDeleteBranchOffices(message, res => {
      if (res) {
        this.props.deleteSucursalFunction(key);
      }
    });
  };

  valorCloseModalRoles = (valor) => {            
    this.setState({
        modal: valor,          
    });                    
  } 

  componentWillReceiveProps=(props)=>{
    
  }

  render() {    
    return (
      <div className="">
        <ModalRoles 
          option = {this.state.option}
          modal = {this.state.modal}
          modalHeader = {this.state.modalHeader}
          modalFooter = {this.state.modalFooter}
          disabled = {this.state.disabled}
          showHide = {this.state.showHide}
          modules = {this.props.modules}         
          permits = {this.props.permits}  
          valorCloseModalRoles={this.valorCloseModalRoles}  
        /> 
        {
          this.props.option !== 2 &&
          <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Sucursal</th>
              <th className="text-left">Rol</th>
              <th className="text-left">Permiso-Especial</th>              
              <th className="text-left">Acciones</th>                  
            </tr>
          </thead>
          <tbody>
           {this.props.listSucursales ? this.props.listSucursales.map((list, i) => {
            if(list.moduloMostrar == ""){
              return (
                <tr key={i} className="text-left">
                  <td>{i+1}</td>
                  <td>{list.label}</td>                                                                                                                                                    
                  <td>{list.rol.label}</td>                                                                                                                                                    
                  <td>{list.moduloMostrar}</td>    
                  <td>
                    <div className="float-rigth">
                      <a className="" title="Ver Rol" onClick={() => { this.openRoles(2, list.rol.value); }}>
                        <Visibility className="iconTable" />
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <a className={this.state.disabledLink} title="Eliminar Registro" onClick={() => {this.deleteBranchOffices(i);}}>
                        <Delete className="iconTable" />
                      </a>
                    </div>
                  </td>
                  
              </tr>   
              )    
            }else{
                return (
                    <tr key={i} className="text-left">
                        <td>{i+1}</td>
                        <td>{list.label}</td>                                                                                                                                                    
                        <td>{list.rol.label}</td>                                                                                                                                                    
                        <td>{list.moduloMostrar}</td>                                                                                                                                                                          
                        <td>
                          <div className="float-rigth">                                                                                                        
                            <a className={this.state.disabledLink} title="Eliminar Registro" onClick={() => {this.deleteBranchOffices(i);}}>
                              <Delete className="iconTable" />
                            </a>
                          </div>
                        </td>                        
                    </tr>   
                )
            }
           })
           :
            null
           }            
            </tbody>
          </Table>  
        }
        {
          this.props.option === 2 &&
          <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Sucursal</th>
              <th className="text-left">Rol</th>
              <th className="text-left">Permiso-Especial</th>                                            
            </tr>
          </thead>
          <tbody>
           {this.props.listSucursales ? this.props.listSucursales.map((list, i) => {
            if(list.moduloMostrar == ""){
              return (
                <tr key={i} className="text-left">
                  <td>{i+1}</td>
                  <td>{list.label}</td>                                                                                                                                                    
                  <td>{list.rol.label}</td>                                                                                                                                                    
                  <td>{list.moduloMostrar}</td>    
              </tr>   
              )    
            }else{
                return (
                    <tr key={i} className="text-left">
                        <td>{i+1}</td>
                        <td>{list.label}</td>                                                                                                                                                    
                        <td>{list.rol.label}</td>                                                                                                                                                    
                        <td>{list.moduloMostrar}</td>                                                                                                                                                                                                  
                    </tr>   
                )
            }
           })
           :
            null
           }            
            </tbody>
          </Table>  
        }
              
      </div>
    );
  }
}
export default SucursalesList;
