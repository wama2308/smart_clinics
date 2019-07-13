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
import ListStore from "../views/Store/ListStore";
import ListStoreInactivos from "../views/Store/ListStoreInactivos";
import { LoadStoreFunction, LoadStoreIdFunction, DeleteStoreAction, enableStoreBranchOfficesAction } from "../actions/StoreActions";
import { openConfirmDialog } from "../actions/aplicantionActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import classnames from "classnames";

class StoreContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount = () => {
    this.props.LoadStoreFunction();
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Configuracion de Almacen</CardHeader>
              <CardBody>
              {
                this.props.store.loading === 'hide' ?
                  <div>
                    <Nav tabs>
                      <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                              Almacenes
                          </NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                              Almacenes Inactivos
                          </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <ListStore
                          confirm={this.props.confirm}
                          branchOfficces={this.props.store.branchOfficces}
                          data={this.props.store.data}
                          DeleteStoreAction={this.props.DeleteStoreAction}
                          LoadStoreIdFunction={this.props.LoadStoreIdFunction}
                          search={this.props.searchData}
                        />
                      </TabPane>
                      <TabPane tabId="2">
                        <ListStoreInactivos
                          confirm={this.props.confirm}
                          data={this.props.store.storeInactivos}
                          enableStoreBranchOfficesAction={this.props.enableStoreBranchOfficesAction}
                          search={this.props.searchData}
                        />
                      </TabPane>
                    </TabContent>
                  </div>
                :
                <div style={{height: "60vh"}}>
                  <CircularProgress style={{position: " absolute", height: 40, top: "45%", right: "50%",zIndex: 2}} />
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
  store: state.store.toJS(),
  authData: state.auth,
  aplication: state.global,
  searchData: state.global.search
});

const mapDispatchToProps = dispatch => ({
  LoadStoreFunction: () => dispatch(LoadStoreFunction()),
  DeleteStoreAction: (storeId, sucursalId) => dispatch(DeleteStoreAction(storeId, sucursalId)),
  enableStoreBranchOfficesAction: (storeId, sucursalId) => dispatch(enableStoreBranchOfficesAction(storeId, sucursalId)),
  LoadStoreIdFunction: (storeId, sucursalId) => dispatch(LoadStoreIdFunction(storeId, sucursalId)),
  confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreContainer);
