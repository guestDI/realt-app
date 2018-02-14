// @flow
import * as React from "react";
import { connect } from "react-redux";

import Home from "../../stories/screens/Home";
import flats from "./data_test";
import { fetchFlats, fetchFlatsOnMap } from "./actions";
import { fetchFilter } from '../FilterContainer/actions'

export interface Props {
  navigation: any;
  fetchList: Function;
  setUID: Function;
  data: Object;
}
export interface State {}

const FLATS_ON_PAGE = 10;
const FLATS_ON_MAP = 999;

class HomeContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFilter()

      let filter = this.props.filter;
      filter.page = 0;
      filter.size = FLATS_ON_PAGE;

      console.log(filter)

    this.props.fetchFlats(filter);

    this.props.fetchFlatsOnMap({
      page: 0,
      size: FLATS_ON_MAP
    });
  }

  componentWillReceiveProps(){

  }

  render() {
    return (
      <Home
        navigation={this.props.navigation}
        list={this.props.data}
        flatsOnMap={this.props.mapData}
        loadMore={this.loadMore}
        // refresh={this.handleRefresh}
      />
    );
  }

  handleRefresh = () => {
      let filter = {
          page: 0,
          size: FLATS_ON_PAGE
      }
      this.props.fetchFlats(filter);
  }

  loadMore = page => {
    let filter = this.props.filter;
    filter.page = page;
    filter.size = FLATS_ON_PAGE;

    this.props.fetchFlats(filter);
  };
}

function bindAction(dispatch) {
  return {
    fetchFlats: filter => dispatch(fetchFlats(filter)),
    fetchFlatsOnMap: filter => dispatch(fetchFlatsOnMap(filter)),
    fetchFilter: () => dispatch(fetchFilter())
  };
}

const mapStateToProps = state => ({
  data: state.homeReducer.list,
  mapData: state.homeReducer.mapList,
  isLoading: state.homeReducer.isLoading,
  filter: state.filterReducer.filter
});
export default connect(mapStateToProps, bindAction)(HomeContainer);
