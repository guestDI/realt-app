// @flow
import * as React from "react";
import Filter from "../../stories/screens/Filter";
import { addFilter, fetchFilter } from "./actions";

import { connect } from "react-redux";
export interface Props {
  navigation: any;
}
export interface State {}
class FilterContainer extends React.Component<Props, State> {
  componentDidMount() {
    // this.props.fetchFilter();
    // console.log(this.props.data)
  }

  render() {
    return (
      <Filter
        navigation={this.props.navigation}
        onAddFilter={this.props.addFilter}
        // flat={this.props.navigation.state.params.flat}
        filter={this.props.filter}
        // friends={ratedFriends}
        // onRateChanged={({rate, comment}) => this.saveRate(movie.id, myUID, rate, comment)}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    addFilter: filter => dispatch(addFilter(filter)),
    fetchFilter: () => dispatch(fetchFilter())
  };
}

const mapStateToProps = state => ({
  filter: state.filterReducer.filter

});
export default connect(mapStateToProps, bindAction)(FilterContainer);
