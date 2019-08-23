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
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetDisabledPermits } from "../../core/utils";
import jstz from 'jstz';

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
      id_transmitter: ''
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
      title: "Eliminar Registro",
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
      title: "Eliminar Registro",
      info: "¿Esta seguro que desea Rechazar este Reclamo?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.rejectReclamosFunction(id_claim_receiver, id_claim_transmitter, time);
      }
    });
  }

  validat = (data) => {
    if (data === undefined) {
      const datos = data[0].hasOwnProperty('visitor')
      if (datos === true) {
        return true
      } else {
        return false
      }
    } else {
      const datos = data[0] ? data[0].hasOwnProperty('visitor') : false
      if (datos === true) {
        return true
      } else {
        return false
      }
    }
  }

  render() {
    const visitador = this.validat(this.props.reclamos)
    const time = jstz.determine().name()

    console.log(this.props.permits)
    const disabledCreate = GetDisabledPermits(this.props.permits, "Create")
    const disabledUpdate = GetDisabledPermits(this.props.permits, "Update")
    const disabledActive = GetDisabledPermits(this.props.permits, "Active")
    const disabledDelete = GetDisabledPermits(this.props.permits, "Delete")
    const disabledDetails = GetDisabledPermits(this.props.permits, "Details")

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

        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th >Centro Medico Emitente</th>
                  <th >Sucursal que Emite</th>
                  {this.props.master === "MASTER" && <th >Visitador</th>}
                  <th >Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.reclamos ? this.props.reclamos.map((list, key) => {
                    return (
                      <tr key={key}>
                        <td>{list.medical_center_transmitter}</td>
                        <td>{list.branchoffice_transmitter}</td>
                        {list.visitor && <td>{list.visitor}</td>}
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

            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ReclamosAtendidosList;
