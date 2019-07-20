import React, { Component } from 'react';
import { Col, CardBody, CardFooter, Collapse, InputGroup } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardHeader } from 'reactstrap';
import { TextField, Button, Tooltip, Grid } from '@material-ui/core';
import { Message, Send, QuestionAnswer, HighlightOff } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Row } from 'reactstrap';
import { Table } from 'reactstrap'
import { Input } from 'reactstrap';
import "../../components/style.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: this.props.show
    };
  }

  render() {

    return (
      <div>
        <Collapse isOpen={this.props.show}>
          <Card style={style.chat}>
            <CardHeader>
              <div style={style.chatContainer}>
                <IconButton style={style.closeChat}>
                  <HighlightOff onClick={() => this.props.hide()} ></HighlightOff>
                </IconButton>
              </div>
            </CardHeader>
            <CardBody style={style.body}>
              <div>
                <span>gheuihgiudfhguhdfgh</span>
              </div>
            </CardBody>
            <CardFooter >
              <form>
                <div>
                  <Input style={style.input}></Input>
                  <IconButton>
                    <Input className="top" type="file" accept="image/*"  onChange={this.fileHandlerFoto} />
                 </IconButton>
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
    "width": "20%",
    "height": "60%",
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
    "borderRadius": "48px"
  },
  closeChat: {
    "padding": "0px"
  },
  body: {
    "height": "75%"
  }

}

export default Chat;