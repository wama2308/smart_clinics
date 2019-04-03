import React from "react";
import { Button, TabPane } from "reactstrap";
import "./loading.css";
import ModalSucursal from "./modalcomponen";
import { Table } from "reactstrap";
import { FaSearch, FaUserEdit, FaMinusCircle } from "react-icons/fa";
import jstz from "jstz";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";

class Sucursales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      dataEdit: null,
      disabled: false
    };
  }

  add = () => {
    this.props.permits
      ? this.setState({ openModal: true })
      : this.props.openSnackbars(
          "error",
          "¡Esta licencia no permite agregar mas sucursales!"
        );
  };

  closeModal = () => {
    this.setState({
      openModal: !this.state.openModal,
      dataEdit: null,
      disabled: false
    });
  };

  view = item => {
    this.setState({
      dataEdit: item,
      openModal: true,
      disabled: true
    });
  };
  delete = key => {
    const message = {
      title: "Eliminar Sucursal",
      info: "¿Esta seguro que desea eliminar esta Sucursal?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.deleteSucursal(key, jstz.determine().name());
      }
    });
  };

  modaledit = (item, key) => {
    this.setState({
      dataEdit: {
        ...item,
        key: key
      },
      openModal: true
    });
  };

  render() {
    const data = [
      { label: "Sucursal" },
      { label: "Codigo" },
      { label: "Pais" },
      { label: "Provincia" },
      { label: "Acciones" }
    ];
    return (
      <div>
        {this.state.openModal && (
          <ModalSucursal
            open={this.state.openModal}
            dataEdit={this.state.dataEdit}
            close={this.closeModal}
            disabled={this.state.disabled}
          />
        )}
        <div className="container">
          <div className="">
            <p className="text-muted">
              Ajuste la informacion de las sucursales de su Centro Medico
            </p>
          </div>
          <div className="App">
            <Button color="success" onClick={() => this.add()}>
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
                    if (item.status) {
                      return (
                        <tr key={i}>
                          <td>{item.name}</td>
                          <td>{item.code}</td>
                          <td>{item.country}</td>
                          <td>{item.province}</td>
                          <td>
                            <div className="float-left">
                              <IconButton
                                aria-label="Delete"
                                className="iconButtons"
                                onClick={() => {
                                  this.view(item);
                                }}
                              >
                                <Visibility className="iconTable" />
                              </IconButton>

                              <IconButton
                                aria-label="Delete"
                                className="iconButtons"
                                onClick={() => {
                                  this.modaledit(item, i);
                                }}
                              >
                                <Edit className="iconTable" />
                              </IconButton>

                              <IconButton
                                className="iconButtons"
                                aria-label="Delete"
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
                    }
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
