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
import { LoadShopFunction, LoadShopIdFunction, disableShopAction, queryOneSupplieWithLotFunction } from "../actions/ShopActions";
import { openConfirmDialog } from "../actions/aplicantionActions";
import classnames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";

class ShopContainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      permitsShop:[]
    };
  }

  componentDidMount = () => {
    this.props.LoadShopFunction();
    this.props.aplication.dataGeneral.permission[0].modules.map(permisos => {
      if (permisos.name === "Almacen") {
        this.setState({
          permitsMedical: permisos.permits
        });
      }
    });
  };  
    

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
                              permitsShop={this.state.permitsShop}
                              confirm={this.props.confirm}
                              data={this.props.shop.data}
                              allProducts={this.props.shop.allProducts}
                              LoadShopIdFunction={this.props.LoadShopIdFunction}
                              disableShopAction={this.props.disableShopAction}                              
                            />                            
                          </TabPane>
                          <TabPane tabId="2">
                            <ListProduct 
                              permitsShop={this.state.permitsShop}
                              confirm={this.props.confirm}
                              allProducts={this.props.shop.allProducts}                                                             
                              queryOneSupplieWithLotFunction={this.props.queryOneSupplieWithLotFunction}                                                             
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
  shop: state.shop.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({  
  LoadShopFunction: () => dispatch(LoadShopFunction()),  
  LoadShopIdFunction: (shopId) => dispatch(LoadShopIdFunction(shopId)),  
  disableShopAction: (shopId) => dispatch(disableShopAction(shopId)),    
  queryOneSupplieWithLotFunction: (productId) => dispatch(queryOneSupplieWithLotFunction(productId)),    
  confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopContainers);