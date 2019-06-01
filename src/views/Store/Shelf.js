import React from 'react';
import { Collapse, Button, CardBody, Card, FormGroup, Label, Input, FormFeedback, Table} from 'reactstrap';
import '../../components/style.css';
import './Store.css';
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import { addShelfsFunction, deleteShelfsFunction } from "../../actions/StoreActions";
import { openConfirmDialog } from "../../actions/aplicantionActions";
import { InitalState } from './InitialState.js';

class Shelf extends React.Component {
	constructor(props) {
		super(props);		
		this.state = {
            ...InitalState
		};
	}

	componentDidMount(){}

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });                
    } 

    cleanState = () => {
        this.setState({ 
            ...InitalState
        })
    }

    toggleNuevoRol = () => {
        this.setState({ 
            collapseNuevoRol: !this.state.collapseNuevoRol 
        });        
    }

    toggleTab(tab){
        this.props.valorTab(tab);     
    }   

    handlekeyEstante = event =>{
        this.setState({
            estanteError: "",
            estanteInvalid: false,         
        })
    }    

    handlekeyEstanteDescripcion = event =>{
        this.setState({
            estanteDescripcionError: "",
            estanteDescripcionInvalid: false,         
        })
    }        

    componentWillReceiveProps=(props)=>{}    

    validate = () => {
        let estanteInvalid = false;
        let estanteError = "";
        let estanteDescripcionInvalid = false;
        let estanteDescripcionError = "";        

        if (this.state.estante === "") {            
            estanteError = "¡Ingrese el estante!";
            estanteInvalid = "borderColor";
        }     
        if (this.state.estanteDescripcion === "") {                    
            estanteDescripcionError = "¡Ingrese la descripcion del estante!";
            estanteDescripcionInvalid =true;
        }             
        if(this.props.store.length > 0){
            const resultado = this.props.shelfs.find(shelfs => shelfs.estante === this.state.estante);
            if(resultado){
                estanteError = "¡Este estante ya se encuentgra agregado!";
                estanteInvalid = true;   
            }
        }
        if (estanteError || estanteDescripcionError) {            
            this.setState({ 
                estanteError,                         
                estanteInvalid, 
                estanteDescripcionInvalid,   
                estanteDescripcionError              
            });                           
            return false;
        }        
        let shelfs = { name: this.state.estante, description: this.state.estanteDescripcion}                       
        this.props.addShelfsFunction(shelfs);        
        this.cleanState();                   
        return true; 
    }

    deleteShelfs = key => {
        const message = {
          title: "Eliminar registro",
          info: "¿Esta seguro que desea eliminar este registro?"
        };
        this.props.confirm(message, res => {
            if (res) {                
                this.props.deleteShelfsFunction(key);        
            }
        });        
    };

    handleSubmitShelfs = event => {        
        event.preventDefault();
        const isValid = this.validate();        
        if (isValid) {                  
            console.log("");                 
        }
    } 

	render() {           
        return (
            <div>  
                <Collapse isOpen={this.props.collapse}>
                  <Card>
                    <CardBody>                        
                        <div className="row">       
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="estante">Estante:</Label> 
                                <div className={this.state.estanteInvalid}>                               
                                    <Input disabled={this.props.disabled} name="estante" id="estante" onKeyUp={this.handlekeyEstante} onChange={this.handleChange} value={this.state.estante} type="text" placeholder="Estante" />
                                </div>
                                <div className="errorSelect">{this.state.estanteError}</div>                                                                                                                                                                                         
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-6">                                                                 
                                <Label for="estanteDescripcion">Descripcion:</Label>
                                <Input disabled={this.props.disabled} invalid={this.state.estanteDescripcionInvalid} name="estanteDescripcion" id="estanteDescripcion" onKeyUp={this.handlekeyEstanteDescripcion} onChange={this.handleChange} value={this.state.estanteDescripcion} type="textarea" placeholder="Descripcion Estante" />
                                <FormFeedback tooltip>{this.state.estanteDescripcionError}</FormFeedback>                                                                                                                                                            
                            </FormGroup> 
                            <FormGroup className="top form-group col-sm-12">      
                                <Button className={this.state.ocultarBotones} disabled={this.props.disabled} color="primary" onClick={this.handleSubmitShelfs}>Agregar</Button>
                                &nbsp; 
                                &nbsp;                                 
                                <Button className={this.state.ocultarBotones} disabled={this.props.disabled} color="danger" onClick={this.cleanState}>Limpiar</Button>
                                <br />
                                <br />
                                <div className="error">{this.props.errorListContacs}</div>
                                <Table hover responsive borderless>
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="text-left">Nro</th>
                                            <th className="text-left">Estante</th>                                                        
                                            <th className="text-left">Descripcion</th>                                                        
                                            <th className="text-left">Acciones</th>                                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.store.shelfs ? this.props.store.shelfs.map((list, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{list.name}</td>                                                                                                                                                    
                                                        <td>{list.description}</td>                                                                                                                                                                                                             
                                                        <td>
                                                            <div  className="float-left" >
                                                                <IconButton aria-label="Delete" disabled={this.props.option === 2 ? true : false} title="Ver Rol" className="iconButtons" onClick={() => { this.deleteShelfs(i); }}><Delete className="iconTable" /></IconButton>                                                    
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        :
                                          null
                                        }
                                    </tbody>
                                </Table>
                            </FormGroup>
                        </div>                        
                    </CardBody>
                  </Card>
                </Collapse>
            </div> 
		);
	}
  }
const mapStateToProps = state => ({
  store: state.store.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({  
    addShelfsFunction: (arrayShelfs) =>dispatch(addShelfsFunction(arrayShelfs)),
    deleteShelfsFunction: (key) =>dispatch(deleteShelfsFunction(key)),
    confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shelf);