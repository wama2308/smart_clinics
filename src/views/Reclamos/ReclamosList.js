import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Visibility, QuestionAnswer } from '@material-ui/icons';
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

class ReclamosList extends Component {
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
      const time = jstz.determine().name()
      this.props.setStatusMessageFunction(id_claim_receiver, id_claim_transmitter, time)
      this.props.loadMessageFunction(id_claim_receiver, id_claim_transmitter)
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
      title: "Eliminar Registro",
      info: "¿Esta seguro que desea eliminar este registro?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.deleteReclamosFuction(id_claim_receiver, id_claim_transmitter);
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
        {
          this.state.modal === true &&
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
          />
        }

        {
          this.state.collapse === true &&
          <Chat show={this.state.collapse}
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
                  <th style={{ width: "12%" }}>C.M Emitente</th>
                  <th style={{ width: "12%" }}>C.M Receptor</th>
                  <th style={{ width: "10%" }}>Sucursal Emitente</th>
                  <th style={{ width: "10%" }}>Sucursal Receptora</th>
                  <th style={{ width: "10%" }}>Visitador</th>
                  <th style={{ width: "10%" }}>Estatus</th>
                  <th style={{ width: "10%" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.list ? this.props.list.map((list, key) => {
                    return (
                      <tr key={key}>
                        <td>{list.medical_center_transmitter}</td>
                        <td>{list.medical_center_receiver}</td>
                        <td>{list.branchoffice_transmitter}</td>
                        <td>{list.branchoffice_receiver}</td>
                        <td>{list.visitor}</td>
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
                              title="Editar Reclamo"
                              className="iconButtons"
                              onClick={() => { this.openModal(3, list.id_claim_receiver, list.id_claim_transmitter); }}
                              disabled={disabledUpdate}
                            >
                              <Edit className="iconTable" />
                            </IconButton>

                            <IconButton aria-label="Delete"
                              title="Eliminar Reclamo"
                              className="iconButtons"
                              onClick={() => { this.deleteRegister(list.id_claim_receiver, list.id_claim_transmitter); }}
                              disabled={disabledDelete}
                            >
                              <Delete className="iconTable" />
                            </IconButton>

                            <IconButton
                              onClick={() => this.openModal(4, list.id_claim_receiver, list.id_claim_transmitter)}
                              className="iconButtons"
                              disabled={disabledActive}
                            >
                              <StyledBadge badgeContent={list.unread_messages > 0 ? list.unread_messages : null} color="primary">
                                <QuestionAnswer className="iconTable" />
                              </StyledBadge>
                            </IconButton>

                          </div>
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


export default ReclamosList;
