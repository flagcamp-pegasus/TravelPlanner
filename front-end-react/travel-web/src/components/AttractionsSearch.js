import React, {Component} from 'react';
import PropTypes from "prop-types"
import {
    withScriptjs,
    withGoogleMap,
} from "react-google-maps";

import {API_KEY, LAT_SAMPLE, LON_SAMPLE} from "../constants"

// try to use class rapper to solve this complexity search

class NormalAttractionsSearch extends Component {
    static propTypes = {
        city: PropTypes.object.isRequired,
    }

    searchAttractions = () => {
        let service = new window.google.maps.places.PlacesService(document.getElementById('map'));
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






    render() {
        const city = this.props.city;
        const cityName = city.name;
        const cityLoc = city.latlng;

        return (
            <div>
               hi
            </div>
        );
    }
}
export const AttractionsSearch = withScriptjs(withGoogleMap(NormalAttractionsSearch));

