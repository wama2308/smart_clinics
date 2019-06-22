import React from "react";
import { Table, Button } from "reactstrap";
import ModalUser from "./ModalUser.js";
import IconButton from "@material-ui/core/IconButton";
import { GetDisabledPermits } from "../../core/utils";
import { HowToReg } from "@material-ui/icons";

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
      userIdEdit: 0
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

  render() {
    const disabledActive = GetDisabledPermits(
      this.props.permitsUsers,
      "Active"
    );
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
                  ? this.props.users.map((user, i) => {
                      return (
                        <tr key={i} className="text-left">
                          <td>{i + 1}</td>
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
          </div>
        </div>
      </div>
    );
  }
}

export default UsersInactivosList;
