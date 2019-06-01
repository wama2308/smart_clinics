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
import { formatNumber } from "../../core/utils";

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

  handleChange = (event, name, setFieldValue, discountType) => {
    console.log(discountType);
    if (discountType === "porcentaje" && Number(event.target.value) <= 100) {
      console.log("entro aca");
      setFieldValue(name, event.target.value);
    } else if (
      discountType === "valor" &&
      Number(event.target.value) <= this.props.total.total
    ) {
      console.log("entro 2");
      setFieldValue(name, event.target.value);
    }
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 20,
                  borderBottom: "1px solid #c8ced3",
                  alignItems: "flex-end"
                }}
              >
                <h5 style={{ margin: 0 }}>Peticion de descuento</h5>
                <div>
                  <div className="total">
                    <span style={{ fontWeight: "bold" }}>Total:</span>
                    &nbsp;
                    {formatNumber(this.props.total.total)}
                    &nbsp;
                    <span style={{ fontWeight: "bold" }}>
                      {this.props.total.currency}
                    </span>
                  </div>
                </div>
              </div>
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
                                <option key={type.type} value={type.type}>
                                  {type.value}
                                </option>
                              );
                            })}
                          </Input>
                        </div>
                        <div>
                          <Input
                            type="number"
                            name="value"
                            placeholder="Ingrese monto a descontar"
                            value={values.value}
                            className="inputStyle"
                            onChange={event =>
                              this.handleChange(
                                event,
                                "value",
                                setFieldValue,
                                values.discountType
                              )
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
