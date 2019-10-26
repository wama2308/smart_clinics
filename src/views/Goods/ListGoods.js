import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { IconButton, Collapse, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import { Visibility, ExpandMore, List } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import Pagination from '../../components/Pagination';
import { getArrays } from '../../core/utils';
import Search from "../../components/Select";
import ModalGoods from './ModalGoods';
import '../../components/style.css'
import classnames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import PaginationCollapse from '../../components/PaginationCollapse';
import ModalGoodTable from './ModalGoodTable';
import Select from 'react-select';

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
      rowsPerPage: 10,
      specifict_id: "",
      name: "",
      code: "",
      idCollapse: "",
      modalBedrooms: false
    }
  }

  openModal = (obj) => {
    switch (obj.option) {
      case 1:
        this.setState({
          modal: true,
          option: obj.option,
          modalHeader: 'Registrar Bienes',
          modalFooter: 'Guardar',
          disabled: false,
          showHide: 'show',
        })
        break;
      case 2:
        this.props.queryOneBelongingFunction(obj.id, obj.specifict_id)
        this.setState({
          modal: true,
          option: obj.option,
          modalHeader: 'Ver Bienes',
          modalFooter: 'Guardar',
          disabled: true,
          showHide: 'hide',
          id: obj.id
        })
        break;
      case 3:
        this.props.queryOneBelongingFunction(obj.id, obj.specifict_id)
        this.setState({
          modal: true,
          option: obj.option,
          modalHeader: 'Editar Bienes',
          modalFooter: 'Editar',
          disabled: false,
          showHide: 'show',
          id: obj.id,
          specifict_id: obj.specifict_id
        })
        break;
      case 4:
        obj.event.stopPropagation();
        this.setState({
          modal: true,
          option: obj.option,
          modalHeader: 'Editar Bienes',
          modalFooter: 'Editar',
          disabled: false,
          showHide: 'show',
          id: obj.id,
          specifict_id: obj.specifict_id,
          name: obj.name,
          code: obj.code
        })
        break;

      case 5:
        obj.event.stopPropagation();
        this.props.createTable({
          _id: obj.id
        })
        this.setState({
          modalBedrooms: true,
          option: obj.option,
          modalHeader: `${obj.code} en los Espacios`,
          modalFooter: 'Editar',
          disabled: false,
          showHide: 'show',

        })
        break;


      default:
        break;
    }
  }

  disabledGood = (id, specifict_id) => {
    const message = {
      title: "Desabilitar Bienes",
      info: "¿Esta seguro que desea Desabilitar este Mobiliario?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.disabledBelongingFunction({
          id: id,
          specifict_id: specifict_id
        });
      }
    });
  };

  valorCloseModal = (valor) => {
    this.setState({
      modal: valor,
      option: null,
    });
  }

  valorCloseModalBedrooms = (valor) => {
    this.setState({
      modalBedrooms: valor,
      option: null,
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangeRowsPerPageReducer = (event, id) => {
    this.props.rowPagination({ page: 0, rowsPerPage: event.target.value, id: id, option: true })
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangePageReducer = (id, pages) => (event, page) => {
    this.props.nextPage({ page: page, id: id, option: true })
  };

  toggle = () => {
    if (!this.state.collapse) {
      this.setState({
        collapse: true
      })
    } else {
      this.setState({
        collapse: false
      })
    }
  }

  filter = () => {
    const arrayList = getArrays(this.props.goods);
    let eq = this.props.search.toLowerCase(); // variable de comparacion
    const gt = eq.split(' ')
    let expresion = ""
    let data = []
    let aux = true

    gt.map(datos => {
      expresion += `^(?=.*${datos})`;
    });

    let search = new RegExp(expresion, "ism");

    const prueba = eq ? arrayList.map(list => {
      return (!this.state.modal) ? {
        ...list,
        belogings: list.belogings.filter(space => search.test(space.search))
      } : arrayList
    })
      : arrayList;

    prueba.map(dat => {
      if (dat.belogings) {
        if (dat.belogings.length < 1)
          aux = false

        if (aux)
          data.push({ ...dat });

        aux = true;
      }
    });

    return (!this.state.modal) ? data : arrayList;
  }


  render() {
    const { page, rowsPerPage } = this.state
    const arrayList = getArrays(this.props.goods);
    const { classes } = this.props;
    const result = this.filter()

    return (
      <div>
        {
          this.state.modal &&
          <ModalGoods
            option={this.state.option}
            modal={this.state.modal}
            modalHeader={this.state.modalHeader}
            modalFooter={this.state.modalFooter}
            disabled={this.state.disabled}
            showHide={this.state.showHide}
            valorCloseModal={this.valorCloseModal}
            id={this.state.id}
            data={this.props.goods}
            specifict_id={this.state.specifict_id}
            name={this.state.name}
            code={this.state.code}
          />
        }
        {
          this.state.modalBedrooms &&
          <ModalGoodTable
            option={this.state.option}
            modal={this.state.modalBedrooms}
            valorCloseModal={this.valorCloseModalBedrooms}
            modalHeader={this.state.modalHeader}
            modalFooter={this.state.modalFooter}
          />
        }
        <div className="containerGeneral" style={{ "marginBottom": "1.8%" }}>
          <div className="container-button" style={{ "height": "35%" }}>
            <Button color="success"
              onClick={(event) => this.openModal({
                option: 1,
                id: null,
                specifict_id: null,
                name: null,
                event: event,
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
              <tbody>
                {result.length !== 0 ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((list, key) => {
                  return (
                    <tr key={key} className="text-left" /*style={{ "border": " 1px solid #c8ced3" }}*/>
                      <td colSpan="8" >
                        <ExpansionPanel
                          style={{ "margin": "-11.5px", }}
                          expanded={list.expanded}
                        >
                          <ExpansionPanelSummary expandIcon={<ExpandMore />} /*style={{ "padding": "0 0px 0 0px" }}*/>
                            <Typography className={classes.heading5}>{list.name}</Typography>
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
                                      specifict_id: null,
                                      name: list.name,
                                      event: event,
                                      code: list.code
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
                                      specifict_id: null,
                                      name: null,
                                      event: event,
                                      code: list.name
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
                                  <th style={{ "width": "21%" }} className="text-left">Marca</th>
                                  <th style={{ "width": "20%" }} className="text-left">Modelo</th>
                                  <th style={{ "width": "12%" }} className="text-left">Año</th>
                                  <th className="text-left">Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {list.belogings.slice(list.page * list.rowsPerPage, list.page * list.rowsPerPage + list.rowsPerPage).map((beloging, key) => {
                                  return (
                                    <tr key={key}>
                                      <td colSpan="8">
                                        <ExpansionPanelDetails style={{ "padding": "0 0px 0 0px" }}>
                                          <Typography style={{ width: "19%" }}></Typography>
                                          <Typography style={{ "width": "12%" }}>{beloging.code}</Typography>
                                          <Typography style={{ "width": "21%" }}>{beloging.brand}</Typography>
                                          <Typography style={{ "width": "20%" }}>{beloging.model}</Typography>
                                          <Typography style={{ "width": "12%" }}>{beloging.year}</Typography>
                                          <Typography variant="button">
                                            <IconButton aria-label="Delete"
                                              title="Ver Bien"
                                              className="iconButtons"
                                              onClick={
                                                (event) => {
                                                  this.openModal({
                                                    option: 2,
                                                    id: list._id,
                                                    specifict_id: beloging._id,
                                                    name: null,
                                                    event: event,
                                                    code: null
                                                  });
                                                }
                                              }
                                            >
                                              <Visibility className="iconTable" />
                                            </IconButton>
                                          </Typography>
                                          <Typography variant="button">
                                            <IconButton aria-label="Delete"
                                              title="Editar Bien"
                                              className="iconButtons"
                                              onClick={(event) => {
                                                this.openModal(
                                                  {
                                                    option: 3,
                                                    id: list._id,
                                                    specifict_id: beloging._id,
                                                    name: null,
                                                    event: event,
                                                    code: null
                                                  }
                                                );
                                              }
                                              }
                                            >
                                              <Edit className="iconTable" />
                                            </IconButton>
                                          </Typography>
                                          <Typography variant="button">
                                            <IconButton aria-label="Delete"
                                              title="Eliminar Bien"
                                              className="iconButtons"
                                              onClick={
                                                () => {
                                                  this.disabledGood(list._id, beloging._id);
                                                }
                                              }
                                            >
                                              <Delete className="iconTable" />
                                            </IconButton>
                                          </Typography>

                                        </ExpansionPanelDetails>
                                      </td>

                                    </tr>
                                  )
                                })

                                }
                              </tbody>
                              {list.belogings.length > 5 &&
                                <PaginationCollapse
                                  contador={list.belogings}
                                  page={list.page}
                                  rowsPerPage={list.rowsPerPage}
                                  handleChangeRowsPerPage={(e) => this.handleChangeRowsPerPageReducer(e, list._id)}
                                  handleChangePage={this.handleChangePageReducer(list._id)}

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
                this.props.goods && this.props.goods.length > 10 && (
                  <Pagination
                    contador={this.props.goods}
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
      </div>
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

export default withStyles(styles)(ListGoods);