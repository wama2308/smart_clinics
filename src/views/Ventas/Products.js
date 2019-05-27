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
      delete: false,
      quantyToSell: 0
    };
  }

  delete = item => {
    this.setState({ delete: true });
    this.props.deleteAtion(item._id);
  };

  handleChange = (event, product) => {
    this.props.changeQuantytoSell({
      value: parseInt(event.target.value),
      id: product._id,
      quanty: product.quantity_stock
    });
  };

  componentDidUpdate = prevProps => {
    let lastData = undefined;
    let lastPrevData = undefined;
    this.props.products
      ? (lastData = this.props.products[this.props.products.length - 1])
      : null;

    prevProps.products
      ? (lastPrevData = prevProps.products[prevProps.products.length - 1])
      : null;

    if (lastData && lastData.searched &&  (lastData !==  lastPrevData)) {
      this.setState({ edit: lastData._id });
    }

    if (this.state.edit) {
      const result = document.getElementsByClassName(`${this.state.edit}`);
      if (result[0]) {
        result[0].focus();
      }
    }
  };

  editInput = key => {
    this.setState({ edit: key });
  };

  keyPress = (e, product) => {
    if (e.key === "Enter") {
      this.setState({ edit: false });
      if (isNaN(product.quantity)) {
        this.props.changeQuantytoSell({
          value: 1,
          id: product._id,
          quanty: product.quantity
        });
      }
    }
  };

  render() {
    const { patient, products, aplication } = this.props;
    const disableAllProductos = this.props.discount ? true : false;
    const totalData = this.props.getTotal(products, aplication);

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
            {patient && (!this.state.edit || disableAllProductos) && (
              <Search
                disabled={disableAllProductos}
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
                  const disabled =
                    this.state.edit === product._id || disableAllProductos
                      ? true
                      : false;
                  return (
                    <RowTable key={key}>
                      <Cell className="cellStyle">{product.code}</Cell>
                      <Cell>{product.name}</Cell>
                      <Cell>{product.type}</Cell>
                      <Cell>{product.quantity_stock}</Cell>
                      {this.state.edit === product._id &&
                      !disableAllProductos ? (
                        <td>
                          <Input
                            type="number"
                            className={product._id}
                            value={product.quantity}
                            onKeyDown={e => this.keyPress(e, product)}
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
                          {product.quantity}
                        </Cell>
                      )}
                      <Cell>{product.price}</Cell>
                      <Cell>
                        {product.quantity
                          ? product.quantity * product.price
                          : product.price}
                      </Cell>
                      <Cell>
                        <IconButton
                          disabled={disabled}
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
            <span className="titleBol"> SubTotal</span>{" "}
            {`${totalData.subTotal}`}
            <span className="titleBol">{aplication.current_simbol}</span>
          </div>

          <div className="totalStyle">
            <span className="titleBol">{` Impuesto (${
              aplication.tax_rate
            }%) `}</span>
            {totalData.iva}
            {<span className="titleBol">{aplication.current_simbol}</span>}
          </div>

          <div className="totalStyle">
            <span className="titleBol"> Total</span> {`${totalData.total} `}{" "}
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
