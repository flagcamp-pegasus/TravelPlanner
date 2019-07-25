import React from 'react';
import {DrawPath} from './GoogleMapPath.js'
import {Link} from 'react-router-dom';
import {PATH_ZOOM, API_KEY, API_ROOT, USER_ID, TOKEN_KEY, AUTH_HEADER} from "../constants.js"
import {Attractions} from './Attractions';
import {OverviewButton} from './OverviewButton';
import {Layout, Breadcrumb, Menu, Dropdown, Icon, message, Button} from "antd";
import {SpotsList} from './SpotsList';
import PubSub from 'pubsub-js';
import smartPost from 'react-smart-post';
import {func} from 'prop-types';
// import { ServerHttp2Session } from 'http2';


let spotsPlan = [];


export class Plan extends React.Component {
    state = {
        path: [],
        ithDay: 1,
        plans: [["1st spot", "2nd spot", "3rd spot"], ["x", "y", "z"]],
        prevPath: [],
        temp: [],
        spotNum: 0,
    }

    chooseday = (ithday) => {
        message.info(`Changed to Day ${ithday}`);
        this.setState({
            ithDay: ithday,
            path : this.state.plans[ithday-1],
        },()=>{
            console.log(this.state.path);
        });
    };

      getSortedList = (path) => {
        let nameArray = path.map( (spotItem) => {
            return spotItem.props.children
        });
        // console.log("nameArray: ", nameArray);
        let spotObjArray = []
        nameArray.map(spotName => {
            let originPath = this.SpotsListRef.state.path;
            const spotObj = originPath.find((element) => (element.name === spotName))
            spotObjArray.push(spotObj);
        });
        console.log("spotObjArray:", spotObjArray);
        return spotObjArray
    }

    generateRoute = () => {
        let path = this.SpotsListRef.returnSpotsList();
        const originPath = this.SpotsListRef.state.path;
        // this.setState( function() { return {temp: this.getSortedList(path)} })
        path = this.getSortedList(path);
        // console.log("tempInit:", this.state.temp);

        if (originPath.length === this.state.spotNum) {
            if (path.length === 0) {
                console.log("no add no move");
                this.spotsPlan = this.state.prevPath;
            } else {
                console.log("no add but move");
                this.setState(function () {
                    return {prevPath: path}
                });
                this.spotsPlan = path;
                console.log("return!!!", path)
                return path
            }
        } else {
            if (path.length !== originPath.length) {
                console.log("only add no move");
                this.setState(function () {
                    return {prevPath: this.state.prevPath.concat(originPath.slice(-(originPath.length - this.state.spotNum)))}
                })
                this.setState(function () {
                    return {spotNum: originPath.length}
                })
                this.spotsPlan = this.state.prevPath.concat(originPath.slice(-(originPath.length - this.state.spotNum)));
                // console.log("return!!!", this.spotsPlan)
                return this.spotsPlan
            } else {
                console.log("both add and move");
                this.setState(function () {
                    return {
                        spotNum: path.length,
                        originPath: path
                    }
                })
                this.spotsPlan = path;
                console.log("return!!!", path)
                return path
            }
        }
    }

    getSpotsListRef = (ref) => {
        this.SpotsListRef = ref;
        console.log("this.SpotsListRef", this.SpotsListRef);
    }

    removeRoute = () => {
        this.setState((state) => ({path: []}))
    }

    componentWillMount() {
        // attention
        smartPost.push(this);
    }

    smartPostOn = (message) => {
        console.log(message)
    }


    getplaceId = (id) => {
        this.setState({placeId: id});
    }

    addOneDay = () => {
        this.setState({ithDay: this.state.plans.length + 1, path: []});
        this.setState(prevState => {
            return {
                plans: [
                    ...prevState.plans,
                    []
                ]
            };
        },
        () => console.log("add one more day", this.state.path, this.state.plans, this.state.ithDay)
        );

    }


    clickSaveToday = (path, ithDay) => {

        const token = localStorage.getItem(TOKEN_KEY);
        const user_id = localStorage.getItem(USER_ID);


        const body ={
            results : path.map((data)=>{
                // console.log(data)
                return {
                        geometry: {location: data.location},
                        name : data.name,
                        place_id : data.place_id,
                    }
                }),
            user_id : user_id,
            ithDay: ithDay,
        }
        console.log("path JSON ", body);

        fetch(`${API_ROOT}/saveroutes`, {
            method: 'POST',
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.ok) {
                    message.success('Save route successfully!');
                    return;
                }
                throw new Error('Failed to connect to database.');
            })
            .catch((e) => {
                console.error(e);
                message.error('Failed to save route.');
            });
    }

    planRemoveIdx = (idx)=>{
        this.setState(({plans})=>({
            ...plans.slice(0,idx),
            ...plans.slice(idx+1)
        }));
    }

    componentDidMount() {
        fetch(`${API_ROOT}/history?user_id=${localStorage.getItem(USER_ID)}`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${localStorage.getItem(TOKEN_KEY)}`
            },
        })
        .then((response)=>{
            if(response.ok){
                return response.json();
            }
            throw new Error('No history routes for this username.');
        }).then(
            (history)=>{
                // console.log("history in plan: ", history);
                this.setState({ plans: history});
            }
        ).catch((e) => {
            console.log(e)
            message.error('failed to get history.');
        });

    }

    getAttractionRef = (ref) => {
        this.attractionRef = ref;
    }

    selectSpot = () => {
        this.attractionRef.handleSearchById();
    }


    render() {
        const ithday = this.state.ithDay;
        const path = this.state.path.map((place) => (
            {
                latlng: place.location,
                place_id: place.place_id,
                name: place.name,
            }
        ))
        return (
            <div>
                <OverviewButton
                    plans = {this.state.plans}
                    setDay = {this.chooseday}
                    clickSaveToday={this.clickSaveToday}
                    planRemoveIdx={this.planRemoveIdx}
                />
                <Button onClick = {() => {this.clickSaveToday(this.state.plans[ithday-1], this.state.ithDay)} } >Save Plan for this day.</Button>
                <Button onClick={this.addOneDay}>Add One More Day</Button>
                <div>
                    <h3>{`Day ${ithday}`}</h3>
                    {/*<Dropdown overlay={this.chooseDay} trigger={['click']}>*/}
                    {/*    <a className="ant-dropdown-link" href="#"> Day {ithday} <Icon type="down"/></a>*/}
                    {/*</Dropdown>*/}
                    <SpotsList ref={this.getSpotsListRef}/>
                </div>
                <div className="path">
                    <Button type="primary" htmlType="submit" onClick={this.generateRoute} className="btn">Generate
                        Route</Button>
                    <Button type="primary" htmlType="submit" onClick={this.removeRoute} className="btn">Remove
                        Route</Button>
                    <Button type="primary" htmlType="submit" onClick={this.selectSpot} className="btn">Find more
                        info</Button>
                    {/*<button onClick={this.generateRoute}>Generate Route</button>*/}
                    {/*<button onClick={this.removeRoute}>Remove Route</button>*/}

                    <DrawPath
                        getMapRef={this.getMapRef}
                        path={path}
                        //[{lat, lng}]
                        city={this.props.city ? this.props.city : this.state.path[0]}
                        zoom={PATH_ZOOM}

                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `400px`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}

                        getplaceId={this.getplaceId}
                    />
                </div>
                <Attractions
                    ref={this.getAttractionRef}
                    city={this.props.city ? this.props.city : this.state.path[0]}
                    userSearchId={this.state.placeId}
                />
            </div>
        )
    }
}

