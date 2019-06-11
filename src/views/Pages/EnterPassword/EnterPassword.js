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
    this.state = {
      confirmPassword: ""
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
          <div style={top}>
            <HeaderLogo />
          </div>
          <LastStep />
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <form
                    className="formCodeConfirm"
                    onSubmit={e => this.enterPassword(e)}
                  >
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
                        value={this.state.confirmPassword}
                        onChange={e =>
                          this.setState({ confirmPassword: e.target.value })
                        }
                      />
                    </InputGroup>
                    <br />
                    <Row style={{ align: "center" }}>
                      <div style={{ width: "7.5%" }} />
                      <Col xs="5" className="text-right">
                        <Link to="/confirm-code">
                          <Button style={{ width: "100%" }} color="danger">
                            <i className="icon-arrow-left" />
                            Volver
                          </Button>
                        </Link>
                      </Col>
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
