import * as React from 'react';
import {API_KEY} from "../constants.js"

const { compose, withProps, withStateHandlers, lifecycle } = require("recompose");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const _ = require("lodash");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");

const Map = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
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

    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                bounds: null,
                // center: {
                //     lat: 41.9, lng: -87.624
                // },
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        // center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();

                    const bounds = new window.google.maps.LatLngBounds();
                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });

                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));

                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                    });
                    refs.map.fitBounds(bounds);
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(
    (props) =>{
    return(
    <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={2}
        onBoundsChanged={props.onBoundsChanged}
        center={props.center}
        // defaultCenter={props.center}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Customized your placeholder"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    marginTop: `27px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </SearchBox>
        {/*{props.markers.map((marker, index) =>*/}
            {/*<Marker key={index}*/}
                    {/*position={props.latlng ? props.latlng : marker.position}*/}
                    {/*onClick={props.onToggleOpen}*/}
            {/*>*/}
                {/*{props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>*/}
                {/*</InfoWindow>}*/}
            {/*</Marker>*/}
        {/*)}*/}
        <Marker
            position={props.latlng}
            onClick={props.onToggleOpen}
        >
            {props.isOpen && <InfoWindow
                onCloseClick={props.onToggleOpen}>
                <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
                    <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                        {props.name}
                    </div>
                </div>
            </InfoWindow>}
        </Marker>
    </GoogleMap>
    )}
);

export class LocateCity extends React.Component{
    render() {
        return(
            <Map
                latlng = {this.props.latlng}
                center = {this.props.latlng}
                name = {this.props.name}
                // isMarkerShown={this.state.isMarkerShown}
                // onMarkerClick={this.handleMarkerClick}
            />
        )
    }

}