import React from "react";
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
import "../views/Servicios/Services.css";
import "../views/Servicios/loading.css";
import TabService from "../views/Servicios/tabService";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  getDataServices,
  loadOriginalService
} from "../actions/ServicesAction";
import Plantillas from '../views/Servicios/plantilla'

class ServicesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeTab: 1
    };
  }

  componentDidMount = () => {
    this.props.getData();
  };

  componentWillReceiveProps = props => {
    props.loading ? this.setState({ loading: props.loading }) : null;
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const dataService = this.props.service ? this.props.service : [];
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
                        Servicios
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
                        Plantillas
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                {this.state.loading && (
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={1}>
                      <TabService
                        data={dataService}
                        getdataModal={this.props.getDataModalService}
                        serviceModalData={this.props.serviceModalData}
                        plantilla={this.props.pantilla}
                      />
                    </TabPane>
                    <TabPane tabId={2}><Plantillas/></TabPane>
                  </TabContent>
                )}
                {!this.state.loading && (
                  <TabContent activeTab={this.state.activeTab}>
                    <br />
                    <div align="center" className={this.state.divLoadingTable}>
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
  loading: state.service.get("loading"),
  service: state.service.get("servicios"),
  pantilla: state.service.get("plantillas"),
  serviceModalData: state.service.get("ModalService")
});
const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getDataServices()),
  getDataModalService: (obj) => dispatch(loadOriginalService(obj))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesContainer);
