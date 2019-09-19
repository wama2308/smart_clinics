import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';
import Search from "../../components/DefaultSearch";

class TablaSuplies extends Component {


  optionsPatientsStaffAll = options => {
    if (!options) {
      return [];
    }
    const data = [];
    options.map(option => {
      data.push({
        label: `${option.name}-${option.code}`,
        _id: option._id,
        code: option.code
      });
    });
    return data;
  };


  handleChange = (event, id) => {
    this.props.setDatasuppies(parseInt(event.target.value), id, this.props.option)
  }

  searchData = (event) => {
    this.props.queryOneBelongingFunction(event, this.props.option)
  }

  render() {
    const optionsPatientsStaffAll = this.optionsPatientsStaffAll(this.props.searchSupplies);
    return (
      <div>
        {this.props.disabled === false &&
          <div style={{ "marginBottom": "2%", "width": "50%" }}>
            <Search
              pressKey={true}
              placeholder={`Buscar`}
              getOptions={this.props.searchBelogingFunction}
              options={optionsPatientsStaffAll}
              searchAction={this.searchData}

            />
          </div>
        }


        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th>Nombre</th>
                  <th>Codigo</th>
                  <th>Modelo</th>
                  <th>Año</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              {this.props.option !== 1 ?
                <tbody>
                  {this.props.supplies ? this.props.supplies.map((list, key) => {
                    return (
                      <tr key={key}>
                        <td>{list.name}</td>
                        <td>{list.code}</td>
                        <td>{list.model}</td>
                        <td>{list.year}</td>

                        {this.props.option !== 4 &&
                          <td>
                            <div>
                              <Input
                                disabled={this.props.disabled}
                                name="hasta"
                                id="hasta"
                                onKeyUp={this.handlekeyHabitaciones}
                                onChange={(event) => this.handleChange(event, list._id)}
                                value={list.quantity_stock}
                                type="number"
                                placeholder="Cantidad"
                              />
                            </div>
                          </td>
                        }

                        {this.props.option === 4 &&
                          <td>
                            <div>
                              <Input
                                disabled={this.props.disabled}
                                name="hasta"
                                id="hasta"
                                onKeyUp={this.handlekeyHabitaciones}
                                onChange={(event) => this.handleChange(event, list._id)}
                                value={list.quantity_stock}
                                type="number"
                                placeholder="Cantidad"
                              />
                            </div>
                          </td>
                        }
                      </tr>
                    )
                  }) : null
                  }
                </tbody> :
                <tbody>
                  {this.props.dataAccept ? this.props.dataAccept.map((list, key) => {
                    return (
                      <tr key={key}>
                        <td>{list.name}</td>
                        <td>{list.code}</td>
                        <td>{list.model}</td>
                        <td>{list.year}</td>

                        <td>
                          <div>
                            <Input
                              disabled={this.props.disabled}
                              name="hasta"
                              id="hasta"
                              onKeyUp={this.handlekeyHabitaciones}
                              onChange={(event) => this.handleChange(event, list._id)}
                              value={list.cantidad}
                              type="number"
                              placeholder="Cantidad"
                            />
                          </div>
                        </td>

                        {this.props.option === 4 &&
                          <td>
                            <div>
                              <Input
                                disabled={this.props.disabled}
                                name="hasta"
                                id="hasta"
                                onKeyUp={this.handlekeyHabitaciones}
                                onChange={(event) => this.handleChange(event, list._id)}
                                value={list.cantidad}
                                type="number"
                                placeholder="Cantidad"
                              />
                            </div>
                          </td>
                        }
                      </tr>
                    )
                  }) : null
                  }
                </tbody>
              }
            </Table>
          </div>
        </div>
      </div >
    );
  }
}

export default TablaSuplies;