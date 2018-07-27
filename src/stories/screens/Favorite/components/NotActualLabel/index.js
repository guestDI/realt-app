import * as React from "react";
import {
  Text
} from "native-base";
import {
  View,
  SectionList,
  FlatList,
  TouchableOpacity,
  Platform,
  NativeModules,
  Dimensions,
  ActivityIndicator,
    Image,
    StyleSheet
} from "react-native";

const { StatusBarManager } = NativeModules;

export interface Props {
  navigation: any;
  list: any;
  loadMore: Function;
}
export interface State {
  monthPlus: number;
}

const { height, width } = Dimensions.get("window");
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

class NotActualLabel extends React.Component<Props, State> {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <View style={styles.notActualLabel}>
            <Text style={{color: "#FFF", fontSize: 24, fontWeight: 'bold'}}>Объявление не актуально</Text>
        </View>

    );
  }

}

const styles = StyleSheet.create({
    notActualLabel: {
        position: 'absolute',
        height: height * 0.3,
        width: width * 0.9,
        top: 15,
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#FFFFFF' ,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 1,
        backgroundColor: '#b5bbc5',
        opacity: 0.7
    }
});

export default NotActualLabel;
