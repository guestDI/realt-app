// @flow
import * as React from "react";
import { connect } from "react-redux";

import Home from "../../stories/screens/Home";
import flats from "./data_test";
import { fetchList } from "./actions";
// import {setUID} from "../LoginContainer/actions";
export interface Props {
	navigation: any,
	fetchList: Function,
	setUID: Function,
	data: Object,
}
export interface State {
}

const MOVIES_ON_PAGE = 5;

class HomeContainer extends React.Component<Props, State> {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		return <Home
			navigation={this.props.navigation}
			list={flats}
			// loadMore={this.loadMore}
		/>;
	}

	loadMore = (startDate, endDate) => {
        const movies = this.props.data;
		if (movies && movies.length > 0) {
            this.props.fetchList(startDate, endDate);
        }
	}
}

function bindAction(dispatch) {
	return {
		// fetchList: (movieId, limit) => dispatch(fetchList(movieId, limit)),
		// setUID: (uid) => dispatch(setUID(uid)),
	};
}

const mapStateToProps = state => ({
	// data: state.homeReducer.list,
	// isLoading: state.homeReducer.isLoading,
});
export default connect(mapStateToProps, bindAction)(HomeContainer);
