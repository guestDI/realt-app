// @flow
import * as React from "react";
import { connect } from "react-redux";

import Favorite from "../../stories/screens/Favorite";
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

class FavoriteContainer extends React.Component<Props, State> {
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
      //this.props.initFlatsLoad()
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
      <Favorite
        navigation={this.props.navigation}
        favorites={this.props.favoriteFlats}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
      getFavoriteFlats: () => dispatch(fetchFavoritesFlats())
  };
}

const mapStateToProps = state => ({
  favoriteFlats: state.flatReducer.favoriteFlats,
});
export default connect(mapStateToProps, bindAction)(FavoriteContainer);
