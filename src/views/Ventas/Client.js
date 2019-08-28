import React from "react";
import { Card, CardHeader, CardBody, Button, Input } from "reactstrap";
import { Typography, IconButton } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Search from "../../components/DefaultSearch";
import UserRegister from "./userRegister";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import {
  getOptionsPersonal,
  cleanSearch,
  getOneReference,
  createReference
} from "../../actions/ventasAction";
import { Delete, PersonAdd } from "@material-ui/icons";
import ModalReferences from "./ModalReferences";

class Client extends React.Component {
  state = {
    paciente: true,
    openModal: false,
    disabled: false,
    openReference: false,
    anchorEl: null,
    referencia: "Personal interno",
    searched: null
  };

  close = () => {
    this.setState({ openModal: false, disabled: false });
  };

  searchAction = values => {
    this.props.getOneReference(values.value, res => {
      console.log("res de la accion", res);
      this.setState({
        searched: {
          ...res,
          name: res.names ? `${res.names} ${res.surnames}` : undefined
        }
      });
      this.props.cleanSearch();
    });
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

  orderOptions = value => {
    if (!value) {
      return;
    }
    const array = [];
    value.map(val => {
      array.push({
        label: `${val.names} ${val.surnames}  ${val.type_identity}-${val.dni} `,
        value: val._id
      });
    });

    return array;
  };

  getOptions = value => {
    const staff = this.state.referencia === "Personal interno" ? 0 : 1;
    this.props.getOptionsPersonal(staff, value);
  };

  orderExternalOptions = value => {
    if (!value) {
      return;
    }
    const array = [];
    value.map(val => {
      array.push({
        label: val.branchoffices_name,
        value: val._id
      });
    });

    return array;
  };

  saveReference = () => {
    console.log(this.state.searched);
    console.log(this.props.patient);
    const staff = this.state.referencia === "Personal interno" ? 0 : 1;
    let obj = {};
    if (staff === 0) {
      obj = {
        patient_id: this.props.patient._id,
        staff: staff,
        staff_id: this.state.searched._id
      };
    } else {
      obj = {
        patient_id: this.props.patient._id,
        staff: staff,
        medical_center: this.state.searched._id,
        branchoffice: this.state.searched.branchoffices_id
      };
    }
    this.props.createReference(obj, () => {
      this.setState({ searched: null });
      this.props.closeManualReference();
    });
  };

  render() {
    const { patient, selectedReferences } = this.props;
    const disabled = this.props.isSaved ? this.props.isSaved : false;
    const message = {
      "PENDING TO APPROVE": "PENDIENTE POR APROBAR",
      BILLED: "COMPLETADA",
      PAID: "POR PAGAR"
    };

    console.log("aca", this.state.searched);

    const optionsReferences =
      this.state.referencia === "Personal interno"
        ? this.orderOptions(this.props.optionsInternal)
        : this.orderExternalOptions(this.props.optionsExternal);

    const reference = [
      { label: "Personal interno", value: "Personal interno" },
      { label: "Centro medico externo", value: "Centro medico externo" }
    ];

    const definePatient = selectedReferences ? selectedReferences : [];

    const disabledForPatient = selectedReferences ? true : false;

    const color =
      this.props.statusSale !== "PENDING TO APPROVE" ? "#357a38" : "#b2102f";

    return (
      <Card
        style={{ margin: "0px 10px 10px 0px", flex: 1, maxHeight: 335.365 }}
      >
        {this.props.modalReference && (
          <ModalReferences
            open={this.props.modalReference}
            close={this.props.closeReferences}
            references={this.props.references}
            patient={patient}
          />
        )}
        {this.state.openModal && (
          <UserRegister
            open={this.state.openModal}
            disabled={this.state.disabled}
            close={this.close}
            patient={patient}
          />
        )}

        {definePatient && (
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
                {definePatient.names} {definePatient.surnames}
              </Typography>
              <Typography style={{ padding: 10, fontWeight: "bold" }}>
                Identificacion
              </Typography>
              <Typography
                style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}
              >
                {definePatient.type_identity}-{definePatient.dni}
              </Typography>
            </div>
          </Popover>
        )}
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
                placeholder="Buscar paciente"
                searchAction={this.props.searchAction}
                getOptions={this.props.getOptions}
                options={this.props.options}
              />
            )}
            {patient && (
              <IconButton
                disabled={disabled || disabledForPatient}
                onClick={this.props.openManualReference}
              >
                <PersonAdd />
              </IconButton>
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
              {patient && !this.props.manualReference && (
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
                      <Button color="success" onClick={() => this.view()}>
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {patient && this.props.manualReference && (
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
                      flex: 1,
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Input
                      type="select"
                      value={this.state.referencia}
                      onChange={event =>
                        this.setState({ referencia: event.target.value , searched: null })
                      }
                      style={{
                        width: "45%"
                      }}
                    >
                      {reference.map(ref => {
                        return <option value={ref.value}>{ref.label}</option>;
                      })}
                    </Input>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row-reverse"
                      }}
                    >
                      <div style={{ width: "65%" }}>
                        <Search
                          placeholder={`Buscar ${this.state.referencia}`}
                          getOptions={this.getOptions}
                          options={optionsReferences}
                          searchAction={this.searchAction}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="list" style={{ borderTop: "none" }}>
                      {this.state.searched &&
                        this.state.searched.medical_center && (
                          <div className="list-body">
                            <Typography variant="subtitle1">
                              Centro Medico:
                            </Typography>
                            <Typography variant="body1" className="textSpace">
                              {this.state.searched.medical_center}
                            </Typography>
                          </div>
                        )}
                      {this.state.searched  && this.state.referencia === "Personal interno" &&  (
                        <div className="list-body">
                          <Typography variant="subtitle1">Sucursal:</Typography>
                          <Typography variant="body1" className="textSpace">
                            {this.state.searched.branchoffices}
                          </Typography>
                        </div>
                      )}
                    </div>
                    <div className="list" style={{ marginBottom: 15 }}>
                      {this.state.referencia !== "Personal interno" &&
                        this.state.searched && (
                          <div className="list-body">
                            <Typography variant="subtitle1">
                              Sucursal:
                            </Typography>
                            <Typography variant="body1" className="textSpace">
                              {this.state.searched.branchoffices}
                            </Typography>
                          </div>
                        )}
                      {this.state.referencia === "Personal interno" && this.state.searched && this.state.searched.name && (
                        <div className="list-body">
                          <Typography variant="subtitle1">Nombre:</Typography>
                          <Typography variant="body1" className="textSpace">
                            {this.state.searched.name}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      justifyContent: "flex-end",
                      display: "flex"
                    }}
                  >
                    <Button
                      color="danger"
                      onClick={this.props.closeManualReference}
                    >
                      Cancelar
                    </Button>
                    &nbsp; &nbsp;
                    <Button color="success" onClick={this.saveReference}>
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

const mapStateToProps = state => ({
  aplication: state.global.dataGeneral,
  optionsInternal: state.ventas.get("options_internal"),
  optionsExternal: state.ventas.get("options_external")
});

export default connect(
  mapStateToProps,
  { getOptionsPersonal, cleanSearch, getOneReference, createReference }
)(Client);

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
