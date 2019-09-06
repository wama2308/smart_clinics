import React from "react";
import { Table, Button, FormGroup, Input, Label } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import "./Commissions.css";

class ListPatientsStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalHeader: '',
      modalFooter: '',
      action: '',
      disabled: '',
      showHide: '',
      option: 0,
      position: 0,
      id: '',
      sucursal_id_now: '',
      searchService:'',
      page: 0,
      rowsPerPage: 10,      
    };
  }

  componentDidMount() { }

 

  componentWillReceiveProps = props => {
    
  };

  deleteRegister = (key) => {
    const message = {
      title: "Eliminar registro",
      info: "¿Esta seguro que desea eliminar este registro?"
    };
    this.props.confirm(message, res => {
        if (res) {            
            this.props.removerRegisterFunction(key);
        }
    });
  };
 
  render() {
    return (
      <span>
        <div>                         
            <Table hover responsive borderless>    
                {
                    this.props.typeStaff &&
                    this.props.typeStaff.value === "5d1776e3b0d4a50b23936712" &&
                    <thead className="thead-light">
                        <tr>
                            <th className="text-left">Nro</th>
                            <th className="text-left">DNI</th>
                            <th className="text-left">Pacient/Cliente</th>                                      
                            <th className="text-left">Acciones</th>                                      
                        </tr>
                    </thead>
                }
                {
                    this.props.typeStaff &&
                    this.props.typeStaff.value === "5d1776e3b0d4a50b23936710" &&
                    <thead className="thead-light">
                        <tr>
                            <th className="text-left">Nro</th>
                            <th className="text-left">Centro Medico</th>
                            <th className="text-left">Sucursal</th>                                      
                            <th className="text-left">Acciones</th>                                      
                        </tr>
                    </thead>
                }
                {
                    this.props.typeStaff &&
                    this.props.typeStaff.value === "5d1776e3b0d4a50b23936711" &&
                    <thead className="thead-light">
                        <tr>
                            <th className="text-left">Nro</th>
                            <th className="text-left">Sucursal</th>
                            <th className="text-left">Personal/Profesional Interno</th>                                      
                            <th className="text-left">Acciones</th>                                      
                        </tr>
                    </thead>
                }
                <tbody>
                    {
                        this.props.data ? this.props.data.map((data, i) => {

                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td className="hide">{data.field_1}</td>
                                    <td>{data.field_2}</td>
                                    <td>{data.field_3}</td>
                                    <td>
                                        <div  className="float-left" >
                                            <IconButton 
                                                aria-label="Delete" 
                                                disabled={this.props.option === 2 ? true : false} 
                                                title="Eliminar Producto" 
                                                className="iconButtons" 
                                                onClick={() => { this.deleteRegister(i); }}>
                                                <Delete className="iconTable" />
                                            </IconButton>
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
      </span>    
    );
  }
}

export default ListPatientsStaff;