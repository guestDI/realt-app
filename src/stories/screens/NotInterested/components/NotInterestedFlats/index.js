import * as React from "react";
import {
  List,
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
    Image
} from "react-native";

import FlatRow from "../../../../common/FlatRow";
import NotInterestedFlatRow from "../NotInterestedFlatRow"

export interface Props {
  navigation: any;
  list: any;
  loadMore: Function;
}
export interface State {
  monthPlus: number;
}

const { height, width } = Dimensions.get("window");

class NotInterestedFlats extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.isListLoading,
      page: 0,
      error: null,
      refreshing: false
    };
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderColor: "#CED0CE"
        }}
      >
          <ActivityIndicator animating size="large" />
      </View>
    );
  };

  onFlatRowPress = val => {
    this.props.navigation.navigate("FlatPage", {
      flat: val
    });
  };

  render() {
    return (
        this.props.list.length === 0 ?
            <View style={{flex: 1, flexDirection: 'column', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                  resizeMode="contain"
                  source={require("../../../../../../assets/images/nothing.png")}
                  style={{ height: 130, width: 130 }}
              />
              <Text style={{fontSize: 20, marginTop: 5, color: "#737373"}}>Пока здесь ничего нет</Text>
            </View> :
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                        data={this.props.list}
                        initialNumToRender={3}
                        renderItem={({item, index}) => (
                            <TouchableOpacity key={index} onPress={() => this.onFlatRowPress(item)} activeOpacity={1}>
                                <NotInterestedFlatRow key={index} index={index} flat={item} notInterestedFlats={this.props.list}
                                                      removeNotInterestedFlat={this.props.removeNotInterestedFlat}/>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.originalId}
                        // ItemSeparatorComponent={this.renderSeparator}
                        // ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}
                        // onRefresh={this.handleRefresh}
                        // refreshing={this.state.refreshing}
                        // onEndReachedThreshold={2}
                    />
            </List>

    );
  }

}

export default NotInterestedFlats;
