import * as React from "react";
import {
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Thumbnail
} from "native-base";
import { Rating } from "react-native-elements";
import { Card } from "react-native-elements";
import Gallery from "react-native-image-gallery";

import {
  Image,
  View,
  Dimensions,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView
} from "react-native";
export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
  movie: Object;
  page: number;
}

const { height, width } = Dimensions.get("window");

class ImageView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0
    };
  }

  render() {
    // const param = this.props.navigation.state.params;
    let wrappedImages = this.props.images.map(image => {
      return { source: { uri: image } };
    });
    return (
      <Modal
        visible={this.props.visible}
        transparent={true}
        onDismiss={this.props.onClose}
        onRequestClose={this.props.onClose}
      >
        <Gallery
          style={{ flex: 1, backgroundColor: "black" }}
          images={wrappedImages}
          initialPage={this.props.page}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    height: height * 0.7,
    width: width * 0.9,
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
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: height * 0.1
  },
  ratingsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "1%"
  }
});

export default ImageView;
