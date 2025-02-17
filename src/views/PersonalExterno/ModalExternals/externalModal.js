import React from "react";
import { Button, Modal, ModalBody, ModalFooter, CardHeader } from "reactstrap";
import { data, selectOptions } from "../mockData";
import styled from "styled-components";
import Map from "./Map";
import Search from "../../../components/Select";
import { connect } from "react-redux";
import OutsideClick from "../../../components/OutsideClick";
import BodyModal from "./bodyModal";
import {
  AllMedicalOffices,
  allBranchsInformation,
  subcriptionRequest
} from "../../../actions/externalAction";
import Geocode from "react-geocode";
import CircularProgress from "@material-ui/core/CircularProgress";
import { filterDirectionExact, getIdMedicalCenter } from "../../../core/utils";

class ExternalModal extends React.Component {
  constructor(props) {
    super(props);
    Geocode.setApiKey("AIzaSyDwl7QwHKe7NFx28t-CbMDTUdQMFVrjEz4&callback");
    this.state = {
      selectedMarker: false,
      initialPosition: false,
      seleted: false,
      loading: "show"
    };
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const obj = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({ initialPosition: obj });
        Geocode.fromLatLng(obj.lat, obj.lng).then(res => {
          const array = res.results;
          filterDirectionExact(array, res => {
            this.props.AllMedicalOffices(res);
          });
        });
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
    this.setState({ loading: "show" });
    const obj = {
      id_medical: value.medical_center_id,
      branchoffices_id: value._id
    };
    this.props.allBranchsInformation(obj, () => {
      this.setState({ loading: "hide", seleted: true });
    });
  };

  mouseOver = value => {
    this.setState({ selectedMarker: value });
  };

  deletePosition = () => {
    this.setState({ selectedMarker: false });
  };

  handleSubmit = async () => {
    this.setState({ loading: "show" });

    const obj = {
      medical_id: this.props.selectedMarker.medical_center_id,
      branch_id: this.props.selectedMarker._id
    };
    this.props.subcriptionRequest(obj, () => {
      this.props.close();
    });
  };

  getBranchs = branchs => {
    if (!branchs) {
      return [];
    }
    return branchs.data;
  };

  render() {
    const { open, close } = this.props;
    const branchs = this.getBranchs(this.props.branchs);

    const result = this.props.searchData
      ? branchs.filter(branch => {
          return (
            branch.medical_center
              .toLowerCase()
              .includes(this.props.searchData) ||
            branch.name.toLowerCase().includes(this.props.searchData) ||
            branch.type.toLowerCase().includes(this.props.searchData)
          );
        })
      : branchs;

    return (
      <Modal isOpen={open} toggle={close} style={{ minWidth: "65%" }}>
        {this.state.loading === "show" && (
          <div
            align="center"
            className={"show"}
            style={{
              height: 320,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress />
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
                  markers={result}
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
              {this.state.seleted && this.props.selectedMarker && (
                <BodyModal
                  dataSelected={this.props.selectedMarker}
                  search={this.props.searchData}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={close}>
                Cancel
              </Button>
              <Button
                color="primary"
                disabled={!this.state.seleted}
                onClick={() => this.handleSubmit()}
              >
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
  branchs: state.external.get("allBranchs"),
  selectedMarker: state.external.get("selectedBranchs")
});

export default connect(
  mapStateToProps,
  { AllMedicalOffices, allBranchsInformation, subcriptionRequest }
)(ExternalModal);

const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  border-bottom: 1px solid;
  border-color: #c8ced3;
`;
