import React, { Component } from 'react';
import { Modal, Button, FormFeedback, InputGroup, InputGroupAddon } from 'reactstrap';
import { ModalHeader } from 'reactstrap';
import { ModalBody } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { Label } from 'reactstrap';
import { ModalFooter } from 'reactstrap';
import { Input } from 'reactstrap';
import { connect } from "react-redux";
import { FormControlLabel } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { createBelongingFunction, editBelongingFunction } from '../../actions/GoodsAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Table } from 'reactstrap'
import Select from 'react-select';

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



  // filterTable = (datos) => {
  //   let arrayClean = []
  //     (this.state.arrayFilterSelect) ? this.state.arrayFilterSelect.map(option => {
  //       let aux = true
  //       datos.map(dat => {
  //         if (option.value === dat._id) {
  //           aux = false
  //           return []
  //         }
  //       })
  //       if (aux) {
  //         data.push({
  //           label: `${option.name} / ${option.code}`,
  //           _id: option._id,
  //           specific_id: option.specific_id,
  //           brand: option.brand,
  //           model: option.model,
  //           input: true
  //         });
  //       }
  //     }) : datos

  //   return data;

  // }
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
                <Table borderless>
                  <thead className="thead-light">
                    <tr>
                      <th>Grupo de Espacios</th>
                      {this.state.arrayFilterSelect.value > 1 && <th>Marca</th>}
                      {this.state.arrayFilterSelect.value > 2 && <th>Modelo</th>}
                      {this.state.arrayFilterSelect.value > 3 && <th>Año</th>}
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.goods.loadTable ? this.props.goods.loadTable.map((list, listKey) => {
                      return (
                        <tr key={listKey} >
                          <td >
                            {list.name}
                          </td>

                          {this.state.arrayFilterSelect.value > 1 &&
                            <td style={{
                              "paddingTop": "0px",
                              "paddingLeft": "0px",
                              "paddingRight": "0px",
                              "paddingBottom": "0px",
                            }}>
                              {
                                list.brand.map((brand, keyBrand) => {
                                  return (
                                    <table key={keyBrand}>
                                      <thead>
                                        <th style={{
                                          "paddingTop": "0px",
                                          "paddingBottom": "0px",
                                          "width": "9%"
                                        }}>

                                        </th>
                                      </thead>
                                      <tbody>
                                        <tr >
                                          <td style={{
                                            "paddingRight": "0px",
                                            "width": "3cm",

                                          }}>
                                            {brand.name}
                                          </td>
                                        </tr>
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
                              "paddingTop": "0px",
                              "paddingLeft": "0px",
                              "paddingRight": "0px",
                              "paddingBottom": "0px",
                            }}>
                              {
                                list.brand.map(bran => {
                                  return bran.model.map((model, modelKey) => {
                                    return (
                                      <table key={modelKey}>
                                        <thead>
                                          <th style={{
                                            "paddingTop": "0px",
                                            "paddingBottom": "0px",
                                            "width": "9%"
                                          }}>

                                          </th>
                                        </thead>
                                        <tbody>
                                          <tr >
                                            <td style={{
                                              "paddingTop": "12px",

                                            }}>{model.name}</td>
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
                              "paddingTop": "0px",
                              "paddingLeft": "0px",
                              "paddingRight": "0px",
                              "paddingBottom": "0px",
                            }}>
                              {
                                list.brand.map(bran => {
                                  return bran.model.map(model => {
                                    return model.year.map((year, yearKey) => {
                                      return (
                                        <table key={yearKey}>
                                          <thead>
                                            <th style={{
                                              "paddingTop": "0px",
                                              "paddingBottom": "0px",
                                              "width": "9%"
                                            }}>

                                            </th>
                                          </thead>
                                          <tbody>
                                            <tr style={{
                                              "paddingTop": "12px",

                                            }} >
                                              <td >{year.name}</td>
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
                                "paddingTop": "0px",
                                "paddingLeft": "0px",
                                "paddingRight": "0px",
                                "paddingBottom": "0px"
                              }}>
                                {
                                  list.brand.map((brand, brandKey) => {
                                    if ((this.state.arrayFilterSelect.value > 1) && (this.state.arrayFilterSelect.value === 2)) {
                                      return (
                                        <table key={brandKey}>
                                          <thead>
                                            <th style={{
                                              "paddingTop": "0px",
                                              "paddingBottom": "0px",
                                              "width": "9%"
                                            }}>

                                            </th>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td style={{ "borderRight": "1px solid" }}>{brand.quantity}</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      )
                                    } else if ((this.state.arrayFilterSelect.value > 2) && (this.state.arrayFilterSelect.value === 3)) {
                                      return brand.model.map((model, modelKey) => {
                                        return (
                                          <table key={modelKey}>
                                            <thead>
                                              <th style={{
                                                "paddingTop": "0px",
                                                "paddingBottom": "0px",
                                                "width": "9%"
                                              }}>

                                              </th>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td  >{model.quantity}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        )
                                      })
                                    } else if ((this.state.arrayFilterSelect.value > 3) && (this.state.arrayFilterSelect.value === 4)) {
                                      return brand.model.map(model => {
                                        return model.year.map((year, yearKey) => {
                                          return (
                                            <table key={yearKey}>
                                              <thead>
                                                <th style={{
                                                  "paddingTop": "0px",
                                                  "paddingBottom": "0px",
                                                  "width": "9%"
                                                }}>

                                                </th>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td  >{year.quantity}</td>
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
                              <td>{list.quantity}</td>

                          }
                        </tr>
                      )
                    }) : null
                    }
                  </tbody>
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