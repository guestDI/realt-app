import * as React from "react";
import {
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Thumbnail,
  List,
  ListItem,
  Card,
  CardItem,
  Container
} from "native-base";
import { SearchBar, Badge } from "react-native-elements";

import {
  Image,
  View,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import formatDate from "../../../utils/utils";

export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
}

const { height, width } = Dimensions.get("window");

class FlatRow extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
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
                return "1к.";
            case "TWO_ROOMS":
                return "2к.";
            case "THREE_ROOMS":
                return "3к.";
            case "FOUR_OR_MORE_ROOMS":
                return "4+";
            default:
                return "";
        }
    }

  render() {
    return (
      <ListItem onPress={this.onRowPress}>
        <View style={{ width: width * 0.95 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 5 }}>
            {this.props.flat.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <View style={{ paddingTop: 3 }}>
                <ImageBackground
                  source={{ uri: this.props.flat.smallPhoto }}
                  style={{ height: height * 0.1, width: width * 0.25 }}
                />
              </View>
              <View style={{ paddingTop: 5, width: width * 0.25 }}>
                <View
                  style={{
                    padding: 5,
                    borderWidth: 1,
                    borderColor: "#bec4cf",
                    borderRadius: 2,
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontSize: 14 }}>
                    {this.props.flat.price}$ /месяц
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                      name="home"
                      style={{ fontSize: 16, color: "#9da3ae", paddingLeft: 5 }}
                  />
                  <Text
                      style={{ fontSize: 14, paddingLeft: 2, color: "#9da3ae" }}
                  >
                      {this.getRoomsNumber(this.props.flat.rentType)}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 3 }}>
                  <Icon
                    name="camera"
                    style={{ fontSize: 16, color: "#9da3ae", paddingLeft: 5 }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#9da3ae",
                      padding: 3,
                      paddingTop: 0,
                      paddingBottom: 0
                    }}
                  >
                    {this.props.flat.photos.length}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    name="clock"
                    style={{ fontSize: 16, color: "#9da3ae", paddingLeft: 5 }}
                  />
                  <Text
                    style={{ fontSize: 12, paddingLeft: 5, color: "#9da3ae" }}
                  >
                    {formatDate(this.props.flat.updatedOn)}
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  numberOfLines={4}
                  style={{
                    fontSize: 14,
                    padding: 5,
                    paddingTop: 0,
                    paddingBottom: 0
                  }}
                >
                  {this.props.flat.description}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                {this.props.flat.contacts.map((num, index) => {
                  if (index <= 1) {
                    return (
                      <Text
                        style={{
                          fontSize: 14,
                          padding: 5,
                          paddingTop: 10,
                          paddingBottom: 0
                        }}
                        key={index}
                      >
                        {num}
                      </Text>
                    );
                  }
                })}
              </View>
            </View>
          </View>
        </View>
      </ListItem>
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
  }
});

export default FlatRow;
