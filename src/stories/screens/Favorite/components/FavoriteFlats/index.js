import * as React from "react";
import {
  List,
  ListItem,
  Thumbnail,
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

class FavoriteFlats extends React.Component<Props, State> {
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
          // borderTopWidth: 1,
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
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          {this.props.list.length > 0 ?
          <FlatList

              data={this.props.list}
              initialNumToRender={3}
              renderItem={({item, index}) => (
              <FlatRow key={item.index} flat={item} onRowPressed={this.onFlatRowPress} removeFavoriteFlat={this.props.removeFromFavorites}
                       favoriteFlats={this.props.list}/>
              )}
              keyExtractor={item => item.originalId}
              // ItemSeparatorComponent={this.renderSeparator}
              // ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              // onRefresh={this.handleRefresh}
              // refreshing={this.state.refreshing}
              // onEndReachedThreshold={2}
              /> :
              <View style={{alignItems: 'center', paddingTop: 20}}>
                <Image
                    resizeMode="contain"
                    source={require("../../../../../../assets/images/empty_fav.png")}
                    style={{ height: 200, width: 200 }}
                />
                <Text style={{fontSize: 18}}>Отслеживаемые квартиры отсутствуют</Text>
              </View>
          }

      </List>
    );
  }

}

export default FavoriteFlats;
