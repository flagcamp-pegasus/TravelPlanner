import * as React from 'react';
import {API_KEY} from "../constants.js"
const { compose, withProps, withStateHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

export const Test = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        center: { lat: 25.03, lng: 121.6 },
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
)(props =>
    <GoogleMap
        defaultZoom={5}
        defaultCenter={props.center}
    >
        {/*<InfoBox*/}
        {/*    defaultPosition={new window.google.maps.LatLng(props.center.lat, props.center.lng)}*/}
        {/*    options={{ closeBoxURL: ``, enableEventPropagation: true }}*/}
        {/*>*/}
        {/*    <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>*/}
        {/*        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>*/}
        {/*            Hello, Taipei!*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</InfoBox>*/}
        <Marker
            position={{ lat: 22.6273, lng: 120.3014 }}
            onClick={props.onToggleOpen}
        >
            {props.isOpen && <InfoBox
                onCloseClick={props.onToggleOpen}
                options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
                <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                    <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                        Hello, Kaohsiung!
                    </div>
                </div>
            </InfoBox>}
        </Marker>
    </GoogleMap>
);