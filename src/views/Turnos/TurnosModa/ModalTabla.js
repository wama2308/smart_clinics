import React, { Component } from 'react';
import { Card, CardBody, FormGroup, Input } from 'reactstrap';
import { Table } from 'reactstrap';
import Switch from '@material-ui/core/Switch';

class ModalTabla extends Component {

  constructor(props) {
    super(props);
    this.state = {
      campo: '1',
      orden: '',
    }
  }

  handleChangeSwitch = (id, width, height,logoStatus) => event => {
    let obj = {
      id: id,
      width: parseInt(width),
      logoStatus: logoStatus,
      status: event.target.checked,
      height: parseInt(height)
    }
    this.props.setSwitchTableTurnos(obj)
  }

  handleSize = (event, id) => {
    this.props.setSizeTableTurnos(id, event.target.value)
  }


  handlePosition = (event, id) => {
    this.props.setPositionTableTurnos(id, event.target.value)
  }

  handleGroup = (event, id) => {
    this.props.setGroupTableTurnos(id, event.target.value)
  }
  

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <div className="row">
              <FormGroup className="top form-group col-sm-12">
                <div className="error">{this.props.errorListContacs}</div>
                <Table hover responsive borderless>
                  <thead className="thead-light">
                    <tr>
                      <th className="text-left">Campo</th>
                      <th className="text-left">Grupo</th>
                      <th className="text-left">Posicion</th>
                      <th className="text-left">Tamano</th>
                      <th className="text-left">Requerido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.data ? this.props.data.map((list, key) => {
                        return (
                          <tr key={key}>
                            <td>{list.label}</td>
                            <td>
                              <div>
                                <Input disabled={this.props.disabled}
                                  onChange={(event) => this.handleGroup(event, list._id)}
                                  value={list.group} 
                                  type="number"
                                  placeholder="Titulo"
                                  disabled={this.props.disabled}
                                  min={1}
                                  max={100}
                                  style={{"height": "25%"}} 
                                />
                              </div>
                            </td>
                            <td>
                              <div>
                                <Input disabled={this.props.disabled}
                                  onChange={(event) => this.handlePosition(event, list._id)}
                                  value={list.position}
                                  type="number"
                                  placeholder="Titulo"
                                  disabled={this.props.disabled}
                                  min={1}
                                  max={100}
                                  style={{"height": "25%"}}
                                />
                              </div>
                            </td>
                            <td>
                              <div>
                                <Input disabled={this.props.disabled}
                                  onChange={(event) => this.handleSize(event, list._id)}
                                  value={list.size}
                                  type="number"
                                  placeholder="Titulo"
                                  disabled={this.props.disabled}
                                  min={1}
                                  max={100}
                                  style={{"height": "25%"}}
                                />
                              </div>
                            </td>

                            <td>
                              <div>
                                <Switch
                                  onChange={this.handleChangeSwitch(list._id, this.props.width, this.props.height,this.props.logoStatus)}
                                  value={list.required}
                                  id={`checked_${key}`}
                                  name={`checked_${key}`}
                                  color="primary"
                                  checked={list.required}
                                  disabled={this.props.disabled}
                                />
                              </div>
                            </td>
                          </tr>
                        )
                      }) :
                        null
                    }
                  </tbody>
                </Table>
              </FormGroup>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ModalTabla;