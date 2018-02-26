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
  ActivityIndicator
} from "react-native";
import moment from "moment";
import FlatRow from "../../../../common/FlatRow";
import styles from "./styles";
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
      refreshing: false
    };
  }

    componentWillReceiveProps(nextProps) {
        if (this.props.isListLoading !== nextProps.isListLoading) {
            this.setState({
                loading: nextProps.isListLoading,
            });
        }
    }

  handleRefresh = () => {
    this.setState(
      {
        page: 0,
        refreshing: true
      },
      () => {
        this.props.loadMore(0);
      }
    );
  };

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
        <FlatList
            initialNumToRender={3}
          data={this.props.list}
          renderItem={({ item, index }) => (
            <FlatRow key={index} flat={item} onRowPressed={this.onFlatRowPress} />
          )}
          keyExtractor={item => item.originalId}
          // ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          // onRefresh={this.handleRefresh}
          // refreshing={this.state.refreshing}
          onEndReached={this.loadMoreFlats}
          onEndReachedThreshold={2}
        />
    );
  }

}

export default FlatsList;
