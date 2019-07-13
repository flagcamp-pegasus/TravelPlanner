import * as React from 'react';
import {API_KEY} from "../constants.js"
import {MyMarker} from "./MyMarker"

const { compose, withProps, withStateHandlers, lifecycle } = require("recompose");
const {
    Polyline,
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
    GoogleMap: GoogleMapPath,
} = require("react-google-maps");
const {DrawingManager} = require("react-google-maps/lib/components/drawing/DrawingManager");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const _ = require("lodash");

export const DrawPath = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
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
                        markers: nextMarkers,
                    });
                    // state.center is center of map by searchbox
                    refs.map.fitBounds(bounds);
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>{
    let {latlng, name}=props.city
    let path = props.path.map(
        (spot) => (spot.latlng)
    )
    // console.log(latlng, name)
    return (
        <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={2}
            onBoundsChanged={props.onBoundsChanged}
            center={latlng}
        >
        <GoogleMapPath
            defaultZoom={8}
            // defaultCenter={new window.google.maps.LatLng(-34.397, 150.644)}
            // center = {new window.google.maps.LatLng(props.path[0].lat, props.path[0].lng)}
            center={latlng}
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
            {/*marker from searchbox*/}
            {props.markers.map((marker, index) =>
                <Marker key={index} position={marker.position} options={{icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}}/>
            )}
            <Polyline
                path={path}
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
            {props.path.map((spot)=>(
                <MyMarker coor = {spot.latlng} key = {spot.place_id} name = {spot.name}/>
            ))}
            {/*{props.path.map(*/}
            {/*    (spot) => {*/}
            {/*        props.activebox.add(spot.place_id)*/}
            {/*        // console.log(props.activekeys.has(spot.place_id))*/}
            {/*        return (*/}
            {/*        <Marker*/}
            {/*            key={spot.place_id}*/}
            {/*            position={spot.latlng}*/}
            {/*            onClick={()=>props.onToggleOpen(spot.place_id)}*/}
            {/*        >*/}
            {/*            {props.activebox.has(spot.place_id) &&*/}
            {/*            <InfoWindow*/}
            {/*                onCloseClick={()=>props.onToggleOpen(spot.place_id)}*/}
            {/*            >*/}
            {/*                <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `3px` }}>*/}
            {/*                    <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>*/}
            {/*                        {spot.name}*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </InfoWindow>}*/}
            {/*        </Marker>*/}
            {/*    )}*/}
            {/*)}*/}
        </GoogleMapPath>
        </GoogleMap>
    )
}
);
