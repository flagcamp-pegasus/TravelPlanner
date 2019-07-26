import React from 'react';
import {LocateCity} from './GoogleMapCity'
import {CityList} from "./CityList"
import {withRouter  } from 'react-router-dom'
import {CITY_ZOOM} from "../constants.js"
import {Button} from "antd"
// let city={lat:47.608013, lng:-122.335167}
// chicago for test

class City extends React.Component{
    state={
        path: [],
        latlng: {lat: 51.506155, lng: -0.127824},
        page: 0,
        name: "London"
    }

    setSelectCity = (curPage, cityName, cityLatLng) => {
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
        console.log("Selected City: ", this.state.name)
        return(
            <div>
                <div className="container">
                    <CityList setSelectCity={this.setSelectCity} city={this.state}/>
                    {/*<button onClick={this.zoomToCity}>Locate City</button>*/}
                    <LocateCity latlng={this.state.latlng} name = {this.state.name} zoom={CITY_ZOOM}/>
                </div>
                {/*<NavLink to="/plan">Contact</NavLink>*/}
                <Button type="primary" htmlType="submit" onClick={this.plan}>Plan Now !</Button>
                {/*<button onClick={this.plan}>Plan now!</button>*/}
            </div>
        )
    }
}

export const ChooseCity = withRouter(City)