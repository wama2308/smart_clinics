import React from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import { Typography, IconButton } from "@material-ui/core";
import Search from "../../components/DefaultSearch";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserRegister from "./userRegister";
import { Delete } from "@material-ui/icons";

class Client extends React.Component {
  state = {
    paciente: true,
    openModal: false,
    disabled: false
  };

  close = () => {
    this.setState({ openModal: false, disabled: false });
  };

  view = () => {
    this.setState({ openModal: true, disabled: true });
  };

  render() {
    const { patient } = this.props;
    const disabled = this.props.isSaved ? this.props.isSaved : false;
    const message = {
      "PENDING TO APPROVE": "PENDIENTE POR APROBAR",
      BILLED: "COMPLETADA",
      PAID: "POR PAGAR"
    };
    console.log("data",this.props.statusSale)
    const color =
      this.props.statusSale !== "PENDING TO APPROVE" ? "#357a38" : "#b2102f";

    return (
      <Card style={{ margin: "0px 10px 10px 0px", flex: 1 }}>
        {this.state.openModal && (
          <UserRegister
            open={this.state.openModal}
            disabled={this.state.disabled}
            close={this.close}
            patient={patient}
          />
        )}
        <Header>
          <div>Paciente</div>
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            {!patient && (
              <Search
                searchAction={this.props.searchAction}
                getOptions={this.props.getOptions}
                placeholder="Buscar paciente"
                options={this.props.options}
              />
            )}
            {patient && (
              <IconButton disabled={disabled} onClick={this.props.clean}>
                <Delete />
              </IconButton>
            )}
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

                  <div className="list">
                    <div className="list-body">
                      <Typography variant="subtitle1">Direccion:</Typography>
                      <Typography variant="body1" className="textSpace">
                        {patient.address}
                      </Typography>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: 26,
                      alignItems: "center"
                    }}
                  >
                    <div style={{ color: color }}>
                      {message[this.props.statusSale]}
                    </div>
                    <Button color="success" onClick={() => this.view()}>
                      Ver detalles
                    </Button>
                  </div>
                </div>
              )}
              {!patient && (
                <div
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  {patient === undefined && (
                    <div className="message">
                      Por favor selecciona un paciente para continuar
                    </div>
                  )}
                  {patient === null && (
                    <div className="message">
                      Paciente no encontrado, Registre el Paciente
                    </div>
                  )}
                  <div className="saveButton">
                    <Button
                      color="success"
                      onClick={() => this.setState({ openModal: true })}
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
  min-height: 73px;
  max-height: 73px;
`;

const Body = styled(CardBody)`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  overflow: auto;
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
    border-top: 0px solid #c8ced3;
    height: 55px;
    border-bottom: 1px solid #c8ced3;
    &-body {
      flex: 1;
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
