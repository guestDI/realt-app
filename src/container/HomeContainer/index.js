// @flow
import * as React from "react";
import { connect } from "react-redux";

import Home from "../../stories/screens/Home";
import flats from "./data_test";
import { fetchFlats } from "./actions";
import { addFilter, fetchFilter } from "./actions";
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
        this.props.fetchFilter()
        // this.props.fetchFlats({
		// 	page: 0,
		// 	size: 10
		// })
		console.log(this.props.filter)
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
        addFilter: (filter) => dispatch(addFilter(filter)),
        fetchFilter: () => dispatch(fetchFilter())
       // fetchFlats: (filter) => dispatch(fetchFlats(filter)),
	};
}

const mapStateToProps = state => ({
	data: state.homeReducer.list,
	isLoading: state.homeReducer.isLoading,
    filter: state.filterReducer.data,
});
export default connect(mapStateToProps, bindAction)(HomeContainer);
