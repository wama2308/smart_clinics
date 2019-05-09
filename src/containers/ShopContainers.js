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
import ListShop from "../views/Shop/ListShop";
import { LoadStoreFunction, LoadStoreIdFunction, DeleteStoreAction } from "../actions/ShopActions";
import { openSnackbars, openConfirmDialog } from "../actions/aplicantionActions";

class ShopContainers extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount = () => {
    this.props.LoadStoreFunction();
  };  

  render() {   
    //console.log("props store", this.props.store);     
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Compras</CardHeader>
              <CardBody>                              
              {
                this.props.store.loading === 'hide' ?
                  <div>
                    <ListShop 
                      /*confirm={this.props.confirm}
                      branchOfficces={this.props.store.branchOfficces}*/
                      /*LoadDistributorIdFunction={this.props.LoadDistributorIdFunction}
                      DeleteDistributorAction={this.props.DeleteDistributorAction}*/
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
  store: state.store.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
  LoadStoreFunction: () => dispatch(LoadStoreFunction()),  
  /*LoadDistributorIdFunction: (distrbutorId) => dispatch(LoadDistributorIdFunction(distrbutorId)),  
  DeleteDistributorAction: (distrbutorId) => dispatch(DeleteDistributorAction(distrbutorId)),  */
  confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopContainers);


