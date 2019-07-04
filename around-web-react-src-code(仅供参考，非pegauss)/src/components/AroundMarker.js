import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import blueMarkerUrl from '../assets/images/blue-marker.svg'

export class AroundMarker extends React.Component {
    state = {
        isOpen: false
    }

    toggleOpen = () => {
        this.setState((prevState) => {
            return {
                isOpen: !prevState.isOpen
            }
        });
    }

    render() {
        const { location: { lat, lon: lng }, user, message, url, type } = this.props.post;
        const isImagePost = type === 'image';

        const icon = isImagePost ? null : {
            url: blueMarkerUrl,
            scaledSize: new window.google.maps.Size(26, 41)
        };

        return (
            <Marker
                position={{ lat, lng }}
                onMouseOver={isImagePost ? this.toggleOpen : null}
                onMouseOut={isImagePost ? this.toggleOpen : null}
                onClick={isImagePost ? null : this.toggleOpen}
                icon={icon}
            >
                {
                    this.state.isOpen ?
                        (
                            <InfoWindow onCloseClick={this.toggleOpen}>
                                <div>
                                    {
                                        isImagePost ?
                                            (
                                                <img
                                                    className="around-marker-image"
                                                    src={url}
                                                    alt={message}
                                                />
                                            ):
                                            (
                                                <video
                                                    className="around-marker-video"
                                                    src={url}
                                                    controls
                                                />
                                            )
                                    }

                                    <p>{`${user}: ${message}`}</p>
                                </div>
                            </InfoWindow>
                        ) : null
                }
            </Marker>
        );
    }
}