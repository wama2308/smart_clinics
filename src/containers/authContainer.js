import React from "react";
import Register from "../views/Pages/Register";
import Login from "../views/Pages/Login";
import RegisterEmail from "../views/Pages/RegisterEmail";
import ConfirmCode from "../views/Pages/ConfirmCode";
import EnterPassword from "../views/Pages/EnterPassword";
import { connect } from "react-redux";
import { loginAction, registerStep } from "../actions/authActions";

class SessionContainer extends React.Component {
  state = {
    email: undefined,
    password: undefined
  };

  setEmail = data => {
    this.setState({ email: data });
  };

  setPassword = data => {
    this.setState({ password: data });
  };

  render() {
    const { _loginAction } = this.props;
    return (
      <div>
        {!this.props.step && (
          <Login preRegister={this.props.registerStep} action={_loginAction} />
        )}
        {this.props.step === 1 && (
          <RegisterEmail setEmail={this.setEmail} {...this.state} />
        )}
        {this.props.step === 2 && <ConfirmCode {...this.state} />}
        {this.props.step === 3 && (
          <EnterPassword setPassword={this.setPassword} {...this.state} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.auth.get("authStep")
});

const mapDispatchToProps = dispatch => ({
  _loginAction: (data, notify) => dispatch(loginAction(data, notify)),
  registerStep: () => dispatch(registerStep())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionContainer);
