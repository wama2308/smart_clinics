import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalBedrooms from './ModalBedrooms';
import { IconButton, Collapse, TableHead, TableRow, TableCell, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import Pagination from '../../components/Pagination';
import { getArrays } from '../../core/utils';
import Search from "../../components/Select";
import classnames from "classnames";
import { withStyles } from '@material-ui/core/styles';

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
      expanded: ""
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

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

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

    const { expanded } = this.state;
    const { classes } = this.props;
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
                {/* <tr style={{ "border": " 1px solid #c8ced3" }}> */}
                <tr >
                  <th style={{ "width": "6%" }} className="text-left">Rango</th>
                  <th style={{ "width": "14%" }} className="text-left">Tipo</th>
                  <th style={{ "width": "14%" }} className="text-left">Departamento</th>
                  <th style={{ "width": "12%" }} className="text-left">Codigo</th>
                  <th style={{ "width": "14%" }} className="text-left">Nombre</th>
                  <th style={{ "width": "12%" }} className="text-left">Piso</th>
                  <th style={{ "width": "12%" }} className="text-left">Estatus</th>
                  <th className="text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.props.bedrooms ? this.props.bedrooms.map((list, key) => {
                  return (
                    <tr key={key} className="text-left" /*style={{ "border": " 1px solid #c8ced3" }}*/>
                      <td colSpan="8" >
                        <ExpansionPanel
                          square
                          expanded={expanded === `panel${key}`}
                          onChange={this.handleChange(`panel${key}`)}
                          style={{ "margin": "-12px", }}
                        >
                          <ExpansionPanelSummary /*style={{ "padding": "0 0px 0 0px" }}*/>
                            {/* <Table responsive borderless style={{ "paddingRight": "0px" }}>
                              <tbody>
                                <tr>
                                  <td style={{ width: "6.5%" }}>{`1 - ${list.rank}`}</td>
                                  <td style={{ width: "14.5%", "textlign": "center" }}>{list.category}</td>
                                  {list.type_name !== "" ? <td style={{ "width": "14%" }}>{list.type_name}</td> : <td style={{ "width": "14%" }}> N/A</td>}
                                  <td style={{ width: "12%" }} ></td>
                                  <td style={{ width: "14%" }}></td>
                                  <td style={{ width: "12%" }}></td>
                                  <td style={{ width: "12%" }}></td>
                                  <td>
                                    <div className="float-center" >
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
                              </tbody>
                            </Table> */}
                            <Typography className={classes.heading}>{`1 - ${list.rank}`}</Typography>
                            <Typography className={classes.heading2}>{list.category}</Typography>
                            {list.type_name != "" ?
                              <Typography className={classes.heading2}>{list.type_name}</Typography> :
                              <Typography className={classes.heading2}>N/A</Typography>
                            }
                            <Typography className={classes.heading3}></Typography>
                            <Typography className={classes.heading2}></Typography>
                            <Typography className={classes.heading3}></Typography>
                            <Typography className={classes.heading3}></Typography>
                            <div  style={{ "height": "25px" }} className="float-center" >
                              <IconButton aria-label="Delete"
                                title="Ver Reclamo"
                                className="iconButtons"
                                onClick={() => { this.handleChange(`panel${key}`)}}

                              >
                                <Visibility className="iconTable" />
                              </IconButton>


                              <IconButton aria-label="Delete"
                                title="Editar Reclamo"
                                className="iconButtons"
                                onClick={() => { this.openModal(4); }}

                              >
                                <Edit className="iconTable" />
                              </IconButton>

                            </div>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails style={{ "padding": "0 0px 0 0px" }}>
                            <Table responsive borderless style={{ "paddingRight": "0px" }}>
                              <tbody>
                                {list.spaces.map((spaces, key) => {
                                  return (
                                    <tr key={key}>
                                      <td style={{ width: "6%" }}></td>
                                      <td style={{ width: "14%" }}></td>
                                      <td style={{ width: "14%" }}></td>
                                      <td style={{ width: "11%" }}>{spaces.code}</td>
                                      <td style={{ width: "14%" }}>{spaces.name}</td>
                                      <td style={{ width: "12%" }}>{spaces.floor}</td>
                                      <td style={{ width: "12%" }}>{spaces.status}</td>
                                      <td>
                                        <div className="float-center" >
                                          <IconButton aria-label="Delete"
                                            title="Ver Reclamo"
                                            className="iconButtons"
                                            onClick={() => { this.openModal(2, spaces._id); }}

                                          >
                                            <Visibility className="iconTable" />
                                          </IconButton>


                                          <IconButton aria-label="Delete"
                                            title="Editar Reclamo"
                                            className="iconButtons"
                                            onClick={() => { this.openModal(3, spaces._id); }}

                                          >
                                            <Edit className="iconTable" />
                                          </IconButton>

                                          <IconButton aria-label="Delete"
                                            title="Eliminar Reclamo"
                                            className="iconButtons"
                                            onClick={() => { this.deleteRegister(list.id_claim_receiver, list.id_claim_transmitter); }}

                                          >
                                            <Delete className="iconTable" />
                                          </IconButton>
                                        </div>
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

  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

export default withStyles(styles)(ListBedrooms);