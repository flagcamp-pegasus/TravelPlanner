import React, {Component} from 'react';


export class DisplayLoadData extends Component {
    render() {

        const placesInfos = this.props.placesInfos;

        return (
            <div>
                <h1>Display Test Data Page</h1>
                {placesInfos.map((place, index) =>{
                    return <div>

                        <div>
                            <a className="place-name" href="https://maps.google.com/maps/contrib/117229116771790632690/photos" >{place.name}</a>
                            <p className="item-category">{place.types[0]}</p>

                        </div>
                        <p className="place-address">{place.vicinity}</p>
                        <div className="fav-link">
                        </div>
                    </div>
                })}
            </div>
        );
    }
}





