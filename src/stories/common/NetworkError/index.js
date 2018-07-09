import * as React from "react";
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
    Animated,
    TouchableWithoutFeedback
} from "react-native";

import {
    Icon,
} from "native-base";

import { Button as ButtonElement } from "react-native-elements";
import {DotsLoader, RippleLoader, RotationCircleLoader, CirclesRotationScaleLoader} from 'react-native-indicator';

export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
}

const { height, width } = Dimensions.get("window");
const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10


class NetworkError extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={{flex: 1, flexDirection: 'column', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                resizeMode="contain"
                source={require("../../../../assets/images/network_1.png")}
                style={{ height: 90, width: 130 }}
            />
            <Text style={{color: "#737373", fontSize: 20,}} >Проверьте состояние сети</Text>
                <TouchableOpacity style={{marginTop: 10}}
                                  onPress={this.props.refresh}>
                    {this.props.loadingState ? <CirclesRotationScaleLoader color="#737373" size={38}/> :
                        <Icon
                            style={{color: "#737373", fontSize: 38}}
                            active
                            name="md-refresh"

                        />
                    }
                </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    }
});

export default NetworkError;
