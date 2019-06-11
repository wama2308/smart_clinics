import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
import ValidateCode, { notify } from "react-notify-toast";
import HeaderLogo from "../../../components/HeaderLogo";

class ConfirmCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      validation_code: "",
      message: ""
    };
  }

  render() {
    const top = {
      position: "absolute",
      top: "20px",
      width: "10%",
      left: "2%",
      textAlign: "center"
    };
    return (
      <div className="app flex-row align-items-center background">
        <Container>
          <ValidateCode />
          <div style={top}>
            <HeaderLogo />
          </div>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <form
                    className="formCodeConfirm"
                    onSubmit={event => this.confirmCode(event)}
                  >
                    <h1>Confirmar Cuenta</h1>
                    <p className="text-muted">
                      Introduza el codigo enviado a {this.state.email}
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-pencil" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Code"
                        value={this.state.validation_code}
                        onChange={event =>
                          this.setState({ validation_code: event.target.value })
                        }
                      />
                    </InputGroup>
                    <br />
                    <Row style={{ align: "center" }}>
                      <div style={{ width: "7.5%" }} />
                      <Col xs="5">
                        <Button
                          style={{ width: "100%" }}
                          type="submit"
                          color="primary"
                          block
                        >
                          Aceptar
                        </Button>
                      </Col>
                      <Col xs="5" className="text-right">
                        <Link to="/register-email">
                          <Button style={{ width: "100%" }} color="danger">
                            <i className="icon-arrow-left" />
                            Volver
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ConfirmCode;
