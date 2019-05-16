import React from "react";
import { Card, CardHeader, Input } from "reactstrap";
import styled from "styled-components";
import Search from "../../components/DefaultSearch";
import { Delete } from "@material-ui/icons";
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  IconButton
} from "@material-ui/core";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      edit: false,
      quantyToSell: 0
    };
  }

  search = () => {
    alert("buscar");
  };

  delete = item => {
    this.props.deleteAtion(item._id);
  };

  handleChange = (event, product) => {
    this.props.changeQuantytoSell({
      value: event.target.value,
      id: product._id,
      quanty: product.quantity
    });
  };

  editInput = key => {
    this.setState({ edit: key });
  };

  componentDidUpdate = () => {
    if (this.state.edit) {
      const result = document.getElementsByClassName(`${this.state.edit}`);
      result[0].focus();
    }
  };

  getTotal = (array, aplication) => {
    const obj = {
      subTotal: 0,
      iva: 0,
      total: 0
    };
    if (!array) {
      return obj;
    }

    let subtotal = 0;
    array.map(data => {
      const result = data.quantyToSell * data.price;
      subtotal = parseFloat(obj.subTotal) + parseFloat(result);
      obj.subTotal = subtotal.toFixed(2);
    });
    const iva =
      (parseFloat(obj.subTotal) * parseFloat(aplication.tax_rate)) / 100;
    obj.total = parseFloat(obj.subTotal + iva).toFixed(2);
    obj.iva = iva.toFixed(2);

    return obj;
  };

  keyPress = e => {
    if (e.key === "Enter") {
      this.setState({ edit: false });
    }
  };

  render() {
    const { patient, products, aplication } = this.props;

    const totalData = this.getTotal(products, aplication);

    console.log("data", totalData);
    const dataHead = [
      { label: "CODIGO" },
      { label: "NOMBRE" },
      { label: "TIPO" },
      { label: "DISPONIBLE" },
      { label: "CANTIDAD" },
      { label: "PRECIO/U" },
      { label: "PRECIO/T" },
      { label: "ACTION" }
    ];
    return (
      <Card
        style={{
          flex: 1,
          margin: "10px 0px",
          overflow: "auto",
          minHeight: 480,
          maxHeight: 480
        }}
      >
        <Header>
          <div>Productos</div>
          <div style={{ width: "40%" }}>
            {patient && !this.state.edit && (
              <Search
                pressKey={true}
                getOptions={this.props.searchAction}
                placeholder="Buscar producto..."
                options={this.props.options}
                searchAction={this.props.getProducts}
              />
            )}
          </div>
        </Header>
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
                      <Cell className="cellStyle">{product.code}</Cell>
                      <Cell>{product.name}</Cell>
                      <Cell>{product.type}</Cell>
                      <Cell>{product.quantity}</Cell>
                      {this.state.edit === product._id ? (
                        <td>
                          <Input
                            type="number"
                            className={product._id}
                            value={product.quantyToSell}
                            onKeyDown={this.keyPress}
                            onChange={event =>
                              this.handleChange(event, product)
                            }
                            style={{
                              height: 48,
                              borderRadius: 0
                            }}
                          />
                        </td>
                      ) : (
                        <Cell onClick={() => this.editInput(product._id)}>
                          {product.quantyToSell}
                        </Cell>
                      )}
                      <Cell>{product.price}</Cell>
                      <Cell>{product.quantyToSell * product.price}</Cell>
                      <Cell>
                        <IconButton
                          onClick={() => {
                            this.delete(product);
                          }}
                        >
                          <Delete className="iconTable" />
                        </IconButton>
                      </Cell>
                    </RowTable>
                  );
                })}
            </TableBody>
          </Table>
        </div>

        <Footer style={{ flex: 1, display: "flex" }}>
          <div className="totalStyle">
            <strom className="titleBol"> SubTotal</strom>{" "}
            {`${totalData.subTotal}`}
            <span className="titleBol">{aplication.current_simbol}</span>
          </div>

          <div className="totalStyle">
            <strom className="titleBol">{` Impuesto (${
              aplication.tax_rate
            }%) `}</strom>
            {totalData.iva}
            {<span className="titleBol">{aplication.current_simbol}</span>}
          </div>

          <div className="totalStyle">
            <strom className="titleBol"> Total</strom> {`${totalData.total} `}{" "}
            <span className="titleBol">{aplication.current_simbol}</span>
          </div>
        </Footer>
      </Card>
    );
  }
}

export default Products;

const Header = styled(CardHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 88px;
`;

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
