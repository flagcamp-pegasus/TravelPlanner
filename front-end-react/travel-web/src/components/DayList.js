import React from 'react';
import PropTypes from 'prop-types';
// import {mergeChildren} from './ListSort';
import ListSort from './ListSort';
import { Switch } from 'antd';
import PubSub from 'pubsub-js';

import '../styles/SpotsList.css';

export class DayList extends React.Component {

    getListSort=(ref)=>{
        this.sortListRef = ref;
    }

    returnSpotsList=()=>{
        return this.sortListRef.returnList();
    }

    render() {
        const childrenToRender = this.props.plans.map((item, index) => {
            item.switchActive = false;
            const {name} = item;
            return (
                <div key={index} className={`${this.props.className}-list`}>
                    {name }
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
                    <button onClick={console.log(childrenToRender)}>click</button>
                </div>
            </div>
        );
    }
}



