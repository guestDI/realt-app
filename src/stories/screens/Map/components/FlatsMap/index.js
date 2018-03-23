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
const LATITUDE_DELTA = 0.3122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;


class FlatsMap extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 0,
      error: null,
      refreshing: false
    };
  }

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }

  componentDidMount() {
    // this.makeRemoteRequest();
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
          {this.props.list.map(flat => {
            return (
              <MapView.Marker
                key={flat.originalId}
                coordinate={{
                  latitude: flat.latitude,
                  longitude: flat.longitude
                }}

                onCalloutPress={() =>
                  this.props.navigation.navigate("FlatPage", {
                    flat: flat
                  })
                }
              >
                <MapView.Callout>
                  <FlatPreview flat={flat} />
                </MapView.Callout>
              </MapView.Marker>
            );
            // this.printMarker(flat.latitude, flat.longitude, flat.price);
          })}
        </MapView>
        <View style={{ flex: 2}}>
          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            // style={styles.cardScrollContainer}
            snapToInterval={CARD_WIDTH}
            // onScroll={Animated.event(
            //     [
            //         {
            //             nativeEvent: {
            //                 contentOffset: {
            //                     x: this.animation,
            //                 },
            //             },
            //         },
            //     ],
            //     { useNativeDriver: true }
            // )}
            style={styles.scrollView}
            contentContainerStyle={styles.endPadding}
          >
            {this.props.list.map((flat, index) => {
              return(
                  <View style={{flex: 1}} key={index}>
                    <FlatPreview flat={flat} />
                    {/*<Image
                        source={{uri: flat.smallPhoto}}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />*/}
                    {/*<LazyloadImage*/}
                        {/*style={styles.cardImage}*/}
                        {/*host={`lazyload-list${flat.id}`}*/}
                        {/*source={{uri: flat.smallPhoto}}*/}
                        {/*borderRadius={3}*/}
                    {/*>*/}
                    {/*</LazyloadImage>*/}
                  </View>
              )
            })}
          </ScrollView>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {

    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    textContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    cardScrollContainer: {
        flex: 1,
        // height: height * 0.15,
        zIndex: 1
    }
});

export default FlatsMap;
