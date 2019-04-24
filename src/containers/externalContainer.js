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
import {deleteRequest} from '../actions/externalAction'
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
    console.log(props.externalStaff);
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
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId={1}>
                  <BodyExternal
                    deleteData={this.props.deleteData}
                    data={result.approved}
                    delete={this.props.delete}
                    type={"Aprobado"}
                  />
                </TabPane>
                <TabPane tabId={2}>
                  <BodyExternal
                    type={"Rechazado"}
                    data={result.cancelled}
                    delete={this.props.delete}
                    deleteData={this.props.deleteData}
                  />
                </TabPane>
                <TabPane tabId={3}>
                  <BodyExternal
                    deleteData={this.props.deleteData}
                    data={result.pending}
                    delete={this.props.delete}
                    type={"Pendiente"}
                  />
                </TabPane>
              </TabContent>
            )}
            {!this.state.loading && (
              <TabContent activeTab={this.state.activeTab}>
                <br />
                <div align="center">
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
  allExternalStaff: () => dispatch(allExternalStaff()),
  delete: (obj)=>dispatch(deleteRequest(obj))
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
