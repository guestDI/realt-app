import * as React from "react";
import {DotsLoader, TextLoader} from 'react-native-indicator';
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
  Tab,
  Tabs,
  TabHeading
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
import styles from "./styles";
import FlatsList from "./components/FlatsList/index";
import FlatsMap from "./components/FlatsMap";
import FavoriteFlats from './components/FavoriteFlats'
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

class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 0,
      error: null,
      refreshing: false,
      visible: false
    };
  }

  handleLoadMore = (page) => {
    this.props.loadMore(page);
  };

  renderFooter = () => {
    // if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 30,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        {/*<ActivityIndicator animating size="large" />*/}
      </View>
    );
  };

  filterHandler = () => {
    this.setState({
      visible: true
    });
  };

  onCloseFilterHandler = () => {
    this.setState({
      visible: false
    });
  };

  onFlatRowPress = val => {
    this.props.navigation.navigate("FlatPage", {
      flat: val
    });
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
                style={{zIndex: 9999}}
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
                transparent>
              <Icon
                active
                name="menu"
              />
            </Button>
          </Left>
          <Body>
            <Title>Аренда</Title>
          </Body>
          <Right>
            <Button
                style={{zIndex: 9999}}
                transparent onPress={() => this.props.navigation.navigate("Map")}>
              <Icon
                  active
                  name="map"
              />
            </Button>
            <Button
                style={{zIndex: 9999}}
                transparent onPress={() => this.props.navigation.navigate("Favorite")}>
              <Icon
                  active
                  name="md-star"
              />
            </Button>
            <Button
                style={{zIndex: 9999}}
                transparent onPress={() => this.props.navigation.navigate("Filter")}>
              <Icon
                active
                name="options"
              />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {this.props.loadingState ?
              <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                <DotsLoader size={12}/>
                <View style={{marginTop: 5}}>
                  <TextLoader text="Загрузка..."/>
                </View>
              </View> :
          <FlatsList
            navigation={this.props.navigation}
            list={this.props.list}
            onListEndReached={this.handleLoadMore}
            isListLoading={this.props.loadingState}
            isListRefreshing={this.props.refreshListState}
            onRefreshList={this.props.refreshFlatsList}
          /> }
        </View>
      </Container>
    );
  }

}

export default Home;
