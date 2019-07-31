import React from "react";
import { Table } from "reactstrap";
import { FaFileAlt } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import { Edit, Visibility } from "@material-ui/icons";
import { GetDisabledPermits, getArray } from "../../core/utils";
import Pagination from "../../components/Pagination";
import Search from "../../components/Select";
export default class InitialService extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 10
  };
  render() {
    const { rowsPerPage, page } = this.state;
    const arrayData = getArray(this.props.data);

    const result = this.props.search
      ? arrayData.filter(service => {
          return (
            service.serviceName
              .toLowerCase()
              .includes(this.props.search.toLowerCase()) ||
            service.category
              .toLowerCase()
              .includes(this.props.search.toLowerCase())
          );
        })
      : arrayData;

    return (
      <div>
        <div
          className="containerGeneral"
          style={{ justifyContent: "flex-end", marginBottom: "15px" }}
        >
          <div className="containerSearch">
            <Search value={arrayData} />
          </div>
        </div>
        <form
          className="formCodeConfirm"
          // onSubmit={this.handleSaveServicio.bind(this)}
        >
          <div>
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th style={{ width: "10%" }}>Nro</th>
                  <th style={{ width: "30%" }}>Servicio</th>
                  <th style={{ width: "30%" }}>Categoria</th>
                  <th style={{ width: "15%" }}>Modificado</th>
                  <th style={{ minWidth: 154, textAlign: "center" }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {result
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(service => {
                    console.log("aca", service);
                    return (
                      <tr key={service.number}>
                        <td scope="row" style={{ width: "10%" }}>
                          {service.number}
                        </td>
                        <td style={{ width: "30%" }}>{service.serviceName}</td>
                        <td style={{ width: "30%" }}>{service.category}</td>
                        <td style={{ width: "15%" }}>
                          {service.status === false ? "NO" : "SI"}
                        </td>
                        <td style={{ width: "15%" }}>
                          <div className="float-left">
                            <a title="Ver servicio original">
                              <IconButton
                                aria-label="Delete"
                                className="iconButtons"
                                onClick={() => {
                                  this.openModal(
                                    service.licenseId,
                                    service.serviceId,
                                    1
                                  );
                                }}
                              >
                                <FaFileAlt className="iconTable" />
                              </IconButton>
                            </a>
                            <a title="Ver servicio modificada">
                              <IconButton
                                aria-label="Delete"
                                className="iconButtons"
                                onClick={() => {
                                  this.openModal(
                                    service.licenseId,
                                    service.serviceId,
                                    2
                                  );
                                }}
                              >
                                <Visibility className="iconTable" />
                              </IconButton>
                            </a>
                            <a title="Modificar servicio">
                              <IconButton
                                className="iconButtons"
                                aria-label="Delete"
                                //disabled={updateDisabled}
                                onClick={() => {
                                  this.openModal(
                                    service.licenseId,
                                    service.serviceId,
                                    3
                                  );
                                }}
                              >
                                <Edit className="iconTable" />
                              </IconButton>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              {this.props.data.length > 10 && (
                <Pagination
                  contador={this.props.data}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                  handleChangePage={this.handleChangePage}
                />
              )}
            </Table>
          </div>
          <div />
        </form>
      </div>
    );
  }
}
