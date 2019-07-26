import React from "react";
import { Table, Button } from "reactstrap";
import ModalUser from "./ModalUser.js";
import { GetDisabledPermits, getArray } from "../../core/utils";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import Pagination from "../../components/Pagination";
import Search from "../../components/Select";
import "../../components/style.css";

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalHeader: "",
      modalFooter: "",
      action: "",
      disabled: "",
      disabledEmail: "",
      showHide: "",
      option: 0,
      position: 0,
      userIdEdit: 0,
      page: 0,
      rowsPerPage: 10
    };
  }

  openUser = (option, pos, userId) => {
    let disabledEditEmail = false;
    if(this.props.typeUser === "Master"){
      disabledEditEmail = false;
    }else{
      disabledEditEmail = true;
    }

    if (option === 1) {
      if (this.props.totalBranchOffices > 0) {
        this.setState({
          modal: true,
          option: option,
          modalHeader: "Registrar Usuario",
          modalFooter: "Guardar",
          disabled: false,
          disabledEmail: false,
          showHide: "show",
          position: 0
        });
      } else {
        this.props.alert(
          "warning",
          "¡Antes de registrar un usuario debe registrar una sucursal!"
        );
      }
    } else if (option === 2) {
      this.props.LoadIdUsersNoMasterFunction(userId);
      this.setState({
        modal: true,
        option: option,
        modalHeader: "Ver Usuario",
        modalFooter: "Guardar",
        disabled: true,
        disabledEmail: true,
        showHide: "hide",
        position: pos
      });
    } else if (option === 3) {
      this.props.LoadIdUsersNoMasterFunction(userId);
      this.setState({
        modal: true,
        option: option,
        modalHeader: "Editar Usuario",
        modalFooter: "Editar",
        disabled: false,
        disabledEmail: disabledEditEmail,
        showHide: "show",
        userIdEdit: userId
      });
    }
  };

  deleteUser = userId => {
    const message = {
      title: "Inactivar Usuario",
      info: "¿Esta seguro que desea inactivar este usuario?"
    };
    this.props.confirmDeleteUser(message, res => {
      if (res) {
        this.props.DeleteUserNoMasterAction(userId);
      }
    });
  };


  valorCloseModal = valor => {
    this.setState({
      modal: valor,
      option: 0
    });
  };

  valorCloseModalRoles = valor => {
    this.setState({
      modal: valor
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
    const arrayUsers = getArray(this.props.users);

    const result = this.props.search
      ? arrayUsers.filter(users => {
          return (
            users.email.toLowerCase().includes(this.props.search.toLowerCase()) ||
            users.names.toLowerCase().includes(this.props.search.toLowerCase()) ||
            users.surnames.toLowerCase().includes(this.props.search.toLowerCase()) ||
            users.username.toLowerCase().includes(this.props.search.toLowerCase())
          );
        })
      : arrayUsers;

    return (
      <div>
        <ModalUser
          option={this.state.option}
          modal={this.state.modal}
          modalHeader={this.state.modalHeader}
          modalFooter={this.state.modalFooter}
          disabled={this.state.disabled}
          disabledEmail={this.state.disabledEmail}
          showHide={this.state.showHide}
          modules={this.props.modules}
          permits={this.props.permits}
          totalBranchOffices={this.props.totalBranchOffices}
          arrayBranchOffices={this.props.arrayBranchOffices}
          roles={this.props.roles}
          valorCloseModalRoles={this.valorCloseModalRoles}
          valorCloseModal={this.valorCloseModal}
          saveRolAction={this.props.saveRolAction}
          LoadRolIdFunction={this.props.LoadRolIdFunction}
          saveUserNoMasterAction={this.props.saveUserNoMasterAction}
          editUserNoMasterAction={this.props.editUserNoMasterAction}
          addSucursalFunction={this.props.addSucursalFunction}
          deleteSucursalFunction={this.props.deleteSucursalFunction}
          userIdEdit={this.state.userIdEdit}          
        />

        <div className="containerGeneral">
          <div className="container-button">
            <Button
              color="success"
              disabled={disabledCreate}
              onClick={() => {
                this.openUser(1);
              }}
            >
              Agregar Usuario
            </Button>
          </div>
          <div className="containerSearch">
            <Search value={arrayUsers} />
          </div>
        </div>
        <br />
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Email</th>
              <th className="text-left">Nombres y Apellidos</th>
              <th className="text-left">Nombre de Usuario</th>
              <th className="text-left" style={{ minWidth: "155px" }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.users
              ? result
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(user => {
                    return (
                      <tr key={user.number} className="text-left">
                        <td>{user.number}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.names} {user.surnames}
                        </td>
                        <td>{user.username}</td>
                        <td style={{ minWidth: "155px" }}>
                          <div
                            style={{ height: "15px" }}
                            className={"text-left"}
                          >
                            <IconButton
                              aria-label="Delete"
                              title="Ver Usuario"
                              className="iconButtons"
                              onClick={() => {
                                this.openUser(2, user.number, user.id);
                              }}
                            >
                              <Visibility className="iconTable" />
                            </IconButton>
                            <IconButton
                              aria-label="Delete"
                              title="Editar Usuario"
                              disabled={disabledUpdate}
                              className="iconButtons"
                              onClick={() => {
                                this.openUser(3, user.number, user.id);
                              }}
                            >
                              <Edit className="iconTable" />
                            </IconButton>
                            <IconButton
                              aria-label="Delete"
                              title="Inactivar Usuario"
                              className="iconButtons"
                              disabled={disabledDelete}
                              onClick={() => {
                                this.deleteUser(user.id);
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
            this.props.users.length > 10 && (            
            <Pagination
              contador={this.props.users}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              handleChangePage={this.handleChangePage}
            />            
          )}
        </Table>        
      </div>
    );
  }
}

export default UsersList;
