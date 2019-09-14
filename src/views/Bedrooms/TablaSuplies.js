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
    if (this.props.option === 3) {
      this.props.queryOneBelongingFunction(event, this.props.option)
    } else {
      this.props.queryOneBelongingFunction(event, this.props.option)
    }

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
                  <th >Nombre</th>
                  {this.props.option === 4 && <th >Code</th>}
                  {this.props.option === 4 && <th >Modelo</th>}
                  {this.props.option === 4 && <th >Ano</th>}
                  {this.props.option === 4 && <th >Cantidad Disponible</th>}
                  < th > Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {this.props.supplies ? this.props.supplies.map((list, key) => {
                  return (
                    <tr key={key}>
                      <td>{list.name}</td>
                      {this.props.option === 4 && <td>{list.code}</td>}
                      {this.props.option === 4 && <td>{list.model}</td>}
                      {this.props.option === 4 && <td>{list.year}</td>}
                      {this.props.option === 4 ?
                        <td>{list.quantity}</td>
                        :
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
                              placeholder="Nro Habitaciones"
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
                              value={list.cantidad}
                              type="number"
                              placeholder="Nro Habitaciones"
                            />
                          </div>
                        </td>
                      }
                    </tr>
                  )
                }) : null
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div >
    );
  }
}

export default TablaSuplies;