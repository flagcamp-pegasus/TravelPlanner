import React, {Component} from 'react';
import {Button} from "antd";
import PubSub from 'pubsub-js'
import {DEFAULT_IMAGE} from "../constants"
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

export class AttractionPost extends Component {



    handleClick = (spot) => {
        PubSub.publish('path', spot);
    }

    handleURL = (photos) =>{
        //console.log(photos);
        if (typeof photos !== 'undefined'){
            let pic = photos[0];
            if(pic.getUrl){
                //console.log(1, pic.getUrl())
                //console.log(pic.getUrl({width: 100, height:100}))
                return pic.getUrl({width: 100, height:100});

            }else{
                return `${DEFAULT_IMAGE}`;
            }

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
                // console.log(sub2)
                return sub2;
            }
        }
    }

    render() {
        if(!this.props.info){
            return(
                <div></div>
            )
        }
        // debugger
        const { name, icon, photos, geometry, place_id, rating, vicinity,types} = this.props.info;
        const curloc = geometry.location;
        const location = {lat: curloc.lat , lng: curloc.lng};
        // const description = `Rating ${rating}; Location: ${vicinity} `;
        const description =
            <ul className = 'description'>
                <li> <span>Rating {rating},   </span><span>Type:{types[0]}</span></li>
                <li>Location: {vicinity}</li>
            </ul>

            {/*<div><p>Rating {rating};</p><p>Type:{types[0]}</p><p>Location: {vicinity}</p></div>;*/}
        return (

            <Card
                className='attraction-post'
                style={{ width: 300 }}
                cover={
                    <img className = 'place-image' alt="No Image"
                         src = {this.handleURL(photos)}
                    />
                }
                actions={[<Button href = {this.handleMoreInfo(photos)} target="_blank"
                className = 'more-info-button'>More Info</Button>,
                    <Button onClick={(e) => this.handleClick({location, name, place_id}, e)}>add</Button>]}
            >
                <Meta
                    title={name}
                    description={description}
                />
            </Card>

        );
    }
}