import React from "react";
import { Card, CardHeader, Input } from "reactstrap";
import styled from "styled-components";
import Search from "../../components/DefaultSearch";
import {Delete} from '@material-ui/icons'
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  IconButton
} from "@material-ui/core";

import OutsideClick from "../../components/OutsideClick";
class Products extends React.Component {
  search = () => {
    alert("buscar");
  };

  render() {
    const { patient } = this.props;
    const rows = [];
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
              <OutsideClick>
                <Search
                  pressKey={true}
                  searchAction={this.props.searchAction}
                  placeholder="Buscar producto..."
                  onChange={this.props.searchAction}
                />
              </OutsideClick>
            )}
          </div>
        </Header>
        <div>
          <Table>
            <TableHead>
              <TableRow style={{ height: 35 }}>
                {dataHead.map(head => {
                  return (
                    <TableCell style={{ border: "1px solid #c8ced3" }}>
                      {head.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <Cell className="cellStyle">{1234}</Cell>
                <Cell>{"gasas"}</Cell>
                <Cell>{"gasas"}</Cell>
                <Cell>200 und</Cell>
                <td>
                  <Input
                    type="number"
                    style={{
                      height: 48,
                      borderRadius: 0
                    }}
                  />
                </td>
                <Cell>3</Cell>
                <Cell>700</Cell>
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
