// @flow
import * as React from "react";
import { connect } from "react-redux";

import Home from "../../stories/screens/Home";
import flats from "./data_test";
import SplashScreen from 'react-native-smart-splash-screen'
import { fetchFlats, fetchFlatsOnMap, refreshFlats, initFlatsLoad, reloadFlatsOnMap } from "./actions";
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

class HomeContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.fetchFilter()
      this.props.getFavoriteFlats()
      SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 850,
          delay: 500,
      })

      // let filter = Object.assign({}, this.props.filter, {size: FLATS_ON_PAGE, page: 0});
      this.props.initFlatsLoad()
      // this.props.reloadFlatsOnMap(filter)
      // console.log(filter)

    // this.props.fetchFlats(filter);

    // this.props.fetchFlatsOnMap({
    //   page: 0,
    //   size: FLATS_ON_MAP
    // });
  }

  componentWillReceiveProps(){

  }

  render() {
    // console.log(this.props.data)
    return (
      <Home
        navigation={this.props.navigation}
        list={this.props.data}
        flatsOnMap={this.props.mapData}
        loadMore={this.loadMore}
        loadingState={this.props.listIsLoading}
        refreshListState={this.props.listIsRefreshing}
        favorites={this.props.favoriteFlats}
        refreshFlatsList={this.handleRefresh}
      />
    );
  }

  handleRefresh = () => {
      let filter = Object.assign({}, this.props.filter );
      this.props.refreshFlats(this.props.filter );
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
    fetchFlats: filter => dispatch(fetchFlats(filter)),
    fetchFlatsOnMap: filter => dispatch(fetchFlatsOnMap(filter)),
    initFlatsLoad: () => dispatch(initFlatsLoad()),
    refreshFlats: filter => dispatch(refreshFlats(filter)),
    fetchFilter: () => dispatch(fetchFilter()),
      getFavoriteFlats: () => dispatch(fetchFavoritesFlats())
  };
}

const mapStateToProps = state => ({
  data: state.homeReducer.list,
  listIsLoading: state.homeReducer.listIsLoading,
  listHasErrored: state.homeReducer.listHasErrored,
  listIsRefreshing: state.homeReducer.listIsRefreshing,
  mapData: state.homeReducer.mapList,
  isLoading: state.homeReducer.isLoading,
  filter: state.filterReducer.filter,
  favoriteFlats: state.flatReducer.favoriteFlats,
  listIsEmpty: state.homeReducer.listIsEmpty
});
export default connect(mapStateToProps, bindAction)(HomeContainer);
