import React from "react";
import { Table, Button } from "reactstrap";
import ModalRoles from "./ModalRoles.js";
import IconButton from "@material-ui/core/IconButton";
import { GetDisabledPermits, getArray } from "../../core/utils";
import { Edit, Visibility, Delete } from "@material-ui/icons";
import Pagination from '../../components/Pagination';
import Search from "../../components/Select";
import '../../components/style.css'

class RolesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalHeader: "",
      modalFooter: "",
      action: "",
      disabled: "",
      showHide: "",
      option: 0,
      position: 0,
      id: "",
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() { }

  openRoles = (option, pos, rolId) => {
    if (option === 1) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: "Registrar Rol",
        modalFooter: "Guardar",
        disabled: false,
        showHide: "show"
      });
    } else if (option === 2) {
      this.props.LoadRolIdFunction(rolId);
      this.setState({
        modal: true,
        option: option,
        modalHeader: "Ver Rol",
        modalFooter: "Guardar",
        disabled: true,
        showHide: "hide"
      });
    } else if (option === 3) {
      this.props.LoadRolIdFunction(rolId);
      this.setState({
        modal: true,
        option: option,
        modalHeader: "Editar Rol",
        modalFooter: "Editar",
        disabled: false,
        showHide: "show",
        position: pos,
        id: rolId
      });
    }
  };

  deleteRoles = rolId => {
    const message = {
      title: "Inactivar Rol",
      info: "¿Esta seguro que desea inactivar este rol?"
    };
    this.props.confirmDeleteUser(message, res => {
      if (res) {
        this.props.disabledRolAction(rolId);
      }
    });
  };

  valorCloseModalRoles = valor => {
    this.setState({
      modal: valor,
      option: 0
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const disabledUpdate = GetDisabledPermits(
      this.props.permitsUsers,
      "Update"
    );
    const disabledCreate = GetDisabledPermits(
      this.props.permitsUsers,
      "Create"
    );
    const disabledDelete = GetDisabledPermits(
      this.props.permitsUsers,
      "Delete"
    );

    const { rowsPerPage, page } = this.state;
    const arrayRoles = getArray(this.props.roles);

    const result = this.props.search
      ? arrayRoles.filter(rol => {
          return (
            rol.rol.toLowerCase().includes(this.props.search.toLowerCase())
          );
        })
      : arrayRoles;

    return (
      <div>
        <ModalRoles
          option={this.state.option}
          modal={this.state.modal}
          modalHeader={this.state.modalHeader}
          modalFooter={this.state.modalFooter}
          disabled={this.state.disabled}
          showHide={this.state.showHide}
          modules={this.props.modules}
          permits={this.props.permits}
          saveRolAction={this.props.saveRolAction}
          editRolAction={this.props.editRolAction}
          id={this.state.id}
          valorCloseModalRoles={this.valorCloseModalRoles}
        />
        <div className="containerGeneral">
          <div className="container-button" >
            <Button
              color="success"
              disabled={disabledCreate}
              onClick={() => {
                this.openRoles(1);
              }}
            >
              Agregar Rol
            </Button>
         </div>
          <div className="containerSearch">
            <Search value={arrayRoles} />
          </div>
        </div>
        <br />
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Rol</th>
              <th className="text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.props.roles
              ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rol) => {
                return (
                  <tr key={rol.number} className="text-left">
                    <td>{rol.number}</td>
                    <td>{rol.rol}</td>
                    <td>
                      <div className="float-left">
                        <IconButton
                          aria-label="Delete"
                          title="Ver Rol"
                          className="iconButtons"
                          onClick={() => {
                            this.openRoles(2, rol.number, rol._id);
                          }}
                        >
                          <Visibility className="iconTable" />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          title="Editar Rol"
                          disabled={disabledUpdate}
                          className="iconButtons"
                          onClick={() => {
                            this.openRoles(3, rol.number, rol._id);
                          }}
                        >
                          <Edit className="iconTable" />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          title="Inactivar Rol"
                          disabled={disabledDelete}
                          className="iconButtons"
                          onClick={() => {
                            this.deleteRoles(rol._id);
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
          {
            this.props.roles.length > 10 &&
              <Pagination contador={this.props.roles}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                handleChangePage={this.handleChangePage} />
          }
        </Table>
      </div>
    );
  }
}

export default RolesList;
