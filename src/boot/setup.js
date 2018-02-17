import * as Expo from "expo";
import * as React from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";

import configureStore from "./configureStore";
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/platform";
export interface Props {}
export interface State {
  store: Object;
  isLoading: boolean;
  isReady: boolean;
}
export default class Setup extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false })),
      isReady: false
    };

    // var firebaseConfig = {
    //     apiKey: "AIzaSyAWc6EcocxP3PZT_uIViMdQlJV4lGr3jJc",
    //     authDomain: "movies-81c24.firebaseapp.com",
    //     databaseURL: "https://movies-81c24.firebaseio.com",
    //     projectId: "movies-81c24",
    //     storageBucket: "",
    //     messagingSenderId: "67881508082"
    // };
    //
    // firebase.initializeApp(firebaseConfig);
    // console.ignoredYellowBox = [
    //     'Setting a timer'
    // ];
  }
  componentWillMount() {
    this.getLocationAsync();
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }

    async getLocationAsync() {
        const { Location, Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            return Location.getCurrentPositionAsync({enableHighAccuracy: true});
        } else {
            throw new Error('Location permission not granted');
        }
    }

  render() {
    if (!this.state.isReady || this.state.isLoading) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store}>
          <App />
        </Provider>
      </StyleProvider>
    );
  }
}
