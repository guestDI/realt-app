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
  ActivityIndicator
} from "react-native";
import moment from "moment";
import styles from "./styles";
import FlatPreview from "./components/FlatPreview";
import { MapView } from "expo";
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
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, width: width, height: height * 0.5 }}
          initialRegion={{
            latitude: 53.902863,
            longitude: 27.551579,
            latitudeDelta: 0.2192,
            longitudeDelta: 0.1191
          }}
          showsTraffic={false}
        >
          {this.props.list.map(flat => {
            return (
              <MapView.Marker
                key={flat.originalId}
                coordinate={{
                  latitude: flat.latitude,
                  longitude: flat.longitude
                }}
                image={require("../../../../../../assets/images/pin1.png")}
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
      </View>
    );
  }
}

export default FlatsMap;
