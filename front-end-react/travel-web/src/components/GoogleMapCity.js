import * as React from 'react';
import {KEY} from "./Const.js"
const { compose, withProps, withStateHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");

export const LocateCity = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
        })
    }),
    withScriptjs,
    withGoogleMap
)((props) =>{
    return(
    <GoogleMap
        defaultZoom={8}
        center={props.latlng}
    >
        <Marker
            position={props.latlng}
            // onClick={props.onToggleOpen}
        >
            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>

            </InfoWindow>}
        </Marker>
    </GoogleMap>
    )}
);