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
import { dataView } from "../views/PersonalExterno/mockData";
import { openConfirmDialog } from "../actions/aplicantionActions";
import { allExternalStaff } from "../actions/externalAction";

import { connect } from "react-redux";
class EnternalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeTab: 1,
      openModal: false
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
  };

  close = () => {
    this.setState({ openModal: false });
  };

  componentWillReceiveProps = props => {
    console.log(props.externalStaff)
    props.externalStaff
      ? this.setState({ loading: props.externalStaff.loading })
      : null;
  };

  filterData = data => {
    const payload = {
      pendiente: data.filter(data => data.status === "pendiente"),
      aprobado: data.filter(data => data.status === "aprobado"),
      rechazado: data.filter(data => data.status === "rechazado")
    };

    return payload;
  };

  render() {
    const result = this.filterData(dataView);
    console.log("el estado",this.state)
    return (
      <Container>
        {this.state.openModal && (
          <ExternalModal open={this.state.openModal} close={this.close} />
        )}
        <Card>
          <CardHeader>Centros Medicos Afiliados</CardHeader>
          <CardBody>
            <Button
              color="success"
              style={{ marginBottom: 10 }}
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
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={1}>
                  <BodyExternal
                    deleteData={this.props.deleteData}
                    data={result.approved}
                    type={'Aprobado'}
                  />
                </TabPane>
                <TabPane tabId={2}>
                  <BodyExternal
                    type={'Pendiente'}
                    data={result.cancelled}
                    deleteData={this.props.deleteData}
                  />
                </TabPane>
                <TabPane tabId={3}>
                  <BodyExternal
                    deleteData={this.props.deleteData}
                    data={result.pending}
                    type={'Rechazado'}
                  />
                </TabPane>
              </TabContent>
            )}
            {!this.state.loading && (
              <TabContent
                activeTab={this.state.activeTab}
              >
                <br />
                <div
                  align="center"
                >
                  <img src="assets/loader.gif" width="20%" height="5%" />
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
  externalStaff: state.external.get("allExternalStaff")
});

const mapDispatchToProps = dispatch => ({
  deleteData: (message, callback) =>
    dispatch(openConfirmDialog(message, callback)),
  allExternalStaff: () => dispatch(allExternalStaff())
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
