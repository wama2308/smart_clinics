import React from "react";
import { Table } from "reactstrap";
import Pagination from "../../components/Pagination";
import Search from "../../components/Select";
import "../../components/style.css";
import { getArray } from "../../core/utils";

class Licencias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10
    };
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const ArrayLicences = getArray(this.props.licenses);

    const result = this.props.search
      ? ArrayLicences.filter(item => {
          return (
            item.license.toLowerCase().includes(this.props.search.toLowerCase())||
            item.numberclients.toString().includes(this.props.search)||
            item.numberexams.toString().includes(this.props.search)
          )
        })
      : ArrayLicences;

    return (
      <div>
        <div className="containerGeneral">
          <div className="container-button">
            <p className="text-muted">Licencias de su Centro Medico</p>
          </div>
          <div className="containerSearch" style={{ marginBottom: "15px" }}>
            <Search value={ArrayLicences} />
          </div>
        </div>

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
                {this.props.licenses
                  ? result
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(item => {
                        const date = new Date(item.expiration_date.sec);
                        const date2 = new Intl.DateTimeFormat("en-GB").format(
                          date
                        );
                        return (
                          <tr key={item.number - 1} className="text-center">
                            <td>{item.license}</td>
                            <td>{item.numberclients}</td>
                            <td>{item.numberexams}</td>
                            <td>
                              {this.props.symbol} {item.amount}
                            </td>
                            <td>{date2}</td>
                          </tr>
                        );
                      })
                  : null}
              </tbody>
              {this.props.licenses.length > 10 && (
                <Pagination
                  contador={this.props.licenses}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                  handleChangePage={this.handleChangePage}
                />
              )}
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Licencias;
