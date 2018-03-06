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
import "moment/locale/ru";

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
      Map: { screen: Map },
      Favorite: { screen: Favorite },
    // Friends: { screen: Friends },
    // Profile: {screen: UserProfile}
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
    // FriendsRating: { screen: FriendsRating },
    // FriendProfile: { screen: FriendProfile }
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
