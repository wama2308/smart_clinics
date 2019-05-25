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
import { InitialValue } from "./const";

export default class DiscountRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount = () => {
    this.props.queryAdmins();
  };

  componentWillReceiveProps = props => {
    props.approvers ? this.setState({ loading: true }) : null;
  };

  handleSubmit = values => {
    if (values.approver === null) {
      values.approver = this.props.approvers[0].value;
    }

    const obj = {
      admin_id: values.approver,
      discount: Number(values.value),
      percentage: values.discountType === "porcentaje" ? 1 : 0
    };

    const type = this.props.edit ? 2 : 1;
    this.props.discountRequest(type, obj);
  };

  render() {
    console.log("data", this.props.edit);
    const type = [
      {
        value: "%",
        type: "porcentaje"
      },
      {
        value: "BSF",
        type: "valor"
      }
    ];
    const InitialValue = {
      discountType: type[0].type,
      value: "",
      approver: this.props.approvers ? this.props.approvers[0].value : null
    };

    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={InitialValue}
        render={({ values, setFieldValue, touched, errors, handleSubmit }) => {
          const disabled = values.value.length < 1 ? true : false;
          return (
            <Modal isOpen={this.props.open} toggle={this.props.close}>
              <ModalHeader>Peticion de descuento</ModalHeader>
              <ModalBody>
                {!this.props.loading && (
                  <div
                    align="center"
                    className={"show"}
                    style={{ padding: "5%" }}
                  >
                    <img src="assets/loader.gif" width="30%" />
                  </div>
                )}
                {this.props.loading && (
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
                            name="discountType"
                            className="inputStyle"
                            value={values.names}
                            onChange={event =>
                              setFieldValue("discountType", event.target.value)
                            }
                          >
                            {type.map((type, key) => {
                              return (
                                <option key={type.type}>{type.value}</option>
                              );
                            })}
                          </Input>
                        </div>
                        <div>
                          <Input
                            type="text"
                            name="value"
                            placeholder="Ingrese monto a descontar"
                            className="inputStyle"
                            onChange={event =>
                              setFieldValue("value", event.target.value)
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
                            setFieldValue("approver", event.target.value)
                          }
                        >
                          {this.props.approvers.map(approver => {
                            return (
                              <option
                                key={approver.value}
                                value={approver.value}
                              >
                                {approver.label}
                              </option>
                            );
                          })}
                        </Input>

                        {errors.surnames && touched.surnames && (
                          <FormFeedback style={{ display: "block" }} tooltip>
                            {errors.surnames}
                          </FormFeedback>
                        )}
                      </FormGroup>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.props.close}>
                  Cancel
                </Button>
                <Button
                  color="success"
                  disabled={disabled}
                  onClick={handleSubmit}
                >
                  Enviar
                </Button>{" "}
              </ModalFooter>
            </Modal>
          );
        }}
      />
    );
  }
}
