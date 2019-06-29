import React from "react";
import { Table, Button } from "reactstrap";
import ModalRoles from "./ModalRoles.js";
import IconButton from "@material-ui/core/IconButton";
import { GetDisabledPermits } from "../../core/utils";
import { DoneOutlineOutlined } from "@material-ui/icons";
import Pagination from '../../components/Pagination';

class RolesInactivosList extends React.Component {
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
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() { }

  activateRoles = rolId => {
    const message = {
      title: "Activar Rol",
      info: "¿Esta seguro que desea activar este rol?"
    };
    this.props.confirmDeleteUser(message, res => {
      if (res) {
        this.props.enabledRolAction(rolId);
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
    const ArrayRoles = [];

    this.props.roles.map((rol, key) => {
      ArrayRoles.push({
        ...rol, number: key + 1
      })
    })

    return (
      <div>
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
                          title="Activar Rol"
                          disabled={disabledActive}
                          className="iconButtons"
                          onClick={() => {
                            this.activateRoles(rol._id);
                          }}
                        >
                          <DoneOutlineOutlined className="iconTable" />
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

export default RolesInactivosList;
