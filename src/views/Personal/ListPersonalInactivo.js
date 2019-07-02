import React from "react";
import { Table, Button } from "reactstrap";
import ModalPersonal from './ModalPersonal.js';
import IconButton from "@material-ui/core/IconButton";
import { getArray } from '../../core/utils';
import { HowToReg } from "@material-ui/icons";
import Pagination from '../../components/Pagination';

class ListPersonalInactivo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalHeader: '',
      modalFooter: '',
      action: '',
      disabled: false,
      showHide: '',
      isClearable: false,
      option: 0,
      position: 0,
      id: '',
      page: 0,
      rowsPerPage: 10
    };
  }

  componentDidMount() { }

  activarPersonal = (id) => {
    const message = {
      title: "Activar Personal",
      info: "¿Esta seguro que desea activar este personal?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enabledInternalStaffAction(id);
      }
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const ArrayCargo = getArray(this.props.personalInactivo);

    return (
      <div>
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left" style={{ 'minWidth': "110px" }}>DNI</th>
              <th className="text-left">Personal</th>
              <th className="text-left">Cargo</th>
              <th className="text-left">Email</th>
              <th className="text-left">Telefonos</th>
              <th className="text-left" style={{ 'minWidth': "155px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.props.personalInactivo ? ArrayCargo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((personal) => {
              return (
                <tr key={personal.number} className="text-left">
                  <td>{personal.number}</td>
                  <td style={{ 'minWidth': "110px" }}>{personal.type_identity} - {personal.dni}</td>
                  <td>{personal.names} {personal.surnames}</td>
                  <td>{personal.positions}</td>
                  <td>{personal.email[0]}</td>
                  <td>{personal.phone[0]}</td>
                  <td style={{ 'minWidth': "155px" }}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete"
                        title="Activar Personal"
                        className="iconButtons"
                        onClick={() => { this.activarPersonal(personal._id); }}>
                        <HowToReg className="iconTable" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })
              :
              null
            }
          </tbody>
          {
            this.props.personalInactivo.length > 10 &&
              <Pagination contador={this.props.personalInactivo}
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

export default ListPersonalInactivo;
