import * as React from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  WebView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  NativeModules,
  Platform,
  SectionList,
  FlatList
} from "react-native";
import {
  Button,
  Icon,
  Root,
  Toast,
  Container,
  Header,
  Title,
  Content,
  Left,
  Body,
  Right
} from "native-base";
import { Card } from "react-native-elements";
import ImageView from "./components/ImageView";
import MapView from 'react-native-maps';
import formatDate from "../../../utils/utils";

export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
  movie: Object;
  myRate: ?{ rate: number, comment: string };
  onRateChanged: Function;
}

const { StatusBarManager } = NativeModules;

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

class FlatPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      visible: false,
      viewerVisible: false,
      follow: false,
      fullRead: false,
      statusBarColor: "rgba(0, 0, 0, 0.3)",
      friendsModalVisible: false,
      imageNumberSelected: 0,
      favorite: this.checkIfFavorite(this.props.favoriteFlats)
    };
      // console.log(this.checkIfFavorite(this.props.favoriteFlats))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.favoriteFlats !== nextProps.favoriteFlats) {
        this.setState({
            favorite: this.checkIfFavorite(nextProps.favoriteFlats),
        });
    }
  }

  viewerHandler = imageNumber => {
    this.setState({
      viewerVisible: true,
      statusBarColor: "black",
      imageNumberSelected: imageNumber
    });
  };

  onCloseViewerHandler = () => {
    this.setState({
      viewerVisible: false,
      statusBarColor: "rgba(0, 0, 0, 0.3)"
    });
  };

  onAddressClick = () => {
    this.refs._scrollView.scrollToEnd({ animated: true });
  };

  checkIfFavorite = (props) => {
    let flatId = this.props.flat.id;

    let collet = props.filter(flat => {
      let id = flat.id
      return flatId===id;
    })

    return collet.length > 0;
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

  onFavoriteHandler = () => {
    let current = this.state.favorite;
    this.setState({
      follow: !current
    });

    return this.state.favorite ? "Добавлено в избранное" : "Удалено из избранного";
  };

  getSource = source => {
    switch (source) {
      case "ONLINER":
        return "Onliner.by";
      case "REALTBY":
        return "Realt.by";
      case "KUFAR":
        return "Kufar.by";
      default:
        return "";
    }
  };

  render() {
    const param = this.props.navigation.state.params;
    // const {movie, myRate} = this.props;

    // const rate = myRate ? myRate.rate : null;
    // const comment = myRate ? myRate.comment : null;
    //
    const photos = this.props.flat.photos ? this.props.flat.photos : [];
    // const videos = movie.media && movie.media.video ? Object.values(movie.media.video) : [];
    // console.log(this.state.favorite)
    return (
      <Container>
        <Header>
          <Left>
            {/*<Button transparent>*/}
              <Icon
                active
                style={{color: "white", zIndex: 9999}}
                name="arrow-back"
                onPress={() => this.props.navigation.goBack()}
              />
            {/*</Button>*/}
          </Left>
          <Body>
            <Title>Аренда</Title>
          </Body>
          <Right>
            <Button transparent
                    style={{zIndex: 9999}}
                    onPress={() => this.manageFavoriteState()}
            >
              {this.state.favorite ?
                  <Icon
                      name="ios-star"
                      style={{ fontSize: 28, color: "yellow" }}
                  /> :
                  <Icon
                      name="ios-star-outline"
                      style={{ fontSize: 28, color: "yellow" }}
                  />
              }
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: "#FFFFFF" }} ref="_scrollView">
            <View style={styles.scrollContainer}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              >
                {photos.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() =>
                      this.viewerHandler(this.props.flat.photos.indexOf(image))
                    }
                  >
                    <Image
                      key={index}
                      style={styles.cardImage}
                      source={{ uri: image }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View>
                    <Text
                      style={{ fontSize: 24, fontWeight: "bold", padding: 5 }}
                    >
                      2-х комнатная
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column", right: 10 }}>
                    <Text style={{ fontSize: 12, color: "#8c919c" }}>
                      Обновлено:{" "}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#8c919c" }}>
                      {formatDate(this.props.flat.updatedOn)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{ fontSize: 32, fontWeight: "bold", paddingLeft: 5 }}
                >
                  {this.props.flat.price} $
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    resizeMode="contain"
                    source={require("../../../../assets/images/location-icon-grey.png")}
                    style={{ height: 24, width: 35 }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.onAddressClick()}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "blue",
                        textDecorationLine: "underline"
                      }}
                    >
                      {this.props.flat.address}
                    </Text>
                  </TouchableOpacity>
                </View>
                {this.props.flat.contacts.map((num, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 5
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        source={require("../../../../assets/images/phone-512.png")}
                        style={{ height: 24, width: 35 }}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL("tel:" + num).catch(err =>
                            console.error("An error occurred", err)
                          )
                        }
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "blue",
                            textDecorationLine: "underline"
                          }}
                        >
                          {num}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#aaafba",
                width: width * 0.95,
                alignSelf: "center"
              }}
            >
              <Text style={{ fontSize: 24, padding: 5, color: "#8c919c" }}>
                Описание
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5
              }}
            >
              {this.props.flat.description}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 18,
                  paddingLeft: 10,
                  fontWeight: "bold",
                  paddingRight: 5,
                  paddingBottom: 10
                }}
              >
                Источник:
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(this.props.flat.url).catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "blue",
                    textDecorationLine: "underline"
                  }}
                >
                  {this.getSource(this.props.flat.source)}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#aaafba",
                width: width * 0.95,
                alignSelf: "center"
              }}
            >
              <Text style={{ fontSize: 24, padding: 5, color: "#8c919c" }}>
                Местоположение
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                <Text style={{ fontSize: 18, padding: 5, color: "#8c919c" }}>
                  Район
                </Text>
                <Text style={{ fontSize: 18, padding: 5, color: "#8c919c" }}>
                  Улица
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 18, padding: 5 }}>Район</Text>
                <Text style={{ fontSize: 18, padding: 5 }}>
                  {this.props.flat.address}
                </Text>
              </View>
            </View>
            <View>
              <MapView
                style={{ flex: 1, width: width, height: height * 0.5 }}
                initialRegion={{
                  latitude: this.props.flat.latitude,
                  longitude: this.props.flat.longitude,
                  latitudeDelta: 0.025,
                  longitudeDelta: 0.005
                }}
                showsTraffic={false}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: this.props.flat.latitude,
                    longitude: this.props.flat.longitude
                  }}
                  title={this.props.flat.address}
                  image={require("../../../../assets/images/home-icon.png")}
                />
              </MapView>
            </View>
          </ScrollView>
          <ImageView
            visible={this.state.viewerVisible}
            page={this.state.imageNumberSelected}
            images={this.props.flat.photos}
            onClose={this.onCloseViewerHandler}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: height * 0.4,
    borderWidth: 1,
    borderColor: "#a5abb6",
    marginBottom: 5
  },
  cardImage: {
    width: width,
    height: "100%"
  },
  trailerContainer: {
    flex: 1,
    width: width / 3,
    height: 100,
    margin: 1
  }
});

export default FlatPage;
