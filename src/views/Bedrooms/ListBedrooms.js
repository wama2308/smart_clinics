import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalBedrooms from './ModalBedrooms';
import { IconButton, Collapse, TableHead, TableRow, TableCell } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import Pagination from '../../components/Pagination';
import { getArrays } from '../../core/utils';
import Search from "../../components/Select";
import classnames from "classnames";

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
      rowsPerPage: 10,
      activeTab: "1",
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

  toggle = (id, type) => {
    this.props.collapseFunction(id, type)
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { rowsPerPage, page } = this.state;
    // const arrayList = getArrays(this.props.bedrooms);

    // const result = this.props.search
    //   ? arrayList.filter(list => {
    //     if (this.state.modal === false) {
    //       return (
    //         list.number.toString().toLowerCase().includes(this.props.search.toLowerCase()) ||
    //         list.type.toLowerCase().includes(this.props.search.toLowerCase()) ||
    //         list.status.toLowerCase().includes(this.props.search.toLowerCase()) ||
    //         list.floor.toLowerCase().includes(this.props.search.toLowerCase())
    //       );
    //     } else {
    //       return arrayList
    //     }
    //   })
    //   : arrayList;

    const mod =
    {
      enabled: [{
        _id: "123",
        type_id: '321',
        category: "category 1",
        status: true,
        spaces: [{
          _id: "52525",
          floor: "piso1",
          code: "hfghf1",
          type: "type",
          status: "ocupado",
          name: "name1"
        },
        {
          _id: "hfhfuy",
          floor: "piso1",
          code: "hfghf1",
          type: "type",
          status: "ocupado",
          name: "name2"
        }
        ]
      },
      {
        _id: "123",
        type_id: '321',
        category: "category 2",
        status: false,
        spaces: [{
          _id: "52525",
          floor: "piso1",
          code: "hfghf1",
          type: "type",
          status: "ocupado",
          name: "name1"
        }]
      },
      {
        _id: "123",
        type_id: '321',
        category: "category 3",
        status: false,
        spaces: [{
          _id: "52525",
          floor: "piso1",
          code: "hfghf1",
          type: "type",
          status: "ocupado",
          name: "name1"
        }]
      }]
    }
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
          <div className="container-button" style={{ "height": "35%" }}>
            <Button color="success"
              onClick={() => this.openModal(1)}>
              Agregar
            </Button>

          </div>
          {/* {this.state.modal === false &&
            <div className="containerSearch" >
              <Search value={arrayList} />
            </div>
          } */}
        </div>

        <div className="row">
          <div className="form-group col-sm-12">
            <Table responsive borderless>
              <thead className="thead-light">
                <tr style={{ "border": " 1px solid #c8ced3" }}>
                  <th className="text-left">Nro</th>
                  <th style={{ width: "12%" }} className="text-left">Tipo</th>
                  <th /*style={{ width: "29%" }}*/>Departamento</th>
                  <th className="text-left">Codigo</th>
                  <th /*style={{ width: "29%" }}*/ >Nombre</th>
                  <th className="text-left">Piso</th>
                  <th className="text-left">Estatus</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              {this.props.bedrooms ? this.props.bedrooms.map((list, key) => {
                return (
                  <tbody key={key}>
                    <tr className="text-left" style={{ "border": " 1px solid #c8ced3" }}>
                      <td>{`1 - ${list.rank}`}</td>
                      <td>{list.category}</td>
                      {list.type_name !== "" ? <td>{list.type_name}</td> : <td>N/A</td>}
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="text-center">
                        <div style={{ height: "15px" }}
                        >
                          <IconButton aria-label="Delete"
                            title="Ver Espacio"
                            className="iconButtons"
                            onClick={() => { this.toggle(list._id, list.type_name); }}
                          >
                            <Visibility className="iconTable" />
                          </IconButton>

                          <IconButton aria-label="Delete"
                            title="Editar Espacio"
                            className="iconButtons"
                            onClick={() => { this.openModal(4); }}>
                            <Edit className="iconTable" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>


                    <tr className="text-left">
                      {list.status === true && <td></td>}
                      {list.status === true && <td></td>}
                      {list.status === true && <td></td>}
                      {list.status === true &&
                        <td colSpan="7" style={{ "padding": "0%" }}>
                          <Collapse in={list.status}>
                            <div>
                              <Table responsive borderless>

                                <tbody>
                                  {list.spaces.map((space, key) => {
                                    return (
                                      <tr key={key} style={{ "border": " 1px solid #c8ced3" }} >
                                        <td style={{ width: "18%" }}>{space.code}</td>
                                        <td style={{ width: "20%" }}>{space.name}</td>
                                        <td style={{ width: "14%" }}>{space.floor}</td>
                                        <td style={{ width: "19%" }}>{space.status}</td>
                                        <td className="text-center">
                                          <div style={{ height: "15px" }} >
                                            <IconButton aria-label="Delete"
                                              title="Ver Espacio"
                                              className="iconButtons"
                                              onClick={() => { this.openModal(2, list._id); }}
                                            >
                                              <Visibility className="iconTable" />
                                            </IconButton>

                                            <IconButton aria-label="Delete"
                                              title="Editar Espacio"
                                              className="iconButtons"
                                              onClick={() => { this.openModal(3, list._id); }}>
                                              <Edit className="iconTable" />
                                            </IconButton>

                                          </div>
                                        </td>
                                      </tr>
                                    )
                                  })
                                  }
                                </tbody>
                              </Table>
                            </div>
                          </Collapse>
                        </td>}
                    </tr>

                  </tbody>
                )
              }) : null
              }

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
      </div >
    );
  }
}


export default ListBedrooms;