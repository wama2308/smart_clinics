import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { IconButton, Collapse, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import { Visibility, ExpandMore } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import Pagination from '../../components/Pagination';
import { getArrays } from '../../core/utils';
import Search from "../../components/Select";
import ModalGoods from './ModalGoods';
import '../../components/style.css'
import classnames from "classnames";
import { withStyles } from '@material-ui/core/styles';

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
      code: ""
    }
  }

  openModal = (option, id, specifict_id, name, event, code) => {
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
      this.props.queryOneBelongingFunction(id, specifict_id)
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
      this.props.queryOneBelongingFunction(id, specifict_id)
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Bienes',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',
        id: id,
        specifict_id: specifict_id
      })
    } else if (option === 4) {
      event.stopPropagation();
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Bienes',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',
        id: id,
        specifict_id: specifict_id,
        name: name,
        code:code
      })
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

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  toggle = () => {
    if (this.state.collapse === false) {
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
    const result = this.props.search
      ? arrayList.filter(list => {

        if (this.state.modal === false) {
          let eq = this.props.search.toLowerCase(); // variable de comparacion
          return (
            list.name.toLowerCase().includes(eq) |
            list.belogings.some(space => {
              return (
                space.brand.toLowerCase().includes(eq) ||
                space.model.toLowerCase().includes(eq) ||
                space.code.toLowerCase().includes(eq) ||
                space.year.toLowerCase().includes(eq)
              )
            })
          )
        } else {
          return arrayList
        }
      })
      : arrayList;

    const prueba = this.props.search
      ? result.map(list => {
        if (this.state.modal === false) {
          let eq = this.props.search.toLowerCase();
          return {
            ...list,
            belogings: list.belogings.filter(space => {
              return (
                space.brand.toLowerCase().includes(eq) ||
                space.model.toLowerCase().includes(eq) ||
                space.code.toLowerCase().includes(eq) ||
                space.year.toLowerCase().includes(eq)
              )
            })
          }
        } else {
          return arrayList
        }
      })
      : arrayList;

    if (this.state.modal === false) {
      return prueba
    } else {
      return arrayList
    }
  }


  render() {
    const { page, rowsPerPage } = this.state
    const arrayList = getArrays(this.props.goods);
    const { classes } = this.props;
    const result = this.filter()

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
            data={this.props.goods}
            specifict_id={this.state.specifict_id}
            name={this.state.name}
            code={this.state.code}
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

        <div className="flex">
          <div className="inner-flex"
            style={{ width: '100%', height: '31rem', overflow: 'auto', "marginBottom": "1rem" }} >
            <Table borderless style={{ "minWidth": "900px" }}>
              <tbody>
                {this.props.goods ? result.map((list, key) => {
                  return (
                    <tr key={key} className="text-left" /*style={{ "border": " 1px solid #c8ced3" }}*/>
                      <td colSpan="8" >
                        <ExpansionPanel
                          style={{ "margin": "-11.5px", }}
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
                                    this.openModal(4, list._id, null, list.name, event, list.code);
                                  }
                                }
                              >
                                <Edit className="iconTable" />
                              </IconButton>
                            </Typography>

                            {/* <Typography variant="button" style={{ "height": "10px" }}>
                              <IconButton
                                aria-label="Delete"
                                title="Mobiliario General"
                                className="iconButtons"
                                onClick={
                                  (event) => {
                                    this.openModal(5, list._id, list.type_office, list.type_name, event, 1, list.category);
                                  }
                                }
                              >
                                <List className="iconTable" />
                              </IconButton>
                            </Typography> */}

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
                                {list.belogings.map((beloging, key) => {
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
                                              title="Ver Espacio"
                                              className="iconButtons"
                                              onClick={
                                                (event) => {
                                                  this.openModal(2, list._id, beloging._id);
                                                }
                                              }
                                            >
                                              <Visibility className="iconTable" />
                                            </IconButton>
                                          </Typography>
                                          <Typography variant="button">
                                            <IconButton aria-label="Delete"
                                              title="Editar Espacio"
                                              className="iconButtons"
                                              onClick={(event) => { this.openModal(3, list._id, beloging._id); }}
                                            >
                                              <Edit className="iconTable" />
                                            </IconButton>
                                          </Typography>
                                          <Typography variant="button">
                                            <IconButton aria-label="Delete"
                                              title="Eliminar Espacio"
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