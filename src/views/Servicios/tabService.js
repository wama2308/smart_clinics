import React from "react";
import { Table } from "reactstrap";
import { FaFileAlt } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import { Edit, Visibility } from "@material-ui/icons";
import { GetDisabledPermits, getArray } from "../../core/utils";
import ModalServicio from "./modalsServicio/ModalServicio";
import Pagination from '../../components/Pagination';
import Search from "../../components/Select";
import '../../components/style.css'

export default class tabService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divLoadingTable: "show",
      modal: false,
      disabled: true,
      type: 1,
      page: 0,
      rowsPerPage: 10
    };
  }

  closeModal = () => {
    this.setState({
      modal: false,
      type: 1
    });
  };

  openModal = (license, service, type) => {
    if (type === 1) {
      this.setState({ modal: true, license, service, disabled: true });
    } else if (type === 2) {
      this.setState({ modal: true, license, service, type: 2, disabled: true });
    } else {
      this.setState({
        modal: true,
        license,
        service,
        type: 2,
        disabled: false
      });
    }
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  getService = service => {
    if (!service) {
      return [];
    }
    return service;
  };

  render() {
    const updateDisabled = GetDisabledPermits(
      this.props.serviciosPermits,
      "Update"
    );
    const { rowsPerPage, page } = this.state;
    const arrayData = getArray(this.props.data);

    const result = this.props.search
      ? arrayData.filter(service => {
          return (
            service.serviceName.toLowerCase().includes(this.props.search) ||
            service.category.toLowerCase().includes(this.props.search)
          );
        })
      : arrayData;

    return (
      <div >
        <div className="containerGeneral" style={{"justifyContent": "flex-end", "marginBottom": "15px"}}>
          <div className="containerSearch">
            <Search value={arrayData} />
          </div>
        </div>
        {this.state.modal && (
          <ModalServicio
            open={this.state.modal}
            close={this.closeModal}
            licenseID={this.state.license}
            serviceID={this.state.service}
            serviceModalData={this.props.serviceModalData}
            plantilla={this.props.plantilla}
            disabled={this.state.disabled}
            type={this.state.type}
            deleteModifyServices={this.props.deleteModifyServices}
            alert={this.props.alert}
            enabledField={this.props.enabledField}
          />
        )}
        <form
          className="formCodeConfirm"
          // onSubmit={this.handleSaveServicio.bind(this)}
        >
          <div className={this.state.divContainerTable}>
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
                {result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((service) => {
                  return (
                    <tr key={service.number}>
                      <td scope="row" style={{ width: "10%" }}>
                        {service.number}
                      </td>
                      <td style={{ width: "30%" }}>{service.serviceName}</td>
                      <td style={{ width: "30%" }}>{service.category}</td>
                      <td style={{ width: "15%" }}>
                        {service.status === 0 ? "NO" : "SI"}
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
                              disabled={updateDisabled}
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
