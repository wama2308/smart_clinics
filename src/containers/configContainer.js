import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import "../views/Configurations/loading.css";
import classnames from "classnames";
import "../views/Configurations/modal.css";
import axios from "axios";
import { datosConexion } from "../components/Conexion.js";
import MedicalCenter from "../views/Configurations/MedicalCenter";
import { connect } from "react-redux";
import {
  loadMedicalcenterAction,
  editMedicalCenter
} from "../actions/configAction";
import jstz from "jstz";

class configContainer extends Component {
  constructor(props) {
    super(props);

    let valueConexion = "";
    let arrayConexion = Object.values(datosConexion);
    arrayConexion.forEach(function(elemento, indice, array) {
      if (indice === 0) {
        valueConexion = elemento;
      }
    });

    const timezone = jstz.determine();

    this.state = {
      activeTab: 1
    };
  }

  handlekey = event => {
    this.setState({
      SucursalInValid: false
    });
  };

  refresh = event => {
    const apiBaseMedical = this.state.conexion + "LoadMedicalCenter";
    //const apiBaseMedical= "http://192.168.0.112:8000/api/LoadMedicalCenter";
    const token = window.localStorage.getItem("id_token");
    const datos = {
      headers: { "access-token": token }
    };

    axios
      .get(apiBaseMedical, datos)
      .then(res => {
        console.log(this.state.success);
        this.setState({
          success: true,
          editbranchoffices: [],
          contacto: [],
          branchoffices: res.data.branchoffices
        });

        this.ModalContainer.cerrarmodal(this.state.success);
        this.ModalContainer.getGeoLocation();
      })

      .catch(error => {
        console.log("Error consultando la api medical center");
      });
  };

