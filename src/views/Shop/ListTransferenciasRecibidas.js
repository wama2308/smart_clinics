import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility, SwapHoriz, Done, Clear } from "@material-ui/icons";
import ModalShop from './ModalShop.js';
import ModalTransferencias from './ModalTransferencias.js';
import { number_format, GetDisabledPermits, getArray } from "../../core/utils";
import Pagination from '../../components/Pagination';
import Search from "../../components/Select";
import '../../components/style.css'

class ListTransferenciasRecibidas extends React.Component {
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
      transfer_id: '0',
      status: '',
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() { }

  openModal = (option, pos, id, status) => {
    if (option === 7) {
      this.props.queryOneTransferFunction(id);
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Transferencia',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
      })
    }
  }

  deleteRegister = (id, status) => {
    const message = {
      title: "Rechazar Transferencia",
      info: "¿Esta seguro que desea rechazar la transferencia?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.rejectTransferAction(id);

      }
    });
  }

  aceptarRegister = (id, status) => {
    const message = {
      title: "Aceptar Transferencia",
      info: "¿Esta seguro que desea aceptar la transferencia?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.acceptTransferAction(id);
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
    const detailsDisabled = GetDisabledPermits(this.props.permitsTransfer, "Details")

    const arrayData = getArray(this.props.data)
    const result = this.props.search
      ? arrayData.filter(data => {
        return (
          data.number_invoice.toLowerCase().includes(this.props.search) ||
          data.number_controll.toLowerCase().includes(this.props.search)
        );
      })
      : arrayData;

    const { rowsPerPage, page } = this.state;
    return (
      <div>
        {
          (this.state.option === 7) &&
          <ModalTransferencias
            option={this.state.option}
            modal={this.state.modal}
            modalHeader={this.state.modalHeader}
            modalFooter={this.state.modalFooter}
            disabled={this.state.disabled}
            showHide={this.state.showHide}
            isClearable={this.state.isClearable}
            transfer_id={this.state.transfer_id}
            status={this.state.status}
            branchOfficces={this.props.branchOfficces}
            valorCloseModal={this.valorCloseModal}
          />
        }
        <div className="containerGeneral" style={{ "justifyContent": "flex-end" }}>
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
                  <th className="text-left">Transferencia</th>
                  <th className="text-left">Control</th>
                  <th className="text-left">Emisor</th>
                  <th className="text-left">Estatus</th>
                  <th className="text-left" style={{ 'minWidth': "105px" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                  return (
                    <tr key={data.number} className="text-left">
                      <td>{data.number}</td>
                      <td>{data.number_invoice}</td>
                      <td>{data.number_controll}</td>
                      <td>{data.transmitter}</td>
                      <td>{data.status}</td>
                      <td style={{ 'minWidth': "205px" }}>
                        <div className="float-left" >
                          <IconButton aria-label="Delete"
                            title="Ver Transferencia"
                            className="iconButtons"
                            onClick={() => { this.openModal(7, data.number, data._id, data.status); }}
                            disabled={detailsDisabled}>
                            <Visibility className="iconTable" />
                          </IconButton>
                          {
                            data.status === "Pendiente" &&
                            <span>
                              <IconButton aria-label="Delete"
                                title="Aceptar Transferencia"
                                className="iconButtons" onClick={() => { this.aceptarRegister(data._id, data.status); }}
                                disabled={createDisabled}>
                                <Done className="iconTable" />
                              </IconButton>

                              <IconButton aria-label="Delete"
                                title="Rechazar Transferencia"
                                className="iconButtons" onClick={() => { this.deleteRegister(data._id, data.status); }}
                                disabled={updateDisabled}>
                                <Clear className="iconTable" />
                              </IconButton>
                            </span>
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

export default ListTransferenciasRecibidas;
