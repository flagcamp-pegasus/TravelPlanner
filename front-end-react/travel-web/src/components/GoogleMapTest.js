import * as React from 'react';
import {API_KEY} from "../constants.js"
// googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,

const { compose, withProps, withStateHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    OverlayView,
} = require("react-google-maps");

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
})

export const Test = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement:<div style={{ height: `100%` }} />,
        containerElement:<div style={{ height: `400px` }} />,
        mapElement:<div style={{ height: `100%` }} />,
        }
    ),
    withStateHandlers(() => ({
        count: 0,
    }), {
        onClick: ({ count }) => () => ({
            count: count + 1,
        })
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        <OverlayView
            position={{ lat: -34.397, lng: 150.644 }}
            /*
             * An alternative to specifying position is specifying bounds.
             * bounds can either be an instance of google.maps.LatLngBounds
             * or an object in the following format:
             * bounds={{
             *    ne: { lat: 62.400471, lng: -150.005608 },
             *    sw: { lat: 62.281819, lng: -150.287132 }
             * }}
             */
            /*
             * 1. Specify the pane the OverlayView will be rendered to. For
             *    mouse interactivity, use `OverlayView.OVERLAY_MOUSE_TARGET`.
             *    Defaults to `OverlayView.OVERLAY_LAYER`.
             */
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            /*
             * 2. Tweak the OverlayView's pixel position. In this case, we're
             *    centering the content.
             */
            getPixelPositionOffset={getPixelPositionOffset}
            /*
             * 3. Create OverlayView content using standard React components.
             */
        >
            <div style={{ background: `white`, border: `1px solid #ccc`, padding: 15 }}>
                <h1>OverlayView</h1>
                <button onClick={props.onClick} style={{ height: 60 }}>
                    I have been clicked {props.count} time{props.count > 1 ? `s` : ``}
                </button>
            </div>
        </OverlayView>
    </GoogleMap>
);
