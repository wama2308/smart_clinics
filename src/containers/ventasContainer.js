import React from "react";
import Ventas from "../views/Ventas/Ventas";
import Products from "../views/Ventas/Products";
import Client from "../views/Ventas/Client";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  searchPatient,
  clean,
  searchProduct,
  searchOnePatient,
  searchOneSuppplie,
  deleteItem,
  changeQuantytoSell,
  cancelToSell,
  saveInvoice,
  queryAdmins,
  discountRequestAction,
  querySales,
  queryBill,
  cancelledBill,
  cancelDiscount,
  editDiscount,
  createSale
} from "../actions/ventasAction";
import {
  openConfirmDialog,
  openSnackbars
} from "../actions/aplicantionActions";
import Footer from "../views/Ventas/Footer";
import DiscountRequest from "../views/Ventas/discountRequest";
import CircularProgress from "@material-ui/core/CircularProgress";

class VentasContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      modalLoading: false,
      edit: false
    };
  }
  optionsPatient = options => {
    if (!options) {
      return [];
    }
    const data = [];
    options.map(option => {
      data.push({
        label: `${option.type_identity}-${option.dni}  ${option.names}`
      });
    });
    return data;
  };

  componentWillReceiveProps = props => {
    props.approvers ? this.setState({ modalLoading: true }) : null;
  };

  componentDidMount = () => {
    this.props.querySales();
  };

  optionsProducts = (options, products) => {
    if (!options) {
      return [];
    }

    if (!products) {
      const data = [];
      const result = [];
      options.map(option => {
        data.push({
          label: `${option.name}`,
          value: option._id
        });
      });
      return data;
    } else {
      const obj = {};
      let data = [];

      products.map((product, key) => {
        obj[product._id] = product._id;
      });
      if (Object.keys(obj).length > 0) {
        const result = options.map(option => {
          if (option._id !== obj[option._id]) {
            data.push({
              label: `${option.name}`,
              value: option._id
            });
          }
        });

        return data;
      }
    }
  };

  getTotal = (array, aplication) => {
    const obj = {
      subTotal: 0,
      iva: 0,
      total: 0
    };
    if (!array) {
      return obj;
    }

    const discount = this.props.discount;

    let subtotal = 0;
    let totaldiscount = 0;
    array.map(data => {
      const result = isNaN(data.quantity)
        ? data.price
        : data.quantity * data.price;
      subtotal = parseFloat(obj.subTotal) + parseFloat(result);
      obj.subTotal = subtotal.toFixed(2);
    });

    if (discount) {
      if (discount.percentage === 1) {
        totaldiscount = (obj.subTotal * discount.discount) / 100;
        obj.subTotal = parseFloat(obj.subTotal) - totaldiscount;
      } else {
        obj.subTotal = parseFloat(obj.subTotal) - parseFloat(discount.discount);
      }
    }
    const iva =
      (parseFloat(obj.subTotal) * parseFloat(aplication.tax_rate)) / 100;
    obj.total = parseFloat(obj.subTotal) + parseFloat(iva);
    obj.total = obj.total.toFixed(2);
    obj.iva = iva.toFixed(2);
    obj.percentageIva = aplication.tax_rate;
    obj.currency = aplication.current_simbol;

    return obj;
  };

  armingObject = async () => {
    const totals = this.getTotal(this.props.products, this.props.aplication);
    const obj = {
      patient_id: this.props.patient._id,
      supplie_array: this.props.products,
      sub_total: Number(totals.subTotal),
      igv: Number(totals.iva),
      total: Number(totals.total)
    };

    return obj;
  };

  saveSales = async () => {
    const result = await this.armingObject();
    this.props.saveInvoice(result);
  };

  discountRequest = async values => {
    this.setState({ modalLoading: false });
    const result = await this.armingObject();
    const obj = {
      ...result,
      discount: {
        ...values
      }
    };
    this.props.discountRequestAction(obj, () => {
      this.setState({ modalLoading: true });
      this.close();
    });
  };

  discountEditOrSave = (type, values) => {
    switch (type) {
      case 1:
        this.discountRequest(values);
        break;
      case 2:
        this.editDiscount(values);
        break;
    }
  };

  editDiscount = values => {
    this.props.editDiscount(
      {
        bill_id: this.props.bill_id,
        discount: {
          discount: values.discount,
          percentage: values.percentage
        },
        accept: 1
      },
      () => {
        this.setState({ modalLoading: true });
        this.close();
      }
    );
  };

  openModal = edit => {
    this.setState({
      openModal: true,
      edit: edit
    });
  };

  close = () => {
    this.setState({ openModal: false });
  };

  render() {
    const optionsPatient = this.optionsPatient(this.props.options_patient);
    const optionsProducts = this.optionsProducts(
      this.props.options_Product,
      this.props.products
    );

    const totalData = this.getTotal(this.props.products, this.props.aplication);
    return (
      <Container>
        {!this.props.saleLoading && <Spinner />}
        {this.state.openModal && (
          <DiscountRequest
            open={this.state.openModal}
            close={this.close}
            queryAdmins={this.props.queryAdmins}
            discountRequest={this.discountEditOrSave}
            approvers={this.props.approvers}
            loading={this.state.modalLoading}
            edit={this.state.edit}
            total={totalData}
          />
        )}
        <div style={{ height: "38%" }}>
          <div className="insight-container-one">
            <Client
              searchAction={this.props.searchOnePatient}
              getOptions={this.props.searchPatient}
              loaded={this.props.loaded}
              patient={this.props.patient}
              clean={this.props.clean}
              options={optionsPatient}
              isSaved={this.props.isSaved}
              statusSale={this.props.statusSale}
            />
            <Ventas
              listSales={this.props.listSales}
              queryBill={this.props.queryBill}
              confirm={this.props.openConfirmDialog}
            />
          </div>
        </div>
        <div style={{ height: "62%" }}>
          <div className="insight-container-two">
            <Products
              className="products"
              patient={this.props.patient}
              searchAction={this.props.searchProduct}
              options={optionsProducts}
              getProducts={this.props.searchOneSuppplie}
              products={this.props.products}
              deleteAtion={this.props.deleteItem}
              changeQuantytoSell={this.props.changeQuantytoSell}
              aplication={this.props.aplication}
              getTotal={this.getTotal}
              discount={this.props.discount}
              loaded={this.props.loaded}
              statusSale={this.props.statusSale}
            />

            <Footer
              totalData={totalData}
              openModal={this.openModal}
              patient={this.props.patient}
              cancel={this.props.cancelToSell}
              confirm={this.props.openConfirmDialog}
              products={this.props.products}
              saveInvoice={this.saveSales}
              statusSale={this.props.statusSale}
              aplication={this.props.aplication}
              isSaved={this.props.isSaved}
              cancelled={this.props.cancelledBill}
              bill_id={this.props.bill_id}
              discount={this.props.discount}
              editAndCancel={this.props.cancelDiscount}
              openSnackbars={this.props.openSnackbars}
              createSale={this.props.createSale}
              dataGeneral={this.props.dataGeneral}
            />
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.global.searchloading,
  patient: state.ventas.get("patient"),
  options_patient: state.ventas.get("options_patient"),
  options_Product: state.ventas.get("products"),
  products: state.ventas.get("array_products"),
  aplication: state.global.dataGeneral.dataCountries,
  approvers: state.ventas.get("approversList"),
  listSales: state.ventas.get("salesList"),
  saleLoading: state.ventas.get("loadingSell"),
  isSaved: state.ventas.get("saveBill"),
  bill_id: state.ventas.get("bill_id"),
  discount: state.ventas.get("discount"),
  dataGeneral: state.global.dataGeneral.dataGeneral,
  statusSale: state.ventas.get("status_sale")
});

export default connect(
  mapStateToProps,
  {
    searchPatient,
    clean,
    searchProduct,
    searchOnePatient,
    searchOneSuppplie,
    deleteItem,
    changeQuantytoSell,
    cancelToSell,
    openConfirmDialog,
    saveInvoice,
    queryAdmins,
    discountRequestAction,
    querySales,
    queryBill,
    cancelledBill,
    cancelDiscount,
    editDiscount,
    openSnackbars,
    createSale
  }
)(VentasContainer);

const Container = styled.div`
  height: 100%;
  .insight-container-one {
    flex: 1;
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .insight-container-two {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const Spinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
`;
