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
  Image
} from "react-native";
import moment from "moment";
import styles from "./styles";
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
          style={{ flex: 1, width: width, height: height * 0.5 }}
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
                // image={require("../../../../../../assets/images/pin1.png")}

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
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}
                          style={{position: 'absolute', bottom: 20, right: 20, zIndex: 99999999999, }}>
          <Image
            resizeMode="contain"
            source={require("../../../../../../assets/images/List_64.png")}
            style={{ height: 64, width: 64 }}
          />
        </TouchableOpacity>
      </Container>
    );
  }
}

export default FlatsMap;
