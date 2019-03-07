import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, withState, withHandlers } from 'react-google-maps'

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDwl7QwHKe7NFx28t-CbMDTUdQMFVrjEz4&callback=initMap",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
 
  withScriptjs,
  withGoogleMap,
)((props) =>
  <GoogleMap
    onClick={props.handleClickmap}
 

   defaultZoom={props.zoom}
   zoom={props.zoom}
   
   ref={(map) =>
    map && 
    map.panTo({lat: props.currentLocation.lat, lng: props.currentLocation.lng})}
    defaultCenter={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}

  >
{props.isMarkerShown && <Marker 

  position={{ lat: props.lat, lng: props.lng }} 
  onClick={props.onMarkerClick} />}
  </GoogleMap>
)


export default MapComponent