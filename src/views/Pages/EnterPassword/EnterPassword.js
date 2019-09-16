import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  InputGroup,
  Row
} from "reactstrap";
import LastStep, { notify } from "react-notify-toast";
import HeaderLogo from "../../../components/HeaderLogo";
import { Link } from "react-router-dom";
import "../../../components/style.css";

class FormData extends Component {
  constructor(props) {
    super(props);
  }

  verifyPassword = event => {
    event.preventDefault();
    if (this.props.password !== this.props.confirmPassword) {
      alert("es diferente");
    } else {
      this.props.newStep(this.props.step);
    }
  };

  render() {
    const { step } = this.props;
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
          <div style={top}>
            <HeaderLogo />
          </div>
          <LastStep />
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <form className="formCodeConfirm">
                    <h1>Introduza su nueva contraseña</h1>
                    <p className="text-muted">
                      Cree la contraseña para su cuenta.
                    </p>
                    <InputGroup className="mb-3">
                      <Input
                        type="password"
                        placeholder="Password"
                        value={this.props.password}
                        onChange={e => this.props.setPassword(e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input
                        type="password"
                        placeholder=" Confirm Password"
                        value={this.props.confirmPassword}
                        onChange={e =>
                          this.props.setConfirmPassword(e.target.value)
                        }
                      />
                    </InputGroup>
                    <br />
                    <Row style={{ align: "center" }}>
                      <div style={{ width: "7.5%" }} />
                      <Col xs="5" className="text-right">
                        <Button
                          style={{ width: "100%" }}
                          onClick={() => this.props.backStep(step)}
                          color="danger"
                        >
                          <i className="icon-arrow-left" />
                          Volver
                        </Button>
                      </Col>
                      <Col xs="5">
                        <Button
                          style={{ width: "100%" }}
                          type="submit"
                          color="primary"
                          onClick={this.verifyPassword}
                          block
                        >
                          Aceptar
                        </Button>
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

export default FormData;
