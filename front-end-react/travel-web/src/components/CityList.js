import * as React from 'react';
import { Carousel } from 'antd';

import '../styles/CityList.css';

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

    render() {
        return(
            <div className = "image">
                <Carousel dotPosition="left" afterChange={this.onChange} autoplay={false}>
                    <div>
                        <h1>London</h1>
                    </div>
                    <div>
                        <h1>Paris</h1>
                    </div>
                    <div>
                        <h1>Milano</h1>
                    </div>
                    <div>
                        <h1>New York</h1>
                    </div>
                </Carousel>
            </div>
        );
    }
}