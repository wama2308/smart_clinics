import React from "react";
import Ventas from "../views/Ventas/Ventas";
import Products from "../views/Ventas/Products";
import Client from "../views/Ventas/Client";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  searchPatient,
  clean,
  searchProduct,
  searchOnePatient,
  searchOneSuppplie,
  deleteItem,
  changeQuantytoSell,
  cancelToSell,
  saveInvoice
} from "../actions/ventasAction";
import { openConfirmDialog } from "../actions/aplicantionActions";
import Footer from "../views/Ventas/Footer";

class VentasContainer extends React.Component {
  optionsPatient = options => {
    if (!options) {
      return [];
    }
    const data = [];
    options.map(option => {
      data.push({
        label: `${option.type_identity}-${option.dni}  ${option.names}`
      });
    });
    return data;
  };

  optionsProducts = (options, products) => {
    if (!options) {
      return [];
    }

    if (!products) {
      const data = [];
      const result = [];
      options.map(option => {
        data.push({
          label: `${option.name}`,
          value: option._id
        });
      });
      return data;
    } else {
      const obj = {};
      let data = [];

      products.map((product, key) => {
        obj[product._id] = product._id;
      });
      if (Object.keys(obj).length > 0) {
        const result = options.map(option => {
          if (option._id !== obj[option._id]) {
            data.push({
              label: `${option.name}`,
              value: option._id
            });
          }
        });

        return data;
      }
    }
  };

  getTotal = (array, aplication) => {
    const obj = {
      subTotal: 0,
      iva: 0,
      total: 0
    };
    if (!array) {
      return obj;
    }

    let subtotal = 0;
    array.map(data => {
      const result = isNaN(data.quanty) ? data.price : data.quanty * data.price;
      subtotal = parseFloat(obj.subTotal) + parseFloat(result);
      obj.subTotal = subtotal.toFixed(2);
    });
    const iva =
      (parseFloat(obj.subTotal) * parseFloat(aplication.tax_rate)) / 100;
    obj.total = parseFloat(obj.subTotal + iva).toFixed(2);
    obj.iva = iva.toFixed(2);

    return obj;
  };

  saveSales = () => {
    console.log();
    console.log();
    const obj = {
      supplie_array: [this.props.products]
      //   sub_total: 900,
      //   igv: 10,
      //   total: 1000
    };
  };

  render() {
    const optionsPatient = this.optionsPatient(this.props.options_patient);
    const optionsProducts = this.optionsProducts(
      this.props.options_Product,
      this.props.products
    );

    return (
      <Container>
        <div style={{ height: "38%" }}>
          <div className="insight-container-one">
            <Client
              searchAction={this.props.searchOnePatient}
              getOptions={this.props.searchPatient}
              loaded={this.props.loaded}
              patient={this.props.patient}
              clean={this.props.clean}
              options={optionsPatient}
            />
            <Ventas />
          </div>
        </div>
        <div style={{ height: "62%" }}>
          <div className="insight-container-two">
            <Products
              className="products"
              patient={this.props.patient}
              searchAction={this.props.searchProduct}
              options={optionsProducts}
              getProducts={this.props.searchOneSuppplie}
              products={this.props.products}
              deleteAtion={this.props.deleteItem}
              changeQuantytoSell={this.props.changeQuantytoSell}
              aplication={this.props.aplication}
              getTotal={this.getTotal}
            />
            <Footer
              cancel={this.props.cancelToSell}
              confirm={this.props.openConfirmDialog}
              products={this.props.products}
              saveInvoice={this.saveSales}
            />
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.global.searchloading,
  patient: state.ventas.get("patient"),
  options_patient: state.ventas.get("options_patient"),
  options_Product: state.ventas.get("products"),
  products: state.ventas.get("array_products"),
  aplication: state.global.dataGeneral.dataCountries
});

export default connect(
  mapStateToProps,
  {
    searchPatient,
    clean,
    searchProduct,
    searchOnePatient,
    searchOneSuppplie,
    deleteItem,
    changeQuantytoSell,
    cancelToSell,
    openConfirmDialog,
    saveInvoice
  }
)(VentasContainer);

const Container = styled.div`
  height: 100%;
  .insight-container-one {
    flex: 1;
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .insight-container-two {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
