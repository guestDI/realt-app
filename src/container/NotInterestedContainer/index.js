// @flow
import * as React from "react";
import { connect } from "react-redux";

import NotInterested from "../../stories/screens/NotInterested";
import SplashScreen from 'react-native-smart-splash-screen'
import { addFlatToInterested, fetchNotInterestedFlats, removeFromNotInterested } from '../NotInterestedContainer/actions'

export interface Props {
  navigation: any;
  fetchList: Function;
  setUID: Function;
  data: Object;
}
export interface State {}

class NotInterestedContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.getNotInterestedFlats()
      SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 850,
          delay: 500,
      })
  }

  render() {
    return (
      <NotInterested
        navigation={this.props.navigation}
        notInterested={this.props.notInterestedFlats}
        flatsList={this.props.data}
        removeNotInterestedFlat={this.props.removeFlatFromNotInterested}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
      getNotInterestedFlats: () => dispatch(fetchNotInterestedFlats()),
      removeFlatFromNotInterested: id => dispatch(removeFromNotInterested(id))
  };
}

const mapStateToProps = state => ({
  notInterestedFlats: state.notInterestedFlatReducer.notInterestedFlats,
  data: state.homeReducer.list,
});
export default connect(mapStateToProps, bindAction)(NotInterestedContainer);
