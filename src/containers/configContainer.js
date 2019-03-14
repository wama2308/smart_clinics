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
  editMedicalCenter
} from "../actions/configAction";
import Sucursales from "../views/Configurations/Sucursal";
import Licencias from '../views/Configurations/Licencias'

class configContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1
    };
  }

  componentDidMount = () => {
    this.props.loadMedicalCenter();
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  filterDataForSucursal(data) {
    const array = [];
    data = data.toJS();
    console.log(data);
    const resultBranchOffices = data.branchoffices
      ? data.branchoffices.filter(filterStatusTrue => {
          return filterStatusTrue.status;
        })
      : [];

    resultBranchOffices.map(branchOfficesData => {
      let dataCountryAndPRovince = data.country.filter(country => {
        return country.id.includes(branchOfficesData.countryId);
      });
      dataCountryAndPRovince =
        dataCountryAndPRovince.length < 0 ? "" : dataCountryAndPRovince[0];
      array.push({
        country: dataCountryAndPRovince.name,
        province:
          dataCountryAndPRovince.provinces[branchOfficesData.provinceId].name,
        ...branchOfficesData
      });
    });

    return array

  }

  render() {
    const DataSucursal = this.filterDataForSucursal(this.props.medicalCenter);
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
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId={1}>
                    <MedicalCenter
                      editAction={this.props.medicalCenterAction}
                      data={this.props.medicalCenter.toJS()}
                    />
                  </TabPane>
                  <TabPane tabId={2}>
                    <Sucursales sucursales={DataSucursal} />
                  </TabPane>

                  <TabPane tabId={3}>
                    <Licencias />
                  </TabPane>
                </TabContent>
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
    dispatch(editMedicalCenter(data, callback))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(configContainer);
