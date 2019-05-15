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
  changeQuantytoSell
} from "../actions/ventasAction";
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
            />
            <Footer />
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
    changeQuantytoSell
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
