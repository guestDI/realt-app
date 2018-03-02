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
                transparent onPress={() => this.props.navigation.navigate("Filter")}>
              <Icon
                active
                name="options"
              />
            </Button>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
          {/*<Container style={{marginTop: '2%'}}>*/}
          <Tabs
            tabContainerStyle={{ height: 50 }}
            tabBarPosition="top"
            tabBarUnderlineStyle={{ backgroundColor: "#bf6141" }}
          >
            <Tab
              heading={
                <TabHeading>
                  <Icon name="list" />
                </TabHeading>
              }
              activeTabStyle={{ backgroundColor: "#FFF" }}
              tabStyle={{ backgroundColor: "#FFF" }}
              activeTextStyle={{ color: "#bf6141", fontSize: 15 }}
              textStyle={{ color: "#959ba6", fontSize: 14 }}
            >
              <FlatsList
                navigation={this.props.navigation}
                list={this.props.list}
                onListEndReached={this.handleLoadMore}
                isListLoading={this.props.loadingState}
                // onRefresh={this.props.handleRefresh}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="ios-map-outline" />
                </TabHeading>
              }
              activeTabStyle={{ backgroundColor: "#FFF" }}
              tabStyle={{ backgroundColor: "#FFF" }}
              activeTextStyle={{ color: "#bf6141", fontSize: 15 }}
              textStyle={{ color: "#959ba6", fontSize: 14 }}
            >
              <FlatsMap
                navigation={this.props.navigation}
                list={this.props.flatsOnMap}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Icon name="star" />
                </TabHeading>
              }
              activeTabStyle={{ backgroundColor: "#FFF" }}
              tabStyle={{ backgroundColor: "#FFF" }}
              activeTextStyle={{ color: "#bf6141", fontSize: 15 }}
              textStyle={{ color: "#959ba6", fontSize: 14 }}
            >
              <FavoriteFlats
                  navigation={this.props.navigation}
                  list={this.props.favorites}
                  // onListEndReached={this.handleLoadMore}
                  // isListLoading={this.props.loadingState}
                  // onRefresh={this.props.handleRefresh}
              />
              {/*{this.props.favorites ?*/}
                {/*this.props.favorites.map((flat, index) => {*/}
                {/*return (*/}
                  {/*<Text key={index}>{flat.address}</Text>*/}
                {/*)*/}
              {/*}) : <View style={{ paddingTop: 20, alignItems: 'center' }}>*/}
                      {/*<Text style={{fontSize: 16}}>*/}
                        {/*Вы пока не отслеживаете ни одной квартиры.*/}
                      {/*</Text>*/}
                    {/*</View>*/}
              {/*}*/}
            </Tab>
          </Tabs>
          {/*</Container>*/}
        </View>
      </Container>
    );
  }

  // renderItem = ({item}) => {
  //     return (
  //         <ListItem
  //             onPress={() =>
  //                 this.props.navigation.navigate("MoviePage", {
  //                     id: item.id
  //                 })}
  //         >
  //             <Thumbnail square size={200} source={{uri: item.image_url_small}}/>
  //             <Body>
  //             <View >
  //                 <Text >{item.title}</Text>
  //                 <Text style={{fontSize: 12, color: '#b2b8c3'}}>Дата выхода: 22 января 2018</Text>
  //             </View>
  //             <View style={{flexDirection: "row", marginBottom: 5}}>
  //                 <View>
  //                     <Text style={{fontSize: 12, color: '#b2b8c3'}}>Жанр: Драма, Приключения, Научная фантастика</Text>
  //                 </View>
  //             </View>
  //             </Body>
  //         </ListItem>
  //     )
  // }
  //
  // renderSeparator = ({section}) => {
  //     return (
  //         <ListItem itemDivider>
  //             <Text>{section.title}</Text>
  //         </ListItem>
  //     )
  // }
  //
  // onEndReached = (obj) => {
  //     if (this.props.list && this.props.list.length > 0) {
  //         this.setState({
  //             monthPlus: this.state.monthPlus + 1,
  //         }, () => {
  //             this.props.loadMore(moment().add(this.state.monthPlus, 'month').startOf('month').format('YYYY.MM.DD'), moment().add(this.state.monthPlus, 'month').endOf('month').format('YYYY.MM.DD'));
  //         })
  //
  //     }
  // }
  //
  // buildSections = () => {
  //     const sections = this.props.list.reduce((prev, element) => {
  //         const month = moment(element.date, "YYYY.MM.DD").format('MMMM YYYY');
  //         const arr = prev[month] ? prev[month] : [];
  //         arr.push(element);
  //         prev[month] = arr;
  //         return prev;
  //     }, {})
  //     const unsorted = Object.keys(sections).map(key => {return {data: sections[key], title: key}});
  //     const sect = unsorted.sort(function(a, b){
  //         return moment(a.data[0].date, "YYYY.MM.DD") > moment(b.data[0].date, "YYYY.MM.DD");
  //     });
  //     return sect;
  //
  //     /*return [
  //         {data: this.props.list, title: "Январь 2018"},
  //     ];*/
  // }
}

export default Home;
