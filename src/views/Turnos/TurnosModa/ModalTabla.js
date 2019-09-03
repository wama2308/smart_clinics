import React, { Component } from 'react';
import { Label, Button, Card, CardBody, FormGroup, Input, FormFeedback } from 'reactstrap';
import { Table } from 'reactstrap';
import { IconButton } from '@material-ui/core';

class ModalTabla extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <div className="row">
              <FormGroup className="top form-group col-sm-12">
                <div className="error">{this.props.errorListContacs}</div>
                <Table hover responsive borderless>
                  <thead className="thead-light">
                    <tr>
                      <th className="text-left">Nro</th>
                      <th className="text-left">Campo</th>
                      <th className="text-left">Orden</th>
                      <th className="text-left">Requerido</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </Table>
              </FormGroup>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ModalTabla;