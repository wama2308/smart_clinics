import React from "react";
import { Table, Button } from "reactstrap";
import ModalCargos from './ModalCargos.js';
import IconButton from "@material-ui/core/IconButton";
import { Edit, Visibility, Delete } from "@material-ui/icons";
import { GetDisabledPermits, getArray } from "../../core/utils";
import Pagination from '../../components/Pagination';
import Search from "../../components/Select";
import '../../components/style.css'

class ListCargos extends React.Component {
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
      cargo: '',
      descripcion: '',
      cargoId: '',
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() { }

  openModal = (option, pos, cargoId, label, description) => {
    if (option === 1) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Registrar Cargo',
        modalFooter: 'Guardar',
        disabled: false,
        showHide: 'show',
        cargoId: '',
        cargo: '',
        descripcion: ''
      })
    } else if (option === 2) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Ver Cargo',
        modalFooter: 'Guardar',
        disabled: true,
        showHide: 'hide',
        cargo: label,
        descripcion: description
      })
    } else if (option === 3) {
      this.setState({
        modal: true,
        option: option,
        modalHeader: 'Editar Cargo',
        modalFooter: 'Editar',
        disabled: false,
        showHide: 'show',
        cargoId: cargoId,
        cargo: label,
        descripcion: description
      })
    }
  }

  deleteCargo = (id) => {
    const message = {
      title: "Eliminar Cargo",
      info: "¿Esta seguro que desea eliminar este cargo?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.disabledPositionAction(id);
      }
    });
  }

  valorCloseModal = (valor) => {
    this.setState({
      modal: valor,
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const createDisabled = GetDisabledPermits(this.props.permitsCargos, "Create")
    const updateDisabled = GetDisabledPermits(this.props.permitsCargos, "Update")
    const deleteDisabled = GetDisabledPermits(this.props.permitsCargos, "Delete")
    const { rowsPerPage, page } = this.state;
    const arrayCargo = getArray(this.props.cargos)

    const result = this.props.search
      ? arrayCargo.filter(cargo => {
          return (
              cargo.label.toLowerCase().includes(this.props.search)
          );
        })
      : arrayCargo;

    return (
      <div>
        <ModalCargos
          option={this.state.option}
          modal={this.state.modal}
          modalHeader={this.state.modalHeader}
          modalFooter={this.state.modalFooter}
          disabled={this.state.disabled}
          showHide={this.state.showHide}
          cargo={this.state.cargo}
          descripcion={this.state.descripcion}
          cargoId={this.state.cargoId}
          valorCloseModal={this.valorCloseModal}
        />
        <div className="containerGeneral">
          <div className="container-button" >
          <Button color="success"
             disabled={createDisabled}
             onClick={() => { this.openModal(1); }}>
             Agregar Cargos
           </Button>
         </div>
          <div className="containerSearch">
            <Search value={arrayCargo} />
          </div>
        </div>

        <br />
        <br />
        <Table hover responsive borderless>
          <thead className="thead-light">
            <tr>
              <th className="text-left">Nro</th>
              <th className="text-left">Cargo</th>
              <th className="text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {arrayCargo ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cargo, i) => {
              return (
                <tr key={cargo.number} className="text-left">
                  <td>{cargo.number}</td>
                  <td>{cargo.label}</td>
                  <td>
                    <div className="float-left" >
                      <IconButton
                        aria-label="Delete"
                        title="Ver Cargo"
                        className="iconButtons"
                        onClick={() => { this.openModal(2, cargo.number, cargo.value, cargo.label, cargo.description); }}>
                        <Visibility className="iconTable" />
                      </IconButton>
                      <IconButton aria-label="Delete"
                        disabled={updateDisabled}
                        title="Editar Cargo"
                        className="iconButtons"
                        onClick={() => { this.openModal(3, cargo.number, cargo.value, cargo.label, cargo.description); }}>
                        <Edit className="iconTable" />
                      </IconButton>
                      <IconButton aria-label="Delete"
                        disabled={deleteDisabled}
                        title="Eliminar Cargo"
                        className="iconButtons"
                        onClick={() => { this.deleteCargo(cargo.value); }}>
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
            this.props.cargos.length > 10 &&
              <Pagination contador={this.props.cargos}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                handleChangePage={this.handleChangePage} />
          }
        </Table>
      </div >

    );
  }
}
export default ListCargos;
