import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

import { Link } from 'react-router-dom';
import ValidateCode, {notify} from 'react-notify-toast';
import HeaderLogo from '../../../components/HeaderLogo';
import { datosConexion } from '../../../components/Conexion.js';
import '../../../components/style.css';


class ConfirmCode extends Component {
    constructor(props){
        super(props);

        let valueConexion = "";
        let arrayConexion = Object.values(datosConexion);
        arrayConexion.forEach(function (elemento, indice, array) {
            if(indice === 1){
                valueConexion = elemento;
            }            
        });       

        this.state = {
          email:this.props.location.state.email,                                              
          validation_code:"",
          message:"",
          conexion: valueConexion,            
        }
      }


componentDidMount(){
  try {
    this.email = this.props.location.state.email;
    console.log(this.email);
  }
  catch(err){
    let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
    notify.show(err.message, 'custom', 7000, warningMessage);
  }
    let isOkey = { background: "#058f3c", text: "#FFFFFF" };
    notify.show("Revise su correo electronico e introduzca el codigo de validacion", "custom", 7000, isOkey);
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
          <ValidateCode />
          <div style={top}><HeaderLogo /></div>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <form className="formCodeConfirm" onSubmit={(event)=> this.confirmCode(event)}>
                  <h1>Confirmar Cuenta</h1>
                  <p className="text-muted">Introduza el codigo enviado a {this.state.email}</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-pencil"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="password"
                        placeholder="Code"
                        value={this.state.validation_code}
                        onChange={event => this.setState({validation_code:event.target.value})}
                    />
                  </InputGroup>
                  <br/>
                  <Row style={{align:'center'}}>
                    <div style={{width:'7.5%'}}></div>
                    <Col xs="5">
                        <Button style={{width: '100%'}} type="submit"  color="primary" block>Aceptar</Button>
                    </Col>
                    <Col xs="5" className="text-right">
                      <Link to="/register-email">
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

    confirmCode(event){
      event.preventDefault();
      //const apiBaseUrl = 'http://localhost:8000/';
      //const apiBaseUrl = 'http://smartclinics.online/sc-admin/web/app.php/';
      const apiBaseUrl = this.state.conexion;
        const token={
            "email":this.email,
            "validation_code":this.state.validation_code,
            headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        }
      };
        console.log(token);
      axios.put(apiBaseUrl+'api/CheckCodeValidation', token)
            .then((res) => {
            this.state.message = res.data;
            // console.log(this.state.message);
            // console.log(this.email);
            if(typeof this.email === 'undefined'){
              let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
              notify.show("Previamente no fue ingresado un correo electronico", 'custom', 7000, warningMessage);
            }
            if (this.state.message === "Email y codigo valido") {
              let isOkey = { background: "#058f3c", text: "#FFFFFF" };
              notify.show(this.state.message, 'custom', 7000, isOkey);

              this.props.history.push(
                {
                  pathname: '/enter-password',
                  state: {email:this.email}
                }
              );

            } else {
              let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
              notify.show(this.state.message, 'custom', 7000, warningMessage);
            }
            // this.setState({email:""});
            //     if(this.state.message == 'Operacion exitosa'){
            //         this.props.history.push('/confirm-code')
            //   }

        })

    }


}

export default ConfirmCode;
