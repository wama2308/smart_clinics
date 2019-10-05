import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility, Cancel } from "@material-ui/icons";
import ModalSolicitudes from './ModalSolicitudes.js';
import { number_format, GetDisabledPermits, getArray } from "../../core/utils";
import Pagination from '../../components/Pagination';
import Search from "../../components/Select";
import '../../components/style.css'

class ListSolicitudesRealizadas extends React.Component {
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
      isClearable: false,
      request_id: '0',
      status: '',
      page: 0,
      rowsPerPage: 10,
      typeRequest: 'Realizada',
    };
  }

  componentDidMount() { }

  openModal = (option, pos, id, status) => {
    if (option === 1) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Registrar Solicitud de transferencia',
        modalFooter: 'Guardar',
        disabled: false,
        showHide: 'show',
        isClearable: true,
      })
    } else if (option === 2) {
      this.props.LoadRequestMadeIdFunction(id);
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Solicitud de transferencia',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
      })
    } else if (option === 3) {
      this.props.LoadRequestMadeIdFunction(id);
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Solicitud de transferencia',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',
        position: pos,
        request_id: id,
        status: status,
        page: 0,
        rowsPerPage: 10,
      })
    }
  }

  deleteRegister = (option, id, status) => {
    if (option === 1) {
      const message = {
        title: "Eliminar Registro",
        info: "¿Esta seguro que desea eliminar este registro?"
      };
      this.props.confirm(message, res => {
        if (res) {
          if (status === "Pendiente" || status === "Rechazada" || status === "Cancelada") {
            this.props.DeleteRequestMadeAction(id);
          } else {
            this.props.alert("warning", "¡La solicitud no puede ser cancelada, su estatus es: " + status + "!");
          }
        }
      });
    } else {
      const message = {
        title: "Cancelar Solicitud",
        info: "¿Esta seguro que desea cancelar esta solicitud?"
      };
      this.props.confirm(message, res => {
        if (res) {
          if (status === "Pendiente" || status === "Rechazada" || status === "Cancelada") {
            this.props.cancelRequestAction(id);
          } else {
            this.props.alert("warning", "¡La solicitud no puede ser cancelada, su estatus es: " + status + "!");
          }
        }
      });
    }

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
    const createDisabled = GetDisabledPermits(this.props.permitsTransfer, "Create")
    const updateDisabled = GetDisabledPermits(this.props.permitsTransfer, "Update")
    const deleteDisabled = GetDisabledPermits(this.props.permitsTransfer, "Delete")
    const detailsDisabled = GetDisabledPermits(this.props.permitsTransfer, "Details")
    const { rowsPerPage, page } = this.state;
    const arrayData = getArray(this.props.data)

    const result = this.props.search
      ? arrayData.filter(data => {
        return (
          data.number_control.toLowerCase().includes(this.props.search)
        );
      })
      : arrayData;

    return (
      <div>
        {
          (this.state.option === 1 ||
            this.state.option === 2 ||
            this.state.option === 3) &&
          <ModalSolicitudes
            option={this.state.option}
            modal={this.state.modal}
            modalHeader={this.state.modalHeader}
            modalFooter={this.state.modalFooter}
            disabled={this.state.disabled}
            showHide={this.state.showHide}
            isClearable={this.state.isClearable}
            request_id={this.state.request_id}
            status={this.state.status}
            branchOfficces={this.props.branchOfficces}
            valorCloseModal={this.valorCloseModal}
            permitsTransfer={this.props.permitsTransfer}
            search={this.props.searchData}
          />
        }
        <div className="containerGeneral">
          <div className="container-button" style={{ "height": "5%" }}>
            <Button color="success"
              disabled={createDisabled}
              onClick={() => { this.openModal(1); }}>
              Agregar
            </Button>
          </div>
          <div className="containerSearch">
            <Search value={arrayData} />
          </div>
        </div>
        <br />
        <div className="flex">
          <div className="scrollCss" style={{ width: '100%', height: '31rem', overflow: 'auto' }}>
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th className="text-left" style={{ width: '10%' }}>Nro</th>
                  <th className="text-left" style={{ width: '15%' }}>Control</th>
                  <th className="text-left" style={{ width: '20%' }}>Emisor</th>
                  <th className="text-left" style={{ width: '20%' }}>Receptor</th>
                  <th className="text-left" style={{ width: '20%' }}>Estatus</th>
                  <th className="text-left" style={{ 'minWidth': "105px", width: '15%' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.data ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                    return (
                      <tr key={data.number} className="text-left">
                        <td style={{ width: '10%' }}>{data.number}</td>
                        <td style={{ width: '15%' }}>{data.number_control}</td>
                        <td style={{ width: '20%' }}>{data.sender}</td>
                        <td style={{ width: '20%' }}>{data.receiver}</td>
                        <td style={{ width: '20%' }}>{data.status}</td>
                        <td style={{ 'minWidth': "205px", width: '15%' }}>
                          <div className="float-left" >
                            <IconButton aria-label="Delete"
                              title="Ver Solicitud"
                              className="iconButtons"
                              onClick={() => { this.openModal(2, data.number, data._id, data.status); }}
                              disabled={detailsDisabled}>
                              <Visibility className="iconTable" />
                            </IconButton>

                            <IconButton aria-label="Delete"
                              title="Editar Solicitud"
                              className="iconButtons"
                              onClick={() => { this.openModal(3, data.number, data._id, data.status); }}
                              disabled={updateDisabled}>
                              <Edit className="iconTable" />
                            </IconButton>

                            <IconButton aria-label="Delete"
                              title="Cancelar Solicitud"
                              className="iconButtons"
                              onClick={() => { this.deleteRegister(0, data._id, data.status); }}
                              disabled={deleteDisabled}>
                              <Cancel className="iconTable" />
                            </IconButton>

                            <IconButton aria-label="Delete"
                              title="Eliminar Solicitud"
                              className="iconButtons"
                              onClick={() => { this.deleteRegister(1, data._id, data.status); }}
                              disabled={deleteDisabled}>
                              <Delete className="iconTable" />
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
              {this.props.data.length > 10 &&
                <Pagination contador={this.props.data}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                  handleChangePage={this.handleChangePage} />
              }
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListSolicitudesRealizadas;
