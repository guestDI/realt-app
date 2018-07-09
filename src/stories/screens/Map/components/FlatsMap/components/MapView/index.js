// @flow

import React, { PureComponent } from 'react'
import MapView from 'react-native-maps'
import isEqual from 'lodash.isequal'

type Props = {
    children: React.Node,
};

type State = {
    tracksViewChanges: boolean,
};

export default class MapMarker extends React.Component<Props, State> {
    state = {
        tracksViewChanges: true,
    }
    componentWillReceiveProps(nextProps: any) {
        if (!isEqual(this.props, nextProps)) {
            this.setState(() => ({
                tracksViewChanges: true,
            }))
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.color !== nextProps.color) {
            return true;
        }
        if (this.state.count !== nextState.count) {
            return true;
        }
        return false;
    }

    // componentDidUpdate() {
    //     if (this.state.tracksViewChanges) {
    //         this.setState(() => ({
    //             tracksViewChanges: false,
    //         }))
    //     }
    // }



    render() {
        return (
            <MapView
                ref={map => this.map = map}
                style={{flex: 3, width: width, height: height}}
                initialRegion={this.props.initialRegion}
                showsUserLocation={false}
                loadingEnabled={true}
                showsTraffic={false}
                showsPointsOfInterest={false}
            >
                {this.props.list ? this.props.list.map((flat, index) => {
                    return (
                        <Marker
                            style={this.state.selectedMarkerIndex === index ? {
                                opacity: 1,
                                zIndex: 999999999
                            } : {opacity: 0.8}}
                            key={`marker-${index}`}
                            pinColor={this.state.selectedMarkerIndex === index ? 'green' : 'red'}
                            onPress={(e) => this.onPressMarker(e, index)}
                            coordinate={{
                                latitude: flat.latitude,
                                longitude: flat.longitude
                            }}>
                        </Marker>
                    )
                }) : null}
                {this.state.polygons && this.state.polygons.map(polygon => (
                    <MapView.Polygon
                        key={polygon.id}
                        coordinates={polygon.coordinates}
                        strokeColor="#84666680"
                        fillColor="#e6e2e252"
                        strokeWidth={1}
                    />
                ))}
            </MapView>
        )
    }
}
