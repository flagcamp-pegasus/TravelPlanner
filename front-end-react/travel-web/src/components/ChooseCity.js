import React from 'react';
import {LocateCity} from './GoogleMapCity'
import {CityList} from "./CityList"
import { Link, withRouter  } from 'react-router-dom'

// let city={lat:47.608013, lng:-122.335167}
// chicago for test

class City extends React.Component{
    state={
        path: [],
        latlng: {lat: 51.506155, lng: -0.127824},
        page: 0,
        name: "London"
    }

    getPage = (curPage, cityName, cityLatLng) => {
        this.setState({page: curPage});
        this.setState({name: cityName});
        this.setState({latlng: cityLatLng});
    }

    // zoomToCity = ()=>{
    //     this.setState({latlng: city})
    // }

    plan = ()=>{
        this.props.history.push({
            pathname: `/plan`,
            state : {city: this.state}
        })
    }

    render(){
        // console.log(this.props.city)
        return(
            <div>
                <CityList getPage={this.getPage}/>
                {/*<button onClick={this.zoomToCity}>Locate City</button>*/}
                <LocateCity latlng={this.state.latlng} name = {this.state.name}/>
                {/*<NavLink to="/plan">Contact</NavLink>*/}
                <button onClick={this.plan}>Plan now!</button>
                {/*<Link to={{*/}
                {/*    pathname: '/plan',*/}
                {/*    state: { detail: "axx" }*/}
                {/*}}> Plan now! </Link>*/}
            </div>
        )
    }
}

export const ChooseCity = withRouter(City)