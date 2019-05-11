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
  state = {
    edit: false
  };
  search = () => {
    alert("buscar");
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
      ,
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
                products.reverse().map((product, key) => {
                  return (
                    <TableRow key={key}>
                      <Cell className="cellStyle">{product.code}</Cell>
                      <Cell>{product.name}</Cell>
                      <Cell>{product.type}</Cell>
                      <Cell>{product.quantity}</Cell>
                      {this.state.edit ? (
                        <td>
                          <Input
                            type="number"
                            value={product.cantidad}
                            style={{
                              height: 48,
                              borderRadius: 0
                            }}
                          />
                        </td>
                      ) : (
                        <Cell>{product.cantidad}</Cell>
                      )}
                      <Cell>{product.price}</Cell>
                      <Cell>{product.cantidad * product.price}</Cell>
                      <Cell>
                        <IconButton
                          onClick={() => {
                            // this.delete(item);
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
