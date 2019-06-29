import React from "react";
import { Table, Button } from "reactstrap";
import ModalUser from "./ModalUser.js";
import IconButton from "@material-ui/core/IconButton";
import { GetDisabledPermits } from "../../core/utils";
import { HowToReg } from "@material-ui/icons";
import Pagination from '../../components/Pagination';

class UsersInactivosList extends React.Component {
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
      rowsPerPage: 10,
    };
  }

  activarUser = userId => {
    const message = {
      title: "Activar Usuario",
      info: "¿Esta seguro que desea activar este usuario?"
    };
    this.props.confirmDeleteUser(message, res => {
      if (res) {
        this.props.ActivateUserNoMasterAction(userId);
      }
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
    const disabledActive = GetDisabledPermits(
      this.props.permitsUsers,
      "Active"
    );

    const { rowsPerPage, page } = this.state;
    const ArrayUser = [];

    this.props.users.map((user, key) => {
      ArrayUser.push({
        ...user, number: key + 1
      })
    })
    return (
      <div>
        <br />
        <div className="row">
          <div className="form-group col-sm-12">
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
                  ? ArrayUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
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
                              title="Activar Usuario"
                              disabled={disabledActive}
                              className="iconButtons"
                              onClick={() => {
                                this.activarUser(user._id);
                              }}
                            >
                              <HowToReg className="iconTable" />
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
              <Pagination contador={this.props.users}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                handleChangePage={this.handleChangePage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersInactivosList;
