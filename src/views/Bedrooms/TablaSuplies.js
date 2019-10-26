import React, { Component } from 'react';
import { Table, Input, FormGroup } from 'reactstrap';
import Search from "../../components/DefaultSearch";
import { FaPlusCircle } from 'react-icons/fa';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

class TablaSuplies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cantidadError: this.props.cantidadError
    }
  }

  optionsPatientsStaffAll = options => {
    if (!options) {
      return [];
    }

    if (this.props.option === 1) {
      if (this.props.masivo) {
        let data = [];

        options.map(option => {
          let aux = true
          this.props.dataAccept.map(dat => {
            if (option._id === dat._id) {
              aux = false
              return []
            }
          })
          if (aux) {
            data.push({
              label: `${option.name} / ${option.code}`,
              _id: option._id,
              specific_id: option.specific_id,
              brand: option.brand,
              model: option.model,
              input: true
            });
          }
        });
        return data;

      } else {
        const data = [];
        options.map(option => {
          let aux = true
          this.props.dataAccept.map(dat => {
            if (option._id === dat._id && option.specific_id === dat.specific_id) {
              aux = false
              return []
            }
          })
          if (aux) {
            data.push({
              label: `${option.name} ${option.code} ${option.brand} ${option.model}`,
              _id: option._id,
              specific_id: option.specific_id,
              brand: option.brand,
              model: option.model,
              input: false
            });
          }
        });
        return data;
      }
    } else if (this.props.option === 3) {
      const data = [];
      options.map(option => {
        let aux = true
        this.props.supplies.map(dat => {
          if (option._id === dat._id && option.specific_id === dat.specific_id) {
            aux = false
            return []
          }
        })
        if (aux) {
          data.push({
            label: `${option.name} ${option.code} ${option.brand} ${option.model}`,
            _id: option._id,
            specific_id: option.specific_id,
            brand: option.brand,
            model: option.model,
            input: false
          });
        }
      });
      return data;
    } else if (this.props.option === 4) {
      const data = [];

      options.map(option => {
        let aux = true
        this.props.dataAccept.map(dat => {
          if (option._id === dat._id) {
            aux = false
            return []
          }
        })
        if (aux) {
          data.push({
            label: `${option.name} / ${option.code}`,
            _id: option._id,
            specific_id: option.specific_id,
            brand: option.brand,
            model: option.model,
            input: true
          });
        }
      });
      return data;
    }
  };


  handleChange = (event, id) => {
    const obj = {
      nombre: this.props.nombre,
      piso: this.props.piso,
      abreviatura: this.props.abreviatura
    }
    this.props.setDatasuppies(parseInt(event.target.value), id, this.props.option, obj)
  }

  searchData = (event) => {
    if (this.props.search !== "") {
      if (this.props.option === 4) {
        this.props.queryOneBelongingFunction(event, this.props.option, () => {
          this.props.setOptionSearch()
        })
      } else if (this.props.option === 3) {
        this.props.queryOneBelongingFunction(event, this.props.option, () => {
          this.props.setOptionSearch()
        })
      } else if (this.props.option === 1) {
        if (this.props.masivo === false) {
          this.props.queryOneBelongingFunction(event, this.props.option, () => {
            this.props.setOptionSearch()
          })
        } else {
          this.props.queryOneBelongingFunction(event, this.props.option, () => {
            this.props.setOptionSearch()
          })
        }
      }
    }
  }

  getOption = (event) => {
    if (this.props.option === 1) {
      if (this.props.masivo === true) {
        this.props.searchBelogingFunction(event, true)
      } else {
        this.props.searchBelogingFunction(event, false)
      }
    } else if (this.props.option === 3) {
      this.props.searchBelogingFunction(event, false)
    } else if (this.props.option === 4) {
      this.props.searchBelogingFunction(event, true)
    }
  }

  deleteSupplies = (id, specific_id, code) => {

    this.props.deleteSupplies({
      id: id,
      specific_id: specific_id,
      option: this.props.option,
      status: this.props.check,
      code: code
    })
  }

  render() {
    const optionsPatientsStaffAll = this.optionsPatientsStaffAll(this.props.searchSupplies);
    return (
      <div>
        {this.props.disabled === false &&
          <FormGroup className="top form-group col-sm-6">
            <Search
              pressKey={true}
              placeholder={`Buscar`}
              getOptions={(event) => this.getOption(event)}
              options={optionsPatientsStaffAll}
              searchAction={this.searchData}
            />
          </FormGroup>
        }

        <Table hover responsive borderless>
          <thead className="thead-light">
            {this.props.option === 1 && this.props.masivo === false &&
              <tr>
                <th style={{ "width": "10%" }}>Nombre</th>
                <th style={{ "width": "10%" }}>Codigo</th>
                <th style={{ "width": "10%" }}>Marca</th>
                <th style={{ "width": "10%" }}>Modelo</th>
                <th style={{ "width": "6%" }}>Año</th>
                {/* <th style={{ "width": "11%" }}>Cantidad Disponible</th> */}
                {/* <th style={{ "width": "10%" }}>Cantidad</th> */}
                <th style={{ "width": "6%" }}>Acciones</th>
              </tr>
            }

            {this.props.option === 1 && this.props.masivo === true &&
              <tr>
                <th style={{ "width": "10%" }}>Nombre</th>
                <th style={{ "width": "10%" }}>Codigo</th>
                {/* <th style={{ "width": "10%" }}>Marca</th>
                <th style={{ "width": "10%" }}>Modelo</th>
                <th style={{ "width": "6%" }}>Año</th> */}
                <th style={{ "width": "11%" }}>Cantidad Disponible</th>
                <th style={{ "width": "10%" }}>Cantidad</th>
                <th style={{ "width": "6%" }}>Acciones</th>
              </tr>
            }

            {this.props.option === 3 && this.props.masivo === false &&
              <tr>
                <th style={{ "width": "10%" }}>Nombre</th>
                <th style={{ "width": "10%" }}>Codigo</th>
                <th style={{ "width": "10%" }}>Marca</th>
                <th style={{ "width": "10%" }}>Modelo</th>
                <th style={{ "width": "10%" }}>Serial</th>
                <th style={{ "width": "6%" }}>Año</th>
                {/* <th style={{ "width": "11%" }}>Cantidad Disponible</th> */}
                {/* <th style={{ "width": "10%" }}>Cantidad</th> */}
                <th style={{ "width": "6%" }}>Acciones</th>
              </tr>
            }

            {this.props.option === 4 && this.props.masivo === false &&
              <tr>
                <th style={{ "width": "10%" }}>Nombre</th>
                <th style={{ "width": "10%" }}>Codigo</th>
                {/* <th style={{ "width": "10%" }}>Marca</th>
                <th style={{ "width": "10%" }}>Modelo</th>
                <th style={{ "width": "6%" }}>Año</th> */}
                <th style={{ "width": "11%" }}>Cantidad Disponible</th>
                <th style={{ "width": "10%" }}>Cantidad</th>
                <th style={{ "width": "6%" }}>Acciones</th>
              </tr>
            }

            {this.props.option === 2 && this.props.masivo === false &&
              <tr>
                <th style={{ "width": "10%" }}>Nombre</th>
                <th style={{ "width": "10%" }}>Codigo</th>
                <th style={{ "width": "10%" }}>Marca</th>
                <th style={{ "width": "10%" }}>Modelo</th>
                <th style={{ "width": "10%" }}>Serial</th>
                <th style={{ "width": "6%" }}>Año</th>
                {/* <th style={{ "width": "11%" }}>Cantidad Disponible</th> */}
                {/* <th style={{ "width": "10%" }}>Cantidad</th> */}
                <th style={{ "width": "6%" }}>Acciones</th>
              </tr>
            }
          </thead>
          {this.props.option !== 1 ?
            <tbody>
              {this.props.supplies ? this.props.supplies.map((list, key) => {
                return (
                  <tr key={key} id="1" className="text-left">
                    <td>{list.name}</td>
                    <td>{list.code}</td>
                    {this.props.option === 3 && <td>{list.brand}</td>}
                    {this.props.option === 2 && <td>{list.brand}</td>}
                    {this.props.option === 3 && <td>{list.model}</td>}

                    {this.props.option === 2 && <td>{list.model}</td>}
                    {this.props.option === 2 && <td>{list.serial}</td>}
                    {this.props.option === 3 && <td>{list.serial}</td>}

                    {this.props.option === 3 && <td>{list.year}</td>}
                    {this.props.option === 2 && <td>{list.year}</td>}

                    {this.props.option === 4 && <td className="text-center">{list.quantity_stock}</td>}
                    {/* {this.props.option === 4 &&
                      <th>
                        <div className="float-left">
                          <FormGroup>
                            <Input
                              disabled={this.props.disabled}
                              invalid={list.quantity_stock === 0 && this.props.cantidadInvalid}
                              name={`cantidad_${key}`}
                              id="1"
                              onKeyUp={this.handlekeyHabitaciones}
                              onChange={(event) => this.handleChange(event, list._id)}
                              value={list.cantidad}
                              type="number"
                              placeholder="Cantidad"

                            />
                            <div style={{ "width": "100%" }} className="errorSelect">
                              {list.quantity_stock === 0 && this.props.cantidadError}
                            </div>
                          </FormGroup>
                        </div>
                      </th>
                    } */}

                    {this.props.option === 4 &&
                      <th>
                        <div className="float-left">
                          <FormGroup>
                            <Input
                              disabled={this.props.disabled}
                              invalid={list.quantity_stock === 0 && this.props.cantidadInvalid}
                              name={`cantidad_${key}`}
                              id="2"
                              onKeyUp={this.handlekeyHabitaciones}
                              onChange={(event) => this.handleChange(event, list._id)}
                              value={list.cantidad}
                              type="number"
                              placeholder="Cantidad"

                            />
                            <div style={{ "width": "100%" }} className="errorSelect">
                              {list.cantidad === 0 ? this.props.cantidadError : this.props.cantidadError}
                            </div>
                          </FormGroup>
                        </div>
                      </th>
                    }
                    <td>
                      <div>
                        <IconButton aria-label="Delete"
                          title="Eliminar Reclamo"
                          className="iconButtons"
                          onClick={(event) => { this.deleteSupplies(list._id, list.specific_id, list.code) }}
                          disabled={this.props.disabled}
                        >
                          <Delete className="iconTable" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                )
              }) : null
              }
            </tbody> :
            <tbody>
              {this.props.dataAccept ? this.props.dataAccept.map((list, key) => {
                return (
                  <tr key={key} id="2">
                    <td>{list.name}</td>
                    <td>{list.code}</td>
                    {this.props.option != 1 && this.props.masivo === false && <td>{list.brand}</td>}
                    {this.props.option === 1 && this.props.masivo === false && <td>{list.brand}</td>}

                    {this.props.option != 1 && this.props.masivo === false && <td>{list.model}</td>}
                    {this.props.option === 1 && this.props.masivo === false && <td>{list.model}</td>}

                    {this.props.option != 1 && this.props.masivo === false && <td>{list.year}</td>}
                    {this.props.option === 1 && this.props.masivo === false && <td>{list.year}</td>}

                    {this.props.option != 1 && this.props.masivo === false && <td className="text-center">{list.quantity_stock}</td>}
                    {this.props.option === 1 && this.props.masivo === true && <td className="text-center">{list.quantity_stock}</td>}
                    {this.props.option != 1 && this.props.masivo === false &&
                      <td>
                        <div>
                          <FormGroup>
                            <Input
                              disabled={this.props.disabled}
                              invalid={this.props.cantidadInvalid}
                              name={`cantidad_${key}`}
                              id="3"
                              onKeyUp={this.handlekeyHabitaciones}
                              onChange={(event) => this.handleChange(event, list._id)}
                              value={list.cantidad}
                              type="number"
                              placeholder="Cantidad"

                            />
                            <div style={{ "width": "100%" }} className="errorSelect">
                              {list.cantidad === 0 ? this.props.cantidadError : this.props.cantidadError}
                            </div>
                          </FormGroup>
                        </div>
                      </td>
                    }

                    {this.props.option === 1 && this.props.masivo === true &&
                      <td>
                        <div>
                          <FormGroup>
                            <Input
                              disabled={this.props.disabled}
                              invalid={list.quantity_stock === 0 ? this.props.cantidadInvalid :
                                this.props.calculo > list.quantity_stock && this.props.cantidadInvalid}
                              name={`cantidad_${key}`}
                              id="3"
                              onKeyUp={this.handlekeyHabitaciones}
                              onChange={(event) => this.handleChange(event, list._id)}
                              value={list.cantidad}
                              type="number"
                              placeholder="Cantidad"

                            />
                            <div style={{ "width": "100%" }} className="errorSelect">
                              {list.cantidad === 0 ? this.props.cantidadError : this.props.cantidadError}
                            </div>
                          </FormGroup>
                        </div>
                      </td>}

                    {this.props.option === 4 &&
                      <td>
                        <div>
                          <Input
                            disabled={this.props.disabled}
                            invalid={list.quantity_stock === 0 ? this.props.cantidadInvalid :
                              this.props.calculo > list.quantity_stock && this.props.cantidadInvalid}
                            name={`cantidad_${key}`}
                            id="4"
                            onKeyUp={this.handlekeyHabitaciones}
                            onChange={(event) => this.handleChange(event, list._id)}
                            value={list.cantidad}
                            type="number"
                            placeholder="Cantidad"
                          />
                        </div>
                      </td>
                    }

                    <td>
                      <div>
                        <IconButton aria-label="Delete"
                          title="Eliminar Reclamo"
                          className="iconButtons"
                          onClick={(event) => { this.deleteSupplies(list._id, list.specific_id, list.code) }}
                          disabled={this.props.disabled}
                        >
                          <Delete className="iconTable" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                )
              }) : null
              }
            </tbody>
          }
        </Table>
      </div>
    );
  }
}

export default TablaSuplies;