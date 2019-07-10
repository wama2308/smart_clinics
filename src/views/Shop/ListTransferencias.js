import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility, SwapHoriz } from "@material-ui/icons";
import ModalShop from './ModalShop.js';
import ModalTransferencias from './ModalTransferencias.js';
import { number_format, GetDisabledPermits, getArray } from "../../core/utils";
import Pagination from '../../components/Pagination';
import Search from "../../components/Select";
import '../../components/style.css'

class ListTransferencias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      modalHeader: '',
      modalFooter: '',
      action: '',
      disabled: '',
      showHide: '',
      option:0,
      position: 0,
      isClearable: false,
      transfer_id: '0',
      status: '',
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount(){}

  openModal = (option, pos, id, status) => {
    if(option === 5){
      this.props.queryOneTransferFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Transferencia',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',
      })
    }else if(option === 6){
      this.props.queryOneTransferFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Transferencia',
        modalFooter:'Editar',
        disabled: false,
        showHide: 'show',
        position: pos,
        transfer_id:id,
        status: status,
        page: 0,
        rowsPerPage: 10,
      })
    }
  }

  deleteRegister = (id, status) => {
    const message = {
      title: "Eliminar Registro",
      info: "¿Esta seguro que desea eliminar este registro?"
    };
    this.props.confirm(message, res => {
      if (res) {
        if(status === "Pendiente" || status === "Rechazada"){
          this.props.disableTransferAction(id);
        }else{
          this.props.alert("warning", "¡La transferencia no puede ser eliminada porque ya fue aceptada!");
        }
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
    const updateDisabled = GetDisabledPermits(this.props.permitsTransfer , "Update")
    const deleteDisabled = GetDisabledPermits(this.props.permitsTransfer , "Delete")
    const detailsDisabled = GetDisabledPermits(this.props.permitsTransfer , "Details")
    const { rowsPerPage, page } = this.state;
    const ArrayData = getArray(this.props.data)

    const result = this.props.search
      ? ArrayData.filter(data => {
          return (
              data.number_invoice.toLowerCase().includes(this.props.search) ||
              data.number_controll.toLowerCase().includes(this.props.search)
          );
        })
      : ArrayData;

     return (
      <div>
        {
          (this.state.option === 5 || this.state.option === 6) &&
          <ModalTransferencias
            option = {this.state.option}
            modal = {this.state.modal}
            modalHeader = {this.state.modalHeader}
            modalFooter = {this.state.modalFooter}
            disabled = {this.state.disabled}
            showHide = {this.state.showHide}
            isClearable = {this.state.isClearable}
            transfer_id = {this.state.transfer_id}
            status = {this.state.status}
            branchOfficces={this.props.branchOfficces}
            valorCloseModal = {this.valorCloseModal}
          />
        }
        <div className="containerGeneral" style={{"justifyContent":"flex-end"}}>
          <div className="containerSearch">
            <Search value={ArrayData} />
          </div>
        </div>
        <br />
          <Table hover responsive borderless>
            <thead className="thead-light">
              <tr>
                <th className="text-left">Nro</th>
                <th className="text-left">Transferencia</th>
                <th className="text-left">Control</th>
                <th className="text-left">SubTotal</th>
                <th className="text-left">IGV</th>
                <th className="text-left">Total</th>
                <th className="text-left">Receptor</th>
                <th className="text-left">Estatus</th>
                <th className="text-left" style={{'minWidth':"105px"}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
             {
               this.props.data ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
              return (
                <tr key={ data.number } className="text-left">
                  <td>{ data.number }</td>
                  <td>{ data.number_invoice }</td>
                  <td>{ data.number_controll }</td>
                  <td>{ number_format(data.subtotal, 2) }</td>
                  <td>{ number_format(data.igv, 2) }</td>
                  <td>{ number_format(data.total, 2) }</td>
                  <td>{ data.receiver }</td>
                  <td>{ data.status }</td>
                  <td style={{'minWidth':"205px"}}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete"
                        title="Ver Transferencia"
                        className="iconButtons"
                        onClick={() => { this.openModal(5, data.number, data._id, data.status); }}
                        disabled={detailsDisabled}>
                        <Visibility className="iconTable" />
                      </IconButton>

                      <IconButton aria-label="Delete"
                        title="Editar Transferencia"
                        className="iconButtons"
                        onClick={() => { this.openModal(6, data.number, data._id, data.status); }}
                        disabled={updateDisabled}>
                        <Edit className="iconTable" />
                      </IconButton>

                      <IconButton aria-label="Delete"
                        title="Eliminar Transferencia"
                        className="iconButtons"
                        onClick={() => { this.deleteRegister(data._id, data.status); }}
                        disabled={deleteDisabled}>
                        <Delete className="iconTable"/>
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
            {this.props.length > 10 &&
              <Pagination contador={this.props.data}
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

export default ListTransferencias;
