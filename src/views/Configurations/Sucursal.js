import React from "react";
import { Button, TabPane } from "reactstrap";
import "./loading.css";
import ModalSucursal from "./modalcomponen";
import { Table } from "reactstrap";
import { FaSearch, FaUserEdit, FaMinusCircle } from "react-icons/fa";
import jstz from "jstz";
import IconButton from "@material-ui/core/IconButton";
import { GetDisabledPermits } from '../../core/utils'
import { Delete, Edit, Visibility } from "@material-ui/icons";
import Pagination from '../../components/Pagination';

class Sucursales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      dataEdit: null,
      disabled: false,
      page: 0,
      rowsPerPage: 10,
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

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const disabled = GetDisabledPermits(this.props.medicalPermits, "Create")
    const updateDisabled = GetDisabledPermits(this.props.medicalPermits, "Update")
    const deleteDisabled = GetDisabledPermits(this.props.medicalPermits, "Delete")
    const data = [
      { label: "Sucursal" },
      { label: "Codigo" },
      { label: "Pais" },
      { label: "Provincia" },
      { label: "Acciones" }
    ];

    const { rowsPerPage, page } = this.state;
    const ArraySucursales = [];

    this.props.sucursales.map((item, key) => {
      ArraySucursales.push({
        ...item, number: key
      })
    })
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
        <div>
          <div>
            <p className="text-muted">
              Ajuste la informacion de las sucursales de su Centro Medico
            </p>
          </div>
          <div className="App">
            <Button color="success" disabled={disabled} onClick={() => this.add()}>
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
                ? ArraySucursales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                  if (item.active) {
                    return (
                      <tr key={item.number}>
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
                              disabled={updateDisabled}
                              className="iconButtons"
                              onClick={() => {
                                this.modaledit(item, item.number);
                              }}
                            >
                              <Edit className="iconTable" />
                            </IconButton>

                            <IconButton
                              className="iconButtons"
                              aria-label="Delete"
                              disabled={deleteDisabled}
                              onClick={() => {
                                this.delete(item.number);
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
          <div style={{ 'display': "flex", 'justify-content': "flex-end" }}>
            <Pagination contador={this.props.sucursales}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              handleChangePage={this.handleChangePage} />
          </div>
        </div>
      </div>
    );
  }
}

export default Sucursales;
