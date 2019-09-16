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
import ListProduct from "../views/Shop/ListProduct";
import {
  LoadShopFunction,
  LoadShopIdFunction,
  disableShopAction,
  queryOneSupplieWithLotFunction,  
}
  from "../actions/ShopActions";
import { LoadDistributorFunction } from "../actions/DistributorActions";
import { openConfirmDialog, openSnackbars, search } from "../actions/aplicantionActions";
import classnames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";

class ShopContainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      permitsShop: [],      
      permitsCompras: [],
      permitsProducts: [],
      permitsBuy: []
    };
  }

  componentDidMount = () => {
    this.props.LoadShopFunction();
    this.props.LoadDistributorFunction();

    this.props.aplication.dataGeneral.permission.map(permisos => {
      permisos.modules.map(modulos => {
        if (modulos.name === "Almacen") {
          this.setState({
            permitsShop: modulos.permits
          });
        } else if (modulos.name === "Productos") {
          this.setState({
            permitsProducts: modulos.permits
          });
        } else if (modulos.name === "Compras") {
          this.setState({
            permitsBuy: modulos.permits
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
    //console.log("props shop container", this.props.shop);
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
                      <Nav tabs>
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                            Compras
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                            Productos
                          </NavLink>
                        </NavItem>                                                  
                      </Nav>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <ListShop
                            confirm={this.props.confirm}
                            data={this.props.shop.data}
                            allProducts={this.props.shop.allProducts}
                            LoadShopIdFunction={this.props.LoadShopIdFunction}
                            disableShopAction={this.props.disableShopAction}
                            provider={this.props.aplication.dataGeneral.dataCountries.provider}
                            alert={this.props.alert}
                            permitsBuy={this.state.permitsBuy}
                            search={this.props.searchData}
                          />
                        </TabPane>
                        <TabPane tabId="2">
                          <ListProduct
                            permitsProducts={this.state.permitsProducts}
                            confirm={this.props.confirm}
                            allProducts={this.props.shop.allProducts}
                            queryOneSupplieWithLotFunction={this.props.queryOneSupplieWithLotFunction}
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
  shop: state.shop.toJS(),
  distributor: state.distributor.toJS(),
  authData: state.auth,
  aplication: state.global,
  searchData: state.global.search
});

const mapDispatchToProps = dispatch => ({
  LoadDistributorFunction: () => dispatch(LoadDistributorFunction()),
  LoadShopFunction: () => dispatch(LoadShopFunction()),
  LoadShopIdFunction: (shopId) => dispatch(LoadShopIdFunction(shopId)),  
  disableShopAction: (shopId) => dispatch(disableShopAction(shopId)),
  queryOneSupplieWithLotFunction: (productId) => dispatch(queryOneSupplieWithLotFunction(productId)),
  confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  alert: (type, message) => dispatch(openSnackbars(type, message)),
  search: (set) =>dispatch(search(set))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopContainers);
