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
import { LoadDistributorFunction, LoadDistributorIdFunction, DeleteDistributorAction } from "../actions/DistributorActions";
import { openSnackbars, openConfirmDialog } from "../actions/aplicantionActions";

class DistributorContainers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.LoadDistributorFunction();
  };  

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
                    <ListDistributor 
                      confirm={this.props.confirm}
                      listDistributor={this.props.distributor.get("data")}
                      LoadDistributorIdFunction={this.props.LoadDistributorIdFunction}
                      DeleteDistributorAction={this.props.DeleteDistributorAction}
                    />                
                  </div>
                :
                <div align="center" className="" style={{padding:"1%"}}><img src="assets/loader.gif" width="25%"  /></div>
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
  confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributorContainers);


