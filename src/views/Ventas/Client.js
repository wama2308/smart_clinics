import React from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import { Typography, IconButton } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Search from "../../components/DefaultSearch";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserRegister from "./userRegister";
import { Delete } from "@material-ui/icons";

class Client extends React.Component {
  state = {
    paciente: true,
    openModal: false,
    disabled: false,
    openReference: false,
    anchorEl: null,
    manualReference: false
  };

  close = () => {
    this.setState({ openModal: false, disabled: false });
  };

  view = () => {
    this.setState({ openModal: true, disabled: true });
  };

  referenceOpen = event => {
    this.setState({ openReference: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ openReference: false });
  };

  render() {
    const { patient } = this.props;
    const disabled = this.props.isSaved ? this.props.isSaved : false;
    const message = {
      "PENDING TO APPROVE": "PENDIENTE POR APROBAR",
      BILLED: "COMPLETADA",
      PAID: "POR PAGAR"
    };

    const definePatient =  []
    // patient
    //   ? patient.referencer._id
    //     ? patient.referencer._id
    //     : []
    //   : [];

    const disabledForPatient = false // definePatient.length > 0 ? true : false;

    const color =
      this.props.statusSale !== "PENDING TO APPROVE" ? "#357a38" : "#b2102f";

    return (
      <Card
        style={{ margin: "0px 10px 10px 0px", flex: 1, maxHeight: 335.365 }}
      >
        {this.state.openModal && (
          <UserRegister
            open={this.state.openModal}
            disabled={this.state.disabled}
            close={this.close}
            patient={patient}
          />
        )}

        {/* {patient && (
          <Popover
            open={this.state.openReference}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <div
              style={{
                borderRadius: "20%",
                width: 280
              }}
            >
              <Typography style={{ padding: 10, fontWeight: "bold" }}>
                Nombres
              </Typography>
              <Typography style={{ paddingLeft: 10, paddingRight: 10 }}>
                {patient.referencer.names} {patient.referencer.surnames}
              </Typography>
              <Typography style={{ padding: 10, fontWeight: "bold" }}>
                Identificacion
              </Typography>
              <Typography
                style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}
              >
                {patient.referencer.type_identity}-{patient.referencer.dni}
              </Typography>
            </div>
          </Popover>
        )} */}
        <Header>
          <div style={{ display: "flex", alignItems: "center" }}>
            Paciente
            {disabledForPatient && (
              <div
                onClick={this.referenceOpen}
                style={{
                  marginLeft: 10,
                  padding: 5,
                  background: "rgb(87, 214, 92)",
                  borderRadius: 20
                }}
              >
                Referenciado
              </div>
            )}
          </div>
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
              <IconButton
                disabled={disabled || disabledForPatient}
                onClick={this.props.clean}
              >
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
              {patient && !this.state.manualReference && (
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
                        {patient.type_identity
                          ? `${patient.type_identity}-`
                          : "hello"}
                        {patient.dni}
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
                    <div>
                      <Button
                        color="success"
                        onClick={() => this.setState({ manualReference: true })}
                      >
                        Referenciar
                      </Button>
                      &nbsp;
                      <Button color="success" onClick={() => this.view()}>
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {patient && this.state.manualReference && (
                <div
                  className="infoUser"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1
                  }}
                >
                  <div
                    style={{
                      flex: 1
                    }}
                  >
                    hello world
                  </div>
                  <div
                    style={{
                      justifyContent: "flex-end",
                      display: "flex"
                    }}
                  >
                    <Button
                      color="danger"
                      onClick={() => this.setState({ manualReference: true })}
                    >
                      Cancelar
                    </Button>
                    &nbsp;
                    <Button color="success" onClick={() => this.view()}>
                      Guardar
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
