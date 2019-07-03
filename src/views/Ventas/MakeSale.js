import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Label
} from "reactstrap";
import { Radio } from "@material-ui/core";
import { formatNumber } from "../../core/utils";
import { Formik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import ElectronicBill from "./ElectronicBill";
import styled from "styled-components";

export default class MakeSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      electronic: false,
      step: 1,
      typeBill: 1,
      loading: true
    };
  }

  getInitial = way_to_pay => {
    const banking = this.props.aplication.banking;
    const obj = {};
    way_to_pay.map((pay, key) => {
      obj[pay.label] = {
        value: Number(this.props.total.total),
        write: false,
        operation_number: "",
        issuingbank: banking[0].value,
        receivingbank: banking[0].value
      };
      if (key === 0) {
        obj[pay.label].value = Number(this.props.total.total);
      } else {
        obj[pay.label].value = 0;
      }
    });

    return obj;
  };

  getRemaining = allvalues => {
    const pay = this.props.aplication.way_to_pay;
    const total = this.props.total.total;
    let allTotal = 0;
    pay.map(pay => {
      allTotal = Number(allTotal) + Number(allvalues[pay.label].value);
    });
    const remaining = allTotal === Number(total) ? 0 : total - allTotal;

    return parseFloat(remaining).toFixed(2);
  };

  getDataTypes = allvalues => {
    const pay = this.props.aplication.way_to_pay;

    return pay.filter(
      pay => allvalues[pay.label].value > 0 && pay.label !== "EFECTIVO"
    );
  };

  pressKey = (e, set, key, allvalues, values) => {
    const pay = this.props.aplication.way_to_pay;
    const remaining = this.getRemaining(allvalues);
    if (remaining < 0) {
      this.props.openSnackbars("warning", "Ha sobrepasado el total a pagar");
      return set(pay[key].label, { value: 0, write: false });
    }

    try {
      if (!e.shiftKey && e.key === "Tab") {
        if (
          values.write &&
          (!allvalues[pay[key + 1].label].write &&
            allvalues[pay[key + 1].label].value <= 0)
        ) {
          set(pay[key + 1].label, {
            ...values,
            value: remaining,
            write: false
          });
        } else if (
          !allvalues[pay[key + 1].label].write &&
          allvalues[pay[key + 1].label].value <= 0
        ) {
          set(pay[key].label, { ...values, value: 0, write: false });
          set(pay[key + 1].label, values);
        }
      } else if (e.shiftKey && e.key === "Tab") {
        if (!allvalues[pay[key - 1].label].write) {
          console.log("entro aca", pay[key - 1].label);
          set(pay[key - 1].label, values);
          set(pay[key].label, { ...values, value: 0, write: false });
        }
      }
    } catch (err) {}
  };

  getSubmitedValues = async allValues => {
    const pay = this.props.aplication.way_to_pay;
    const way_to_pay = [];
    pay.map(pay => {
      if (allValues[pay.label].value > 0) {
        way_to_pay.push(allValues[pay.label]);
      }
    });

    return way_to_pay;
  };

  handleSubmit = async values => {
    this.setState({ loading: false });

    const way_to_pay = await this.getSubmitedValues(values);
    let completed = this.getRemaining(values);
    completed =
      completed > 0
        ? this.props.dataGeneral.payment_type.find(type => {
            return type.label === "Abono";
          })
        : this.props.dataGeneral.payment_type.find(type => {
            return type.label === "Completo";
          });
    const obj = {
      bill_id: this.props.bill_id,
      patient_id: this.props.patient._id,
      supplie_array: this.props.products,
      way_to_pay: way_to_pay,
      sub_total: this.props.total.subTotal,
      igv: this.props.total.iva,
      total: this.props.total.total,
      payment_type: completed.value
    };

    const info = {
      title: "Completar Venta",
      info:
        "El pago de esta factura no esta completa. Desea agregarla como abono?"
    };

    if (completed === "Abono") {
      this.props.confirm(info, res => {
        if (res) {
          return this.props.createSale(obj, this.state.typeBill, () => {
            if (this.state.typeBill === 1) {
              this.setState({ loading: true, step: 3 });
            } else {
              this.props.close();
            }
          });
        }
      });
    }

    this.props.createSale(obj, this.state.typeBill, () => {
      if (this.state.typeBill === 1) {
        this.setState({ loading: true, step: 3 });
      } else {
        this.props.close();
      }
    });
  };

  getStylesFromStep = () => {
    switch (this.state.step) {
      case 1:
        return {
          minWidth: "35%"
        };
      case 2:
        return {
          minWidth: "60%"
        };

      case 3:
        return {
          height: "90%",
          minWidth: "50%"
        };
    }
  };

  getDisabledButton = (typePay, values) => {
    let disabled = false;
    typePay.map(pay => {
      if (values[pay.label].operation_number.length < 1) {
        disabled = true;
      }
    });

    return disabled;
  };

  render() {
    const { open, close, aplication, total } = this.props;
    const InitialValues = this.getInitial(aplication.way_to_pay);
    const typeBill = this.state.typeBill;

    const styles = this.getStylesFromStep();
    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={InitialValues}
        render={({ values, setFieldValue, handleSubmit }) => {
          const remaining = this.getRemaining(values);
          const typePay = this.getDataTypes(values);

          const disabled = this.getDisabledButton(typePay, values);
          const whidth = this.state.step === 1 ? "35%" : "60%";
          return (
            <Modal
              isOpen={open}
              toggle={close}
              contentClassName="makeSale"
              style={{ ...styles }}
            >
              <ModalHeader toggle={close}>Realizar venta</ModalHeader>
              <Body
                style={{
                  paddingBottom: 0,
                  paddingRight: 0,
                  paddingLeft: 0
                }}
              >
                {!this.state.loading && (
                  <div
                    style={{
                      minHeight: 262,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                {this.state.loading && this.state.step === 1 && (
                  <div className="tipePayment">
                    {aplication.way_to_pay.map((pay, key) => {
                      return (
                        <div key={key} className="inputPayment">
                          <Label
                            style={{ marginTop: 10 }}
                            for="Sucursal"
                            className="mr-sm-2"
                          >
                            {pay.label}
                          </Label>

                          <Input
                            value={values[pay.label].value}
                            onChange={event => {
                              setFieldValue(pay.label, {
                                ...values[pay.label],
                                value: event.target.value,
                                write: true
                              });
                            }}
                            onKeyDown={event => {
                              this.pressKey(
                                event,
                                setFieldValue,
                                key,
                                values,
                                values[pay.label]
                              );
                            }}
                            className="inputStyle"
                            maxLength="40"
                          />
                        </div>
                      );
                    })}

                    <div className="buttonStyle">
                      <Button
                        color="success"
                        onClick={() => this.setState({ step: 2 })}
                      >
                        Siguiente
                      </Button>
                    </div>
                    <div className="totalModal">
                      <div className="total">
                        <span style={{ fontWeight: "bold" }}>Restante:</span>{" "}
                        &nbsp;
                        {remaining === total.total
                          ? 0.0
                          : formatNumber(remaining)}
                        &nbsp;
                        <span style={{ fontWeight: "bold" }}>
                          {total.currency}
                        </span>
                      </div>
                      <div className="total">
                        <span style={{ fontWeight: "bold" }}>Total:</span>{" "}
                        &nbsp;
                        {formatNumber(total.total)}
                        &nbsp;{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {total.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.loading && this.state.step === 2 && (
                  <div style={{ padding: "0px 20px 20px" }}>
                    {typePay.map((pay, key) => {
                      return (
                        <div key={key}>
                          <div className="titleInfo">
                            <Label
                              style={{ marginTop: 10 }}
                              for="Sucursal"
                              className="mr-sm-2"
                            >
                              {pay.label}
                            </Label>
                            <div>
                              <div className="total">
                                <span style={{ fontWeight: "bold" }}>
                                  Total:
                                </span>
                                &nbsp;
                                {formatNumber(values[pay.label].value)}
                                &nbsp;
                                <span style={{ fontWeight: "bold" }}>
                                  {total.currency}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="inputIfoBank">
                            <div className="inputGroups">
                              <Label for="codigo" className="mr-sm-2">
                                Banco emisor
                              </Label>
                              <Input
                                type="select"
                                value={values[pay.label].issuingbank}
                                onChange={event => {
                                  setFieldValue(pay.label, {
                                    ...values[pay.label],
                                    issuingbank: event.target.value
                                  });
                                }}
                                className="inputStyle"
                                maxLength="40"
                              >
                                {aplication.banking.map(banking => {
                                  return (
                                    <option
                                      key={banking.value}
                                      value={banking.value}
                                    >
                                      {banking.value}
                                    </option>
                                  );
                                })}
                              </Input>
                            </div>

                            <div className="inputGroups">
                              <Label for="codigo" className="mr-sm-2">
                                Banco Receptor
                              </Label>
                              <Input
                                type="select"
                                value={values[pay.label].receivingbank}
                                onChange={event => {
                                  console.log("dios mio",pay.label)
                                  setFieldValue(pay.label, {
                                    ...values[pay.label],
                                    receivingbank: event.target.value
                                  });
                                }}
                                className="inputStyle"
                                maxLength="40"
                              >
                                {aplication.banking.map(banking => {
                                  return (
                                    <option
                                      key={banking.value}
                                      value={banking.value}
                                    >
                                      {banking.value}
                                    </option>
                                  );
                                })}
                              </Input>
                            </div>

                            <div className="inputGroups">
                              <Label for="codigo" className="mr-sm-2">
                                Numero de operacion
                              </Label>
                              <Input
                                placeholder="Numero de operacion"
                                value={values[pay.label].operation_number}
                                onChange={event => {
                                  setFieldValue(pay.label, {
                                    ...values[pay.label],
                                    way_to_pay: pay.label,
                                    operation_number: event.target.value
                                  });
                                }}
                                className="inputStyle"
                                maxLength="40"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div
                      style={{
                        padding: "20px 10px",
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                        height: 85
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flex: 1,
                          justifyContent: "space-evenly",
                          alignItems: "center"
                        }}
                      >
                        <div>
                          <Radio
                            color="primary"
                            onClick={() => this.setState({ typeBill: 1 })}
                            checked={typeBill === 1 ? true : false}
                          />
                          <Label check>Documento Electronico</Label>
                        </div>
                        <div>
                          <Radio
                            color="primary"
                            onClick={() => this.setState({ typeBill: 2 })}
                            checked={typeBill === 2 ? true : false}
                          />
                          <Label check>Boleta</Label>
                        </div>

                        <div>
                          <Radio
                            type="radio"
                            color="primary"
                            onClick={() => this.setState({ typeBill: 3 })}
                            checked={typeBill === 3 ? true : false}
                          />
                          <Label check>Factura</Label>
                        </div>
                      </div>
                      <div>
                        <Button
                          color="secondary"
                          style={{ marginRight: 10 }}
                          onClick={() => this.setState({ step: 1 })}
                        >
                          Atras
                        </Button>
                        <Button
                          color="success"
                          disabled={disabled}
                          onClick={handleSubmit}
                        >
                          Completar venta
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {this.state.step === 3 && (
                  <div style={{ flex: 1, display: "flex" }}>
                    <ElectronicBill {...this.props} />
                  </div>
                )}
              </Body>
            </Modal>
          );
        }}
      />
    );
  }
}

const Body = styled(ModalBody)`
  display: flex;
  flex-direction: column;

  .tipePayment {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .titleInfo {
    border-bottom: 1px solid rgb(200, 206, 211);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .inputGroups {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px 10px 0px 10px;
  }

  .inputIfoBank {
    display: flex;
    padding-bottom: 20px;
  }

  .buttonStyle {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 65px;
    padding: 20px;
    padding-bottom: 0px;
  }

  .totalModal {
    border-top: 1px solid #c8ced3;
    justify-content: flex-end;
    display: flex;
    width: 100%;
    min-height: 60px;
    margin-top: 20px;
    .total {
      display: flex;
      align-items: center;
      width: 35%;
      justify-content: center;
      border: 1px solid #c8ced3;
    }
  }
  .inputPayment {
    width: 70%;
  }
`;
