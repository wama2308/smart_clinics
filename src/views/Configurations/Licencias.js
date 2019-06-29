import React from "react";
import { Table } from "reactstrap";
import Pagination from '../../components/Pagination';

class Licencias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10
    }
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const ArrayLicences = [];

    this.props.licenses.map((item, key) => {
      ArrayLicences.push({
        ...item, number: key
      })
    })
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
                {this.props.licenses ? ArrayLicences.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                  const date = new Date(item.expiration_date.sec)
                  const date2 = new Intl.DateTimeFormat(
                    "en-GB"
                  ).format(date);
                  return (
                    <tr key={item.number} className="text-center">
                      <td>{item.license}</td>
                      <td>{item.numberclients}</td>
                      <td>{item.numberexams}</td>
                      <td>
                        {this.props.symbol} {" "} {item.amount}
                      </td>
                      <td>{date2}</td>
                    </tr>
                  );
                }) : null}
              </tbody>
            </Table>
            <div style={{ 'display': "flex", 'justify-content': "flex-end" }}>
              <Pagination contador={this.props.licenses}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                handleChangePage={this.handleChangePage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Licencias;
