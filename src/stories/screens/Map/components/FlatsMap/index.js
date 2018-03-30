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
import MapView from 'react-native-maps';
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
const LATITUDE_DELTA = 0.2122;
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

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <MapView
          ref={map => this.map = map}
          style={{ flex: 3, width: width, height: height}}
          initialRegion={{
            latitude: 53.902231,
            longitude: 27.561876,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          onRegionChangeComplete={region => {
              this.setState({
                  region: region,
              })
          }}
          showsUserLocation={true}
          loadingEnabled={true}
        >

          {this.props.list.map((flat, index) => {



            return (
              <MapView.Marker
                key={flat.originalId}
                pinColor={index === this.activeIndex ? 'green' : 'red'}
                coordinate={{
                  latitude: flat.latitude,
                  longitude: flat.longitude
                }}>

              </MapView.Marker>
            );
          })}
        </MapView>
        <View style={{ flex: 2, backgroundColor: 'white'}}>
            <Carousel
                containerCustomStyle={{marginLeft: - 2 * MARGIN_LEFT}}
                ref={(c) => { this._carousel = c; }}
                data={this.props.list}
                renderItem={this._renderItem}
                itemWidth={CARD_WIDTH}
                enableMomentum={true}
                decelerationRate={0.9}
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
                        350
                    );

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
