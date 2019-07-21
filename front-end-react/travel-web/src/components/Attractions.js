import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import placesData from '../assets/data/GoogleSearchSampleData.json';
import {AttractionList} from "./AttractionList";
import {AttractionsSearch} from "./AttractionsSearch";


/* Attractions component receive city lat and lon and call google API and get three placesDetails  information
step 1. check if can get lat and lon
step 2. be able to display fake data
step 3. call google api to get data, add attraction search to this documents

* */
const { TabPane } = Tabs;

export class Attractions extends Component {

    static propTypes = {
        city: PropTypes.object.isRequired,
    }

    state = {
        city: null,
        type: "restaurant",
        placesInfos:placesData,
    }


    handleType = (type) => {
        this.setState({type:type})
        this.setState({city:this.props.city})
        console.log("this is at the city page",this.props.city);
        console.log("this is at the city page",this.state.type)
        this.getGoogleSearchResult();
    }

    getGoogleSearchResult(){
        console.log("call google search")
        return <AttractionsSearch city = {this.state.city} type = {this.state.type}/>
    }


    render() {
        //const { latlng } = this.props.location;
        //console.log('at attractions, this is lat lng', latlng);
        //console.log('test if get location',this.props.city);

        return (
            <Tabs defaultActiveKey="1" onChange={this.handleType} className="attraction-tab">
                <TabPane tab="food" key="restaurant">
                   food
                    <AttractionList placesInfos = {this.state.placesInfos}/>
                </TabPane>

                <TabPane tab="shopping" key="shopping_mall">
                    shopping
                    <AttractionList placesInfos = {this.state.placesInfos}/>
                </TabPane>

                <TabPane tab="museum" key="museum">
                    museum
                    <AttractionList placesInfos = {this.state.placesInfos}/>
                </TabPane>
            </Tabs>
        );
    }
}




