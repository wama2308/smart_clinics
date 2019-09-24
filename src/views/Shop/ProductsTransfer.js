import React from "react";
import { Card, CardHeader, Input } from "reactstrap";
import styled from "styled-components";
import DefaultSearch from "../../components/DefaultSearch.js";
import { Delete } from "@material-ui/icons";
import Switch from '@material-ui/core/Switch';
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  IconButton
} from "@material-ui/core";

class ProductsTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      edit: false,
      delete: false,
      quantyToSell: 0,
      discountP: false
    };
  }

  optionsProducts = (options) => {
    if (!options) {
      return [];
    }
    const data = [];
    options.map(option => {
      data.push({
        label: `${option.name}`,
        value: option._id
      });
    });
    return data;
  };

  delete = key => {
    const message = {
      title: "Eliminar Producto",
      info: "¿Esta seguro que desea eliminar este producto?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.deleteProductsTransferFunction(key);
      }
    });
  };

  handleChange = (event, product) => {
    this.props.setQuantityTranferAction(product._id, parseFloat(event.target.value));
    // if (parseFloat(product.quantity_stock) < parseFloat(event.target.value)) {
    //   this.props.alert("warning", "¡La cantidad a transferir no puede ser mayor al stock!");
    // } else {
    //   this.props.setQuantityTranferAction(product._id, parseFloat(event.target.value));
    // }
  };

  componentDidUpdate = prevProps => {
    let lastData = undefined;
    let lastPrevData = undefined;
    this.props.productsToTransfer
      ? (lastData = this.props.productsToTransfer[this.props.productsToTransfer.length - 1])
      : null;

    prevProps.productsToTransfer
      ? (lastPrevData = prevProps.productsToTransfer[prevProps.productsToTransfer.length - 1])
      : null;
    if (lastData) {
      if (JSON.stringify(lastData) !== JSON.stringify(lastPrevData)) {
        document.getElementById("inputQuantity_" + lastData._id).focus();
      }
    }
  };

  editInput = key => {
    this.setState({ edit: key });
  };

  keyPress = (e, product) => {
    if (e.key === "Enter") {
      if (parseFloat(product.quantity_stock) < parseFloat(e.target.value)) {
        this.props.alert("warning", "¡La cantidad a transferir no puede ser mayor al stock!");
      } else {
        this.props.setQuantityTranferAction(product._id, product.quantity_transfer);
        document.getElementById("search").focus();
      }
    }
  };

  eventBlurInputQuantity = (id) => e => {
    if (document.getElementById("inputQuantity_" + id).value === '' ||
      document.getElementById("inputQuantity_" + id).value === '0') {
      document.getElementById("inputQuantity_" + id).value = '0';
    }
  }

  eventFocusInputQuantity = (id) => e => {
    if (document.getElementById("inputQuantity_" + id).value === '0') {
      document.getElementById("inputQuantity_" + id).value = '';
    }
  }

  handleChangeSwitch = (id) => event => {
    this.props.setSwitchTableRequestReceived(id, event.target.checked);    
  };

  render() {
    const optionsProducts = this.optionsProducts(this.props.dataAllProducts);
    const { productsToTransfer } = this.props;
    let heightInput = '';
    let widthInput = '';
    let dataHead = [];
    if(this.props.option === 3 || this.props.option === 2 || this.props.option === 1){
      dataHead = [
        { label: "NOMBRE" },
        { label: "TIPO" },
        //{ label: "DISPONIBLE" },
        { label: "CANT A SOLICITAR" },
        { label: "ACTION" }
      ];
      heightInput = 48;
      widthInput = '25%';
    }else if(this.props.option === 4){
      dataHead = [
        { label: "NOMBRE" },
        { label: "TIPO" },
        { label: "DISPONIBLE" },
        { label: "CANT SOLICITADA" },
        { label: "SELECCIONAR" },
        { label: "ACTION" }
      ];
      heightInput = 55;
      widthInput = '17%';
    }
    

    return (
      <span>
        <div className="errorSelect" style={{ width: "100%" }}>{this.props.divAviso}</div>
        <Card
          style={{
            flex: 1,
            margin: "10px 0px",
            overflow: "auto",
            minHeight: 480,
            maxHeight: 480
          }}
        >
          <Header>
            <div>Productos</div>
            <div style={{ width: "40%" }}>
              <DefaultSearch
                pressKey={true}
                placeholder="Buscar Producto..."
                getOptions={this.props.searchProduct}
                options={optionsProducts}
                searchAction={this.props.searchOneSuppplie}
              />
            </div>
          </Header>
          <div style={{ overflow: "auto", height: "70%" }}>
            <Table>
              <TableHead>
                <TableRow style={{ height: 35 }}>
                  {dataHead.map((head, key) => {
                    return (
                      <TableCell
                        key={key}
                        style={{ border: "1px solid #c8ced3" }}
                      >
                        {head.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {productsToTransfer &&
                  productsToTransfer.map((product, key) => {
                    return (
                      <RowTable key={key}>
                        <Cell className="cellStyle">{product.name}</Cell>
                        <Cell>{product.type}</Cell>
                        {
                          this.props.option === 4 &&
                          <Cell>{product.quantity_stock}</Cell>
                        }

                        <td style= {{width: widthInput}}>
                          <Input
                            name={`inputQuantity_${product._id}`}
                            id={`inputQuantity_${product._id}`}
                            type="number"
                            className={product._id}
                            value={product.quantity_transfer}
                            onKeyDown={e => this.keyPress(e, product)}
                            onChange={event => this.handleChange(event, product)}
                            style={{ height: heightInput, borderRadius: 0 }}
                            onBlur={this.eventBlurInputQuantity(product._id)}
                            onFocus={this.eventFocusInputQuantity(product._id)}
                          />
                        </td>
                        {
                          this.props.option === 4 &&
                          <Cell style= {{width: widthInput}}>
                            <Switch
                              onChange={this.handleChangeSwitch(product._id)}
                              value={product.confirm}
                              id={`checked_${product._id}`}
                              name={`checked_${product._id}`}
                              color="primary"
                              checked={product.confirm}
                              disabled={this.props.disabled}
                            />                          
                          </Cell>
                        }
                        <Cell>
                          <IconButton
                            //disabled={disabled}
                            onClick={() => {
                              this.delete(key);
                            }}
                          >
                            <Delete className="iconTable" />
                          </IconButton>
                        </Cell>
                      </RowTable>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </span>
    );
  }
}

export default ProductsTransfer;

const Header = styled(CardHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 88px;
`;

const Cell = styled(TableCell)`
  border: 1px solid #c8ced3;
`;

const RowTable = styled(TableRow)`
  && {
    &:hover {
      background: #eeeeee;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #c8ced3;
  border-bottom: 1px solid #c8ced3;
  .totalStyle {
    padding-right: 20px;
    border-left: 1px solid #c8ced3;
    border-right: 1px solid #c8ced3;
    display: flex;
    height: 100%;
    min-width: 20%;
    align-items: center;
  }
  .titleBol {
    font-weight: bold;
    padding: 10px;
  }
`;
