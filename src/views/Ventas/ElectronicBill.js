import React from "react";
import { ModalFooter, Button } from "reactstrap";
import {
  Typography,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead
} from "@material-ui/core";
import styled from "styled-components";
import { formatNumber } from "../../core/utils";

export default class electronicBill extends React.Component {

  continue=()=>{
    this.props.cancel()
    this.props.close()
  }


  render() {
    const { patient, products, total, discount } = this.props;
    const totalDiscount = !discount ? 0 : discount.discount;
    const dataHead = [
      { label: "CODE" },
      { label: "NOMBRE" },
      { label: "CANTIDAD" },
      { label: "PRECIO/U" },
      { label: "PRECIO/T" }
    ];
    return (
      <Container>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <div className="documentInfo">
            <h5>Documento electronico</h5>
            <h5>N° 249</h5>
          </div>
        </div>
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
                        <Cell>{formatNumber(product.price)}</Cell>
                        <Cell>
                          {product.quantity
                            ? formatNumber(product.quantity * product.price)
                            : formatNumber(product.price)}
                        </Cell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="makeTotal">
          <div className="totalStyle">
            <div className="list" style={{ paddingLeft: "10%" }}>
              <div className="list-body">
                <Typography variant="subtitle1" className="totalTitle">
                  Monto Neto:
                </Typography>
                <Typography variant="body1" className="numberStyle">
                  {formatNumber(total.subTotal)}
                </Typography>
                <Typography variant="subtitle1" className="subtitle">
                  {total.currency}
                </Typography>
              </div>
            </div>

            <div className="list" style={{ paddingLeft: "10%" }}>
              <div className="list-body">
                <Typography variant="subtitle1" className="totalTitle">
                  Impuesto ({total.percentageIva}%):
                </Typography>
                <Typography variant="body1" className="numberStyle">
                  {formatNumber(total.iva)}
                </Typography>
                <Typography variant="subtitle1" className="subtitle">
                  {total.currency}
                </Typography>
              </div>
            </div>

            <div className="list" style={{ paddingLeft: "10%" }}>
              <div className="list-body">
                <Typography variant="subtitle1" className="totalTitle">
                  Descuento:
                </Typography>
                <Typography variant="body1" className="numberStyle">
                  {formatNumber(totalDiscount)}
                </Typography>
                <Typography variant="subtitle1" className="subtitle">
                  {total.currency}
                </Typography>
              </div>
            </div>

            <div className="list" style={{ paddingLeft: "10%" }}>
              <div className="list-body">
                <Typography variant="subtitle1" className="totalTitle">
                  Total:
                </Typography>
                <Typography variant="body1" className="numberStyle">
                  {formatNumber(total.total)}
                </Typography>
                <Typography variant="subtitle1" className="subtitle">
                  {total.currency}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <ModalFooter>
          <Button color="primary">Imprimir</Button>
          <Button color="success" onClick={this.continue}>Continuar</Button>
        </ModalFooter>
      </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .totalTitle {
    width: 43%;
    font-weight: bold;
  }

  .numberStyle {
    width: 25%;
  }

  .documentInfo {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: red;
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
    width: 70%;
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
    justify-content: flex-end;

    .qrStyle {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .totalStyle {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;
