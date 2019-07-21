import React from 'react';
import PropTypes from 'prop-types';
// import {mergeChildren} from './ListSort';
import ListSort from './ListSort';
import { Switch } from 'antd';
import PubSub from 'pubsub-js';

import '../styles/SpotsList.css';

export class SpotsList extends React.Component {
    state = {
        path:[],
        orderPath: [],
    }
    static propTypes = {
        className: PropTypes.string,
      };

    static defaultProps = {
        className: 'list-sort-demo',
      };

    startBtnActive = {
        disabled: true,
    };

    transferMsg(msg) {
        console.log(msg);
      }

    toggle = () => {
        this.setState({
          disabled: !this.startBtnActive.disabled,
        });
    };

    componentDidMount() {
        this.pubsub_token = PubSub.subscribe('path', (path, data) => {
            this.setState({
                path: this.state.path.concat(data)
            })
        })
    }
    componentWillUnmount() {
        PubSub.unsubscribe(this.pubsub_token);
    }


    getListSort=(ref)=>{
        this.sortListRef = ref;
    }

    returnSpotsList=()=>{
        return this.sortListRef.returnList();
    }

    render() {

        const childrenToRender = this.state.path.map((item, index) => {
            item.switchActive = false;
            const {name} = item;
            return (
                <div key={index} className={`${this.props.className}-list`}>
                    {name } 
                    <Switch size="small" defaultunChecked/>
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



