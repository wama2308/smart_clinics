import React, { Component } from 'react';
import ListBedrooms from '../views/Bedrooms/ListBedrooms';
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
import {
  loadBedroomsFunction,
  queryOneBedroomsFunction,
  disabledBedroomsFuntion,
  enabledBedrooms,
  enabledBedroomsFunction,
  collapseFunction,
  actionStop,
  queryBedroomsBelongingsFunction,
  setType,
  nextPage,
  rowPagination
} from '../actions/bedroomsActions';
import { openConfirmDialog, search } from '../actions/aplicantionActions';
import ListDisabledBedrooms from '../views/Bedrooms/ListDisabledBedrooms';

class BedroomsContainer extends Component {
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
    }
  }

  componentDidMount() {
    this.props.loadBedroomsFunction()
    this.setState({
      loading: "hide"
    })
  }

  componentWillReceiveProps(props) {
    if (props.bedrooms) {
      this.setState({
        loading: "show"
      })
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Espacios</CardHeader>
              <CardBody>
                {this.state.loading === "show" ?
                  <div>
                    <Nav tabs>
                      <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                          Espacios Activos
                    </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                          Espacios Inactivos
                    </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <ListBedrooms
                          bedrooms={this.props.bedrooms.bedroomsEnabled}
                          queryOneBedroomsFunction={this.props.queryOneBedroomsFunction}
                          type_bedrooms={this.props.type_bedrooms}
                          status_room={this.props.status_room}
                          confirm={this.props.confirm}
                          disabledBedroomsFuntion={this.props.disabledBedroomsFuntion}
                          type_consulting_room={this.props.type_consulting_room}
                          search={this.props.searchData}
                          setSearch={this.props.search}
                          collapseFunction={this.props.collapseFunction}
                          action={this.props.bedrooms.action}
                          actionStop={this.props.actionStop}
                          queryBedroomsBelongingsFunction={this.props.queryBedroomsBelongingsFunction}
                          setType={this.props.setType}
                          nextPage={this.props.nextPage}
                          rowPagination={this.props.rowPagination}
                        />
                      </TabPane>

                      <TabPane tabId="2">
                        <ListDisabledBedrooms
                          enabledBedroomsFunction={this.props.enabledBedroomsFunction}
                          confirm={this.props.confirm}
                          bedrooms={this.props.bedrooms.bedroomsDisabled}
                          nextPage={this.props.nextPage}
                          rowPagination={this.props.rowPagination}
                          search={this.props.searchData}
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
  bedrooms: state.bedrooms.toJS(),
  type_bedrooms: state.global.dataGeneral.dataGeneral.type_bedrooms,
  status_room: state.global.dataGeneral.dataGeneral.status_room,
  type_consulting_room: state.global.dataGeneral.dataGeneral.type_consulting_room,
  searchData: state.global.search
});

const mapDispatchToProps = dispatch => ({
  loadBedroomsFunction: () => dispatch(loadBedroomsFunction()),
  queryOneBedroomsFunction: (data) => dispatch(queryOneBedroomsFunction(data)),
  confirm: (message, callback) => dispatch(openConfirmDialog(message, callback)),
  disabledBedroomsFuntion: (data) => dispatch(disabledBedroomsFuntion(data)),
  enabledBedroomsFunction: (data) => dispatch(enabledBedroomsFunction(data)),
  search: (set) => dispatch(search(set)),
  collapseFunction: (id, type) => dispatch(collapseFunction(id, type)),
  actionStop: (data) => dispatch(actionStop(data)),
  queryBedroomsBelongingsFunction: (data) => dispatch(queryBedroomsBelongingsFunction(data)),
  setType: (data) => dispatch(setType(data)),
  nextPage: (data) => dispatch(nextPage(data)),
  rowPagination: (data) => dispatch(rowPagination(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BedroomsContainer);
