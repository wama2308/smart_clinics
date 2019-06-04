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
import "../views/Configurations/loading.css";
import classnames from "classnames";
import "../views/Configurations/modal.css";
import { connect } from "react-redux";
import {
  LoadAllUsersNoMasterFunction,
  saveRolAction,
  editRolAction,
  LoadRolIdFunction,
  saveUserNoMasterAction,
  LoadIdUsersNoMasterFunction,
  editUserNoMasterAction,
  DeleteUserNoMasterAction,  
  addSucursalFunction,
  deleteSucursalFunction,
  ActivateUserNoMasterAction,
  disabledRolAction,
  enabledRolAction
} from "../actions/UserAction";
import UsersList from "../views/Usuarios/UsersList";
import RolesList from "../views/Usuarios/RolesList";
import UsersInactivosList from "../views/Usuarios/UsersInactivosList";
import RolesInactivosList from "../views/Usuarios/RolesInactivosList";
import { openSnackbars, openConfirmDialog } from "../actions/aplicantionActions";
import CircularProgress from "@material-ui/core/CircularProgress";

class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

  componentDidMount = () => {
    this.props.loadUsersRoles();
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    // console.log("usersRoles padre", this.props.usersRoles.toJS());
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
              <CardHeader>Configuracion de Usuarios</CardHeader>
              <CardBody> 
                {
                  this.props.usersRoles.get('loading') === 'hide' ?
                    <div>
                      <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                                Usuarios
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                                Roles
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggleTab('3'); }} >
                                Usuarios Inactivos
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggleTab('4'); }} >
                                Roles Inactivos
                            </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <UsersList
                              users = {this.props.usersRoles.get('users')}
                              totalBranchOffices = {this.props.usersRoles.get('totalBranchOffices')}
                              arrayBranchOffices = {this.props.usersRoles.get('arrayBranchOffices')}
                              roles = {this.props.usersRoles.get('roles')}
                              permits={this.props.usersRoles.get('permits')}
                              modules={this.props.usersRoles.get('modules')}
                              saveRolAction = {this.props.saveRolAction}
                              LoadRolIdFunction = {this.props.LoadRolIdFunction}
                              saveUserNoMasterAction = {this.props.saveUserNoMasterAction}
                              editUserNoMasterAction = {this.props.editUserNoMasterAction}
                              LoadIdUsersNoMasterFunction = {this.props.LoadIdUsersNoMasterFunction}
                              DeleteUserNoMasterAction = {this.props.DeleteUserNoMasterAction}
                              confirmDeleteUser = {this.props.confirmDeleteUser}
                              addSucursalFunction = {this.props.addSucursalFunction}
                              deleteSucursalFunction = {this.props.deleteSucursalFunction}
                              alert = {this.props.alert}
                            />
                          </TabPane>
                          <TabPane tabId="2">
                            <RolesList
                              roles = {this.props.usersRoles.get('roles')}
                              saveRolAction = {this.props.saveRolAction}
                              editRolAction = {this.props.editRolAction}
                              LoadRolIdFunction = {this.props.LoadRolIdFunction}
                              permits={this.props.usersRoles.get('permits')}
                              modules={this.props.usersRoles.get('modules')}
                              confirmDeleteUser = {this.props.confirmDeleteUser}
                              disabledRolAction = {this.props.disabledRolAction}
                            />                            
                          </TabPane>
                          <TabPane tabId="3">
                            <UsersInactivosList
                              users = {this.props.usersRoles.get('usersInactivos')}
                              confirmDeleteUser = {this.props.confirmDeleteUser}
                              ActivateUserNoMasterAction = {this.props.ActivateUserNoMasterAction}                              
                            />
                          </TabPane>
                          <TabPane tabId="4">
                            <RolesInactivosList
                              roles = {this.props.usersRoles.get('rolesInactivos')}
                              confirmDeleteUser = {this.props.confirmDeleteUser}
                              enabledRolAction = {this.props.enabledRolAction}
                            />
                          </TabPane>
                      </TabContent>
                    </div>
                  :
                  <div style={{height: "55vh"}}>
                    <CircularProgress style={{position: " absolute", height: 40, top: "45%", right: "50%",zIndex: 2}}          />
                  </div>
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
  usersRoles: state.usersRoles,
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
  loadUsersRoles: () => dispatch(LoadAllUsersNoMasterFunction()),
  saveRolAction: (data, callback) => dispatch(saveRolAction(data, callback)),
  editRolAction: (data, callback) => dispatch(editRolAction(data, callback)),
  LoadRolIdFunction: pos => dispatch(LoadRolIdFunction(pos)),
  LoadIdUsersNoMasterFunction: id => dispatch(LoadIdUsersNoMasterFunction(id)),
  saveUserNoMasterAction: (data, callback) => dispatch(saveUserNoMasterAction(data, callback)),  
  editUserNoMasterAction: (data, callback) => dispatch(editUserNoMasterAction(data, callback)),  
  DeleteUserNoMasterAction: (userId) => dispatch(DeleteUserNoMasterAction(userId)),  
  disabledRolAction: (rolId) => dispatch(disabledRolAction(rolId)),  
  enabledRolAction: (rolId) => dispatch(enabledRolAction(rolId)),  
  ActivateUserNoMasterAction: (userId) => dispatch(ActivateUserNoMasterAction(userId)),  
  addSucursalFunction: (email, arraySucursal) => dispatch(addSucursalFunction(email, arraySucursal)),  
  deleteSucursalFunction: (key, callback) => dispatch(deleteSucursalFunction(key, callback)),  
  confirmDeleteUser: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
  alert: (type, message) => dispatch(openSnackbars(type, message)), 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer);
