import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
// import {getLoginData} from '../../../components/LoginData'; 
import axios from 'axios';
import { HashRouter, Route, Switch, Link, withRoute } from 'react-router-dom';

//import {RegisterEmailToConfirm} from '../../../components/RegisterEmailToConfirm'; 
import {ConfirmCode} from '../ConfirmCode/ConfirmCode';
import Notifications, {notify} from 'react-notify-toast';
import HeaderLogo from '../../../components/HeaderLogo';
import { datosConexion } from '../../../components/Conexion.js';
import '../../../components/style.css';
import jstz from 'jstz';


class RegisterEmail extends Component {
  constructor(props){
    super(props)

    let valueConexion = "";
    let arrayConexion = Object.values(datosConexion);
    arrayConexion.forEach(function (elemento, indice, array) {
        if(indice === 1){
            valueConexion = elemento;
        }            
    });       

    const timezone = jstz.determine();

    this.state = {
        email:'',
        message: "",
        conexion: valueConexion,   
        timeZ: timezone.name(),
    }
  }

  // getUserData(){
  //   getLoginData()
  //     .then((login) => {
  //       this.setState({login});
  //       console.log({login});
  //   });
  // }

  // componentDidMount(){
  //   // this.getUserData();
  // } 


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
          <div align="left" style={top}><HeaderLogo /></div>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <form className="registerEmail" onSubmit={(event) => this.sendEmail(event)}
>
                  <h1>Registrar E-mail</h1>
                  <p className="text-muted">Crear cuenta</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-envelope"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={this.state.email}
                      onChange={event => this.setState({email:event.target.value})}
                      />
                  </InputGroup>
                  <br/>
                  <Row style={{align:'center'}}>
                    <div style={{width:'7.5%'}}></div>
                    <Col xs="5">
                    <Button style={{width: '100%'}} type="submit"  color="primary" block>Aceptar</Button>
                    </Col>
                    <Col xs="5" className="text-right">
                    <Link to="/login">
                    <Button style={{width: '100%'}} color="danger"><i className="icon-arrow-left"></i>Volver</Button>
                    </Link>
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


  // validateEmail(event) {
  //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(this.state.email);
  // console.log("pasaste el correo = " + this.state.email);
// }

  redirect(){
    this.props.history.push('/Login');
  }

  sendEmail(event){

    event.preventDefault();
    //const apiBaseUrl = 'http://localhost:8000/';
    //const apiBaseUrl = 'http://smartclinics.online/sc-admin/web/app.php/';
    const apiBaseUrl = this.state.conexion;
    const token={
      "email":this.state.email,
      "timeZ":this.state.timeZ,

      headers: {
        "Access-Control-Allow-Origin":"*",
        "Accept": "application/json",
        "Content-type": "application/json",
      }
    }

      // console.log(token);
    axios.put(apiBaseUrl+'api/CheckMaster', token)
    .then((res) => {
      console.log(res.data);
     this.state.message = res.data;
      if(this.state.message === 'Operacion exitosa'){
        this.props.history.push(
          {
            pathname: '/confirm-code',
            state: {email:this.state.email}
          }
        );

      }
      else if(this.state.message === "¡Ya le fue enviado un codigo de validacion, por favor revise su correo e ingrese el codigo!"){       
          
          let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };  
          notify.show(this.state.message, 'custom', 7000, warningMessage);
          setTimeout(() => {
            this.props.history.push(
              {
                pathname: '/confirm-code',
                state: {email:this.state.email}
              }
            );
          }, 4000);
          
      }
      else{
        this.setState({email:""});
        let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
        notify.show(this.state.message, 'custom', 7000, warningMessage);
      }

    })
    .catch((res)=>{
      console.log("Error al consultar el email");
    });

  }

}

export default RegisterEmail;