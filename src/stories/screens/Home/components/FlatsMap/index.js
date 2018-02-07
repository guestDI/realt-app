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
import { View, SectionList, FlatList, TouchableOpacity, Platform, NativeModules, Dimensions, ActivityIndicator } from "react-native";
import moment from "moment";
import styles from "./styles";
import { MapView } from 'expo';
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

class FlatsMap extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        page: 0,
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

    handleRefresh = () => {
        this.setState({
            page: 0,
            refreshing: true
        }, () => {
            this.props.loadMore(0)
        })
    }

    handleLoadMore = () => {
      let currentPage = this.state.page + 1;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.props.loadMore(currentPage)
        })
    }

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
      <View style={{flex: 1}}>
          <MapView
              style={{ flex: 1, width: width, height: height*0.5}}
              initialRegion={{
                  latitude: 53.902863,
                  longitude: 27.551579,
                  latitudeDelta: 0.2192,
                  longitudeDelta: 0.1191,
              }}
              showsTraffic={false}
          >
              {this.props.list.map((flat) => {
                  return(
                      <MapView.Marker
                          key={flat.longitude}
                          coordinate={{
                              latitude: flat.latitude,
                              longitude: flat.longitude}}
                          title="title"
                      />
                  )
                  // this.printMarker(flat.latitude, flat.longitude, flat.price);
              })}
          </MapView>
      </View>
    );
  }

}

export default FlatsMap;
