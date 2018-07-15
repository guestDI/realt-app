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

class Popover extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status
    };
  }

    componentWillReceiveProps(nextProps) {
        if (this.props.status !== nextProps.status) {
            this.setState({
                status: nextProps.status,
            });
        }
    }

  _onPress() {
    this.props._onPress(!this.state.status);
    this.setState({ status: !this.state.status });
    switch (this.props.effect) {
      case "bounce":
        this.refs.view.bounce(800);
        break;
      case "flash":
        this.refs.view.flash(800);
        break;
      case "jello":
        this.refs.view.jello(800);
        break;
      case "pulse":
        this.refs.view.pulse(800);
        break;
    }
  }

  render() {
      if(this.props.optionLocation) {
          console.log('x', this.props.optionLocation.optionX)
          console.log('y', this.props.optionLocation.optionY)
      }
    return (
       <Animatable.View
          ref="view"
          style={{
              position: 'absolute',
              left: this.props.optionPosition.x, top: this.props.optionPosition.y,
            //marginBottom: 30,
              //marginBottom: 20,
            //paddingTop: 5,
            //paddingBottom: 5,
            paddingRight: 10,
              paddingLeft: 10,
            borderWidth: 1,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            borderColor: 'white',
              shadowColor: '#6d727d', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 1,
            backgroundColor: "#6d727d"
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
                fontSize: 10,
                paddingTop: 5,
                paddingBottom: 5
            }}
          >
            {this.props.text}
          </Text>
        </Animatable.View>

    );
  }
}

const styles = StyleSheet.create({
    arrowDown: {
      flex: 1,

        //paddingTop: 5,
        //paddingBottom: 5,
      paddingRight: 8,
      paddingLeft: 8,
      width: 0,
      height: 0,
      borderLeftWidth: 5,
      borderRightWidth: 5,
      borderTopWidth: 15,
      borderTopColor: '#6d727d',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent'
}
});

export default Popover;
