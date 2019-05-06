import React from "react";
import Ventas from "../views/Ventas/Ventas";
import Products from "../views/Ventas/Products";
import Client from "../views/Ventas/Client";
import styled from "styled-components";
import { connect } from "react-redux";
import { searchPatient, clean, searchProduct } from "../actions/ventasAction";

class VentasContainer extends React.Component {
  render() {
    return (
      <Container>
        <div className="insight-container-one">
          <Client
            searchAction={this.props.searchPatient}
            loaded={this.props.loaded}
            patient={this.props.patient}
            clean={this.props.clean}
          />
          <div className="insight-container-two">
            <Ventas />
          </div>
        </div>
        <Products
          className="products"
          patient={this.props.patient}
          searchAction={this.props.searchProduct}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.global.searchloading,
  patient: state.ventas.get("patient")
});

export default connect(
  mapStateToProps,
  { searchPatient, clean, searchProduct }
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
