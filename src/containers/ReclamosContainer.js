import React, { Component } from 'react';
import { Table } from '@material-ui/core';
import { IconButton } from '@material-ui/core/IconButton';
import Pagination from '../components/Pagination';
import { Row, Col, CardHeader } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardBody } from 'reactstrap';
import ReclamosList from '../views/Reclamos/ReclamosList';
import { connect } from 'react-redux';
import Chat from '../views/Reclamos/Chat';

class ReclamosContainer extends Component {
  constructor(props) {
    super(props);
    this.state ={
      show: true
    }
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card style={{ height: "83vh" }}>
              <CardHeader>Reclamos</CardHeader>
              <CardBody>
                <ReclamosList />
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>
    );
  }
}

export default connect(null, null) (ReclamosContainer)