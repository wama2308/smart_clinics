import React, { Component } from "react";
import { Button, ModalHeader, ModalBody, ModalFooter, Modal } from "reactstrap";
import { FaCheckCircle } from "react-icons/fa";

import "../views/Configurations/loading.css";
import "../views/Configurations/modal.css";

export function Loading(props) {
  return (
    <div>
      {/* Modal Loading */}
      {props.type === "loading" && (
        <Modal style={{ maxWidth: 920 }} isOpen={true} className={"show"}>
          <ModalBody>
            <div className={"show"} style={{ textAlign: "center" }}>
              <img src="assets/loader.gif" width="25%" height="5%" />
            </div>
          </ModalBody>
        </Modal>
      )}

      {/* Modal Success */}

      {props.type === "succes" && (
        <Modal
          isOpen={true}
          // modalConfirm={this.modalConfirm}
        >
          <ModalHeader />
          <ModalBody>
            <div color="success">
              <FaCheckCircle size="4em" />
            </div>
            {/* <div color="warning" className={this.state.warning}>
              <FaExclamationCircle size="4em" />
            </div>
            <div
              className={this.state.divLoading2}
              style={{ textAlign: "center" }}
            >
              <img src="assets/loader.gif" width="20%" height="5%" />
            </div> */}
            <div align="center">
              <h5>
                <b>Agregado Satisfactorio!</b>
              </h5>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">AceptarF</Button>{" "}
            <Button color="secondary">Cancelar</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}

export class Alert extends React.Component {
  handleOk = () => {
    this.props.callback(true);
    this.props.close()
  };

  handleNotOk = () => {
    this.props.callback(false);
    this.props.close()
  };

  render() {
    return (
      <Modal
        isOpen={this.props.open}
      >
        <ModalHeader>{this.props.title}</ModalHeader>
        <ModalBody
          style={{
            minHeight: 120,
            justifyContent: "center",
            display: "flex",
            alignItems: 'center',
            fontSize:15
          }}
        >
          {this.props.info}{" "}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleNotOk}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.handleOk}>
            OK
          </Button>{" "}

        </ModalFooter>
      </Modal>
    );
  }
}
