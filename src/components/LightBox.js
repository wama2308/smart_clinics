import React, { Component } from 'react';
import { Modal, Table, TableHead, TableBody } from '@material-ui/core';
import { IconButton } from '@material-ui/core/IconButton';
import { HighlightOff } from '@material-ui/icons';





class LightBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }


  render() {
    
    return (
      <div >
        <Modal open={this.props.hola}>
          <Table>
            <TableHead style={style.header}>
          
              <HighlightOff style={style.close} onClick={()=>this.props.hide()}></HighlightOff>
           
            </TableHead>
            <TableBody>
              <div style={style.paper}>
                <div>
                  {
                    this.props.foto != null && <img alt="foto" style={{ height: 544 }} className="image" src={"data:image/jpeg;" + this.props.foto} />
                  }
                </div>
              </div>
            </TableBody>
          </Table>
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
    "top": " 2cm",
    "display": "flex",
    "justifyContent": "center"
  },
  close:{
    "fontSize": "3rem",
    "cursor":"hand"
  },
  header:{
    "display": "flex",
    "justifyContent": "flex-end"
  }
}


export default LightBox;