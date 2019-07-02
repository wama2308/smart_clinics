import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import { GetDisabledPermits, getArray } from "../../core/utils";
import ModalDistributor from './ModalDistributor.js';
import Pagination from '../../components/Pagination';

class ListDistributor extends React.Component {
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
      cont: 0
    };
  }

  openModal = (option, pos, id) => {
    if (option === 1) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Registrar Proveedor',
        modalFooter: 'Guardar',
        disabled: false,
        showHide: 'show',
      })
    } else if (option === 2) {
      this.props.LoadDistributorIdFunction(id);
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Proveedor',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
      })
    } else if (option === 3) {
      this.props.LoadDistributorIdFunction(id);
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Proveedor',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',
        position: pos,
        userId: id
      })
    }
  }

  deleteProveedor = (proveedorId) => {
    const message = {
      title: "Eliminar Proveedor",
      info: "¿Esta seguro que desea eliminar este Proveedor?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.DeleteDistributorAction(proveedorId);
      }
    });
  }

  valorCloseModal = (valor) => {
    this.setState({
      modal: valor,
      option: 0,
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const updateDisabled = GetDisabledPermits(this.props.distributorPermits, "Update");
    const deleteDisabled = GetDisabledPermits(this.props.distributorPermits, "Delete");
    const createDisabled = GetDisabledPermits(this.props.distributorPermits, "Create");
    const { rowsPerPage, page } = this.state;
    const ArrayDistributor = getArray(this.props.listDistributor)

    return (
      <div>
        <ModalDistributor
          option={this.state.option}
          modal={this.state.modal}
          modalHeader={this.state.modalHeader}
          modalFooter={this.state.modalFooter}
          disabled={this.state.disabled}
          showHide={this.state.showHide}
          userId={this.state.userId}
          valorCloseModal={this.valorCloseModal}
        />
        <Button color="success"
          disabled={createDisabled}
          onClick={() => { this.openModal(1); }}>
          Agregar Proveedor
          </Button>
        <br />
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
                      <IconButton aria-label="Delete"
                        title="Ver Rol" className="iconButtons"
                        onClick={() => { this.openModal(2, distributor.number, distributor.id); }}>
                        <Visibility className="iconTable" />
                      </IconButton>

                      <IconButton aria-label="Delete"
                        title="Editar Rol" disabled={updateDisabled}
                        className="iconButtons" onClick={() => { this.openModal(3, distributor.number, distributor.id); }}>
                        <Edit className="iconTable" />
                      </IconButton>

                      <IconButton aria-label="Delete"
                        title="Editar Rol" disabled={deleteDisabled}
                        className="iconButtons" onClick={() => { this.deleteProveedor(distributor.id); }}
                      ><Delete className="iconTable" />
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
            ArrayDistributor > 10 &&
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

export default ListDistributor;
