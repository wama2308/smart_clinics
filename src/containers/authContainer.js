import React from "react";
import Login from "../views/Pages/Login";
import RegisterEmail from "../views/Pages/RegisterEmail";
import ConfirmCode from "../views/Pages/ConfirmCode";
import EnterPassword from "../views/Pages/EnterPassword";
import FormData from "../views/Pages/FormData";
import { connect } from "react-redux";
import {
  loginAction,
  registerStep,
  newStep,
  loadSelect,
  backStep,
  saveUser
} from "../actions/authActions";

class SessionContainer extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  setEmail = data => {
    this.setState({ email: data });
  };

  setPassword = data => {
    this.setState({ password: data });
  };

  setConfirmPassword = data => {
    this.setState({ confirmPassword: data });
  };

  render() {
    const { _loginAction } = this.props;
    return (
      <div>
        {!this.props.step && (
          <Login preRegister={this.props.registerStep} action={_loginAction} />
        )}
        {this.props.step === 1 && (
          <RegisterEmail
            setEmail={this.setEmail}
            {...this.state}
            {...this.props}
          />
        )}
        {this.props.step === 2 && (
          <ConfirmCode {...this.state} {...this.props} />
        )}
        {this.props.step === 3 && (
          <EnterPassword
            setConfirmPassword={this.setConfirmPassword}
            setPassword={this.setPassword}
            {...this.props}
            {...this.state}
          />
        )}
        {this.props.step === 4 && <FormData {...this.props} {...this.state} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.auth.get("authStep"),
  secretQuestion: state.auth.get("secretQuestion"),
  typeUser: state.auth.get("typeUser")
});

const mapDispatchToProps = dispatch => ({
  _loginAction: (data, notify) => dispatch(loginAction(data, notify)),
  registerStep: () => dispatch(registerStep()),
  newStep: step => dispatch(newStep(step)),
  loadSelect: () => dispatch(loadSelect()),
  backStep: step => dispatch(backStep(step)),
  saveUser: obj => dispatch(saveUser(obj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionContainer);
