import React from "react";
import Ventas from "../views/Ventas/Ventas";
import Products from "../views/Ventas/Products";
import Client from "../views/Ventas/Client";
import styled from "styled-components";
import { connect } from "react-redux";
import { searchPatient } from "../actions/ventasAction";

class VentasContainer extends React.Component {
  render() {
    return (
      <Container>
        <div className="insight-container-one">
          <Client
            searchAction={this.props.searchPatient}
            loaded={this.props.loaded}
            patient={this.props.patient}
          />
          <Products className="products" />
        </div>
        <div className="insight-container-two">
          <Ventas />
        </div>
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
  { searchPatient }
)(VentasContainer);

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-gap: 10px;
  grid-template-columns: 62% 38%;
  .insight-container-one {
    flex: 1;
    flex-direction: column;
    display: flex;
  }
  .insight-container-two {
    flex: 1;
    flex-direction: column;
    display: flex;
  }
`;
