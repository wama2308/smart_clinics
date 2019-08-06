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
import { LoadSelectReclamosFuction, queryOneReclamos, deleteReclamos, deleteReclamosFuction } from '../actions/reclamosAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import { openConfirmDialog } from '../actions/aplicantionActions';

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
              {this.props.reclamos.loading === "show" ?
                <CardBody>
                  <ReclamosList
                    reclamos={this.props.reclamos.brachOffices}
                    list={this.props.reclamos.reclamosAll}
                    queryOneReclamos={this.props.queryOneReclamos}
                    deleteReclamosFuction ={this.props.deleteReclamosFuction}
                    confirm={this.props.confirm}
                  />
                </CardBody> :
                <div style={{ height: "60vh" }}>
                  <CircularProgress style={{ position: " absolute", height: 40, top: "45%", right: "50%", zIndex: 2 }} />
                </div>
              }
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  LoadSelectReclamosFuction: () => dispatch(LoadSelectReclamosFuction()),
  queryOneReclamos: (id_receiber, id_transmitter) => dispatch(queryOneReclamos(id_receiber,id_transmitter)),
  confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
  deleteReclamosFuction: (id_receiber,id_transmitter) =>dispatch(deleteReclamosFuction(id_receiber,id_transmitter))

})

const mapStateToProps = state => ({
  reclamos: state.reclamos.toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(ReclamosContainer)