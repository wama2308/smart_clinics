import React from "react";
import { Table, Button } from "reactstrap";
import ModalPersonal from './ModalPersonal.js';
import IconButton from "@material-ui/core/IconButton";
import { HowToReg } from "@material-ui/icons";
import Pagination from '../../components/Pagination';
import Search from "../../components/Select";
import '../../components/style.css'

class ListPersonalInactivo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalHeader: '',
      modalFooter: '',
      action: '',
      disabled: false,
      showHide: '',
      isClearable: false,
      option: 0,
      position: 0,
      id: '',
      page: 0,
      rowsPerPage: 10
    };
  }

  componentDidMount() { }

  activarPersonal = (id) => {
    const message = {
      title: "Activar Personal",
      info: "¿Esta seguro que desea activar este personal?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enabledInternalStaffAction(id);
      }
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const ArrayCargo = [];

   this.props.personalInactivo.map((personal, key) => {
     ArrayCargo.push({
       ...personal, number: key + 1
     })
   })

   const result = this.props.search
     ? ArrayCargo.filter(personal => {
         return (
             personal.names.toLowerCase().includes(this.props.search) ||
             personal.surnames.toLowerCase().includes(this.props.search) ||
             personal.positions.toLowerCase().includes(this.props.search) ||
             personal.phone[0].includes(this.props.search) ||
             personal.type_identity.toLowerCase().toString().includes(this.props.search) ||
             personal.dni.includes(this.props.search)
         );
       })
     : ArrayCargo;

    return (
      <div>
        <div className="containerGeneral" style={{"justifyContent": "flex-end", }}>
          <div className="containerSearch">
            <Search value={ArrayCargo} />
          </div>
        </div>
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left" style={{ 'minWidth': "110px" }}>DNI</th>
              <th className="text-left">Personal</th>
              <th className="text-left">Cargo</th>
              <th className="text-left">Email</th>
              <th className="text-left">Telefonos</th>
              <th className="text-left" style={{ 'minWidth': "155px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.props.personalInactivo ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((personal) => {
              return (
                <tr key={personal.number} className="text-left">
                  <td>{personal.number}</td>
                  <td style={{ 'minWidth': "110px" }}>{personal.type_identity} - {personal.dni}</td>
                  <td>{personal.names} {personal.surnames}</td>
                  <td>{personal.positions}</td>
                  <td>{personal.email[0]}</td>
                  <td>{personal.phone[0]}</td>
                  <td style={{ 'minWidth': "155px" }}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete"
                        title="Activar Personal"
                        className="iconButtons"
                        onClick={() => { this.activarPersonal(personal._id); }}>
                        <HowToReg className="iconTable" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })
              :
              null
            }
          </tbody>
        </Table>
        <div style={{ 'display': "flex", 'justify-content': "flex-end" }}>
          <Pagination contador={this.props.personalInactivo}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            handleChangePage={this.handleChangePage} />
        </div>
      </div>
    );
  }
}

export default ListPersonalInactivo;
