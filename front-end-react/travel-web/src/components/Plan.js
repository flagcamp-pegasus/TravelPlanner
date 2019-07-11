import React from 'react';
import { Spots } from './Spots';
import {DrawPath} from './GoogleMapPath.js'
import { Link } from 'react-router-dom';

let spotsPlan = [
    {lat:34.0195, lng:-118.4912, name: "Santa Monica"},
    {lat:33.8121, lng:-117.9190, name: "Disneyland Park"},
    {lat:34.0623, lng:-118.2383, name: "Chinatown"},
    {lat:34.1184, lng:-118.3004, name: "Griffith Observatory"},
];


export class Plan extends React.Component{
    state={path:[]}

    generateRoute = ()=>{
        this.setState({path: spotsPlan})
    }

    removeRoute = ()=>{
        this.setState({path:[]})
    }

    render(){
        console.log(this.props.city)
        return(
            <div>
                <button onClick={this.generateRoute}>Generate Route</button>
                <button onClick={this.removeRoute}>Remove Route</button>
                <DrawPath path={this.state.path} city = {this.props.city}/>
                <Spots/>
            </div>
        )
    }
}