import React, { Component } from 'react';
import AuthService from '../core/auth/AuthService';
import { datosConexion } from './Conexion.js'

export default function withAuth(AuthComponent) {

	let valueConexion = "";
    let arrayConexion = Object.values(datosConexion);
    arrayConexion.forEach(function (elemento, indice, array) {
        if(indice === 1){
            valueConexion = elemento;
        }            
    });   

	const Auth = new AuthService(valueConexion);
	//const Auth = new AuthService("http://smartclinics.online/sc-admin/web/app.php/");
 	//const Auth = new AuthService('http://localhost:8000/');
	return class AuthWrapped extends Component {


		constructor() {
			super();
			this.state = {
				user:null
			}
		}

		componentWillMount(){
			if (!Auth.loggedIn()) {
				this.props.history.replace('/login')
			} else {
				try {
					const profile = Auth.getProfile()
					this.setState({
						user:profile
					})
				}
				catch(err){
					Auth.logout()
					this.props.history.replace('/login')
				}
			}
		}


		render() {
			if (this.state.user) {
				return (
						<AuthComponent history={this.props.history} user={this.props.user} />
					)
			} else {
				return null
			}
		}
	}
}
