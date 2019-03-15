import React from "react";
import { Table } from "reactstrap";

class Licencias extends React.Component {
  render() {
     return (
      <div className="container">
        <p className="text-muted">Licencias de su Centro Medico</p>
        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th class="text-center">Licencia</th>
                  <th class="text-center">Numero de clientes</th>
                  <th class="text-center">Numero de examenes</th>
                  <th class="text-center">Monto</th>
                  <th class="text-center">Fecha de expiracion</th>
                </tr>
              </thead>
              <tbody>
                {this.props.licenses? this.props.licenses.map((item, i) => {
                  return (
                    <tr key={i} class="text-center">
                      <td>{ item.license_id}</td>
                      <td>asdasd</td>
                      <td>qweasd</td>
                      <td>
                        asdasd
                      </td>
                      <td>qweqw</td>
                    </tr>
                  );
                }):null}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Licencias;
