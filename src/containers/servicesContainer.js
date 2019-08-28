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
  loadOriginalService,
  deletePlantillas,
  editModifyServices,
  enabledField
} from "../actions/ServicesAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import { openConfirmDialog } from "../actions/aplicantionActions";
import Plantillas from "../views/Servicios/plantilla";

class ServicesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeTab: 1,
      serviciosPermits: []
    };
  }

  componentDidMount = () => {
    this.props.getData();

    this.props.aplication.dataGeneral.permission.map(permisos => {
      permisos.modules.map(modulos => {
        if (modulos.name === "Servicios") {
          this.setState({
            serviciosPermits: modulos.permits
          });
        }
      });
    });
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
    const dataPlantilla = this.props.plantilla
      ? this.props.plantilla.templates
      : [];
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card
              style={{
                height: "83vh"
              }}
            >
              <CardHeader>Servicios</CardHeader>
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
                    <TabPane
                      tabId={1}
                      style={{
                        height: "70vh"
                      }}
                    >
                      <TabService
                        serviciosPermits={this.state.serviciosPermits}
                        data={dataService}
                        getdataModal={this.props.getDataModalService}
                        serviceModalData={this.props.serviceModalData}
                        plantilla={this.props.plantilla}
                        search={this.props.searchData}
                        deleteModifyServices={this.props.deleteModifyServices}
                        alert={this.props.alert}
                        enabledField={this.props.enabledField}
                      />
                    </TabPane>
                    <TabPane
                      tabId={2}
                      style={{
                        height: "70vh"
                      }}
                    >
                      <Plantillas
                        serviciosPermits={this.state.serviciosPermits}
                        template={dataPlantilla}
                        alert={this.props.alert}
                        delete={this.props.delete}
                        search={this.props.searchData}
                      />
                    </TabPane>
                  </TabContent>
                )}
                {!this.state.loading && (
                  <TabContent
                    activeTab={this.state.activeTab}
                    style={{
                      height: "70vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <br />
                    <div align="center" className={this.state.divLoadingTable}>
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
  loading: state.service.get("loading"),
  service: state.service.get("servicios"),
  plantilla: state.service.get("plantillas"),
  serviceModalData: state.service.get("ModalService"),
  aplication: state.global,
  searchData: state.global.search
});
const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getDataServices()),
  getDataModalService: obj => dispatch(loadOriginalService(obj)),
  alert: (obj, callback) => dispatch(openConfirmDialog(obj, callback)),
  delete: obj => dispatch(deletePlantillas(obj)),
  deleteModifyServices: obj => dispatch(editModifyServices(obj)),
  enabledField: obj => dispatch(enabledField(obj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesContainer);
