import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import LastStep, {notify} from 'react-notify-toast';
import HeaderLogo from '../../../components/HeaderLogo';
import Select from 'react-select';
import { datosConexion } from '../../../components/Conexion.js'
import { Link } from 'react-router-dom';
import '../../../components/style.css';
import jstz from 'jstz';


class FormData extends Component {
    constructor(props){
        super(props);

        let valueConexion = "";
        let arrayConexion = Object.values(datosConexion);
        arrayConexion.forEach(function (elemento, indice, array) {
            if(indice === 1){
                valueConexion = elemento;
            }            
        }); 

        const timezone = jstz.determine();

        this.state = {
          questions: [],
          questionOne: '',
          questionTwo: '',
          questionThree: '',
          answerOne: '',
          answerTwo: '',
          answerThree: '',
          selectedOption: null,
          selectedOption1: null,
          selectedOption2: null,
          conexion: valueConexion,
          timeZ: timezone.name(),
        // password:'',
        // confirmPassword:'',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
      }

      componentDidMount(){
      // Constante email seria vacia porque si alguien ingresa directamente a la direccion sin haber pasado
      // el correo por el registro, el try, catch es porque si this.props.location.state.email es null
      // la pagina explotara.

      const email = "";
        try {
          this.email = this.props.location.state.email;
        }
        catch(err){
          console.log(err);
        }

      const password = "";
        try {
          this.password = this.props.location.state.password;
        }
        catch(err){
          console.log(err); //en pijama en pijama
        }  

      }
      // Obtener preguntas
    componentWillMount(){
      const apiBaseUrl = this.state.conexion;
      //const apiBaseUrl = "http://smartclinics.online/sc-admin/web/app.php/";
      //const apiBaseUrl = 'http://localhost:8000/';
      axios.get(apiBaseUrl+'api/LoadSelects')
      .then((res) => {
        this.setState({
          questions: res.data,
        });
      })

    }

    handleChange = (selectedOption) => {
      this.setState({ selectedOption });    
      //console.log(`Option selected:`, selectedOption);
    }

    handleChange1 = (selectedOption1) => {
      this.setState({ selectedOption1 });    
      //console.log(`Option selected:`, selectedOption);
    }

    handleChange2 = (selectedOption2) => {
      this.setState({ selectedOption2 });    
      //console.log(`Option selected:`, selectedOption);
    }


    confirmQuestions(e){
      e.preventDefault();

      if((this.state.selectedOption === null) || (this.state.selectedOption.length === 0)){

        let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
        notify.show("Seleccione la pregunta #1", 'custom', 7000, warningMessage);

      }else if (this.state.answerOne === ""){

        let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
        notify.show("Ingrese la respuesta #1", 'custom', 7000, warningMessage);

      }else if((this.state.selectedOption1 === null) || (this.state.selectedOption1.length === 0)){

        let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
        notify.show("Ingrese la pregunta #2", 'custom', 7000, warningMessage);

      }else if (this.state.answerTwo === ""){

        let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
        notify.show("Ingrese la respuesta #2", 'custom', 7000, warningMessage);

      }else if((this.state.selectedOption2 === null) || (this.state.selectedOption2.length === 0)){

        let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
        notify.show("Ingrese la pregunta #3", 'custom', 7000, warningMessage);

      }else if (this.state.answerThree === ""){

        let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
        notify.show("Ingrese la respuesta #3", 'custom', 7000, warningMessage);

      }else if((this.state.selectedOption === this.state.selectedOption1) || (this.state.selectedOption === this.state.selectedOption2)
            || (this.state.selectedOption1 === this.state.selectedOption) || (this.state.selectedOption1 === this.state.selectedOption2)
            || (this.state.selectedOption2 === this.state.selectedOption) || (this.state.selectedOption2 === this.state.selectedOption1))
      {

        let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
        notify.show("Seleccione tres preguntas distintas", 'custom', 7000, warningMessage);

      }else{

        let valueQuestions1 = "";   
        let arrayQuestions1 = Object.values(this.state.selectedOption);
        arrayQuestions1.forEach(function (elemento, indice, array) {
            if(indice === 0){
                valueQuestions1 = elemento;
            }            
        }); 

        let valueQuestions2 = "";   
        let arrayQuestions2 = Object.values(this.state.selectedOption1);
        arrayQuestions2.forEach(function (elemento, indice, array) {
            if(indice === 0){
                valueQuestions2 = elemento;
            }            
        });  

        let valueQuestions3 = "";   
        let arrayQuestions3 = Object.values(this.state.selectedOption2);
        arrayQuestions3.forEach(function (elemento, indice, array) {
            if(indice === 0){
                valueQuestions3 = elemento;
            }            
        });        

        const apiBaseUrl = this.state.conexion;
        //const apiBaseUrl = 'http://smartclinics.online/sc-admin/web/app.php/';
        //const apiBaseUrl = 'http://localhost:8000/';
        const token={
              "email":this.email,
              "password":this.password,
              "secret_question1": valueQuestions1,
              "secret_question2": valueQuestions2,
              "secret_question3": valueQuestions3,
              "secret_answer1":this.state.answerOne,
              "secret_answer2":this.state.answerTwo,
              "secret_answer3":this.state.answerThree,
              "timeZ":this.state.timeZ,

              headers: {
              "Accept": "application/json",
              "Content-type": "application/json"
              }
        }

        axios.post(apiBaseUrl+'api/RegisterUserMaster', token)
        .then((res) => {
          /*console.log(res);
          console.log(token);*/

          let isOkey = { background: "#058f3c", text: "#FFFFFF" };
          notify.show("Usuario registrado correctamente", 'custom', 7000, isOkey);

          setTimeout(() => {
            this.props.history.push(
            {
              pathname: '/login',
            });
          }, 4000);
        })
        

      }
    }


  render() {
     const top = {
      position: "absolute",
      top: '20px',
      width: "10%",
      left: '2%',
      //paddingTop: '15px',
      //paddingLeft: '10px',
      textAlign: 'center',
    }

    return (
      <div className="app flex-row align-items-center background">
        <Container>
        <div style={top}><HeaderLogo /></div>
          <br />
          <br />
          <br />
          <br />
          
          <LastStep />
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <form className="formCodeConfirm" onSubmit={(event)=> this.confirmQuestions(event)}>
                  <h1>Esta a punto de completar el registro</h1>
                  <p className="text-muted">Debe elegir tres(3) preguntas de seguridad y asignarles una respuesta.</p>
                  <Select placeholder="Pregunta #1" name="questionOne" value={this.state.selectedOption} onChange={this.handleChange} options={this.state.questions} />
                  <InputGroup className="mb-3">
                    {/*<select className="form-control" value={this.state.questionOne} onChange={this.onHandleQuestionOne}>
                      <option value="">Seleccionar</option>
                        {
                          this.state.questions.map((c,i) => <option key={i} value={c}>{c}</option>)
                        }
                    </select>*/}

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-pencil"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        placeholder="Respuesta #1"
                        value={this.state.answerOne}
                        onChange={event => this.setState({answerOne:event.target.value})}
                    />
                  </InputGroup>
                  </InputGroup>

                  <Select placeholder="Pregunta #2" name="questionTwo" value={this.state.selectedOption1} onChange={this.handleChange1} options={this.state.questions} />
                  <InputGroup className="mb-3">
                    {/*<select className="form-control" value={this.state.questionTwo} onChange={this.onHandleQuestionTwo}>
                      <option value="">Seleccionar</option>
                        {
                          this.state.questions.map((c,i) => <option key={i} value={c}>{c}</option>)
                        }
                    </select>*/}

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-pencil"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        value={this.state.answerTwo}
                        onChange={event => this.setState({answerTwo:event.target.value})}
                        type="text"
                        placeholder="Respuesta #2"
                    />
                  </InputGroup>
                  </InputGroup>

                  <Select placeholder="Pregunta #3" name="questionThree" value={this.state.selectedOption2} onChange={this.handleChange2} options={this.state.questions} />
                  <InputGroup className="mb-3">
                    {/*<select className="form-control" value={this.state.questionThree} onChange={this.onHandleQuestionThree}>
                      <option value="">Seleccionar</option>
                        {
                          this.state.questions.map((c,i) => <option key={i} value={c}>{c}</option>)
                        }
                    </select>*/}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-pencil"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        value={this.state.answerThree}
                        onChange={event => this.setState({answerThree:event.target.value})}
                        type="text"
                        placeholder="Respuesta #3"
                    />
                  </InputGroup>
                  </InputGroup>
                  <br/>
                  <Row style={{align:'center'}}>
                    <div style={{width:'7.5%'}}></div>
                    <Col xs="5">
                        <Button style={{width: '100%'}} type="submit"  color="primary" block>Aceptar</Button>
                    </Col>
                    <Col xs="5" className="text-right">
                      <Link to="/enter-password">
                        <Button style={{width: '100%'}} color="danger"><i className="icon-arrow-left"></i>Volver</Button>
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

export default FormData;

