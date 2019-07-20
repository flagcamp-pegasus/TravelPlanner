import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import placesData from '../assets/data/GoogleSearchSampleData.json';
import {AttractionList} from "./AttractionList"


/* Attractions component receive city lat and lon and call google API and get three placesDetails  information
step 1. check if can get lat and lon
step 2. be able to display fake data
step 3. call google api to get data, add attraction search to this documents

* */
const { TabPane } = Tabs;

export class Attractions extends Component {
    state = {
        placesInfos:placesData,
    }


   // static propTypes = {
     //   placesData: PropTypes.object.isRequired,
    //}

    callback = (category) => {
        console.log(category);
       //set stage by category
        // console.log("place info", this.state.placesInfos);

    }


    render() {
        //const { latlng } = this.props.location;
        //console.log('at attractions, this is lat lng', latlng);
        //console.log('test if get location',this.props.city);

        return (
            <Tabs defaultActiveKey="1" onChange={this.callback} className="attraction-tab">
                <TabPane tab="food" key="restaurant">
                   food
                    <AttractionList placesInfos = {this.state.placesInfos}/>
                </TabPane>

                <TabPane tab="shopping" key="shopping_mall">
                    shopping
                </TabPane>
                <TabPane tab="museum" key="museum">
                    museum
                </TabPane>
            </Tabs>
        );
    }
}




