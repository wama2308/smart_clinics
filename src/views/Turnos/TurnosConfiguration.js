import React, { Component } from 'react';
import { Table } from 'reactstrap'
import TurnosModal from './TurnosModa/TurnosModal';
import { IconButton } from '@material-ui/core';
import { Visibility, Edit } from '@material-ui/icons';
import { FaFileAlt } from 'react-icons/fa';

class TurnosConfiguration extends Component {
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
      branchoffices_id: ''
    }
  }

  openModal = (option, branchoffices_id) => {
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
      this.props.queryOneTicketFunction(branchoffices_id)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Configuracion',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
        branchoffices_id: branchoffices_id
      })
    } else if (option === 3) {
      this.props.queryOneTicketFunction(branchoffices_id)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Configuracion',
        modalFooter: 'Guardar',
        disabled: false,
        showHide: 'show',
        branchoffices_id: branchoffices_id
      })
    } else if (option === 4) {
      this.props.loadOriginalTurnos()
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Configuracion Original',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
        branchoffices_id: branchoffices_id
      })
    }
  }

  valorCloseModal = (valor) => {
    this.setState({
      modal: valor,
      option: null,
    });
  }

  render() {

    return (
      <div>
        {
          this.state.modal === true &&
          <TurnosModal
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
            visitor={this.state.visitor}
            branchoffices_id={this.state.branchoffices_id}
          />
        }
        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th style={{ width: "10%" }}>Sucursal</th>
                  <th style={{ width: "10%" }}>Ancho</th>
                  <th style={{ width: "10%" }}>Largo</th>
                  <th style={{ width: "10%" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.turnos ? this.props.turnos.map((list, key) => {

                    return (
                      <tr key={key}>
                        <td>{list.branchoffices_name}</td>
                        <td>{list.width}</td>
                        <td>{list.height}</td>
                        <td>
                          <div className="float-left" >

                            <IconButton
                              aria-label="Delete"
                              title="Ver Configuracion Original"
                              className="iconButtons"
                              onClick={() => {
                                this.openModal(4, list.branchoffices_id);
                              }}
                            >
                              <FaFileAlt className="iconTable" />
                            </IconButton>
                            <IconButton aria-label="Delete"
                              title="Ver Configuracion Editada"
                              className="iconButtons"
                              onClick={() => { this.openModal(2, list.branchoffices_id); }}

                            >
                              <Visibility className="iconTable" />
                            </IconButton>

                            <IconButton aria-label="Delete"
                              title="Editar Configuracion"
                              className="iconButtons"
                              onClick={() => { this.openModal(3, list.branchoffices_id); }}

                            >
                              <Edit className="iconTable" />
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

export default TurnosConfiguration;