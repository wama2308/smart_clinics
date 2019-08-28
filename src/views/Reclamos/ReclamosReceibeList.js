import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Visibility, QuestionAnswer, HowToReg, Done, Close, Reply } from '@material-ui/icons';
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
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import jstz from 'jstz';
import { GetDisabledPermits } from "../../core/utils";
import ModalVisitador from './ModalReclamos/ModalVisitador';

class ReclamosReceibeList extends Component {
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
      visitor_disable: null
    }
  }

  openModal = (option, id_claim_receiver, id_claim_transmitter, made_by_visitor, status) => {
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
      if (made_by_visitor === 0) {
        this.props.queryOneReclamos(id_claim_receiver, id_claim_transmitter)
        this.setState({
          modal: true,
          option: option,
          modalHeader: 'Ver Reclamo',
          modalFooter: 'Guardar',
          disabled: true,
          showHide: 'hide',
          id_receiber: id_claim_receiver,
          id_transmitter: id_claim_transmitter,
          visitor_disable: true
        })
      } else {
        if (status === "Aprobado") {
          this.props.messageErrorFunction()
        } else {
          this.props.queryOneReclamos(id_claim_receiver, id_claim_transmitter)
          this.setState({
            modal: true,
            option: option,
            modalHeader: 'Ver Reclamo',
            modalFooter: 'Guardar',
            disabled: true,
            showHide: 'hide',
            id_receiber: id_claim_receiver,
            id_transmitter: id_claim_transmitter,
            visitor_disable: false
          })
        }
      }
    } else if (option === 3) {
      if (made_by_visitor === 0) {
        this.props.queryOneReclamos(id_claim_receiver, id_claim_transmitter)
        this.setState({
          modal: true,
          option: option,
          modalHeader: 'Ver Reclamo',
          modalFooter: 'Guardar',
          disabled: true,
          showHide: 'show',
          id_receiber: id_claim_receiver,
          id_transmitter: id_claim_transmitter,
          visitor_disable: true
        })
      } else {
        this.props.queryOneReclamos(id_claim_receiver, id_claim_transmitter)
        this.setState({
          modal: true,
          option: option,
          modalHeader: 'Ver Reclamo',
          modalFooter: 'Guardar',
          disabled: false,
          showHide: 'show',
          id_receiber: id_claim_receiver,
          id_transmitter: id_claim_transmitter,
          visitor_disable: false
        })
      }
    } else if (option === 4) {
      this.props.loadMessageFunction(id_claim_receiver, id_claim_transmitter)
      const time = jstz.determine().name()
      this.props.setStatusMessageFunction(id_claim_receiver, id_claim_transmitter, time)
      this.setState({
        collapse: true,
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

  deleteRegister = (id_claim_receiver, id_claim_transmitter) => {
    const message = {
      title: "Cancelar Reclamo",
      info: "¿Esta seguro que desea Cancelar este Reclamo?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.deleteReclamosFuction(id_claim_receiver, id_claim_transmitter);
      }
    });
  }

  transferClaims = (id_claim_receiver, id_claim_transmitter) => {
    const message = {
      title: "Eliminar Registro",
      info: "¿Esta seguro que desea Transferir este Reclamo?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.transferClaimsFunction(id_claim_receiver, id_claim_transmitter);
      }
    });
  }

  render() {
    const disabledCreate = GetDisabledPermits(this.props.permits, "Create")
    const disabledUpdate = GetDisabledPermits(this.props.permits, "Update")
    const disabledActive = GetDisabledPermits(this.props.permits, "Active")
    const disabledDelete = GetDisabledPermits(this.props.permits, "Delete")
    const disabledDetails = GetDisabledPermits(this.props.permits, "Details")

    return (
      <div>
        {this.state.modal === true &&
          <ModalVisitador
            option={this.state.option}
            modal={this.state.modal}
            modalHeader={this.state.modalHeader}
            modalFooter={this.state.modalFooter}
            disabled={this.state.disabled}
            showHide={this.state.showHide}
            id_receiber={this.state.id_receiber}
            id_transmitter={this.state.id_transmitter}
            branchOffices={this.props.reclamosSelect}
            valorCloseModal={this.valorCloseModal}
            visitor_disable={this.state.visitor_disable}
          />
        }

        {this.state.collapse === true &&
          <Chat
            show={this.state.collapse}
            hide={this.closeChat}
            option={this.state.option}
            id_receiber={this.state.id_receiber}
            id_transmitter={this.state.id_transmitter}
            transmiter={this.props.token.transmiter._id}
            collapse={this.state.collapse}

          />
        }
        <div style={{ "marginBottom": "1.8%" }}>
          <Button color="success"
            onClick={() => this.openModal(1)}
            disabled={disabledCreate}>
            Agregar
        </Button>
        </div>

        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th >Centro Medico Emitente</th>
                  <th >Sucursal que Emite</th>
                  {this.props.master === "MASTER" && <th >Visitador</th>}
                  <th >Estatus</th>
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
                        <td>{list.status}</td>
                        <td style={{ 'minWidth': "205px" }}>
                          {list.made_by_visitor === 0 ?
                            <div className="float-left" >
                              <IconButton aria-label="Delete"
                                title="Ver Reclamo"
                                className="iconButtons"
                                onClick={() => { this.openModal(2, list.id_claim_receiver, list.id_claim_transmitter, list.made_by_visitor); }}
                                disabled={disabledDetails}
                              >
                                <Visibility className="iconTable" />
                              </IconButton>

                              <IconButton aria-label="Delete"
                                title="Transferir Reclamos"
                                className="iconButtons"
                                onClick={() => { this.transferClaims(list.id_claim_receiver, list.id_claim_transmitter); }}
                                disabled={disabledCreate}
                              >
                                <Reply className="iconTable" />
                              </IconButton>

                              <IconButton onClick={() => this.openModal(4, list.id_claim_receiver, list.id_claim_transmitter)}
                                className="iconButtons"
                                disabled={disabledActive}
                              >
                                <StyledBadge badgeContent={list.unread_messages > 0 ? list.unread_messages : null} color="primary">
                                  <QuestionAnswer className="iconTable" />
                                </StyledBadge>
                              </IconButton>

                            </div> :
                            <div className="float-left" >
                              <IconButton aria-label="Delete"
                                title="Ver Reclamo"
                                className="iconButtons"
                                onClick={() => { this.openModal(2, list.id_claim_receiver, list.id_claim_transmitter, list.made_by_visitor); }}
                                disabled={disabledDetails}
                              >
                                <Visibility className="iconTable" />
                              </IconButton>

                              <IconButton aria-label="Delete"
                                title="Transferir Reclamos"
                                className="iconButtons"
                                onClick={() => { this.transferClaims(list.id_claim_receiver, list.id_claim_transmitter); }}
                                disabled={disabledCreate}
                              >
                                <Reply className="iconTable" />
                              </IconButton>

                              <IconButton aria-label="Delete"
                                title="Editar Reclamo"
                                className="iconButtons"
                                onClick={() => { this.openModal(3, list.id_claim_receiver, list.id_claim_transmitter, list.made_by_visitor, list.status); }}
                                disabled={disabledUpdate}
                              >
                                <Edit className="iconTable" />
                              </IconButton>

                              <IconButton aria-label="Delete"
                                title="Rechazar Reclamos"
                                className="iconButtons"
                                onClick={() => { this.deleteRegister(list.id_claim_receiver, list.id_claim_transmitter, jstz.determine().name()); }}
                                disabled={disabledDelete}
                              >
                                <Close className="iconTable" />
                              </IconButton>

                            </div>
                          }
                        </td>
                      </tr>
                    )
                  }) :
                    null
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
}))(Badge);

export default ReclamosReceibeList;
