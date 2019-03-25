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
      modal: false
    };
  }

  closeModal = () => {
    this.setState({
      modal: false
    });
  };

  openModal = (license, service) => {
    this.setState({ modal: true, license, service });
  };

  render() {
    return (
      <div className="container">
        {this.state.modal && (
          <ModalServicio
            open={this.state.modal}
            getdataModal={this.props.getdataModal}
            close={this.closeModal}
            licenseID={this.state.license}
            serviceID={this.state.service}
            serviceModalData={this.props.serviceModalData}
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
                  <th style={{ width: "15%", textAlign: "center" }}>
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
                                  service.serviceId
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
                                // this.modaledit(item, i);
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
                                // this.delete(i);
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
