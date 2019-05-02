import React, { Component } from "react";
import {Nav,NavItem,NavLink,Card,CardBody,CardHeader,Col,Row,TabContent,TabPane} from "reactstrap";
import "../views/Configurations/loading.css";
import classnames from "classnames";
import "../views/Configurations/modal.css";
import { connect } from "react-redux";
import {} from "../actions/PersonalInternoActions";
import UsersList from "../views/Usuarios/UsersList";
import RolesList from "../views/Usuarios/RolesList";
import { openSnackbars, openConfirmDialog } from "../actions/aplicantionActions";
import { LoadPersonalCargosFunction, DeletePersonalInternoAction, LoadPersonalIdFunction } from "../actions/PersonalInternoActions";
import ListCargos from "../views/Personal/ListCargos";
import ListPersonal from "../views/Personal/ListPersonal";

class PersonalInterno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

  componentDidMount = () => {
    this.props.LoadPersonalCargosFunction();
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    // console.log(this.props.usersRoles.get("permits"));
    // console.log(this.props.usersRoles.get("users"));
    // const DataSucursal = this.filterDataForSucursal(this.props.medicalCenter);
    // console.log("loading", this.props.usersRoles.get("loading"));
    //console.log(this.props)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Configuracion de Personal - Cargos</CardHeader>
              <CardBody>
                {
                  this.props.personaInterno.get('loading') === 'hide' ?
                    <div>
                      <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                                Personal
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                                Cargos
                            </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <ListPersonal
                            	personal={this.props.personaInterno.get('personal')}
                            	DeletePersonalInternoAction={this.props.DeletePersonalInternoAction}
                            	confirm={this.props.confirm}
                              LoadPersonalIdFunction={this.props.LoadPersonalIdFunction}
                            />
                          </TabPane>
                          <TabPane tabId="2">
                            <ListCargos 
                            	cargos={this.props.personaInterno.get('cargos')}                            	
                            />
                          </TabPane>
                      </TabContent>
                    </div>
                  :
                    <div align="center" className={this.state.divLoading} style={{padding:"1%"}}><img src="assets/loader.gif" width="25%"  /></div>
                }
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

}
const mapStateToProps = state => ({
  personaInterno: state.personaInterno,
  authData: state.auth,
  aplication: state.global
});
const mapDispatchToProps = dispatch => ({
  LoadPersonalCargosFunction: () => dispatch(LoadPersonalCargosFunction()),  
  DeletePersonalInternoAction: (id) => dispatch(DeletePersonalInternoAction(id)),  
  confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
  LoadPersonalIdFunction: (id) =>dispatch(LoadPersonalIdFunction(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInterno);