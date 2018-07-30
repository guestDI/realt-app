import * as React from "react";
import {DotsLoader, TextLoader} from 'react-native-indicator';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Right,
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
    StatusBar,
    Text
} from "react-native";

import FlatsList from "./components/FlatsList/index";
import FlatsMap from "./components/FlatsMap";
import FavoriteFlats from './components/FavoriteFlats'
import NetworkError from '../../common/NetworkError'
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
      visible: false,
      onNetworkStateChanged: false,
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

  // onRefresh = () => {
  //   this.setState({
  //     onNetworkStateChanged: !this.state.onNetworkStateChanged
  // })
  // }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#D8D8D8' }}>
          <StatusBar
              barStyle={ 'dark-content'}
              backgroundColor={'#FFFFFF'}
              translucent={false}
          />
          <Left>
            <Button
                style={{zIndex: 9999}}
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
                transparent>
              <Icon
                style={{color: "#414141"}}
                active
                name="menu"
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: "#414141"}}>Список</Title>
          </Body>
          <Right>
            <Button
                style={{zIndex: 9999}}
                transparent onPress={() => this.props.navigation.navigate("Map")}>
              <Icon
                  active
                  name="map"
                  style={{color: "#414141"}}
              />
            </Button>
            <Button
                style={{zIndex: 9999}}
                transparent onPress={() => this.props.navigation.navigate("Favorite")}>
              <Icon
                  active
                  name="md-star"
                  style={{color: "#414141", zIndex: 9999}}
              />
            </Button>
            <Button
                style={{zIndex: 9999}}
                transparent onPress={() => this.props.navigation.navigate("Filter")}>
              <Icon
                active
                name="options"
                style={{color: "#414141", zIndex: 9999}}
              />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/*{console.log(this.props.isInitialLoad)}*/}
            {this.props.networkState ? <NetworkError loadingState={this.props.loadingState} refresh={this.props.refreshFlatsList}/> : this.props.isInitialLoad ?
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
                  favoriteFlats={this.props.favoriteFlats}
                  addFavoriteFlat={this.props.addFavoriteFlat}
                  removeFavoriteFlat={this.props.removeFavoriteFlat}
                />
            }
        </View>
      </Container>
    );
  }

}

export default Home;
