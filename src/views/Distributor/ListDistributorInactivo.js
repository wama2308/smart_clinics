import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { HowToReg } from "@material-ui/icons";
import { GetDisabledPermits, getArray } from '../../core/utils';
import ModalDistributor from './ModalDistributor.js';
import Pagination from "../../components/Pagination";
import '../../components/style.css'
import Search from "../../components/Select";

class ListDistributorInactivo extends React.Component {
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
      userId: '',
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() { }

  activarProveedor = (proveedorId) => {
    const message = {
      title: "Activar Proveedor",
      info: "¿Esta seguro que desea activar este Proveedor?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enableProviderFunction(proveedorId);
      }
    });
  }

  valorCloseModal = (valor) => {
    this.setState({
      modal: valor,
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  getDistribuitorInactivo = distribuitor => {
    if (!distribuitor) {
      return [];
    }
    return distribuitor;
  };

  render() {
    const activeDisabled = GetDisabledPermits(this.props.distributorPermits, "Active");
    const { rowsPerPage, page } = this.state;
    const arrayDistributor = getArray(this.props.listDistributor)

    const result = this.props.search.toLowerCase()
      ? arrayDistributor.filter(distributor => {
        return (
          distributor.name.toLowerCase().includes(this.props.search.toLowerCase()) ||
          distributor.phone[0].includes(this.props.search) ||
          distributor.typeIdentity.toLowerCase().includes(this.props.search.toLowerCase()) ||
          distributor.tin.toString().includes(this.props.search) ||
          distributor.email[0].toLowerCase().includes(this.props.search.toLowerCase())
        );
      })
      : arrayDistributor;

    return (
      <div>

        <div className="containerGeneral">
          <div className="container-button">
          </div>
          <div className="containerSearch">
            <Search value={arrayDistributor} />
          </div>
        </div>
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left" style={{ 'minWidth': "105px" }}>DNI</th>
              <th className="text-left">Proveedor</th>
              <th className="text-left">Email</th>
              <th className="text-left">Telefono</th>
              <th className="text-left" style={{ 'minWidth': "205px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {arrayDistributor ? arrayDistributor.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((distributor) => {
              return (
                <tr key={distributor.number} className="text-left">
                  <td>{distributor.number}</td>
                  <td style={{ 'minWidth': "105px" }}>{distributor.typeIdentity}-{distributor.tin}</td>
                  <td>{distributor.name}</td>
                  <td>{distributor.email[0]}</td>
                  <td>{distributor.phone[0]}</td>
                  <td style={{ 'minWidth': "205px" }}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete"
                        disabled={activeDisabled}
                        title="Activar Proveedor"
                        className="iconButtons"
                        onClick={() => { this.activarProveedor(distributor.id); }}>
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
            arrayDistributor.length > 10 &&
            <Pagination contador={this.props.listDistributor}
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

export default ListDistributorInactivo;
