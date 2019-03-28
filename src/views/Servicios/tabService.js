import React from "react";
import { Table } from "reactstrap";
import { FaFileAlt } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import { Edit, Visibility } from "@material-ui/icons";
import ModalServicio from "./modalsServicio/ModalServicio";
export default class tabService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divLoadingTable: "show",
      modal: false,
      disabled: true,
      type: 1
    };
  }

  closeModal = () => {
    this.setState({
      modal: false
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

  render() {
    console.log("other", this.props.pantilla);
    return (
      <div className="container">
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
                  <th style={{ width: "30%" }}>Servic io</th>
                  <th style={{ width: "30%" }}>Categoria</th>
                  <th style={{ width: "15%" }}>Modificado</th>
                  <th style={{ minWidth: 154, textAlign: "center" }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.map((service, i) => {
                  return (
                    <tr key={i}>
                      <td scope="row" style={{ width: "10%" }}>
                        {i + 1}
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
            </Table>
          </div>
          <div />
        </form>
      </div>
    );
  }
}
