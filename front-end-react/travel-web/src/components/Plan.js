import React from 'react';
import {DrawPath} from './GoogleMapPath.js'
import { Link } from 'react-router-dom';
import {PATH_ZOOM, API_KEY} from "../constants.js"
import {API_FEE_KEY} from '../charge';

import {Attractions} from './Attractions';
import {OverviewButton} from './OverviewButton';
import { Layout, Breadcrumb, Menu, Dropdown, Icon, message, Button } from "antd";
import { SpotsList } from './SpotsList';
import PubSub from 'pubsub-js';
import smartPost from 'react-smart-post';
import {API_ROOT, USER_ID} from "../constants"
// let spotsPlan = [
//     {latlng: {lat:34.0195, lng:-118.4912}, name: "Santa Monica", place_id:0},
//     {latlng: {lat:33.8121, lng:-117.9190}, name: "Disneyland Park", place_id:1},
//     {latlng: {lat:34.0623, lng:-118.2383}, name: "Chinatown", place_id: 2},
//     {latlng: {lat:34.1184, lng:-118.3004}, name: "Griffith Observatory",place_id:3},
// ];

// let spotsPlan = [
//     {latlng: {lat:34.0195, lng:-118.4912}, 
//         name: "Santa Monica", 
//         // place_id: 0
//     },
//     {latlng: {lat:33.8121, lng:-117.9190}, 
//         name: "Disneyland Park", 
//         // place_id: 1
//     },
//     {latlng: {lat:34.0623, lng:-118.2383}, 
//         name: "Chinatown", 
//         // place_id: 2
//     },
//     {latlng: {lat:34.1184, lng:-118.3004}, 
//         name: "Griffith Observatory",
//         // place_id: 3
//     },
// ];


let spotsPlan = [];


export class Plan extends React.Component{
    state = {
        path: [],
        ithDay: 1,
        plans: [["1st spot", "2nd spot", "3rd spot"], ["x","y","z"]],
        prevPath:[],
        spotNum: 0,
    }

    onClick = ({ key }) => {
        message.info(`Changed to Day ${key}`);
        this.setState({
            ithDay: key,
            path : this.state.plans[key-1],
        });
      };
    chooseDay = (
        <Menu onClick={this.onClick}>
          <Menu.Item key="1">Day 1</Menu.Item>
          <Menu.Item key="2">Day 2</Menu.Item>
          <Menu.Item key="3">Day 3</Menu.Item>
          <Menu.Item key="4">Day 4</Menu.Item>
          <Menu.Item key="5">Day 5</Menu.Item>
          <Menu.Item key="6">Day 6</Menu.Item>
          <Menu.Item key="7">Day 7</Menu.Item>
        </Menu>
      );

    generateRoute = () => {
        const path = this.SpotsListRef.returnSpotsList();
        const originPath = this.SpotsListRef.state.path;

        if (originPath.length === this.state.spotNum) {
            if (path.length === 0) {
                console.log("no add no move");
                this.spotsPlan =  this.prevPath;
            } else {
                console.log("no add but move");
                this.setState(function(){
                    return{prevPath: path}
                });
                this.spotsPlan = path;
            }
        } else {
            if (path.length !== originPath.length){
                console.log("only add no move");
                this.setState(function() {
                    return {prevPath: this.state.prevPath.concat(originPath.slice(-(originPath.length-this.state.spotNum)))}
                })
                this.setState(function() {
                    return {spotNum: originPath.length}
                })
                this.spotsPlan = this.state.prevPath.concat(originPath.slice(-(originPath.length-this.state.spotNum)));
            } else {
                console.log("both add and move");
                this.setState(function(){
                    return{ 
                        spotNum: path.length,
                        originPath: path
                    }
                })
            }   
        }
        console.log("spotsPlan:",this.spotsPlan)
        // this.setState((state)=>({path: spotsPlan}))
    }
 
    getSpotsListRef = (ref) => {
        this.SpotsListRef = ref;
        console.log("this.SpotsListRef",this.SpotsListRef);
    }

    removeRoute = ()=>{
        this.setState((state)=>({path:[]}))
    }

    componentWillMount() {
        // attention
        smartPost.push(this);
     }
    smartPostOn=(message)=>{
        console.log(message)
    }

    setDay = (day)=>{
        //set path and day for the day of choice
        console.log(day)
    }


    getMapRef=(ref)=>{
        this.setState({map : ref})
        // window.map = ref
        // console.log("plan test: ",ref)
    }

    getplaceId = (id) =>{
        this.setState({placeId: id});
    }

    componentDidMount() {
        fetch(`${API_ROOT}/history?user_id=${localStorage.getItem(USER_ID)}`)
        .then((response)=>{
            if(response.ok){
                return response.json();
            }
            throw new Error('No history routes for this username.');
        }).then(
            (history)=>{
                // console.log("history in plan: ", history);
                this.setState({ plans: history});
            }
        )
    }

    render(){
        const ithday = this.state.ithDay;
        const path = this.state.path.map((place)=>(
            {
                latlng: place.location,
                place_id: place.place_id,
                name: place.name,
            }
        ))
        return(
            <div>
                <OverviewButton plans = {this.state.plans} setDay = {this.setDay}/>
                <div>
                    <Dropdown overlay={this.chooseDay} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#"> Day {ithday} <Icon type="down"/></a>
                    </Dropdown>
                    <SpotsList ref={this.getSpotsListRef}/>
                </div>
                <div className="path">
                    <Button type="primary" htmlType="submit" onClick={this.generateRoute} className = "btn">Generate Route</Button>
                    <Button type="primary" htmlType="submit" onClick={this.removeRoute} className = "btn">Remove Route</Button>
                    {/*<button onClick={this.generateRoute}>Generate Route</button>*/}
                    {/*<button onClick={this.removeRoute}>Remove Route</button>*/}

                    <DrawPath
                        getMapRef={this.getMapRef}
                        path={path}
                        //[{lat, lng}]
                        city = {this.props.city? this.props.city: this.state.path[0]}
                        zoom={PATH_ZOOM}

                        googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement = {<div style={{ height: `100%` }}/>}
                        containerElement = {<div style={{ height: `400px` }}/>}
                        mapElement = {<div style={{ height: `100%` }} />}

                        getplaceId={this.getplaceId}
                    />
                </div>
                <Attractions
                    city =  {this.props.city? this.props.city: this.state.path[0]}
                    userSearchId={this.state.placeId}
                />
            </div>
        )
    }
}

