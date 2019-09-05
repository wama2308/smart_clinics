import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Visibility, QuestionAnswer, Close, Reply, Done } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Chat from './Chat';
import { TableFooter, Icon } from '@material-ui/core';
import "../../components/style.css";
import ModalReclamos from './ModalReclamos/ModalReclamos';
import { Button } from 'reactstrap';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import LightBox from '../../components/LightBox';
import { GetDisabledPermits, getArray } from "../../core/utils";
import jstz from 'jstz';
import Search from "../../components/Select";
import Pagination from '../../components/Pagination';

class ReclamosAtendidosList extends Component {
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
      id: '',
      sucursal_id_now: '',
      collapse: false,
      id_receiber: '',
      id_transmitter: '',
      page: 0,
      rowsPerPage: 10
    }
  }

  openModal = (option, id_claim_receiver, id_claim_transmitter) => {
    if (option === 1) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Registrar Reclamo',
        modalFooter: 'Guardar',
        disabled: false,
        showHide: 'show',
      })
    } else if (option === 2) {
      this.props.queryOneReclamos(id_claim_receiver, id_claim_transmitter)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Reclamo',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
        id_receiber: id_claim_receiver,
        id_transmitter: id_claim_transmitter
      })
    } else if (option === 3) {
      this.props.queryOneReclamos(id_claim_receiver, id_claim_transmitter)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Registrar Reclamo',
        modalFooter: 'Guardar',
        disabled: false,
        showHide: 'show',
        id_receiber: id_claim_receiver,
        id_transmitter: id_claim_transmitter
      })
    } else if (option === 4) {
      this.props.loadMessageFunction(id_claim_receiver, id_claim_transmitter)
      this.setState({
        collapse: true,
        option: option,
        id_receiber: id_claim_receiver,
        id_transmitter: id_claim_transmitter
      });
    }
  }

  valorCloseModal = (valor) => {
    this.setState({
      modal: valor,
      option: null,
    });
  }

  toggle() {
    if (this.state.collapse === false) {
      this.setState({
        collapse: true
      });
    } else {
      this.setState({
        collapse: false
      });
    }
  }

  closeChat = () => {
    this.setState({
      collapse: false
    })
  }

  vistitadorValidate = () => {
    this.props.reclamos.map(list => {
      if (list.visitor) {
        return true
      } else {

        return false
      }
    })
  }

  acceptReclamos = (id_claim_receiver, id_claim_transmitter, time) => {
    const message = {
      title: "Aceptar Reclamo",
      info: "¿Esta seguro que desea Aceptar este Reclamo?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.acceptReclamosFunction(id_claim_receiver, id_claim_transmitter, time);
      }
    });
  }

  rejectReclamos = (id_claim_receiver, id_claim_transmitter, time) => {
    const message = {
      title: "Rechazar Reclamo",
      info: "¿Esta seguro que desea Rechazar este Reclamo?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.rejectReclamosFunction(id_claim_receiver, id_claim_transmitter, time);
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
    const time = jstz.determine().name()

    const disabledCreate = GetDisabledPermits(this.props.permits, "Create")
    const disabledUpdate = GetDisabledPermits(this.props.permits, "Update")
    const disabledActive = GetDisabledPermits(this.props.permits, "Active")
    const disabledDelete = GetDisabledPermits(this.props.permits, "Delete")
    const disabledDetails = GetDisabledPermits(this.props.permits, "Details")

    const arrayList = getArray(this.props.reclamos);
    const { rowsPerPage, page } = this.state;

    const result = this.props.search
      ? arrayList.filter(list => {
        return (
          list.medical_center_transmitter.toLowerCase().includes(this.props.search.toLowerCase()) ||
          list.branchoffice_transmitter.toLowerCase().includes(this.props.search.toLowerCase()) ||
          list.visitor.toLowerCase().includes(this.props.search.toLowerCase())
        );
      })
      : arrayList;

    return (
      <div>
        {this.state.modal === true &&
          <ModalReclamos
            option={this.state.option}
            modal={this.state.modal}
            modalHeader={this.state.modalHeader}
            modalFooter={this.state.modalFooter}
            disabled={this.state.disabled}
            showHide={this.state.showHide}
            id_receiber={this.state.id_receiber}
            id_transmitter={this.state.id_transmitter}
            branchOffices={this.props.reclamos}
            valorCloseModal={this.valorCloseModal}
          />}

        {this.state.collapse === true &&
          <Chat
            show={this.state.collapse}
            hide={this.closeChat}
            option={this.state.option}
            id_receiber={this.state.id_receiber}
            id_transmitter={this.state.id_transmitter}
          />
        }

        <div className="containerGeneral" style={{ "marginBottom": "1.8%" }}>
          <div className="container-button">
          </div>
          <div className="containerSearch" >
            <Search value={arrayList} />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th >Centro Medico Emitente</th>
                  <th >Sucursal que Emite</th>
                  <th >Visitador</th>
                  <th >Estatus</th>
                  <th >Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.reclamos ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((list, key) => {
                    return (
                      <tr key={key}>
                        <td>{list.medical_center_transmitter}</td>
                        <td>{list.branchoffice_transmitter}</td>
                        {list.visitor && <td>{list.visitor}</td>}
                        <td>{list.status}</td>
                        <td style={{ 'minWidth': "205px" }}>
                          <div className="float-left" >
                            <IconButton aria-label="Delete"
                              title="Ver Reclamo"
                              className="iconButtons"
                              onClick={() => { this.openModal(2, list.id_claim_receiver, list.id_claim_transmitter); }}
                              disabled={disabledDetails}
                            >
                              <Visibility className="iconTable" />
                            </IconButton>

                            <IconButton aria-label="Delete"
                              title="Rechazar Reclamos"
                              className="iconButtons"
                              onClick={() => { this.rejectReclamos(list.id_claim_receiver, list.id_claim_transmitter, jstz.determine().name()); }}
                              disabled={disabledDelete}
                            >
                              <Close className="iconTable" />
                            </IconButton>


                            <IconButton aria-label="Delete"
                              title="Aceptar Reclamos"
                              className="iconButtons"
                              onClick={() => { this.acceptReclamos(list.id_claim_receiver, list.id_claim_transmitter, time); }}
                              disabled={disabledActive}
                            >
                              <Done className="iconTable" />
                            </IconButton>

                          </div>
                        </td>
                      </tr>
                    )
                  }) : null
                }
              </tbody>

              {
                this.props.reclamos.length > 10 && (
                  <Pagination
                    contador={this.props.reclamos}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    handleChangePage={this.handleChangePage}
                  />
                )}
            </Table>
          </div>
        </div>
      </div >
    );
  }
}

export default ReclamosAtendidosList;
