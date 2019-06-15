import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SessionContainer from "./containers/authContainer";

import "./App.css";
// Styles
// CoreUI Icons Set
import "@coreui/icons/css/coreui-icons.min.css";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "./scss/style.css";
import { connect } from "react-redux";
import { DefaultLayout } from "./containers";
import { withRouter } from "react-router";
import {
  closeDialog,
  ConfigGeneralFunction
} from "./actions/aplicantionActions";

// Pages
import {
  Page404,
  Page500,
  Register,
  RegisterEmail,
  TestPage,
  ConfirmCode,
  FormData,
  EnterPassword,
  ResetPassword,
  ConfirmCodeResetPassword,
  EnterResetPassword
} from "./views/Pages";
import Snackbars from "./components/Snackbars";
import { Alert } from "./components/Modals";
import CircularProgress from "@material-ui/core/CircularProgress";

class App extends Component {
  componentWillReceiveProps = props => {
    if (props.logged && props.aplication === null) {
      this.props.ConfigGeneralFunction();
    }
  };
  render() {
    if (this.props.logged && this.props.location.pathname === "/login") {
      return <Redirect to="/dasboard" />;
    }else if (
      this.props.logged === false &&
      (this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register-email")
    ) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Snackbars />
        <Alert {...this.props.alert} close={this.props.closeDialog} />
        {this.props.aplication === null && this.props.logged && (
          <CircularProgress
            style={{
              position: " absolute",
              height: 40,
              top: "45%",
              right: "50%",
              zIndex: 2
            }}
          />
        )}
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            component={SessionContainer}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            component={Register}
          />
          <Route
            exact
            path="/register-email"
            name="Register Email Page"
            component={RegisterEmail}
          />
          <Route exact path="/testpage" name="TestPage" component={TestPage} />
          <Route
            exact
            path="/confirm-code"
            name="Confirm Code"
            component={ConfirmCode}
          />
          <Route
            exact
            path="/enter-password"
            name="Confirm Code"
            component={EnterPassword}
          />
          <Route
            exact
            path="/form-data"
            name="Form Data"
            component={FormData}
          />
          <Route
            exact
            path="/reset-password"
            name="Reset Password"
            component={ResetPassword}
          />
          <Route
            exact
            path="/confirm-code-reset-password"
            name="Confirm code reset password Password"
            component={ConfirmCodeResetPassword}
          />
          <Route
            exact
            path="/enter-reset-password"
            name="Enter reset password"
            component={EnterResetPassword}
          />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          {this.props.aplication && (
            <Route path="/" name="Home" component={DefaultLayout} />
          )}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.auth.get("logged"),
  alert: state.global.confirm,
  aplication: state.global.dataGeneral
});

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(closeDialog()),
  ConfigGeneralFunction: () => dispatch(ConfigGeneralFunction())
});

// <Route path="/" name="Home" component={DefaultLayout} />
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
