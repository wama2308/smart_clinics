import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  FormFeedback
} from "reactstrap";
import "../../components/style.css";
import "./Shop.css";
import jstz from "jstz";
import { connect } from "react-redux";
import { openConfirmDialog } from "../../actions/aplicantionActions";
import {
  
  actionProps
} from "../../actions/TransferActions";
import { InitalState } from "./InitialState.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListStockBranchOffices from "./ListStockBranchOffices.js";

class ModalStockBranchoffices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...InitalState
    };
  }

  componentDidMount() {
    if (this.props.option === 1 || this.props.option === 2) {
      this.setState({
        loading: 'hide',
      })
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  closeModal = () => {
    this.setState({
      ...InitalState,
      loading: "show"
    });
    this.props.valorCloseModal(false);
  };

  validate = () => {
    let divQuantityRegister = "";
    let divQuantityRegisterError = "";
    if (this.state.quantityRegister === "0" || this.state.quantityRegister === "" || parseFloat(this.state.quantityRegister) < 0) {
      divQuantityRegisterError = "¡Ingrese la cantidad a solicitar!";
      divQuantityRegister = "borderColor";
    }

    if (divQuantityRegisterError) {
      this.setState({
        divQuantityRegister,
        divQuantityRegisterError,
      });
      return false;
    }
    return true;
  };

  handleSave = event => {    
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      if (this.props.option === 1) {
        this.setState({ loading: 'show' })
        let supplie = {_id:this.props.productId,quantity: this.state.quantityRegister  
        }
        this.props.createRequestAction(
          {
            supplie       
          },
          () => {
            this.closeModal();
          }
        )
      }
    }
  };

  handlekeyQuantityRegister = event => {
    this.setState({
      divQuantityRegister: "",
      divQuantityRegisterError: ""
    });
  };

  componentWillReceiveProps = props => { };

  render() {
    return (
      <span>
        <Modal
          isOpen={this.props.modal}
          toggle={this.closeModal}
          className="ModalStore"
        >
          {this.state.loading === "hide" ? (
            <div className={this.state.divContainer}>
              <ModalHeader toggle={this.closeModal}>
                {this.props.modalHeader}
              </ModalHeader>
              <ModalBody className="Scroll">
                {
                  this.props.option === 1 ?
                    <form
                      className="formCodeConfirm"
                      onSubmit={this.handleSave.bind(this)}
                    >
                      <div className="row">
                        <FormGroup className="top form-group col-sm-6">
                          <Label for="producto">Producto:</Label>
                          <div className="">
                            <Input
                              name="producto"
                              id="producto"
                              //onKeyUp={this.handlekeyAlmacen}
                              onChange={this.handleChange}
                              value={this.props.productName}
                              type="text"
                              disabled={true}
                            />
                          </div>
                          <div className="errorSelect"></div>
                        </FormGroup>
                        <FormGroup className="top form-group col-sm-6">
                          <Label for="type">Tipo:</Label>
                          <div className="">
                            <Input
                              name="type"
                              id="type"
                              //onKeyUp={this.handlekeyAlmacen}
                              onChange={this.handleChange}
                              value={this.props.productType}
                              type="text"
                              disabled={true}
                            />
                          </div>
                          <div className="errorSelect"></div>
                        </FormGroup>
                        <FormGroup className="top form-group col-sm-6">
                          <Label for="stock">Stock:</Label>
                          <div className="">
                            <Input
                              name="stock"
                              id="stock"
                              //onKeyUp={this.handlekeyAlmacen}
                              onChange={this.handleChange}
                              value={this.props.productStock}
                              type="text"
                              disabled={true}
                            />
                          </div>
                          <div className="errorSelect"></div>
                        </FormGroup>
                        <FormGroup className="top form-group col-sm-6">
                          <Label for="quantityRegister">Cantidad a Registrar:</Label>
                          <div className={this.state.divQuantityRegister}>
                            <Input
                              name="quantityRegister"
                              id="quantityRegister"
                              onKeyUp={this.handlekeyQuantityRegister}
                              onChange={this.handleChange}
                              value={this.state.quantityRegister}
                              type="number"
                              disabled={false}
                            />
                          </div>
                          <div className="errorSelect">{this.state.divQuantityRegisterError}</div>
                        </FormGroup>

                      </div>
                    </form>
                    :
                    <ListStockBranchOffices
                      option={this.props.option}
                      data={this.props.transfer.supplieIdBranchOffice}
                      search={this.props.searchData}
                      permitsTransfer={this.props.permitsTransfer}
                    //disabled={this.props.disabled}
                    />

                }
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
            </div>
          ) : (
              <div style={{ height: "55vh" }}>
                <CircularProgress
                  style={{
                    position: " absolute",
                    height: 40,
                    top: "45%",
                    right: "50%",
                    zIndex: 2
                  }}
                />
              </div>
            )}
        </Modal>
      </span>
    );
  }
}
const mapStateToProps = state => ({
  transfer: state.transfer.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
  confirm: (message, callback) =>
    dispatch(openConfirmDialog(message, callback)),  
  actionProps: () => dispatch(actionProps())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalStockBranchoffices);
