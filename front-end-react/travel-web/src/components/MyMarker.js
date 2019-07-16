import * as React from 'react';
import {API_KEY} from "../constants.js"
const { compose } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    InfoWindow,
    Marker,
} = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

export class MyMarker extends React.Component{
    state = {
        isOpen: true
    }

    onToggleOpen= () => {
        this.setState(({isOpen})=>({isOpen: !isOpen}))
    }

    render(){
        return(
            <Marker
                position={this.props.coor}
                onClick={this.onToggleOpen}
            >
            {this.state.isOpen
            && <InfoWindow onCloseClick={this.onToggleOpen}>
                    <div style={{ backgroundColor: `white`, padding: `3px` }}>
                        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                            {this.props.name}
                        </div>
                    </div>
                </InfoWindow>}
            </Marker>
        )
    }
}