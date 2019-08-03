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
import { LoadSelectReclamosFuction } from '../actions/reclamosAction';

class ReclamosContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      arraySelect: []
    }
  }
  componentDidMount() {
    this.props.LoadSelectReclamosFuction()
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card style={{ height: "83vh" }}>
              <CardHeader>Reclamos</CardHeader>
              <CardBody>
                <ReclamosList
                  reclamos={this.props.reclamos.brachOffices}
                  list={this.props.reclamos.reclamosAll}
                  
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  LoadSelectReclamosFuction: () => dispatch(LoadSelectReclamosFuction())
})

const mapStateToProps = state => ({
  reclamos: state.reclamos.toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(ReclamosContainer)