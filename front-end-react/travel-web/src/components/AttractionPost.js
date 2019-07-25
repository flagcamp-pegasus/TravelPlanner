import React, {Component} from 'react';
import {Button} from "antd";
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js'
import {DEFAULT_IMAGE} from "../constants"

export class AttractionPost extends Component {



    handleClick = ({location, name}) => {
        PubSub.publish('path', {location, name});
    }

    handleURL = (photos) =>{
        //console.log(photos);
        if (typeof photos !== 'undefined'){
            let pic = photos[0];
            return pic.getUrl ? pic.getUrl({width: 100, height:100}) : {DEFAULT_IMAGE};
            //console.log(photos[0]);
        }
        //return photos[0].getUrl({width: 300, height:300});
    }
    handleMoreInfo = (photos) =>{
        if (typeof photos !== 'undefined'){
            let pic = photos[0];

            if (pic.html_attributions){
                let tag = pic.html_attributions[0];
                let sub1 = tag.split('photos')[0];
                let sub2 = sub1.substring(9,sub1.length);
                console.log(sub2)
                return sub2;
            }


        }

    }

    render() {
        if(!this.props.info){
<<<<<<< HEAD
            return;
=======
            return(
                <div></div>
            )
>>>>>>> 0f6d0af52496419e81f351a55e56b3f8f4d48120
        }
        const { name, icon, photos, geometry, place_id, rating, vicinity,types} = this.props.info;
        // debugger
        const { location } = geometry;
        const { lat, lon } = location;
        return (
            <div>

                <div className = 'place-name' >{name}</div>
                <img className = 'place-image' alt="place-image" src={this.handleURL(photos)}/>
                <div className = 'place-info'>
                    <p className='place-rating'>Rating : {rating}</p>
                    <p className="place-address">Location: {vicinity}</p>
                    <p className= "place-type">Type: {types[0]}</p>
                    <a href = {this.handleMoreInfo(photos)} target="_blank">More Information</a>
                </div>
                <Button onClick={(e) => this.handleClick({location, name}, e)}>add</Button>
            </div>
        );
    }
}