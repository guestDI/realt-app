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
  ActivityIndicator,
    StatusBar
} from "react-native";
import moment from "moment";
import styles from "./styles";
import FlatsMap from "./components/FlatsMap";
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

class Map extends React.Component<Props, State> {
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
      // console.log(1, this.props.filter)
    return (
      <Container>
        <Header style={{ backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#a3a3a3' }}>
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
                active
                name="menu"
                style={{color: "#414141"}}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: "#414141"}}>Карта</Title>
          </Body>
          <Right>
            <Button
                style={{zIndex: 9999}}
                transparent onPress={() => this.props.navigation.navigate("Home")}>
              <Icon
                  active
                  name="md-list"
                  style={{color: "#414141"}}
              />
            </Button>
            <Button
                style={{zIndex: 9999}}
                transparent onPress={() => this.props.navigation.navigate("Favorite")}>
              <Icon
                  active
                  name="md-star"
                  style={{color: "#414141"}}
              />
            </Button>
            <Button
                style={{zIndex: 9999}}
                transparent onPress={() => this.props.navigation.navigate("Filter")}>
              <Icon
                active
                name="options"
                style={{color: "#414141"}}
              />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
            <FlatsMap
                navigation={this.props.navigation}
                list={this.props.flatsOnMap}
                filter={this.props.filter}
                fetchByRegion={this.props.fetchFlats}
                mapIsLoading={this.props.mapListIsLoading}
                addFavoriteFlat={this.props.addFavoriteFlat}
                removeFavoriteFlat={this.props.removeFavoriteFlat}
                favoriteFlats={this.props.favoriteFlats}
                networkState={this.props.networkState}
                refreshFlatsList={this.props.refreshFlatsList}
            />
        </View>
      </Container>
    );
  }
}

export default Map;
