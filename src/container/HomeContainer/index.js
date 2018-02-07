// @flow
import * as React from "react";
import { connect } from "react-redux";

import Home from "../../stories/screens/Home";
import flats from "./data_test";
import { fetchFlats } from "./actions";
// import {fetchFlats} from "../LoginContainer/actions";
export interface Props {
	navigation: any,
	fetchList: Function,
	setUID: Function,
	data: Object,
}
export interface State {
}

const FLATS_ON_PAGE = 10;

class HomeContainer extends React.Component<Props, State> {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
        // this.props.fetchFlats({
		// 	page: 0,
		// 	size: 10
		// })
	}

	render() {
		return <Home
			navigation={this.props.navigation}
			list={flats}
			// loadMore={this.loadMore}
		/>;
	}

	loadMore = (page) => {
		let filter = {
			page: page,
			size: 10
		}
        this.props.fetchFlats(filter);
        // const movies = this.props.data;
        // if (movies && movies.length > 0) {
        //     this.props.fetchList(startDate, endDate);
        // }
	}
}

function bindAction(dispatch) {
	return {
       // fetchFlats: (filter) => dispatch(fetchFlats(filter)),
	};
}

const mapStateToProps = state => ({
	data: state.homeReducer.list,
	isLoading: state.homeReducer.isLoading,
});
export default connect(mapStateToProps, bindAction)(HomeContainer);
