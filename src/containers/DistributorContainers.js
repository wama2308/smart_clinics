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
import ListDistributor from "../views/Distributor/ListDistributor";
import ListDistributorInactivo from "../views/Distributor/ListDistributorInactivo";
import { LoadDistributorFunction, LoadDistributorIdFunction, DeleteDistributorAction, enableProviderFunction } from "../actions/DistributorActions";
import { openConfirmDialog, search } from "../actions/aplicantionActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import classnames from "classnames";
import Search from "../components/Select"

class DistributorContainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      distributorPermits: []
    };

  }

  componentDidMount = () => {
    this.props.LoadDistributorFunction();

    this.props.aplication.dataGeneral.permission.map(permisos=>{
      permisos.modules.map(modulos=>{
        if (modulos.name === "Proveedor") {
          this.setState({
            distributorPermits: modulos.permits
          });
        }
      })
    })
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

  getSearch = (data) => {
    if (this.state.activeTab === "1") {
      const result = this.props.searchData
        ? data.get("data").filter(distributor => {
          return (
            distributor.name.toLowerCase().includes(this.props.search) ||
            distributor.phone[0].includes(this.props.searchData) ||
            distributor.typeIdentity.toLowerCase().includes(this.props.search) ||
            distributor.tin.toString().includes(this.props.search) ||
            distributor.email[0].toLowerCase().includes(this.props.searchData)
          );
        })
        : data.get("data");
      return result
    } else if (this.state.activeTab === "2") {
      const resultInactivo = this.props.searchData
        ? data.get("proveedoresInactivos").filter(distributor => {
          return (
            distributor.name.toLowerCase().includes(this.props.search) ||
            distributor.phone[0].includes(this.props.searchData) ||
            distributor.typeIdentity.toLowerCase().includes(this.props.search) ||
            distributor.tin.toString().includes(this.props.search) ||
            distributor.email[0].toLowerCase().includes(this.props.searchData)
          );
        })
        : data.get("proveedoresInactivos");
      return resultInactivo
    }
  }

  render() {
    //console.log("props ", this.props.distributor.toJS());
    const arrayClean = this.getSearch(this.props.distributor)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Configuracion de Proveedor</CardHeader>
              <CardBody>
                {
                  this.props.distributor.get('loading') === 'hide' ?
                    <div>
                      <Nav tabs>
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                            Proveedores
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                            Proveedores Inactivos
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <ListDistributor
                            distributorPermits={this.state.distributorPermits}
                            confirm={this.props.confirm}
                            listDistributor={this.props.distributor.get("data")}
                            LoadDistributorIdFunction={this.props.LoadDistributorIdFunction}
                            DeleteDistributorAction={this.props.DeleteDistributorAction}
                            search={this.props.searchData}
                          />
                        </TabPane>
                        <TabPane tabId="2">
                          <ListDistributorInactivo
                            distributorPermits={this.state.distributorPermits}
                            confirm={this.props.confirm}
                            listDistributor={this.props.distributor.get("proveedoresInactivos")}
                            enableProviderFunction={this.props.enableProviderFunction}
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
  distributor: state.distributor,
  authData: state.auth,
  aplication: state.global,
  searchData: state.global.search
});

const mapDispatchToProps = dispatch => ({
  LoadDistributorFunction: () => dispatch(LoadDistributorFunction()),
  LoadDistributorIdFunction: (distrbutorId) => dispatch(LoadDistributorIdFunction(distrbutorId)),
  DeleteDistributorAction: (distrbutorId) => dispatch(DeleteDistributorAction(distrbutorId)),
  enableProviderFunction: (distrbutorId) => dispatch(enableProviderFunction(distrbutorId)),
  confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  search: (set) => dispatch(search(set))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorContainers);
