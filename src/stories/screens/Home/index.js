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
import { View, SectionList, FlatList, TouchableOpacity, Platform, NativeModules, Dimensions } from "react-native";
import moment from "moment";
import FlatRow from './components/FlatRow'
import styles from "./styles";
const { StatusBarManager } = NativeModules;

export interface Props {
  navigation: any;
  list: any;
  loadMore: Function,
}
export interface State {
    monthPlus: number
}

const {height, width} = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

class Home extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        data: [],
        page: 0,
        seed: 10,
        error: null,
        refreshing: false,
    }
  }

    componentDidMount() {
        // this.makeRemoteRequest();
    }

    // makeRemoteRequest = () => {
    //     const { page, seed } = this.state;
    //     const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    //     this.setState({ loading: true });
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(res => {
    //             this.setState({
    //                 data: page === 1 ? res.results : [...this.state.data, ...res.results],
    //                 error: res.error || null,
    //                 loading: false,
    //                 refreshing: false
    //             });
    //         })
    //         .catch(error => {
    //             this.setState({ error, loading: false });
    //         });
    // };

    onFlatRowPress = (val) => {
        // let friendInfo = {
        //     id: val.id,
        //     name: val.name,
        //     photo: val.photo,
        //     email: val.email,
        //     friendsCount: Object.keys(val.friends).length
        // }
        this.props.navigation.navigate("FlatPage", {
            flat: val
        })
    }

  render() {

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="menu"
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
              />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
          <View style={styles.containerStyle}>
              <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                  <FlatList
                      data={this.props.list}
                      renderItem={({ item }) => (
                          <FlatRow flat={item} onRowPressed={this.onFlatRowPress}/>
                      )}
                      keyExtractor={item => item.address}
                      // ItemSeparatorComponent={this.renderSeparator}
                      // ListHeaderComponent={this.renderHeader}
                      // ListFooterComponent={this.renderFooter}
                      // onRefresh={this.handleRefresh}
                      refreshing={this.state.refreshing}
                      // onEndReached={this.handleLoadMore}
                      // onEndReachedThreshold={0.5}
                  />
              </List>
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
