import React from "react";
import { Nav, NavItem, NavLink, Card, CardBody, CardHeader } from "reactstrap";
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead
} from "@material-ui/core";

import { FiberManualRecord } from "@material-ui/icons";
import moment from "moment";
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

  confirm = id => {
    const obj = {
      title: "ventas",
      info: `Si tiene datos Guardados, estos seran reemplazados. ¿Esta Seguro que Desea Seleccionar esta Factura?`
    };
    this.props.confirm(obj, res => {
      if (res) {
        this.props.queryBill(id);
      }
    });
  };

  getDataTab = list => {
    if (!list) {
      return;
    }

    switch (this.state.activeTab) {
      case 1:
        return list.sales_discount;
      case 2:
        return list.sales_save;
      case 3:
        return list.sales_billed;
    }
  };

  render() {
    const dataHead = [
      { label: "CODIGO" },
      { label: "IDENTIFICACION" },
      { label: "CLIENTE" },
      { label: "MONTO" },
      { label: "TIEMPO" }
    ];
    const list = this.getDataTab(this.props.listSales);

    const color =
      this.props.status_sale === "PENDING TO APPROVE" ? "#357a38" : "#b2102f";

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
                      style={{
                        border: "1px solid #c8ced3",
                        padding: 0,
                        textAlign: "center"
                      }}
                    >
                      {head.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.map((list, key) => {
                  return (
                    <RowTable
                      key={key}
                      style={{ height: 30 }}
                      onClick={() => this.confirm(list.bill)}
                    >
                      <Cell>
                        {" "}
                        {this.state.activeTab === 1 && (
                          <FiberManualRecord
                            style={{
                              position: "relative",
                              left: "-25%",
                              width: 12,
                              color: color
                            }}
                          />
                        )}{" "}
                        {list.code}
                      </Cell>
                      <Cell>{list.patient}</Cell>
                      <Cell>{list.patient_dni}</Cell>
                      <Cell>{list.total}</Cell>
                      <Cell>{moment(list.time).fromNow()}</Cell>
                    </RowTable>
                  );
                })}
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
  overflow: auto;
`;

const Cell = styled(TableCell)`
  && {
    border: none;
    font-size: 13px;
    padding: 0px;
    text-align: center;
    cursor: pointer;
  }
`;

const RowTable = styled(TableRow)`
  && {
    &:hover {
      background: #eeeeee;
    }
  }
`;
