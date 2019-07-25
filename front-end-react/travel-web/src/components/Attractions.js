import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

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
        ifUserAdd:false
    }




    handleSearch = (type) =>{
        if(!window.google){
            return;
        }
        if (type ==='user-add'){

            this.handleSearchById();
        }else{
            this.handleTypeSearch(type);
        }
    }


    handleSearchById(){
        // debugger
        let service = new window.google.maps.places.PlacesService(document.getElementById('map'));
        console.log('searchID',this.props.userSearchId);
        let request = {
            // this need to change to this.props.userSearchId
            placeId: this.props.userSearchId,
            fields: ['name', 'icon', 'photos', 'geometry', 'place_id', 'rating', 'formatted_address','types','vicinity']
           // fields: ['name', 'formatted_address', 'place_id', 'geometry']
        };


        service.getDetails(request, (result, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                console.log(result);
                this.setState(
                    {userPlaceInfo: result,
                        ifUserAdd:true})

            }else{
                console.log('error in search by ID ')
            }
        });
    }



    handleTypeSearch = (type) =>{
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
                    //console.log(len);
                }else{
                    len = results.length
                }

                   for (let i = 0; i < len; i++) {
                         let place = results[i];
                         placesInfos.push(place);
                         counter ++;
                     }
                 }else{
                console.log('error in nearby search');
            }
                 if(counter == len){
                     this.setState(
                         {placesInfos:placesInfos}) }
                 //console.log('this is place infos', placesInfos);
             })
    }


    render() {
        return (
            <div>
                <p>Please add place from search bar above or Select places from recommended categories</p>
                <div id="map"></div>
                <Tabs defaultActiveKey='1' onChange={this.handleSearch}  className="attraction-tab">
                    <TabPane tab="SELECTED SPOT" key="user-add">
                        <AttractionPost info = {this.state.userPlaceInfo}/>
                    </TabPane>

                    <TabPane tab="FOOD" key={TYPE_FOOD}>
                        <AttractionList placesInfos={this.state.placesInfos}/>
                    </TabPane>
                    <TabPane tab="SHOPPING" key={TYPE_SHOPPING}>
                        <AttractionList placesInfos={this.state.placesInfos}/>
                    </TabPane>

                    <TabPane tab="MUSEUM" key={TYPE_MUSEUM}>
                        <AttractionList placesInfos={this.state.placesInfos}/>
                    </TabPane>
                </Tabs>

            </div>
        );
    }
}
