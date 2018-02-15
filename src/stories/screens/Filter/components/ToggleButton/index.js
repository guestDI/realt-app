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
  Thumbnail,
  Container,
  Form,
  Item,
  Input
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

class ToggleButton extends React.Component<Props, State> {
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
    return (
      <TouchableWithoutFeedback onPress={() => this._onPress()}>
        <Animatable.View
          ref="view"
          style={{
            margin: 5,
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 20,
            paddingLeft: 20,
            backgroundColor: this.props.status ? this.props.onColor : "#bdbdbd"
          }}
        >
          <Text
            style={{
              color: this.props.status ? "white" : "#696969",
              fontWeight: "bold"
            }}
          >
            {this.props.text}
          </Text>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({});

export default ToggleButton;
