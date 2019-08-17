import React, { Component } from 'react';
import { CardBody, CardFooter, Collapse } from 'reactstrap';
import { Card } from 'reactstrap';
import { CardHeader } from 'reactstrap';
import { HighlightOff, AddCircleOutline, Send, Done, DoneAll } from '@material-ui/icons';
import { IconButton, withStyles } from '@material-ui/core';
import { Input } from 'reactstrap';
import "../../components/style.css";
import LightBox from '../../components/LightBox';
import { connect } from 'react-redux';
import { loadMessageFunction , registerMessageFunction, messageFunction, cleanMessage, registerFotoFunction } from '../../actions/actionsChat';
import CircularProgress from '@material-ui/core/CircularProgress';
import jstz from 'jstz';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: this.props.show,
      fotoInvalid: false,
      fotoError: '',
      foto: null,
      message: "",
      box: false,
      option: 0,
      visitador: "",
      id_receiber: '',
      id_transmitter: '',
      option: 0
    };
  }

  fileHandlerFoto = (event) => {
    event.preventDefault();
    if (event.target.files[0].size > 250000) {
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
    this.setState({
        box: true,
        id_receiber: this.props.id_receiber,
        id_transmitter: this.props.id_transmitter,
        option: 1
      })
  }


senfoto = ()=>{
  const time =  jstz.determine().name()
       this.props.registerFotoFunction(this.props.id_receiber,this.props.id_transmitter,this.state.foto, time, false, () => {
         this.setState({
           foto: null
         })
       })
}
  viewPhoto = (img) => {
    if (this.state.box === false) {
      this.setState({
        box: true,
        foto: img,
         option: 2
      })
    } else {
      this.setState({
        box: true,
      })
    }
  }

  hangleSend = (event) => {
    event.preventDefault();
      const time =  jstz.determine().name()
      this.props.registerMessageFunction(this.props.id_receiber,this.props.id_transmitter,this.state.message, time, 0,()=>{
       this.props.cleanMessage()     
      })
 
  }

  cleanState = () => {
    this.setState({
      foto: null,
      message: ""
    })
  }

  closeLightBox = () => {
    this.setState({
      box: false
    })
  }

  cleanMessage = () =>{
    this.props.cleanMessage()
  }

  keyPress = (event) => {
    if (event.key == 'Enter') {
      const time =  jstz.determine().name()
      this.props.messageFunction(this.state.message)
     if(this.props.chat.message){
        this.props.registerMessageFunction(this.props.id_receiber,this.props.id_transmitter,this.props.chat.message, time, 0, ()=>{      
        this.props.cleanMessage()
        this.setState({
          message: ""
        })
      })
     }
    }

  }

  handlechange = (event) =>{
    this.setState({
      message: event.target.value
    })
  }

componentWillReceiveProps(props){
  if(props.option === 4){
    console.log(props.option);
  }

}

componentDidMount() {

}
  render() {
    console.log(this.state.foto);

    return (
      <div>
        <LightBox
          hide={this.closeLightBox}
          hola={this.state.box}
          foto={this.state.foto}
          id_receiber={this.state.id_receiber}
          id_transmitter={this.state.id_transmitter}
          registerMessageFunction={this.props.registerMessageFunction}
          option={this.state.option}
        />

        <Collapse isOpen={this.props.show}>
          <Card style={style.chat}>
            <CardHeader>
              <div style={style.chatContainer}>
                <div style={style.user}>
                  <div style={style.visitor}>
                    
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
              {
                this.props.chat.dataMessage ? this.props.chat.dataMessage.map((list, key) =>{
                if(list.transmitter === this.props.transmiter && list.is_image === 0){
                  return ( 
                <div key={key}>
                    <div style={style.primary}>
                      <div style={style.secondary}>
                        <div style={style.tertiary} >
                        { list.message } {list.status === 0 ? <div style={style.doneContainer}><Done style={style.done} /></div> :  <div style={style.doneContainer}><DoneAll style={style.done} /></div>}
                        </div>

                      </div>
                    </div>
                  </div>
                  )
                }else if(list.transmitter !== this.props.transmiter && list.is_image === 0){
                  return ( 
                <div key={key}>
                    <div style={style.primaryLeft}>
                      <div style={style.secondaryLeft}>
                        <div style={style.tertiary} >
                        { list.message } {list.status === 0 ? <div style={style.doneContainer}><Done style={style.done} /></div> :  <div style={style.doneContainer}><DoneAll style={style.done} /></div>}
                        </div>

                      </div>
                    </div>
                  </div>
                  )
                }else if(list.transmitter === this.props.transmiter &&  list.is_image === 1){
                   return(
                    <div key={key}>
                    <div style={style.imgPrimary}>
                      <div style={style.imgSecondary}>
                        <div style={style.imgTertiary} onClick={() => this.viewPhoto(list.message)}>
                        {
                         <img alt="foto" style={style.foto} className="image" src={"data:image/jpeg;" + list.message} />
                        }
                        </div>
                        {list.status === 0 ? <div style={style.doneContainer}><Done style={style.done} /></div> :  <div style={style.doneContainer}><DoneAll style={style.done} /></div>}
                      </div>
                    </div>
                  </div>
                   )
                }else if(list.transmitter !== this.props.transmiter && list.is_image === 1){
                  return(
                    <div key={key}>
                    <div style={style.imgPrimaryLeft}>
                      <div style={style.imgSecondaryLeft}>
                        <div style={style.imgTertiaryLeft} onClick={() => this.viewPhoto(list.message)}>
                        {
                         <img alt="foto" style={style.foto} className="image" src={"data:image/jpeg;" + list.message} />
                        }
                        </div>
                        {list.status === 0 ? <div style={style.doneContainer}><Done style={style.done} /></div> :  <div style={style.doneContainer}><DoneAll style={style.done} /></div>}
                      </div>
                    </div>
                  </div>
                   )
                }

                }):  
                <div style={{height: "60vh"}}>
                    <CircularProgress style={{position: " absolute", height: 40, top: "45%", right: "50%",zIndex: 2}} />
                  </div>
              }

            </CardBody>
            <CardFooter style={style.footer} >
              <form onSubmit={this.hangleSend.bind(this)}>
                <div style={{ "display": "flex" }}>
                  <Input style={style.input}
                    onChange={(e)=>this.handlechange(e)}
                    onKeyPress={(e)=>this.keyPress(e)}
                   
                  ></Input>
                  <Input style={style.photo}
                    id="text-button-file"
                    className="top"
                    type="file"
                    accept="image/*" 
                    onChange={this.fileHandlerFoto}
                  />
                  <IconButton type="button" style={style.send} onClick={this.hangleSend}>
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
    "maxHeight": "27px",
    "borderRadius": "48px",
    "marginRight": "2px",
    "width": "11.6rem"
  },
  body: {
    "height": "72.3%",
    "overflowY": "auto"
  },
  primary: {
    "display": "flex",
    "justifyContent": "flex-end",
    "marginTop": "3px"
  },
  secondary: {
    "color": "black",
    "background": "#6192bf",
    "maxWidth": "75%",
    "lineHeight": "15px",
    "borderTopLeftRadius": "10px",
    "borderBottomLeftRadius": "10px",
    "borderBottomRightRadius": "10px",
    "minWidth": "25px",
    "fontSize": "smaller",
    "textAlign": "-webkit-auto",
  },
  tertiary: {
    "fontSize": "small",
    "margin": "5px",
  },
  primaryLeft: {
    "display": "flex",
    "marginTop": "3px"
  },
  secondaryLeft:{
    "color": "black",
    "background": "#7ebbf3",
    "maxWidth": "75%",
    "lineHeight": "15px",
    "borderBottomLeftRadius": "10px",
    "borderBottomRightRadius": "10px",
    "minWidth": "25px",
    "fontSize": "smaller",
    "textAlign": "-webkit-auto",
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
  icon: {
    "fontSize": "20px"
  },
  send: {
    "marginBottom": "8px",
    "padding": "3px"
  },
  imgPrimary: {
    "display": "flex",
    "justifyContent": "flex-end",
    "marginTop": "5px"
  },
  imgSecondary: {
    "color": "black",
    "background": "#6192bf",
    "maxWidth": "75%",
    "lineHeight": "15px",
    "borderTopLeftRadius": "3px",
    "borderBottomLeftRadius": "3px",
    "borderBottomRightRadius": "3px",
    "minWidth": "25px",
    "fontSize": "smaller"
  },
  imgTertiary: {
    "fontSize": "small",
    "margin": "1px",
  },
  foto: {
    "height": "91px",
    "margin": "1px"
  },
  done:{
    "fontSize":"12px"
  },
  doneContainer:{
    "display": "flow-root",
    "float": "right",
    "marginLeft": "5px",
  },
  imgPrimaryLeft: {
    "display": "flex",
    "marginTop": "5px"
  },
  imgSecondaryLeft: {
    "color": "black",
    "background": "#7ebbf3",
    "maxWidth": "75%",
    "lineHeight": "15px",
    "borderTopLeftRadius": "3px",
    "borderBottomLeftRadius": "3px",
    "borderBottomRightRadius": "3px",
    "minWidth": "25px",
    "fontSize": "smaller"
  },
  imgTertiaryLeft: {
    "fontSize": "small",
    "margin": "1px",
  },
}

const mapDispatchToProps = dispatch => ({
  registerMessageFunction: (id_claim_receiver,id_claim_transmitter,message, time, option, callback) =>dispatch(registerMessageFunction(id_claim_receiver,id_claim_transmitter,message, time, option, callback)),
  messageFunction: (data) =>dispatch(messageFunction(data)),
  cleanMessage: ()=>dispatch(cleanMessage()),
  registerFotoFunction: (id_claim_receiver,id_claim_transmitter,foto, time, option, callback) =>dispatch(registerFotoFunction(id_claim_receiver,id_claim_transmitter,foto, time, option, callback))
})

const mapStateToProps = state => ({
  chat: state.chat.toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
