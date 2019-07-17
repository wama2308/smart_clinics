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
  actionProps,
  cleanListServices,
  saveConfigCommissionsAction,
  editConfigCommissionsAction
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
    this.props.cleanListServices();
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
    console.log("this.state.arrayModoPagoSelect", this.state.arrayModoPagoSelect)
    if(!this.state.arrayTipoPersonaSelect){
      divTipoPersonaError = "¡Seleccione el tipo de personal!";
      divTipoPersona = "borderColor";
    }else{
      if(this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936710"){        
        const servicePercentaje = this.props.configCommissions.services.find(service => service.percentage !== 0);
        if(!this.state.arrayTiempoSelect){
          divTiempoError = "¡Seleccione el tiempo!";
          divTiempo = "borderColor";
        }
        else if(!servicePercentaje){
          acumPorcentajes++;
          this.props.alert("warning", "¡Ingrese al menos un porcentaje de ganancia!");
        }   
      }else{
        const serviceConfirm = this.props.configCommissions.services.find(service => service.confirm === true);
        if(!this.state.arrayTiempoSelect){
          divTiempoError = "¡Seleccione el tiempo!";
          divTiempo = "borderColor";
        }

        if(!this.state.arrayModoPagoSelect){
          divModoPagoError = "¡Seleccione el modo de pago!";
          divModoPago = "borderColor";
        }else{
          if(this.state.arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930011"){
            if(this.state.montoComision === "0.00" || this.state.montoComision === "0.0"){
              divMontoComisionError = "¡Ingrese el monto!";
              divMontoComision = "borderColor";
            }
          }else if(this.state.arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930022"){
            if(this.state.porcentajeComision === "0" || this.state.porcentajeComision === ""){
              divPorcentajeComisionError = "¡Ingrese el porcentaje!";
              divPorcentajeComision = "borderColor";
            }
          }else if(this.state.arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930044"){
            if(this.state.especifique === ""){
              divEspecifiqueError = "Especifique el modo de pago";
              divEspecifique = "borderColor";
            }
          }else if(this.state.arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930033"){
            if(!serviceConfirm){
              acumConfirms++;
              this.props.alert("warning", "¡Seleccione al menos un servicio!");
            }
          }
        }
      }
    }

    if (divTipoPersonaError || 
        divTiempoError || 
        divModoPagoError || 
        divMontoComisionError || 
        divPorcentajeComisionError || 
        divEspecifiqueError
      ) 
    {
      this.setState({
        divTipoPersonaError,
        divTipoPersona,
        divTiempoError,
        divTiempo,
        divModoPagoError,
        divModoPago,
        divMontoComisionError,
        divMontoComision,
        divPorcentajeComisionError,
        divPorcentajeComision,
        divEspecifiqueError,
        divEspecifique
      });
      return false;
    }else if(acumPorcentajes === 1){
      return false;
    }else if(acumConfirms === 1){
      return false;
    }
    return true;    
  };

  handleSave = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      alert("SISA");
      console.log("arrayTipoPersonaSelect ", this.state.arrayTipoPersonaSelect)
      console.log("arrayTiempoSelect ", this.state.arrayTiempoSelect)
      console.log("arrayModoPagoSelect ", this.state.arrayModoPagoSelect)
      console.log("monto minimo comision ", this.state.montoMinimoComision)
      console.log("montoComision ", this.state.montoComision)
      console.log("porcentajeComision ", this.state.porcentajeComision)
      console.log("arrayServicios ", this.props.configCommissions.services)

      let amount = 0;
      let modoPago = "";
      if(this.state.arrayTipoPersonaSelect.value !== "5d1776e3b0d4a50b23936710"){        
        if(this.state.arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930011"){
          amount = this.state.montoComision;
        }else if(this.state.arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930022"){
          amount = this.state.porcentajeComision;
        }else{
          amount = 0;
        }
        modoPago = this.state.arrayModoPagoSelect.value;
      }      

      if(this.props.option === 1)
      {
        this.setState({loading:'show'})                                    
        this.props.saveConfigCommissionsAction(
          {
            time: this.state.arrayTiempoSelect.value,
            type_staff: this.state.arrayTipoPersonaSelect.value,
            payment_type: modoPago,
            amount_min: this.state.montoMinimoComision,
            amount: amount,
            others: this.state.especifique,
            services: this.props.configCommissions.services,
            timeZ: jstz.determine().name()
          },
          () => {
            this.closeModal();                    
          },
          this.props.option
        )
      } 
    }
  };

  handleChangeTipoPersona = arrayTipoPersonaSelect => {
    let hideModoPago = "";
    let hideEspecifique = "";
    let hideMontoComision = "";
    let hidePorcentajeComision = "";
    if(arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936710"){
      hideModoPago = "hide";
      hideEspecifique = 'hide';
      hideMontoComision = "hide";
      hidePorcentajeComision = "hide";
    }else{
      hideModoPago = "show";
      hideEspecifique = 'hide';
      hideMontoComision = "hide";
      hidePorcentajeComision = "hide";
    }

    this.setState({
      arrayTipoPersonaSelect,
      arrayModoPagoSelect: null,
      divTipoPersona: "",
      divTipoPersonaError: "",
      hideModoPago:hideModoPago,
      montoComision:'0.00',
      porcentajeComision:'',
      especifique:'',
      hideEspecifique: hideEspecifique,
      hideMontoComision: hideMontoComision,
      hidePorcentajeComision: hidePorcentajeComision,
    });
    this.props.cleanListServices();
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
      montoComision:'0.00',
      porcentajeComision:'',
      especifique:''
    });
    this.props.cleanListServices();
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

  handlekeyMontoMinimoComision= event =>{
    this.setState({
        divMontoMinimoComision: "",
        divMontoMinimoComisionError: "",         
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

  eventoBlurMontoMinimo = (e) => {
        if(this.state.montoMinimoComision === '' || this.state.montoMinimoComision === '0.0'){
            this.setState({
                montoMinimoComision: '0.00'                      
            }); 
        }        
    }

  eventoFocusMontoMinimo = (e) => {        
      if(this.state.montoMinimoComision === '0.00'){
          this.setState({
              montoMinimoComision: ''                      
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
              <ModalBody className="Scroll" style={{height:'65vh'}}>
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
                    <FormGroup className={`top form-group col-sm-6`}>                                                                 
                        <Label for="montoMinimoComision">Monto Minimo para Comision:</Label> 
                        <div className={this.state.divMontoMinimoComision}>                               
                            <Input 
                              disabled={this.state.disabled} 
                              name="montoMinimoComision" 
                              id="montoMinimoComision" 
                              onKeyUp={this.handlekeyMontoMinimoComision} 
                              onChange={this.handleChange} 
                              value={this.state.montoMinimoComision} 
                              type="text" 
                              placeholder="Monto minimo para Comision" 
                              onKeyPress={ enterDecimal } 
                              onBlur ={this.eventoBlurMontoMinimo} 
                              onFocus = {this.eventoFocusMontoMinimo} 
                            />                                    
                        </div>
                        <div className="errorSelect">{this.state.divMontoMinimoComisionError}</div>                                                                                                                                                                                         
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
                        <Label for="montoComision">Monto Comision:</Label> 
                        <div className={this.state.divMontoComision}>                               
                            <Input 
                              disabled={this.state.disabled} 
                              name="montoComision" 
                              id="montoComision" 
                              onKeyUp={this.handlekeyMontoComision} 
                              onChange={this.handleChange} 
                              value={this.state.montoComision} 
                              type="text" 
                              placeholder="Monto Comision" 
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
  alert: (type, message) => dispatch(openSnackbars(type, message)),     
  actionProps: () => dispatch(actionProps()),
  cleanListServices: () => dispatch(cleanListServices()),
  setPorcentajeTable: (pos, value) =>dispatch(setPorcentajeTable(pos, value)),
  setSwitchTableComisiones: (pos, value) =>dispatch(setSwitchTableComisiones(pos, value)),
  saveConfigCommissionsAction: (data, callback) =>dispatch(saveConfigCommissionsAction(data, callback)),
  editConfigCommissionsAction: (data, callback) =>dispatch(editConfigCommissionsAction(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalConfigCommissions);
