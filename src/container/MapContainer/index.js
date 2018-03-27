// @flow
import * as React from "react";
import { connect } from "react-redux";

import Map from "../../stories/screens/Map";
import flats from "./data_test";
import SplashScreen from 'react-native-smart-splash-screen'
import { fetchFlats, fetchFlatsOnMap, refreshFlats, initFlatsLoad, reloadFlatsOnMap } from "./../HomeContainer/actions";
import { fetchFilter } from '../FilterContainer/actions'
import { fetchFavoritesFlats } from '../FlatPageContainer/actions'

export interface Props {
  navigation: any;
  fetchList: Function;
  setUID: Function;
  data: Object;
}
export interface State {}

const FLATS_ON_PAGE = 10;
const FLATS_ON_MAP = 150;

class MapContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.fetchFilter()
    //   this.props.getFavoriteFlats()
    //   SplashScreen.close({
    //       animationType: SplashScreen.animationType.scale,
    //       duration: 850,
    //       delay: 500,
    //   })

      // let filter = Object.assign({}, this.props.filter, {size: FLATS_ON_PAGE, page: 0});
      // this.props.initFlatsLoad()
      // this.props.reloadFlatsOnMap(filter)
      // console.log(filter)

    // this.props.fetchFlats(filter);

    // this.props.fetchFlatsOnMap({
    //   page: 0,
    //   size: FLATS_ON_MAP
    // });
  }

  render() {
    // console.log(this.props.data)
    return (
      <Map
        navigation={this.props.navigation}
        flatsOnMap={this.props.mapData}
      />
    );
  }

  handleRefresh = () => {
      this.props.refreshFlats(this.props.filter);
  }

  loadMore = page => {
    // if (this.props.listIsEmpty) {
    //   return;
    // }
    let filter = Object.assign({}, this.props.filter, {size: FLATS_ON_PAGE, page: page});
    this.props.fetchFlats(filter);
  };
}

function bindAction(dispatch) {
  return {
    // fetchFlats: filter => dispatch(fetchFlats(filter)),
    fetchFlatsOnMap: filter => dispatch(fetchFlatsOnMap(filter)),
    // initFlatsLoad: () => dispatch(initFlatsLoad()),
    refreshFlats: filter => dispatch(refreshFlats(filter)),
    fetchFilter: () => dispatch(fetchFilter()),
      getFavoriteFlats: () => dispatch(fetchFavoritesFlats())
  };
}

const mapStateToProps = state => ({
  mapData: state.homeReducer.list,
  filter: state.filterReducer.filter,
});
export default connect(mapStateToProps, bindAction)(MapContainer);
