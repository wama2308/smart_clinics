import React, { Component } from 'react';
import RegisterEmail from '../views/Pages/RegisterEmail/RegisterEmail';

class RegisterEmailToConfirm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
        }
    }

    render(){
        return this.state.email;
    }
}

export default RegisterEmailToConfirm;
