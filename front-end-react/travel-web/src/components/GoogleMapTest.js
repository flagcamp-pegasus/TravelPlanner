import React from 'react';
import {API_FEE_KEY} from "../charge";
const { compose, withProps, lifecycle } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} = require("react-google-maps");

class Map extends React.Component{
    state={
        directions: null,
    }

    componentDidMount() {
        const DirectionsService = new window.google.maps.DirectionsService();
        DirectionsService.route({
            origin: new window.google.maps.LatLng(41.8507300, -87.6512600),
            destination: new window.google.maps.LatLng(41.8525800, -87.6514100),
            travelMode: window.google.maps.TravelMode.DRIVING,
            waypoints:[
                {location:{lat: 41.8517300, lng:-87.6513600}, stopover:true}
                ]
        }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }

    render(){
        return(
            <GoogleMap
                defaultZoom={7}
                defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}
            >
                {<DirectionsRenderer
                    key={0}
                    directions={this.state.directions}
                    options={{
                        markerOptions:{visible:false},
                        // polylineOptions:{strokeColor: "red"}
                    }}
                />}
            </GoogleMap>
        )
    }
}

export const Test = withScriptjs(withGoogleMap(Map));
