import * as React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Thumbnail,
  Text
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


import Carousel from 'react-native-snap-carousel';

import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload-deux';
import FlatPreview from "./components/FlatPreview/index";
import {Marker, Callout} from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster'
import PriceMarker from './components/PriceMarker/index'
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
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
const CARD_HEIGHT = height / 3;
const MARGIN_LEFT = 75;
const CARD_WIDTH = width - MARGIN_LEFT * 2;

class FlatsMap extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
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

  componentWillMount() {
    this.index = 0;
  }

  onPreviewPress = val => {
    this.props.navigation.navigate("FlatPage", {
      flat: val
    });
    // if (this.props.onFlatPreviewPressed) {
    //     this.props.onFlatPreviewPressed(val);
    // }
  };

    renderCluster = (cluster, onPress) => {
        const pointCount = cluster.pointCount,
            coordinate = cluster.coordinate,
            clusterId = cluster.clusterId

        // use pointCount to calculate cluster size scaling
        // and apply it to "style" prop below

        // eventually get clustered points by using
        // underlying SuperCluster instance
        // Methods ref: https://github.com/mapbox/supercluster
        const clusteringEngine = this.map.getClusteringEngine(),
            clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)

        return (
            <Marker coordinate={coordinate} onPress={onPress}>
                <View style={styles.clusterContainer}>
                    <Text style={styles.clusterText}>
                        {pointCount}
                    </Text>
                </View>
                {
                    /*
                      Eventually use <Callout /> to
                      show clustered point thumbs, i.e.:
                      <Callout>
                        <ScrollView>
                          {
                            clusteredPoints.map(p => (
                              <Image source={p.image}>
                            ))
                          }
                        </ScrollView>
                      </Callout>

                      IMPORTANT: be aware that Marker's onPress event isn't really consistent when using Callout.
                     */
                }
            </Marker>
        )
    }

    renderMarker = (flat, index) => {
        return (
            <Marker
                key={flat.originalId}
                pinColor={index === this.activeIndex ? 'green' : 'red'}
                coordinate={{
                    latitude: flat.latitude,
                    longitude: flat.longitude
                }}>

            </Marker>
        )
    }

  render() {
        let data = this.props.list.map(flat => {
            flat.location = {latitude: flat.latitude, longitude: flat.longitude}
            return flat;
        })
    return (
      <Container style={{ flex: 1 }}>
        <ClusteredMapView
          ref={map => this.map = map}
          style={{ flex: 3, width: width, height: height}}
          initialRegion={{
            latitude: 53.902231,
            longitude: 27.561876,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          data={data}
          showsUserLocation={true}
          loadingEnabled={true}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
        >
        </ClusteredMapView>
        <View style={{ flex: 2, backgroundColor: 'white'}}>
            <Carousel
                containerCustomStyle={{marginLeft: - 2 * MARGIN_LEFT}}
                ref={(c) => { this._carousel = c; }}
                data={this.props.list}
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

                    this.map.getMapRef().animateToCoordinate(coordinate);

                }}
            />
        </View>
      </Container>
    );
  }

    _renderItem ({item, index}) {
        return (
            <View style={{width: CARD_WIDTH, height: CARD_HEIGHT}}>
                <FlatPreview flat={item} key={index}/>
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
