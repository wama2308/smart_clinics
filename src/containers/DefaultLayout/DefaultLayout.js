import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import { getMenu } from "../../_nav";
// routes config
import routes from "../../routes";
import DefaultAside from "./DefaultAside";
import DefaultFooter from "./DefaultFooter";
import DefaultHeader from "./DefaultHeader";
import { connect } from "react-redux";
class DefaultLayout extends Component {
  render() {
    const navigation = getMenu(this.props.menu);
    console.log("jjjj", navigation);
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body ">
          <AppSidebar fixed display="lg" minimized>
            <AppSidebarNav
              navConfig={navigation}
              location={this.props.location}
            />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container
              fluid
              style={{
                height: "100%",
                padding: 20,
                display: "flex",
                flexDirection: " column"
              }}
            >
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
              </Switch>
            </Container>
          </main>
          <AppAside fixed>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  permits: state.auth.get("permission"),
  menu: state.global.dataGeneral.menu
});

export default connect(
  mapStateToProps,
  null
)(DefaultLayout);
