import React, { Component } from 'react';
import classnames from "classnames";
import {
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";
import { openConfirmDialog, search } from '../actions/aplicantionActions';
import ListGoods from '../views/Goods/ListGoods';
import { queryAllBelongingFunction, queryOneBelongingFunction, enabledBelongingFunction, disabledBelongingFunction, nextPage, backPage, dataPagination, rowPagination, createTable } from '../actions/GoodsAction';
import ListGoodDisabled from '../views/Goods/ListGoodDisabled';

class GoodsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      loading: "show"
    }
  }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });

      let set = ""
      this.props.search(set)
    }
  }

  componentDidMount() {
    this.props.queryAllBelongingFunction()
    this.setState({
      loading: "hide"
    })
  }

  componentWillReceiveProps(props) {
    if (props.goods) {
      this.setState({
        loading: "show"
      })
    }
  }

  componentWillUnmount() {
    let set = ""
    this.props.search(set)
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Bienes</CardHeader>
              <CardBody>
                {this.state.loading === "show" ?
                  <div>
                    <Nav tabs>
                      <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === "1" })} onClick={() => { this.toggleTab("1"); }} >
                          Bienes Activos
                      </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === "2" })} onClick={() => { this.toggleTab("2"); }} >
                          Bienes Inactivos
                      </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <ListGoods
                          confirm={this.props.confirm}
                          goods={this.props.goods.goodsEnabled}
                          queryOneBelongingFunction={this.props.queryOneBelongingFunction}
                          search={this.props.searchData}
                          disabledBelongingFunction={this.props.disabledBelongingFunction}
                          nextPage={this.props.nextPage}
                          backPage={this.props.backPage}
                          dataPagination={this.props.dataPagination}
                          rowPagination={this.props.rowPagination}
                          createTable={this.props.createTable}
                          loadTable={this.props.goods.loadTable}

                        />
                      </TabPane>

                      <TabPane tabId="2">
                        <ListGoodDisabled
                          confirm={this.props.confirm}
                          enabledBelongingFunction={this.props.enabledBelongingFunction}
                          goods={this.props.goods.goodsDisabled}
                          search={this.props.searchData}
                          nextPage={this.props.nextPage}
                          rowPagination={this.props.rowPagination}
                        />
                      </TabPane>
                    </TabContent>
                  </div> :
                  <div style={{ height: "60vh" }}>
                    <CircularProgress style={{ position: " absolute", height: 40, top: "45%", right: "50%", zIndex: 2 }} />
                  </div>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  goods: state.goods.toJS(),
  aplication: state.global,
  searchData: state.global.search
});

const mapDispatchToProps = dispatch => ({
  confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  search: (set) => dispatch(search(set)),
  queryAllBelongingFunction: () => dispatch(queryAllBelongingFunction()),
  queryOneBelongingFunction: (id, specifict_id) => dispatch(queryOneBelongingFunction(id, specifict_id)),
  enabledBelongingFunction: (data) => dispatch(enabledBelongingFunction(data)),
  disabledBelongingFunction: (data) => dispatch(disabledBelongingFunction(data)),
  nextPage: (data) => dispatch(nextPage(data)),
  backPage: (data) => dispatch(backPage(data)),
  dataPagination: (data) => dispatch(dataPagination(data)),
  rowPagination: (data) => dispatch(rowPagination(data)),
  createTable: (data) => dispatch(createTable(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodsContainer);
