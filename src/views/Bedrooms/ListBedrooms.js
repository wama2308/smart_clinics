import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalBedrooms from './ModalBedrooms';
import { IconButton } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import Pagination from '../../components/Pagination';
import { getArrays } from '../../core/utils';
import Search from "../../components/Select";

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
    let set = ""
    this.props.setSearch(set)
    if (option === 1) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Registrar Espacios',
        modalFooter: 'Guardar',
        disabled: false,
        showHide: 'show',
      })
    } else if (option === 2) {
      this.props.queryOneBedroomsFunction(id)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Espacios',
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
        modalHeader: 'Editar Espacios',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',
        id: id
      })
    } else if (option === 4) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Espacios',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',

      })
    }
  }

  disabledBedroom = id => {
    const message = {
      title: "Desabilitar Espacio",
      info: "¿Esta seguro que desea Desabilitar este Espacio?"
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

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const arrayList = getArrays(this.props.bedrooms);

    const result = this.props.search
      ? arrayList.filter(list => {
        if (this.state.modal === false) {
          return (
            list.number.toString().toLowerCase().includes(this.props.search.toLowerCase()) ||
            list.type.toLowerCase().includes(this.props.search.toLowerCase()) ||
            list.status.toLowerCase().includes(this.props.search.toLowerCase()) ||
            list.floor.toLowerCase().includes(this.props.search.toLowerCase())
          );
        } else {
          return arrayList
        }
      })
      : arrayList;

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
          <div className="container-button" style={{"height": "35%"}}>
            <Button color="success"
              onClick={() => this.openModal(1)}>
              Agregar
            </Button>

            <div style={{ "marginLeft": "1%" }}>
              <Button color="success"
                onClick={() => this.openModal(4)}>
                Edicion Multiple
            </Button>
            </div>
          </div>
          {this.state.modal === false &&
            <div className="containerSearch" >
              <Search value={arrayList} />
            </div>
          }
        </div>

        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th className="text-left" >Numero</th>
                  <th className="text-left" >Piso</th>
                  <th className="text-left" >Tipo</th>
                  <th className="text-left" >Estatus</th>
                  <th className="text-left" >Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.props.bedrooms ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((list, key) => {
                  return (
                    <tr key={key} className="text-left">
                      <td>{list.number}</td>
                      <td>{list.floor}</td>
                      <td>{list.type}</td>
                      <td>{list.status}</td>
                      <td>
                        <div>
                          <IconButton aria-label="Delete"
                            title="Ver Espacio"
                            className="iconButtons" onClick={() => { this.openModal(2, list._id); }}
                          >
                            <Visibility className="iconTable" />
                          </IconButton>

                          <IconButton aria-label="Delete"
                            title="Editar Espacio"

                            className="iconButtons"
                            onClick={() => { this.openModal(3, list._id); }}>
                            <Edit className="iconTable" />
                          </IconButton>

                          <IconButton aria-label="Delete"
                            title="Eliminar Espacio"

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
              {
                this.props.bedrooms && this.props.bedrooms.length > 10 && (
                  <Pagination
                    contador={this.props.bedrooms}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    handleChangePage={this.handleChangePage}
                  />
                )}
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBedrooms;