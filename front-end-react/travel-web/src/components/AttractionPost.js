import React, {Component} from 'react';
import {Button} from "antd";
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js'
import {DEFAULT_IMAGE} from "../constants"

export class AttractionPost extends Component {

    static propTypes = {
        info: PropTypes.object.isRequired,
    }


    handleClick = ({location, name}) => {
        PubSub.publish('path', {location, name});
    }

    handleURL = (photos) =>{
        //console.log(photos);
        if (typeof photos !== 'undefined'){
            let pic = photos[0];
            return pic.getUrl ? pic.getUrl({width: 300, height:300}) : {DEFAULT_IMAGE};
            //console.log(photos[0]);
        }
        //return photos[0].getUrl({width: 300, height:300});
    }
    handleMoreInfo = (photos) =>{
        if (typeof photos !== 'undefined'){
            let pic = photos[0];

            if (pic.html_attributions){
                let tag = pic.html_attributions[0];

                //console.log( tag.replace("'","" ));
                return tag.replace("'","" );
            }

            //return pic.html_attributions ? pic.html_attributions[0] : null;

        }

    }

    render() {
        const { name, icon, photos, geometry, place_id, rating, vicinity,types} = this.props.info;
        // debugger
        //const address = this.props.info.vincity;
        const { location } = geometry;
        const { lat, lon } = location;
        //const sampleLink = this.handleMoreInfo()
       // const sampleLink =  <a href="https://maps.google.com/maps/contrib/102493113014314842044/photos">Boyds Grill &amp; Wine Bar</a>;
        // this.handleURL(photos);
        // console.log(photos);
        // const photos1 = photos[0];//
        //const photoUrl = photos[0].getUrl({width: 300, height: 300});// set size of the url


        return (
            <div>
                {this.handleMoreInfo(photos)}
                <div className = 'place-name' >{name}</div>
                <img alt="place image" src={this.handleURL(photos)}/>
                <div className = 'place-info'>
                    <p className='place-rating'>Rating : {rating}</p>
                    <p className="place-address">Location: {vicinity}</p>
                    <p className= "place-type">Type: {types[0]}</p>
                    {/*{sampleLink}*/}
                </div>
                <Button onClick={(e) => this.handleClick({location, name}, e)}>add</Button>
            </div>
        );
    }
}