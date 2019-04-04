import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Map from "./Map";

class ExternalModal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selectedMarker:false
    }
  }
  handleClick = value => {
    this.setState({selectedMarker: value})
  };

  render() {
    const { open, close } = this.props;
    const data = [
      { lat: 9.910057492847013, lng: -67.36354452596436, logo:'https://i.pinimg.com/originals/7f/9b/9a/7f9b9a39639b9ca8bb6f1cba6e35d041.png'   },
      { lat: 9.907373018724995, lng: -67.37723452077637, logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Coca-Cola_bottle_cap.svg/1200px-Coca-Cola_bottle_cap.svg.png' },
      { lat: 9.923458397094366, lng: -67.34097105489502, logo:'https://www.rioshopping.com/-/media/images/b2c/spain/valladolid/logo-stores/logos-nuevos-redimensionados/movistar_410x282.png?h=282&la=es-ES&mw=650&w=410&hash=412B7DD5082105C7BFA7334CCA738A7DAA0D1B13' },
      { lat: 9.89830482956145, lng: -67.35015493856201, logo:'https://pbs.twimg.com/profile_images/936720559957774342/w9pjw8nh_400x400.jpg' },
      { lat: 9.926417513421839, lng: -67.3476658485962, logo:'https://media.licdn.com/dms/image/C4E0BAQHbbG0eOfaDJA/company-logo_200_200/0?e=2159024400&v=beta&t=LmRMbEZO-0DlOGTCQm5br9xN_TFDVK2rsc8vv_TLmck' },
      { lat: 9.923469352924165, lng: -67.37631105408468, logo:'https://pbs.twimg.com/ext_tw_video_thumb/1067239661901205510/pu/img/41oJ_QPgGoshk2du.jpg' }
    ];
    return (
      <Modal isOpen={open} toggle={close} style={{ minWidth: "65%" }}>
        <ModalHeader toggle={close}>Modal title</ModalHeader>
        <ModalBody>
          <Map
            selectedMarker={this.state.selectedMarker}
            markers={data}
            onClick={this.handleClick}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwl7QwHKe7NFx28t-CbMDTUdQMFVrjEz4&callback=initMap"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={close}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => alert("save")}>
            enviar Peticion
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ExternalModal;
