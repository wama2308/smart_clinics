import React from "react";
import { Warning } from "@material-ui/icons";
import styled from "styled-components";

class MedicalHistory extends React.Component {
  render() {
    return (
      <Container>
        <div className="antecedentesContainer">
          <div className="alergiasContainer">
            <h5 style={{ color: "#007bff", paddingTop: 20 }}>ALERGIAS</h5>
            <div
              style={{
                display: "flex ",
                minHeight: 190,
                alignItems: "center",
                justifyContent: "space-around",
                background: "#b71c1c3d",
                color: "#b71c1c"
              }}
            >
              <div
                className="antecedentes alergiaspane"
                style={{ borderBottom: "none" }}
              >
                <strong className="title titleAlergias">
                  <Warning /> Alergias a medicamentos
                </strong>
                <span>- el webo de judas</span>
                <span>- Acetaminofen</span>
                <span>- las bolas de barrabas</span>
              </div>
              <div
                className="antecedentes alergiaspane"
                style={{ borderBottom: "none" }}
              >
                <strong className="title  titleAlergias">
                  Otras categorias
                </strong>
                <span>- Many</span>
                <span>- Camarones</span>
              </div>
            </div>
          </div>
          <div>
            <h5 style={{ color: "#007bff" }}>ANTECEDENTES PATOLOGICOS </h5>
            <div className="antecedentes">
              <strong className="title">Operacion de Corazon habierto</strong>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas vitae mauris blandit, pharetra nulla at, condimentum
                ligula. Phasellus pulvinar diam quam. Phasellus leo lorem,
                malesuada sit amet nunc at, scelerisque viverra dui. Suspendisse
                pellentesque feugiat libero, in{" "}
              </span>
            </div>
            <div className="antecedentes">
              <strong className="title">Traumaticos</strong>
              <span>Hace 7 meses se dio un golpe fuerte en la cabeza</span>
            </div>
            <div className="antecedentes">
              <strong className="title">hospitalizacion</strong>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas vitae mauris blandit, pharetra nulla at, condimentum
                ligula. Phasellus pulvinar diam quam. Phasellus leo lorem,
                malesuada sit amet nunc at, scelerisque viverra dui. Suspendisse
                pellentesque feugiat libero, in{" "}
              </span>
            </div>
          </div>

          <div>
            <h5 style={{ color: "#007bff", paddingTop: 20 }}>
              ANTECEDENTES FAMILIARES{" "}
            </h5>
            <div className="antecedentes">
              <strong className="title">Cardiopatia</strong>
              <span>Padre Materno presento Problemas de corazon</span>
            </div>

            <div className="antecedentes">
              <strong className="title">Hipertension</strong>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas
              </span>
            </div>
          </div>
        </div>
        <div className="medicamentos">
          <h5 style={{ color: "#007bff", padding: 20, textAlign: "center" }}>
            MEDICINAS ACTIVAS
          </h5>
        </div>
      </Container>
    );
  }
}

export default MedicalHistory;
const Container = styled.div`
  display: flex;

  .antecedentesContainer {
    flex: 1.3;
  }
  .medicamentos {
    flex: 0.7;
  }

  .alergiaspane {
    display: flex;
    flex-direction: column;
  }

  .title {
    margin-right: 20px;
  }

  .titleAlergias {
    padding-bottom: 5px;
    display: flex;
    align-items: flex-end;
  }
  .alergiasContainer {
    padding-bottom: 20px;
  }
  .antecedentes {
    padding: 20px 0px;
    border-bottom: 1px solid #c8ced3;
  }
`;
