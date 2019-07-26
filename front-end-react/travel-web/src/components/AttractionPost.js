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
        // console.log(photos);
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
        const location = {lat: curloc.lat? curloc.lat : curloc.lat() , lng: curloc.lng? curloc.lng : curloc.lng()};
        // const description = `Rating ${rating}; Location: ${vicinity} `;
        const description = <div><p>Rating {rating};</p><p>Location: {vicinity}</p></div>;
        return (

            <Card
                style={{ width: 300 }}
                cover={
                    <img className = 'place-image' alt="place-image" src={this.handleURL(photos)}/>
                }
                actions={[<Button href = {this.handleMoreInfo(photos)} target="_blank">More Info</Button>,
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