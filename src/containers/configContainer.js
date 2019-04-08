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
      ? null
      : this.props.loadMedicalCenter();
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  //  Verification of the license to be able to add another branch

  componentWillReceiveProps = props => {
    props.medicalCenter.get("loading")
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

  // Array of data to send to the branches component

  getCurrencyName = data => {
    if (!data.countryid) {
      return;
    }
    const result = data.country.find(item => {
      return item.id === data.countryid;
    });

    return result.currencySymbol;
  };

  filterDataForSucursal(data) {
    const array = [];
    data = data.toJS();

    data.branchoffices
      ? data.branchoffices.map(branchOfficesData => {
          let dataCountryAndPRovince = data.country.filter(country => {
            return country.id.includes(branchOfficesData.countryId);
          });
          dataCountryAndPRovince = dataCountryAndPRovince[0];

          const id =
            dataCountryAndPRovince.name === "Argentina"
              ? 0
              : branchOfficesData.provinceId;
          array.push({
            country: dataCountryAndPRovince.name,
            province: dataCountryAndPRovince.provinces[id].name,
            ...branchOfficesData
          });
        })
      : [];

    return array;
  }

  render() {
    const DataSucursal = this.filterDataForSucursal(this.props.medicalCenter);
    const permits = this.numberSucursales(this.props.medicalCenter.toJS());
    const symbol = this.getCurrencyName(this.props.medicalCenter.toJS());

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
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={1}>
                      <MedicalCenter
                        editAction={this.props.medicalCenterAction}
                        data={this.props.medicalCenter.toJS()}
                      />
                    </TabPane>
                    <TabPane tabId={2}>
                      <Sucursales
                        openSnackbars={this.props.openSnackbars}
                        permits={permits}
                        sucursales={DataSucursal}
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
                  <TabContent activeTab={this.state.activeTab}>
                    <div className={"show"} style={{ textAlign: "center" }}>
                      <img src="assets/loader.gif" width="20%" height="5%" />
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
  aplication: state.global
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
