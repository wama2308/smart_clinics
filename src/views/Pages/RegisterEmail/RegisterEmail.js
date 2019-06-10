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
    this.props.register(this.state.email, this.state.timeZ);
  };

  render() {
    const top = {
      position: "absolute",
      top: "20px",
      width: "10%",
      left: "2%",
      textAlign: "center"
    };
    console.log("data", this.props.step);
    const disabled = this.state.email.length <= 1 ? true : false;
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
                        value={this.state.email}
                        onChange={event =>
                          this.setState({ email: event.target.value })
                        }
                      />
                    </InputGroup>
                    <br />
                    <Row style={{ align: "center" }}>
                      <div style={{ width: "7.5%" }} />
                      <Col xs="5" className="text-right">
                        <Link to="/login">
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
  step: state.auth.toJS()
});

export default connect(
  mapStateToProps,
  { register }
)(RegisterEmail);
