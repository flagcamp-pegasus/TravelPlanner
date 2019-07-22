import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import placesData from '../assets/data/GoogleSearchSampleData.json';
import {AttractionList} from "./AttractionList";
import {AttractionsSearch} from "./AttractionsSearch";
import {LAT_SAMPLE, LON_SAMPLE} from "../constants";
import {API_FEE_KEY} from '../charge';


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

    componentDidMount() {
        this.renderMap()
    }

    renderMap = () => {

        // loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_FEE_KEY}&libraries=places&callback=initMap`)
        window.initMap = this.initMap
    }

    initMap = () => {
        console.log("map", this.props.map)
        let service = new window.google.maps.places.PlacesService(document.getElementById(this.props.map));
        let pyrmont = new window.google.maps.LatLng(`${LAT_SAMPLE}`,`${LON_SAMPLE}`);
        let category = 'restaurant'
        let request = {
            location: pyrmont,
            radius: '200',
            type: category,
        };

        let counter = 0;
        let placesInfos = [];
        service.nearbySearch(request, (results, status)=>{
            if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    let place = results[i];
                    placesInfos.push(place);
                    counter ++;
                }
            }
            if(counter == results.length){
                this.setState(
                    {placesInfos:placesInfos}) }

            console.log('this is place infos', placesInfos);
        })

    }



    handleType = (type) => {
        this.setState({type:type})
        this.setState({city:this.props.city})
        console.log("this is at the city page",this.props.city);
        console.log("this is at the city page",this.state.type)
        this.getGoogleSearchResult();
    }

    getGoogleSearchResult(){

    }


    render() {
        //const { latlng } = this.props.location;
        //console.log('at attractions, this is lat lng', latlng);
        //console.log('test if get location',this.props.city);

        return (
            <div>
            <div id="map"></div>
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
            </div>
        );
    }
}


function loadScript(url) {
    let index  = window.document.getElementsByTagName("script")[0]
    let script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}





