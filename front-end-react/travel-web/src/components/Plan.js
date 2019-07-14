import React from 'react';
import { Spots } from './Spots';
import {DrawPath} from './GoogleMapPath.js'
import { Link } from 'react-router-dom';
import {PATH_ZOOM} from "../constants.js"

let spotsPlan = [
    {latlng: {lat:34.0195, lng:-118.4912}, name: "Santa Monica", place_id:0},
    {latlng: {lat:33.8121, lng:-117.9190}, name: "Disneyland Park", place_id:1},
    {latlng: {lat:34.0623, lng:-118.2383}, name: "Chinatown", place_id: 2},
    {latlng: {lat:34.1184, lng:-118.3004}, name: "Griffith Observatory",place_id:3},
];


export class Plan extends React.Component{
    state={path:[]}

    generateRoute = ()=>{
        this.setState((state)=>({path: spotsPlan}))
    }

    removeRoute = ()=>{
        this.setState((state)=>({path:[]}))
    }

    render(){
        // console.log(this.props.city)
        return(
            <div>
                <button onClick={this.generateRoute}>Generate Route</button>
                <button onClick={this.removeRoute}>Remove Route</button>
                <DrawPath path={this.state.path} city = {this.props.city} zoom={PATH_ZOOM}/>
                <Spots/>
            </div>
        )
    }
}