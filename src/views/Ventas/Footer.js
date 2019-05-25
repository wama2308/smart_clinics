import React from "react";
import { Card, Button, Input } from "reactstrap";
import styled from "styled-components";
import DiscountRequest from "./discountRequest";

const message = {
  clean: "Esta Seguro que desea limpiar los datos de esta Venta",
  cancel: "Esta seguro que desea anular la factura"
};

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }

  confirm = type => {
    const obj = {
      title: "Ventas",
      info: message[type]
    };
    this.props.confirm(obj, res => {
      if (res) {
        switch (type) {
          case "clean":
            this.props.cancel();
            break;

          case "cancel":
            this.props.cancelled(this.props.bill_id);
            break;
        }
      }
    });
  };

  editOrCancelDiscount = type => {
    this.props.editAndCancel({
      bill_id: this.props.bill_id,
      discount: {
        discount: this.props.discount.discount,
        percentage: this.props.discount.percentage
      },
      accept: type
    });
  };

  render() {
    console.log("the footer", this.props);
    const disabled = this.props.products ? false : true;
    console.log("discount", this.props.discount);
    const discountDisabled =
      this.props.discount && this.props.discount.status === "WAITING";
    const ventaDisabled = disabled || discountDisabled ? true : false;
    return (
      <Container style={{ marginBottom: 0, marginTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {!this.props.discount && (
            <Button
              disabled={disabled}
              className="sellButtons"
              color="primary"
              onClick={() => this.props.openModal(false)}
            >
              Peticion de descuento
            </Button>
          )}

          {discountDisabled && (
            <div>
              <Button
                disabled={disabled}
                className="sellButtons"
                color="danger"
                onClick={() => {
                  this.editOrCancelDiscount(0);
                }}
              >
                Cancelar Solicitud
              </Button>

              <Button
                disabled={disabled}
                className="sellButtons"
                color="primary"
                onClick={() => {
                  this.props.openModal(true);
                }}
              >
                Editar Solicitud
              </Button>
            </div>
          )}

          {this.props.discount && this.props.discount.status === "CANCELLED" && (
            <Button
              disabled={disabled}
              className="sellButtons"
              color="primary"
              onClick={() => {
                this.props.openModal(true);
              }}
            >
              Nueva Solicitud de descuento
            </Button>
          )}
        </div>

        <div>
          {this.props.products && (
            <Button
              color="danger"
              disabled={disabled}
              className="sellButtons"
              onClick={() => this.confirm("clean")}
            >
              Cancelar
            </Button>
          )}

          {this.props.products && this.props.isSaved && (
            <Button
              color="danger"
              disabled={disabled}
              className="sellButtons"
              onClick={() => this.confirm("cancel")}
            >
              ANULAR
            </Button>
          )}

          <Button
            disabled={disabled}
            className="sellButtons"
            color="primary"
            onClick={this.props.saveInvoice}
            disabled={ventaDisabled}
          >
            Guardar Factura
          </Button>
          <Button
            color="primary"
            className="sellButtons"
            disabled={ventaDisabled}
          >
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
