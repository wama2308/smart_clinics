import React, { Component } from 'react';
import { Table } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import { HowToReg, ExpandMore, Visibility, Edit, Delete } from '@material-ui/icons';
import Pagination from '../../components/Pagination';
import { getArrays } from '../../core/utils';
import Search from "../../components/Select";
import { Collapse, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

class ListGoodDisabled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10
    }
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  enabledGoods = (id, specifict_id) => {
    const message = {
      title: "Activar Mobiliario",
      info: "¿Esta seguro que desea Activar este Mobiliario?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enabledBelongingFunction({
          _id: id,
          specific_id: specifict_id
        });
      }
    });
  }

  render() {
    const { page, rowsPerPage } = this.state
    const arrayList = getArrays(this.props.goods);
    const { classes } = this.props;

    const result = this.props.search
      ? arrayList.filter(list => {
        return (
          list.quantity.toString().toLowerCase().includes(this.props.search.toLowerCase()) ||
          list.brand.toLowerCase().includes(this.props.search.toLowerCase()) ||
          list.code.toLowerCase().includes(this.props.search.toLowerCase()) ||
          list.name.toLowerCase().includes(this.props.search.toLowerCase())
        );
      })
      : arrayList;

    return (
      <div>
        <div className="containerGeneral" style={{ "marginBottom": "1.8%" }}>
          <div className="container-button" style={{ "height": "35%" }}>
          </div>
          <div className="containerSearch" >
            <Search value={arrayList} />
          </div>
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
                {this.props.goods ? this.props.goods.map((list, key) => {
                  return (
                    <tr key={key} className="text-left" /*style={{ "border": " 1px solid #c8ced3" }}*/>
                      <td colSpan="8" >
                        <ExpansionPanel
                          style={{ "margin": "-11.5px", }}
                        // onChange={this.handleChange(`panel${key}`)}
                        >
                          <ExpansionPanelSummary expandIcon={<ExpandMore />} /*style={{ "padding": "0 0px 0 0px" }}*/>
                            {/* <Typography className={classes.heading}>{`1 - ${list.rank}`}</Typography> */}

                            <Typography className={classes.heading5}>{list.name}</Typography>

                            <Typography variant="button" style={{ "height": "10px" }}>
                              {/* <IconButton
                                aria-label="Delete"
                                title="Edicion Masiva"
                                className="iconButtons"
                                onClick={
                                  (event) => {
                                    this.openModal(4, list._id);
                                  }
                                }
                              >
                                <Edit className="iconTable" />
                              </IconButton> */}
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
                                              title="Eliminar Espacio"
                                              className="iconButtons"
                                              onClick={
                                                () => {
                                                  this.enabledGoods(list._id, beloging._id);
                                                }
                                              }
                                            >
                                              <HowToReg className="iconTable" />
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

export default withStyles(styles)(ListGoodDisabled);