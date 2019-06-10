import React from "react";
import { Card, Button, Input } from "reactstrap";
import styled from "styled-components";
import MakeSale from "./MakeSale";

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

  close = () => {
    this.setState({ openModal: false });
  };

  render() {
    const disabled = this.props.products ? false : true;
    const discountDisabled =
      this.props.discount && this.props.discount.status === "WAITING";
    const ventaDisabled = disabled || discountDisabled ? true : false;

    const saveDisabled =
      this.props.statusSale === "PAID" || ventaDisabled ? true : false;
    return (
      <Container style={{ marginBottom: 0, marginTop: 10 }}>
        {this.state.openModal && (
          <MakeSale
            open={this.state.openModal}
            close={this.close}
            aplication={this.props.aplication}
            patient={this.props.patient}
            products={this.props.products}
            discount={this.props.discount}
            total={this.props.totalData}
            openSnackbars={this.props.openSnackbars}
            bill_id={this.props.bill_id}
            createSale={this.props.createSale}
            dataGeneral={this.props.dataGeneral}
            cancel={this.props.cancel}
            confirm={this.props.confirm}
            code_bill={this.props.code_bill}
          />
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          {!this.props.discount &&
            this.props.statusSale !== "BILLED" &&
            this.props.statusSale !== "PAID" && (
              <Button
                disabled={disabled}
                className="sellButtons"
                color="primary"
                onClick={() => this.props.openModal(false)}
              >
                Peticion de descuento
              </Button>
            )}

          {discountDisabled &&
            this.props.statusSale !== "BILLED" &&
            this.props.statusSale !== "PAID" && (
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

        <div style={{ display: "flex" }}>
          {this.props.products && (
            <Button
              color="danger"
              disabled={disabled}
              className="sellButtons"
              onClick={() => this.confirm("clean")}
            >
              Limpiar
            </Button>
          )}

          {this.props.products &&
            this.props.isSaved &&
            this.props.statusSale !== "BILLED" && (
              <Button
                color="danger"
                disabled={disabled}
                className="sellButtons"
                onClick={() => this.confirm("cancel")}
              >
                Anular
              </Button>
            )}
          {this.props.statusSale !== "BILLED" && (
            <div>
              <Button
                disabled={disabled}
                className="sellButtons"
                color="primary"
                onClick={this.props.saveInvoice}
                disabled={saveDisabled}
              >
                Guardar Factura
              </Button>
              <Button
                color="primary"
                className="sellButtons"
                disabled={ventaDisabled}
                onClick={() => this.setState({ openModal: true })}
              >
                Realizar Venta
              </Button>
            </div>
          )}
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
