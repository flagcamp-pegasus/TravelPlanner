import * as React from 'react';
import {API_KEY} from "../constants.js";
import {MyMarker} from "./MyMarker"
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


class MyMap extends React.Component{
    componentWillMount() {
        const refs = {}

        this.setState({
            bounds: null,
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
    }

    render(){
        return(
            <div  className="citymap" >
            <GoogleMap
                ref={this.state.onMapMounted}
                defaultZoom={this.props.zoom}
                onBoundsChanged={this.state.onBoundsChanged}
                center = {this.props.latlng}
            >
                <SearchBox
                    ref={this.state.onSearchBoxMounted}
                    bounds={this.state.bounds}
                    controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                    onPlacesChanged={this.state.onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="search"
                        className="input"
                    />
                </SearchBox>
                {/*marker from searchbox*/}
                {this.state.markers.map((marker, index) =>
                    <Marker key={index} position={marker.position} options={{icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}}/>
                )}
                <MyMarker coor = {this.props.latlng} name = {this.props.name}/>
            </GoogleMap>
            </div>
        )
    }
}


export const LocateCity =  compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(MyMap);