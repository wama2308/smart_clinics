import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import ModalProduct from './ModalProduct.js';
import { GetDisabledPermits, getArray } from "../../core/utils";
import Pagination from '../../components/Pagination';
import Search from "../../components/Select";
import '../../components/style.css'

class ListProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalHeader: "",
      modalFooter: "",
      action: "",
      disabled: "",
      showHide: "",
      option: 0,
      position: 0,
      isClearable: false,
      productoId: '',
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() {}

  openModal = (option, pos, id) => {
    if (option === 1) {
      this.props.queryOneSupplieWithLotFunction(id);
      this.setState({
        modal: true,
        option: option,
        modalHeader: "Ver Producto",
        modalFooter: "Guardar",
        disabled: true,
        showHide: "hide"
      });
    } else if (option === 2) {
      this.props.queryOneSupplieWithLotFunction(id);
      this.setState({
        modal: true,
        option: option,
        modalHeader: "Editar Producto",
        modalFooter: "Editar",
        disabled: false,
        showHide: "show",
        position: pos,
        productoId: id
      });
    }
  };

  valorCloseModal = valor => {
    this.setState({
      modal: valor,
      option: 0
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const detailsDisabled = GetDisabledPermits(this.props.permitsProducts , "Details")
    const updateDisabled = GetDisabledPermits(this.props.permitsProducts , "Update")
    const { rowsPerPage, page } = this.state;
    const arrayProduct = getArray(this.props.allProducts)

    const result = this.props.search
      ? arrayProduct.filter(product => {
          return (
            product.name.toLowerCase().includes(this.props.search.toLowerCase()) ||
            product.code.toLowerCase().includes(this.props.search.toLowerCase())||
            product.type.toLowerCase().includes(this.props.search.toLowerCase())
          );
        })
      : arrayProduct;

     return (
      <div>
        <ModalProduct
          option={this.state.option}
          modal={this.state.modal}
          modalHeader={this.state.modalHeader}
          modalFooter={this.state.modalFooter}
          disabled={this.state.disabled}
          showHide={this.state.showHide}
          productoId={this.state.productoId}
          valorCloseModal={this.valorCloseModal}
        />
      <div className="containerGeneral" style={{"justifyContent": "flex-end"}}>
          <div className="containerSearch">
            <Search value={arrayProduct} />
          </div>
        </div>
        <br />
          <Table hover responsive borderless>
            <thead className="thead-light">
              <tr>
                <th className="text-left">Nro</th>
                <th className="text-left">Producto</th>
                <th className="text-left">Codigo</th>
                <th className="text-left">Tipo</th>
                <th className="text-left" style={{'minWidth':"105px"}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
             {this.props.allProducts? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => {
              return (
                <tr key={ product.number } className="text-left">
                  <td>{ product.number }</td>
                  <td>{ product.name }</td>
                  <td>{ product.code }</td>
                  <td>{ product.type }</td>
                  <td style={{'minWidth':"205px"}}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete"
                        title="Ver Producto"
                        className="iconButtons"
                        onClick={() => { this.openModal(1, product.number, product._id); }}
                        disabled={detailsDisabled}>
                        <Visibility className="iconTable" />
                      </IconButton>

                      <IconButton aria-label="Delete"
                        title="Editar Producto/Lote"
                        className="iconButtons"
                        onClick={() => { this.openModal(2, product.number, product._id); }}
                        disabled={updateDisabled}>
                        <Edit className="iconTable" />
                      </IconButton>
                      {/*<IconButton aria-label="Delete" title="Producto Defectuoso/vencido" className="iconButtons" ><Delete className="iconTable" /></IconButton>*/}

                    </div>
                  </td>
                </tr>
              );
             })
              :
                null
              }
            </tbody>
            {this.props.allProducts.length > 10 &&
              <Pagination contador={this.props.allProducts}
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

export default ListProduct;
