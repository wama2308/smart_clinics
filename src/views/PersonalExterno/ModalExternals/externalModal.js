import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import { data, selectOptions } from "./mockData";
import styled from "styled-components";
import Map from "./Map";
import Search from "../../../components/Select";
import Body from "./bodyModal";
import { search } from "../../../actions/aplicantionActions";
import { connect } from "react-redux";

class ExternalModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: false,
      initialPosition: false,
      seleted: false
    };
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const obj = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      this.setState({ initialPosition: obj });
    });
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
        <HeaderModal >
          <h5 style={{ margin: 7 }}> Modal title </h5>
          <Search
            options={selectOptions}
            searchAtion={this.props.search}
            value={this.props.searchData}
          />
        </HeaderModal>
        <ModalBody>
          {!this.state.seleted && (
            <Map
              selectedMarker={this.state.selectedMarker}
              markers={data}
              location={this.state.initialPosition}
              over={this.mouseOver}
              onClick={this.handleClick}
              deletePosition={this.deletePosition}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwl7QwHKe7NFx28t-CbMDTUdQMFVrjEz4&callback=initMap"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
          {this.state.seleted && (
            <Card style={{ height: 400 }}>
              <HeaderCard>
                <div>Informacion del centro medico</div>

                <div>
                  <Button
                    color="success"
                    onClick={() => this.setState({ seleted: false })}
                  >
                    Location
                  </Button>
                </div>
              </HeaderCard>
              <CardBody>
                <Body />
              </CardBody>
            </Card>
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
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  searchData: state.global.search
});

export default connect(
  mapStateToProps,
  { search }
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
