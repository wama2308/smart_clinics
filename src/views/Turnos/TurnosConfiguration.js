import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, InputGroupAddon, InputGroupText, InputGroup, Button, Table } from 'reactstrap'
import TurnosModal from './TurnosModa/TurnosModal';
import { IconButton } from '@material-ui/core';
import { Visibility, Edit } from '@material-ui/icons';

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
      //this.props.queryOneReclamos(id_claim_receiver, id_claim_transmitter)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Reclamo',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
        id_receiber: id_claim_receiver,
        id_transmitter: id_claim_transmitter,
        visitor: made_by_visitor
      })
    } else if (option === 3) {
      //this.props.queryOneReclamos(id_claim_receiver, id_claim_transmitter)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Reclamo',
        modalFooter: 'Guardar',
        disabled: false,
        showHide: 'show',
        id_receiber: id_claim_receiver,
        id_transmitter: id_claim_transmitter
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

    const obj = [
      {
        sucursal: "sucursal1",
        width: "10",
        height: "10"
      },
      {
        sucursal: "sucursal2",
        width: "10",
        height: "10"
      },
      {
        sucursal: "sucursal2",
        width: "10",
        height: "10"
      }
    ]

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
          />
        }

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
                  <th style={{ width: "10%" }}>Sucursal</th>
                  <th style={{ width: "10%" }}>Ancho</th>
                  <th style={{ width: "10%" }}>Largo</th>
                  <th style={{ width: "10%" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  obj ? obj.map((list, key) => {

                    return (
                      <tr key={key}>
                        <td>{list.sucursal}</td>
                        <td>{list.width}</td>
                        <td>{list.height}</td>
                        <td>
                          <div className="float-left" >
                            <IconButton aria-label="Delete"
                              title="Ver Reclamo"
                              className="iconButtons"
                              onClick={() => { this.openModal(2, list.id_claim_receiver, list.id_claim_transmitter, list.made_by_visitor); }}

                            >
                              <Visibility className="iconTable" />
                            </IconButton>

                            <IconButton aria-label="Delete"
                              title="Editar Reclamo"
                              className="iconButtons"
                              onClick={() => { this.openModal(3, list.id_claim_receiver, list.id_claim_transmitter, list.made_by_visitor, list.status); }}
                              
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