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
  FormFeedback,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,  
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
  cleanListServicesTab,
  saveConfigCommissionsAction,
  editConfigCommissionsAction,
  setSwitchAllTableComisiones,
  setPorcentajeAllTable,
  searchPatientStaffAll,
  searchOnePatientStaff,
  getOptionsPersonal,
  getOneReference
} from "../../actions/CommissionsActions";
import { InitalState } from "./InitialState.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { number_format } from "../../core/utils";
import classnames from "classnames";
import Search from "../../components/DefaultSearch";

class ModalConfigCommissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...InitalState
    };
  }

  /*toggleTab(tab) {    
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }        
  }*/

  toggleTab = tab => {
    if(tab === "2"){
      const isValid = this.validateTabTwo();
      if(isValid){
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }  
      }
             
    }else{
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      } 
    }
    
  }

  componentDidMount() {
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

  validateTabTwo = () => {
    let divTipoPersona = '';
    let divTipoPersonaError = '';
    let divTiempo = '';
    let divTiempoError = '';
    let divTipo = '';
    let divTipoError = '';
    let divNroPersonasReferenciadas = '';
    let divNroPersonasReferenciadasError = '';
    let divMontoMinimoComision = '';
    let divMontoMinimoComisionError = '';
    let divPersonalExterno = '';
    let divPersonalExternoError = '';
    let acumConfirms = 0;
    let divSeleccioneServiciosComision = '';    

    if(!this.state.arrayTipoPersonaSelect){
      divTipoPersonaError = "¡Seleccione el tipo de personal!";
      divTipoPersona = "borderColor";
    }else{
      if(this.state.tiempoDias === "" || this.state.tiempoDias === "0" || this.state.tiempoDias === 0){
        divTiempoError = "Ingrese el tiempo (dias)!";
        divTiempo = "borderColor";
      }
      if(!this.state.arrayTipo){
        divTipoError = "¡Seleccione el tipo!";
        divTipo = "borderColor";
      }else{
        if(this.state.arrayTipo.value === "5d1776e3b0d4a50b23931122"){
          if(this.state.nroPersonasReferenciadas === "" || this.state.nroPersonasReferenciadas === "0" || this.state.nroPersonasReferenciadas === 0){
            divNroPersonasReferenciadasError = "¡Ingrese el numero de personas referenciadas!";
            divNroPersonasReferenciadas = "borderColor";
          }
        }else{
          if(this.state.montoMinimoComision === "0.00" || this.state.montoMinimoComision === "0.0"){
            divMontoMinimoComisionError = "¡Ingrese el monto minimo para la comision!";
            divMontoMinimoComision = "borderColor";
          }
        }
      }

      if(this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936710"){  
        if(!this.state.arrayPersonalExterno){
          divPersonalExternoError = "¡Seleccione el personal externo!";
          divPersonalExterno = "borderColor";
        }        
      }else{
        const serviceConfirm = this.props.configCommissions.servicesCommission.find(service => service.confirm === true);
        if(!serviceConfirm){
          acumConfirms++;
          //this.props.alert("warning", "¡Seleccione al menos un servicio para la comision!");
          divSeleccioneServiciosComision = "¡Seleccione al menos un servicio para la comision!";
        }               
      }
    }

    if (divTipoPersonaError || 
        divTiempoError ||         
        divTipoError ||
        divMontoMinimoComisionError ||         
        divNroPersonasReferenciadasError ||        
        divPersonalExternoError ||
        divSeleccioneServiciosComision
      ) 
    {
      this.setState({
        divTipoPersonaError,
        divTipoPersona,
        divTiempoError,
        divTiempo,
        divTipoError, 
        divTipo,
        divMontoMinimoComisionError,
        divMontoMinimoComision,
        divNroPersonasReferenciadasError,
        divNroPersonasReferenciadas,
        divPersonalExternoError,
        divPersonalExterno,
        divSeleccioneServiciosComision
      });
      return false;
    }else if(acumConfirms === 1){
      return false;
    }
    return true;    

  }

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
    let divPorcentajeComision = '0';    
    let divPorcentajeComisionError = '';
    let divNroPersonasReferenciadas = '';
    let divNroPersonasReferenciadasError = '';
    let divTipo = '';
    let divTipoError = '';
    let divMontoMinimoComision = '';
    let divMontoMinimoComisionError = '';
    let divPersonalExterno = '';
    let divPersonalExternoError = '';
    let acumPorcentajes = 0;
    let acumConfirms = 0;
    let acumConfirmsPayments = 0;
    let divSeleccioneServiciosComision = '';
    let divSeleccioneServiciosPayment = '';
    
    if(!this.state.arrayTipoPersonaSelect){
      divTipoPersonaError = "¡Seleccione el tipo de personal!";
      divTipoPersona = "borderColor";
    }else{
      if(this.state.tiempoDias === "" || this.state.tiempoDias === "0" || this.state.tiempoDias === 0){
        divTiempoError = "Ingrese el tiempo (dias)!";
        divTiempo = "borderColor";
      }
      if(!this.state.arrayTipo){
        divTipoError = "¡Seleccione el tipo!";
        divTipo = "borderColor";
      }else{
        if(this.state.arrayTipo.value === "5d1776e3b0d4a50b23931122"){
          if(this.state.nroPersonasReferenciadas === "" || this.state.nroPersonasReferenciadas === "0" || this.state.nroPersonasReferenciadas === 0){
            divNroPersonasReferenciadasError = "¡Ingrese el numero de personas referenciadas!";
            divNroPersonasReferenciadas = "borderColor";
          }
        }else{
          if(this.state.montoMinimoComision === "0.00" || this.state.montoMinimoComision === "0.0"){
            divMontoMinimoComisionError = "¡Ingrese el monto minimo para la comision!";
            divMontoMinimoComision = "borderColor";
          }
        }
      }

      if(this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936710"){  
        const servicePercentaje = this.props.configCommissions.servicesPayment.find(service => service.percentage !== 0);        
        const servicePercentajeVacios = this.props.configCommissions.servicesPayment.find(service => service.percentage === "");        
        if(!this.state.arrayPersonalExterno){
          divPersonalExternoError = "¡Seleccione el personal externo!";
          divPersonalExterno = "borderColor";
        }
        if(!servicePercentaje){
          acumPorcentajes++;
          //this.props.alert("warning", "¡Ingrese al menos un porcentaje de ganancia!");
          divSeleccioneServiciosPayment = "¡Ingrese al menos un porcentaje de ganancia!";
        }   
        if(servicePercentajeVacios){
          acumPorcentajes++;
          //this.props.alert("warning", "¡Ingrese al menos un porcentaje de ganancia!");
          divSeleccioneServiciosPayment = "¡Los porcentajes de ganancia no pueden estar vacios!";
        }   
      }else{
        const serviceConfirm = this.props.configCommissions.servicesCommission.find(service => service.confirm === true);
        const serviceConfirmPayment = this.props.configCommissions.servicesPayment.find(service => service.confirm === true);
        if(!serviceConfirm){
          acumConfirms++;
          //this.props.alert("warning", "¡Seleccione al menos un servicio para la comision!");
          divSeleccioneServiciosComision = "¡Seleccione al menos un servicio para la comision!";
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
            if(!serviceConfirmPayment){
              acumConfirmsPayments++;
              //this.props.alert("warning", "¡Seleccione al menos un servicio para como pago!");
              divSeleccioneServiciosPayment = "¡Seleccione al menos un servicio para como pago!";
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
        divEspecifiqueError ||
        divTipoError ||
        divNroPersonasReferenciadasError ||
        divMontoMinimoComisionError ||
        divPersonalExternoError ||
        divSeleccioneServiciosComision ||
        divSeleccioneServiciosPayment
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
        divEspecifique,
        divTipoError, 
        divTipo,
        divNroPersonasReferenciadasError,
        divNroPersonasReferenciadas,
        divMontoMinimoComisionError,
        divMontoMinimoComision,
        divPersonalExternoError,
        divPersonalExterno,
        divSeleccioneServiciosComision,
        divSeleccioneServiciosPayment
      });
      return false;
    }else if(acumPorcentajes === 1){
      return false;
    }else if(acumConfirmsPayments === 1){
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
      let amount = 0;
      let modoPago = "";
      let externalStaffId = "";
      if(this.state.arrayTipoPersonaSelect.value !== "5d1776e3b0d4a50b23936710"){        
        if(this.state.arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930011"){
          amount = this.state.montoComision;
        }else if(this.state.arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930022"){
          amount = this.state.porcentajeComision;
        }else{
          amount = 0;
        }
        modoPago = this.state.arrayModoPagoSelect.value;        
      }else{
        externalStaffId = this.state.arrayPersonalExterno.value;
      }      

      if(this.props.option === 1)
      {
        this.setState({loading:'show'})                                    
        this.props.saveConfigCommissionsAction(
          {
            type_staff: this.state.arrayTipoPersonaSelect.value,
            time: this.state.tiempoDias,
            type: this.state.arrayTipo.value,
            amount_min: this.state.montoMinimoComision,
            number_people: this.state.nroPersonasReferenciadas,
            external_staff_id: externalStaffId,
            services_commission: this.props.configCommissions.servicesCommission,
            payment_type: modoPago,            
            amount: amount,
            others: this.state.especifique,
            services_payment: this.props.configCommissions.servicesPayment,
            timeZ: jstz.determine().name()
          },
          () => {
            this.closeModal();                    
          },
          this.props.option
        )
      } 
      if(this.props.option === 3)
      {
        this.setState({loading:'show'})                                    
        this.props.editConfigCommissionsAction(
          {
            _id: this.props.id,
            type_staff: this.state.arrayTipoPersonaSelect.value,
            time: this.state.tiempoDias,
            type: this.state.arrayTipo.value,
            amount_min: this.state.montoMinimoComision,
            number_people: this.state.nroPersonasReferenciadas,
            external_staff_id: externalStaffId,
            services_commission: this.props.configCommissions.servicesCommission,
            payment_type: modoPago,            
            amount: amount,
            others: this.state.especifique,
            services_payment: this.props.configCommissions.servicesPayment,
            timeZ: jstz.determine().name()
          },
          () => {
            this.closeModal();                    
          }
        )
      }
    }
  };

  handleChangeTipoPersona = arrayTipoPersonaSelect => {
    let hideModoPago = "";
    let hideEspecifique = "";
    let hideMontoComision = "";
    let hidePorcentajeComision = "";
    let hidePersonalExterno = "";    
    let hideAplicarPorcentajeTodos = "";    
    let hideCargos = "hide";    
    let hideBuscador = "hide";    
    if(arrayTipoPersonaSelect){
      if(arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936710"){
        hideModoPago = "hide";
        hideEspecifique = 'hide';
        hideMontoComision = "hide";
        hidePorcentajeComision = "hide";
        hidePersonalExterno = "show";
        hideAplicarPorcentajeTodos = "show";
      }else{
        hideModoPago = "show";
        hideEspecifique = 'hide';
        hideMontoComision = "hide";
        hidePorcentajeComision = "hide";
        hidePersonalExterno = "hide";
        hideAplicarPorcentajeTodos = "hide";
      }
  
      this.setState({
        arrayTipoPersonaSelect,
        arrayModoPagoSelect: null,
        divTipoPersona: "",
        divTipoPersonaError: "",
        hideModoPago:hideModoPago,
        montoComision:'0.00',
        porcentajeComision:'0',
        especifique:'',
        arrayOpciones: null,
        arrayCargos:null,
        labelsBuscador: arrayTipoPersonaSelect.label,
        hideEspecifique: hideEspecifique,
        hideMontoComision: hideMontoComision,
        hidePorcentajeComision: hidePorcentajeComision,
        hidePersonalExterno: hidePersonalExterno,
        hideAplicarPorcentajeTodos: hideAplicarPorcentajeTodos,
        hideCargos: hideCargos,
        hideBuscador: hideBuscador,
        hideOpciones: 'show',
      });
      this.props.cleanListServicesTab(this.state.activeTab);
    }else{
      this.setState({        
        hideOpciones: 'hide',
      });
    }   
  };

   handleChangeTipo = arrayTipo => {    
    if(arrayTipo){
      let hideTipoNroPersonas = "";    
      let hideTipoMontoMinimo = "";    
      if(arrayTipo.value === "5d1776e3b0d4a50b23931122"){
        hideTipoNroPersonas = "Show";
        hideTipoMontoMinimo = 'hide';      
      }else{
        hideTipoNroPersonas = "hide";
        hideTipoMontoMinimo = 'show';      
      }  
      this.setState({
        arrayTipo,
        divTipo: "",
        divTipoError: "",
        hideTipoNroPersonas: hideTipoNroPersonas,
        hideTipoMontoMinimo: hideTipoMontoMinimo,
        montoMinimoComision: '0.00',
        nroPersonasReferenciadas: '0',
      });
    }
  }

  handleChangeTiempo = arrayTiempoSelect => {
    this.setState({
      arrayTiempoSelect,
      divTiempo: "",
      divTiempoError: ""
    });
  };  
  
  handleChangeTipoReglaComision = arrayTipoReglaComision => {
    if(arrayTipoReglaComision){
      this.setState({
        arrayTipoReglaComision,
        divTipoReglaComision: "",
        divTipoReglaComisionError: "",
        arrayTipo:null,
        arrayTipoPersonaSelect:null,
        hideOpciones:'hide',
        hideCargos:'hide',
        hideBuscador:'hide',
      });    
    }    
  };  

  handleChangePersonalExterno = arrayPersonalExterno => {
    this.setState({
      arrayPersonalExterno,
      divPersonalExterno: "",
      divPersonalExternoError: ""
    });
  };  

  handleChangeOpciones = arrayOpciones => {
    let hideCargos = "";    
    let hideBuscador = "";    
    if(arrayOpciones){
      if(arrayOpciones.value === "5d1776e3b0d4a50b23440033"){
        hideCargos = "show";    
        hideBuscador = "hide";    
      }else if(arrayOpciones.value === "5d1776e3b0d4a50b23930022"){
        hideCargos = "hide";    
        hideBuscador = "show";    
      }else{
        hideCargos = "hide";    
        hideBuscador = "hide";    
      }
      this.setState({
        arrayOpciones,
        arrayCargos:null,
        divOpciones: "",
        divOpcionesError: "",
        hideCargos:hideCargos,
        hideBuscador:hideBuscador,
      });
    }
    
  };  

  handleChangeCargos = arrayCargos => {
    if(arrayCargos){
      this.setState({
        arrayCargos,
        divCargos: "",
        divCargosError: ""
      });
    }else{
      this.setState({
        arrayCargos: null,
        divCargos: "",
        divCargosError: ""
      });
    }
    
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
      porcentajeComision:'0',
      especifique:''
    });
    this.props.cleanListServicesTab(this.state.activeTab);
  };  

  componentWillReceiveProps = props => {  
    console.log("componentWillReceiveProps ", props.configCommissions);  
    if(props.option === 1){
      this.setState({
        loading:'hide'
      });
    }
    if(props.option === 2 || props.option === 3){
      if(props.configCommissions.dataId._id  && props.configCommissions.action === 0){
        let hideModoPago = "";
        let hideEspecifique = "";
        let hideMontoComision = "";
        let hidePorcentajeComision = "";
        let hidePersonalExterno = "";
        let hideTipoNroPersonas = "";
        let hideTipoMontoMinimo = "";
        let montoMinimoComision = "0.00";
        let nroPersonasReferenciadas = "0";
        let montoComision = "0.00";
        let porcentajeComision = "0";
        let especifique = "0";
        let arrayPersonalExterno = null;
        if(props.configCommissions.dataId.type_staff.value === "5d1776e3b0d4a50b23936710"){
          hideModoPago = "hide";
          hideEspecifique = 'hide';
          hideMontoComision = "hide";
          hidePorcentajeComision = "hide";
          hidePersonalExterno = "show";
          arrayPersonalExterno = props.configCommissions.dataId.external_staff; 
        }else{
          hideModoPago = "show";
          hideEspecifique = 'hide';
          hideMontoComision = "hide";
          hidePorcentajeComision = "hide";
          hidePersonalExterno = "hide";
          arrayPersonalExterno = null;
        }        

        if(props.configCommissions.dataId.payment_type.value === "5d1776e3b0d4a50b23930044"){
          hideEspecifique = 'show';
          hideMontoComision = "hide";
          hidePorcentajeComision = "hide";
          montoComision = "0.00";
          porcentajeComision = "0";
          especifique = props.configCommissions.dataId.other;
        }else if(props.configCommissions.dataId.payment_type.value === "5d1776e3b0d4a50b23930011"){
          hideEspecifique = 'hide';
          hideMontoComision = "show";
          hidePorcentajeComision = "hide";
          montoComision = number_format(props.configCommissions.dataId.amount, 2);
          porcentajeComision = "0";
          especifique = "";
        }else if(props.configCommissions.dataId.payment_type.value === "5d1776e3b0d4a50b23930022"){
          hideEspecifique = 'hide';
          hideMontoComision = "hide";
          hidePorcentajeComision = "show";
          montoComision = "0.00";
          porcentajeComision = props.configCommissions.dataId.amount;
          especifique = "";
        }else{
          hideEspecifique = 'hide';
          hideMontoComision = "hide";
          hidePorcentajeComision = "hide";
          montoComision = "0.00";
          porcentajeComision = "0";
          especifique = "";
        }    

        if(props.configCommissions.dataId.type.value === "5d1776e3b0d4a50b23931122"){
          hideTipoNroPersonas = "Show";
          hideTipoMontoMinimo = 'hide';      
          montoMinimoComision = "0.00";
          nroPersonasReferenciadas = props.configCommissions.dataId.condition;
        }else{
          hideTipoNroPersonas = "hide";
          hideTipoMontoMinimo = 'show';      
          montoMinimoComision = number_format(props.configCommissions.dataId.condition, 2);
          nroPersonasReferenciadas = "0";
        }  

        this.setState({
          hideTipoNroPersonas: hideTipoNroPersonas,
          hideTipoMontoMinimo: hideTipoMontoMinimo,
          hidePersonalExterno: hidePersonalExterno,
          hideModoPago:hideModoPago,      
          hideEspecifique: hideEspecifique,
          hideMontoComision: hideMontoComision,
          hidePorcentajeComision: hidePorcentajeComision,
          arrayTipoPersonaSelect: props.configCommissions.dataId.type_staff,
          tiempoDias: props.configCommissions.dataId.time,
          arrayTipo: props.configCommissions.dataId.type,
          montoMinimoComision: montoMinimoComision,
          nroPersonasReferenciadas: nroPersonasReferenciadas,
          arrayPersonalExterno: arrayPersonalExterno,
          arrayModoPagoSelect: props.configCommissions.dataId.payment_type,
          montoComision: montoComision,
          porcentajeComision: porcentajeComision,
          especifique: especifique,          
          loading:'hide'
        });
        this.props.actionProps();
      }
    }
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

  handlekeyTiempo= event =>{
    this.setState({
        divTiempo: "",
        divTiempoError: "",         
    })
  }

  handlekeyAplicarPorcentajeTodos= event =>{
    this.setState({
        divAplicarPorcentajeTodos: "",
        divAplicarPorcentajeTodosError: "",         
    })
  }

  handlekeyNroPersonasReferenciadas= event =>{
    this.setState({
        divNroPersonasReferenciadas: "",
        divNroPersonasReferenciadasError: "",         
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

  handleChangeInputTable = e => {    
    const { name, value } = e.target;    
    this.setState({
      [name]: value
    });    
    this.props.setPorcentajeAllTable(value);
    this.setState({
      divSeleccioneServiciosPayment: '',
    });
  };

  eventoBlurAplicarTodos = (e) => {
        if(this.state.aplicarPorcentajeTodos === '' || this.state.aplicarPorcentajeTodos === '0'){
            this.setState({
                aplicarPorcentajeTodos: '0'                      
            }); 
        }        
    }

  eventoFocusAplicarTodos = (e) => {        
      if(this.state.aplicarPorcentajeTodos === '0'){
          this.setState({
              aplicarPorcentajeTodos: ''                      
          }); 
      }        
  }  

  seteardivSeleccioneServiciosComision = () => {
    if(this.state.activeTab === '1'){
      this.setState({
        divSeleccioneServiciosComision: '',        
      });
    }else{
      this.setState({
        divSeleccioneServiciosPayment: '',
      });
    }
    
  }

  typeIdentityOnchange = event =>{    
    this.setState({
        arrayTipo:event.target.value,            
    })
  } 

  optionsPatientsStaffAll = options => {
    if (!options) {
      return [];
    }
    const data = [];
    options.map(option => {
      data.push({
        label: `${option.type_identity}-${option.dni}  ${option.names}`
      });
    });
    return data;
  }; 

  getOptions = value => {
    const staff = this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936711" ? 0 : 1;
    this.props.getOptionsPersonal(staff, value);
  };

  getOneOptionsStaff = value => {
    const staff = this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936711" ? 0 : 1;
    this.props.getOneReference(staff, value);
  };

  orderOptions = value => {
    if (!value) {
      return;
    }
    const array = [];
    value.map(val => {
      array.push({
        label: `${val.names} ${val.surnames}  ${val.type_identity}-${val.dni} `,
        value: val._id
      });
    });

    return array;
  };

  orderExternalOptions = value => {
    if (!value) {
      return;
    }
    const array = [];
    value.map(val => {
      array.push({
        label: val.branchoffices_name,
        value: val._id
      });
    });

    return array;
  }; 

  render() {         
    const optionsPatientsStaffAll = this.optionsPatientsStaffAll(this.props.dataPatientsAll);       
    let optionsReferences = [];
    if(this.state.arrayTipoPersonaSelect){
      if(this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936711"){
        optionsReferences = this.orderOptions(this.props.optionsInternal) 
      }else{
        optionsReferences =this.orderExternalOptions(this.props.optionsExternal);
      }
    }
    
    
    console.log("this.props.configCommissions ", this.props.configCommissions);
    console.log("optionsPatientsStaffAll ", optionsPatientsStaffAll);
    console.log("optionsReferences ", optionsReferences);
    
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
                  <div>
                    <Nav tabs>
                      <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                              Reglas
                          </NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                              Formas de Pago
                          </NavLink>
                      </NavItem>                        
                    </Nav>    
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <div className="row">
                          <FormGroup className="top form-group col-sm-6">
                            <Label for="tipoPersona">Tipo de regla para comision</Label>
                            <div className={this.state.divTipoReglaComision}>
                              <Select                            
                                isSearchable={true}                                
                                isDisabled={this.props.disabled}
                                name="tipoReglaComision"
                                value={this.state.arrayTipoReglaComision}
                                onChange={this.handleChangeTipoReglaComision}
                                options={this.props.commission_type}                      
                              />
                            </div>
                            <div className="errorSelect">
                              {this.state.divTipoReglaComisionError}
                            </div>
                          </FormGroup>
                          <FormGroup className="top form-group col-sm-6">
                            <Label for="tiempoDias">Tiempo (dias)</Label>
                            <div className={this.state.divTiempo}>
                              <Input 
                                disabled={this.props.disabled} 
                                name="tiempoDias" 
                                id="tiempoDias" 
                                onKeyUp={this.handlekeyTiempo} 
                                onChange={this.handleChange} 
                                value={this.state.tiempoDias} 
                                type="number" 
                                placeholder="Tiempo (dias)" 
                              />
                            </div>
                            <div className="errorSelect">
                              {this.state.divTiempoError}
                            </div>
                          </FormGroup>
                          <FormGroup className="top form-group col-sm-6">
                            <Label for="tipo">Tipo</Label>
                            <div className={this.state.divTipo}>
                              {
                                (this.state.arrayTipoReglaComision && 
                                this.state.arrayTipoReglaComision.value === "5d1776e3b0d4a50b23931100") &&
                                <Select
                                  isSearchable="true"
                                  isDisabled={this.props.disabled}
                                  name="tipo"
                                  value={this.state.arrayTipo}
                                  onChange={this.handleChangeTipo}
                                  options={this.props.commission_rule.filter(
                                    option => option.value !== "5d1776e3b0d4a50b23931133"
                                  )}                                
                                />                              
                              }
                              {
                                (this.state.arrayTipoReglaComision === null || 
                                this.state.arrayTipoReglaComision.value === "5d1776e3b0d4a50b23931199") &&
                                <Select
                                  isSearchable="true"
                                  isDisabled={this.props.disabled}
                                  name="tipo"
                                  value={this.state.arrayTipo}
                                  onChange={this.handleChangeTipo}
                                  options={this.props.commission_rule}                                
                                />                              
                              }
                            </div>
                            <div className="errorSelect">
                              {this.state.divTipoError}
                            </div>
                          </FormGroup>  
                          <FormGroup className={`top form-group col-sm-6 ${this.state.hideTipoMontoMinimo}`}>                                                             
                              <Label for="montoMinimoComision">Monto Minimo para Comision:</Label> 
                              <div className={this.state.divMontoMinimoComision}>                               
                                  <Input 
                                    disabled={this.props.disabled} 
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
                          <FormGroup className={`top form-group col-sm-6 ${this.state.hideTipoNroPersonas}`}>
                            <Label for="nroPersonasReferenciadas">Cantidad de Personas referenciadas</Label>
                            <div className={this.state.divNroPersonasReferenciadas}>
                              <Input 
                                disabled={this.props.disabled} 
                                name="nroPersonasReferenciadas" 
                                id="nroPersonasReferenciadas" 
                                onKeyUp={this.handlekeyNroPersonasReferenciadas} 
                                onChange={this.handleChange} 
                                value={this.state.nroPersonasReferenciadas} 
                                type="number" 
                                placeholder="Cantidad de Personas Referenciadas" 
                              />
                            </div>
                            <div className="errorSelect">
                              {this.state.divNroPersonasReferenciadasError}
                            </div>
                          </FormGroup> 
                          <FormGroup className="top form-group col-sm-6">
                            <Label for="tipoPersona">Tipo de Persona</Label>
                            <div className={this.state.divTipoPersona}>
                              {
                                (this.state.arrayTipoReglaComision && 
                                this.state.arrayTipoReglaComision.value === "5d1776e3b0d4a50b23931100") &&
                                  <Select
                                    isSearchable={true}                                
                                    isDisabled={this.props.disabled}
                                    name="tipoPersona"
                                    id="tipoPersona"
                                    value={this.state.arrayTipoPersonaSelect}
                                    onChange={this.handleChangeTipoPersona}
                                    options={this.props.type_staff.filter(
                                      option => option.value === "5d1776e3b0d4a50b23936711"
                                    )}
                                  />
                              }
                              {
                                (this.state.arrayTipoReglaComision === null || 
                                this.state.arrayTipoReglaComision.value === "5d1776e3b0d4a50b23931199") &&
                                  <Select
                                    isSearchable={true}                                
                                    isDisabled={this.props.disabled}
                                    name="tipoPersona"
                                    name="tipoPersona"
                                    value={this.state.arrayTipoPersonaSelect}
                                    onChange={this.handleChangeTipoPersona}
                                    options={this.props.type_staff}
                                  />
                              }
                            </div>
                            <div className="errorSelect">
                              {this.state.divTipoPersonaError}
                            </div>
                          </FormGroup>      
                          <FormGroup className={`top form-group col-sm-6 ${this.state.hideOpciones}`}>
                            <Label for="tipo">Opciones</Label>
                            <div className={this.state.divOpciones}>
                              {
                                ((this.state.arrayTipoPersonaSelect) &&
                                (this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936712" ||
                                this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936710")) &&
                                <Select
                                  isSearchable="true"
                                  isDisabled={this.props.disabled}
                                  name="arrayOpciones"
                                  id="arrayOpciones"
                                  value={this.state.arrayOpciones}
                                  onChange={this.handleChangeOpciones}
                                  options={this.props.commission_select_staff}
                                  options={this.props.commission_select_staff.filter(
                                    option => option.value !== "5d1776e3b0d4a50b23440033"
                                  )}
                                />                                                                
                              }
                              {
                                this.state.arrayTipoPersonaSelect &&
                                this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936711"  &&
                                <Select
                                  isSearchable="true"
                                  isDisabled={this.props.disabled}
                                  name="arrayOpciones"
                                  id="arrayOpciones"
                                  value={this.state.arrayOpciones}
                                  onChange={this.handleChangeOpciones}
                                  options={this.props.commission_select_staff}                                  
                                />                                                                
                              }
                              
                            </div>
                            <div className="errorSelect">
                              {this.state.divOpcionesError}
                            </div>
                          </FormGroup>      
                          <FormGroup className={`top form-group col-sm-6 ${this.state.hideCargos}`}>
                            <Label for="tipo">Cargo</Label>
                            <div className={this.state.divCargos}>
                              <Select
                                isMulti={true} 
                                isSearchable={true}
                                isClearable={true}
                                isDisabled={this.props.disabled}
                                name="arrayCargos"
                                id="arrayCargos"
                                value={this.state.arrayCargos}
                                onChange={this.handleChangeCargos}
                                options={this.props.configCommissions.cargos}
                              />
                            </div>
                            <div className="errorSelect">
                              {this.state.divCargosError}
                            </div>
                          </FormGroup>                              
                          <FormGroup className={`top form-group col-sm-6 ${this.state.hideBuscador}`}>
                            <div 
                              style={{
                                width: "100%", 
                                margin: "10px 0px 1rem",
                                height: "10rem",
                                alignItems: "start"
                              }}>
                                {
                                  this.state.arrayTipoPersonaSelect &&
                                  this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936712" &&
                                  <Search 
                                    pressKey={true}
                                    placeholder={`Buscar ${this.state.labelsBuscador}...`}
                                    getOptions={this.props.searchPatientStaffAll}
                                    options={optionsPatientsStaffAll}
                                    searchAction={this.props.searchOnePatientStaff}
                                  />    
                                }
                                {
                                  this.state.arrayTipoPersonaSelect &&
                                  this.state.arrayTipoPersonaSelect.value !== "5d1776e3b0d4a50b23936712" &&
                                  <Search 
                                    pressKey={true}
                                    placeholder={`Buscar ${this.state.labelsBuscador}...`}
                                    getOptions={this.getOptions}
                                    options={optionsReferences}
                                    searchAction={this.getOneOptionsStaff}
                                  />    
                                }
                                
                            </div>
                          </FormGroup>                             
                          
                          {/* <FormGroup className={`top form-group col-sm-6 ${this.state.hidePersonalExterno}`}>
                            <Label for="tipo">Personal Externo</Label>
                            <div className={this.state.divPersonalExterno}>
                              <Select
                                isSearchable="true"
                                isDisabled={this.props.disabled}
                                name="tipo"
                                value={this.state.arrayPersonalExterno}
                                onChange={this.handleChangePersonalExterno}
                                options={this.props.configCommissions.externalStaff}
                              />
                            </div>
                            <div className="errorSelect">
                              {this.state.divPersonalExternoError}
                            </div>
                          </FormGroup>                    */}
                        </div>       
                        {
                          (this.state.arrayTipo &&
                          this.state.arrayTipo.value !== "" &&
                          this.state.arrayTipoPersonaSelect &&
                          this.state.arrayTipoPersonaSelect.value !== "5d1776e3b0d4a50b23936710") &&
                          <ListServices
                            data = {this.props.configCommissions.servicesCommission}
                            option = {this.props.option}
                            typePersonal = {this.state.arrayTipoPersonaSelect.value}
                            setPorcentajeTable = {this.props.setPorcentajeTable}
                            setSwitchTableComisiones = {this.props.setSwitchTableComisiones}
                            setSwitchAllTableComisiones = {this.props.setSwitchAllTableComisiones}
                            divSeleccioneServiciosComision = {this.state.divSeleccioneServiciosComision}                            
                            disabled = {this.props.disabled}
                            tab = {this.state.activeTab}
                            seteardivSeleccioneServiciosComision = {this.seteardivSeleccioneServiciosComision}
                          />                          
                        }
                      </TabPane>
                      <TabPane tabId="2">
                        <div className="row">
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
                                  disabled={this.props.disabled} 
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
                                  disabled={this.props.disabled} 
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
                          <FormGroup className={`top form-group col-sm-6 ${this.state.hideAplicarPorcentajeTodos}`}>                                                                 
                            <Label for="aplicarPorcentajeTodos">Aplicar Porcentaje para Todos:</Label> 
                            <div className={this.state.divAplicarPorcentajeTodos}>                               
                                <Input 
                                  disabled={this.props.disabled} 
                                  name="aplicarPorcentajeTodos" 
                                  id="aplicarPorcentajeTodos" 
                                  onKeyUp={this.handlekeyAplicarPorcentajeTodos} 
                                  onChange={this.handleChangeInputTable}
                                  value={this.state.aplicarPorcentajeTodos} 
                                  type="number" 
                                  placeholder="Aplicar Porcentaje para Todos"   
                                  onBlur ={this.eventoBlurAplicarTodos} 
                                  onFocus = {this.eventoFocusAplicarTodos}                             
                                />                                    
                            </div>
                            <div className="errorSelect">{this.state.divAplicarPorcentajeTodosError}</div>                                                                                                                                                                                         
                          </FormGroup>
                        </div>
                        {
                           ((this.state.arrayModoPagoSelect &&
                            this.state.arrayModoPagoSelect.value === "5d1776e3b0d4a50b23930033") ||
                           (this.state.arrayTipoPersonaSelect &&
                            this.state.arrayTipoPersonaSelect.value === "5d1776e3b0d4a50b23936710")) &&
                            <ListServices
                              data = {this.props.configCommissions.servicesPayment}
                              option = {this.props.option}
                              typePersonal = {this.state.arrayTipoPersonaSelect.value}
                              setPorcentajeTable = {this.props.setPorcentajeTable}
                              setSwitchTableComisiones = {this.props.setSwitchTableComisiones}
                              setSwitchAllTableComisiones = {this.props.setSwitchAllTableComisiones}
                              disabled = {this.props.disabled}
                              tab = {this.state.activeTab}                              
                              divSeleccioneServiciosPayment = {this.state.divSeleccioneServiciosPayment}
                              seteardivSeleccioneServiciosComision = {this.seteardivSeleccioneServiciosComision}
                            />
                        }
                      </TabPane>                          
                    </TabContent>
                  </div>                    
                </form>
              </ModalBody>
              {
                this.state.activeTab === "1" ?
                  <ModalFooter>
                    <Button className="" color="danger" onClick={this.closeModal}>
                      Cancelar
                    </Button>                
                    <Button
                      className={this.props.showHide}
                      color="primary"
                      onClick={() => { this.toggleTab('2'); }}
                    >
                      Siguiente
                    </Button>
                  </ModalFooter>
                :
                  <ModalFooter>
                    <Button className="" color="danger" onClick={() => { this.toggleTab('1'); }}>
                      Volver
                    </Button>                
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
              }
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
  commission_type: state.global.dataGeneral.dataGeneral.commission_type,
  payment_mode_commission: state.global.dataGeneral.dataGeneral.payment_mode_commission,
  commission_rule: state.global.dataGeneral.dataGeneral.commission_rule,
  commission_select_staff: state.global.dataGeneral.dataGeneral.commission_select_staff,
  authData: state.auth,
  aplication: state.global,
  dataPatientsAll: state.configCommissions.get('dataStaffPatientAll'),  
  optionsInternal: state.configCommissions.get("dataInternalStaffAll"),
  optionsExternal: state.configCommissions.get("dataExternalStaffAll")
  
});

const mapDispatchToProps = dispatch => ({
  alert: (type, message) => dispatch(openSnackbars(type, message)),     
  actionProps: () => dispatch(actionProps()),
  cleanListServices: () => dispatch(cleanListServices()),
  cleanListServicesTab: (tab) => dispatch(cleanListServicesTab(tab)),
  setPorcentajeTable: (pos, value) =>dispatch(setPorcentajeTable(pos, value)),
  setPorcentajeAllTable: (value) =>dispatch(setPorcentajeAllTable(value)),  
  setSwitchTableComisiones: (pos, value, tab, typePersonal) =>dispatch(setSwitchTableComisiones(pos, value, tab, typePersonal)),
  setSwitchAllTableComisiones: (value, tab, typePersonal) =>dispatch(setSwitchAllTableComisiones(value, tab, typePersonal)),
  saveConfigCommissionsAction: (data, callback) =>dispatch(saveConfigCommissionsAction(data, callback)),
  editConfigCommissionsAction: (data, callback) =>dispatch(editConfigCommissionsAction(data, callback)),
  searchPatientStaffAll: (data) =>dispatch(searchPatientStaffAll(data)),
  searchOnePatientStaff: (data) =>dispatch(searchOnePatientStaff(data)),
  getOptionsPersonal: (staff, data) =>dispatch(getOptionsPersonal(staff, data)),
  getOneReference: (staff, data) =>dispatch(getOneReference(staff, data)),
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps  
)(ModalConfigCommissions);
