import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { IconButton } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import Pagination from '../../components/Pagination';
import { getArrays } from '../../core/utils';
import Search from "../../components/Select";
import ModalGoods from './ModalGoods';


class ListGoods extends Component {
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
        modalHeader: 'Registrar Bienes',
        modalFooter: 'Guardar',
        disabled: false,
        showHide: 'show',
      })
    } else if (option === 2) {
      this.props.queryOneBelongingFunction(id)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Bienes',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
        id: id
      })
    } else if (option === 3) {
      this.props.queryOneBelongingFunction(id)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Bienes',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',
        id: id
      })
    }
  }

  disabledGood = id => {
    const message = {
      title: "Desabilitar Bienes",
      info: "¿Esta seguro que desea Desabilitar este Mobiliario?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.disabledBelongingFunction(id);
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
    const { page, rowsPerPage } = this.state
    const arrayList = getArrays(this.props.goods);

    const result = this.props.search
      ? arrayList.filter(list => {
        if (this.state.modal === false) {
          return (
            list.quantity.toString().toLowerCase().includes(this.props.search.toLowerCase()) ||
            list.brand.toLowerCase().includes(this.props.search.toLowerCase()) ||
            list.code.toLowerCase().includes(this.props.search.toLowerCase()) ||
            list.name.toLowerCase().includes(this.props.search.toLowerCase())
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
          <ModalGoods
            option={this.state.option}
            modal={this.state.modal}
            modalHeader={this.state.modalHeader}
            modalFooter={this.state.modalFooter}
            disabled={this.state.disabled}
            showHide={this.state.showHide}
            valorCloseModal={this.valorCloseModal}
            id={this.state.id}
          />
        }
        <div className="containerGeneral" style={{ "marginBottom": "1.8%" }}>
          <div className="container-button" style={{ "height": "35%" }}>
            <Button color="success"
              onClick={() => this.openModal(1)}>
              Agregar
            </Button>
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
                  <th className="text-left" >Nombre</th>
                  <th className="text-left" >Codigo</th>
                  <th className="text-left" >Marca</th>
                  <th className="text-left" >Cantidad</th>
                  <th className="text-left" >Año</th>
                </tr>
              </thead>
              <tbody>
                {this.props.goods ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((list, key) => {
                  return (
                    <tr key={key} className="text-left">
                      <td>{list.name}</td>
                      <td>{list.code}</td>
                      <td>{list.brand}</td>
                      <td>{list.quantity}</td>
                      <td>
                        <div>
                          <IconButton aria-label="Delete"
                            title="Ver Mobiliario"
                            className="iconButtons" onClick={() => { this.openModal(2, list._id); }}
                          >
                            <Visibility className="iconTable" />
                          </IconButton>

                          <IconButton aria-label="Delete"
                            title="Editar Mobiliario"

                            className="iconButtons"
                            onClick={() => { this.openModal(3, list._id); }}>
                            <Edit className="iconTable" />
                          </IconButton>

                          <IconButton aria-label="Delete"
                            title="Eliminar Mobiliario"

                            className="iconButtons"
                            onClick={() => { this.disabledGood(list._id); }}>
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
                this.props.goods && this.props.goods.length > 10 && (
                  <Pagination
                    contador={this.props.goods}
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

export default ListGoods;