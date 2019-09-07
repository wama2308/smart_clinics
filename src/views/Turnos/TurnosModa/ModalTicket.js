import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  InputGroupAddon,
  InputGroup,
  Card,
  CardBody,
  CardImg
} from 'reactstrap';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CardHeader } from 'reactstrap';
import { Table } from 'reactstrap';

class ModalTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "show",
      height: null,

    }
  }



  closeModal = () => {
    this.setState({
      loading: "show"
    });
    this.props.valorCloseModalView(false);
  };




  render() {
    return (
      <span>
        <Modal
          isOpen={this.props.modalView}
          toggle={this.closeModal}
          className="ModalStore">

          {this.props.turnos.oneTurnos ?
            <div>
              <ModalHeader toggle={this.closeModal}>
                {this.props.modalHeader}</ModalHeader>
              <ModalBody className="Scroll" style={{ "justifyContent": "center", "display": "flex" }} >
                <Card style={{ "height": `${this.props.turnos.oneTurnos.height}cm`, "width": `${this.props.turnos.oneTurnos.width}cm` }}>
                  <Table hover responsive borderless>
                    <thead className="thead-light">
                      <tr>
                       <tr>ss</tr>
                       <tr>s</tr>
                       <tr>s</tr>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </Table>
                  <CardBody>

                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button className="" color="danger" onClick={this.closeModal}>
                  Cancelar
                </Button>
                <Button
                  className={this.props.showHide}
                  color="primary"
                  onClick={this.handleSave}
                >
                  {this.props.modalFooter}
                </Button>
              </ModalFooter>
            </div> :
            <div style={{ height: "55vh" }}>
              <CircularProgress style={{ position: " absolute", height: 40, top: "45%", right: "50%", zIndex: 2 }} />
            </div>
          }
        </Modal>
      </span>
    );
  }
}

const style = {
  chatContainer: {
    "display": "flex",
    "justifyContent": "flex-end"
  },
  user: {
    "flex": 2,
    "textSlign": "-webkit-left"
  },
  visitor: {
    "color": "black",
    "fontSize": "15px",
    "display": "flex",
    "marginTop": "1%"
  },
}

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = state => ({
  turnos: state.configTurnos.toJS()
});

export default connect(mapStateToProps, null)(ModalTicket);