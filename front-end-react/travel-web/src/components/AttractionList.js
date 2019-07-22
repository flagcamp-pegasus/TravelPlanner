import React, {Component} from 'react';
import {AttractionPost} from './AttractionPost';
import PropTypes from "prop-types"


// receive all information, use map to pass to AttractionPost
export class AttractionList extends Component {
    static propTypes = {
        placesInfos: PropTypes.array.isRequired,
    }
    render() {
        return (
            <div>
                {this.props.placesInfos.map((placeInfo) => <AttractionPost info={placeInfo} key={placeInfo.name} />)}
            </div>
        );
    }
}

