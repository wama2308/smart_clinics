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
    console.log("se ejecuto");
    if (this.state.edit) {
      const result = document.getElementsByClassName(`${this.state.edit}`);
      result[0].focus();
    }
  };

  keyPress = e => {
    if (e.key === "Enter") {
      this.setState({ edit: false });
    }
  };

  render() {
    const { patient, products } = this.props;
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
      <Card style={{ flex: 1 }}>
        <Header>
          <div>Productos</div>
          <div style={{ width: "40%" }}>
            {patient && (
              <Search
                pressKey={true}
                getOptions={this.props.searchAction}
                placeholder="Buscar producto..."
                options={this.props.options}
                searchAction={this.props.getProducts}
                disabled={this.state.edit ? true : false}
              />
            )}
          </div>
        </Header>
        <div>
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
                    <TableRow key={key}>
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
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Card>
    );
  }
}

export default Products;

const Header = styled(CardHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
`;

const Cell = styled(TableCell)`
  border: 1px solid #c8ced3;
`;
