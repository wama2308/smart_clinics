import React from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, FormFeedback } from 'reactstrap';
import '../../components/style.css';
import './Personal.css';
import { InitalState } from './InitialStatePersonal.js';
import jstz from 'jstz';
import { connect } from "react-redux";
import { saveCargoAction, editCargoAction } from "../../actions/PersonalInternoActions";
import CircularProgress from "@material-ui/core/CircularProgress";

class ModalCargos extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
			...InitalState                              
		};
	}

	componentDidMount(){
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    }

    closeModal = () => {
        this.setState({
            ...InitalState                
        })        
    	this.props.valorCloseModal(false); 
    }   

    validate = () => {
        let cargoInvalid = false;
        let cargoError = "";                

        if (this.state.cargo === "") {
            cargoError = "¡Ingrese el cargo!";
            cargoInvalid = true;
        }        
        if (cargoError) {            
            this.setState({ 
                cargoError,
                cargoInvalid
            });                           
            return false;
        }        
        return true;
    } 

    handleSaveCargos = event => {
        event.preventDefault();
        const isValid = this.validate();        
        if (isValid) { 
            if(this.props.option === 1)
            {
                this.setState({loading:'show'})    
                this.props.saveCargoAction(
                  {
                    name:this.state.cargo,
                    description: this.state.descripcion,   
                    timeZ: jstz.determine().name()
                  },
                  () => {
                    this.closeModal();                    
                  }
                )
            } 
            else if(this.props.option === 3){
                this.setState({loading:'show'})    
                this.props.editCargoAction(
                  {
                    _id:this.props.cargoId,
                    name:this.state.cargo,
                    description: this.state.descripcion,   
                    timeZ: jstz.determine().name()
                  },
                  () => {
                    this.closeModal();                    
                  }
                )
            }           
        }
    }

    handlekeyCargo = event =>{
        this.setState({
            cargoError: "",
            cargoInvalid: false,            
        })
    }

    handlekeyDescripcion = event =>{
        this.setState({
            descripcionError: "",
            descripcionInvalid: false,            
        })
    }

    componentWillReceiveProps=(props)=>{        
        this.setState({
            modal: props.modal,                   
            loading:'hide',
        });
        if(props.cargo){
            this.setState({
                cargo: props.cargo,
                descripcion: props.descripcion,             
                loading:'hide',
            })
        }                         
    }

	render() {   
        return (
            <span>                            
        		<Modal isOpen={this.props.modal} toggle={this.closeModal} className="ModalUsersRoles">
                    {
                        this.state.loading === "hide" ?
                            <div className={this.state.divContainer}>
                            <ModalHeader toggle={this.closeModal}>{this.props.modalHeader}</ModalHeader>
                            <ModalBody className="Scroll">    
                            <form className="formCodeConfirm" onSubmit={this.handleSaveCargos.bind(this)}> 
                                <FormGroup className="top form-group col-sm-12">                                                                 
                                    <Label for="plantilla">Cargo</Label>
                                    <Input disabled={this.props.disabled} invalid={this.state.cargoInvalid} name="cargo" id="cargo" onKeyUp={this.handlekeyCargo} onChange={this.handleChange} value={this.state.cargo} type="text" placeholder="Cargo" />
                                    <FormFeedback tooltip>{this.state.cargoError}</FormFeedback>                                                            
                                </FormGroup>    
                                <FormGroup className="top form-group col-sm-12">                                                                 
                                    <Label for="direccion">Descripcion:</Label>
                                    <Input disabled={this.props.disabled} invalid={this.state.descripcionInvalid} name="descripcion" id="descripcion" onKeyUp={this.handlekeyDescripcion} onChange={this.handleChange} value={this.state.descripcion} type="textarea" placeholder="Descripcion" />
                                    <FormFeedback tooltip>{this.state.descripcionError}</FormFeedback>                                                                                                                                                            
                                </FormGroup>     
                            </form>                                                                    
                            </ModalBody>
                            <ModalFooter>
                                <Button className="" color="danger" onClick={this.closeModal}>Cancelar</Button>
                                <Button className={this.props.showHide} color="primary" onClick={this.handleSaveCargos}>{this.props.modalFooter}</Button>                                
                            </ModalFooter>
                            </div>
                        :
                        <div style={{height: "55vh"}}>
                            <CircularProgress style={{position: " absolute", height: 40, top: "45%", right: "50%",zIndex: 2}}          />
                        </div>
                    }
                </Modal>                
            </span> 
		);
	}
  }
const mapStateToProps = state => ({
  personaInterno: state.personaInterno.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({  
    saveCargoAction: (data, callback) => dispatch(saveCargoAction(data, callback)),  
    editCargoAction: (data, callback) => dispatch(editCargoAction(data, callback)),  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCargos);