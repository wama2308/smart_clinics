import React, { Component } from 'react';
import { Table } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import { HowToReg } from '@material-ui/icons';
import Pagination from '../../components/Pagination';
import { getArrays } from '../../core/utils';
import Search from "../../components/Select";

class ListGoodDisabled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10
    }
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  enabledGoods = (id) => {
    const message = {
      title: "Activar Mobiliario",
      info: "¿Esta seguro que desea activar este Moviliario?"
    };
    this.props.confirm(message, res => {
      if (res) {
        this.props.enabledBelongingFunction(id);
      }
    });
  }

  render() {
    const { page, rowsPerPage } = this.state
    const arrayList = getArrays(this.props.goods);

    const result = this.props.search
      ? arrayList.filter(list => {
        return (
          list.quantity.toString().toLowerCase().includes(this.props.search.toLowerCase()) ||
          list.brand.toLowerCase().includes(this.props.search.toLowerCase()) ||
          list.code.toLowerCase().includes(this.props.search.toLowerCase()) ||
          list.name.toLowerCase().includes(this.props.search.toLowerCase())
        );
      })
      : arrayList;

    return (
      <div>
        <div className="containerGeneral" style={{ "marginBottom": "1.8%" }}>
          <div className="container-button" style={{ "height": "35%" }}>
          </div>
          <div className="containerSearch" >
            <Search value={arrayList} />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-sm-12">
            <Table hover responsive borderless>
              <thead className="thead-light">
                <tr>
                  <th className="text-left" >Nombre</th>
                  <th className="text-left" >Codigo</th>
                  <th className="text-left" >Marca</th>
                  <th className="text-left" >Cantidad</th>
                  <th className="text-left" >Año</th>
                </tr>
              </thead>
              <tbody>
                {this.props.goods ? result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((list, key) => {
                  return (
                    <tr key={key} className="text-left">
                      <td>{list.name}</td>
                      <td>{list.code}</td>
                      <td>{list.brand}</td>
                      <td>{list.quantity}</td>
                      <td>
                        <div>
                          <IconButton aria-label="Delete"
                            title="Activar Mobiliario"
                            className="iconButtons"
                            onClick={() => { this.enabledGoods(list._id); }}>
                            <HowToReg className="iconTable" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  )
                }) : null
                }
              </tbody>
              {
                this.props.goods && this.props.goods.length > 10 && (
                  <Pagination
                    contador={this.props.goods}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    handleChangePage={this.handleChangePage}
                  />
                )}
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListGoodDisabled;