import React from 'react';
import { Tabs, Button, Spin, Row, Col, Radio } from 'antd';
import { GEO_OPTIONS, TOKEN_KEY, POS_KEY, API_ROOT, AUTH_HEADER } from '../constants';

const TabPane = Tabs.TabPane;


export class Spots extends React.Component {
    state = {
        isLoadingGeoLocation: false,
        error: '',
        isLoadingPosts: false,
        places: [],
        topic: 'plan'
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
        //this.loadNearbyPosts();
    }

    onFailedLoadGeoLocation = () => {
        this.setState({
            isLoadingGeoLocation: false,
            error: 'Failed to get user location.'
        });
    }

    getMuseumPlaces = () => {
        return (
        <ul id="place-list">
        <li class="place">
          <img alt="place image" src="https://s3-media3.fl.yelpcdn.com/bphoto/EmBj4qlyQaGd9Q4oXEhEeQ/ms.jpg" />
          <div>
            <a class="place-name" href="#">Museum1</a>
            <p class="item-category">park</p>
            
          </div>
          <p class="place-address">699 Calderon Ave<br/>Mountain View<br/> CA</p>
          <div class="fav-link">
            <i class="fa fa-heart"></i>
          </div>
        </li>
        <li class="place">
          <img alt="place image" src="https://s3-media3.fl.yelpcdn.com/bphoto/EmBj4qlyQaGd9Q4oXEhEeQ/ms.jpg" />
          <div>
            <a class="place-name" href="#">Museum2</a>
            <p class="item-category">park</p>
            
          </div>
          <p class="place-address">699 Calderon Ave<br/>Mountain View<br/> CA</p>
          <div class="fav-link">
            <i class="fa fa-heart"></i>
          </div>
        </li>
      </ul>
        );
    }
    
    getParkPlaces = () => {
        return (
        <ul id="place-list">
        <li class="place">
          <img alt="place image" src="https://s3-media3.fl.yelpcdn.com/bphoto/EmBj4qlyQaGd9Q4oXEhEeQ/ms.jpg" />
          <div>
            <a class="place-name" href="#">Park1</a>
            <p class="item-category">park</p>
            
          </div>
          <p class="place-address">699 Calderon Ave<br/>Mountain View<br/> CA</p>
          <div class="fav-link">
            <i class="fa fa-heart"></i>
          </div>
        </li>
        <li class="place">
          <img alt="place image" src="https://s3-media3.fl.yelpcdn.com/bphoto/EmBj4qlyQaGd9Q4oXEhEeQ/ms.jpg" />
          <div>
            <a class="place-name" href="#">Park2</a>
            <p class="item-category">park</p>
            
          </div>
          <p class="place-address">699 Calderon Ave<br/>Mountain View<br/> CA</p>
          <div class="fav-link">
            <i class="fa fa-heart"></i>
          </div>
        </li>
      </ul>
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
        } else {
            return type === 'park' ? this.getParkPlaces() : this.getMuseumPlaces();
        } 
    }

     render() {
        return (
            <div>
                <Tabs className="main-tabs" >
                    <TabPane tab="Parks" key="1">
                        {this.getPanelContent('park')}
                    </TabPane>
                    <TabPane tab="Museums" key="2">
                        {this.getPanelContent('museum')}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}