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
import CircularProgress from "@material-ui/core/CircularProgress";
import LastStep, { notify } from "react-notify-toast";
import HeaderLogo from "../../../components/HeaderLogo";
import Select from "react-select";
import "../../../components/style.css";
import jstz from "jstz";

class FormData extends Component {
  constructor(props) {
    super(props);
    const timezone = jstz.determine();
    this.state = {
      loading: false,
      names: undefined,
      surnanes: undefined,
      username: undefined,
      answerOne: "",
      answerTwo: "",
      answerThree: "",
      selectedOption: null,
      selectedOption1: null,
      selectedOption2: null,
      timeZ: timezone.name()
    };
  }

  componentDidMount = () => {
    this.props.loadSelect();
  };

  componentWillReceiveProps = props => {
    props.secretQuestion ? this.setState({ loading: true }) : null;
  };

  confirmQuestions = event => {
    event.preventDefault();
    const obj = {
      username: this.state.username,
      names: this.state.names,
      surnames: this.state.surnames,
      email: this.props.email,
      password: this.props.password,
      password_confirm: this.props.confirmPassword,
      secret_question1: this.state.selectedOption.value,
      secret_question2: this.state.selectedOption1.value,
      secret_question3: this.state.selectedOption2.value,
      secret_answer1: this.state.answerOne,
      secret_answer2: this.state.answerTwo,
      secret_answer3: this.state.answerThree,
      timeZ: this.state.timeZ
    };

    this.props.saveUser(obj);
  };

  disabledButtons = () => {
    if (
      this.state.answerOne === "" ||
      this.state.answerTwo === "" ||
      this.state.answerThree === "" ||
      this.state.selectedOption === null ||
      this.state.selectedOption1 === null ||
      this.state.selectedOption2 === null
    ) {
      return true;
    } else {
      return false;
    }
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  handleChange1 = selectedOption1 => {
    this.setState({ selectedOption1 });
  };

  handleChange2 = selectedOption2 => {
    this.setState({ selectedOption2 });
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
    console.log("data", this.props);

    const disabled = this.disabledButtons();
    console.log(disabled);
    const options = !this.props.secretQuestion ? [] : this.props.secretQuestion;
    return (
      <div className="app flex-row align-items-center background">
        <Container>
          <div style={top}>
            <HeaderLogo />
          </div>
          <br />
          <br />
          <br />
          <br />

          <LastStep />
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                {!this.state.loading && (
                  <div
                    style={{
                      height: 300,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                {this.state.loading && (
                  <CardBody className="p-4">
                    <form
                      className="formCodeConfirm"
                      onSubmit={event => this.confirmQuestions(event)}
                    >
                      <h1>Esta a punto de completar el registro</h1>
                      <p className="text-muted">
                        Debe elegir tres(3) preguntas de seguridad y asignarles
                        una respuesta.
                      </p>
                      <Select
                        placeholder="Pregunta #1"
                        name="questionOne"
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={options}
                      />
                      <InputGroup className="mb-3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-pencil" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Respuesta #1"
                            value={this.state.answerOne}
                            onChange={event =>
                              this.setState({ answerOne: event.target.value })
                            }
                          />
                        </InputGroup>
                      </InputGroup>

                      <Select
                        placeholder="Pregunta #2"
                        name="questionTwo"
                        value={this.state.selectedOption1}
                        onChange={this.handleChange1}
                        options={options}
                      />
                      <InputGroup className="mb-3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-pencil" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            value={this.state.answerTwo}
                            onChange={event =>
                              this.setState({ answerTwo: event.target.value })
                            }
                            type="text"
                            placeholder="Respuesta #2"
                          />
                        </InputGroup>
                      </InputGroup>

                      <Select
                        placeholder="Pregunta #3"
                        name="questionThree"
                        value={this.state.selectedOption2}
                        onChange={this.handleChange2}
                        options={options}
                      />
                      <InputGroup className="mb-3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-pencil" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            value={this.state.answerThree}
                            onChange={event =>
                              this.setState({ answerThree: event.target.value })
                            }
                            type="text"
                            placeholder="Respuesta #3"
                          />
                        </InputGroup>
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
                            disabled={disabled}
                            block
                          >
                            Aceptar
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FormData;
