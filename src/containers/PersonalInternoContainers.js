import React, { Component } from "react";
import {Nav,NavItem,NavLink,Card,CardBody,CardHeader,Col,Row,TabContent,TabPane} from "reactstrap";
import "../views/Configurations/loading.css";
import classnames from "classnames";
import "../views/Configurations/modal.css";
import { connect } from "react-redux";
import {} from "../actions/PersonalInternoActions";
import UsersList from "../views/Usuarios/UsersList";
import RolesList from "../views/Usuarios/RolesList";
import { openSnackbars, openConfirmDialog } from "../actions/aplicantionActions";

class PersonalInterno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

}