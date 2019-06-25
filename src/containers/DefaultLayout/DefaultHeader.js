import React, { Component } from "react";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logosc from "../../assets/img/brand/logosc.png";
import Untitled from "../../assets/img/brand/Untitled.png";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router";
import { Button, Menu, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import AuthService from "../../core/auth/AuthService";
import { connect } from "react-redux";
import { logout, changeSucursal } from "../../actions/authActions";

const Auth = new AuthService();

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor() {
    super();
    this.state = {
      Sucursal: "",
      valorProvince: "",
      user: "",
      branch_offices: [],
      MenuOpen: false,
      anchorEl: null
    };
  }

  handleLougout() {
    this.props.loggout(() => {
      this.props.history.replace("/auth");
    });
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  getInitialBranchs = (decode, cb) => {
    const is_default = decode.other_profiles[0].branch_office.find(
      branch => branch.is_default === 1
    );

    const branchs = decode.other_profiles[0].branch_office.filter(
      branch => branch.is_default !== 1
    );

    cb({ selected: is_default, otherBranchs: branchs });
  };

  componentDidMount = () => {
    const token = window.localStorage.getItem("id_token");

    const decoded = jwt_decode(token);
    this.getInitialBranchs(decoded, res => {
      console.log(decoded.profile[0].medical_center[0]);
      this.setState({
        Sucursal: res.selected.name,
        user: this.props.permission[0].name,
        branch_offices: res.otherBranchs,
        idMedicalCenter: decoded.profile[0].medical_center[0]._id
      });
    });
  };

  handleOpen = event => {
    this.setState({
      anchorEl: event.currentTarget,
      MenuOpen: true
    });
  };

  handleChange = branchs => {
    const obj = {
      medical_center_id: this.state.idMedicalCenter,
      branchoffices_id: branchs._id
    };
    console.log("acaca", obj);
    this.props.changeSucursal(obj);
  };

  render() {
    const { math, location, history, children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="lg" mobile />
        <AppNavbarBrand
          full={{ src: logosc, width: 100, height: 30, alt: "CoreUI Logo" }}
          minimized={{
            src: Untitled,
            width: 30,
            height: 30,
            alt: "CoreUI Logo"
          }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <div>
          <Button onClick={this.handleOpen}>
            {this.state.Sucursal} ({this.state.user}){" "}
          </Button>
          <Menu
            open={Boolean(this.state.MenuOpen)}
            className="MenuStyle"
            variant={"selectedMenu"}
            anchorEl={this.state.anchorEl}
            keepMounted
            open={this.state.MenuOpen}
            onClose={() => this.setState({ MenuOpen: false })}
          >
            {this.state.branch_offices.map(branchs => {
              return (
                <MenuItem
                  variant="selectedMenu"
                  onClick={() => this.handleChange(branchs)}
                >
                  {branchs.name}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell" />
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-list" />
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-location-pin" />
            </NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                src={"assets/img/avatars/6.jpg"}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Configuracion</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-home" /> Perfil CM
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench" /> Empleados
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-usd" /> Roles
                <Badge color="secondary">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-file" /> Estadisticas
                <Badge color="primary">42</Badge>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="fa fa-shield" /> Lock Account
              </DropdownItem>
              <DropdownItem onClick={this.handleLougout.bind(this)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
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

const mapStateToProps = state => ({
  permission: state.global.dataGeneral.permission
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loggout: route => dispatch(logout(route)),
  changeSucursal: obj => dispatch(changeSucursal(obj))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DefaultHeader)
);
