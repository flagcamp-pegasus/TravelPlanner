import React from 'react';
import PropTypes from 'prop-types';
import ListSort from './ListSort';
import PubSub from 'pubsub-js';

import '../styles/SpotsList.css';
import {Icon} from "antd"

export class SpotsList extends React.Component {
    state = {
        path:[],
    }
    static propTypes = {
        className: PropTypes.string,
      };

    static defaultProps = {
        className: 'list-sort-demo',
      };

    componentDidMount() {
        this.pubsub_token = PubSub.subscribe('path', (path, spot) => {
            const {name, place_id, location} = spot;
            // debugger
            // const lat=location.lat, lng = location.lng;
            this.setState({
                path: this.state.path.concat({name, place_id, location})
            }, ()=>{
                this.props.modifyPath(this.state.path);
            }
                );
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.pubsub_token);
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log("prev ", prevState.path);
    //     console.log("cur ", this.state.path);
    //     if(prevState.path!=this.state.path)
    //         this.props.modifyPath(this.state.path);
    // }

    getListSort=(ref)=>{
        this.sortListRef = ref;
    }
    
    returnSpotsList=()=>{
        return this.sortListRef.returnList();
    }

    remove=(idx)=>{
        this.setState(({path})=>({
            path:[ ...path.slice(0,idx), ...path.slice(idx+1)]
        }));
    }

    render() {
        const childrenToRender = this.state.path.map((item, index) => {
            const {name} = item;
            return (
                <div key={index} className={`${this.props.className}-list`}>
                    {name }
                    {/*{item}*/}
                </div>
            )
        });

        const deletes = this.state.path.map((content, idx)=>(
            <div key = {idx}>
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.remove(idx)}
                />
            </div>
        ))

        return (
            <div className={`${this.props.className}-div ${this.props.className}-wrapper planOverView`}>
                <div>{deletes}</div>
                <div className="spotPath" >
                    <ListSort ref={this.getListSort}
                        dragClassName="list-drag-selected"
                        appearAnim = {{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}
                    >
                        {childrenToRender}
                    </ListSort>
                </div>
            </div>
        );
    }
}



