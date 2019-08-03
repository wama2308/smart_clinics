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
      collapse: false
    }
  }
  openModal = (option, pos, id, sucursalId) => {
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
      this.props.LoadStoreIdFunction(id, sucursalId);
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Reclamo',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
      })
    } else if (option === 3) {
      this.props.LoadStoreIdFunction(id, sucursalId);
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Reclamo',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',
        position: pos,
        id: id,
        sucursal_id_now: sucursalId
      })
    }
  }

  valorCloseModal = (valor) => {
    this.setState({
      modal: valor,
      option: 0,
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

  render() {
    return (
      <div>
        <LightBox />
        <ModalReclamos
          option={this.state.option}
          modal={this.state.modal}
          modalHeader={this.state.modalHeader}
          modalFooter={this.state.modalFooter}
          disabled={this.state.disabled}
          showHide={this.state.showHide}
          id={this.state.id}
          sucursal_id_now={this.state.sucursal_id_now}
          branchOffices={this.props.reclamos}
          valorCloseModal={this.valorCloseModal}
        />
        <Chat show={this.state.collapse}
          hide={this.closeChat}
        />

        <div style={{ "marginBottom": "1.8%" }}>
          <Button color="success"
            onClick={() => this.openModal(1)}>
            Agregar
        </Button>
        </div>
        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th style={{ width: "10%" }}>Centro Medico Emitente</th>
                  <th style={{ width: "10%" }}>Centro Medico Receptor</th>
                  <th style={{ width: "10%" }}>Sucursal que Emite</th>
                  <th style={{ width: "10%" }}>Sucursal que Recive</th>
                  <th style={{ width: "10%" }}>Visitador</th>
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
                        <td style={{ 'minWidth': "205px" }}>
                          <div className="float-left" >
                            <IconButton aria-label="Delete"
                              title="Ver Reclamo"
                              className="iconButtons"
                            //onClick={() => { this.openModal(2, data.number, data._id, data.branchoffice.value); }}
                            >
                              <Visibility className="iconTable" />
                            </IconButton>

                            <IconButton aria-label="Delete"
                              title="Editar Reclamo"
                              className="iconButtons"
                            //onClick={() => { this.openModal(3, data.number, data._id, data.branchoffice.value); }}
                            >
                              <Edit className="iconTable" />
                            </IconButton>

                            <IconButton aria-label="Delete"
                              title="Eliminar Reclamo"
                              className="iconButtons"
                            //onClick={() => { this.deleteStore(data._id, data.branchoffice.value); }}
                            >
                              <Delete className="iconTable" />
                            </IconButton >
                            <IconButton onClick={() => this.toggle()} className="iconButtons">
                              <QuestionAnswer className="iconTable" />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    )
                  }) :
                    <div style={{ height: "55vh" }}>
                      <CircularProgress style={{ position: " absolute", height: 40, top: "45%", right: "50%", zIndex: 2 }} />
                    </div>

                }
              </tbody>

            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ReclamosList;