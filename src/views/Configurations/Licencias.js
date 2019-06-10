import React from "react";
import { Table } from "reactstrap";

class Licencias extends React.Component {
  render() {
     return (
      <div>
        <p className="text-muted">Licencias de su Centro Medico</p>
        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th className="text-center">Licencia</th>
                  <th className="text-center">Numero de clientes</th>
                  <th className="text-center">Numero de examenes</th>
                  <th className="text-center">Monto</th>
                  <th className="text-center">Fecha de expiracion</th>
                </tr>
              </thead>
              <tbody>
                {this.props.licenses? this.props.licenses.map((item, i) => {
                  const date = new Date(item.expiration_date.sec)
                  const date2 = new Intl.DateTimeFormat(
                    "en-GB"
                  ).format(date);
                  return (
                    <tr key={i} className="text-center">
                      <td>{item.license}</td>
                      <td>{item.numberclients}</td>
                      <td>{item.numberexams}</td>
                      <td>
                         {this.props.symbol} {" "} {item.amount}
                      </td>
                      <td>{date2}</td>
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
