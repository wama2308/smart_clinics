import React, { Component } from 'react';
import {
  ModalHeader,
  Modal,
  ModalBody,
  Input,
  FormFeedback,
  ModalFooter,
  FormGroup,
  Label,
  Button,
  InputGroup,
  InputGroupAddon,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Table } from 'reactstrap';

class ModalTabla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "show",
      data: []
    }
  }


  closeModal = () => {
    this.props.valorCloseModalTable(false);
  };

  componentDidMount() {
    if (this.props.option === 5) {
      this.setState({
        loading: "hide"
      })
    }
  }
  
  componentWillReceiveProps(props) {
    if(props.option === 5 ){
      this.setState({
        loading: "show"
      })
    }
  }

  render() {
    return (
      <span>
        <Modal
          isOpen={this.props.modal}
          toggle={this.closeModal}
          className="ModalStore">

          {this.state.loading === "show" ?
            <div>
              <ModalHeader toggle={this.closeModal}>

              </ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="form-group col-sm-12" style={{ "overflowX": "auto", "marginBottom": "1rem" }}>
                    <Table responsive borderless >
                      <thead className="thead-light">
                        <tr>
                          <th className="text-left">Nombre</th>
                          <th className="text-left">Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.bedrooms.loadModal ? this.props.bedrooms.loadModal.map((list, key) => {
                          return (
                            <tr key={key}>
                              <td>{list.name}</td>
                              <td>{list.quantity}</td>
                            </tr>
                          )
                        }) : null
                        }
                      </tbody>
                    </Table>

                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className="" color="danger" onClick={this.closeModal}>
                  Cancelar
                </Button>
              </ModalFooter>
            </div>
            :
            <div style={{ height: "50vh" }}>
              <CircularProgress style={{ position: " absolute", height: 40, top: "45%", right: "50%", zIndex: 2 }} />
            </div>
          }
        </Modal>
      </span >
    );
  }
}
const mapStateToProps = state => ({
  bedrooms: state.bedrooms.toJS(),
});


export default connect(mapStateToProps, null)(ModalTabla);