// @flow
import * as React from "react";
import FlatPage from "../../stories/screens/NewMoviePage";

import { addFavoriteFlat, fetchFavoritesFlats, removeFromFavorite } from "./actions";
import { addFlatToInterested, fetchNotInterestedFlats, removeFromNotInterested } from "../NotInterestedContainer/actions";
import { connect } from "react-redux";
export interface Props {
  navigation: any;
  myUID: string;
  data: Array<Object>;
  setRate: Function;
}
export interface State {}
class FlatPageContainer extends React.Component<Props, State> {


  render() {
    return (
      <FlatPage
        navigation={this.props.navigation}
        flat={this.props.navigation.state.params.flat}
        addFavoriteFlat={this.props.addFlatToFavorites}
        removeFavoriteFlat={this.props.removeFlatFromFavorites}
        addNotInterestedFlat={this.props.addFlatToNotInterested}
        removeNotInterestedFlat={this.props.removeFlatFromNotInterested}
        favoriteFlats={this.props.favoriteFlats}
        notInterestedFlats={this.props.notInterestedFlats}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    addFlatToFavorites: (favoriteFlat) => dispatch(addFavoriteFlat(favoriteFlat)),
    removeFlatFromFavorites: id => dispatch(removeFromFavorite(id)),
    addFlatToNotInterested: notInterestedFlat => dispatch(addFlatToInterested(notInterestedFlat)),
    removeFlatFromNotInterested: id => dispatch(removeFromNotInterested(id))
  };
}

const mapStateToProps = state => ({
    favoriteFlats: state.flatReducer.favoriteFlats,
    notInterestedFlats: state.notInterestedFlatReducer.notInterestedFlats
});
export default connect(mapStateToProps, bindAction)(FlatPageContainer);
