import React, { Component } from "react";
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
import { connect } from "react-redux";
import ListConfigComisiones from "../views/Comisiones/ListConfigComisiones";
import ListConfigComisionesDisabled from "../views/Comisiones/ListConfigComisionesDisabled";
import { 
  LoadConfigCommissionsFunction, 
  DeleteConfigCommissionsAction, 
  enableConfigCommissionsAction, 
  LoadConfigCommissionIdFunction } 
from "../actions/CommissionsActions";
import { openConfirmDialog } from "../actions/aplicantionActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import classnames from "classnames";

class ConfigComisionesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount = () => {
    this.props.LoadConfigCommissionsFunction();
  };  

  render() {   
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Reglas para Comisiones</CardHeader>
              <CardBody>                              
              {
                this.props.configCommissions.loading === 'hide' ?
                  <div>
                    <Nav tabs>
                      <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }} >
                              Reglas para Comisiones
                          </NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }} >
                              Reglas para Comisiones Inactivas
                          </NavLink>
                      </NavItem>                        
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <ListConfigComisiones 
                          confirm={this.props.confirm}
                          data={this.props.configCommissions.data}
                          DeleteConfigCommissionsAction={this.props.DeleteConfigCommissionsAction}                          
                          LoadConfigCommissionIdFunction={this.props.LoadConfigCommissionIdFunction}     
                          current_simbol={this.props.aplication.dataGeneral.dataCountries.current_simbol}
                        />
                      </TabPane>
                      <TabPane tabId="2">
                        <ListConfigComisionesDisabled 
                          confirm={this.props.confirm}                      
                          data={this.props.configCommissions.data}                          
                          enableConfigCommissionsAction={this.props.enableConfigCommissionsAction}  
                          current_simbol={this.props.aplication.dataGeneral.dataCountries.current_simbol}                                                  
                        />      
                      </TabPane>                          
                    </TabContent>
                  </div>
                :
                <div style={{height: "60vh"}}>
                  <CircularProgress style={{position: " absolute", height: 40, top: "45%", right: "50%",zIndex: 2}} />
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
  configCommissions: state.configCommissions.toJS(),
  authData: state.auth,
  aplication: state.global
});

const mapDispatchToProps = dispatch => ({
  LoadConfigCommissionsFunction: () => dispatch(LoadConfigCommissionsFunction()),  
  DeleteConfigCommissionsAction: (id) => dispatch(DeleteConfigCommissionsAction(id)),  
  enableConfigCommissionsAction: (id) => dispatch(enableConfigCommissionsAction(id)),  
  LoadConfigCommissionIdFunction: (id) => dispatch(LoadConfigCommissionIdFunction(id)),  
  confirm: (message, callback) =>dispatch(openConfirmDialog(message, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigComisionesContainer);


