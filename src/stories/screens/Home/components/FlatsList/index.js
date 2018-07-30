import * as React from "react";
import {
  Container,
  Button,
  Icon,
    Toast
} from "native-base";
import {
  Image,
  View,
  SectionList,
  FlatList,
  TouchableOpacity,
  Platform,
  NativeModules,
  Dimensions,
  ActivityIndicator
} from "react-native";
import FavoriteFlatRow from "../../../../common/FavoriteFlatRow";
const { StatusBarManager } = NativeModules;

export interface Props {
  navigation: any;
  list: any;
  loadMore: Function;
}
export interface State {
  monthPlus: number;
}

class FlatsList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.isListLoading,
      page: 0,
      error: null,
    };
  }

    componentWillReceiveProps(nextProps) {
        if (this.props.isListLoading !== nextProps.isListLoading) {
            this.setState({
                loading: nextProps.isListLoading,
            });
        }

    }

  loadMoreFlats = () => {
    let currentPage = this.state.page + 1;
    this.setState(
      {
        page: currentPage
      },
      () => {
        this.props.onListEndReached(currentPage);
      }
    );
  };

  onRefresh = () => {
      this.setState({
          page: 0,
      }, () => {
          this.props.onRefreshList();
      })
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 21,
          borderColor: "#CED0CE"
        }}
      >
          <ActivityIndicator animating size="large" />
      </View>
    );
  };

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: width * 0.9,
              backgroundColor: "#c9cbc9",
              alignSelf: 'center',
              marginTop: 10
             }}
          />
        );
    };


  onFlatRowPress = val => {
      setTimeout(() => {
          this.props.navigation.navigate("FlatPage", {
              flat: val
          });
      }, 1);
  };

  render() {
    return (
        <Container>
            {this.props.list && this.props.list.length > 0 &&
            <FlatList
                removeClippedSubviews
                disableVirtualization
                initialNumToRender={3}
                data={this.props.list}
                renderItem={({item, index}) => (
                    <TouchableOpacity key={index} onPress={() => this.onFlatRowPress(item)} activeOpacity={1}>
                        <FavoriteFlatRow key={index} index={index} flat={item} favoriteFlats={this.props.favoriteFlats}
                                         removeFavoriteFlat={this.props.removeFavoriteFlat} addFavoriteFlat={this.props.addFavoriteFlat}/>
                    </TouchableOpacity>
                )}
                keyExtractor={item => `${item.id}`}
                ItemSeparatorComponent={this.renderSeparator}
                // ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.onRefresh}
                refreshing={this.props.isListRefreshing}
                onEndReached={this.loadMoreFlats}
                onEndReachedThreshold={2}
            />
            }
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Map")}
                              style={{position: 'absolute', bottom: 20, right: 20, zIndex: 99999999999, }}>
              <Image
                resizeMode="contain"
                source={require("../../../../../../assets/images/Map_64_1.png")}
                style={{ height: 64, width: 64 }}
              />
            </TouchableOpacity>

        </Container>

    );
  }

}

export default FlatsList;
