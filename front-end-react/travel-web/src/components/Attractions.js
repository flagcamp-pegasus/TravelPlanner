import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import placesData from '../assets/data/GoogleSearchSampleData.json';
import {AttractionList} from "./AttractionList";
import {AttractionsSearch} from "./AttractionsSearch";
import {LAT_SAMPLE, LON_SAMPLE, TYPE_FOOD, TYPE_MUSEUM, TYPE_SHOPPING,MAX_DISPLAY} from "../constants";
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
        type: {TYPE_FOOD},
        placesInfos:placesData,
        ifSearched: false,
    }
    componentDidMount() {
        this.handleSearch({TYPE_FOOD});

    }

    handleSearch = (type) =>{
        if(!window.google){
            return
        }
        // debugger
        let service = new window.google.maps.places.PlacesService(document.getElementById('map'));
        const { latlng } = this.props.city;
        //console.log(this.props.city)
        let location = new window.google.maps.LatLng(latlng.lat,latlng.lng);
        let request = {
            location: location,
            radius: '200',
            type: type,
        };
        let counter = 0;
        let placesInfos = [];
        let len = 0

        service.nearbySearch(request, (results, status)=>{
            if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                if(results.length > `${MAX_DISPLAY}`){
                    len = `${MAX_DISPLAY}`;
                    console.log(len);
                }else{
                    len = results.length
                }

                   for (let i = 0; i < len; i++) {
                         let place = results[i];
                         placesInfos.push(place);
                         counter ++;
                     }
                 }
                 if(counter == len){
                     this.setState(
                         {placesInfos:placesInfos}) }
                 //console.log('this is place infos', placesInfos);
             })
        // debugger
    }

    render() {
        return (
            <div>
                <div id="map"></div>
                <Tabs defaultActiveKey={TYPE_FOOD} onChange={this.handleSearch}  className="attraction-tab">
                    <TabPane tab="food" key={TYPE_FOOD}>
                        <AttractionList placesInfos={this.state.placesInfos}/>
                    </TabPane>
                    <TabPane tab="shopping" key={TYPE_SHOPPING}>
                        <AttractionList placesInfos={this.state.placesInfos}/>
                    </TabPane>

                    <TabPane tab="museum" key={TYPE_MUSEUM}>
                        <AttractionList placesInfos={this.state.placesInfos}/>
                    </TabPane>
                </Tabs>

            </div>
        );
    }
}
