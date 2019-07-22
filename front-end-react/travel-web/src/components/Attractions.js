import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import placesData from '../assets/data/GoogleSearchSampleData.json';
import {AttractionList} from "./AttractionList";
import {AttractionsSearch} from "./AttractionsSearch";
import {LAT_SAMPLE, LON_SAMPLE, TYPE_FOOD, TYPE_MUSEUM, TYPE_SHOPPING} from "../constants";
import {API_FEE_KEY} from '../charge';
import { Test } from './Test';

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
        testNum: 1,
    }


    componentDidMount() {
        this.attractionSearch({TYPE_FOOD})
    }


    attractionSearch = (type) => {
        // console.log(type);
        debugger
        let service = new window.google.maps.places.PlacesService(this.props.mapref);
        debugger
        const { latlng } = this.props.city;
        console.log(this.props.city)
        let location = new window.google.maps.LatLng(latlng.lat,latlng.lng);
        let request = {
            location: location,
            radius: '200',
            type: type,
        };
        let counter = 0;
        let placesInfos = [];
        console.log('request',request);
        this.setState({testNum: 3});




    }


    render() {
        //const { latlng } = this.props.location;
        //console.log('at attractions, this is lat lng', latlng);
        //console.log('test if get location',this.props.city);
        return (
            <div>
                <Tabs defaultActiveKey="1"  onChange={this.attractionSearch} className="attraction-tab">
                    <TabPane tab="food" key={TYPE_FOOD}>
                        <Test num = {this.state.testNum}/>

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
