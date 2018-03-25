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
  Animated,
  ScrollView,
  StyleSheet,
} from "react-native";

import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload-deux';
import FlatPreview from "./components/FlatPreview/index";
import MapView from 'react-native-maps';
import PriceMarker from './components/PriceMarker'
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
const CARD_WIDTH = CARD_HEIGHT - 20;

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
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= this.props.list.length) {
          index = this.props.list.length - 1;
        }

        if (index <= 0) {
          index = 0;
        }

        clearTimeout(this.regionTimeout);
        this.regionTimeout = setTimeout(() => {
          if (this.index !== index) {
            this.index = index;
            const coordinate={
              latitude: this.props.list[index].latitude,
              longitude: this.props.list[index].longitude
            }
            // const { coordinate } = this.props.list[index];
            this.map.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta,
              },
              350
            );
          }
        }, 10);
    });
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
      const interpolations = this.props.list.map((flat, index) => {
          const inputRange = [
              (index - 1) * CARD_WIDTH,
              index * CARD_WIDTH,
              ((index + 1) * CARD_WIDTH),
          ];
          const scale = this.animation.interpolate({
              inputRange,
              outputRange: [1, 2.5, 1],
              extrapolate: "clamp",
          });
          const opacity = this.animation.interpolate({
              inputRange,
              outputRange: [0.35, 1, 0.35],
              extrapolate: "clamp",
          });

          return { scale, opacity};
      });

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
          showsUserLocation={true}
          loadingEnabled={true}
        >

          {this.props.list.map((flat, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                   },
              ],
            };

            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };



            return (
              <MapView.Marker
                key={flat.originalId}
                coordinate={{
                  latitude: flat.latitude,
                  longitude: flat.longitude
                }}>

                <Animated.View style={styles.markerWrap}>
                  {/*<Animated.View style={styles.ring}/>*/}
                  <PriceMarker amount={flat.price} style={{
                      opacity: interpolations[index].opacity,
                      transform: [
                          { scale: interpolations[index].scale },
                      ],
                  }}
                  />
                  {/*<Animated.View style={styles.marker}/>*/}
                  {/*<Text style={styles.price}>${flat.price}</Text>*/}
                </Animated.View>
              </MapView.Marker>
            );
            // this.printMarker(flat.latitude, flat.longitude, flat.price);
          })}
        </MapView>
        <View style={{ flex: 2, backgroundColor: 'white'}}>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation,
                    },
                  },
                },
              ],
              { useNativeDriver: true },
            )}
            // style={styles.scrollView}
            contentContainerStyle={styles.endPadding}
          >
            {this.props.list.map((flat, index) => {
              return(
                  <View style={{flex: 1}} key={index}>
                    <FlatPreview flat={flat} />
                  </View>
              )
            })}
          </Animated.ScrollView>
        </View>
      </Container>
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
