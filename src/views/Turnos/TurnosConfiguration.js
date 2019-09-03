import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, InputGroupAddon, InputGroupText, InputGroup, Button, Table } from 'reactstrap'
import TurnosModal from './TurnosModa/TurnosModal';

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
        modalHeader: 'Registrar Reclamo',
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


              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default TurnosConfiguration;