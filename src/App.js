// @flow
import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Home from "./container/HomeContainer";
import Map from "./container/MapContainer";
import Favorite from "./container/FavoriteContainer";
import FlatPage from "./container/FlatPageContainer";
import Filter from "./container/FilterContainer";
import Sidebar from "./container/SidebarContainer";
import NotInterested from "./container/NotInterestedContainer"
import "moment/locale/ru";

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
      Map: { screen: Map },
      Favorite: { screen: Favorite },
      NotInterested: { screen: NotInterested}
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <Sidebar {...props} />
  }
);

const App = StackNavigator(
  {
    // Login: { screen: Login },
    // Logout: {screen: Logout },
    FlatPage: { screen: FlatPage },
    Filter: { screen: Filter },
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () => (
  <Root>
    <App />
  </Root>
);
