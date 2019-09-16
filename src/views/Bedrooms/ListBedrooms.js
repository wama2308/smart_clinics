import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalBedrooms from './ModalBedrooms';
import { IconButton } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';

class ListBedrooms extends Component {
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
      visitor: null,
      page: 0,
      rowsPerPage: 10
    }
  }

  openModal = (option, id) => {
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
      this.props.queryOneBedroomsFunction(id)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Reclamo',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
        id: id
      })
    } else if (option === 3) {
      this.props.queryOneBedroomsFunction(id)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Reclamo',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',
        id: id
      })
    } else if (option === 4) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Reclamo',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',

      })
    }
  }

  disabledBedroom = id => {
    const message = {
      title: "Desabilitar Habitacion",
      info: "¿Esta seguro que desea Desabilitar este Habitacion?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.disabledBedroomsFuntion(id);
      }
    });
  };


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
          <ModalBedrooms
            option={this.state.option}
            modal={this.state.modal}
            modalHeader={this.state.modalHeader}
            modalFooter={this.state.modalFooter}
            disabled={this.state.disabled}
            showHide={this.state.showHide}
            valorCloseModal={this.valorCloseModal}
            type_bedrooms={this.props.type_bedrooms}
            data={this.props.bedrooms}
            status_room={this.props.status_room}
            id={this.state.id}
            type_consulting_room={this.props.type_consulting_room}
          />
        }
        <div className="containerGeneral" style={{ "marginBottom": "1.8%" }}>
          <div className="container-button">
            <Button color="success"
              onClick={() => this.openModal(1)}
            >
              Agregar
            </Button>

            <div style={{ "marginLeft": "3%" }}>
              <Button color="success"
                onClick={() => this.openModal(4)}
              >
                Edicion Multiple
            </Button>
            </div>
          </div>
          <div className="containerSearch" >

          </div>
        </div>

        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th >Numero</th>
                  <th >Tipo</th>
                  <th >Estatus</th>
                  <th >Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.props.bedrooms ? this.props.bedrooms.map((list, key) => {
                  return (
                    <tr key={key}>
                      <td>{list.number}</td>
                      <td>{list.type}</td>
                      <td>{list.status}</td>
                      <td>
                        <div>
                          <IconButton aria-label="Delete"
                            title="Ver Compra"
                            className="iconButtons" onClick={() => { this.openModal(2, list._id); }}
                          >
                            <Visibility className="iconTable" />
                          </IconButton>

                          <IconButton aria-label="Delete"
                            title="Editar Compra"

                            className="iconButtons"
                            onClick={() => { this.openModal(3, list._id); }}>
                            <Edit className="iconTable" />
                          </IconButton>

                          <IconButton aria-label="Delete"
                            title="Eliminar Compra"

                            className="iconButtons"
                            onClick={() => { this.disabledBedroom(list._id); }}>
                            <Delete className="iconTable" />
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

export default ListBedrooms;