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
      img: this.props.foto,
    }
  }

  acceptImage = () => {
    const time = jstz.determine().name()
    this.props.registerMessageFunction(this.props.id_receiber, this.props.id_transmitter, this.props.foto, time, 1, () => {
      this.props.hide()
    });
  }

  componentWillReceiveProps(props) {
    if (props.foto !== null) {
      this.setState({
        img: props.foto
      })
    }
  }

  render() {
    console.log(this.props.foto);


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
              <div style={{ "display": "flex", "justifyContent": "center" }}>
                {
                  this.props.foto != null && <img alt="foto" style={{ height: 544 }} className="image" src={"data:image/jpeg;" + this.props.foto} />
                }
              </div>
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

const style = {
  paper: {
    "width": "95%",
    "outline": "none",
    "right": "2%",
    "height": "14.5cm",
    "top": "7%",
    "display": "flex",
    "justifyContent": "center"
  },
  close: {
    "fontSize": "3rem",
    "cursor": "hand",
    "color": "white"
  },
  header: {
    "display": "flex",
    "justifyContent": "flex-end"
  },
  modal: {
    "backgroundColor": "black"
  },
  button: {
    "display": "flex",
    "justifyContent": "center",
    "margin": "5px",
  }
}

export default LightBox;