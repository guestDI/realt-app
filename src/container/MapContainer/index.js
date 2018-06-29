// @flow
import * as React from "react";
import { connect } from "react-redux";

import Map from "../../stories/screens/Map";
import flats from "./data_test";
import SplashScreen from 'react-native-smart-splash-screen'
import { fetchFlats, fetchFlatsOnMap, refreshFlats, initFlatsLoad, reloadFlatsOnMap } from "./../HomeContainer/actions";
import { fetchFilter } from '../FilterContainer/actions'
import { fetchFavoritesFlats, addFavoriteFlat, removeFromFavorite } from '../FlatPageContainer/actions'

export interface Props {
  navigation: any;
  fetchList: Function;
  setUID: Function;
  data: Object;
}
export interface State {}

const FLATS_ON_PAGE = 150;
const FLATS_ON_MAP = 100;

class MapContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.fetchFilter()
      this.props.initFlatsLoad()

  }

  render() {
    // console.log(this.props.data)
    return (
      <Map
        navigation={this.props.navigation}
        flatsOnMap={this.props.mapData}
        filter={this.props.filter}
        fetchFlats={this.props.fetchFlatsOnMap}
        mapListIsLoading={this.props.isLoading}
        favoriteFlats={this.props.favoriteFlats}
        addFavoriteFlat={this.props.addFlatToFavorites}
        removeFavoriteFlat={this.props.removeFlatFromFavorites}
      />
    );
  }

}

function bindAction(dispatch) {
  return {
    fetchFlatsOnMap: filter => dispatch(fetchFlatsOnMap(filter)),
    initFlatsLoad: () => dispatch(initFlatsLoad()),
    refreshFlats: filter => dispatch(refreshFlats(filter)),
    fetchFilter: () => dispatch(fetchFilter()),
    getFavoriteFlats: () => dispatch(fetchFavoritesFlats()),
    addFlatToFavorites: (favoriteFlat) => dispatch(addFavoriteFlat(favoriteFlat)),
    removeFlatFromFavorites: id => dispatch(removeFromFavorite(id))
  };
}

const mapStateToProps = state => ({
  mapData: state.mapReducer.mapList,
  filter: state.filterReducer.filter,
  isLoading: state.homeReducer.isLoading,
    favoriteFlats: state.flatReducer.favoriteFlats,
});
export default connect(mapStateToProps, bindAction)(MapContainer);
