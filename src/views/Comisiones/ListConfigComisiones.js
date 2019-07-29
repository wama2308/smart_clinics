import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import ModalConfigCommissions from './ModalConfigComisiones.js';
import Pagination from '../../components/Pagination';
import { getArray, GetDisabledPermits } from '../../core/utils'
import { number_format } from "../../core/utils";

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
        <Button color="success"  onClick={() => { this.openModal(1); }}>Agregar</Button>
        <br />
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Personal</th>
              <th className="text-left">Tiempo</th>
              <th className="text-left">Modo de Pago</th>
              <th className="text-left">Minimo para Pago</th>              
              <th className="text-left" style={{ 'minWidth': "105px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ArrayData ? ArrayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
              return (
                <tr key={data.number} className="text-left">
                  <td>{data.number}</td>
                  <td>{data.type_staff}</td>
                  <td>{data.time}</td>
                  <td>{data.payment_type}</td>
                  <td>{number_format(data.amount_min, 2)}</td>
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
    );
  }
}

export default ListStore;
