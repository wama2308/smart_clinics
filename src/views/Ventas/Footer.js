import React from "react";
import { Card, Button, Input } from "reactstrap";
import styled from "styled-components";

export default class Footer extends React.Component {
  render() {
    const discountType = ["porcentaje", " valor"];

    return (
      <Container style={{ marginBottom: 0 , marginTop:10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input type="number" className="inputStyle" />
          <Input type="select" style={{ maxWidth: "20%" }} name="Descuento">
            {discountType.map((type, key) => {
              return <option key={key}> {type}</option>;
            })}
          </Input>

          <Button className="sellButtons" color="primary">
            Peticion de descuento
          </Button>
        </div>
        <div>
          <Button className="sellButtons" color="primary">
            Guardar Factura
          </Button>
          <Button color="primary" className="sellButtons">
            Realizar Venta
          </Button>
        </div>
      </Container>
    );
  }
}

const Container = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .sellButtons {
    padding: 10px;
    margin: 10px;
  }

  .inputStyle {
    height: 39px !important;
    /* padding-left: 9px; */
    margin-left: 10px;
    max-width: 20%;
    border-radius: 5px 0px 0px 5px;
  }
`;
