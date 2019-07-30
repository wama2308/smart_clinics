import React, { Component } from 'react';
import { CardBody, CardFooter, Collapse } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardHeader } from 'reactstrap';
import { HighlightOff, AddCircleOutline, Send } from '@material-ui/icons';
import { IconButton, withStyles } from '@material-ui/core';
import { Input } from 'reactstrap';
import "../../components/style.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: this.props.show,
      fotoInvalid: false,
      fotoError: '',
      foto: null
    };
  }

  fileHandlerFoto = event => {
    event.preventDefault();
    if (event.target.files[0].size > 25000) {
      this.setState({
        fotoError: 'El tamaño de la imagen no esta permitido ',
        fotoInvalid: true,
        collapseFil: true,
      })
    }
    else {
      this.setState({
        fotoError: ' ',
        fotoInvalid: false,
      })
      let selectedFile = event.target.files;
      let fileName = "";
      let file = null
      if (selectedFile.length > 0) {
        let fileToLoad = selectedFile[0];
        fileName = fileToLoad.name;
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
          file = fileLoadedEvent.target.result;
          this.setState({
            foto: file
          })
        }
          .bind(this)
        fileReader.readAsDataURL(fileToLoad);
      }
    }
  }

  render() {
    console.log(this.state.foto);

    return (
      <div>
        <Collapse isOpen={this.props.show}>
          <Card style={style.chat}>
            <CardHeader>
              <div style={style.chatContainer}>
                <div style={style.user}>
                  <div style={style.visitor}>
                    Vistador VIsitador vosotador
                  </div>
                </div>
                <div style={{ "marginTop": "5px" }}>
                  <IconButton onClick={() => this.props.hide()} style={style.closeChat}>
                    <HighlightOff></HighlightOff>
                  </IconButton>
                </div>
              </div>
            </CardHeader>
            <CardBody style={style.body}>
              <div style={style.primary}>
                <div style={style.secondary}>
                  <div style={style.tertiary}>
                    45445454545445454545454544544545454
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter style={style.footer} >
              <form>
                <div style={{ "display": "flex" }}>
                  <Input style={style.input}></Input>
                  <Input style={style.photo}
                    id="text-button-file"
                    className="top"
                    type="file"
                    accept="image/*"
                    onChange={this.fileHandlerFoto}
                  />
                  <IconButton style={style.send}>
                    <Send style={style.icon} />
                  </IconButton>
                  <label htmlFor="text-button-file">
                    <IconButton component="span" style={style.closeChat} >
                      <AddCircleOutline />
                    </IconButton>
                  </label>
                </div>
              </form>
            </CardFooter>
          </Card>
        </Collapse>
      </div>
    );
  }
}
const style = {
  chatContainer: {
    "display": "flex",
    "justifyContent": "flex-end"
  },
  chat: {
    "display": "block",
    "width": "17rem",
    "height": "25rem",
    "color": "#fff",
    "position": "fixed",
    "right": "20px",
    "bottom": "15px",
    "borderRadius": "2%",
    "lineHeight": "10px",
    "textAlign": "center",
    "zIndex": "999",
    "background": "",
  },
  input: {
    "maxHeight": "25px",
    "borderRadius": "48px",
    "marginRight": "2px",
    "width": "11.6rem"
  },
  body: {
    "height": "72.3%"
  },
  primary: {
    "display": "flex",
    "justifyContent": "flex-end",
  },
  secondary: {
    "color": "black",
    "background": "#6df0e8",
    "maxWidth": "75%",
    "lineHeight": "15px",
    "borderRadius": "10px",
    "minWidth": "25px",
    "fontSize": "smaller",
    "textAlign": "-webkit-auto",
  },
  tertiary: {
    "fontSize": "small",
    "margin": "6px",
  },
  photo: {
    "display": "none"
  },
  footer: {
    "height": "13.2%"
  },
  user: {
    "flex": 2,
    "textSlign": "-webkit-left"
  },
  closeChat: {
    "padding": "2px"
  },
  visitor: {
    "color": "black",
    "fontSize": "15px",
    "display": "flex",
    "marginTop": "6%"
  },
  icon:{
    "fontSize": "20px"
  },
  send:{
    "marginBottom": "8px",
    "padding": "3px"
  }
}

export default Chat;