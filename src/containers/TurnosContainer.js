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
import AtencionTurnos from '../views/Turnos/AtencionTurnos';
import { openConfirmDialog } from '../actions/aplicantionActions';

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
      permitsAtendidos: []
    }
  }
  componentDidMount() {

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
                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                        Configuracion de Ticket
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                        Reclamos Recibidos
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggleTab('3'); }} >
                        Atender Reclamos
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <TurnosConfiguration
                        confirm={this.props.confirm}
                      />
                    </TabPane>
                    <TabPane tabId="2">
                      <AtencionTurnos />
                    </TabPane>
                    <TabPane tabId="3">

                    </TabPane>
                  </TabContent>
                </div>
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
})

const mapStateToProps = state => ({
  turnos: state.configTurnos
});

export default connect(mapStateToProps, mapDispatchToProps)(TurnosContainer);