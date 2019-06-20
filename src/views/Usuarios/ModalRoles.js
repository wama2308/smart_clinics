import React from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
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
import "./Users.css";
import jstz from "jstz";
import { connect } from "react-redux";
import { LoadRolIdFunction, loadRolNewPusher } from "../../actions/UserAction";
import CircularProgress from "@material-ui/core/CircularProgress";

class ModalRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rol: "",
      rolError: "",
      rolInvalid: false,
      selected: [],
      divListBox: "",
      selectedError: "",
      modules: [],
      onlyModules: [],
      selectedInvalid: 0,
      loading: "show"
    };
  }

  componentDidMount() {
    this.setState({
      modules: this.props.permits,
      onlyModules: this.props.modules
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  testOnclick = () => {
    //this.props.LoadRolNew();
  };

  closeRoles = () => {
    this.setState({
      rol: "",
      rolError: "",
      rolInvalid: false,
      selected: [],
      divListBox: "",
      selectedError: "",
      loading: "show"
    });
    this.props.valorCloseModalRoles(false);
  };

  onChange = selected => {
    if (Object.keys(selected).length === 0) {
      this.setState({
        selected,
        selectedInvalid: 0,
        divListBox: "borderColor",
        selectedError: "¡Seleccione los permisos!"
      });
    } else {
      this.setState({
        selected,
        selectedInvalid: 1,
        divListBox: "",
        selectedError: ""
      });
    }
  };

  validate = () => {
    let rolInvalid = false;
    let rolError = "";
    let selectedInvalid = 0;
    let selectedError = "";
    let divListBox = "";

    if (this.state.rol === "") {
      rolError = "¡Ingrese el rol!";
      rolInvalid = true;
    }
    if (this.state.selectedInvalid === 0) {
      divListBox = "borderColor";
      selectedError = "¡Seleccione los permisos!";
      selectedInvalid = 0;
    }
    if (rolError || selectedError) {
      this.setState({
        rolInvalid,
        rolError,
        selectedInvalid,
        selectedError,
        divListBox
      });
      return false;
    }
    return true;
  };

  handleSaveRoles = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      if (this.props.option === 1) {
        this.setState({ loading: "show" });
        this.props.saveRolAction(
          {
            rol: this.state.rol,
            selected: this.state.selected,
            onlyModules: this.state.onlyModules,
            timeZ: jstz.determine().name()
          },
          () => {
            this.closeRoles();
          }
        );
      } else if (this.props.option === 3) {
        this.setState({ loading: "show" });
        this.props.editRolAction(
          {
            _id: this.props.id,
            rol: this.state.rol,
            selected: this.state.selected,
            onlyModules: this.state.onlyModules,
            timeZ: jstz.determine().name()
          },
          () => {
            this.closeRoles();
          }
        );
      }
    }
  };

  handlekeyRol = event => {
    this.setState({
      rolError: "",
      rolInvalid: false
    });
  };

  componentWillReceiveProps = props => {
    if (props.option === 0) {
      this.closeRoles();
    } else if (props.option === 1) {
      this.setState({
        loading: "hide"
      });
    } else if (props.option === 2 || props.option === 3) {
      if (props.usersRoles.rolIdView) {
        if (props.usersRoles.rolIdView.rolId.rol) {
          this.setState({
            loading: "hide",
            rol: props.usersRoles.rolIdView.rolId.rol,
            selected: props.usersRoles.rolIdView.rolId.modules,
            selectedInvalid: 1
          });
        }
      }
    }
  };

  render() {
    return (
      <span>
        <Modal
          isOpen={this.props.modal}
          toggle={this.closeRoles}
          className="ModalUsersRoles"
        >
          {this.state.loading === "hide" ? (
            <div className={this.state.divContainer}>
              <ModalHeader toggle={this.closeRoles}>
                {this.props.modalHeader}
              </ModalHeader>
              <ModalBody className="Scroll">
                <form
                  className="formCodeConfirm"
                  onSubmit={this.handleSaveRoles.bind(this)}
                >
                  <FormGroup className="top form-group col-sm-12">
                    <Label for="rol">Rol</Label>
                    <Input
                      disabled={this.props.disabled}
                      invalid={this.state.rolInvalid}
                      name="rol"
                      id="rol"
                      onKeyUp={this.handlekeyRol}
                      onChange={this.handleChange}
                      value={this.state.rol}
                      type="text"
                      placeholder="Rol"
                    />
                    <FormFeedback tooltip>{this.state.rolError}</FormFeedback>
                  </FormGroup>
                  <FormGroup className="top form-group col-sm-12">
                    <Label for="modules">Modulos-Permisos</Label>
                    <div className={this.state.divListBox}>
                      <DualListBox
                        disabled={
                          this.props.disabled ? this.props.disabled : false
                        }
                        className="borderColor"
                        canFilter
                        invalid
                        name="modules"
                        id="modules"
                        options={this.state.modules}
                        selected={this.state.selected}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="error">{this.state.selectedError}</div>
                  </FormGroup>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button className="" color="danger" onClick={this.closeRoles}>
                  Cancelar
                </Button>
                <Button
                  className={this.props.showHide}
                  color="primary"
                  onClick={this.handleSaveRoles}
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
  usersRoles: state.usersRoles.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
  LoadRolViewId: pos => dispatch(LoadRolIdFunction(pos)),
  LoadRolNew: () => dispatch(loadRolNewPusher())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalRoles);
