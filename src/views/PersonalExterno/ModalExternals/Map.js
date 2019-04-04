import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={13} defaultCenter={{lat: 9.891661, lng: -67.354302 }}>
      {props.markers.map((marker, i ) => {
        console.log("0", props.selectedMarker === marker , "1", props.selectedMarker ,"2", marker )
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={i}
            icon={{url:'https://i.pinimg.com/originals/7f/9b/9a/7f9b9a39639b9ca8bb6f1cba6e35d041.png',
            scaledSize:{ width: 20 , height: 20 }
          }}
            onClick={onClick}
            onMouseOver={onClick}
            position={{ lat: marker.lat, lng: marker.lng }}
          >
            {(props.selectedMarker.lat === marker.lat) && (props.selectedMarker.lng === marker.lng)&&
              <InfoWindow>
                <div>
                   as clicked here
                </div>
              </InfoWindow>
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default MapWithAMarker

