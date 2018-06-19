import * as React from "react";
import {

  Icon,
} from "native-base";

import {
  Image,
  View,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
    Animated
} from "react-native";
import formatDate from "../../../utils/utils";
import { LazyloadScrollView, LazyloadView, LazyloadImage } from 'react-native-lazyload-deux'
import Carousel from 'react-native-banner-carousel';
import Paging from '../Paging'

export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
}

const { height, width } = Dimensions.get("window");
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

class FlatRow extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

      this.state = {
          activeSlide: 0,
      };
  }

  onRowPress = () => {
    if (this.props.onRowPressed) {
      //for little bit smoother click animation
        setTimeout(() => {
            this.props.onRowPressed(this.props.flat);
        }, 100)
    }
  };

    printNumber = () => {
    this.props.flat.contacts.map((num, index) => {
      return <Text key={index}>{num}</Text>;
    });
  };

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

  scrollX = new Animated.Value(0)

  render() {
    let position = Animated.divide(this.scrollX, width*0.9);

    return (
      <View style={{flex: 1, width: width * 0.9, alignSelf: 'center', backgroundColor: 'white', paddingTop: 15}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LazyloadScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.rowScrollContainer}
              name={`lazyload-list${this.props.flat.id}`}
              onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
              )}
              scrollEventThrottle={10}
            >
            {this.props.flat.photos.map((image, index) => {
              return(
                  <TouchableOpacity key={index} onPress={this.onRowPress} activeOpacity={1}>
                    <LazyloadImage
                      style={styles.cardImage}
                      host={`lazyload-list${this.props.flat.id}`}
                      source={{uri: image}}
                      borderRadius={3}

                    >
                    </LazyloadImage>
                  </TouchableOpacity>
              )
            })}
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
      <TouchableOpacity onPress={this.onRowPress}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20, fontWeight: '700',  paddingBottom: 5, color: '#242424' }}>
              {this.props.flat.title}
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
            <View style={{ flexDirection: "row", alignItems: 'center'}}>
              <Icon
                name="home"
                style={{ fontSize: 16, color: "#505050",}}
              />
              <Text style={{ fontSize: 16, paddingLeft: 2, color: "#505050" }}>
                {this.getRoomsNumber(this.props.flat.rentType)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center'}}>
              <Icon
                name="clock"
                style={{ fontSize: 16, color: "#505050", }}
              />
              <Text style={{ fontSize: 14, paddingLeft: 5, color: "#505050" }}>
                {formatDate(this.props.flat.updatedOn)}
              </Text>
            </View>
          </View>
          <View style={{paddingTop: 5}}>
            <Text style={{ fontSize: 24, color: '#505050', fontWeight: '700' }}>
              ${this.props.flat.price}
            </Text>
          </View>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    height: height,
    width: width,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
    // marginLeft: 5,
    // marginRight: 5,
  },
  rowScrollContainer: {
    flex: 1,
    height: height * 0.3,
      zIndex: 1
  },
  cardImage: {
    flex: 1,
    width: width*0.9,
    height: "100%",
  },
});

export default FlatRow;
