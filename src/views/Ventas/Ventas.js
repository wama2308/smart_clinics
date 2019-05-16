import React from "react";
import { Nav, NavItem, NavLink, Card, CardBody, CardHeader } from "reactstrap";
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  IconButton
} from "@material-ui/core";
import styled from "styled-components";
import classnames from "classnames";

class Ventas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeTab: 1
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const dataHead = [
      { label: "CODIGO" },
      { label: "CLIENTE" },
      { label: "MONTO" },
      { label: "TIEMPO" }
    ];
    return (
      <Card style={{ flex: 1, margin: "0px 0px 10px 10px" }}>
        <Header>
          <Nav tabs>
            <NavItem>
              <NavLink
                style={{ height: 50 }}
                className={classnames({
                  active: this.state.activeTab === 1
                })}
                onClick={() => {
                  this.toggleTab(1);
                }}
              >
                Descuentos
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                style={{ height: 50 }}
                className={classnames({
                  active: this.state.activeTab === 2
                })}
                onClick={() => {
                  this.toggleTab(2);
                }}
              >
                Guardadas
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ height: 50 }}
                className={classnames({
                  active: this.state.activeTab === 3
                })}
                onClick={() => {
                  this.toggleTab(3);
                }}
              >
                Facturas diarias
              </NavLink>
            </NavItem>
          </Nav>
        </Header>
        <Body>
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
              <RowTable style={{ height: 30 }}>
                <Cell className="cellStyle">mock</Cell>
                <Cell>mock</Cell>
                <Cell>mock</Cell>

                <Cell>
                  mock
                  {/* <IconButton
                    onClick={() => {
                      // this.delete();
                    }}
                  >
                    <Delete className="iconTable" />
                  </IconButton> */}
                </Cell>
              </RowTable>
            </TableBody>
          </Table>
        </Body>
      </Card>
    );
  }
}
export default Ventas;

const Header = styled(CardHeader)`
  display: flex;
  align-items: flex-end;
  min-height: 73px;
  max-height: 73px;
`;

const Body = styled(CardBody)`
  padding: 0px;
  flex: 1;
`;

const Cell = styled(TableCell)`
  && {
    border: none;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

const RowTable = styled(TableRow)`
  && {
    &:hover {
      background: #eeeeee;
    }
  }
`;
