import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';
import { Card, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx'

class AtencionTurnos extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>
        <div style={{ "display": "flex" }} >

          <Form className="formCodeConfirm" style={{ "width": "50%" }}>

            <div className="incline">
              <FormGroup className="top form-group col-sm-6">
                <Label for="Sucursal" className="mr-sm-2">
                  Tramite Actual
              </Label>
                <Input />
                <FormFeedback tooltip></FormFeedback>
              </FormGroup>
              <FormGroup className="top form-group col-sm-6" >
                <Label for="exampleEmail" className="mr-sm-2">
                  Turno Actual
              </Label>
                <Input />
              </FormGroup>
              <FormGroup className="top form-group col-sm-6">
                <Label for="pais">Turnos Atendidos</Label>
                <Input>
                </Input>
                <FormFeedback tooltip></FormFeedback>
              </FormGroup>
              <FormGroup className="top form-group col-sm-6" >
                <Label for="provincia">Turnos en Espera</Label>
                <Input>

                </Input>
                <FormFeedback tooltip></FormFeedback>
              </FormGroup>
              <FormGroup className="top form-group col-sm-6">
                <Label for="pais">Turnos Anulados</Label>
                <Input>
                </Input>
                <FormFeedback tooltip></FormFeedback>
              </FormGroup>
            </div>
            <div >
              <Button type="submit" color="primary">
                Guardar
              </Button>
            </div>
          </Form>
        </div>
      </div >
    );
  }
}



export default AtencionTurnos;