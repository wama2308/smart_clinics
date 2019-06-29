import React from "react";
import { Table, Button } from "reactstrap";
import ModalRoles from "./ModalRoles.js";
import IconButton from "@material-ui/core/IconButton";
import { GetDisabledPermits } from "../../core/utils";
import { Edit, Visibility, Delete } from "@material-ui/icons";
import Pagination from '../../components/Pagination';

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
    const ArrayRoles = [];

    this.props.roles.map((rol, key) => {
      ArrayRoles.push({
        ...rol, number: key + 1
      })
    })

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

        <Button
          color="success"
          disabled={disabledCreate}
          onClick={() => {
            this.openRoles(1);
          }}
        >
          Agregar Rol
        </Button>
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
              ? ArrayRoles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rol) => {
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
        </Table>
        <div style={{ 'display': "flex", 'justify-content': "flex-end" }}>
          <Pagination contador={this.props.roles}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            handleChangePage={this.handleChangePage} />
        </div>
      </div>
    );
  }
}

export default RolesList;
