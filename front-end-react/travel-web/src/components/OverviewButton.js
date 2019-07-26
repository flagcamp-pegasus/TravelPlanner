import React from 'react';
import { Modal, Button} from 'antd';
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
        const newOrder = this.dayListRef.returnSpotsList().map((a)=>(a.key));
        console.log(newOrder);
        newOrder.map((repDay, idx)=>{
            console.log(`Day ${idx+1} is plans[${repDay}]`)
            this.props.saveToDB(this.props.plans[repDay], idx+1);
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
                <Button type="primary" onClick={this.showModal} className="btn-3d blue" icon="sliders">
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