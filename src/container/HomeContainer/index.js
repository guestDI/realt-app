// @flow
import * as React from "react";
import { connect } from "react-redux";

import Home from "../../stories/screens/Home";
import flats from "./data_test";
import { fetchFlats, fetchFlatsOnMap } from "./actions";
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

class HomeContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.fetchFilter()
      this.props.getFavoriteFlats()
      let filter = {
        page: 0,
        size: FLATS_ON_PAGE
      }

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
    return (
      <Home
        navigation={this.props.navigation}
        list={this.props.data}
        flatsOnMap={this.props.mapData}
        loadMore={this.loadMore}
        loadingState={this.props.listIsLoading}
        favorites={this.props.favoriteFlats}
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
    // if (this.props.noMoreData) {
    //   return;
    // }
    let filter = Object.assign({}, this.props.filter, {size: FLATS_ON_PAGE, page: page});

      // let filter = {
      //     page: page,
      //     size: FLATS_ON_PAGE
      // }
    // let filter = this.props.filter;
    // filter.page = page;
    // filter.size = FLATS_ON_PAGE;

    this.props.fetchFlats(filter);
  };
}

function bindAction(dispatch) {
  return {
    fetchFlats: filter => dispatch(fetchFlats(filter)),
    fetchFlatsOnMap: filter => dispatch(fetchFlatsOnMap(filter)),
    fetchFilter: () => dispatch(fetchFilter()),
      getFavoriteFlats: () => dispatch(fetchFavoritesFlats())
  };
}

const mapStateToProps = state => ({
  data: state.homeReducer.list,
  listIsLoading: state.homeReducer.listIsLoading,
  listHasErrored: state.homeReducer.listHasErrored,
  mapData: state.homeReducer.mapList,
  isLoading: state.homeReducer.isLoading,
  filter: state.filterReducer.filter,
    favoriteFlats: state.flatReducer.favoriteFlats,
});
export default connect(mapStateToProps, bindAction)(HomeContainer);
