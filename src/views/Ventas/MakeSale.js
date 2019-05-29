import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Label
} from "reactstrap";
import { formatNumber } from "../../core/utils";
import { Formik } from "formik";
import ElectronicBill from "./ElectronicBill";
import styled from "styled-components";

export default class MakeSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      electronic: false,
      step: 1
    };
  }

  getInitial = way_to_pay => {
    const obj = {};

    way_to_pay.map((pay, key) => {
      if (key === 0) {
        obj[pay.label] = {
          value: Number(this.props.total.total),
          write: false
        };
      } else {
        obj[pay.label] = {
          value: 0,
          write: false
        };
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
    const remaining = allTotal === Number(total) ? total : total - allTotal;

    return parseFloat(remaining).toFixed(2);
  };

  getDataTypes = allvalues => {
    const pay = this.props.aplication.way_to_pay;

    return pay.filter(pay => allvalues[pay.label].value > 0);
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
          console.log("entro en 1");
          set(pay[key + 1].label, { value: remaining, write: false });
        } else if (
          !allvalues[pay[key + 1].label].write &&
          allvalues[pay[key + 1].label].value <= 0
        ) {
          console.log("entro en 2");
          set(pay[key].label, { value: 0, write: false });
          set(pay[key + 1].label, values);
        }
      } else if (e.shiftKey && e.key === "Tab") {
        if (!allvalues[pay[key - 1].label].write) {
          console.log("entro aca", pay[key - 1].label);
          set(pay[key - 1].label, values);
          set(pay[key].label, { value: 0, write: false });
        }
      }
    } catch (err) {}
  };

  handleChange = () => {
    alert("hello");
  };

  render() {
    const { open, close, aplication, total } = this.props;

    const InitialValues = this.getInitial(aplication.way_to_pay);
    return (
      <Formik
        initialValues={InitialValues}
        render={({
          values,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          handleBlur
        }) => {
          const remaining = this.getRemaining(values);
          const typePay = this.getDataTypes(values);

          return (
            <Modal isOpen={open} toggle={close} contentClassName="makeSale">
              <ModalHeader toggle={close}>Realizar venta</ModalHeader>
              <Body
                style={{
                  paddingBottom: 0,
                  paddingRight: 0,
                  paddingLeft: 0
                }}
              >
                {this.state.step === 1 && (
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
                        Finalizar Venta
                      </Button>
                    </div>
                    <div className="totalModal">
                      <div className="total">
                        {" "}
                        <span style={{ fontWeight: "bold" }}>
                          Restante:
                        </span>{" "}
                        &nbsp;
                        {remaining === total.total
                          ? 0.0
                          : formatNumber(remaining)}
                        &nbsp;{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {total.currency}
                        </span>
                      </div>
                      <div className="total">
                        {" "}
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
                {this.state.step === 2 && (
                  <div style={{ padding: 20 }}>
                    {typePay.map((pay, key) => {
                      return (
                        <div key={key}>
                          <Label
                            style={{ marginTop: 10 }}
                            for="Sucursal"
                            className="mr-sm-2"
                          >
                            {pay.label}
                          </Label>
                          <div className="inputIfoBank">
                            <div className="inputGroups">
                              <Label for="codigo" className="mr-sm-2">
                                Banco emisor
                              </Label>
                              <Input
                                type="select"
                                onChange={event => {
                                  setFieldValue(pay.label, {
                                    value: event.target.value,
                                    write: true
                                  });
                                }}
                                className="inputStyle"
                                maxLength="40"
                              >
                                <option>Select</option>
                              </Input>
                            </div>

                            <div className="inputGroups">
                              <Label for="codigo" className="mr-sm-2">
                                Banco Receptor
                              </Label>
                              <Input
                                type="select"
                                value={values[pay.label].value}
                                onChange={event => {
                                  setFieldValue(pay.label, {
                                    value: event.target.value,
                                    write: true
                                  });
                                }}
                                className="inputStyle"
                                maxLength="40"
                              >
                                <option>Select</option>
                              </Input>
                            </div>
                          </div>
                          <div className="inputIfoBank">
                            <div>
                              <Label for="codigo" className="mr-sm-2">
                                Numero de operacion
                              </Label>
                              <Input
                                value={values[pay.label].value}
                                onChange={event => {
                                  setFieldValue(pay.label, {
                                    value: event.target.value,
                                    write: true
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
                  </div>
                )}
                {this.state.electronic && (
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

  .inputGroups {
    display: flex;
    flex-direction: column;
    flex: 1;
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

  .list {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 35px;
    &-body {
      flex: 1;
      display: flex;
      padding-right: 3%;
      align-items: baseline;
    }

    .subtitle {
      font-weight: 700;
      font-size: 17px;
      padding-right: 5px;
      padding-left: 10px;
    }
    .textSpace {
      font-size: 16px;
    }
  }

  .makePaciente {
    flex: 0.8;

    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .makeTable {
    flex: 1.5;
    border: 1px solid #c8ced3;
  }

  .makeTotal {
    flex: 1;
    border: 1px solid #c8ced3;
    display: flex;
    justify-content: space-between;

    .qrStyle {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .totalStyle {
      flex: 1;
      display: flex;
      justify-content: center;
      border: 1px solid #c8ced3;
      flex-direction: column;
    }
  }
`;
