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
      collapse : false
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
    if(this.state.collapse === false){
      this.setState({
        collapse: true
      });
    }else{
      this.setState({
        collapse: false
      });
    }
  }
  closeChat =() =>{
    this.setState({
      collapse: false
    })
  }

  render() {
    const prueba = [
      {
        "numero": 1,
        "username": "Pruena1",
        "email": ["prueba1@gamil.com"],
        "centromedico": "centro1",
        "sucursal": "sucursal1",
        "visitador": "1visitador"
      },
      {
        "numero": 2,
        "username": "Pruena2",
        "email": ["prueba2@gamil.com"],
        "centromedico": "centro1",
        "sucursal": "sucursal1",
        "visitador": "1visitador"
      },
      {
        "numero": 3,
        "username": "Pruena3",
        "email": ["prueba3@gamil.com"],
        "centromedico": "centro1",
        "sucursal": "sucursal1",
        "visitador": "1visitador"
      },
      {
        "numero": 4,
        "username": "Pruena4",
        "email": ["prueba4@gamil.com"],
        "centromedico": "centro1",
        "sucursal": "sucursal1",
        "visitador": "1visitador"
      }
    ]
    return (
      <div>
        <ModalReclamos
          option={this.state.option}
          modal={this.state.modal}
          modalHeader={this.state.modalHeader}
          modalFooter={this.state.modalFooter}
          disabled={this.state.disabled}
          showHide={this.state.showHide}
          id={this.state.id}
          sucursal_id_now={this.state.sucursal_id_now}
          branchOfficces={this.props.branchOfficces}
          valorCloseModal={this.valorCloseModal}
        />
        <Chat show={this.state.collapse}
        hide={this.closeChat}
        />
        <Button color="success"
          onClick={() => { this.openModal(1); }}>
          Agregar
        </Button>
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th style={{ width: "2%" }}>Nro</th>
              <th style={{ width: "10%" }}>Usuario</th>
              <th style={{ width: "10%" }}>Correo</th>
              <th style={{ width: "10%" }}>Centro Medico</th>
              <th style={{ width: "10%" }}>Sucursal</th>
              <th style={{ width: "10%" }}>Visitador</th>
              <th style={{ width: "10%" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              prueba ? prueba.map(prueba => {
                return (
                  <tr key={prueba.numero}>
                    <td>{prueba.numero}</td>
                    <td>{prueba.username}</td>
                    <td>{prueba.email[0]}</td>
                    <td>{prueba.centromedico}</td>
                    <td>{prueba.sucursal}</td>
                    <td>{prueba.visitador}</td>
                    <td style={{ 'minWidth': "205px" }}>
                      <div className="float-left" >
                        <IconButton aria-label="Delete"
                          title="Ver Almacen"
                          className="iconButtons"
                        //onClick={() => { this.openModal(2, data.number, data._id, data.branchoffice.value); }}
                        >
                          <Visibility className="iconTable" />
                        </IconButton>

                        <IconButton aria-label="Delete"
                          title="Editar Almacen"
                          className="iconButtons"
                        //onClick={() => { this.openModal(3, data.number, data._id, data.branchoffice.value); }}
                        >
                          <Edit className="iconTable" />
                        </IconButton>

                        <IconButton aria-label="Delete"
                          title="Eliminar Almacen"
                          className="iconButtons"
                        //onClick={() => { this.deleteStore(data._id, data.branchoffice.value); }}
                        >
                          <Delete className="iconTable" />
                        </IconButton>
                        <IconButton  onClick={() => this.toggle()} className="iconButtons">
                          <QuestionAnswer className="iconTable" />
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
    );
  }
}

export default ReclamosList;