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
  CardImg,
  CardImgOverlay
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

  getGroup = fields => {
    let arrayGroups = [];
    fields.map(field => {
      const result = arrayGroups.find(data => data === field.group);
      if (!result) {
        arrayGroups.push(field.group);
      }
    });
    return arrayGroups;
  };

  render() {
    const group = this.getGroup(this.props.data)
    return (
      <span>
        <Modal
          isOpen={this.props.modalView}
          toggle={this.closeModal}
          className="ModalStore">

          {this.props.turnos.oneTurnos ?
            <div>
              <ModalHeader toggle={this.closeModal}>
                {this.props.modalHeader}
              </ModalHeader>
              <ModalBody className="Scroll" style={{ "justifyContent": "center", "display": "flex" }} >
                <div>
                  <Card style={{ "height": `${this.props.turnos.oneTurnos.height}cm`, "width": `${this.props.turnos.oneTurnos.width}cm` }}>
                    <CardImg style={{ opacity: 0.5 }} width="100%" height="100%" src={this.props.turnos.oneTurnos.logo ? `data:image/jpeg; ${this.props.turnos.oneTurnos.logo}` : null} />
                    <CardImgOverlay style={{ "height": `${this.props.turnos.oneTurnos.height}cm`, "width": `${this.props.turnos.oneTurnos.width}cm` }} >
                      <Table responsive borderless>
                        <tbody >
                          {
                            group.sort().map((group) => {
                              return (
                                <tr key={group}>
                                  {
                                    this.props.data.map((fields) => {
                                      if (group === fields.group && fields.required === true) {
                                        return (
                                          <td colspan="3" key={fields.name}>
                                            <p style={{ "fontSize": `${fields.size}px` }}>{fields.label}</p>
                                          </td>
                                        )
                                      }
                                    })
                                  }
                                </tr>
                              )
                            })
                          }

                        </tbody>
                      </Table>
                    </CardImgOverlay>
                  </Card>
                </div>
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
              <CircularProgress style={{ position: "absolute", height: 40, top: "45%", right: "50%", zIndex: 2 }} />
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