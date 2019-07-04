import React from 'react';
import { Spots } from './Spots';
import {DrawPath} from './GoogleMapPath.js'
import { Link } from 'react-router-dom';

let flightPlanCoordinates = [
    {lat:39.913818, lng:116.363625},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
];


export class Plan extends React.Component{
    state={path:[]}

    generateRoute = ()=>{
        this.setState({path: flightPlanCoordinates})
    }

    render(){
        return(
            <div>
                <button onClick={this.generateRoute}>Generate Route</button>
                <DrawPath path={this.state.path}/>
                <Spots/>
            </div>
        )
    }
}