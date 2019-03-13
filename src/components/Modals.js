import React, { Component } from "react";
import { Button, ModalHeader, ModalBody, ModalFooter, Modal } from "reactstrap";
import { FaCheckCircle } from "react-icons/fa";

import "../views/Configurations/loading.css";
import "../views/Configurations/modal.css";

export default function Loading(props) {
  console.log(props);
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
            <Button color="primary">
              AceptarF
            </Button>{" "}
            <Button color="secondary" >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
