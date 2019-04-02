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
  TabPane
} from "reactstrap";
import BodyExternal from "../views/PersonalExterno/BodyExternal";
import classnames from "classnames";
class EnternalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeTab: 1
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const data = [
      {
        nombre: "kevin",
        status: "Aprobado",
        ncm: "asdasd",
        direccion: "asdasd",
        provincia: "asdasd"
      }
    ];

    const dat2 = [
      {
        nombre: "velasco",
        status: "Rechazado",
        ncm: "asdasd",
        direccion: "asdasd",
        provincia: "asdasd"
      }
    ];

    const dat3 = [
      {
        nombre: "ortega",
        status: "Pendiente",
        ncm: "asdasd",
        direccion: "asdasd",
        provincia: "asdasd"
      }
    ];

    return (
      <Container>
        <Card>
          <CardHeader>Centros Medicos Afiliados</CardHeader>
          <CardBody>
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
                  <BodyExternal type={data} />
                </TabPane>
                <TabPane tabId={2}>
                  <BodyExternal type={dat2} />
                </TabPane>
                <TabPane tabId={3}>
                  <BodyExternal type={dat3} />
                </TabPane>
              </TabContent>
            )}
            {!this.state.loading && (
              <TabContent
                activeTab={this.state.activeTab}
                style={{ height: "90%" }}
              >
                <br />
                <div
                  align="center"
                  style={{ paddingTop: "10%", paddingBottom: "10%" }}
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

export default EnternalContainer;

const Container = styled.div`
  display: grid;
  grid-gap: 10px;
  height: 100%;
  grid-template-rows: 88%;
`;
