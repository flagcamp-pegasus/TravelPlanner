import React from 'react';
import PropTypes from 'prop-types';
import ListSort from './ListSort';
import PubSub from 'pubsub-js';

import '../styles/SpotsList.css';

export class SpotsList extends React.Component {
    state = {
        path:[]
    }
    static propTypes = {
        className: PropTypes.string,
      };

    static defaultProps = {
        className: 'list-sort-demo',
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
            const {name} = item;
            return (
                <div key={index} className={`${this.props.className}-list`}>
                    {name } 
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



