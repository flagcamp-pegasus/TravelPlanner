import React from 'react';
import { API_KEY } from "../constants";

const { compose, withProps, lifecycle } = require("recompose");
const {
    withScriptjs,
} = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

class MySearchBar extends React.Component {
    componentWillMount() {
        const refs = {}

        this.setState({
            places: [],
            onSearchBoxMounted: ref => {
                refs.searchBox = ref;
            },
            onPlacesChanged: () => {
                const places = refs.searchBox.getPlaces();
                this.setState({
                    places,
                });
             },
        })
    }

    componentDidUpdate(prevProps, prevState) {
        this.state.places.map(({name, geometry: { location }}) => {
            let latlng = {lat: location.lat(), lng: location.lng()}
            this.props.setSelectCity(undefined, name, latlng)}
        )
    }

    render () {
        return (
            <div data-standalone-searchbox="">
                <StandaloneSearchBox
                    ref={this.state.onSearchBoxMounted}
                    bounds={this.state.bounds}
                    onPlacesChanged={this.state.onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Search Other City"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                        }}
                    />
                </StandaloneSearchBox>
                {/*<ol>*/}
                {/*{this.state.places.map(({ place_id, formatted_address, name, geometry: { location } }) =>*/}
                    {/*<li key={place_id}>*/}
                    {/*{formatted_address}*/}
                    {/*{" at "}*/}
                    {/*({location.lat()}, {location.lng()})*/}
                    {/*{" name is "}*/}
                    {/*{name}*/}
                    {/*</li>*/}
                {/*)}*/}
                {/*</ol>*/}
            </div>
        )
    }
}

export const CitySearchBar = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    withScriptjs
)(MySearchBar);

// reference : https://tomchentw.github.io/react-google-maps/#searchbox