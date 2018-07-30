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
import NotInterestedFlats from './components/NotInterestedFlats/index'

export interface Props {
  navigation: any;
  list: any;
  loadMore: Function;
}
export interface State {
  monthPlus: number;
}

class NotInterested extends React.Component<Props, State> {
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
            <Title style={{color: "#414141"}}>Не интересует</Title>
          </Body>
          <Right>
            {/*<Button*/}
                {/*style={{zIndex: 9999}}*/}
                {/*transparent onPress={() => this.props.navigation.navigate("Home")}>*/}
              {/*<Icon*/}
                  {/*active*/}
                  {/*name="md-list"*/}
                  {/*style={{color: "#414141"}}*/}
              {/*/>*/}
            {/*</Button>*/}
            {/*<Button*/}
                {/*style={{zIndex: 9999}}*/}
                {/*transparent onPress={() => this.props.navigation.navigate("Filter")}>*/}
              {/*<Icon*/}
                {/*active*/}
                {/*name="options"*/}
                {/*style={{color: "#414141"}}*/}
              {/*/>*/}
            {/*</Button>*/}
          </Right>
        </Header>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <NotInterestedFlats
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

export default NotInterested;
