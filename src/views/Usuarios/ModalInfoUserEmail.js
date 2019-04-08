import React from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { Button, Col, Row, Table, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText, FormFeedback, Tooltip, Card, CardBody, CardHeader, } from 'reactstrap';
import classnames from 'classnames';
import '../../components/style.css';
import './Users.css';
import axios from 'axios';
import {FaTwitter, FaInstagram, FaFacebook, FaExternalLinkAlt, FaSearch, FaUserEdit, FaExclamationCircle,FaMinusCircle, FaCheck, FaCheckCircle, FaPlusCircle, FaSearchPlus, FaSearchMinus, FaSearchDollar} from 'react-icons/fa';
import jstz from 'jstz';
import { connect } from "react-redux";
import { testFunction } from "../../actions/UserAction";
import PopoverItem from '../../components/PopoverItem.js';


class ModalInfoUserEmail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalInfoUserEmail: false,
            headerModalEmailInfo: '',
            colorSpan: 'colorSpan',
            openModalAlert: false,
            loading:'hide',
            exist:0
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

	openModalInfoEmailUser = (valor) => {
        this.setState({
            modalInfoUserEmail: valor,
        });

    }

    closeModalInfoUserEmail = (opcion, exist) => {
        this.props.deleteInfoUser(opcion, exist);
    	this.setState({
            modalInfoUserEmail: false,
        });
        this.props.valorCloseModalInfoUser(opcion);
    }

    componentWillReceiveProps=(props)=>{
        if(props.estadoUser === 1){
            this.setState({
                infoEmail: props.infoEmail
            })
            if(props.emailExist === 1){
                this.setState({
                    headerModalEmailInfo: '¡Este email ya esta registrado en este centro medico!',
                    exist: 1
                });
            }
            else{
                this.setState({
                    headerModalEmailInfo: '¡Este email esta siendo utilizado de la siguiente manera!',
                    exist: 0
                });
            }
            this.openModalInfoEmailUser(props.open);
        }
    }

    render() {
        return (
            <span>
        		<Modal isOpen={this.state.modalInfoUserEmail} toggle={this.openModalInfoEmailUser} className="ModalInfoEmail">
                    {
                        this.state.loading === "hide" ?
                            <div className={this.state.divContainer}>
                                <ModalHeader></ModalHeader>
                                <ModalBody className="Scroll">
                                    <div className="">
                                        <Card>
                                        <CardHeader>
                                            <i className="warning_"><FaExclamationCircle size="1.5em"/></i><span className={this.state.colorSpan}>{this.state.headerModalEmailInfo}</span>
                                        </CardHeader>
                                        <CardBody>

                                             <Table hover responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Centro Medico</th>
                                                        <th>Sucursal</th>
                                                        <th>Rol-Permisos</th>
                                                    </tr>
                                                </thead>
                                                {
                                                    this.state.infoEmail != null &&
                                                    this.state.infoEmail.map((info, i) => {
                                                        return (
                                                            <tbody>
                                                                {info.branchOffice.map((branchOffice, j) =>

                                                                    <tr>
                                                                        <td>{info.name}</td>
                                                                        <td>{branchOffice.name}</td>
                                                                        <td>
                                                                            &nbsp;&nbsp;&nbsp;<PopoverItem key={j} branchOfficeId={branchOffice.branchOfficeId} id={i} medicalCenterId={info.medicalCenterId} email={this.props.emailConsulta}/>
                                                                        </td>
                                                                    </tr>

                                                                )}
                                                            </tbody>
                                                        )
                                                    })
                                                }
                                            </Table>
                                            </CardBody>
                                        </Card>

                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => { this.closeModalInfoUserEmail(1, this.state.exist) }}>Aceptar</Button>
                                    <Button color="danger" onClick={() => { this.closeModalInfoUserEmail(0, this.state.exist) }}>Cancelar</Button>
                                </ModalFooter>
                            </div>
                        :
                            <div align="center" className={this.state.divLoading} style={{padding:"1%"}}><img src="assets/loader.gif" width="30%" /></div>
                    }
                </Modal>
            </span>
		);
	}
  }

export default ModalInfoUserEmail;

