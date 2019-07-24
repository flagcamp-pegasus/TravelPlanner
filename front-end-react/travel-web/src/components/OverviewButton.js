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

    }

    handleCancel = () => {
        this.hide();
    };

    hide = ()=>{
        this.setState({
            visible: false,
        });
    }

    render() {
        // console.log(this.props.plans);

        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
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
                        plans={this.props.plans}
                        setDay = {this.props.setDay}
                        hide = {this.hide}
                    />
                </Modal>
            </div>
        );
    }
}