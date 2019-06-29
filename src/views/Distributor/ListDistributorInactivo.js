import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { HowToReg } from "@material-ui/icons";
import { GetDisabledPermits } from '../../core/utils';
import ModalDistributor from './ModalDistributor.js';
import Pagination from "../../components/Pagination";

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

  render() {
    const activeDisabled = GetDisabledPermits(this.props.distributorPermits, "Active");
    const { rowsPerPage, page } = this.state;
    const ArrayDistributor = [];

    this.props.listDistributor.map((distributor, key) => {
      ArrayDistributor.push({
        ...distributor, number: key + 1
      })
    })

    return (
      <div>
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
            {ArrayDistributor ? ArrayDistributor.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((distributor) => {
              return (
                <tr key={distributor.number} className="text-left">
                  <td>{distributor.number}</td>
                  <td style={{ 'minWidth': "105px" }}>{distributor.typeIdentity}-{distributor.tin}</td>
                  <td>{distributor.name}</td>
                  <td>{distributor.email[0]}</td>
                  <td>{distributor.phone[0]}</td>
                  <td style={{ 'minWidth': "205px" }}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete" disabled={activeDisabled} title="Activar Proveedor" className="iconButtons" onClick={() => { this.activarProveedor(distributor.id); }}><HowToReg className="iconTable" /></IconButton>
                    </div>
                  </td>
                </tr>
              );
            })
              :
              null
            }
          </tbody>
        </Table>
        <div style={{ 'display': "flex", 'justify-content': "flex-end" }}>
          <Pagination contador={this.props.listDistributor}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            handleChangePage={this.handleChangePage} />
        </div>

      </div>
    );
  }
}

export default ListDistributorInactivo;
