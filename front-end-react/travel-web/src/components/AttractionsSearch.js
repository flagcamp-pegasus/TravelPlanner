import React, {Component} from 'react';
import PropTypes from "prop-types"
import {API_KEY, LAT_SAMPLE, LON_SAMPLE} from "../constants"


export  class AttractionsSearch extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.renderMap()
    }

    renderMap = () => {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`)
        window.initMap = this.initMap
    }


    initMap = () => {
        let service = new window.google.maps.places.PlacesService(document.getElementById('map'));
        let location = new window.google.maps.LatLng(`${LAT_SAMPLE}`,`${LON_SAMPLE}`);
        let category = 'restaurant'
        let request = {
            location: location,
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
        return (
            <div>
                <p>this is google load search near by element</p>
                <Attractions placesInfos = {this.state.placesInfos} />
                <div id="map"></div>
            </div>
        )
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


}
