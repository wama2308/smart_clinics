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
  deleteItem
} from "../actions/ventasAction";

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
    console.log("data", optionsProducts);
    return (
      <Container>
        <div className="insight-container-one">
          <Client
            searchAction={this.props.searchOnePatient}
            getOptions={this.props.searchPatient}
            loaded={this.props.loaded}
            patient={this.props.patient}
            clean={this.props.clean}
            options={optionsPatient}
          />
          <div className="insight-container-two">
            <Ventas />
          </div>
        </div>
        <Products
          className="products"
          patient={this.props.patient}
          searchAction={this.props.searchProduct}
          options={optionsProducts}
          getProducts={this.props.searchOneSuppplie}
          products={this.props.products}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.global.searchloading,
  patient: state.ventas.get("patient"),
  options_patient: state.ventas.get("options_patient"),
  options_Product: state.ventas.get("products"),
  products: state.ventas.get("array_products")
});

export default connect(
  mapStateToProps,
  {
    searchPatient,
    clean,
    searchProduct,
    searchOnePatient,
    searchOneSuppplie,
    deleteItem
  }
)(VentasContainer);

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-gap: 10px;
  grid-template-columns: 100%;
  grid-template-rows: 37% 55%;
  .insight-container-one {
    display: grid;
    grid-template-columns: 60% 38.7%;
    grid-gap: 15px;
  }
  .insight-container-two {
    flex: 1;
    flex-direction: column;
    display: flex;
  }
`;
