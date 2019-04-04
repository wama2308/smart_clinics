import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import styled from 'styled-components'

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={13} defaultCenter={{lat: 9.891661, lng: -67.354302 }}>
      {props.markers.map((marker, i ) => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={i}
            icon={{url:`${marker.logo}`,
            scaledSize:{ width: 20 , height: 20 }
          }}
            onClick={onClick}
            onMouseOver={onClick}
            onMouseOut={props.deletePosition}
            position={{ lat: marker.lat, lng: marker.lng }}
          >
            {(props.selectedMarker.lat === marker.lat) && (props.selectedMarker.lng === marker.lng)&&
              <InfoWindow>
                <div>
                  <h4 style={{borderBottom:'1px solid #eadfd1' }}>{marker.title}</h4>
                   <br/>
                  <div style={{paddingBottom:20}}>{marker.description}</div>
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


