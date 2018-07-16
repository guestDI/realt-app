import * as React from "react";
import {
  Text,
} from "native-base";

import {
  Image,
  View,
  Dimensions,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  Slider,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import * as Animatable from "react-native-animatable";
export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
  onSave: Function;
}

const { height, width } = Dimensions.get("window");

class FlatLabel extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

  }

  render() {
    return (
       <View
          ref="view"
          style={{
            position: 'absolute',
            paddingRight: 10,
            paddingLeft: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'white',
              opacity: 0.8,
              // shadowColor: '#8b909b', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.7, shadowRadius: 2, elevation: 1,
            backgroundColor: "#87b357c4",
              ...this.props.style
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
                fontSize: 12,
                paddingTop: 5,
                paddingBottom: 5,
            }}
          >
            {this.props.text}
          </Text>
        </View>

    );
  }
}


export default FlatLabel;
