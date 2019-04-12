import React from "react";
import { Table , Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import PreRegistro from './PreRegistro/PreRegistro'

class BodyExternal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      openModal:false
    }
  }
  ViewModal =()=>{
    this.setState({openModal:true})
  }

  closeModal=()=>{
    this.setState({openModal: false})
  }

  delete=(id)=>{
    const obj = {
      title:'Eliminar Personal Externo',
      info:'Esta seguro que desea Eliminar Personal externo'
    }
    this.props.deleteData(obj , (res)=>{
      console.log(res)
    })
  }

  render() {
    const data = [
      {
        label: "Nombre"
      },
      {
        label: "Estatus"
      },
      { label: "Centro medico" },
      { label: "pais" },
      { label: "Provincia" },
      { label: "Acciones" }
    ];
    return (
      <div>
        <PreRegistro open={this.state.openModal} close={this.closeModal} />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              {data.map((data, key) => {
                return <th key={key}>{data.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.type
              ? this.props.type.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.nombre}</td>
                      <td>{item.status}</td>
                      <td>{item.ncm}</td>
                      <td>{item.pais}</td>
                      <td>{item.provincia}</td>
                      <td>
                        <div className="float-left">
                          <IconButton
                            className="iconButtons"
                            onClick={() => {
                              this.ViewModal();
                            }}
                          >
                            <Visibility className="iconTable" />
                          </IconButton>
                          <IconButton
                            className="iconButtons"
                            onClick={() => {
                               this.delete(i);
                            }}
                          >
                                <Delete className="iconTable" />
                              </IconButton>

                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default BodyExternal;
