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


  render() {
    const data = [
      {
        label: "Nombre"
      },
      {
        label: "Estatus"
      },
      { label: "Centro medico" },
      { label: "Direccion" },
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
                      <td>{item.direccion}</td>
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
