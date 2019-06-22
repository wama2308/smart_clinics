import React from "react";
import styled from "styled-components";
import {
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardHeader,
  TabContent,
  TabPane,
  Button
} from "reactstrap";
import ExternalModal from "../views/PersonalExterno/ModalExternals/externalModal";
import BodyExternal from "../views/PersonalExterno/BodyExternal";
import classnames from "classnames";
import { deleteRequest } from "../actions/externalAction";
import { openConfirmDialog } from "../actions/aplicantionActions";
import { GetDisabledPermits } from "../core/utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import { allExternalStaff } from "../actions/externalAction";

import { connect } from "react-redux";
class EnternalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeTab: 1,
      openModal: false,
      externalPermits:[]
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount = () => {
    this.props.allExternalStaff();


    this.props.aplication.permission[0].modules.map(permisos => {
      if (permisos.name === "Personal Externo") {
        this.setState({
          serviciosPermits: permisos.permits
        });
      }
    });
  };

  close = () => {
    this.setState({ openModal: false });
  };

  componentWillReceiveProps = props => {
    props.externalStaff
      ? this.setState({ loading: props.externalStaff.loading })
      : null;
  };

  filterData = value => {
    try {
      const payload = {
        pending: value.data.filter(data => data.status === "PENDING"),
        approved: value.data.filter(data => data.status === "APPROVED"),
        cancelled: value.data.filter(data => data.status === "CANCELLED")
      };

      return payload;
    } catch (error) {
      const payload = {
        pending: [],
        aprovved: [],
        cancelled: []
      };
      return payload;
    }
  };

  render() {
    const value = this.props.externalStaff;
    const result = this.filterData(value);
    
    const createDisabled = GetDisabledPermits(this.state.externalPermits, "Create")
    return (
      <Container>
        {this.state.openModal && (
          <ExternalModal open={this.state.openModal} close={this.close} />
        )}
        <Card
          style={{
            height: "83vh"
          }}
        >
          <CardHeader>Centros Medicos Afiliados</CardHeader>
          <CardBody>
            <Button
              color="success"
              disabled={createDisabled}
              style={{ marginBottom: 10 }}
              disabled={!this.state.loading}
              onClick={() => this.setState({ openModal: true })}
            >
              Solicitar Afiliacion
            </Button>
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
                  Aprobados
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
                  Rechazados
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
                  Pendientes
                </NavLink>
              </NavItem>
            </Nav>
            {this.state.loading && (
              <TabContent
                activeTab={this.state.activeTab}
                style={{
                  height: " 65.5vh"
                }}
              >
                <TabPane
                  tabId={1}
                  style={{
                    height: "100%"
                  }}
                >
                  <BodyExternal
                    externalPermits={this.state.externalPermits}
                    deleteData={this.props.deleteData}
                    data={result.approved}
                    delete={this.props.delete}
                    type={"Aprobado"}
                  />
                </TabPane>
                <TabPane
                  tabId={2}
                  style={{
                    height: "100%"
                  }}
                >
                  <BodyExternal
                    externalPermits={this.state.externalPermits}
                    type={"Rechazado"}
                    data={result.cancelled}
                    delete={this.props.delete}
                    deleteData={this.props.deleteData}
                  />
                </TabPane>
                <TabPane
                  tabId={3}
                  style={{
                    height: "100%"
                  }}
                >
                  <BodyExternal
                    externalPermits={this.state.externalPermits}
                    deleteData={this.props.deleteData}
                    data={result.pending}
                    delete={this.props.delete}
                    type={"Pendiente"}
                  />
                </TabPane>
              </TabContent>
            )}
            {!this.state.loading && (
              <TabContent
                activeTab={this.state.activeTab}
                style={{
                  height: "65.5vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <br />
                <div align="center">
                  <CircularProgress />
                </div>
              </TabContent>
            )}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  externalStaff: state.external.get("allExternalStaff"),
  aplication: state.global.dataGeneral
});

const mapDispatchToProps = dispatch => ({
  deleteData: (message, callback) =>
    dispatch(openConfirmDialog(message, callback)),
  allExternalStaff: () => dispatch(allExternalStaff()),
  delete: obj => dispatch(deleteRequest(obj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnternalContainer);

const Container = styled.div`
  display: grid;
  grid-gap: 10px;
  height: 100%;
  grid-template-rows: 88%;
`;
