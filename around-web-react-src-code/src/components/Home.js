import React from 'react';
import { Tabs, Button, Spin, Row, Col, Radio } from 'antd';
import { GEO_OPTIONS, TOKEN_KEY, POS_KEY, API_ROOT, AUTH_HEADER } from '../constants';
import { Gallery } from './Gallery';
import { CreatePostButton } from './CreatePostButton';
import { AroundMap } from './AroundMap';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

export class Home extends React.Component {
    state = {
        isLoadingGeoLocation: false,
        error: '',
        isLoadingPosts: false,
        posts: [],
        topic: 'around'
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            this.setState({
                isLoadingGeoLocation: true
            });
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS
            );
        } else {
            this.setState({
                error: 'Geolocation in not supported.'
            });
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({
            lon: longitude,
            lat: latitude
        }));
        this.setState({
            isLoadingGeoLocation: false
        });
        this.loadNearbyPosts();
    }

    onFailedLoadGeoLocation = () => {
        this.setState({
            isLoadingGeoLocation: false,
            error: 'Failed to get user location.'
        });
    }

    loadNearbyPosts = (center, radius) => {
        const { lat, lon } = center ? center : JSON.parse(localStorage.getItem(POS_KEY));
        const range = radius ? radius : 20;
        const token = localStorage.getItem(TOKEN_KEY);

        this.setState({
            isLoadingPosts: true
        });

        fetch(`${API_ROOT}/search?lat=${lat}&lon=${lon}&range=${range}`, {
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to load posts.');
            })
            .then((data) => {
                console.log(data);
                if (this.state.topic === "around") {
                    this.setState({
                        isLoadingPosts: false,
                        posts: data ? data : []
                    });
                }
            })
            .catch((e) => {
                this.setState({
                    isLoadingPosts: false,
                    error: e.message
                })
            });
    }

    getImagePosts = () => {
        const images = this.state.posts
            .filter(({ type }) => type === 'image')
            .map(({ user, url, message }) => ({
                user,
                src: url,
                thumbnail: url,
                caption: message,
                thumbnailWidth: 400,
                thumbnailHeight: 300
            }));

        return <Gallery images={images} />;
    }

    getVideoPosts = () => {
        const videos = this.state.posts
            .filter(({ type }) => type === 'video')
            .map(({ user, url, message }) => {
                return (
                    <Col span={6} key={url}>
                        <video src={url} controls className="video-block" />
                        <p>{`${user}: ${message}`}</p>
                    </Col>
                );
            });

        return (
            <Row gutter={32}>
                {videos}
            </Row>
        );
    }

    getPanelContent = (type) => {
        const { error, posts, isLoadingGeoLocation, isLoadingPosts } = this.state;

        if (error) {
            return error;
        } else if (isLoadingGeoLocation) {
            return <Spin tip="Loading geo location..." />;
        } else if (isLoadingPosts) {
            return <Spin tip="Loading posts..." />;
        } else if (posts && posts.length > 0) {
            return type === 'image' ? this.getImagePosts() : this.getVideoPosts();
        } else {
            return 'No nearby posts.';
        }
    }

    loadFacesAroundTheWorld = () => {
        const token = localStorage.getItem(TOKEN_KEY);

        this.setState({
            isLoadingPosts: true
        });

        fetch(`${API_ROOT}/cluster?term=face`, {
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to load posts.');
            })
            .then((data) => {
                console.log(data);
                if (this.state.topic === 'face') {
                    this.setState({
                        isLoadingPosts: false,
                        posts: data ? data : []
                    });
                }
            })
            .catch((e) => {
                this.setState({
                    isLoadingPosts: false,
                    error: e.message
                })
            });
    }

    onTopicChange = (e) => {
        const topic = e.target.value;

        this.setState({
            topic
        });

        if (topic === 'face') {
            this.loadFacesAroundTheWorld();
        } else {
            this.loadNearbyPosts();
        }
    }

    render() {
        const operations = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts} />;

        return (
            <div>
                <RadioGroup onChange={this.onTopicChange} value={this.state.topic}>
                    <Radio value="around">Posts Around Me</Radio>
                    <Radio value="face">Faces Around The World</Radio>
                </RadioGroup>
                <Tabs className="main-tabs" tabBarExtraContent={operations}>
                    <TabPane tab="Image Posts" key="1">
                        {this.getPanelContent('image')}
                    </TabPane>
                    <TabPane tab="Video Posts" key="2">
                        {this.getPanelContent('video')}
                    </TabPane>
                    <TabPane tab="Map" key="3">
                        <AroundMap
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `600px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            posts={this.state.posts}
                            loadNearbyPosts={this.state.topic === 'around' ? this.loadNearbyPosts : this.loadFacesAroundTheWorld}
                        />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}