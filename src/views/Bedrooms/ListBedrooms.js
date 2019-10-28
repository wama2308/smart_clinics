import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalBedrooms from './ModalBedrooms';
import { IconButton, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, ListItemIcon } from '@material-ui/core';
import { Visibility, ExpandMore, List } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import Pagination from '../../components/Pagination';
import { getArrays } from '../../core/utils';
import Search from "../../components/Select";
import classnames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import ModalTabla from './ModalTabla';
import '../../components/style.css'
import PaginationCollapse from '../../components/PaginationCollapse';

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
      expanded: null,
      category: '',
      type_name: "",
      modalTable: false
    }
  }

  openModal = (obj) => {
    obj.event.stopPropagation();
    let set = ""
    this.props.setSearch(set)
    switch (obj.option) {
      case 1:
        this.setState({
          modal: true,
          option: obj.option,
          modalHeader: 'Registrar Espacios',
          modalFooter: 'Guardar',
          disabled: false,
          showHide: 'show',
        })
        break;

      case 2:
        this.props.queryOneBedroomsFunction(obj.id)
        this.setState({
          modal: true,
          option: obj.option,
          modalHeader: 'Ver Espacio',
          modalFooter: 'Guardar',
          disabled: true,
          showHide: 'hide',
          id: obj.id
        })
        break;

      case 3:
        this.props.queryOneBedroomsFunction(obj.id)
        this.setState({
          modal: true,
          option: obj.option,
          modalHeader: 'Editar Espacio',
          modalFooter: 'Editar',
          disabled: false,
          showHide: 'show',
          id: obj.id
        })
        break;

      case 4:
        this.props.setType(obj.id)
        this.setState({
          modal: true,
          option: obj.option,
          modalHeader: 'Editar Espacios',
          modalFooter: 'Editar',
          disabled: false,
          showHide: 'show',
          category: obj.category,
          type_name: obj.type,
          id: obj.id
        })
        break;

      case 5:
        this.props.queryBedroomsBelongingsFunction({
          input: obj.value,
          _id: obj.id,
          type_office: obj.type
        })
        this.setState({
          modalTable: true,
          option: obj.option,
          modalHeader: `Mobiliario General de ${obj.type_name ? obj.type_name : obj.category}`
        })
        break;

      case 6:
        this.props.queryBedroomsBelongingsFunction({
          input: obj.value,
          _id: obj.id,
          type_office: obj.category
        })
        this.setState({
          modalTable: true,
          option: obj.option,
          modalHeader: `Mobiliario de ${obj.code}`
        })
        break;

      default:
        break;
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

  valorCloseModalTable = (valor) => {
    this.setState({
      modalTable: valor,
      option: null,
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value
    });
  };

  handleChangeRowsPerPageReducer = (event, id, type_id) => {
    this.props.rowPagination({
      type_id: type_id,
      page: 0,
      rowsPerPage: event.target.value,
      id: id,
      option: true
    })
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangePageReducer = (id, type_id, pages) => (event, page) => {
    this.props.nextPage({
      type_id: type_id,
      page: page,
      id: id,
      option: true
    })
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

  // handleChange = (panel, status) => (event, expanded) => {
  //   this.setState({
  //     expanded: expanded ? panel : false,
  //   });
  // };

  // filter = () => {
  //   const arrayList = getArrays(this.props.bedrooms);
  //   let eq = this.props.search.toLowerCase(); // variable de comparacion
  //   const gt = eq.split(' ')
  //   let expresion = ""
  //   let data = []
  //   let aux = true

  //   gt.map(datos => {
  //     expresion += `^(?=.*${datos})`;
  //   });

  //   let search = new RegExp(expresion, "ism");

  //   const prueba = eq ? arrayList.map(list => {
  //     return (!this.state.modal) ? {
  //       ...list,
  //       spaces: list.spaces.filter(space => search.test(space.search))
  //     } : arrayList
  //   })
  //     : arrayList;

  //   prueba.map(dat => {
  //     if (dat.spaces.length === 0)
  //       aux = false

  //     if (aux)
  //       data.push({ ...dat });

  //     aux = true;
  //   });

  //   return (!this.state.modal) ? data : arrayList;
  // }

  // collapse = () => {
  //   if (!!this.props.search) {
  //     return !!this.props.search
  //   } else {
  //     return null
  //   }
  // }

  render() {
    const { rowsPerPage, page } = this.state;
    const arrayList = getArrays(this.props.bedrooms);
    // const prueba = this.filter()
    // const expan = this.collapse();
    const { classes } = this.props;

    return (
      <div>
        {
          this.state.modal &&
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
            category={this.state.category}
            type_name={this.state.type_name}
            search={this.props.setSearch}
            searchData={this.props.search}
          />
        }
        {
          this.state.modalTable &&
          <ModalTabla
            modal={this.state.modalTable}
            valorCloseModalTable={this.valorCloseModalTable}
            option={this.state.option}
            modalHeader={this.state.modalHeader}
          />
        }
        <div className="containerGeneral" style={{ "marginBottom": "1.8%" }}>
          <div className="container-button" style={{ "height": "35%" }}>
            <Button color="success"
              title="Registrar Espacios"
              onClick={(event) => this.openModal({
                option: 1,
                id: null,
                category: null,
                type: null,
                event: event,
                value: null,
                code: null
              })}>
              Agregar
            </Button>

          </div>
          {!this.state.modal &&
            <div className="containerSearch" >
              <Search value={arrayList} />
            </div>
          }
        </div>

        <div className="flex">
          <div className="inner-flex"
            style={{ width: '100%', height: '31rem', overflow: 'auto', "marginBottom": "1rem" }} >
            <Table borderless style={{ "minWidth": "900px" }}>
              {/* <thead className="thead-light">
                <tr >
                  <th style={{ "width": "14%", "padding": "2%" }} className="text-left"></th>
                  <th style={{ "width": "14%" }} className="text-left"></th>
                  <th style={{ "width": "12%" }} className="text-left"></th>
                  <th style={{ "width": "14%" }} className="text-left"></th>
                  <th style={{ "width": "12%" }} className="text-left"></th>
                  <th style={{ "width": "12%" }} className="text-left"></th>
                  <th className="text-left"></th>
                </tr>
              </thead> */}
              <tbody>
                {this.props.bedrooms ? this.props.bedrooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((list, key) => {
                  return (
                    <tr key={key} className="text-left" /*style={{ "border": " 1px solid #c8ced3" }}*/>
                      <td colSpan="8" >
                        <ExpansionPanel
                          style={{ "margin": "-11.5px", }}
                        // onChange={this.handleChange(`panel${key}`)}
                        // expanded={expan}
                        >
                          <ExpansionPanelSummary expandIcon={<ExpandMore />} /*style={{ "padding": "0 0px 0 0px" }}*/>
                            {/* <Typography className={classes.heading}>{`1 - ${list.rank}`}</Typography> */}

                            {
                              list.type_name === "" ?
                                <Typography className={classes.heading5}>{list.category}</Typography> :
                                <Typography className={classes.heading5}>{list.type_name}</Typography>
                            }

                            <Typography variant="button" style={{ "height": "10px" }}>
                              <IconButton
                                aria-label="Delete"
                                title="Edicion Masiva"
                                className="iconButtons"
                                onClick={
                                  (event) => {
                                    this.openModal({
                                      option: 4,
                                      id: list._id,
                                      category: list.category,
                                      type: list.type_office,
                                      event: event,
                                      value: null,
                                      code: list.type_name
                                    });
                                  }
                                }
                              >
                                <Edit className="iconTable" />
                              </IconButton>
                            </Typography>

                            <Typography variant="button" style={{ "height": "10px" }}>
                              <IconButton
                                aria-label="Delete"
                                title="Mobiliario General"
                                className="iconButtons"
                                onClick={
                                  (event) => {
                                    this.openModal({
                                      option: 5,
                                      id: list._id,
                                      category: list.category,
                                      type: list.type_office,
                                      type_name: list.type_name,
                                      event: event,
                                      value: 1,
                                      code: list.type_name
                                    });
                                  }
                                }
                              >
                                <List className="iconTable" />
                              </IconButton>
                            </Typography>

                            <Typography className={classes.spacing}></Typography>

                            {
                              list.type_name != "" ?
                                <Typography className={classes.heading2}></Typography> :
                                <Typography className={classes.heading2}></Typography>
                            }

                            <Typography className={classes.heading3}></Typography>
                            <Typography className={classes.heading2}></Typography>
                            <Typography className={classes.heading3}></Typography>
                            <Typography className={classes.heading3}></Typography>

                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails style={{ "padding": "0 0px 0 0px" }}>
                            <Table responsive borderless style={{ "paddingRight": "0px" }}>
                              <thead className="thead-light">
                                <tr >
                                  {/* <td style={{ width: "6%" }}></td> */}
                                  <td style={{ width: "18%" }}></td>
                                  <th style={{ "width": "12%" }} className="text-left">Codigo</th>
                                  <th style={{ "width": "21%" }} className="text-left">Nombre</th>
                                  <th style={{ "width": "20%" }} className="text-left">Piso</th>
                                  <th style={{ "width": "12%" }} className="text-left">Estatus</th>
                                  <th className="text-left">Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {list.spaces.slice(list.page * list.rowsPerPage, list.page * list.rowsPerPage + list.rowsPerPage).map((spaces, key) => {
                                  return (
                                    <tr key={key}>
                                      <td></td>
                                      <td colSpan="6" style={{ "padding": "0px" }}>
                                        <ExpansionPanelDetails style={{ "padding": "0 0px 0 0px" }}>
                                          {/* <Typography style={{ width: "18%" }}></Typography> */}
                                          <Typography style={{ "width": "14.3%", "padding": "12px" }}>{spaces.code}</Typography>
                                          <Typography style={{ "width": "26%", "padding": "12px" }}>{spaces.name}</Typography>
                                          <Typography style={{ "width": "24.1%", "padding": "12px" }}>{spaces.floor}</Typography>
                                          <Typography style={{ "width": "15%", "padding": "12px" }}>{spaces.status}</Typography>
                                          <Typography variant="button" style={{ "paddingTop": "9px" }}>
                                            <IconButton aria-label="Delete"
                                              title="Ver Espacio"
                                              className="iconButtons"
                                              onClick={
                                                (event) => {
                                                  this.openModal({
                                                    option: 2,
                                                    id: spaces._id,
                                                    category: null,
                                                    type: null,
                                                    event: event,
                                                    value: null,
                                                    code: null
                                                  });
                                                }
                                              }
                                            >
                                              <Visibility className="iconTable" />
                                            </IconButton>
                                          </Typography>
                                          <Typography variant="button" style={{ "paddingTop": "9px" }}>
                                            <IconButton aria-label="Delete"
                                              title="Editar Espacio"
                                              className="iconButtons"
                                              onClick={(event) => {
                                                this.openModal({
                                                  option: 3,
                                                  id: spaces._id,
                                                  category: null,
                                                  type: null,
                                                  event: event,
                                                  value: null,
                                                  code: null
                                                });
                                              }}
                                            >
                                              <Edit className="iconTable" />
                                            </IconButton>
                                          </Typography>

                                          <Typography variant="button" style={{ "paddingTop": "9px" }}>
                                            <IconButton aria-label="Delete"
                                              title="Eliminar Espacio"
                                              className="iconButtons"
                                              onClick={
                                                () => {
                                                  this.disabledBedroom(spaces._id);
                                                }
                                              }
                                            >
                                              <Delete className="iconTable" />
                                            </IconButton>
                                          </Typography>

                                          <Typography variant="button" style={{ "paddingTop": "9px" }}>
                                            <IconButton aria-label="Delete"
                                              title="Mobiliario del Espacio"
                                              className="iconButtons"
                                              onClick={
                                                (event) => {
                                                  this.openModal({
                                                    option: 6,
                                                    id: spaces._id,
                                                    category: list.category,
                                                    type: list.type_name,
                                                    event: event,
                                                    value: 0,
                                                    code: spaces.name
                                                  });
                                                }
                                              }
                                            >
                                              <List className="iconTable" />
                                            </IconButton>
                                          </Typography>
                                        </ExpansionPanelDetails>
                                      </td>
                                    </tr>
                                  )
                                })
                                }
                              </tbody>
                              {list.spaces.length > 5 &&
                                <PaginationCollapse
                                  contador={list.spaces}
                                  page={list.page}
                                  rowsPerPage={list.rowsPerPage}
                                  handleChangeRowsPerPage={(e) => this.handleChangeRowsPerPageReducer(e, list._id, list.type_office)}
                                  handleChangePage={this.handleChangePageReducer(list._id, list.type_office)}
                                  nextPage={this.props.nextPage}
                                  idCollapse={this.state.idCollapse}
                                />
                              }
                            </Table>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
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
                )
              }
            </Table>
          </div>
        </div>
      </div >
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '6%',
  },
  heading2: {
    flexBasis: '14%',
  },
  heading3: {
    flexBasis: '12.4%',
  },
  heading4: {
    flexBasis: '11%',
  },
  heading5: {
    width: '120px',
  },
  spacing: {
    flexBasis: '35%'
  },

  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

export default withStyles(styles)(ListBedrooms);