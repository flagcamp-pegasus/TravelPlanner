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
        plans: [],
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
        console.log(path);
        const originPath = this.SpotsListRef.state.path;
        // this.setState( function() { return {temp: this.getSortedList(path)} })
        path = this.getSortedList(path);
        // console.log("tempInit:", this.state.temp);
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
            // () => console.log("add one more day", this.state.path, this.state.plans, this.state.ithDay)
        );
    }

    clickSaveToday = (path, ithDay) => {
        console.log(this.state.path);
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
        // console.log("path JSON ", body);

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
            plans:[ ...plans.slice(0,idx), ...plans.slice(idx+1)]
        }), ()=>console.log(this.state.plans.length));
    }

    modifyPath = (newPath)=>{
        console.log(newPath);
        const {ithDay, plans} = this.state;
        this.setState({path: newPath});
        const newplans = [...plans.slice(0, ithDay-1), newPath, ...plans.slice(ithDay)];
        // this.setState({plans: newplans});
        this.setState(({plans})=>({plans: newplans}), console.log(this.state.plans));
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
                if(history.length){
                    this.setState({path: history[0]}, ()=>{console.log(this.state.path)});
                    this.SpotsListRef.setState({path: history[0]});
                }
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
            <div className="planContainer">
                <div className="leftContent">
                    <OverviewButton
                        plans={this.state.plans}
                        setDay={this.chooseday}
                        planRemoveIdx={this.planRemoveIdx}
                    />
                    <Button onClick={() => {this.clickSaveToday(this.state.plans[ithday - 1], this.state.ithDay)}}
                            className="btn-3d yellow" >

                        Save Plan for this day
                    </Button>
                    <div>
                        <h3>{this.state.plans.length ? `Day ${ithday}` : `No plan`}</h3>
                        <SpotsList ref={this.getSpotsListRef} modifyPath={this.modifyPath}/>
                    </div>
                    <Button onClick={this.addOneDay} className="btn-3d">
                        Add One More Day
                    </Button>
                    <Button type="dashed" onClick={()=>this.deletePlan(this.state.ithDay-1)} className="btn-3d red">Delete Today's Plan</Button>

                </div>
                <div className="path">
                    <Button type="primary" htmlType="submit" onClick={this.generateRoute} className="btn-3d cyan">Generate
                        Route</Button>
                    <Button type="primary" htmlType="submit" onClick={this.removeRoute} className="btn-3d purple">Remove
                        Route</Button>
                    <Button type="primary" htmlType="submit" onClick={this.selectSpot} className="btn-3d green">Find more
                        info</Button>
                    <DrawPath
                        getMapRef={this.getMapRef}
                        path={path}
                        //[{lat, lng}]
                        city={this.props.city ? this.props.city : this.state.path[0]}
                        zoom={PATH_ZOOM}

                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `750px`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                        getplaceId={this.getplaceId}
                    />
                </div>
                <div className = "rightContent">
                    <Attractions
                        ref={this.getAttractionRef}
                        city={this.props.city ? this.props.city : this.state.path[0]}
                        userSearchId={this.state.placeId}
                    />
                </div>
            </div>
        )
    }
}

