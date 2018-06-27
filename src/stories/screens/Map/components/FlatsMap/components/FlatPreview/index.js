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
      // console.log(this.props.activeIndex)
      let style = this.props.activeIndex===this.props.flatIndex ? styles.activeCard : styles.card
    return (
      <View style={style}>
        <Image
            resizeMode='cover'
          source={{ uri: this.props.flat.smallPhoto }}
          style={styles.cardImage}
        />
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
        </View>
        <View style={{paddingTop: 4}}>
          <Text style={{ fontSize: 18, color: '#505050', fontWeight: '700' }}>
            ${this.props.flat.price}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    flexDirection: "column"
  },
  card: {
    marginTop: 5,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
  },
  activeCard: {
    marginTop: 5,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    borderTopWidth: 4,
    borderTopColor: 'green'
  },
  cardImage: {
    width: "100%",
    height: "68%"
  }
});

export default FlatPreview;
