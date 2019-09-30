import React from "react";
import { Table, Button, FormGroup, Input, Label } from "reactstrap";
import Switch from '@material-ui/core/Switch';
import IconButton from "@material-ui/core/IconButton";
import { PlaylistAdd } from "@material-ui/icons";
import "./Shop.css";
import Pagination from '../../components/Pagination';
import { getArray, GetDisabledPermits } from '../../core/utils';
import '../../components/style.css'


class ListStockProducts extends React.Component {
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
            searchProduct: '',
            page: 0,
            rowsPerPage: 10,
            arrayTest: getArray(this.props.data)
        };
    }

    componentDidMount() { }

    handleChange = e => {
        const { name, value } = e.target;
        this.props.filterStockProductsAction(value);
        this.setState({
            [name]: value
        });

    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    componentWillReceiveProps = props => {
        this.setState({
            arrayTest: getArray(props.data)
        })
    };

    addProductRequest = (id, name, type) => {
        const productRepeat = this.props.productsToTransfer.find(product => product._id === id);
        let obj = {
            _id: id,
            name: name,
            type: type,
            quantity_transfer: 0
        };
        if (productRepeat) {
            this.props.alert("warning", "¡Este producto ya se encuentra agregado!");
        } else {
            this.props.addProductRequestFunction(obj);
        }
    }

    render() {
        const { rowsPerPage, page } = this.state;
        const ArrayData = this.state.arrayTest
        var find_see_stock = this.props.permitsTransfer.find(function (element) {
            return element === "See_stock";
        });
        return (
            <div>
                <div className="containerGeneral" style={{ "justifyContent": "flex-end" }}>
                    <div className="containerSearch" style={{ width: '10cm' }}>
                        <Input
                            disabled={this.props.disabled}
                            name="searchProduct"
                            id="searchProduct"
                            onChange={this.handleChange}
                            value={this.state.searchProduct}
                            type="text"
                            placeholder="Buscar Producto..."
                            style={{ borderRadius: "0.25rem" }}
                            align='right'
                            disabled={this.props.disabled}
                        />
                    </div>
                </div>
                <br />
                <Table hover responsive borderless>
                    <thead className="thead-light">
                        <tr>
                            <th className="text-left" style={{ width: '10%' }}>Nro</th>
                            <th className="text-left" style={{ width: '25%' }}>Producto</th>
                            <th className="text-left" style={{ width: '20%' }}>Codigo</th>
                            <th className="text-left" style={{ width: '20%' }}>Tipo</th>
                            {
                                find_see_stock &&
                                <th className="text-left" style={{ width: '15%' }}>Stock</th>
                            }
                            <th className="text-left" style={{ width: '10%' }}>Accion</th>

                        </tr>
                    </thead>
                    <tbody>
                        {ArrayData ? ArrayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => {
                            return (
                                <tr key={data.number} className="text-left">
                                    <td style={{ width: '10%' }}>{data.number}</td>
                                    <td style={{ width: '25%' }}>{data.name}</td>
                                    <td style={{ width: '20%' }}>{data.code}</td>
                                    <td style={{ width: '20%' }}>{data.type}</td>
                                    {
                                        find_see_stock &&
                                        <td style={{ width: '15%' }}>{data.quantity_stock}</td>
                                    }
                                    <td style={{ width: '10%' }}>
                                        <div className="float-left" >
                                            <IconButton aria-label="Delete"
                                                title="Agregar product a la solicitud"
                                                className="iconButtons"
                                                onClick={() => { this.addProductRequest(data._id, data.name, data.type); }}
                                                disabled={this.props.disabled}>
                                                <PlaylistAdd className="iconTable" />
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
                        this.props.data.lenght > 10 &&
                        <Pagination contador={this.props.data}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                            handleChangePage={this.handleChangePage}
                        />
                    }
                </Table>

            </div>
        );
    }
}

export default ListStockProducts;