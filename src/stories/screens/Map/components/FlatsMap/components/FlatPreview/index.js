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
import formatDate from "../../../../../../../utils/utils";
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
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = CARD_HEIGHT - 20;

class FlatPreview extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
  }

    getRoomsNumber = room => {
        switch (room) {
            case "ONE_ROOM":
                return "1 комната";
            case "TWO_ROOMS":
                return "2 комнаты";
            case "THREE_ROOMS":
                return "3 комнаты";
            case "FOUR_OR_MORE_ROOMS":
                return "4 и больше комнат";
            default:
                return "";
        }
    }

  render() {
    return (
      <View style={styles.card}>
        <Image
            resizeMode='cover'
          source={{ uri: this.props.flat.smallPhoto }}
          style={styles.cardImage}
        />
        {/*<View style={{ flexDirection: "column" }}>*/}
          {/*<Text style={{ fontSize: 14 }}>{this.props.flat.address}</Text>*/}
          {/*<Text>{this.props.flat.price}$</Text>*/}
        {/*</View>*/}
        <View style={{ flexDirection: "row" }}>
          <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '700',  paddingBottom: 4, color: '#242424' }}>
              {this.props.flat.title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
          <View style={{ flexDirection: "row", alignItems: 'center'}}>
            <Icon
                name="home"
                style={{ fontSize: 14, color: "#505050",}}
            />
            <Text style={{ fontSize: 14, paddingLeft: 2, color: "#505050" }}>
                {this.getRoomsNumber(this.props.flat.rentType)}
            </Text>
          </View>
          {/*<View style={{ flexDirection: "row", alignItems: 'center'}}>*/}
            {/*<Icon*/}
                {/*name="clock"*/}
                {/*style={{ fontSize: 12, color: "#505050", }}*/}
            {/*/>*/}
            {/*<Text style={{ fontSize: 12, paddingLeft: 5, color: "#505050" }}>*/}
                {/*{formatDate(this.props.flat.updatedOn)}*/}
            {/*</Text>*/}
          {/*</View>*/}
        </View>
        <View style={{paddingTop: 4}}>
          <Text style={{ fontSize: 18, color: '#505050', fontWeight: '700' }}>
            ${this.props.flat.price}
          </Text>
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
    // height: height * 0.15,
    flexDirection: "column"
    // borderWidth: 1,
    // borderColor: '#a5abb6',
    // marginBottom: 5
  },
    card: {
      paddingTop: 10,
      // elevation: 2,
      backgroundColor: "#FFF",
      marginHorizontal: 10,
      // shadowColor: "#000",
      // shadowRadius: 5,
      // shadowOpacity: 0.3,
      // shadowOffset: { x: 2, y: -2 },
      // overflow: "hidden",
    },
  cardImage: {
    width: "100%",
    height: "68%"
  }
});

export default FlatPreview;
