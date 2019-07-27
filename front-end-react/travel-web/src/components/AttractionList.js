import React, {Component} from 'react';
import {AttractionPost} from './AttractionPost';
import PropTypes from "prop-types"
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;


// receive all information, use map to pass to AttractionPost
export class AttractionList extends Component {
    static propTypes = {
        placesInfos: PropTypes.array.isRequired,
    }


    render() {
        return (
                <Layout className = 'attraction-list'>
                    <Sider style={{ display: 'none' }} />
                    <Content>
                        <div>
                            {this.props.placesInfos.map((placeInfo) => <AttractionPost info={placeInfo} key={placeInfo.place_id} />)}
                        </div>

                    </Content>
                </Layout>
        );
    }
}

