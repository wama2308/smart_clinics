import React, { Component } from 'react';
import { Modal, Table, TableHead, TableBody } from '@material-ui/core';
import {IconButton, Fab}  from '@material-ui/core';
import { HighlightOff, Done } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import jstz from 'jstz';

class LightBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      img: null
    }
  }

acceptImage = () =>{
   const time =  jstz.determine().name()
  this.props.registerMessageFunction(this.props.id_receiber,this.props.id_transmitter,this.props.foto, time, 1, ()=>{
    this.props.hide()
    
  });

} 


  render() {

    return (
      <div >
        <Modal style={style.modal} open={this.props.hola} onClose={this.props.hide}>
        <div>
          <div>
            <div >
             <div style={style.header}> <HighlightOff onClick={this.props.hide} style={style.close}></HighlightOff></div>
              <div style={style.paper} onClick={this.props.hide}>
               { this.props.foto ?
                  <div>
                  {
                    this.props.foto != null && <img alt="foto" style={{ height: 544 }} className="image" src={"data:image/jpeg;" + this.props.foto} />
                  }
                </div>:
                <div style={{height: "60vh"}}>
                  <CircularProgress style={{position: " absolute", height: 40, top: "45%", right: "50%",zIndex: 2}} />
                </div>
               }
              </div>
            </div>     
          </div>
         { 
           this.props.option === 1 &&
           <div style={style.button} >
               <Fab color="primary" aria-label="add" onClick={()=>this.acceptImage()}>
                <Done />
              </Fab>
            </div>
          }
        </div>
        </Modal>
      </div>
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
  button:{
    "display": "flex",
    "justifyContent": "center",
    "margin": "5px",
  }
}

export default LightBox;