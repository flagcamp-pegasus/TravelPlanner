import * as React from 'react';
import {API_KEY} from "../constants.js"
const { compose, withProps, withStateHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");


class MyMap extends React.Component{
    state = {
        isOpen: false,
    }

    onToggleOpen=()=>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
        return(
            <GoogleMap
                defaultZoom={5}
                defaultCenter={this.props.center}
            >
                <InfoBox
                    defaultPosition={new window.google.maps.LatLng(this.props.center.lat, this.props.center.lng)}
                    options={{ closeBoxURL: ``, enableEventPropagation: true }}
                >
                    <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                            Hello, Taipei!
                        </div>
                    </div>
                </InfoBox>
                <Marker
                    position={{ lat: 22.6273, lng: 120.3014 }}
                    onClick={this.onToggleOpen}
                >
                    {this.state.isOpen && <InfoBox
                        onCloseClick={this.onToggleOpen}
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
        )
    }
}


export const Test =  compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        center: { lat: 25.03, lng: 121.6 },
    }),
    withScriptjs,
    withGoogleMap
)(MyMap
);