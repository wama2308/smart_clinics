import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  FormFeedback
} from "reactstrap";
import { Formik } from "formik";

export default class DiscountRequest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const type = ["%", "BSF"];
    return (
      <Modal isOpen={this.props.open} toggle={this.props.close}>
        <ModalHeader>Peticion de descuento</ModalHeader>
        <ModalBody>
          <Formik
            render={({ values, setFieldValue, touched, errors }) => {
              return (
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FormGroup
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center"
                      }}
                      className="top form-group col-sm-12"
                    >
                      <div>
                        <Label for="Sucursal" className="mr-sm-2">
                          Descuento
                        </Label>
                        <Input
                          type="select"
                          name="names"
                          className="inputStyle"
                          value={values.names}
                          onChange={event =>
                            setFieldValue("names", event.target.value)
                          }
                        >
                          {type.map((type, key) => {
                            return <option key={key}>{type}</option>;
                          })}
                        </Input>
                      </div>
                      <div>
                        <Input
                          type="text"
                          name="surnames"
                          placeholder="Ingrese monto a descontar"
                          className="inputStyle"
                          onChange={event =>
                            setFieldValue("surnames", event.target.value)
                          }
                        />
                      </div>

                      {errors.surnames && touched.surnames && (
                        <FormFeedback style={{ display: "block" }} tooltip>
                          {errors.surnames}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FormGroup className="top form-group col-sm-8">
                      <Label for="Sucursal" className="mr-sm-2">
                        Seleccione aprobador
                      </Label>
                      <Input
                        type="select"
                        name="surnames"
                        className="inputStyle"
                        onChange={event =>
                          setFieldValue("surnames", event.target.value)
                        }
                      >
                        {<option>Select</option>}
                      </Input>

                      {errors.surnames && touched.surnames && (
                        <FormFeedback style={{ display: "block" }} tooltip>
                          {errors.surnames}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </div>
                </div>
              );
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.close}>
            Cancel
          </Button>
          <Button color="success" onClick={this.props.close}>
            Enviar
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}
