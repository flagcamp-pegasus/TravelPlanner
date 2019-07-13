import * as React from 'react';
import {API_KEY} from "../constants.js"
const { compose, withProps, withStateHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");


const Map = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        center: { lat: 25.03, lng: 121.6 },
    }),
    withScriptjs,
    withGoogleMap
)(
    class markers extends React.Component{

    }
    // props =>
    // <GoogleMap
    //     defaultZoom={5}
    //     defaultCenter={props.center}
    // >
    //     {props.markers.map((marker)=>{
    //         // const onClick = props.onClick.bind(this, 0)
    //         // const handleClick = ()=> props.handleClick(0)
    //         return(
    //             <Marker
    //                 key={0}
    //                 position={marker}
    //                 // onClick={props.onToggleOpen}
    //                 onClick={()=>{
    //                     console.log("marker")
    //                     props.handleClick(0)}}
    //             >
    //                 {console.log("123")
    //                     || props.activebox.has(0)
    //                     &&  <InfoBox
    //                         onCloseClick={()=>{
    //                             console.log("info")
    //                             props.handleClick(0)}}
    //                         options={{ closeBoxURL: ``, enableEventPropagation: true }}
    //                     >
    //                         <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
    //                             <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
    //                                 Hello, Kaohsiung!
    //                             </div>
    //                         </div>
    //                     </InfoBox>}
    //             </Marker>
    //         )
    //     })}
    //
    // </GoogleMap>
);

export class Test extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            activebox: new Set(),
            // activebox : [false],
            markers: [{ lat: 22.6273, lng: 120.3014 }]
        }
    }

    handleClick = (key) => {
        // console.log({ marker })
        this.setState(({activebox})=>{
            console.log(this.state.activebox)
            if(activebox.has(key)){
                activebox.delete(key)
            }else{
                activebox.add(key)
            }
            return {
                activebox: activebox
            }
        })
    }
    render(){
        // console.log(this.state.activebox)
        return(
            <Map
                handleClick={this.handleClick}
                activebox = {this.state.activebox}
                markers = {this.state.markers}
            />
        )
    }
}