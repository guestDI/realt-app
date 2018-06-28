import * as React from "react";
import {
  Container,
} from "native-base";
import {
  View,
  SectionList,
  FlatList,
  TouchableOpacity,
  Platform,
  NativeModules,
  Dimensions,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import {DotsLoader, TextLoader} from 'react-native-indicator';
import Carousel from 'react-native-snap-carousel';

import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload-deux';
import FlatPreview from "./components/FlatPreview/index";
import {Marker, Callout} from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster'
import PriceMarker from './components/PriceMarker/index'
import MapView from "react-native-maps/lib/components/MapView";
const { StatusBarManager } = NativeModules;

export interface Props {
  navigation: any;
  list: any;
  loadMore: Function;
}
export interface State {
  monthPlus: number;
}
const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
const CARD_HEIGHT = height / 3;
const MARGIN_LEFT = 75;
const CARD_WIDTH = width - MARGIN_LEFT * 2;
const usualMarker = require('../../../../../../assets/images/pin1.png');
const selectedMarker = require('../../../../../../assets/images/pin.png');

class FlatsMap extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarkerIndex: 0,
      firstItem: 0,
      polygons: this.props.filter.coordinates,
      loading: false,
      page: 0,
      error: null,
      refreshing: false,
      region: {
        latitude: 53.902231,
        longitude: 27.561876,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
    this.activeIndex = 0;
  }

    componentWillReceiveProps(nextProps) {
        if (this.props.filter !== nextProps.filter) {
            let polygons = nextProps.filter.coordinates ? nextProps.filter.coordinates : [];
            this.setState({
                polygons: polygons
            });
        }
    }

  componentWillMount() {
    this.index = 0;
  }

  onPreviewPress = val => {
      console.log(val)
    this.props.navigation.navigate("FlatPage", {
      flat: val
    });
    // if (this.props.onFlatPreviewPressed) {
    //     this.props.onFlatPreviewPressed(val);
    // }
  };

    onPressMarker(e, index) {
        this.setState({
            selectedMarkerIndex: index,
            firstItem: index
        });
    }

    getSelectedMarker(index) {
        this.setState({selectedMarkerIndex: index});
    }

    // renderCluster = (cluster, onPress) => {
    //     const pointCount = cluster.pointCount,
    //         coordinate = cluster.coordinate,
    //         clusterId = cluster.clusterId
    //
    //     // use pointCount to calculate cluster size scaling
    //     // and apply it to "style" prop below
    //
    //     // eventually get clustered points by using
    //     // underlying SuperCluster instance
    //     // Methods ref: https://github.com/mapbox/supercluster
    //     const clusteringEngine = this.map.getClusteringEngine(),
    //         clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)
    //
    //     return (
    //         <Marker coordinate={coordinate} onPress={onPress}>
    //             <View style={styles.clusterContainer}>
    //                 <Text style={styles.clusterText}>
    //                     {pointCount}
    //                 </Text>
    //             </View>
    //             {
    //                 /*
    //                   Eventually use <Callout /> to
    //                   show clustered point thumbs, i.e.:
    //                   <Callout>
    //                     <ScrollView>
    //                       {
    //                         clusteredPoints.map(p => (
    //                           <Image source={p.image}>
    //                         ))
    //                       }
    //                     </ScrollView>
    //                   </Callout>
    //
    //                   IMPORTANT: be aware that Marker's onPress event isn't really consistent when using Callout.
    //                  */
    //             }
    //         </Marker>
    //     )
    // }

    // renderMarker = (flat, index) => {
    //     return (
    //         <Marker
    //             key={index}
    //             pinColor={index === this.activeIndex ? 'green' : 'red'}
    //             coordinate={{
    //                 latitude: flat.latitude,
    //                 longitude: flat.longitude
    //             }}>
    //
    //         </Marker>
    //     )
    // }

    setCurrentDeltas = location => {
        this.setState({
            region: {
                latitudeDelta: location.latitudeDelta,
                longitudeDelta: location.longitudeDelta
            }
        });
    }

    setCurrentRegion = (location) => {
        let filter = this.props.filter;
        let tempLong = location.longitude - location.longitudeDelta;
        let tempLat = location.latitude + location.latitudeDelta;

        let topRightLat = tempLat
        let topRightLong = tempLong + location.longitudeDelta*2

        let bottomRightLat = topRightLat - location.latitudeDelta*2
        let bottomRightLong = topRightLong

        let bottomLeftLat = bottomRightLat
        let bottomLeftLong = bottomRightLong - location.longitudeDelta*2

        let coordinates = [
                { latitude: tempLat, longitude: tempLong },
                { latitude: topRightLat, longitude: topRightLong },
                { latitude: bottomRightLat, longitude: bottomRightLong },
                { latitude: bottomLeftLat, longitude: bottomLeftLong },
                { latitude: tempLat, longitude: tempLong },
            ]

        let coordinatesWrapper = [
            {coordinates, holes: [], id: 0}
        ];

        filter.coordinates = coordinatesWrapper;

        // console.log(filter)
        this.props.fetchByRegion(filter)
        // return filter;
    }

  render() {
        // console.log('LENGTH IN RENDER !!!!!', this.props.list.length)
        let initialLocation = {
            latitude: 53.902231,
            longitude: 27.561876,
        }

        if(this.props.list.length > 0) {
            initialLocation.latitude = this.props.list[0].latitude
            initialLocation.longitude = this.props.list[0].longitude
        }

    return (
      <Container style={{ flex: 1 }}>
        <MapView
          ref={map => this.map = map}
          style={{ flex: 3, width: width, height: height}}
          initialRegion={{
            latitude: initialLocation.latitude,
            longitude: initialLocation.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          onRegionChangeComplete={this.setCurrentDeltas}
          showsUserLocation={true}
          loadingEnabled={true}
          showsTraffic={false}
          showsPointsOfInterest={false}
          // renderMarker={this.renderMarker}
          // renderCluster={this.renderCluster}
          // removeClippedSubviews={true}
        >
            {this.props.list.map((flat, index) => {
                return (
                    <Marker
                        style={this.state.selectedMarkerIndex === index ? {opacity: 1, zIndex: 999999999} : {opacity: 0.8}}
                        key={`marker-${index}`}
                        pinColor={this.state.selectedMarkerIndex === index ? 'green' : 'red'}
                        onPress={(e) => this.onPressMarker(e, index)}
                        coordinate={{
                            latitude: flat.latitude,
                            longitude: flat.longitude
                        }}>
                    </Marker>
                )
            })}
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
        <View style={{ flex: 2, backgroundColor: 'white'}}>
            {this.props.mapIsLoading ?
                <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                    <DotsLoader size={12}/>
                </View> :
                <Carousel
                    containerCustomStyle={{marginLeft: -2 * MARGIN_LEFT}}
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.props.list}
                    firstItem={this.state.firstItem}
                    renderItem={this._renderItem}
                    itemWidth={CARD_WIDTH}
                    enableMomentum={true}
                    decelerationRate={0.7}
                    sliderWidth={width + 2 * MARGIN_LEFT}
                    onSnapToItem={(index) => {
                        let flat = this.props.list[index];
                        let coordinate = {
                            latitude: flat.latitude,
                            longitude: flat.longitude
                        };
                        this.activeIndex = index;
                        this.map.animateToRegion(
                            {
                                ...coordinate,
                                latitudeDelta: this.state.region.latitudeDelta,
                                longitudeDelta: this.state.region.longitudeDelta,
                            },
                            500
                        );
                        this.getSelectedMarker(index)
                        // this.map.getMapRef().animateToCoordinate(coordinate);

                    }}
                />
            }

            </View>
      </Container>
    );
  }

    _renderItem = ({item, index}) => {
        // console.log(index)
        return (
            <View style={{width: CARD_WIDTH, height: CARD_HEIGHT}}>
                <TouchableOpacity
                    onPress={() => this.onPreviewPress(item)}>
                    <FlatPreview flat={item} flatIndex={index} activeIndex={this.activeIndex} key={index}/>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    clusterContainer: {
        width: 30,
        height: 30,
        padding: 6,
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        borderColor: '#65bc46',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    clusterText: {
        fontSize: 13,
        color: '#65bc46',
        fontWeight: '500',
        textAlign: 'center',
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "yellow",
        // position: "absolute",
        borderWidth: 1,
        // borderColor: "yellow",
    },
    price: {
      position: "absolute",
      color: 'white',
      fontSize: 8,
      fontWeight: "700"
    },
    marker: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#1e823c',
        backgroundColor: "#23ad4d",
    },
});

export default FlatsMap;
