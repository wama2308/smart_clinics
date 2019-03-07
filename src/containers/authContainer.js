import React from "react";
import Register from "../views/Pages/Register";
import Login from "../views/Pages/Login";
import { connect } from "react-redux";
import { loginAction} from '../actions/authActions'

class SessionContainer extends React.Component {
  state = {
    step: 1
  };

  render() {
    const { step } = this.state;
    const {_loginAction} = this.props
    return (
      <div>
        {(step === 1) && <Login  action={_loginAction} />}
        {(step === 2) && <Register />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  _loginAction : (data)=> dispatch(loginAction(data))
})

export default  connect(mapStateToProps, mapDispatchToProps)(SessionContainer);
