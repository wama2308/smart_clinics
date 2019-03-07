import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  CardFooter
} from "reactstrap";
import { Link } from "react-router-dom";
import AuthService from "../../../components/AuthService";
import HeaderLogo from "../../../components/HeaderLogo";
import Notifications, { notify } from "react-notify-toast";
import "../../../components/style.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      _username: "",
      _password: ""
      // login: [],
    };
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state._username, this.state._password)
      .then(res => {
        /*console.log(res.data);*/

        this.props.history.replace("/");
      })
      .catch(err => {
        // alert(err);
        console.log(err);
        let warningMessage = { background: "#fd3232", text: "#FFFFFF" };
        notify.show(
          "Correo y/o contraseña erroneos.",
          "custom",
          7000,
          warningMessage
        );
      });
  }

  render() {
    const top = {
      position: "absolute",
      width: "10%",
      top: "20px",
      left: "2%",
      // paddingTop: '15px',
      // paddingLeft: '10px',
      textAlign: "center"
    };
    return (
      <div className="app flex-row align-items-center background">
        <Container>
          <div align="left" style={top}>
            <HeaderLogo />
          </div>
          <Notifications />
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <form onSubmit={e => this.handleFormSubmit(e)}>
                    <CardBody>
                      <h1>Login</h1>
                      <p className="text-muted">Ingresa en tu cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="_username"
                          type="email"
                          placeholder="E-mail"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="_password"
                          type="password"
                          placeholder="Password"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="success" block>
                            Iniciar Sesión
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to={"/reset-password"}>
                            <Button color="link" className="px-0">
                              ¿Olvidaste tu contraseña?
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                      {/*
                      <CardFooter className="p-4">
                        <p className="text-muted text-center">O ingresa con una de tus redes</p>
                        <Row>
                          <Col xs="12" sm="6">
                            <Button className="btn-facebook" block><span>facebook</span></Button>
                          </Col>
                          <Col xs="12" sm="6">
                            <Button className="btn-twitter" block><span>twitter</span></Button>
                          </Col>
                        </Row>
                      </CardFooter> */}
                    </CardBody>
                  </form>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + "%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Registrar Cuenta</h2>
                      <p>Crear una cuenta en SmartClinic</p>
                      <Link to={"/register-email"}>
                        <Button color="primary" className="mt-3" active>
                          Registrarse Ahora
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
