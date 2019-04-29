import React from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import Search from "../../components/Select";
import styled from "styled-components";

class Client extends React.Component {
  state = {
    paciente: true
  };
  render() {
    return (
      <Card style={{ marginBottom: 10, flex: 1 }}>
        <Header>
          <div>Paciente</div>
          <div style={{ width: "40%" }}>
            <Search
              pressKey={true}
              searchAction={this.props.searchAction}
            />
          </div>
        </Header>
        <Body>
          <div className="message">
            Por favor selecciona un paciente para continuar
          </div>
          <div className="saveButton">
            <Button color="success">Agregar</Button>
          </div>
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
`;
