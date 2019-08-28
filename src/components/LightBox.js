import React, { Component } from 'react';
//import { Modal, Table, TableHead, TableBody } from '@material-ui/core';
import { IconButton, Fab } from '@material-ui/core';
import { HighlightOff, Done } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import jstz from 'jstz';
import { ModalHeader, Modal, ModalBody, ModalFooter } from 'reactstrap';



class LightBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      img: null,
      show: "show"
    }
  }

  acceptImage = () => {
    const time = jstz.determine().name()
    this.setState({
      show: "hide"
    })
    this.props.registerMessageFunction(this.props.id_receiber, this.props.id_transmitter, this.props.foto, time, 1, () => {
      this.props.hide()
    });
  }

  componentDidMount() {
    if (this.props.box === true) {
      this.setState({
        show: "show"
      })
    }
  }


  render() {
    return (
      <span>
        <Modal
          isOpen={this.props.hola}
          toggle={this.props.hide}
          className="ModalStore">
          <div>
            <ModalHeader toggle={this.props.hide}>

            </ModalHeader>
            <ModalBody>
              {this.state.show === "show" ?
                <div style={{ "display": "flex", "justifyContent": "center" }}>
                  {
                    this.props.foto != null && <img alt="foto" style={{ height: 344 }} className="image" src={"data:image/jpeg;" + this.props.foto} />
                  }
                </div> :
                <div style={{ "display": "flex", "justifyContent": "center" }}>
                  <CircularProgress />
                </div>
              }
            </ModalBody>
            <ModalFooter>
              {
                this.props.option === 1 &&
                <div >
                  <Fab color="primary" aria-label="add" onClick={() => this.acceptImage()}>
                    <Done />
                  </Fab>
                </div>
              }
            </ModalFooter>
          </div>
        </Modal>
      </span>
    );
  }
}

export default LightBox;