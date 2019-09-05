import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import TurnosConfiguration from '../views/Turnos/TurnosConfiguration';
import { connect } from 'react-redux';
import { openConfirmDialog } from '../actions/aplicantionActions';
import { LoadConfigTurnosFuction, queryOneTicketFunction, loadOriginalTurnos } from '../actions/TurnosAction';
import  CircularProgress  from '@material-ui/core/CircularProgress';

class TurnosContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      arraySelect: [],
      activeTab: "1",
      master: false,
      permitsRealizados: [],
      permitsRecibidos: [],
      permitsAtendidos: [],
      loading:  'hide'
    }
  }
  componentDidMount() {
    this.props.LoadConfigTurnosFuction()
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Turnos</CardHeader>
              <CardBody>
                {this.props.turnos.loading === 'show' ?
                  <div>
                    <Nav tabs>
                      <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                          Configuracion de Ticket
                      </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <TurnosConfiguration
                          confirm={this.props.confirm}
                          turnos={this.props.turnos.LoadTurnos}
                          queryOneTicketFunction={this.props.queryOneTicketFunction}
                          loadOriginalTurnos={this.props.loadOriginalTurnos}
                        />
                      </TabPane>
                    </TabContent>
                  </div>:
                <div style={{ height: "60vh" }}>
                  <CircularProgress style={{ position: " absolute", height: 40, top: "45%", right: "50%", zIndex: 2 }} />
                </div>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  LoadConfigTurnosFuction: () => dispatch(LoadConfigTurnosFuction()),
  queryOneTicketFunction: (data) => dispatch(queryOneTicketFunction(data)),
  loadOriginalTurnos: () => dispatch(loadOriginalTurnos())
})

const mapStateToProps = state => ({
  turnos: state.configTurnos.toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(TurnosContainer);