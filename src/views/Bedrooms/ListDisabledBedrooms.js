import React, { Component } from 'react';
import { HowToReg } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Table } from 'reactstrap'

class ListDisabledBedrooms extends Component {

  activarProveedor = (id) => {
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

  render() {
    return (
      <div>
        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th>Numero</th>
                  <th>Tipo</th>
                  <th>Estatus</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.props.bedrooms ? this.props.bedrooms.map((list, key) => {
                  return (
                    <tr key={key}>
                      <td>{list.number}</td>
                      <td>{list.type}</td>
                      <td>{list.status}</td>
                      <td>
                        <div>
                          <IconButton aria-label="Delete"
                            title="Activar Espacio"
                            className="iconButtons"
                            onClick={() => { this.activarProveedor(list._id); }}>
                            <HowToReg className="iconTable" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  )
                }) : null
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListDisabledBedrooms;