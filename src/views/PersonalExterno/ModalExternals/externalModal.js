import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  CardHeader,
} from "reactstrap";
import { data, selectOptions } from "../mockData";
import styled from "styled-components";
import Map from "./Map";
import Search from "../../../components/Select";
import { connect } from "react-redux";
import OutsideClick from "../../../components/OutsideClick";
import BodyModal from "./bodyModal";
import { AllMedicalOffices } from "../../../actions/externalAction";

class ExternalModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: false,
      initialPosition: false,
      seleted: false,
      loading: "show"
    };
  }

  componentDidMount = () => {
    this.props.AllMedicalOffices();
    navigator.geolocation.getCurrentPosition(
      position => {
        const obj = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.setState({ initialPosition: obj });
      },
      error => {
        console.log("this error", error);
      }
    );
  };

  componentWillReceiveProps = props => {
    props.branchs ? this.setState({ loading: props.branchs.loading }) : null;
  };

  handleClick = value => {
    this.setState({ seleted: true });
  };

  mouseOver = value => {
    this.setState({ selectedMarker: value });
  };

  deletePosition = () => {
    this.setState({ selectedMarker: false });
  };

  render() {
    const { open, close } = this.props;
    return (
      <Modal isOpen={open} toggle={close} style={{ minWidth: "65%" }}>
        {this.state.loading === "show" && (
          <div align="center" className={"show"} style={{ padding: "5%" }}>
            <img src="assets/loader.gif" width="30%" />
          </div>
        )}
        {this.state.loading === "hide" && (
          <div>
            <HeaderModal>
              <h5 style={{ margin: 0 }}> Modal title </h5>
              <div style={{ width: "40%" }}>
                {!this.state.seleted && (
                  <OutsideClick>
                    <Search options={selectOptions} />
                  </OutsideClick>
                )}
              </div>
              {this.state.seleted && (
                <div>
                  <Button
                    color="success"
                    onClick={() => this.setState({ seleted: false })}
                  >
                    New location
                  </Button>
                </div>
              )}
            </HeaderModal>
            <ModalBody style={{ padding: 0 }}>
              {!this.state.seleted && (
                <Map
                  selectedMarker={this.state.selectedMarker}
                  markers={this.props.branchs.data}
                  location={this.state.initialPosition}
                  over={this.mouseOver}
                  onClick={this.handleClick}
                  deletePosition={this.deletePosition}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwl7QwHKe7NFx28t-CbMDTUdQMFVrjEz4&callback=initMap"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `500px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              )}
              {this.state.seleted && (
                <BodyModal dataSelected={this.state.selectedMarker} />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={close}>
                Cancel
              </Button>
              <Button color="primary" onClick={() => alert("save")}>
                Enviar peticion
              </Button>
            </ModalFooter>
          </div>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  searchData: state.global.search,
  branchs: state.external.get("allBranchs")
});

export default connect(
  mapStateToProps,
  { AllMedicalOffices }
)(ExternalModal);

const HeaderCard = styled(CardHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`;

const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  border-bottom: 1px solid;
  border-color: #c8ced3;
`;
