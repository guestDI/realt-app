// @flow
import * as React from "react";
import FlatPage from "../../stories/screens/NewMoviePage";
// import {setRate} from "../HomeContainer/actions";
import { addFavoriteFlat, fetchFavoritesFlats, removeFromFavorite } from "./actions";
import { connect } from "react-redux";
export interface Props {
  navigation: any;
  myUID: string;
  data: Array<Object>;
  setRate: Function;
}
export interface State {}
class FlatPageContainer extends React.Component<Props, State> {
  componentDidMount() {
    // const param = this.props.navigation.state.params;
    // let movies = this.props.data;
    // let movie = movies.filter(mov => mov.id === param.id)[0];
    // this.props.getFavoriteFlats()
  }

  render() {
    // const param = this.props.navigation.state.params;
    // const {myUID} = this.props;
    // let movies = this.props.data;
    // let movie = movies.filter(mov => mov.id === param.id)[0];
    // const myRate = this.getMyRate(movie, myUID);
    // let ratedFriends = this.props.ratedFriendsData;
    return (
      <FlatPage
        navigation={this.props.navigation}
        flat={this.props.navigation.state.params.flat}
        addFavoriteFlat={this.props.addFlatToFavorites}
        removeFavoriteFlat={this.props.removeFlatFromFavorites}
        favoriteFlats={this.props.favoriteFlats}
        // myRate={myRate}
        // friends={ratedFriends}
        // onRateChanged={({rate, comment}) => this.saveRate(movie.id, myUID, rate, comment)}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    addFlatToFavorites: (favoriteFlat) => dispatch(addFavoriteFlat(favoriteFlat)),
    removeFlatFromFavorites: id => dispatch(removeFromFavorite(id))
  };
}

const mapStateToProps = state => ({
    favoriteFlats: state.flatReducer.favoriteFlats,
  // isLoading: state.homeReducer.isLoading,
  // myUID: state.loginReducer.uid,
  // ratedFriendsData: state.ratedFriendsReducer.list,
  // isFriendsLoading: state.ratedFriendsReducer.isLoading,
});
export default connect(mapStateToProps, bindAction)(FlatPageContainer);
