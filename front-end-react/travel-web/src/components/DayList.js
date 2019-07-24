import React from 'react';
import PropTypes from 'prop-types';
// import {mergeChildren} from './ListSort';
import ListSort from './ListSort';
import {Button, message} from 'antd';

import '../styles/SpotsList.css';
import {API_ROOT, USER_ID} from "../constants"

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

    deletePlan = (content, idx)=>{
        console.log("delete ", content, idx)
        // fetch(`${API_ROOT}/saveroutes?user_id=${localStorage.getItem(USER_ID)}`)
        //     .then((response)=>{
        //         if(response.ok){
        //             return response.json();
        //         }
        //         throw new Error('Failed to delete.');
        //     }).then(
        //     (history)=>{
        //         // console.log("history in plan: ", history);
        //         this.setState({ plans: history});
        //     }
        // ).catch((e) => {
        //     console.log(e)
        // });
    }

    gotoDay = (content) =>{
        console.log("goto ", content)
    }

    render() {
        const childrenToRender = this.props.plans.map((item, index) => {
            item.switchActive = false;
            const path = `start from: ${item[0]}. Visit: ${item.slice(1).toString()}`;
            return (
                <div key={index} className={`${this.props.className}-list`}>
                    {/*{path}*/}

                    <h3>{`start from: ${item[0]}`}</h3>
                    <p>{`Visit: ${item.slice(1).toString()}`}</p>
                    {/*<Switch size="small" defaultunChecked/>*/}
                </div>
            )
        });
        const days = this.props.plans.map((content, idx)=>(
            <Button key = {idx} type="link" onClick={()=>this.gotoDay(content)}>{`Day ${idx+1}`}</Button>
        ))
        const deletes = this.props.plans.map((content, idx)=>(
            <Button key = {idx} type="dashed" onClick={()=>this.deletePlan(content, idx)}>Delete</Button>
        ))
        return (
            <div className={`${this.props.className}-div ${this.props.className}-wrapper planOverView`}>
                {/*<div className={`${this.props.className}-wrapper`}>*/}
                <div>
                    {days}
                </div>
                <div className="sliders" >
                    <ListSort ref={this.getListSort}
                              dragClassName="list-drag-selected"
                              appearAnim = {{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}>
                        {childrenToRender}
                    </ListSort>
                </div>
                <div>
                    {deletes}
                </div>
            </div>
        );
    }
}



