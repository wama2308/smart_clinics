import React from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import { Typography } from "@material-ui/core";
import Search from "../../components/DefaultSearch";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserRegister from "./userRegister";

class Client extends React.Component {
  state = {
    paciente: true,
    openModal: false
  };
  render() {
    const { patient } = this.props;
    return (
      <Card style={{ marginBottom: 10, flex: 1 }}>
        {this.state.openModal && <UserRegister open={this.state.open} />}
        <Header>
          <div>Paciente</div>
          <div style={{ width: "40%" }}>
            <Search
              pressKey={true}
              searchAction={this.props.searchAction}
              placeholder="Ingrese DNI"
            />
          </div>
        </Header>
        <Body>
          {this.props.loaded === false && (
            <div className="loading">
              <CircularProgress />
            </div>
          )}
          {this.props.loaded && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {patient && (
                <div className="infoUser">
                  <div className="list" style={{ borderTop: "none" }}>
                    <div className="list-body">
                      <Typography variant="subtitle1">Nombre:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {patient.names} {patient.surnames}
                      </Typography>
                    </div>
                    <div className="list-body">
                      <Typography variant="subtitle1">DNI:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {patient.type_identity}-{patient.dni}
                      </Typography>
                    </div>
                  </div>
                  <div className="list">
                    <div className="list-body">
                      <Typography variant="subtitle1">Sexo:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {patient.sex}
                      </Typography>
                    </div>
                    <div className="list-body">
                      <Typography variant="subtitle1">F/N:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {patient.birth_date}
                      </Typography>
                    </div>

                    <div className="list-body">
                      <Typography variant="subtitle1">Estado civil:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {patient.civil_state}
                      </Typography>
                    </div>
                  </div>
                  <div className="list">
                    <div className="list-body">
                      <Typography variant="subtitle1">Pais:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {"Venezulea"}
                      </Typography>
                    </div>
                    <div className="list-body">
                      <Typography variant="subtitle1">Princia:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {patient.province}
                      </Typography>
                    </div>
                    <div className="list-body">
                      <Typography variant="subtitle1">ciudad:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {patient.district}
                      </Typography>
                    </div>
                  </div>
                  <div className="list">
                    <div className="list-body">
                      <Typography variant="subtitle1">Direccion:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {"Esquina carrera 13 Barrio el liceo"}
                      </Typography>
                    </div>
                  </div>

                  <div className="list">
                    <div className="list-body">
                      <Typography variant="subtitle1">Correo:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {patient.email[0]}
                      </Typography>
                    </div>
                    <div className="list-body">
                      <Typography variant="subtitle1">Telefono:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {patient.phone[0]}
                      </Typography>
                    </div>
                  </div>
                </div>
              )}
              {!patient && (
                <div
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <div className="message">
                    Por favor selecciona un paciente para continuar
                  </div>
                  <div className="saveButton">
                    <Button
                      color="success"
                      onClick={()=>this.setState({ openModal: true })}
                    >
                      Agregar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Body>
      </Card>
    );
  }
}

export default Client;

const Header = styled(CardHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled(CardBody)`
  display: flex;
  flex-direction: column;
  .message {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: inherit;
    font-family: sans-serif;
  }

  .saveButton {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .list {
    display: flex;
    align-items: center;
    border-top: 1px solid #c8ced3;
    height: 60px;
    border-bottom: 1px solid #c8ced3;
    &-body {
      display: flex;
      padding-right: 10%;
      align-items: baseline;
    }
  }
  .textSpace {
    padding-left: 10px;
  }

  .loading {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
