import React from "react";
import { Modal, Input, FormGroup, Label } from "reactstrap";

class NewConsultation extends React.Component {
  render() {
    const { open, close } = this.props;

    return (
      <Modal isOpen={open} toggle={close} style={{ minWidth: "55%" }}>
        <div style={{ height: 500 }}>
          <FormGroup className="top form-group col-sm-6">
            <Label for="Sucursal" className="mr-sm-2">
              Razon la de consulta
            </Label>
            <Input type="text" name="names" className="inputStyle" />
            {/*
            {errors.names && touched.names && (
              <FormFeedback style={{ display: "block" }} tooltip>
                {errors.names}
              </FormFeedback>
            )} */}
          </FormGroup>

          <FormGroup className="top form-group col-sm-12">
            <Label for="codigo" className="mr-sm-2">

            </Label>
            <Input
              type="textarea"
              name="code"
              rows={5}
              style={{ backgroundColor: "white" }}
            />
            {/* {errors.code && touched.code && (
              <FormFeedback style={{ display: "block" }} tooltip>
                {errors.code}
              </FormFeedback>
            )} */}
          </FormGroup>
        </div>
      </Modal>
    );
  }
}

export default NewConsultation;
