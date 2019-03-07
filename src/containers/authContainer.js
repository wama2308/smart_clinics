import React from "react";
import Register from "../views/Pages/Register";
import Login from "../views/Pages/Login";
import { connect } from "react-redux";

class SessionContainer extends React.Component {
  state = {
    step: 1
  };

  render() {
    const { step } = this.state;
    return (
      <div>
        {(step === 1) && <Login />}
        {(step === 2) && <Register />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
    dispatch  
})

export default  connect(mapStateToProps, mapDispatchToProps)(SessionContainer);
