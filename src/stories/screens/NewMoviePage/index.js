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
  FlatList,
    Animated,
    Share,
} from "react-native";
import {
  Button,
  Icon,
  Toast,
  Container,
  Header,
  Title,
  Left,
  Body,
  Right,
    Footer,
    FooterTab
} from "native-base";
import { Button as ButtonElement } from "react-native-elements";
import ImageView from "./components/ImageView";
import MapView from 'react-native-maps';
import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload-deux';
import formatDate from "../../../utils/utils";
import Modal from 'react-native-modalbox';
import Popover from "./components/Popover";


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
// const arr = ['fridge', 'stove', 'wifi', 'wash', 'tv', 'air_condition']

class FlatPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
        isOpen: false,
        isDisabled: false,
        swipeToClose: true,
        currentOptionPosition: {},
        currentOptionIndex: 0,
        isPopoverVisible: false,
      alert: null,
      visible: false,
      viewerVisible: false,
      follow: false,
      fullRead: false,
      statusBarColor: "rgba(0, 0, 0, 0.3)",
      friendsModalVisible: false,
      imageNumberSelected: 0,
      optionsLocations: [],
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

  shareLink = () => {
      Share.share({
          message: this.props.flat.url,
          url: this.props.flat.url,
          title: this.props.flat.address
      }, {
          // Android only:
          dialogTitle: 'Поделиться ссылкой',
          // iOS only:
          excludedActivityTypes: [
              'com.apple.UIKit.activity.PostToTwitter'
          ]
      })
  }

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

  getRoomsNumber = room => {
    switch (room) {
      case "ROOM":
        return "комната отдельно"
      case "ONE_ROOM":
        return "1 комнатная";
      case "TWO_ROOMS":
        return "2-х комнатная";
      case "THREE_ROOMS":
        return "3-х комнатная";
      case "FOUR_OR_MORE_ROOMS":
          return "4-х комнатная";
      default:
        return "";
    }
  }

    scrollX = new Animated.Value(0)

    callLandlord = () => {
        if(this.props.flat.contacts.length === 1){
            let num = this.props.flat.contacts[0];
            Linking.openURL("tel:" + num).catch(err =>
                console.error("An error occurred", err)
            )
        } else {
            this.setState({
                isOpen: true
            });
        }
    }



    returnFacility = () => {
      let arr = [];
      if(this.props.flat.options) {
          let strArr = this.props.flat.options.split(',')
          strArr.map(c => {
              arr.push(c.trim())
          })
      }
      return arr;
    }



    closePopover = () => {
        let status = this.state.isPopoverVisible

        if(status === true) {
            this.setState({
                isPopoverVisible: false,

            })
        }
    }

  render() {
    const param = this.props.navigation.state.params;
    let position = Animated.divide(this.scrollX, width);

    const photos = this.props.flat.photos ? this.props.flat.photos : [];
    return (
      <Container>
        <Header style={{ backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#D8D8D8' }}>
            <StatusBar
                barStyle={ 'dark-content'}
                backgroundColor={'#FFFFFF'}
                translucent={false}
            />
          <Left>
            {/*<Button transparent>*/}
              <Icon
                active
                style={{color: "#414141", zIndex: 9999}}
                name="arrow-back"
                onPress={() => this.props.navigation.goBack()}
              />
            {/*</Button>*/}
          </Left>
          <Body>
            <Title style={{color: "#414141"}}>Аренда</Title>
          </Body>
          <Right>
            <Button transparent
                    rounded
                    style={{zIndex: 9999}}
                    onPress={() => this.shareLink()}
            >
              <Icon
                  active
                  style={{color: "#414141", zIndex: 9999}}
                  name="share"
              />
            </Button>
            <Button transparent
                    rounded
                    style={{zIndex: 9999}}
                    onPress={() => this.manageFavoriteState()}
            >
              {this.state.favorite ?
                  <Icon
                      name="md-heart"
                      style={{ fontSize: 26, color: "#ff5367" }}
                  /> :
                  <Icon
                      name="md-heart-outline"
                      style={{ fontSize: 26, color: "#414141" }}
                  />
              }
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: "#FFFFFF" }}  ref="_scrollView">
            <View style={styles.scrollContainer} >
              <LazyloadScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                name="flat-image-list"
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
                )}
                scrollEventThrottle={10}
              >
                {photos.map((image, index) => (
                  <TouchableOpacity
                    key={`${index}`}
                    activeOpacity={0.7}
                    onPress={() =>
                      this.viewerHandler(this.props.flat.photos.indexOf(image))
                    }
                  >
                    <LazyloadImage
                      key={index}
                      host="flat-image-list"
                      style={styles.cardImage}
                      source={{ uri: image }}
                    />
                  </TouchableOpacity>
                ))}
              </LazyloadScrollView>
                {this.props.flat.photos.length > 1 ?
                    <View style={{ flexDirection: 'row', position:'absolute', bottom:10, zIndex: 9999999 }}>
                        {this.props.flat.photos.map((_, i) => {
                            let opacity = position.interpolate({
                                inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                                outputRange: [0.2, 1, 0.2], // when position is not i, the opacity of the dot will animate to 0.3
                                extrapolate: 'clamp'
                            });
                            return (
                                <Animated.View
                                    key={i}
                                    style={{ opacity, height: 6, width: 6, backgroundColor: '#FFFFFF', margin: 3, borderRadius: 5}}
                                />
                            );
                        })}
                    </View> : null}
            </View>
            <View style={{ flex: 1, width: width * 0.92, alignSelf: "center", marginBottom: 10, marginTop: 5}}>
              <View style={{ flexDirection: "column", paddingLeft: 10 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <View style={{ flexDirection: "row", right: 10, alignItems: 'center' }}>
                      <Image
                          resizeMode="contain"
                          source={require("../../../../assets/images/sofa.png")}
                          style={{ height: 45, width: 45 }}
                      />
                    <Text
                      style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 5, color: "#474c57" }}
                    >
                      {this.getRoomsNumber(this.props.flat.rentType)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" , alignItems: 'center'}}>
                    <Image
                      resizeMode="contain"
                      source={require("../../../../assets/images/recent_copy.png")}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={{ fontSize: 12, paddingLeft: 5, color: "#8b909b" }}>
                      {formatDate(this.props.flat.updatedOn)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: width * 0.92,
                alignSelf: "center",
                borderBottomWidth: 1,
                borderBottomColor: '#ebedeb',
              }}
            >
              <Text style={{ fontSize: 24, color: "#474c57", fontWeight: "bold", marginBottom: 10, }}>
                 Описание
              </Text>
                {!this.props.flat.description || 0 === this.props.flat.description.length ?
                    <Text
                        style={{
                            fontSize: 14,
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontStyle: 'italic',
                            color: '#474c57',
                            letterSpacing: 1
                        }}
                    >
                        Описание отсутствует
                    </Text> :
                    < Text
                        style={{
                            fontSize: 16,
                            paddingTop: 5,
                            paddingBottom: 5,
                            color: '#474c57',
                            letterSpacing: 1
                        }}
                    >
                        {this.props.flat.description}
                    </Text>
                }

                {!this.props.flat.condition || 0 === this.props.flat.condition.length ?
                    null :
                    <Text
                        style={{
                            fontSize: 16,
                            paddingTop: 5,
                            paddingBottom: 5,
                            color: '#474c57',
                            letterSpacing: 1
                        }}
                        >
                        {this.props.flat.condition}
                    </Text>

                }
                <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            paddingRight: 5,
                            paddingBottom: 10,
                            paddingTop: 5,
                            color: "#474c57"
                        }}
                    >
                        Источник:
                    </Text>
                    <TouchableOpacity style={{flexDirection: "row", alignItems: 'flex-end', paddingBottom: 10,}}
                        onPress={() =>
                            Linking.openURL(this.props.flat.url).catch(err =>
                                console.error("An error occurred", err)
                            )
                        }
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                paddingTop: 5,
                                color: "#474c57",
                            }}
                        >
                            {this.getSource(this.props.flat.source)}
                        </Text>
                        <Image
                            resizeMode="contain"
                            source={require("../../../../assets/images/new_window.png")}
                            style={{ height: 25, width: 25, paddingLeft: 3 }}
                        />
                    </TouchableOpacity>
                </View>
            </View >
            <View
                style={{
                    width: width * 0.92,
                    alignSelf: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: '#ebedeb',
                    marginTop: 20
                }}
            >
                <Text style={{ fontSize: 24, color: "#474c57", fontWeight: "bold", marginBottom: 15, }}>
                    Удобства
                </Text>
                {this.returnFacility().length === 0 ?
                    <Text
                        style={{
                            fontSize: 16,
                            paddingBottom: 5,
                            fontStyle: 'italic',
                            color: '#474c57',
                            letterSpacing: 1,
                            marginBottom: 5
                        }}
                    >
                        Информация отсутствует
                    </Text> :
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        width: width * 0.92,
                        alignSelf: "center",
                    }}>
                        {this.returnFacility().map((cond, index) => {
                            return (
                                <Popover
                                    onColor={"#87b357c4"}
                                    effect={"pulse"}
                                    status={true}
                                    text={this.returnFacility()[index]}
                                    optionPosition={this.state.currentOptionPosition}
                                    index={index}
                                    cond={cond}
                                    key={index}
                                />

                            )
                        })
                        }
                    </View>
                }
            </View>
            <View
              style={{
                width: width * 0.92,
                alignSelf: "center",
                marginBottom: 5,
                  marginTop: 20
              }}
            >
              <Text style={{ fontSize: 24, color: "#474c57", fontWeight: "bold", marginBottom: 10}}>
                Место
              </Text>
                <Text style={{ fontSize: 18, color: "#474c57" }}>
                    {this.props.flat.address}
                </Text>
            </View>
            <View>
              <MapView
                style={{ flex: 1, width: width*0.92, height: height * 0.4, alignSelf: 'center' }}
                initialRegion={{
                  latitude: this.props.flat.latitude,
                  longitude: this.props.flat.longitude,
                  latitudeDelta: 0.027,
                  longitudeDelta: 0.007
                }}
                showsTraffic={false}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: this.props.flat.latitude,
                    longitude: this.props.flat.longitude
                  }}
                  title={this.props.flat.address}
                  // image={require('../../../../assets/images/home-icon.png') }
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
          <Footer style={{height: '10%',}}>
              <FooterTab style={{backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#eeeeee'}}>
                  <View  style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: 'center'
                  }}>
                      <View style={{marginLeft: 15, flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                          <Text
                              style={{ fontSize: 22, fontWeight: "bold", paddingLeft: 5, color: '#414141' }}
                          >
                              ${this.props.flat.price}
                          </Text>
                          <Text
                              style={{ fontSize: 12, fontWeight: "bold", paddingLeft: 5, color: '#8c8c8c', paddingBottom: 3 }}
                          >
                              В МЕСЯЦ
                          </Text>
                      </View>
                      <View style={{marginRight: 10, width: '40%'}}>
                          {/*<TouchableOpacity style={{width: 60, height: 60, justifyContent: 'center',*/}
                              {/*alignItems: 'center', backgroundColor: '#4fd344', borderRadius: 50}}>*/}
                              {/*<Icon*/}
                                  {/*active*/}
                                  {/*style={{color: "#FFFFFF", zIndex: 9999}}*/}
                                  {/*name="md-call"*/}
                              {/*/>*/}
                          {/*</TouchableOpacity>*/}
                          <ButtonElement style={{width: '100%', justifyContent: 'center'}}
                              raised
                              bordered
                              borderRadius={5}
                              backgroundColor='#4fd344'
                              icon={{name: 'md-call', type: 'ionicon'}}
                              title='Позвонить'
                              onPress={() => this.callLandlord()} />
                      </View>
                  </View>
              </FooterTab>
          </Footer>
          <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})} style={[styles.modal, styles.modal4]} backButtonClose={true}
                 position={"bottom"} ref={"modal4" }>
              <Text style={{ fontSize: 15, color: '#8c8c8c', paddingTop: 10, paddingBottom: 10 }}>Выберите номер для звонка</Text>
              {this.props.flat.contacts.map((num, index) => {
                  return (
                      <View
                          key={index}
                          style={{
                              alignItems: "center",
                              paddingBottom: 15,
                          }}
                      >
                          {/*<Image*/}
                              {/*resizeMode="contain"*/}
                              {/*source={require("../../../../assets/images/phone-512.png")}*/}
                              {/*style={{ height: 35, width: 35 }}*/}
                          {/*/>*/}
                          <ButtonElement style={{width: '100%', justifyContent: 'center'}}
                                         rounded
                                         borderRadius={5}
                                         backgroundColor='#4fd344'
                                         icon={{name: 'md-call', type: 'ionicon'}}
                                         title={num}
                                         onPress={() =>
                                             Linking.openURL("tel:" + num).catch(err =>
                                                 console.error("An error occurred", err)
                                             )
                                         } />
                      </View>
                  );
              })}
              {/*<Slider style={{width: 200}} value={this.state.sliderValue} onValueChange={(value) => this.setState({sliderValue: value})} />*/}
          </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: width,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
      bottom: '10%'
  },
  modal4: {
    height: 'auto',
  },
});

export default FlatPage;
