import * as React from 'react';
import { Carousel } from 'antd';
import {API_KEY, CITY_LIST} from "../constants";

const cityList = CITY_LIST;

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
                    {/*<img src={require("../assets/images/city_london.jpg")} alt="London"/>*/}
                    {/*<img src={cityList[0].imageUrl} alt="London"/>*/}

                    {cityList.map((city) => <img src={city.imageUrl} alt={city.name} key={city.imageUrl}/>)}
                </Carousel>
                <h1>{this.props.name}</h1>
            </div>
        );
    }
}