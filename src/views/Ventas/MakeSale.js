import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  Typography,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead
} from "@material-ui/core";
import styled from "styled-components";

export default class MakeSale extends React.Component {
  render() {
    const { patient, products, open, close, total } = this.props;

    const dataHead = [
      { label: "CODE" },
      { label: "NOMBRE" },
      { label: "CANTIDAD" },
      { label: "PRECIO/U" },
      { label: "PRECIO/T" }
    ];
    return (
      <Modal
        isOpen={open}
        toggle={close}
        style={{ minWidth: "60%", height: "90%" }}
        contentClassName="makeSale"
      >
        <ModalHeader toggle={close}>Realizar venta</ModalHeader>
        <Body>
          <div className="makePaciente">
            <div className="list" style={{ borderTop: "none" }}>
              <div className="list-body">
                <Typography variant="subtitle1" className="subtitle">
                  Nombre:
                </Typography>
                <Typography variant="body1" className="textSpace">
                  {patient.names} {patient.surnames}
                </Typography>
              </div>
            </div>

            <div className="list" style={{ borderTop: "none" }}>
              <div className="list-body">
                <Typography variant="subtitle1" className="subtitle">
                  DNI:
                </Typography>
                <Typography variant="body1" className="textSpace">
                  {patient.type_identity}-{patient.dni}
                </Typography>
              </div>
            </div>
            <div className="list">
              <div className="list-body">
                <Typography variant="subtitle1" className="subtitle">
                  Correo:
                </Typography>
                <Typography variant="body1" className="textSpace">
                  {patient.email[0]}
                </Typography>
              </div>
              <div className="list-body">
                <Typography variant="subtitle1" className="subtitle">
                  Telefono:
                </Typography>
                <Typography variant="body1" className="textSpace">
                  {patient.phone[0]}
                </Typography>
              </div>
            </div>

            <div className="list">
              <div className="list-body">
                <Typography variant="subtitle1" className="subtitle">
                  Direccion:
                </Typography>
                <Typography variant="body1" className="textSpace">
                  {patient.address}
                </Typography>
              </div>
            </div>
          </div>
          <div className="makeTable">
            <div style={{ overflow: "auto" }}>
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
                        <TableRow key={key} style={{ border: "none" }}>
                          <Cell className="cellStyle">{product.code}</Cell>
                          <Cell>{product.name}</Cell>
                          <Cell>{product.quantity}</Cell>
                          <Cell>{product.price}</Cell>
                          <Cell>
                            {product.quantity
                              ? product.quantity * product.price
                              : product.price}
                          </Cell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="makeTotal">
            <div className="qrStyle">qr</div>
            <div className="totalStyle">totals</div>
          </div>
        </Body>
      </Modal>
    );
  }
}
const Cell = styled(TableCell)`
  && {
    border: none;
    padding: 0px;
    text-align: center;
  }
`;

const Body = styled(ModalBody)`
  display: flex;
  flex-direction: column;

  .list {
    display: flex;
    align-items: center;

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
    border: 1px solid #c8ced3;
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
    }

    .totalStyle {
      flex: 1;
      display: flex;
      justify-content: center;
      border: 1px solid #c8ced3;
    }
  }
`;
