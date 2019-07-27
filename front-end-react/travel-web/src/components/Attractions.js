import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Tabs,Icon } from 'antd';

import placesData from '../assets/data/GoogleSearchSampleData.json';
import {AttractionList} from "./AttractionList";
import {SAMPLE_ID, TYPE_FOOD, TYPE_MUSEUM, TYPE_SHOPPING, MAX_DISPLAY} from "../constants";
import {AttractionPost} from "./AttractionPost"
//import {API_FEE_KEY} from '../charge';


/* Attractions component receive city lat and lon and call google API and get three placesDetails  information
step 1. check if can get lat and lon
step 2. be able to display fake data
step 3. call google api to get data, add attraction search to this documents
step 4. follow teacher's guide
reference: https://developers.google.com/maps/documentation/javascript/examples/place-details
https://developers.google.com/places/web-service/search

* */
const { TabPane } = Tabs;

export class Attractions extends Component {

    static propTypes = {
        city: PropTypes.object.isRequired
    }

    state = {
        city: null,
        type: {TYPE_FOOD},
        placesInfos:placesData,
        userPlaceInfo:null,
        placeId: SAMPLE_ID,
        ifUserAdd:false,
        activeTab:"user-add"

    }



    handleSearch = (type) =>{
        if(!window.google){
            return;
        }
        if (type ==='user-add'){
            this.setState({activeTab: type})
            this.handleSearchById();
        }else{
            this.setState({activeTab: type})
            console.log(type)
            this.handleTypeSearch(type);
        }
    }


    handleSearchById(){
        let service = new window.google.maps.places.PlacesService(document.getElementById('map'));
        if(!this.props.userSearchId){
            return;
        }
        let searchIDs = this.props.userSearchId;
        let counter = 0;
        let results = [];


        for (let j = 0;j < searchIDs.length;j++){
            let request = {
                placeId: searchIDs[j],
                fields: ['name', 'icon', 'photos', 'geometry', 'place_id', 'rating', 'formatted_address','types','vicinity']
            };
           // console.log(searchIDs[0]);
            service.getDetails(request, (result, status) => {

                console.log('1',result);
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    //console.log('2',result);
                    results.push(result);
                   // counter++;
                    this.setState({placesInfos:results});
                }else{
                    console.log('error in search by ID ')
                }
            })
        }



    }



    handleTypeSearch = (type) =>{
        console.log("hi");

        let service = new window.google.maps.places.PlacesService(document.getElementById('map'));

        const { latlng } = this.props.city;
        // console.log(latlng)
        let location = new window.google.maps.LatLng(latlng.lat,latlng.lng);
        let request = {
            location: location,
            radius: '200',
            type: type,
        };



        service.nearbySearch(request, (results, status)=>{
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                this.setState(
                    {placesInfos:results})
            }else{
                console.log('error in nearby search');
            }
             })


    }


    render() {

        return (
            <div>

                <h1 className = "attraction-title">Attractions</h1>
                <p className = "attraction-note">Note: Select your spots from the search bar or select from the tab lists</p>
                <div id="map"></div>
                <Tabs defaultActiveKey="user-add" onChange={this.handleSearch}  className="attraction-tab" size = "small"
                      activeKey={this.state.activeTab}>
                    <TabPane
                        className = "tabPane"
                        tab={
                            <span> <Icon type="smile" /></span>}
                        key='user-add' >
                        {this.props.userSearchId ?  <AttractionList placesInfos={this.state.placesInfos}/> : `Add a place from the search bar`}
                    </TabPane>

                    <TabPane
                        tab={
                            <span> <Icon type="coffee"/></span>}
                        key={TYPE_FOOD}  >
                        <AttractionList placesInfos={this.state.placesInfos}/>
                    </TabPane>


                    <TabPane
                        tab={
                            <span> <Icon type="shopping" /></span>}
                        key={TYPE_SHOPPING} >
                        <AttractionList placesInfos={this.state.placesInfos}/>
                    </TabPane>

                    <TabPane
                        tab={
                            <span> <Icon type="bank" /></span>}
                        key={TYPE_MUSEUM} >
                        <AttractionList placesInfos={this.state.placesInfos}/>
                    </TabPane>
                </Tabs>

            </div>
        );
    }
}
