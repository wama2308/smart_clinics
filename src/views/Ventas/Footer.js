import React from "react";
import { Card, Button, Input } from "reactstrap";
import styled from "styled-components";
import DiscountRequest from "./discountRequest";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }

  openModal = () => {
    this.setState({
      openModal: true
    });
  };

  close = () => {
    this.setState({ openModal: false });
  };

  confirm = () => {
    const obj = {
      title: "Ventas",
      info: "Esta Seguro que decea limpiar los datos de esta Venta"
    };
    this.props.confirm(obj, res => {
      if (res) {
        this.props.cancel();
      }
    });
  };

  render() {
    const disabled = this.props.products ? false : true;
    return (
      <Container style={{ marginBottom: 0, marginTop: 10 }}>
        <DiscountRequest open={this.state.openModal} close={this.close} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            disabled={disabled}
            className="sellButtons"
            color="primary"
            onClick={this.openModal}
          >
            Peticion de descuento
          </Button>
        </div>

        <div>
          {this.props.products && (
            <Button
              color="danger"
              disabled={disabled}
              className="sellButtons"
              onClick={this.confirm}
            >
              Cancelar
            </Button>
          )}
          <Button
            disabled={disabled}
            className="sellButtons"
            color="primary"
            onClick={this.props.saveInvoice}
          >
            Guardar Factura
          </Button>
          <Button color="primary" className="sellButtons" disabled={disabled}>
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
