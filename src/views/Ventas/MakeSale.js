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
      electronic: false
    };
  }

  getInitial = way_to_pay => {
    const obj = {};

    way_to_pay.map((pay, key) => {
      if (key === 0) {
        obj[pay.label] = this.props.total.subTotal;
      } else {
        obj[pay.label] = "";
      }
    });

    return obj;
  };

  pressKey = (e, set, key, value) => {
    console.log(e.key);
    console.log();
    if (!e.shiftKey && e.key === "Tab") {
      set(this.props.aplication.way_to_pay[key].label, "");
      set(this.props.aplication.way_to_pay[key + 1].label, value);
    } else if (e.shiftKey && e.key === "Tab") {
      set(this.props.aplication.way_to_pay[key].label, "");
      set(this.props.aplication.way_to_pay[key + -1].label, value);
    }
  };

  render() {
    const { open, close, aplication, total } = this.props;

    const InitialValues = this.getInitial(aplication.way_to_pay);

    console.log(InitialValues);
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
          console.log("data", values);
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
                <div className="tipePayment">
                  {aplication.way_to_pay &&
                    aplication.way_to_pay.map((pay, key) => {
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
                            type="number"
                            name="Sucursal"
                            id="Sucursal"
                            value={values[pay.label]}
                            // onKeyDownCapture={event =>
                            //   this.pressKey(
                            //     event,
                            //     setFieldValue,
                            //     key,
                            //     values[pay.label]
                            //   )
                            // }
                            onKeyDown={event => {
                              this.pressKey(
                                event,
                                setFieldValue,
                                key,
                                values[pay.label]
                              );
                            }}
                            className="inputStyle"
                            maxLength="40"
                            onChange={event => {
                              this.setState({ name: event.target.value });
                            }}
                          />
                        </div>
                      );
                    })}

                  <div className="buttonStyle">
                    <Button color="success">Finalizar Venta</Button>
                  </div>
                  <div className="totalModal">
                    <div className="total">
                      {" "}
                      <span style={{ fontWeight: "bold" }}>Restante:</span>{" "}
                      &nbsp;
                      {formatNumber(total.subTotal)}
                      &nbsp;{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {total.currency}
                      </span>
                    </div>
                    <div className="total">
                      {" "}
                      <span style={{ fontWeight: "bold" }}>Total:</span> &nbsp;
                      {formatNumber(total.subTotal)}
                      &nbsp;{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {total.currency}
                      </span>
                    </div>
                  </div>
                </div>
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