  handleChange_ = event => {
    this.setState({
      provinceInvalid: false
    });

    const isCheckbox = event.target.type === "checkbox";

    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  validate = () => {
    let SucursalError = "";
    let paisError = "";
    let provinciaError = "";
    let SucursalInValid = false;
    let paisInvalid = false;
    let provinceInvalid = false;
    if (this.state.Sucursal.length === 0) {
      SucursalError = "¡Ingrese el nombre!";
      SucursalInValid = true;
    }
    if (this.state.Sucursal.length < 2) {
      SucursalError = "¡Escriba el nombre completo de su centro medico !";
      SucursalInValid = true;
    }
    if (!this.state.pais) {
      paisError = "¡Seleccione el pais!";
      paisInvalid = true;
    }
    if (this.state.valorProvince === null) {
      provinciaError = "¡Seleccione la provincia!";
      provinceInvalid = true;
    }
    if (SucursalError || paisError || provinciaError) {
      this.setState({
        SucursalError,
        paisError,
        provinciaError,
        SucursalInValid,
        paisInvalid,
        provinceInvalid
      });
      return false;
    }

    this.setState({
      SucursalError: "",
      paisError: "",
      provinciaError: "",
      SucursalValid: false,
      paisInvalid: false,
      provinceInvalid: false
    });

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        modalAlert: true,
        divLoading2: "show"
      });
      this.handleValidSubmit();
    }
  };

  handleChange(e) {
    this.setState({
      paisInvalid: false
    });

    this.statusinicio();
    const countryIdSelect = e.target.value;
    const pais = e.target.value;
    this.setState({ pais }); //do the setState here
    this.setState({ countryIdSelect }); //do the setState here
    if (countryIdSelect != "") {
      this.loadProvinces(countryIdSelect);
    } else {
      this.setState({
        provinces: "",
        provincia: ""
      });
    }
  }

  statusinicio() {
    this.setState({
      inicio: "2"
    });
  }

  handleValidSubmit() {
    //console.log(this.state.timeZ);
    const apiBaseUrl = this.state.conexion + "editPerfilMedicalCenter";
    //const apiBaseUrl = ("http://192.168.0.117:8000/api/editPerfilMedicalCenter");
    const token = window.localStorage.getItem("id_token");

    axios({
      method: "post",
      url: apiBaseUrl,
      data: {
        name: this.state.Sucursal,
        idCountry: this.state.pais,
        provinceid: this.state.valorProvince,
        timeZ: this.state.timeZ
      },
      headers: { "access-token": token }
    })
      .then(res => {
        this.setState({
          divLoading2: "hide",
          modalAlert: true,
          deletediv: "show",
          check: "show check",
          delete: "Operacion exitosa!",
          aceptar: "hide",
          cancelar: "hide"
        });
        setTimeout(() => {
          this.setState({
            check: "hide check",
            modalAlert: false,
            delete: "",
            deletediv: "hide"
          });
        }, 1000);
      })
      .catch(res => {
        //console.log(res, this.state.valorProvince)
        console.log("Error modificando el medical center");
      });
  }

  submitContact(name) {
    let contactsu = this.state.contacto;
    contactsu = [...name];
    // this.setState({contactoName: name, contactoPhone: phone, contactoEmail: email});
    // console.log(todos,this.state.contactoName,this.state.contactoPhone,this.state.contactoEmail)
    // todos.push({name:this.state.contactoName, phone: this.state.contactoPhone, email: this.state.contactoEmail})
    this.setState({ contacto: contactsu });
  }

  deleteContact(e) {
    var contacts = [...this.state.contacto];
    console.log(contacts);
    contacts.splice(e, 1);
    this.setState({ contacto: contacts }, function() {
      console.log(this.state.contacto);
    });
  }

  modalDelete(item) {
    //item.isDefaultPrevented()
    this.setState({
      warning: "hide warning",
      divLoading2: "show",
      delete: "",
      aceptar: "hide",
      cancelar: "hide"
    });

    const apiBaseDelete = this.state.conexion + "deleteBranchOffices";
    //const apiBaseDelete=("http://192.168.0.117:8000/api/deleteBranchOffices")
    const token = window.localStorage.getItem("id_token");
    axios({
      method: "post",
      url: apiBaseDelete,
      data: {
        posicion: item,
        timeZ: this.state.timeZ
      },
      headers: { "access-token": token }
    })
      .then(res => {
        console.log("Eliminacion exitosa");
        this.setState({
          divLoading2: "hide",
          check: "show check",
          delete: "Sucursal eliminada con exito!"
        });
        setTimeout(() => {
          this.setState({
            check: "hide check",
            modalAlert: false,
            itemPos: "",
            delete: "",
            deletediv: "hide"
          });
        }, 1000);

        this.refresh();
      })
      .catch(res => {
        console.log("Problemas al eliminar la sucursal", res);
      });
  }

  loadBranchOffices() {
    const apiMedical = this.state.conexion + "apiLoadMedicalCenter";
    //const apiMedical= "http://192.168.0.117:8000/api/LoadMedicalCenter";
    const token = window.localStorage.getItem("id_token");
    const datos = {
      headers: { "access-token": token }
    };
    axios
      .get(apiMedical, datos)
      .then(res => {
        //console.log(res)
        this.setState({
          branchoffices: res.data.branchoffices
        });
      })
      .catch(error => {
        console.log("Problemas al consultar la api de centro medicos", error);
      });
  }

  modalConfirm(item) {
    this.setState({
      modalAlert: !this.state.modalAlert,
      itemPos: item,
      warning: "show warning",
      delete: "¿Desea eliminar el registro?",
      aceptar: "show",
      cancelar: "show",
      deletediv: "show"
    });
  }

  modalCancel() {
    this.setState({
      modalAlert: false,
      itemPos: "",
      warning: "hide warning",
      delete: "",
      aceptar: "hide",
      cancelar: "hide"
    });
  }

  buttonDeleteBranchOffices() {
    this.modalDelete(this.state.itemPos);
  }

  // console.log(id)
  // console.log(this.state.medical[id])
  // const edit = this.state.medical[id]
  componentDidMount() {
    const apiLicenses = this.state.conexion + "LoadLicense";
    const apiBaseMedical = this.state.conexion + "LoadMedicalCenter";
    const apiBaseUrl = this.state.conexion + "loadCountries";
    const apiLoadCountBranchOffices =
      this.state.conexion + "LoadCountBranchOffices";
    const apiCountTableBranchOffices =
      this.state.conexion + "countTableBranchOffices";
    //const apiLicenses = ("http://192.168.0.117:8000/api/LoadLicense");
    //const apiBaseMedical= "http://192.168.0.117:8000/api/LoadMedicalCenter";
    //const apiBaseUrl = ("http://192.168.0.117:8000/api/loadCountries");
    const token = window.localStorage.getItem("id_token");

    this.props.loadMedicalCenter();

    const datos = {
      headers: { "access-token": token }
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  loadCountryId(valor) {
    const token = window.localStorage.getItem("id_token");
    const apiProvinces = this.state.conexion + "loadCountries";
    // const apiProvinces = ("http://192.168.0.117:8000/api/loadCountries");
    axios({
      method: "post",
      url: apiProvinces,
      data: {
        idCountry: valor
      },
      headers: { "access-token": token }
    })
      .then(res => {
        //console.log(res)
        this.setState({
          provinces: res.data.provinces,
          inicio: "1",
          divContainer: "container show",
          divLoading: "hide",
          currencySymbol: res.data.currencySymbol
        });
      })
      .catch(res => {
        //console.log(res)
        console.log("Error consultando la api de paises para provincias");
      });
  }

  loadProvinces(valor) {
    const token = window.localStorage.getItem("id_token");
    const apiProvinces = this.state.conexion + "loadCountries";
    //const apiProvinces = ("http://192.168.0.117:8000/api/loadCountries");
    axios({
      method: "post",
      url: apiProvinces,
      data: {
        idCountry: valor
      },
      headers: { "access-token": token }
    })
      .then(res => {
        //console.log(res)
        this.setState({
          provinces: res.data.provinces
        });
      })
      .catch(res => {
        console.log("Error consultando la api de paises para provincias");
      });
  }

  callChildFunction = () => {
    this.ModalContainer.handleActionParent(true); ///calling a child function here
  };

  number_format(amount, decimals) {
    amount += ""; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, "")); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = "" + amount.toFixed(decimals);

    var amount_parts = amount.split("."),
      regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "," + "$2");

    return amount_parts.join(".");
  }

  toggleAlert = () => {
    this.setState({
      modalWarning: !this.state.modalWarning
    });
  };

  cerrarModalAlert = () => {
    this.setState({
      modalWarning: false
    });
  };

  render() {
    console.log(this.props.authData.toJS());
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Configuracion del Centro Medico</CardHeader>
              <CardBody>
                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === 1
                        })}
                        onClick={() => {
                          this.toggleTab(1);
                        }}
                      >
                        Perfil Centro Medico
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === 2
                        })}
                        onClick={() => {
                          this.toggleTab(2);
                        }}
                      >
                        Sucursales
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === 3
                        })}
                        onClick={() => {
                          this.toggleTab(3);
                        }}
                      >
                        Licencias
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId={1}>
                    <MedicalCenter
                      editAction={this.props.medicalCenterAction}
                      data={this.props.medicalCenter.toJS()}
                    />
                  </TabPane>
                </TabContent>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  medicalCenter: state.config,
  authData: state.auth
});

const mapDispatchToProps = dispatch => ({
  loadMedicalCenter: () => dispatch(loadMedicalcenterAction()),
  medicalCenterAction: data => dispatch(editMedicalCenter(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(configContainer);
