import React, {Component} from 'react';
import { Button } from 'antd';

export class DisplayLoadData extends Component {
    handleClick = (m) => {
        console.log({m});
    }

    render() {

        const placesData = this.props.placesInfos;
        // console.log('data from display page',placesInfos);

        return (
            <div>
                <h1>Display Test Data Page</h1>
                {placesData.map((place, index) =>{
                    let toRoute = {};
                    let geo = place.geometry;
                    return <div>

                        <div>
                            <a className="place-name" href="https://maps.google.com/maps/contrib/117229116771790632690/photos" >{place.name}</a>
                            <Button onClick={(e) => this.handleClick({geo}, e)}>add</Button>
                            <p className="item-category">{place.types[0]}</p>

                        </div>
                        <p className="place-address">{place.vicinity}</p>
                        <div className="fav-link">
                            <i className="fa fa-heart"></i>
                        </div>
                    </div>
                })}
            </div>
        );
    }
}









