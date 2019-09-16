import React, { Component } from "react";
import { Nav, NavItem, NavLink, Card, CardBody, CardHeader, Col, Row, TabContent, TabPane } from "reactstrap";
import "../views/Configurations/loading.css";
import classnames from "classnames";
import "../views/Configurations/modal.css";
import { connect } from "react-redux";
import { } from "../actions/PersonalInternoActions";
import { openConfirmDialog, search } from "../actions/aplicantionActions";
import { LoadPersonalCargosFunction, DeletePersonalInternoAction, LoadPersonalIdFunction, enabledInternalStaffAction, disabledPositionAction, enabledPositionAction } from "../actions/PersonalInternoActions";
import { LoadAllUsersNoMasterFunction } from "../actions/UserAction";
import ListCargos from "../views/Personal/ListCargos";
import ListPersonal from "../views/Personal/ListPersonal";
import ListPersonalInactivo from "../views/Personal/ListPersonalInactivo";
import ListCargosInactivos from "../views/Personal/ListCargosInactivos";
import CircularProgress from "@material-ui/core/CircularProgress";

class PersonalInterno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      permitsPersonal: [],
      permitsCargos: []
    };
  }

  componentDidMount = () => {
    this.props.LoadPersonalCargosFunction();
    this.props.loadUsersRoles();

    this.props.aplication.dataGeneral.permission.map(permisos => {
      permisos.modules.map(modulos => {
        if (modulos.name === "Personal") {
          this.setState({
            permitsPersonal: modulos.permits
          });
        } else if (modulos.name === "Cargos") {
          this.setState({
            permitsCargos: modulos.permits
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

  componentWillUnmount() {
    let set = ""
    this.props.search(set)
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Configuracion de Personal - Cargos</CardHeader>
              <CardBody>
                {
                  (this.props.personaInterno.get('loading') === 'hide' && this.props.usersRoles.get('loading') === 'hide') ?
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
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggleTab('3'); }} >
                            Personal Inactivo
                            </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggleTab('4'); }} >
                            Cargos Inactivos
                            </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <ListPersonal
                            permitsPersonal={this.state.permitsPersonal}
                            personal={this.props.personaInterno.get('personal')}
                            DeletePersonalInternoAction={this.props.DeletePersonalInternoAction}
                            confirm={this.props.confirm}
                            LoadPersonalIdFunction={this.props.LoadPersonalIdFunction}
                            userId={this.props.usersRoles.get('userId')}
                            userEmail={this.props.usersRoles.get('userEmail')}
                            modules={this.props.usersRoles.get('modules')}
                            permits={this.props.usersRoles.get('permits')}
                            totalBranchOffices={this.props.usersRoles.get('totalBranchOffices')}
                            arrayBranchOffices={this.props.usersRoles.get('arrayBranchOffices')}
                            roles={this.props.usersRoles.get('roles')}
                            search={this.props.searchData}
                          />
                        </TabPane>
                        <TabPane tabId="2">
                          <ListCargos
                            permitsCargos={this.state.permitsCargos}
                            cargos={this.props.personaInterno.get('cargos')}
                            disabledPositionAction={this.props.disabledPositionAction}
                            confirm={this.props.confirm}
                            search={this.props.searchData}
                          />
                        </TabPane>
                        <TabPane tabId="3">
                          <ListPersonalInactivo
                            permitsPersonal={this.state.permitsPersonal}
                            personalInactivo={this.props.personaInterno.get('personalInactivo')}
                            enabledInternalStaffAction={this.props.enabledInternalStaffAction}
                            confirm={this.props.confirm}
                            search={this.props.searchData}
                          />
                        </TabPane>
                        <TabPane tabId="4">
                          <ListCargosInactivos
                            permitsCargos={this.state.permitsCargos}
                            cargosInactivos={this.props.personaInterno.get('cargosInactivos')}
                            enabledPositionAction={this.props.enabledPositionAction}
                            confirm={this.props.confirm}
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
  aplication: state.global,
  usersRoles: state.usersRoles,
  searchData: state.global.search
});
const mapDispatchToProps = dispatch => ({
  LoadPersonalCargosFunction: () => dispatch(LoadPersonalCargosFunction()),
  DeletePersonalInternoAction: (id) => dispatch(DeletePersonalInternoAction(id)),
  confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  LoadPersonalIdFunction: (id) => dispatch(LoadPersonalIdFunction(id)),
  enabledInternalStaffAction: (id) => dispatch(enabledInternalStaffAction(id)),
  disabledPositionAction: (id) => dispatch(disabledPositionAction(id)),
  enabledPositionAction: (id) => dispatch(enabledPositionAction(id)),
  loadUsersRoles: () => dispatch(LoadAllUsersNoMasterFunction()),
  search: (set) => dispatch(search(set))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInterno);
