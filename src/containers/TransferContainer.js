import React, { Component } from "react";
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
import { connect } from "react-redux";
import ListTransferencias from "../views/Shop/ListTransferencias";
import ListTransferenciasRecibidas from "../views/Shop/ListTransferenciasRecibidas";
import ListSolicitudesRealizadas from "../views/Shop/ListSolicitudesRealizadas";
import ListSolicitudesRecibidas from "../views/Shop/ListSolicitudesRecibidas";
import {
  LoadTransferFunction,
  LoadRequestMadeIdFunction,  
  DeleteRequestMadeAction
}
  from "../actions/TransferActions";
import { openConfirmDialog, openSnackbars, search } from "../actions/aplicantionActions";
import classnames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";

class TransferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      permitsTransfer: [],
    };
  }

  componentDidMount = () => {
    this.props.LoadTransferFunction();   

    this.props.aplication.dataGeneral.permission.map(permisos => {
      permisos.modules.map(modulos => {
        if (modulos.name === "Transferencias") {
          this.setState({
            permitsTransfer: modulos.permits
          });
        }
      });
    });
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
      let set = ""
      this.props.search(set)
    }
  }
  componentWillUnmount() {
    let set = ""
    this.props.search(set)
  }


  render() {   
    console.log("props transfer container", this.props.transfer); 
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Transferencias - Solicitudes</CardHeader>
              <CardBody>
                {
                  this.props.transfer.loading === 'hide' ?
                    <div>
                      <Nav tabs>
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                            Tranferencias Realizadas
                            </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                            Tranferencias Recibidas
                            </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggleTab('3'); }} >
                            Solicitudes Realizadas
                            </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggleTab('4'); }} >
                            Solicitudes Recibidas
                            </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <ListTransferencias
                            confirm={this.props.confirm}
                            data={this.props.transfer.allTransfer}
                            queryOneTransferFunction={this.props.queryOneTransferFunction}
                            disableTransferAction={this.props.disableTransferAction}
                            permitsTransfer={this.state.permitsTransfer}
                            search={this.props.searchData}
                          />
                        </TabPane>
                        <TabPane tabId="2">
                          <ListTransferenciasRecibidas
                            confirm={this.props.confirm}
                            data={this.props.transfer.allTransferRecibidas}
                            queryOneTransferFunction={this.props.queryOneTransferFunction}
                            rejectTransferAction={this.props.rejectTransferAction}
                            acceptTransferAction={this.props.acceptTransferAction}
                            permitsTransfer={this.state.permitsTransfer}
                            search={this.props.searchData}
                          />
                        </TabPane>
                        <TabPane tabId="3">
                          <ListSolicitudesRealizadas
                            confirm={this.props.confirm}
                            alert={this.props.alert}
                            data={this.props.transfer.allRequestMade}
                            queryOneTransferFunction={this.props.queryOneTransferFunction}
                            rejectTransferAction={this.props.rejectTransferAction}
                            acceptTransferAction={this.props.acceptTransferAction}
                            permitsTransfer={this.state.permitsTransfer}
                            search={this.props.searchData}
                            LoadRequestMadeIdFunction={this.props.LoadRequestMadeIdFunction}                            
                            DeleteRequestMadeAction={this.props.DeleteRequestMadeAction}                            
                          />
                        </TabPane>
                        <TabPane tabId="4">
                          <ListSolicitudesRecibidas
                            confirm={this.props.confirm}
                            data={this.props.transfer.allRequestReceived}
                            queryOneTransferFunction={this.props.queryOneTransferFunction}
                            rejectTransferAction={this.props.rejectTransferAction}
                            acceptTransferAction={this.props.acceptTransferAction}
                            permitsTransfer={this.state.permitsTransfer}
                            search={this.props.searchData}
                          />
                        </TabPane>
                      </TabContent>
                    </div>
                    :
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

const mapStateToProps = state => ({
  transfer: state.transfer.toJS(),
  authData: state.auth,
  aplication: state.global,
  searchData: state.global.search
});

const mapDispatchToProps = dispatch => ({
  LoadTransferFunction: () => dispatch(LoadTransferFunction()),
  confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  alert: (type, message) => dispatch(openSnackbars(type, message)),
  search: (set) => dispatch(search(set)),
  LoadRequestMadeIdFunction: (id) => dispatch(LoadRequestMadeIdFunction(id)),  
  DeleteRequestMadeAction: (id) => dispatch(DeleteRequestMadeAction(id)),  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferContainer);
