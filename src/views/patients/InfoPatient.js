import React from "react";
import { Card } from "reactstrap";
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { AccessTime, SwapHoriz } from "@material-ui/icons";
import MedicalHistory from "./MedicalHistory";
import classnames from "classnames";
import styled from "styled-components";

export default class InfoPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const array = ["1", "2"];
    return (
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{ height: 50 }}
              className={classnames({
                active: this.state.activeTab === 1
              })}
              onClick={() => {
                this.toggleTab(1);
              }}
            >
              Consulta
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              style={{ height: 50 }}
              className={classnames({
                active: this.state.activeTab === 2
              })}
              onClick={() => {
                this.toggleTab(2);
              }}
            >
              Historia Medica
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ height: 50 }}
              className={classnames({
                active: this.state.activeTab === 3
              })}
              onClick={() => {
                this.toggleTab(3);
              }}
            >
              Ultimas Consultas
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          activeTab={this.state.activeTab}
          style={{
            borderTop: "none"
          }}
        >
          <TabPane
            tabId={3}
            style={{
              height: "100%"
            }}
          >
            {array.map((data, key) => {
              return (
                <Card className="tarjetPatient" key={key}>
                  <div className="headerMedicalHistory">
                    <div className="labelAndvalue">
                      <span className="label">Profecional</span>
                      <div>
                        <i className="fa fa-user-md" /> &nbsp;
                        <span>Dr Kevin Gerardo Velasco</span>
                      </div>
                    </div>
                    <div className="labelAndvalue">
                      <span className="label">Referido</span>
                      <div>
                        <SwapHoriz style={{ height: 20 }} />
                        <span>No</span>
                      </div>
                    </div>

                    <span>
                      <i className="fa fa-calendar" /> &nbsp; 03 mayo 2019
                    </span>

                    <div className="labelAndvalue">
                      <span className="label">hora</span>
                      <div>
                        <AccessTime style={{ height: 16 }} />
                        &nbsp;
                        <span>9:20 PM</span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      padding: 20,
                      flexDirection: "column"
                    }}
                  >
                    <h2 style={{ color: "#007bff" }}>Consulta General</h2>

                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus lorem ante, tristique non malesuada in,
                      malesuada a libero. Maecenas venenatis neque ac odio
                      bibendum laoreet. Proin egestas arcu elit, nec porta enim
                      blandit vitae. Duis id commodo leo. Nunc convallis
                      volutpat risus, quis imperdiet justo suscipit et.
                      Vestibulum libero purus, ultrices sed dictum eget, varius
                      et libero. Cras tellus felis, ornare a
                    </div>
                    <br />
                    <div>
                      <h6 style={{ fontWeight: "bold" }}>Diagnostico</h6>
                      Tumor Cerebral
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabPane>

          <TabPane tabId={2}>
            <MedicalHistory />
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;

  .tarjetPatient {
    min-height: 300px;
  }
  .labelAndvalue {
    display: flex;
    flex-direction: column;
  }

  .label {
    color: #c8ced3;
    font-weight: bold;
  }

  .headerMedicalHistory {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    align-items: flex-end;
  }
`;
