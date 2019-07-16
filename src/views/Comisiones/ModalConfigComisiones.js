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
import "./Commissions.css";
import Select from "react-select";
import jstz from "jstz";
import { connect } from "react-redux";
import { enterDecimal } from "../../core/utils";
import ListServices from "./ListServices.js";
import { openConfirmDialog, openSnackbars } from "../../actions/aplicantionActions";
import {
  setPorcentajeTable,
  setSwitchTableComisiones,
  actionProps
} from "../../actions/CommissionsActions";
import { InitalState } from "./InitialState.js";
import CircularProgress from "@material-ui/core/CircularProgress";

class ModalConfigCommissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...InitalState
    };
  }

  componentDidMount() {
    //console.log("componentDidMount")
    if(this.props.option === 1){
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

  toggle = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  closeModal = () => {
    this.setState({
      ...InitalState,
      loading: "show"
    });
    //this.props.cleanShelfs();
    this.props.valorCloseModal(false);
  };

  validate = () => {
    let divTipoPersona = '';
    let divTipoPersonaError = '';
    let divTiempo = '';
    let divTiempoError = '';
    let divMontoComision = '';    
    let divMontoComisionError = '';
    let divModoPago = '';
    let divModoPagoError = '';
    let divEspecifique = '';
    let divEspecifiqueError = '';
    let divPorcentajeComision = '';    
    let divPorcentajeComisionError = '';
    let acumPorcentajes = 0;
    let acumConfirms = 0;

    if(!this.state.arrayTipoPersonaSelect){
      divTipoPersonaError = "¡Seleccione el tipo de personal!";
      divTipoPersona = "borderColor";
    }else{
      const serviceConfirm = this.props.configCommissions.services.find(service => service.percentage !== 0);
      if(this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936710"){        
        if(!this.state.arrayTiempoSelect){
          divTiempoError = "¡Seleccione el tiempo!";
          divTiempo = "borderColor";
        }
        else if(!serviceConfirm){
          acumPorcentajes++;
          this.props.alert("warning", "¡Ingrese al menos un porcentaje de ganancia!");
        }   
      }
    }

    if (divTipoPersonaError || divTiempoError) {
      this.setState({
        divTipoPersonaError,
        divTipoPersona,
        divTiempoError,
        divTiempo
      });
      return false;
    }else if(acumPorcentajes === 1){
      return false;
    }
    return true;    
  };

  handleSave = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      alert("SISA");
      /*let valueSucursales = "";
      let arraySucursales = Object.values(this.state.arraySucursalesSelect);
      arraySucursales.forEach(function(elemento, indice) {
        if (indice === 0) {
          valueSucursales = elemento;
        }
      });
      if (this.props.option === 1) {
        if (this.props.store.shelfs.length === 0) {
          const message = {
            title: "¡Registrar sin estantes!",
            info: "¿Esta seguro que desea guardar el almacen sin estantes?"
          };
          this.props.confirm(message, res => {
            if (res) {
              this.setState({ loading: "show" });
              this.props.saveStoreAction(
                {
                  sucursal_id: valueSucursales,
                  name: this.state.almacen,
                  description: this.state.descripcion,
                  shelf: this.props.store.shelfs,
                  timeZ: jstz.determine().name()
                },
                () => {
                  this.closeModal();
                }
              );
            }
          });
        } else {
          this.setState({ loading: "show" });
          this.props.saveStoreAction(
            {
              sucursal_id: valueSucursales,
              name: this.state.almacen,
              description: this.state.descripcion,
              shelf: this.props.store.shelfs,
              timeZ: jstz.determine().name()
            },
            () => {
              this.closeModal();
            }
          );
        }
      } else if (this.props.option === 3) {
        if (this.props.store.shelfs.length === 0) {
          const message = {
            title: "¡Registrar sin estantes!",
            info: "¿Esta seguro que desea guardar el almacen sin estantes?"
          };
          this.props.confirm(message, res => {
            if (res) {
              this.setState({ loading: "show" });
              this.props.editStoreAction(
                {
                  store_id: this.props.id,
                  sucursal_id_now: this.props.sucursal_id_now,
                  sucursal_id: valueSucursales,
                  name: this.state.almacen,
                  description: this.state.descripcion,
                  shelf: this.props.store.shelfs,
                  timeZ: jstz.determine().name()
                },
                () => {
                  this.closeModal();
                }
              );
            }
          });
        } else {
          this.setState({ loading: "show" });
          this.props.editStoreAction(
            {
              store_id: this.props.id,
              sucursal_id_now: this.props.sucursal_id_now,
              sucursal_id: valueSucursales,
              name: this.state.almacen,
              description: this.state.descripcion,
              shelf: this.props.store.shelfs,
              timeZ: jstz.determine().name()
            },
            () => {
              this.closeModal();
            }
          );
        }
      }*/
    }
  };

  handleChangeTipoPersona = arrayTipoPersonaSelect => {
    let hideModoPago = "";
    if(arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936710"){
      hideModoPago = "hide";
    }else{
      hideModoPago = "show";
    }

    this.setState({
      arrayTipoPersonaSelect,
      divTipoPersona: "",
      divTipoPersonaError: "",
      hideModoPago:hideModoPago
    });
  };  

  handleChangeTiempo = arrayTiempoSelect => {
    this.setState({
      arrayTiempoSelect,
      divTiempo: "",
      divTiempoError: ""
    });
  };  
  
  handleChangeModoPago = arrayModoPagoSelect => {
    let hideEspecifique = "";
    let hideMontoComision = "";
    let hidePorcentajeComision = "";
    if(arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930044"){
      hideEspecifique = 'show';
      hideMontoComision = "hide";
      hidePorcentajeComision = "hide";
    }else if(arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930011"){
      hideEspecifique = 'hide';
      hideMontoComision = "show";
      hidePorcentajeComision = "hide";
    }else if(arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930022"){
      hideEspecifique = 'hide';
      hideMontoComision = "hide";
      hidePorcentajeComision = "show";
    }else{
      hideEspecifique = 'hide';
      hideMontoComision = "hide";
      hidePorcentajeComision = "hide";
    }    
    this.setState({
      arrayModoPagoSelect,
      divModoPago: "",
      divModoPagoError: "",
      hideEspecifique: hideEspecifique,
      hideMontoComision: hideMontoComision,
      hidePorcentajeComision: hidePorcentajeComision,
    });
  };  

  componentWillReceiveProps = props => {
    //console.log("componentWillReceiveProps")
  };

  handlekeyMontoComision= event =>{
    this.setState({
        divMontoComision: "",
        divMontoComisionError: "",         
    })
  }

  handlekeyEspecifique= event =>{
    this.setState({
        divEspecifique: "",
        divEspecifiqueError: "",         
    })
  }

  eventoBlur = (e) => {
        if(this.state.montoComision === '' || this.state.montoComision === '0.0'){
            this.setState({
                montoComision: '0.00'                      
            }); 
        }        
    }

  eventoFocus = (e) => {        
      if(this.state.montoComision === '0.00'){
          this.setState({
              montoComision: ''                      
          }); 
      }        
  }  

  render() {
    return (
      <span>
        <Modal
          isOpen={this.props.modal}
          toggle={this.closeModal}
          className="ModalCommissions"
        >
          {this.state.loading === "hide" ? (
            <div className={this.state.divContainer}>
              <ModalHeader toggle={this.closeModal}>
                {this.props.modalHeader}
              </ModalHeader>
              <ModalBody className="Scroll">
                <form
                  className="formCodeConfirm"
                  onSubmit={this.handleSave.bind(this)}
                >
                  <div className="row">
                    <FormGroup className="top form-group col-sm-6">
                      <Label for="tipoPersona">Tipo de Persona</Label>
                      <div className={this.state.divTipoPersona}>
                        <Select
                          isSearchable="true"
                          isDisabled={this.props.disabled}
                          name="tipoPersona"
                          value={this.state.arrayTipoPersonaSelect}
                          onChange={this.handleChangeTipoPersona}
                          options={this.props.type_staff}
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.divTipoPersonaError}
                      </div>
                    </FormGroup>
                    <FormGroup className="top form-group col-sm-6">
                      <Label for="tiempo">Tiempo</Label>
                      <div className={this.state.divTiempo}>
                        <Select
                          isSearchable="true"
                          isDisabled={this.props.disabled}
                          name="sucursales"
                          value={this.state.arrayTiempoSelect}
                          onChange={this.handleChangeTiempo}
                          options={this.props.commission_time}
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.divTiempoError}
                      </div>
                    </FormGroup>
                    <FormGroup className={`top form-group col-sm-6 ${this.state.hideModoPago}`}>
                      <Label for="tiempo">Modo de Pago</Label>
                      <div className={this.state.divModoPago}>
                        <Select
                          isSearchable="true"
                          isDisabled={this.props.disabled}
                          name="sucursales"
                          value={this.state.arrayModoPagoSelect}
                          onChange={this.handleChangeModoPago}
                          options={this.props.payment_mode_commission}
                        />
                      </div>
                      <div className="errorSelect">
                        {this.state.divModoPagoError}
                      </div>
                    </FormGroup>
                    <FormGroup className={`top form-group col-sm-6 ${this.state.hideMontoComision}`}>                                                                 
                        <Label for="montoComision">Monto para Comision:</Label> 
                        <div className={this.state.divMontoComision}>                               
                            <Input 
                              disabled={this.state.disabled} 
                              name="montoComision" 
                              id="montoComision" 
                              onKeyUp={this.handlekeyMontoComision} 
                              onChange={this.handleChange} 
                              value={this.state.montoComision} 
                              type="text" 
                              placeholder="Monto para Comision" 
                              onKeyPress={ enterDecimal } 
                              onBlur ={this.eventoBlur} 
                              onFocus = {this.eventoFocus} 
                            />                                    
                        </div>
                        <div className="errorSelect">{this.state.divMontoComisionError}</div>                                                                                                                                                                                         
                    </FormGroup>                     
                    <FormGroup className={`top form-group col-sm-6 ${this.state.hidePorcentajeComision}`}>                                                                 
                        <Label for="porcentajeComision">Porcentaje Comision:</Label> 
                        <div className={this.state.divPorcentajeComision}>                               
                            <Input 
                              disabled={this.state.disabled} 
                              name="porcentajeComision" 
                              id="porcentajeComision" 
                              onKeyUp={this.handlekeyPorcentajeComision} 
                              onChange={this.handleChange} 
                              value={this.state.porcentajeComision} 
                              type="number" 
                              placeholder="Porcentaje Comision"                               
                            />                                    
                        </div>
                        <div className="errorSelect">{this.state.divPorcentajeComisionError}</div>                                                                                                                                                                                         
                    </FormGroup>
                    <FormGroup className={`top form-group col-sm-6 ${this.state.hideEspecifique}`}>
                        <Label for="especifique">Especifique:</Label>
                        <div className={this.state.divEspecifique}>
                            <Input 
                              disabled={this.props.disabled} 
                              name="especifique" 
                              id="especifique" 
                              onKeyUp={this.handlekeyEspecifique} 
                              onChange={this.handleChange} 
                              value={this.state.especifique} 
                              type="textarea" 
                              placeholder="Especifique" 
                            />
                        </div>
                        <div className="errorSelect">{this.state.divEspecifiqueError}</div>
                    </FormGroup>
                  </div>  
                  {
                    (this.state.arrayTipoPersonaSelect && 
                      this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936710") ?
                    <ListServices
                      data = {this.props.configCommissions.services}
                      option = {this.props.option}
                      typePersonal = {this.state.arrayTipoPersonaSelect.value}
                      setPorcentajeTable = {this.props.setPorcentajeTable}
                      setSwitchTableComisiones = {this.props.setSwitchTableComisiones}
                    />
                    :
                    (this.state.arrayModoPagoSelect &&
                    this.state.arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930033") &&
                    <ListServices
                      data = {this.props.configCommissions.services}
                      option = {this.props.option}
                      typePersonal = {this.state.arrayTipoPersonaSelect.value}
                      setPorcentajeTable = {this.props.setPorcentajeTable}
                      setSwitchTableComisiones = {this.props.setSwitchTableComisiones}
                    />
                    
                  }               
                  
                </form>
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
  configCommissions: state.configCommissions.toJS(),  
  commission_time: state.global.dataGeneral.dataGeneral.commission_time,
  type_staff: state.global.dataGeneral.dataGeneral.type_staff,
  payment_mode_commission: state.global.dataGeneral.dataGeneral.payment_mode_commission,
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
  /*confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  saveStoreAction: (data, callback) => dispatch(saveStoreAction(data, callback)),
  editStoreAction: (data, callback) => dispatch(editStoreAction(data, callback)),
  cleanShelfs: () => dispatch(cleanShelfs())*/
  alert: (type, message) => dispatch(openSnackbars(type, message)),     
  actionProps: () => dispatch(actionProps()),
  setPorcentajeTable: (pos, value) =>dispatch(setPorcentajeTable(pos, value)),
  setSwitchTableComisiones: (pos, value) =>dispatch(setSwitchTableComisiones(pos, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalConfigCommissions);
