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
import Notifications, { notify } from "react-notify-toast";
import HeaderLogo from "../../../components/HeaderLogo";
import { connect } from "react-redux";
import { register } from "../../../actions/authActions";
import { withRouter } from "react-router-dom";
import jstz from "jstz";

class RegisterEmail extends Component {
  constructor(props) {
    super(props);
    const timezone = jstz.determine();
    this.state = {
      email: "",
      message: "",
      timeZ: timezone.name()
    };
  }

  sendEmail = event => {
    event.preventDefault();
    this.props.register(this.props.email, this.state.timeZ);
  };

  render() {
    const { email, step } = this.props;
    const top = {
      position: "absolute",
      top: "20px",
      width: "10%",
      left: "2%",
      textAlign: "center"
    };
    const disabled = !email ? true : false;
    return (
      <div className="app flex-row align-items-center background">
        <Container>
          <div align="left" style={top}>
            <HeaderLogo />
          </div>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <form
                    className="registerEmail"
                    onSubmit={event => {
                      this.sendEmail(event);
                    }}
                  >
                    <h1>Registrar E-mail</h1>
                    <p className="text-muted">Crear cuenta</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        placeholder="E-mail"
                        value={this.props.email}
                        onChange={event =>
                          this.props.setEmail(event.target.value)
                        }
                      />
                    </InputGroup>
                    <br />
                    <Row style={{ align: "center" }}>
                      <div style={{ width: "7.5%" }} />
                      <Col xs="5" className="text-right">
                        <Button
                          style={{ width: "100%" }}
                          onClick={() => this.props.backStep(undefined)}
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
                          disabled={disabled}
                          block
                        >
                          Aceptar
                        </Button>
                      </Col>
                    </Row>
                  </form>
                  <div className="text-center">
                    <Notifications />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.auth.get("authStep")
});

export default withRouter(
  connect(
    mapStateToProps,
    { register }
  )(RegisterEmail)
);
