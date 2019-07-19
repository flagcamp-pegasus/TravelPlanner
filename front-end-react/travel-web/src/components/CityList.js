import * as React from 'react';
import { Carousel } from 'antd';
import {API_KEY} from "../constants";

const cityList = [
    {name: "London", latlng: {lat: 51.506155, lng: -0.127824}},
    {name: "Paris",  latlng: {lat: 48.854429, lng: 2.352198}},
    {name: "Milano", latlng: {lat: 45.461719, lng: 9.190091}},
    {name: "New York", latlng: {lat: 40.712921, lng: -74.006063}}
];

export class CityList extends React.Component {

    onChange = (page) => {
        this.props.getPage(page, cityList[page].name, cityList[page].latlng);
    }

    // findPlace = () => {
    //     //https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters
    //
    //     var placeInfo = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=London&inputtype=textquery&fields=photos,formatted_address,name,geometry&key=${API_KEY}`;
    //     console.log(placeInfo);
    // }

    getPhoto = () => {
        //https://maps.googleapis.com/maps/api/place/photo?parameters
        var imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&maxheight=240&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=${API_KEY}`;
        console.log(imageUrl);

        return imageUrl;
    }


    render() {
        return(
            <div className="citylist">
                <Carousel dotPosition="left" afterChange={this.onChange} autoplay={false}>
                    {/*<img src={this.getPhoto()} alt="London"/>*/}
                    <img src={require("../assets/images/city_london.jpg")} alt="London"/>
                    <img src={require("../assets/images/city_paris.jpg")} alt="Paris"/>
                    <img src={require("../assets/images/city_milano.jpg")} alt="Milano"/>
                    <img src={require("../assets/images/city_newyork.jpg")} alt="New York"/>
                </Carousel>
            </div>
        );
    }
}