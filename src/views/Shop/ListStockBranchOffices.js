import React from "react";
import { Table, Button, FormGroup, Input, Label } from "reactstrap";
import Switch from '@material-ui/core/Switch';
import "./Shop.css";
import Pagination from '../../components/Pagination';
import { getArray, GetDisabledPermits } from '../../core/utils';
import '../../components/style.css'


class ListStockBranchOffices extends React.Component {
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

    componentDidMount() {}

    handleChange = e => {
        const { name, value } = e.target;
        const dataService = getArray(this.props.data)
        let expresion = new RegExp(`${value}.*`, "i");
        const result = dataService.filter(
            data => expresion.test(data.branchoffice.name) ||
                expresion.test(data.total)
        );
        this.setState({
            [name]: value,
            arrayTest: result
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

    render() {
        const { rowsPerPage, page } = this.state;
        const ArrayData = this.state.arrayTest
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
                            <th className="text-left" style={{ width: '30%' }}>Sucursal</th>
                            <th className="text-left" style={{ width: '20%' }}>Producto</th>
                            <th className="text-left" style={{ width: '15%' }}>Codigo</th>
                            <th className="text-left" style={{ width: '15%' }}>Tipo</th>
                            <th className="text-left" style={{ width: '10%' }}>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ArrayData ? ArrayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => {
                            return (
                                <tr key={data.number} className="text-left">
                                    <td style={{ width: '10%' }}>{data.number}</td>
                                    <td style={{ width: '30%' }}>{data.branchoffice.name}</td>
                                    <td style={{ width: '20%' }}>{data.name}</td>
                                    <td style={{ width: '15%' }}>{data.code}</td>
                                    <td style={{ width: '15%' }}>{data.type}</td>
                                    <td style={{ width: '10%' }}>{data.total}</td>
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

export default ListStockBranchOffices;