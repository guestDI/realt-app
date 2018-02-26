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
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import moment from "moment";
// import MapView from 'react-native-maps';
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

class FlatPreview extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.makeRemoteRequest();
  }

  render() {
    return (
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: this.props.flat.smallPhoto }}
          style={styles.cardImage}
        />
        <View style={{ flexDirection: "column" }}>
          <Text>{this.props.flat.price}$</Text>
          <Text style={{ fontSize: 14 }}>{this.props.flat.address}</Text>
        </View>

        {/*<ImageBackground style={styles.cardImage} source={{uri: this.props.flat.photos[0]}} />*/}
        {/*<Text>111111111</Text>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    height: height * 0.25,
    width: width * 0.5,
    flexDirection: "column"
    // borderWidth: 1,
    // borderColor: '#a5abb6',
    // marginBottom: 5
  },
  cardImage: {
    width: "100%",
    height: "65%"
  }
});

export default FlatPreview;
