import React, {Component} from 'react';
import {AttractionPost} from './AttractionPost';


// receive all information, use map to pass to AttractionPost
export class AttractionList extends Component {
    render() {
        return (
            <div>
                {this.props.placesInfos.map((placeInfo) => <AttractionPost info={placeInfo} key={placeInfo.name} />)}
            </div>
        );
    }
}

