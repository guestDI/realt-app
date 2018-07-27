import * as React from "react";

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
import { CheckBox } from 'react-native-elements'

export interface State {}

const { height, width } = Dimensions.get("window");

class StationCheckbox extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked
    };
  }

    componentWillReceiveProps(nextProps) {
        if (this.props.checked !== nextProps.checked) {
            this.setState({
                checked: nextProps.checked,
            });
        }
    }

    handleCheckboxState = () => {
      let status = !this.state.checked

        this.setState({
            checked: !this.state.checked,
        });
        if (this.props.onCheckChanged) {
            this.props.onCheckChanged(this.props.station, status);
        }
    }


    render() {
      //console.log(this.state.checked)
    return (
        <CheckBox
            title={this.props.station.name}
            checked={this.state.checked}
            checkedColor={"#87b357c4"}
            textStyle={{color:"#414141"}}
            onPress={this.handleCheckboxState}
            //containerStyle={{borderColor: "#87b357c4", backgroundColor: '#FFF'}}
        />
    );
  }
}

export default StationCheckbox;
