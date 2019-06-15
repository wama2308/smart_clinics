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
import { openConfirmDialog } from "../actions/aplicantionActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import classnames from "classnames";

class DistributorContainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };

  }

  componentDidMount = () => {
    this.props.LoadDistributorFunction();
  };  

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {   
    //console.log("props ", this.props.distributor.toJS());     
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
                          confirm={this.props.confirm}
                          listDistributor={this.props.distributor.get("data")}
                          LoadDistributorIdFunction={this.props.LoadDistributorIdFunction}
                          DeleteDistributorAction={this.props.DeleteDistributorAction}                      
                        />
                      </TabPane>
                      <TabPane tabId="2">
                        <ListDistributorInactivo 
                          confirm={this.props.confirm}
                          listDistributor={this.props.distributor.get("proveedoresInactivos")}                          
                          enableProviderFunction={this.props.enableProviderFunction}                      
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
  distributor: state.distributor,
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
  LoadDistributorFunction: () => dispatch(LoadDistributorFunction()),  
  LoadDistributorIdFunction: (distrbutorId) => dispatch(LoadDistributorIdFunction(distrbutorId)),  
  DeleteDistributorAction: (distrbutorId) => dispatch(DeleteDistributorAction(distrbutorId)),  
  enableProviderFunction: (distrbutorId) => dispatch(enableProviderFunction(distrbutorId)),  
  confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorContainers);


