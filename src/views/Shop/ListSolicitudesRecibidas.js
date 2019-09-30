import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Cancel, Edit, Visibility, EventBusy } from "@material-ui/icons";
import ModalSolicitudes from './ModalSolicitudes.js';
import { number_format, GetDisabledPermits, getArray } from "../../core/utils";
import Pagination from '../../components/Pagination';
import Search from "../../components/Select";
import '../../components/style.css'

class ListSolicitudesRecibidas extends React.Component {
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
      typeRequest: 'Recibida',
    };
  }

  componentDidMount() { }

  openModal = (option, pos, id, status) => {
    if (option === 4) {
      this.props.querySeeARequestsFunction(id);
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Solicitud de Transferencia Recibida',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'show',
        isClearable: true,
      })
    }
    // else if (option === 2) {
    //   this.props.queryOneTransferFunction(id);
    //   this.setState({
    //     modal: true,
    //     option: option,
    //     modalHeader: 'Ver Transferencia',
    //     modalFooter: 'Guardar',
    //     disabled: true,
    //     showHide: 'hide',
    //   })
    // } else if (option === 3) {
    //   this.props.queryOneTransferFunction(id);
    //   this.setState({
    //     modal: true,
    //     option: option,
    //     modalHeader: 'Editar Transferencia',
    //     modalFooter: 'Editar',
    //     disabled: false,
    //     showHide: 'show',
    //     position: pos,
    //     request_id: id,
    //     status: status,
    //     page: 0,
    //     rowsPerPage: 10,
    //   })
    // }
  }

  deleteRegister = (id, status) => {
    const message = {
      title: "Rechazar Solicitud",
      info: "¿Esta seguro que desea rechazar esta solicitud?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.rejectRequestAction(id);
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
          (this.state.option === 4 ||
            this.state.option === 5 ||
            this.state.option === 6) &&
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
          />
        }
        <div className="containerGeneral" style={{ "justifyContent": "flex-end" }}>
          {/* <div className="container-button" >
            <Button color="success"
              disabled={createDisabled}
              onClick={() => { this.openModal(1); }}>
              Agregar
            </Button>
          </div> */}
          <div className="containerSearch">
            <Search value={arrayData} />
          </div>
        </div>
        <br />
        <div className="flex">
          <div className="inner-flex" style={{ width: '100%', height: '31rem', overflow: 'auto' }}>
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th className="text-left">Nro</th>
                  <th className="text-left">Control</th>
                  <th className="text-left">Emisor</th>
                  <th className="text-left">Receptor</th>
                  <th className="text-left">Estatus</th>
                  <th className="text-left" style={{ 'minWidth': "105px" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.data ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                    return (
                      <tr key={data.number} className="text-left">
                        <td>{data.number}</td>
                        <td>{data.number_control}</td>
                        <td>{data.sender}</td>
                        <td>{data.receiver}</td>
                        <td>{data.status}</td>
                        <td style={{ 'minWidth': "205px" }}>
                          <div className="float-left" >
                            <IconButton aria-label="Delete"
                              title="Ver Solicitud Recibida"
                              className="iconButtons"
                              onClick={() => { this.openModal(4, data.number, data._id, data.status); }}
                              disabled={detailsDisabled}>
                              <Visibility className="iconTable" />
                            </IconButton>
                            {
                              data.status !== "Rechazada" &&
                              <IconButton aria-label="Delete"
                                title="Rechazar Solicitud"
                                className="iconButtons"
                                onClick={() => { this.deleteRegister(data._id, data.status); }}
                                disabled={deleteDisabled}>
                                <Cancel className="iconTable" />
                              </IconButton>
                            }

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

export default ListSolicitudesRecibidas;
