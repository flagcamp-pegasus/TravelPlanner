import React from 'react';
import {LocateCity} from './GoogleMapCity'
import { Link, withRouter  } from 'react-router-dom'

let city={lat:47.608013, lng:-122.335167}

export class ChooseCity extends React.Component{
    state={path:[], latlng:{lat:0, lng:0}}
    zoomToCity = ()=>{
        this.setState({latlng: city})
    }

    render(){
        return(
            <div>
                <button onClick={this.zoomToCity}>Locate City</button>
                <LocateCity latlng={this.state.latlng}/>
                {/*<NavLink to="/plan">Contact</NavLink>*/}
                {/*<button onClick={this.plan}>Plan now!</button>*/}
            </div>
        )
    }
}