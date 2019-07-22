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

    columns = [
        {
            title: 'day',
            dataIndex: 'day',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: 'Start From',
            dataIndex: 'start',
        },
        {
            title: 'Spots',
            dataIndex: 'spots',
        },
    ];

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        if(this.state.currentDay){
            this.props.setDay(this.state.currentDay)
        }
        // this.props.setDay()
        this.setState({
            visible: false,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
                currentDay: parseInt(selectedRowKeys)
            });
        },
        getCheckboxProps: record => {
            return {
                name: record.day,
            }
        },
        type: 'radio'
    }

    render() {
        const data = this.props.plans.map((spots, idx)=>({
            key: `${idx+1}`,
            day: `${idx+1}`,
            start: spots[0],
            spots: spots.slice(1, spots.length)
        }))
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Plan Overview
                </Button>
                <Modal
                    title="Plan Overview"
                    visible={visible}
                    onOk={this.handleOk}
                    okText='Plan for this day'
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    {this.props.plans.map((plan, day)=>{

                    })}
                    <Table rowSelection={this.rowSelection} columns={this.columns} dataSource={data} />,
                {/*    <CreatePostForm ref={this.getFormRef}/>*/}
                {/*    <DayList plans={this.props.plans}/>*/}
                </Modal>
            </div>
        );
    }
}