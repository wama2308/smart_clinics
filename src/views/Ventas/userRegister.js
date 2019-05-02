import React from "react";
import { Modal } from 'reactstrap'

class UserRegister extends React.Component {
  render(){
    const { open } = this.props
    return (
      <Modal isOpen={open}>
        <div>hello word</div>
      </Modal>
    )
  }
}

export default UserRegister;
