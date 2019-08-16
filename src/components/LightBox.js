import React, { Component } from 'react';
import { Modal, Table, TableHead, TableBody } from '@material-ui/core';
import { IconButton } from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';






class LightBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      img: null
    }
  }




  render() {

    return (
      <div >
        <Modal style={style.modal} open={this.props.hola} onClose={this.props.hide}>
          <div>
            <div style={style.header}>
              <HighlightOff onClick={this.props.hide} style={style.close}></HighlightOff>
              <div style={style.paper} onClick={this.props.hide}>
                <div>
                  {
                    this.props.foto != null && <img alt="foto" style={{ height: 544 }} className="image" src={"data:image/jpeg;" + this.props.foto} />
                  }
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const style = {
  paper: {
    "position": "absolute",
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
  }
}

export default LightBox;