import React from "react";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { Button, Table } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Edit, Visibility, Delete } from "@material-ui/icons";
import ModalPlantilla from "./modalsServicio/ModalPlantilla";
import "./Services.css";
import "./loading.css";

class Plantillas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      disabled: false
    };
  }

  closeModal = () => {
    this.setState({
      openModal: false,
      type: 1
    });
  };

  render() {
    const mockData = [1, 2, 3, 4];
    return (
      <div className="container">
        {this.state.openModal && (
          <ModalPlantilla
            open={this.state.openModal}
            close={this.closeModal}
            disabled={this.state.disabled}
          />
        )}
        <form
          className="formCodeConfirm"
          // onSubmit={this.handleSavePlantilla.bind(this)}
        >
          <div className="row">
            <Button
              color="success"
              onClick={() => this.setState({ openModal: true })}
            >
              Agregar
            </Button>
          </div>
          <br />

          <div>
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th style={{ width: "30%" }}>Nro</th>
                  <th style={{ width: "40%" }}>Plantilla</th>
                  <th style={{ width: "30%", textAlign: "center" }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockData != null &&
                  mockData.map((plantilla, i) => {
                    return (
                      <tr key={i}>
                        <td scope="row" style={{ width: "30%" }}>
                          {i + 1}
                        </td>
                        <td style={{ width: "40%" }}>{"hello"}</td>
                        <td
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <div className="float-left">
                            <a title="Ver Plantilla">
                              <IconButton
                                aria-label="Delete"
                                className="iconButtons"
                                onClick={() => {
                                  // this.openModal(
                                  //   service.licenseId,
                                  //   service.serviceId,
                                  //   1
                                  // );
                                }}
                              >
                                <Visibility className="iconTable" />
                              </IconButton>
                            </a>
                            <a title="Modificar Plantilla">
                              <IconButton
                                aria-label="Delete"
                                className="iconButtons"
                                // onClick={() => {
                                //   this.openModal(
                                //     service.licenseId,
                                //     service.serviceId,
                                //     2
                                //   );
                                // }}
                              >
                                <Edit className="iconTable" />
                              </IconButton>
                            </a>
                            <a title="Eliminar Plantilla">
                              <IconButton
                                className="iconButtons"
                                aria-label="Delete"
                                // onClick={() => {
                                //   this.openModal(
                                //     service.licenseId,
                                //     service.serviceId,
                                //     3
                                //   );
                                // }}
                              >
                                <Delete className="iconTable" />
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
        </form>
      </div>
    );
  }
}

export default Plantillas;
