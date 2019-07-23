import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import placesData from '../assets/data/GoogleSearchSampleData.json';
import {AttractionList} from "./AttractionList";
import {AttractionsSearch} from "./AttractionsSearch";
import {LAT_SAMPLE, LON_SAMPLE, TYPE_FOOD, TYPE_MUSEUM, TYPE_SHOPPING} from "../constants";
//import {API_FEE_KEY} from '../charge';


/* Attractions component receive city lat and lon and call google API and get three placesDetails  information
step 1. check if can get lat and lon
step 2. be able to display fake data
step 3. call google api to get data, add attraction search to this documents
step 4. follow teacher's guide

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
       // testNum: 1,
    }


    render() {
        //const { latlng } = this.props.location;
        //console.log('at attractions, this is lat lng', latlng);
        //console.log('test if get location',this.props.city);
        return (
            <div>

                <Tabs defaultActiveKey={TYPE_FOOD}   className="attraction-tab">
                    <TabPane tab="food" key={TYPE_FOOD}>
                        <AttractionList placesInfos={placesData}/>


                    </TabPane>

                    <TabPane tab="shopping" key={TYPE_SHOPPING}>

                    </TabPane>

                    <TabPane tab="museum" key={TYPE_MUSEUM}>

                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
