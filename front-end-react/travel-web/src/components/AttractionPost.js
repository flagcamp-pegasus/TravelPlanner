import React, {Component} from 'react';
import {Button} from "antd";
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js'

export class AttractionPost extends Component {

    static propTypes = {
        info: PropTypes.object.isRequired,
    }


    handleClick = ({location, name}) => {
        PubSub.publish('xxx', {location, name});
    }

    handleURL = (photos) =>{
        //console.log(photos);
        if (typeof photos !== 'undefined'){
            let pic = photos[0];
            //console.log(pic.getUrl());
        }


        //return photos[0].getUrl({width: 300, height:300});

    }
    render() {
        const { name, icon, photos, geometry, place_id, rating, vicinity,types} = this.props.info;
        const { location } = geometry;
        const { lat, lon } = location;
        const sampleURL = "https://s3-media3.fl.yelpcdn.com/bphoto/EmBj4qlyQaGd9Q4oXEhEeQ/ms.jpg";
        this.handleURL(photos);


       // console.log(photos);
       // const photos1 = photos[0];//
        //const photoUrl = photos[0].getUrl({width: 300, height: 300});// set size of the url

        return (
            <div>
                <div className = 'place-name'>{name}</div>
                <img alt="place image" src={sampleURL}/>
                <div className = 'place-info'>
                    <p className='place-rating'>rating : {rating}</p>
                    <p className="place-address">{vicinity}</p>
                    <p className= "place-type">Type: {types[0]}</p>
                </div>
                <Button onClick={(e) => this.handleClick({location, name}, e)}>add</Button>
            </div>
        );
    }
}
