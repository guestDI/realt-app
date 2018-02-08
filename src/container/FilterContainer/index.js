// @flow
import * as React from "react";
import Filter from "../../stories/screens/Filter";

import {connect} from "react-redux";
export interface Props {
	navigation: any,
    myUID: string,
    data: Array<Object>,
    setRate: Function,
}
export interface State {}
class FilterContainer extends React.Component<Props, State> {
    componentDidMount() {
        // const param = this.props.navigation.state.params;
        // let movies = this.props.data;
        // let movie = movies.filter(mov => mov.id === param.id)[0];
        // this.props.fetchFriendsList(movie.id);
    }

	render() {
        // const param = this.props.navigation.state.params;
        // const {myUID} = this.props;
        // let movies = this.props.data;
        // let movie = movies.filter(mov => mov.id === param.id)[0];
        // const myRate = this.getMyRate(movie, myUID);
        // let ratedFriends = this.props.ratedFriendsData;
		return <Filter
            navigation={this.props.navigation}
            // flat={this.props.navigation.state.params.flat}
            // myRate={myRate}
            // friends={ratedFriends}
            // onRateChanged={({rate, comment}) => this.saveRate(movie.id, myUID, rate, comment)}
        />;
	}

}

function bindAction(dispatch) {
    return {
        // setRate: (movieId: string, userId: string, rate: number, comment: string) => dispatch(setRate(movieId, userId, rate, comment)),
        // fetchFriendsList: (id) => dispatch(fetchRatedFriendsList(id))
    };
}

const mapStateToProps = state => ({
    // data: state.homeReducer.list,
    // isLoading: state.homeReducer.isLoading,
    // myUID: state.loginReducer.uid,
    // ratedFriendsData: state.ratedFriendsReducer.list,
    // isFriendsLoading: state.ratedFriendsReducer.isLoading,
});
export default connect(mapStateToProps, bindAction)(FilterContainer);
