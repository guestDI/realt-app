import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
// import {logout} from "../LoginContainer/actions";
//import styles from "./styles";
export interface Props {
  logout: Function;
  navigation: Object;
}
export interface State {}
class LogoutContainer extends React.Component<Props, State> {
  componentDidMount() {
    // this.props.logout();
    // this.props.navigation.navigate("Login");
  }

  render() {
    return <View />;
  }
}

function bindAction(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, bindAction)(LogoutContainer);
