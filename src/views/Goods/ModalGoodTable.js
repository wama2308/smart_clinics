import React, { Component } from 'react';
import { Modal, Button } from 'reactstrap';
import { ModalHeader } from 'reactstrap';
import { ModalBody } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { ModalFooter } from 'reactstrap';
import { connect } from "react-redux";
import { Table } from 'reactstrap'
import Select from 'react-select';
import Pagination from '../../components/Pagination';
import { ListItem } from '@material-ui/core';

class ModalGoodTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divFilterSelect: "",
      divFilterSelectError: "",
      arrayFilterSelect: {
        label: "Grupo de Espacios",
        value: 1,
        isDefault: true
      },
      page: 0,
      rowsPerPage: 10,
    }
  }

  closeModal = () => {
    this.setState({
    });
    this.props.valorCloseModal(false);
  };

  handleSelect = arrayFilterSelect => {
    this.setState({
      arrayFilterSelect,
      divFilterSelect: "",
      divFilterSelectError: "",
    })
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };


  handleChangeRowsPerPage = event => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value
    });
  };

  render() {

    const select = [
      {
        label: "Grupo de Espacios",
        value: 1,
        isDefault: true
      },
      {
        label: "Marca",
        value: 2,
        isDefault: false
      },
      {
        label: "Modelo",
        value: 3,
        isDefault: false
      },
      {
        label: "Año",
        value: 4,
        isDefault: false
      }
    ]

    const { rowsPerPage, page } = this.state;
    return (
      <span>
        <Modal
          isOpen={this.props.modal}
          toggle={this.closeModal}
          className="ModalStore">
          <ModalHeader toggle={this.closeModal}>
            {this.props.modalHeader}
          </ModalHeader>
          <ModalBody>
            <div className="row">
              < FormGroup className="top form-group col-sm-6">
                <div className={this.state.divGoodsSelect}>
                  <Select
                    isSearchable="true"
                    //isDisabled={this.props.option !== 3 ? this.props.disabled : true}
                    name="bienes"
                    value={this.state.arrayFilterSelect}
                    defaultValue={select[0]}
                    onChange={this.handleSelect}
                    className="basic-multi-select"
                    options={select}
                  />
                </div>
                {/* <div className="errorSelect">
                  {this.state.divGoodsSelectError}
                </div> */}
              </FormGroup>
              <div className="form-group col-sm-12" style={{ "overflowX": "auto", "marginBottom": "1rem" }}>
                <Table borderless style={{ "borderBottom": "1px solid gray" }}>
                  <thead className="thead-light">
                    <tr style={{
                      "borderLeft": "1px solid gray",
                      "borderRight": "1px solid gray",
                      "borderTop": "1px solid gray",
                    }}>
                      <th style={{
                        "borderRight": "1px solid gray",
                      }}>Grupo de Espacios</th>

                      {
                        this.state.arrayFilterSelect.value > 1 &&
                        <th style={{
                          "borderRight": "1px solid gray",
                        }}>Marca</th>
                      }

                      {
                        this.state.arrayFilterSelect.value > 2 &&
                        <th style={{
                          "textAlign": "center",
                          "borderRight": "1px solid gray"
                        }} >Modelo</th>
                      }

                      {
                        this.state.arrayFilterSelect.value > 3 &&
                        <th style={{
                          "textAlign": "center",
                          "borderRight": "1px solid gray"
                        }}>Año</th>
                      }

                      <th style={{
                        "textAlign": "center",
                        "width": "10%"
                      }}>Cantidad</th>

                    </tr>
                  </thead>
                  <tbody >
                    {this.props.loadTable ? this.props.loadTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((list, listKey) => {
                        return (
                          <tr key={listKey} /*style={{ "borderBottom": "1px solid gray" }}*/ >
                            <td style={{ "border": "1px solid gray" }} >
                              {list.name}
                            </td>

                            {this.state.arrayFilterSelect.value > 1 &&
                              <td style={{
                                "padding": "0px",
                                "borderRight": "1px solid gray"
                              }}>
                                {
                                  list.brand.map((brand, keyBrand) => {
                                    return (
                                      <table key={keyBrand}>
                                        <thead>
                                          <tr>
                                            <th style={{
                                              "paddingTop": "0px",
                                              "paddingBottom": "0px",
                                              "width": "9%"
                                            }}>

                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr >
                                            <td style={{
                                              "paddingRight": "0px",
                                              "width": "3cm",
                                              "borderTop": "1px solid gray",

                                            }}>
                                              {brand.name}
                                            </td>
                                          </tr>
                                          {brand.model.length > 1 &&
                                            < tr >
                                              <td rowSpan={2} style={{ padding: 23 }}>

                                              </td>
                                            </tr>
                                          }
                                        </tbody>
                                      </table>
                                    )
                                  })
                                }
                              </td>
                            }

                            {
                              this.state.arrayFilterSelect.value > 2 &&
                              <td style={{
                                "padding": "0px",
                                "borderRight": "1px solid gray"
                              }}>
                                {
                                  list.brand.map(bran => {
                                    return bran.model.map((model, modelKey) => {
                                      return (
                                        <table key={modelKey}>
                                          <thead>
                                            <tr>
                                              <th style={{
                                                "paddingTop": "0px",
                                                "paddingBottom": "0px",
                                                "width": "9%"
                                              }}>

                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr >
                                              <td style={{
                                                "paddingTop": "12px",
                                                "borderTop": "1px solid gray",
                                                "textAlign": "center"
                                              }} rowSpan="4">
                                                {model.name}
                                              </td>
                                            </tr>
                                           
                                          </tbody>
                                        </table>
                                      )
                                    })
                                  })
                                }
                              </td>
                            }

                            {
                              this.state.arrayFilterSelect.value > 3 &&
                              <td style={{
                                "padding": "0px",
                                "borderRight": "1px solid gray"
                              }}>
                                {
                                  list.brand.map(bran => {
                                    return bran.model.map(model => {
                                      return model.year.map((year, yearKey) => {
                                        return (
                                          <table key={yearKey}>
                                            <thead>
                                              <tr>
                                                <th style={{
                                                  "paddingTop": "0px",
                                                  "paddingBottom": "0px",
                                                  "width": "9%"
                                                }}>

                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr style={{
                                                "paddingTop": "12px",
                                                "borderTop": "1px solid gray"

                                              }} >
                                                <td style={{
                                                  "textAlign": "center"
                                                }} >
                                                  {year.name}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        )
                                      })
                                    })
                                  })
                                }
                              </td>
                            }

                            {
                              this.state.arrayFilterSelect.value > 1 ?
                                <td style={{
                                  "padding": "0px",
                                  "borderRight": "1px solid gray"
                                }}>
                                  {
                                    list.brand.map((brand, brandKey) => {
                                      if ((this.state.arrayFilterSelect.value > 1) &&
                                        (this.state.arrayFilterSelect.value === 2)) {
                                        return (
                                          <table key={brandKey}>
                                            <thead>
                                              <tr>
                                                <th style={{
                                                  "paddingTop": "0px",
                                                  "paddingBottom": "0px",
                                                  "width": "9%"
                                                }}>

                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td style={{
                                                  "textAlign": "center",
                                                  "borderTop": "1px solid gray"
                                                }}
                                                >{brand.quantity}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        )
                                      } else if ((this.state.arrayFilterSelect.value > 2) &&
                                        (this.state.arrayFilterSelect.value === 3)) {
                                        return brand.model.map((model, modelKey) => {
                                          return (
                                            <table key={modelKey}>
                                              <thead>
                                                <tr>
                                                  <th style={{
                                                    "paddingTop": "0px",
                                                    "paddingBottom": "0px",
                                                    "width": "9%"
                                                  }}>

                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td style={{
                                                    "textAlign": "center",
                                                    "borderTop": "1px solid gray"
                                                  }} >
                                                    {model.quantity}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          )
                                        })
                                      } else if ((this.state.arrayFilterSelect.value > 3) &&
                                        (this.state.arrayFilterSelect.value === 4)) {
                                        return brand.model.map(model => {
                                          return model.year.map((year, yearKey) => {
                                            return (
                                              <table key={yearKey}>
                                                <thead>
                                                  <tr>
                                                    <th style={{
                                                      "paddingTop": "0px",
                                                      "paddingBottom": "0px",
                                                      "width": "9%"
                                                    }}>

                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  <tr>
                                                    <td style={{
                                                      "textAlign": "center",
                                                      "borderTop": "1px solid gray"
                                                    }}>
                                                      {year.quantity}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            )
                                          })
                                        })
                                      }
                                    })
                                  }
                                </td> :
                                <td style={{
                                  "textAlign": "center",
                                  "borderTop": "1px solid gray",
                                  "borderRight": "1px solid gray"
                                }}>
                                  {list.quantity}
                                </td>

                            }
                          </tr>
                        )
                      }) : null
                    }
                  </tbody>
                  {
                    this.props.loadTable &&
                    this.props.loadTable.length > 10 && (
                      <Pagination
                        contador={this.props.loadTable}
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
          </ModalBody>
          <ModalFooter>
            <Button className="" color="danger" onClick={this.closeModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </span >
    );
  }
}
const mapStateToProps = state => ({
  goods: state.goods.toJS(),
});

export default connect(mapStateToProps, null)(ModalGoodTable);