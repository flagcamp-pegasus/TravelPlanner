import React from 'react';
import { Spots } from './Spots';
import { AttractionList } from './AttractionList';
import { DrawPath } from './GoogleMapPath.js'
import { Link } from 'react-router-dom';
import { PATH_ZOOM } from "../constants.js"
import { Layout, Breadcrumb, Menu, Dropdown, Icon, message, Button } from "antd"

let spotsPlan = [
    {latlng: {lat:34.0195, lng:-118.4912}, name: "Santa Monica", place_id:0},
    {latlng: {lat:33.8121, lng:-117.9190}, name: "Disneyland Park", place_id:1},
    {latlng: {lat:34.0623, lng:-118.2383}, name: "Chinatown", place_id: 2},
    {latlng: {lat:34.1184, lng:-118.3004}, name: "Griffith Observatory",place_id:3},
];

const onClick = ({ key }) => {
    message.info(`Day ${key}`);
  };

const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Day 1</Menu.Item>
      <Menu.Item key="2">Day 2</Menu.Item>
      <Menu.Item key="3">Day 3</Menu.Item>
    </Menu>
  );


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
            <div className="container">
                <div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                    Choose Day <Icon type="down" />
                    </a>
                </Dropdown>
                <AttractionList/> 
                </div>
                <div className="path">
                    <Button type="primary" htmlType="submit" onClick={this.generateRoute} className = "btn">Generate Route</Button>
                    <Button type="primary" htmlType="submit" onClick={this.removeRoute} className = "btn">Remove Route</Button>
                    {/*<button onClick={this.generateRoute}>Generate Route</button>*/}
                    {/*<button onClick={this.removeRoute}>Remove Route</button>*/}
                    <DrawPath path={this.state.path} city = {this.props.city? this.props.city: this.state.path[0]} zoom={PATH_ZOOM}/>
                </div>
                <Spots/>
            </div>
        )
    }
}