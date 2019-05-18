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
import { LoadShopFunction } from "../actions/ShopActions";
import { openSnackbars, openConfirmDialog } from "../actions/aplicantionActions";

class ShopContainers extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount = () => {
    this.props.LoadShopFunction();
  };  

  render() {   
    console.log("props shop", this.props.shop);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Compras - Productos</CardHeader>
              <CardBody>                  
              {
                this.props.shop.loading === 'hide' ?
                  <div>
                    <ListShop 
                      confirm={this.props.confirm}
                      
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
  shop: state.shop.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({  
  LoadShopFunction: () => dispatch(LoadShopFunction()),  
  /*DeleteDistributorAction: (distrbutorId) => dispatch(DeleteDistributorAction(distrbutorId)),  */
  confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopContainers);


