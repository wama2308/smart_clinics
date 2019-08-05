import React, { Component } from 'react';
import { Modal, Table, TableHead, TableBody } from '@material-ui/core';





class LightBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }


  render() {
    console.log(this.props.foto);
    return (
      <div >
        <Modal open={this.props.hola}>
          <Table>
            <TableHead>

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
    "border": "2px solid rgb(0, 0, 0)",
    "outline": "none",
    "right": "2%",
    "height": "14.5cm",
    "top": " 2cm",
    "display": "flex",
    "justifyContent": "center"
  }
}


export default LightBox;