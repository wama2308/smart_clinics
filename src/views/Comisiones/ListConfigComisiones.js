import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import ModalConfigCommissions from './ModalConfigComisiones.js';
import Pagination from '../../components/Pagination';
import { getArray, GetDisabledPermits } from '../../core/utils'
import { number_format } from "../../core/utils";
import Search from "../../components/Select";

class ListStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalHeader: '',
      modalFooter: '',
      action: '',
      disabled: '',
      showHide: '',
      option: 0,
      position: 0,
      id: '',
      sucursal_id_now: '',
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() { }

  openModal = (option, id) => {
    let set = ""
    this.props.setSearch(set)
    if (option === 1) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Registrar Regla para Comision',
        modalFooter: 'Guardar',
        disabled: false,
        showHide: 'show',
      })
    } else if (option === 2) {
      this.props.LoadConfigCommissionIdFunction(id);
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Regla para Comision',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
      })
    } else if (option === 3) {
      this.props.LoadConfigCommissionIdFunction(id);
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Regla para Comision',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',
        id: id,
      })
    }
  }

  deleteRegister = (id) => {
    const message = {
      title: "Eliminar Regla para Comision",
      info: "¿Esta seguro que desea eliminar esta regla para comision?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.DeleteConfigCommissionsAction(id);
      }
    });
  }

  valorCloseModal = (valor) => {
    this.setState({
      modal: valor,
      option: 0,
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
    const ArrayData = getArray(this.props.data.commissions)    
    const result = this.props.search
      ? ArrayData.filter(users => {
        return (
          users.type_staff.toLowerCase().includes(this.props.search.toLowerCase()) ||
          users.time.toLowerCase().includes(this.props.search.toLowerCase()) ||
          users.type.toLowerCase().includes(this.props.search.toLowerCase()) ||
          users.payment_type.toLowerCase().includes(this.props.search.toLowerCase())
        );
      })
      : ArrayData;

    return (
      <div>
        {
          (this.state.option === 1 ||
            this.state.option === 2 ||
            this.state.option === 3) && (
            <ModalConfigCommissions
              option={this.state.option}
              modal={this.state.modal}
              modalHeader={this.state.modalHeader}
              modalFooter={this.state.modalFooter}
              disabled={this.state.disabled}
              showHide={this.state.showHide}
              valorCloseModal={this.valorCloseModal}
              id={this.state.id}
            />
          )}
        <div className="containerGeneral">
          <div className="container-button">
            <Button color="success" onClick={() => { this.openModal(1); }}>Agregar</Button>
          </div>
          <div className="containerSearch">
            <Search />
          </div>
        </div>

        <br />
        <br />
        <div style={{ margin: "" }}>
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Regla</th>
              <th className="text-left">Tipo Persona</th>
              <th className="text-left">Opcion</th>              
              <th className="text-left">Tiempo(dias)</th>
              <th className="text-left">Tipo</th>
              <th className="text-left">Condicion</th>
              <th className="text-left">Forma de pago</th>
              <th className="text-left" style={{ 'minWidth': "105px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ArrayData ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
              let condition = "";
              data.type_id === "5d1776e3b0d4a50b23931122" ?
                condition = data.condition :
                condition = number_format(data.condition, 2) + " " + this.props.current_simbol
              return (
                <tr key={data.number} className="text-left">
                  <td>{data.number}</td>
                  <td>{data.type_rule_commission}</td>
                  <td>{data.type_staff}</td>
                  <td>{data.option}</td>                  
                  <td>{data.time}</td>
                  <td>{data.type}</td>
                  <td>{condition}</td>
                  <td>{data.payment_type}</td>
                  <td style={{ 'minWidth': "205px" }}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete"
                        title="Ver Comision"
                        className="iconButtons"
                        onClick={() => { this.openModal(2, data._id); }}>
                        <Visibility className="iconTable" />
                      </IconButton>

                      <IconButton aria-label="Delete"
                        title="Editar Comision"
                        className="iconButtons"
                        onClick={() => { this.openModal(3, data._id); }}
                      >
                        <Edit className="iconTable" />
                      </IconButton>

                      <IconButton aria-label="Delete"
                        title="Eliminar Comision"
                        className="iconButtons"
                        onClick={() => { this.deleteRegister(data._id); }}
                      >
                        <Delete className="iconTable" />
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
          {
            this.props.data.commissions.length > 10 &&
            <Pagination contador={this.props.data.commissions}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              handleChangePage={this.handleChangePage} />
          }
        </Table>
        </div>
      </div>
    );
  }
}

export default ListStore;
