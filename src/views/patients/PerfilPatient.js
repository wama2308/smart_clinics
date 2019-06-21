import React from "react";
import styled from "styled-components";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import { Favorite } from "@material-ui/icons";

export default class PerfilPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1
    };
  }
  render() {
    return (
      <Container>
        <div className="perfilContainer">
          <img src="assets/rendon.jpg" className="perfilImg" />
          <div style={{ flex: 1 }}>
            <h1>Greeicy Rendon</h1>
            <div style={{ display: "flex" }}>
              <h6 style={{ paddingRight: 10 }}>Dni: V-21492475</h6>
              <h6>Edad: 24 Años</h6>
            </div>
            <h6>Sexo: Femenino</h6>
          </div>
        </div>
        <div />

        <div className="perfilData">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flex: 1,
              alignItems: "center"
            }}
          >
            <span>
              <img
                src="assets/blood.svg"
                alt="Smiley face"
                height="40"
                width="30"
                color="red"
              />
              <strong> O+</strong>
            </span>
            <span>
              <Favorite
                style={{
                  color: "#757575"
                }}
              />
              <strong> 123 ppm</strong>
            </span>

            <span>
              <img
                src="assets/negocios.svg"
                alt="Smiley face"
                height="40"
                width="30"
                color="red"
              />
              <strong> 65 KL</strong>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flex: 1,
              alignItems: "center"
            }}
          >
            <span style={{ marginLeft: 10 }}>
              <img
                src="assets/altura.svg"
                alt="Smiley face"
                height="40"
                width="30"
                color="red"
              />
              <strong> 134 cm</strong>
            </span>
            <span style={{ width: "48%" }}>
              <img
                src="assets/imc.svg"
                alt="Smiley face"
                height="40"
                width="30"
                color="red"
              />
              <strong> 123 IMC</strong>
            </span>
          </div>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex: 1;
  .perfilContainer {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .perfilData {
    flex: 1;
    border-left: 1px solid #c8ced3;
    display: flex;
    flex-direction: column;
  }
  .perfilImg {
    border-radius: 100%;
    width: 130px;
    height: 150px;
    margin-right: 20px;
  }

  .perfilDatos {
    flex: 1;
  }
`;
