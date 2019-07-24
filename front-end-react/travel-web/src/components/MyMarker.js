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
        isOpen: false
    }

    onToggleOpen= () => {
        this.setState(({isOpen})=>({isOpen: !isOpen}))
    }

    render(){
        return(
            <Marker
                position={this.props.coor}
                onClick={this.onToggleOpen}
                icon={this.props.icon}
            >
            {this.state.isOpen
            && <InfoWindow onCloseClick={this.onToggleOpen}>
                    <div style={{ backgroundColor: this.props.color ? this.props.color : `white`,
                        padding: this.props.padding ? this.props.padding : `3px` }}>
                        <div style={{ fontSize: this.props.fontSize ? this.props.fontSize : `16px`, fontColor: this.props.fontColor ? this.props.fontColor : `#08233B` }}>
                            {this.props.name}
                        </div>
                    </div>
                </InfoWindow>}
            </Marker>
        )
    }
}