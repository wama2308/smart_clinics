import React, { Component } from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import styled from "styled-components";

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props => {
  console.log("marker", props.markers)
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
    >

      { props.markers.map((marker, i) => {
        const onClick = props.onClick.bind(this, marker);

        return (
          <Marker
            key={i}
            icon={{
              url:`${marker.logo}`,
              scaledSize: { width: 20, height: 20 }
            }}
            onClick={onClick}
            onMouseOver={()=>props.over(marker)}
            onMouseOut={props.deletePosition}
            position={{ lat: marker.lat, lng: marker.log }}
          >
            {props.selectedMarker.lat === marker.lat &&
              props.selectedMarker.lng === marker.lng && (
                <InfoWindow>
                  <div>
                    <h4 style={{ borderBottom: "1px solid #eadfd1" }}>
                      {marker.name}
                    </h4>
                    <br />
                    <div style={{ paddingBottom: 20 }}>
                      {marker.description}
                    </div>
                  </div>
                </InfoWindow>
              )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default MapWithAMarker;
