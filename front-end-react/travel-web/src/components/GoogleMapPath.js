import * as React from 'react';
import {API_KEY} from "../constants.js"
const { compose, withProps } = require("recompose");
const {
    Polyline,
    withScriptjs,
    withGoogleMap,
    GoogleMap: GoogleMapPath,
} = require("react-google-maps");
const {DrawingManager} = require("react-google-maps/lib/components/drawing/DrawingManager");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");


export const DrawPath = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props =>(
    <GoogleMapPath
        defaultZoom={3}
        defaultCenter={new window.google.maps.LatLng(-34.397, 150.644)}
        // center = {new window.google.maps.LatLng(props.path[0].lat, props.path[0].lng)}
    >
        <Polyline
            path={props.path}
            defaultOptions={{
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                icons: [{
                    icon: {
                        path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                    },
                    offset: '100%'
                }],
            }}
        />
    </GoogleMapPath>
    )

);
