import * as React from "react";
import {
  Button,
  Icon,
  Toast,
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
import FlatLabel from '../../../../../../common/FlatRow/FlatLabel'
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

      this.state = {
          favorite: this.checkIfFavorite(props.favoriteFlats)
      };
  }

    componentWillReceiveProps(nextProps) {
        if (nextProps.favoriteFlats && this.props.favoriteFlats !== nextProps.favoriteFlats) {
            this.setState({
                favorite: this.checkIfFavorite(nextProps.favoriteFlats),
            });
        }
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

    checkIfFavorite = (props) => {
        if (props) {
            let flatId = this.props.flat.id;

            let collet = props.filter(flat => {
                let id = flat.id
                return flatId === id;
            })

            return collet.length > 0;
        } else {
            return false;
        }
    }

    manageFavoriteState = () => {
        if(this.state.favorite){
            this.props.removeFavoriteFlat(this.props.flat.id)
            Toast.show({
                text: "Удалено из избранного",
                position: 'bottom',
                buttonText: 'Скрыть',
                duration: 1500
            })
        } else {
            this.props.addFavoriteFlat(this.props.flat)
            Toast.show({
                text: "Добавлено в избранное",
                position: 'bottom',
                buttonText: 'Скрыть',
                duration: 1500
            })
        }
        this.setState({
            favorite: !this.state.favorite
        });
    };

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
          {this.props.flat.landlordType !==null ?
              <FlatLabel text={this.props.flat.landlordType} style={{zIndex: 9999, top: 15, left: 16}}/> : null}
          <Button transparent
                  rounded
                  style={{zIndex: 9999, position:'absolute', top: 6, right: 6}}
                  // onPress={() => this.manageFavoriteState()}
          >
              {this.state.favorite ?
                  <Icon
                      name="md-heart"
                      style={{ fontSize: 28, color: "#ff5367" }}
                  /> :
                  <Icon
                      name="md-heart-outline"
                      style={{ fontSize: 28, color: "#FFFFFF" }}
                  />
              }
          </Button>

        <View style={{ flexDirection: "row" }}>
          <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '700',  paddingBottom: 4, color: '#242424' }}>
              {this.props.flat.title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
          <View style={{ flexDirection: "row", alignItems: 'center'}}>
              <Image
                  resizeMode="contain"
                  source={require("../../../../../../../../assets/images/sofa.png")}
                  style={{ height: 25, width: 25 }}
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
