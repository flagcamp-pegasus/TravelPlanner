import React from 'react';
import PropTypes from 'prop-types';
// import {mergeChildren} from './ListSort';
import ListSort from './ListSort';
import { Switch } from 'antd';

import '../styles/SpotsList.css';

export class DayList extends React.Component {

    static defaultProps = {
        className: 'list-sort-demo',
    };

    getListSort=(ref)=>{
        this.sortListRef = ref;
    }

    returnSpotsList=()=>{
        return this.sortListRef.returnList();
    }

    render() {
        const childrenToRender = this.props.plans.map((item, index) => {
            item.switchActive = false;
            const path = `start from: ${item[0]}. Visit: ${item.slice(1).toString()}`;
            return (
                <div key={index} className={`${this.props.className}-list`}>
                    {path}
                    {/*<Switch size="small" defaultunChecked/>*/}
                </div>
            )
        });


        return (
            <div className={`${this.props.className}-div`}>
                <div className={`${this.props.className}-wrapper`}>
                    <ListSort ref={this.getListSort}
                              dragClassName="list-drag-selected"
                              appearAnim = {{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}>
                        {childrenToRender}
                    </ListSort>
                </div>
            </div>
        );
    }
}



