import React, { Component } from 'react';
import { HowToReg, ExpandMore, Visibility, Delete } from '@material-ui/icons';
import { IconButton, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, } from '@material-ui/core';
import { Table } from 'reactstrap'
import Pagination from '../../components/Pagination';
import { withStyles } from '@material-ui/core/styles';

class ListDisabledBedrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
    }
  }


  activarEspacio = (id) => {
    const message = {
      title: "Activar Espacio",
      info: "¿Esta seguro que desea activar este Espacio?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enabledBedroomsFunction(id);
      }
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChange = (panel, status) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const { expanded } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className="containerGeneral" style={{ "marginBottom": "1.8%" }}>
          <div className="container-button" style={{ "height": "35%" }}>

          </div>
          {/* {this.state.modal === false &&
          <div className="containerSearch" >
            <Search value={arrayList} />
          </div>
        } */}
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
                {this.props.bedrooms ? this.props.bedrooms.map((list, key) => {
                  return (
                    <tr key={key} className="text-left" /*style={{ "border": " 1px solid #c8ced3" }}*/>
                      <td colSpan="8" >
                        <ExpansionPanel
                          square
                          expanded={expanded === `panel${key}`}
                          style={{ "margin": "-11.5px", }}
                          onChange={this.handleChange(`panel${key}`)}
                        >
                          <ExpansionPanelSummary expandIcon={<ExpandMore />} /*style={{ "padding": "0 0px 0 0px" }}*/>
                            {/* <Typography className={classes.heading}>{`1 - ${list.rank}`}</Typography> */}

                            {
                              list.type_name === "" ?
                                <Typography className={classes.heading5}>{list.category}</Typography> :
                                <Typography className={classes.heading5}>{list.type_name}</Typography>
                            }

                            {/* <Typography variant="button" style={{ "height": "10px" }}>
                              <IconButton
                                aria-label="Delete"
                                title="Edicion Masiva"
                                className="iconButtons"
                                onClick={
                                  (event) => {
                                    this.openModal(4, null, list.category, list.type_name, event);
                                  }
                                }
                              >
                                <Edit className="iconTable" />
                              </IconButton>
                            </Typography> */}

                            {/* <Typography variant="button" style={{ "height": "10px" }}>
                              <IconButton
                                aria-label="Delete"
                                title="Moviliario General"
                                className="iconButtons"
                                onClick={
                                  (event) => {
                                    this.openModal(5, list._id, list.type_office, list.type_name, event, 1);
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
                                  <th style={{ "width": "21%" }} className="text-left">Nombre</th>
                                  <th style={{ "width": "20%" }} className="text-left">Piso</th>
                                  <th style={{ "width": "12%" }} className="text-left">Estatus</th>
                                  <th className="text-left">Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {list.spaces.map((spaces, key) => {
                                  return (
                                    <tr key={key}>
                                      <td colSpan="8">
                                        <ExpansionPanelDetails style={{ "padding": "0 0px 0 0px" }}>
                                          <Typography style={{ width: "19%" }}></Typography>
                                          <Typography style={{ "width": "12%" }}>{spaces.code}</Typography>
                                          <Typography style={{ "width": "22.5%" }}>{spaces.name}</Typography>
                                          <Typography style={{ "width": "19%" }}>{spaces.floor}</Typography>
                                          <Typography style={{ "width": "12%" }}>{spaces.status}</Typography>
                                          <Typography variant="button">
                                          </Typography>
                                          <IconButton aria-label="Delete"
                                            title="Habilitar Espacio"
                                            className="iconButtons"
                                            onClick={
                                              () => {
                                                this.activarEspacio(spaces._id);
                                              }
                                            }
                                          >
                                            <HowToReg className="iconTable" />
                                          </IconButton>

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

export default withStyles(styles)(ListDisabledBedrooms);