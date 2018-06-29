import * as React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Thumbnail,
  Text,
  Footer
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
          // borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
          <ActivityIndicator animating size="large" />
      </View>
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
                    <View key={index} style={{flex: 1, backgroundColor: 'white', paddingTop: 10}}>
                        <FlatRow key={index} flat={item} addFavoriteFlat={this.props.addFavoriteFlat} removeFavoriteFlat={this.props.removeFavoriteFlat}
                                 onRowPressed={this.onFlatRowPress} favoriteFlats={this.props.favoriteFlats}/>
                    </View>
                )}
                keyExtractor={item => `${item.id}`}
                // ItemSeparatorComponent={this.renderSeparator}
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
