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
                {/* {Object.keys(this.state.licenses).map((item, i) => {
                  var date = new Date(
                    this.state.licenses[item].expiration_date.sec * 1000
                  );
                  var date2 = new Intl.DateTimeFormat("en-GB").format(date);
                  return (
                    <tr class="text-center">
                      <td>{this.state.licenses[item].license}</td>
                      <td>{this.state.licenses[item].numberclients}</td>
                      <td>{this.state.licenses[item].numberexams}</td>
                      <td>
                        {this.number_format(
                          this.state.licenses[item].amount,
                          2
                        )}{" "}
                        {this.state.currencySymbol}
                      </td>
                      <td>{date2}</td>
                    </tr>
                  );
                })} */}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Licencias;
