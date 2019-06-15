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
import MedicalCenter from "../views/Configurations/MedicalCenter";
import { connect } from "react-redux";
import {
  loadMedicalcenterAction,
  editMedicalCenter,
  deleteSucursal
} from "../actions/configAction";
import {
  openConfirmDialog,
  openSnackbars
} from "../actions/aplicantionActions";
import Sucursales from "../views/Configurations/Sucursal";
import Licencias from "../views/Configurations/Licencias";
import CircularProgress from "@material-ui/core/CircularProgress";

class configContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      loading: "show"
    };
  }

  componentDidMount = () => {
    this.props.medicalCenter.get("active")
      ? this.setState({ loading: "hide" })
      : this.props.loadMedicalCenter();
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentWillReceiveProps = props => {
    props.medicalCenter.get("loading") && props.aplication
      ? this.setState({ loading: "hide" })
      : null;
  };

  numberSucursales = data => {
    if (!data.branchoffices) {
      return;
    }

    const trueBranches = data.branchoffices.filter(sucursal => {
      sucursal.status === true;
    });

    let allowedBranches = 0;
    let countSucursals = 0;
    data.licenses.map((license, key) => {
      countSucursals =
        license.numberbranchOffices === null ? 0 : license.numberbranchOffices;
      if (key === 1) {
        allowedBranches = countSucursals;
      }
      allowedBranches = allowedBranches + countSucursals;
    });

    return true;
    // trueBranches > countSucursals;
  };
  render() {
    const permits = this.numberSucursales(this.props.medicalCenter.toJS());
    const symbol = "$";

    console.log(this.props.medicalCenter.toJS());
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Configuracion del Centro Medico</CardHeader>
              <CardBody>
                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === 1
                        })}
                        onClick={() => {
                          this.toggleTab(1);
                        }}
                      >
                        Perfil Centro Medico
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === 2
                        })}
                        onClick={() => {
                          this.toggleTab(2);
                        }}
                      >
                        Sucursales
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === 3
                        })}
                        onClick={() => {
                          this.toggleTab(3);
                        }}
                      >
                        Licencias
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                {this.state.loading === "hide" && (
                  <TabContent
                    activeTab={this.state.activeTab}
                    style={{
                      flex: 1,
                      height: "68vh"
                    }}
                  >
                    <TabPane tabId={1}>
                      <MedicalCenter
                        editAction={this.props.medicalCenterAction}
                        data={this.props.medicalCenter.toJS()}
                        info={this.props.aplication}
                      />
                    </TabPane>
                    <TabPane tabId={2}>
                      <Sucursales
                        openSnackbars={this.props.openSnackbars}
                        permits={permits}
                        sucursales={this.props.medicalCenter.get(
                          "branchoffices"
                        )}
                        deleteSucursal={this.props.deleteSucursal}
                        confirm={this.props.confirm}
                      />
                    </TabPane>

                    <TabPane tabId={3}>
                      <Licencias
                        licenses={this.props.medicalCenter.get("licenses")}
                        symbol={symbol}
                      />
                    </TabPane>
                  </TabContent>
                )}

                {this.state.loading === "show" && (
                  <TabContent
                    activeTab={this.state.activeTab}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                      flex: 1,
                      height: "68vh"
                    }}
                  >
                    <div className={"show"} style={{ textAlign: "center" }}>
                      <CircularProgress />
                    </div>
                  </TabContent>
                )}

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
  medicalCenter: state.config,
  authData: state.auth,
  aplication: state.global.dataGeneral
});

const mapDispatchToProps = dispatch => ({
  loadMedicalCenter: () => dispatch(loadMedicalcenterAction()),
  medicalCenterAction: (data, callback) =>
    dispatch(editMedicalCenter(data, callback)),
  confirm: (message, callback) =>
    dispatch(openConfirmDialog(message, callback)),
  deleteSucursal: (key, time) => dispatch(deleteSucursal(key, time)),
  openSnackbars: (type, message) => dispatch(openSnackbars(type, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(configContainer);
