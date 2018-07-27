import * as React from "react";
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
    StatusBar
} from "react-native";
import moment from "moment";
import styles from "./styles";
import FavoriteFlats from './components/FavoriteFlats'

export interface Props {
  navigation: any;
  list: any;
  loadMore: Function;
}
export interface State {
  monthPlus: number;
}

class Favorite extends React.Component<Props, State> {
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
                style={{color: "#414141"}}
                active
                name="menu"
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: "#414141"}}>Избранное</Title>
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
                transparent onPress={() => this.props.navigation.navigate("Map")}>
              <Icon
                  active
                  name="map"
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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FavoriteFlats
                navigation={this.props.navigation}
                list={this.props.favorites}
                flatsList={this.props.flatsList}
                removeFromFavorites={this.props.removeFavoriteFlat}
            />
        </View>
      </Container>
    );
  }

}

export default Favorite;
