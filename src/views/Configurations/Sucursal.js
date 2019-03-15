import React from "react";
import { Button, TabPane } from "reactstrap";
import "./loading.css";
import ModalSucursal from "./modalcomponen";
import { Table } from "reactstrap";
import { FaSearch, FaUserEdit, FaMinusCircle } from "react-icons/fa";

class Sucursales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }

  closeModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  render() {
    const data = [
      { label: "Sucursal" },
      {
        label: "Codigo"
      },
      {
        label: "Pais"
      },
      {
        label: "Provincia"
      },
      {
        label: "Acciones"
      }
    ];
    return (
      <div>
        <ModalSucursal open={this.state.openModal} close={this.closeModal}/>
        <div className="container">
          <div className="">
            <p className="text-muted">
              Ajuste la informacion de las sucursales de su Centro Medico
            </p>
          </div>
          <div className="App">
            <Button color="success" onClick={()=>{
              this.setState({openModal:true})
            }}>
              Agregar Sucursal
            </Button>
            {}
          </div>
          <br />
          <Table hover responsive borderless>
            <thead className="thead-light">
              <tr>
                {data.map((data, key) => {
                  return <th key={key}>{data.label}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.sucursales
                ? this.props.sucursales.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.code}</td>
                        <td>{item.country}</td>
                        <td>{item.province}</td>
                        <td>
                          <div className="float-left">
                            <a
                              title="edit"
                              className="icon"
                              onClick={() => {
                                this.view(item);
                              }}
                            >
                              <FaSearch />
                            </a>
                            <a
                              title="edit"
                              className="icon"
                              onClick={() => {
                                this.modaledit(item);
                              }}
                            >
                              <FaUserEdit />
                            </a>
                            <a
                              className="text-danger icon"
                              onClick={() => {
                                this.modalConfirm(item);
                              }}
                            >
                              <FaMinusCircle />{" "}
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Sucursales;
