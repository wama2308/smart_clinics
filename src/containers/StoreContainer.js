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
import { LoadStoreFunction, LoadStoreIdFunction, DeleteStoreAction } from "../actions/StoreActions";
import { openSnackbars, openConfirmDialog } from "../actions/aplicantionActions";

class StoreContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};

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
                    <ListStore 
                      confirm={this.props.confirm}
                      branchOfficces={this.props.store.branchOfficces}
                      data={this.props.store.data}
                      DeleteStoreAction={this.props.DeleteStoreAction}
                      LoadStoreIdFunction={this.props.LoadStoreIdFunction}
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
  DeleteStoreAction: (storeId, sucursalId) => dispatch(DeleteStoreAction(storeId, sucursalId)),  
  LoadStoreIdFunction: (storeId, sucursalId) => dispatch(LoadStoreIdFunction(storeId, sucursalId)),  
  confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreContainer);


