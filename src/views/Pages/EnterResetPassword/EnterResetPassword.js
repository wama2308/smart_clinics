import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router';
import LastStep, {notify} from 'react-notify-toast';
import HeaderLogo from '../../../components/HeaderLogo';
import { datosConexion } from '../../../components/Conexion.js';
import { HashRouter, Route, Switch, Link, withRoute } from 'react-router-dom';
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
          password:'',
          confirmPassword:'',
          timeZ: timezone.name(),
          conexion: valueConexion,
        }

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

      }


   enterPassword(e){

    e.preventDefault();
    const password = this.state.password;
    

     if(this.state.password === "" ||
        this.state.confirmPassword === ""
      ){
          // console.log("Debe seleccionar 3 preguntas y responderlas");
          let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
          notify.show("Por favor introduzca su contraseña", 'custom', 7000, warningMessage);
        } else if (
            this.state.password != this.state.confirmPassword) {
              // console.log("Las contraseñas no coinciden");
              let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
              notify.show("Las contraseñas no coinciden", 'custom', 7000, warningMessage);

        } else if (this.email === "") {
            let warningMessage = { background: "#d7b70c", text: "#FFFFFF" };
            notify.show("Anteriormente no ingreso un correo electronico", 'custom', 7000, warningMessage);
            
        } else {
            const apiBaseUrl = this.state.conexion;
            //const apiBaseUrl = 'http://smartclinics.online/sc-admin/web/app.php/';
            //const apiBaseUrl = 'http://localhost:8000/';
            const token={
                  "email":this.email,
                  "password":this.state.password,                  
                  "timeZ":this.state.timeZ,
                  
                  headers: {
                  "Accept": "application/json",
                  "Content-type": "application/json"
                  }
            }

            axios.post(apiBaseUrl+'api/ResetPassword', token)
            .then((res) => {
              /*console.log(res);
              console.log(token);*/
              console.log("operacion exitosa");
              let isOkey = { background: "#058f3c", text: "#FFFFFF" };
              notify.show("Operacion Exitosa", 'custom', 7000, isOkey);


              setTimeout(() => {
                this.props.history.push(
                {
                  pathname: '/login',
                });     
                        
              }, 3000);    

              

            })
            .catch((res)=>{
              console.log("Error en la operacion");
            });
            
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
          <LastStep />
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <form className="formCodeConfirm" onSubmit={(e)=> this.enterPassword(e)}>
                  <h1>Introduza su nueva contraseña</h1>
                  <p className="text-muted">Cree la contraseña para su cuenta.</p>
                  <InputGroup className="mb-3">
                    <Input
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={e => this.setState({password:e.target.value})}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                        type="password"
                        placeholder=" Confirm Password"
                        value={this.state.confirmPassword}
                        onChange={e => this.setState({confirmPassword:e.target.value})}
                    />
                  </InputGroup>
                  <br/>
                  <Row style={{align:'center'}}>
                    <div style={{width:'7.5%'}}></div>
                    <Col xs="5">
                    <Button style={{width: '100%'}} type="submit"  color="primary" block>Aceptar</Button>
                    </Col>
                    <Col xs="5" className="text-right">
                    <Link to="/confirm-code-reset-password">
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
