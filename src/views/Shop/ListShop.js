import React from "react";
import { Table, Button } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility, SwapHoriz } from "@material-ui/icons";
import ModalShop from './ModalShop.js';
import ModalTransferencias from './ModalTransferencias.js';
import { GetDisabledPermits } from "../../core/utils";
import { number_format } from "../../core/utils";

class ListShop extends React.Component {
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
      shop_id: '0',
    };
  }

  componentDidMount(){}

  openModal = (option, pos, id) => {
    if(!this.props.provider){
      this.props.alert("warning", "¡Antes de agregar una compra, debe agregar un proveedor!");
    }else{
      if(option === 1){
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Registrar Compras-Productos',
        modalFooter:'Guardar',
        disabled: false,
        showHide: 'show',
        isClearable: true,
      })
    }else if(option === 2){
      this.props.LoadShopIdFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Ver Compras-Productos',
        modalFooter:'Guardar',
        disabled: true,
        showHide: 'hide',
      })
    }else if(option === 3){
      this.props.LoadShopIdFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Editar Compras-Productos',
        modalFooter:'Editar',
        disabled: false,
        showHide: 'show',
        position: pos,
        shop_id:id
      })
    }else if(option === 4){
      this.props.LoadShopIdFunction(id);
      this.setState({
        modal:true,
        option:option,
        modalHeader:'Transferir Compras-Productos',
        modalFooter:'Guardar',
        disabled: false,
        showHide: 'show',
        position: pos,
        shop_id:id
      })
    }
    }
  }

  deleteRegister = (id) => {
    const message = {
      title: "Eliminar Registro",
      info: "¿Esta seguro que desea eliminar este registro?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.disableShopAction(id);
      }
    });
  }

  valorCloseModal = (valor) => {
    this.setState({
        modal: valor,
        option: 0,
    });
  }

  render() {
      const createDisabled = GetDisabledPermits(this.props.permitsShop , "Create")
      const updateDisabled = GetDisabledPermits(this.props.permitsShop , "Update")
      const deleteDisabled = GetDisabledPermits(this.props.permitsShop , "Delete")

     return (
      <div>
        {
          (this.state.option === 1 || this.state.option === 2 || this.state.option === 3) &&
          <ModalShop
            option = {this.state.option}
            modal = {this.state.modal}
            modalHeader = {this.state.modalHeader}
            modalFooter = {this.state.modalFooter}
            disabled = {this.state.disabled}
            showHide = {this.state.showHide}
            isClearable = {this.state.isClearable}
            shop_id = {this.state.shop_id}
            branchOfficces={this.props.branchOfficces}
            valorCloseModal = {this.valorCloseModal}
          />
        }
        {
          (this.state.option === 4) &&
          <ModalTransferencias
            option = {this.state.option}
            modal = {this.state.modal}
            modalHeader = {this.state.modalHeader}
            modalFooter = {this.state.modalFooter}
            disabled = {this.state.disabled}
            showHide = {this.state.showHide}
            isClearable = {this.state.isClearable}
            shop_id = {this.state.shop_id}
            branchOfficces={this.props.branchOfficces}
            valorCloseModal = {this.valorCloseModal}
          />
        }

        <Button color="success" disabled={createDisabled} onClick={() => { this.openModal(1); }}>Agregar</Button>
        <br />
        <br />
          <Table hover responsive borderless>
            <thead className="thead-light">
              <tr>
                <th className="text-left">Nro</th>
                <th className="text-left">Compra</th>
                <th className="text-left">Control</th>
                <th className="text-left">Tipo</th>
                <th className="text-left">SubTotal</th>
                <th className="text-left">IGV</th>
                <th className="text-left">Total</th>
                <th className="text-left" style={{'minWidth':"105px"}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
             {this.props.data? this.props.data.map((shop, i) => {
              return (
                <tr key={i} className="text-left">
                  <td>{ i + 1 }</td>
                  <td>{ shop.number_invoice }</td>
                  <td>{ shop.number_controll }</td>
                  <td>{ shop.type_shop }</td>
                  <td>{ number_format(shop.subtotal, 2) }</td>
                  <td>{ number_format(shop.igv, 2) }</td>
                  <td>{ number_format(shop.total, 2) }</td>
                  <td style={{'minWidth':"205px"}}>
                    <div className="float-left" >
                      <IconButton aria-label="Delete"
                        title="Ver Compra"
                        className="iconButtons" onClick={() => { this.openModal(2, i, shop._id); }}>
                        <Visibility className="iconTable" />
                      </IconButton>

                      <IconButton aria-label="Delete"
                         title="Editar Compra"
                         disabled={updateDisabled}
                         className="iconButtons"
                         onClick={() => { this.openModal(3, i, shop._id); }}>
                         <Edit className="iconTable" />
                       </IconButton>

                      <IconButton aria-label="Delete"
                        title="Eliminar Compra"
                        disabled={deleteDisabled}
                        className="iconButtons"
                        onClick={() => { this.deleteRegister(shop._id); }}>
                        <Delete className="iconTable" />
                      </IconButton>
                      
                      <IconButton aria-label="Delete"
                        title="Transferir Compra"
                        className="iconButtons"
                        onClick={() => { this.openModal(4, i, shop._id); }}>
                        <SwapHoriz className="iconTable" />
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
      </div>
    );
  }
}

export default ListShop;
