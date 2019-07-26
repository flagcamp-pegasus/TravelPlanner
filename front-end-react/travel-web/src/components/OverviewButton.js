import React from 'react';
import { Modal, Button, message, Table } from 'antd';
import { API_ROOT, AUTH_HEADER } from '../constants';
import {DayList} from './DayList'

export class OverviewButton extends React.Component {
    state = {
        visible: false,
        confirmLoading: false,
        currentDay:undefined,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleSave = () => {
        console.log(this.dayListRef.returnSpotsList().map((a)=>(a.key)));
        const newOrder = this.dayListRef.returnSpotsList().map((a)=>(parseInt(a.key)+1));
        newOrder.map((newday, idx)=>{
            this.props.clickSaveToday(this.props.plans[idx], newday);
        })
    }

    handleCancel = () => {
        this.hide();
    };

    hide = ()=>{
        this.setState({
            visible: false,
        });
    }

    getDayListRef = (ref)=>{
        this.dayListRef=ref;
    }

    render() {
        // console.log(this.props.plans);

        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal} className="btn-3d blue">
                    Plan Overview
                </Button>
                <Modal
                    className="modal"
                    title="Plan Overview"
                    visible={visible}
                    onOk={this.handleSave}
                    okText='Save Plan'
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    cancelText='close'
                >
                    <DayList
                        ref={this.getDayListRef}
                        plans={this.props.plans}
                        setDay = {this.props.setDay}
                        hide = {this.hide}
                        planRemoveIdx={this.props.planRemoveIdx}
                    />
                </Modal>
            </div>
        );
    }
}