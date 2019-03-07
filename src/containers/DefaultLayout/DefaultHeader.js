import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import logosc from '../../assets/img/brand/logosc.png'
import Untitled from '../../assets/img/brand/Untitled.png'
import HeaderLogo from '../../components/HeaderLogo';
import { HashRouter, Route, Switch, Link, withRoute } from 'react-router-dom';
import RegisterEmail from '../../views/Pages/RegisterEmail/RegisterEmail';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import axios from 'axios';

import AuthService from '../../components/AuthService';
import withAuth from '../../components/withAuth';
// var jwtDecode = require('jwt-decode');
const Out = new RegisterEmail();
const Auth = new AuthService();

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(){
    super();
    this.state = {
  Sucursal: '',
  valorProvince:'',
  MASTER:'',
    }
  }

  handleLougout(){
    Auth.logout();    
    this.props.history.replace('/Login');
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
componentDidMount(){
 const token = window.localStorage.getItem('id_token');
  
    var decoded = jwt_decode(token);
    // console.log(decoded.profile[0].medical_center);
    Object.keys(decoded.profile[0].medical_center).map((i)=>{
       if(decoded.profile[0].medical_center[i].is_default === 1){
          this.setState({
            MASTER:'MASTER',
            Sucursal: decoded.profile[0].medical_center[i].name
          })
       }
    })
}
  render() {

    // eslint-disable-next-line
    const { math, location, history, children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="lg" mobile />
        <AppNavbarBrand
          full={{ src: logosc, width:100, height: 30, alt: 'CoreUI Logo' }}
          minimized={{ src: Untitled, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />        
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
       
          <NavItem className="px-3">
            <NavLink href="#/users">{this.state.Sucursal} ({this.state.MASTER}) </NavLink>
          </NavItem>
      
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Configuracion</strong></DropdownItem>
              <DropdownItem><i className="fa fa-home"></i> Perfil CM</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Empleados</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Roles<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Estadisticas<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={this.handleLougout.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withRouter(DefaultHeader);
