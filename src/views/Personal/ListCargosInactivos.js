import React from "react";
import { Table, Button } from "reactstrap";
import ModalCargos from './ModalCargos.js';
import IconButton from "@material-ui/core/IconButton";
import { DoneOutlineOutlined } from "@material-ui/icons";
import Pagination from '../../components/Pagination';
import { getArray } from '../../core/utils';

class ListCargosInactivos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalHeader: '',
      modalFooter: '',
      action: '',
      disabled: '',
      showHide: '',
      option: 0,
      position: 0,
      cargo: '',
      descripcion: '',
      cargoId: '',
      page: 0,
      rowsPerPage: 10
    };
  }

  componentDidMount() { }

  activarCargo = (id) => {
    const message = {
      title: "Activar Cargo",
      info: "¿Esta seguro que desea activar este cargo?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enabledPositionAction(id);
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
    const ArrayCargo = getArray(this.props.cargosInactivos);

    return (
      <div>
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Cargo</th>
              <th className="text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              ArrayCargo ? ArrayCargo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cargo) => {
                return (
                  <tr key={cargo.number} className="text-left">
                    <td>{cargo.number}</td>
                    <td>{cargo.label}</td>
                    <td>
                      <div className="float-left" >
                        <IconButton aria-label="Delete"
                          title="Activar Cargo"
                          className="iconButtons"
                          onClick={() => { this.activarCargo(cargo.value); }}>
                          <DoneOutlineOutlined className="iconTable" />
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
            this.props.cargosInactivos.length > 10 &&
              <Pagination contador={this.props.cargosInactivos}
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
export default ListCargosInactivos;
