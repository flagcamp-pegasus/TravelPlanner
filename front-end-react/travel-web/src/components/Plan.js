import React from 'react';
import {DrawPath} from './GoogleMapPath.js'
import { Link } from 'react-router-dom';
import {PATH_ZOOM} from "../constants.js"
import {Attractions} from './Attractions';
import { Layout, Breadcrumb, Menu, Dropdown, Icon, message, Button } from "antd";
import { SpotsList } from './SpotsList';
import PubSub from 'pubsub-js';

import smartPost from 'react-smart-post';
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

export class Plan extends React.Component{
    state = {
        path: [],
        ithDay: 1
    }
//======================================
    
    onClick = ({ key }) => {
        message.info(`Changed to Day ${key}`);
        this.setState({ithDay: `${key}`});
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
        const path = this.SpotsListRef ? this.SpotsListRef.returnSpotsList() : [];
        console.log(path)
        // this.pubsub_token_order = PubSub.subscribe('path', (path, data) => {
        //     this.setState({
        //         path: {data}
        //     });
        // })
        // console.log(this.state.path);
        // this.setState((state)=>({path: spotsPlan}))
    }

    getSpotsListRef = (ref) => {
        this.SpotsListRef = ref;
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
//======================================
    render(){
        console.log("this is at plan components", this.props)
        const ithday = this.state.ithDay
        return(
            <div>
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
                    <DrawPath path={this.state.path} city = {this.props.city? this.props.city: this.state.path[0]} zoom={PATH_ZOOM}/>
                </div>
                <Attractions city =  {this.props.city? this.props.city: this.state.path[0]}/>
            </div>
        )
    }
}



