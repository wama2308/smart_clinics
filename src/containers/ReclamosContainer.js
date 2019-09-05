import React, { Component } from 'react';
import { Table } from '@material-ui/core';
import { IconButton } from '@material-ui/core/IconButton';
import Pagination from '../components/Pagination';
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
import ReclamosList from '../views/Reclamos/ReclamosList';
import ReclamosReceibeList from '../views/Reclamos/ReclamosReceibeList'
import ReclamosAtendidosList from '../views/Reclamos/ReclamosAtendidosList'
import { connect } from 'react-redux';
import Chat from '../views/Reclamos/Chat';
import {
  LoadSelectReclamosFuction,
  queryOneReclamos,
  deleteReclamos,
  deleteReclamosFuction,
  transferClaimsFunction,
  acceptReclamosFunction,
  rejectReclamosFunction,
  messageErrorFunction
} from '../actions/reclamosAction';

import { loadMessageFunction, setStatusMessageFunction } from '../actions/actionsChat'
import CircularProgress from '@material-ui/core/CircularProgress';
import { openConfirmDialog, search } from '../actions/aplicantionActions';
import classnames from "classnames";
import jstz from 'jstz';
import { GetDisabledPermits } from "./../core/utils";

class ReclamosContainer extends Component {
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
    this.props.LoadSelectReclamosFuction()

    this.props.aplication.dataGeneral.permission.map(permisos => {
      permisos.modules.map(modulos => {
        if (modulos.name === "Reclamos Realizados") {
          this.setState({
            permitsRealizados: modulos.permits
          });
        } else if (modulos.name === "Reclamos Recibidos") {
          this.setState({
            permitsRecibidos: modulos.permits
          });
        } else if (modulos.name === "Reclamos Atendidos") {
          this.setState({
            permitsAtendidos: modulos.permits
          });
        }
      });
    });
  }
  componentWillUnmount() {
    let set = ""
    this.props.search(set)
  }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
      let set = ""
      this.props.search(set)
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Reclamos</CardHeader>
              <CardBody>
                {
                  this.props.reclamos.loading === 'show' ?
                    <div>
                      <Nav tabs>
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                            Reclamos Realizados
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
                          <ReclamosList
                            reclamos={this.props.reclamos.brachOffices}
                            list={this.props.reclamos.listAll}
                            queryOneReclamos={this.props.queryOneReclamos}
                            deleteReclamosFuction={this.props.deleteReclamosFuction}
                            confirm={this.props.confirm}
                            loadMessageFunction={this.props.loadMessageFunction}
                            setStatusMessageFunction={this.props.setStatusMessageFunction}
                            token={this.props.reclamos}
                            permits={this.state.permitsRealizados}
                            messageErrorFunction={this.props.messageErrorFunction}
                            search={this.props.searchData}
                          />
                        </TabPane>
                        <TabPane tabId="2">
                          <ReclamosReceibeList
                            reclamos={this.props.reclamos.reclamosReceibe}
                            queryOneReclamos={this.props.queryOneReclamos}
                            transferClaimsFunction={this.props.transferClaimsFunction}
                            confirm={this.props.confirm}
                            loadMessageFunction={this.props.loadMessageFunction}
                            setStatusMessageFunction={this.props.setStatusMessageFunction}
                            token={this.props.reclamos}
                            permits={this.state.permitsRecibidos}
                            master={this.props.reclamos.permission[0]._id}
                            reclamosSelect={this.props.reclamos.brachOffices}
                            deleteReclamosFuction={this.props.deleteReclamosFuction}
                            messageErrorFunction={this.props.messageErrorFunction}
                            search={this.props.searchData}
                          />
                        </TabPane>
                        <TabPane tabId="3">
                          <ReclamosAtendidosList
                            reclamos={this.props.reclamos.reclamosAll}
                            queryOneReclamos={this.props.queryOneReclamos}
                            acceptReclamosFunction={this.props.acceptReclamosFunction}
                            rejectReclamosFunction={this.props.rejectReclamosFunction}
                            confirm={this.props.confirm}
                            permits={this.state.permitsAtendidos}
                            master={this.props.reclamos.permission[0]._id}
                            search={this.props.searchData}
                          />
                        </TabPane>
                      </TabContent>
                    </div> :
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
  LoadSelectReclamosFuction: () => dispatch(LoadSelectReclamosFuction()),
  queryOneReclamos: (id_receiber, id_transmitter) => dispatch(queryOneReclamos(id_receiber, id_transmitter)),
  confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  deleteReclamosFuction: (id_receiber, id_transmitter) => dispatch(deleteReclamosFuction(id_receiber, id_transmitter)),
  transferClaimsFunction: (id_receiber, id_transmitter) => dispatch(transferClaimsFunction(id_receiber, id_transmitter)),
  acceptReclamosFunction: (id_claim_receiver, id_claim_transmitter, time) => dispatch(acceptReclamosFunction(id_claim_receiver, id_claim_transmitter, time)),
  rejectReclamosFunction: (id_claim_receiver, id_claim_transmitter, time) => dispatch(rejectReclamosFunction(id_claim_receiver, id_claim_transmitter, time)),

  loadMessageFunction: (id_claim_receiver, id_claim_transmitter) => dispatch(loadMessageFunction(id_claim_receiver, id_claim_transmitter)),
  setStatusMessageFunction: (id_claim_receiver, id_claim_transmitter, time) => dispatch(setStatusMessageFunction(id_claim_receiver, id_claim_transmitter, time)),
  messageErrorFunction: (status) => dispatch(messageErrorFunction(status)),
  search: (set) => dispatch(search(set))
})

const mapStateToProps = state => ({
  reclamos: state.reclamos.toJS(),
  aplication: state.global,
  searchData: state.global.search
});

export default connect(mapStateToProps, mapDispatchToProps)(ReclamosContainer)
