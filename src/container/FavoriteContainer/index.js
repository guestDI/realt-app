// @flow
import * as React from "react";
import { connect } from "react-redux";

import Favorite from "../../stories/screens/Favorite";
import SplashScreen from 'react-native-smart-splash-screen'
import { fetchFavoritesFlats, removeFromFavorite } from '../FlatPageContainer/actions'

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
      this.props.getFavoriteFlats()
      SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 850,
          delay: 500,
      })

  }

  render() {
    return (
      <Favorite
        navigation={this.props.navigation}
        favorites={this.props.favoriteFlats}
        flatsList={this.props.data}
        removeFavoriteFlat={this.props.removeFlatFromFavorites}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
      getFavoriteFlats: () => dispatch(fetchFavoritesFlats()),
      removeFlatFromFavorites: id => dispatch(removeFromFavorite(id))
  };
}

const mapStateToProps = state => ({
  favoriteFlats: state.flatReducer.favoriteFlats,
  data: state.homeReducer.list,
});
export default connect(mapStateToProps, bindAction)(FavoriteContainer);
