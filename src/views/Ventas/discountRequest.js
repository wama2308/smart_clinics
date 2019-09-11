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
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  IconButton
} from "@material-ui/core";
import { Formik } from "formik";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { formatNumber } from "../../core/utils";

export default class DiscountRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      discountP: false
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
    if (discountType === "porcentaje" && Number(event.target.value) <= 100) {
      setFieldValue(name, event.target.value);
    } else if (
      discountType === "valor" &&
      Number(event.target.value) <= this.props.total.total
    ) {
      setFieldValue(name, event.target.value);
    }
  };

  handleDiscount = (event, product) => {
    this.props.changeDiscount({
      value: parseInt(event.target.value),
      id: product._id
    });
  };

  keyDiscount = (e, discount) => {
    if (e.key === "Enter") {
      this.setState({ discountP: false });
    }
  };

  render() {
    const type = [
      {
        value: "BSF",
        type: "valor"
      },
      {
        value: "%",
        type: "porcentaje"
      }
    ];

    const discountType = [
      {
        value: "1",
        type: "Factura completa"
      },
      {
        value: "0",
        type: "Por Productos"
      }
    ];

    const dataHead = [
      { label: "NOMBRE" },
      { label: "TIPO" },
      { label: "DISPONIBLE" },
      { label: "CANTIDAD" },
      { label: "PRECIO/U" },
      { label: "DESCUENTO" },
      { label: "PRECIO/T" }
    ];

    const InitialValue = {
      discountType: type[0].type,
      value: "",
      selectedDiscount: "1",
      approver: this.props.approvers ? this.props.approvers[0].value : null
    };

    const { products } = this.props;
    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={InitialValue}
        render={({ values, setFieldValue, touched, errors, handleSubmit }) => {
          console.log("values", values);
          const disabled = values.value.length < 1 ? true : false;
          return (
            <Modal
              isOpen={this.props.open}
              toggle={this.props.close}
              style={
                values.selectedDiscount === "0"
                  ? { minWidth: "70%" }
                  : { width: "auto" }
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 20,
                  borderBottom: "1px solid #c8ced3",
                  alignItems: "center"
                }}
              >
                <h5 style={{ margin: 0 }}>Peticion de descuento</h5>
                <div>
                  {/* <div className="total">
                    <span style={{ fontWeight: "bold" }}>Total:</span>
                    &nbsp;
                    {formatNumber(this.props.total.total)}
                    &nbsp;
                    <span style={{ fontWeight: "bold" }}>
                      {this.props.total.currency}
                    </span>
                  </div> */}

                  <div>
                    <Input
                      type="select"
                      name="discountType"
                      value={values.selectedDiscount}
                      onChange={event =>
                        setFieldValue("selectedDiscount", event.target.value)
                      }
                    >
                      {discountType.map((type, key) => {
                        return (
                          <option key={type.type} value={type.value}>
                            {type.type}
                          </option>
                        );
                      })}
                    </Input>
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
                    <CircularProgress />
                  </div>
                )}
                {this.props.loading && values.selectedDiscount === "1" && (
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
                {this.props.loading && values.selectedDiscount === "0" && (
                  <div style={{ overflow: "auto", height: "70%" }}>
                    <Table>
                      <TableHead>
                        <TableRow style={{ height: 35 }}>
                          {dataHead.map((head, key) => {
                            return (
                              <TableCell
                                key={key}
                                style={{ border: "1px solid #c8ced3" }}
                              >
                                {head.label}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products &&
                          products.map((product, key) => {
                            return (
                              <RowTable key={key}>
                                <Cell className="cellStyle">
                                  {product.name}
                                </Cell>
                                <Cell>{product.type}</Cell>
                                <Cell>
                                  {product.service
                                    ? "0"
                                    : product.quantity_stock}
                                </Cell>

                                <Cell>{product.quantity}</Cell>
                                <Cell>{formatNumber(product.price)}</Cell>
                                {this.state.discountP === product._id ? (
                                  <td>
                                    <Input
                                      type="number"
                                      className={product._id}
                                      value={product.discountP}
                                      onKeyDown={e =>
                                        this.keyDiscount(e, product)
                                      }
                                      onChange={event =>
                                        this.handleDiscount(event, product)
                                      }
                                      style={{
                                        height: 48,
                                        borderRadius: 0
                                      }}
                                    />
                                  </td>
                                ) : (
                                  <Cell
                                    onClick={() =>
                                      this.setState({ discountP: product._id })
                                    }
                                  >
                                    {product.discountP ? product.discountP : 0}
                                  </Cell>
                                )}
                                <Cell>
                                  {product.quantity
                                    ? formatNumber(
                                        product.quantity * product.price
                                      )
                                    : formatNumber(product.price)}
                                </Cell>
                              </RowTable>
                            );
                          })}
                      </TableBody>
                    </Table>
                    <Footer style={{ flex: 1, display: "flex" }}>
                      <div className="totalStyle">
                        <span className="titleBol"> Total</span>{" "}
                        {`${formatNumber(this.props.total.total)} `}{" "}
                        <span className="titleBol">
                          {this.props.total.currency}
                        </span>
                      </div>
                    </Footer>
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

const Cell = styled(TableCell)`
  border: 1px solid #c8ced3;
`;

const RowTable = styled(TableRow)`
  && {
    &:hover {
      background: #eeeeee;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #c8ced3;
  border-bottom: 1px solid #c8ced3;
  .totalStyle {
    padding-right: 20px;
    border-left: 1px solid #c8ced3;
    border-right: 1px solid #c8ced3;
    display: flex;
    height: 100%;
    min-width: 20%;
    align-items: center;
  }
  .titleBol {
    font-weight: bold;
    padding: 10px;
  }
`;
