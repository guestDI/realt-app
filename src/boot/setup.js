/*import * as Expo from "expo";*/
import * as React from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";

import configureStore from "./configureStore";
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/platform";
import {View, Alert, AsyncStorage} from 'react-native';

import PushNotification from 'react-native-push-notification';

import BackgroundTask from 'react-native-background-task'
import {getFilter} from "../asyncStorage";
import {formatLocation} from "../utils/utils";
import axios from "axios/index";

import qs from 'qs'

BackgroundTask.define(async() => {
    console.error('Hello from a background task')

    /*await getFilter(async function(filter) {
        const flats = await fetchFlats(filter);
        console(flats);


    });*/
    await processBackgroundAsync();
    BackgroundTask.finish()
    //const lastId = await AsyncStorage.getItem('@realrealt:last_id');
    //const response = await fetch('http://feeds.bbci.co.uk/news/rss.xml')


})

export const processBackgroundAsync = async () => {
    console.log('starting background async')
    await getFilter(async function(filter) {
        const flats = await fetchFlats(filter);
        const LAST_UPDATED_KEY = '@realrealt:last_updated';
        const lastUpdated = await AsyncStorage.getItem(LAST_UPDATED_KEY);
        console.log(lastUpdated)
        const lastUpdatedAsDate = lastUpdated ? new Date(lastUpdated) : null;
        flats
            .filter(flat => !lastUpdatedAsDate || new Date(flat.updatedOn) > lastUpdatedAsDate)
            .forEach(flat => pushNotification(flat.title, flat.description));
        await AsyncStorage.removeItem(LAST_UPDATED_KEY);
    });
}

export const fetchFlats = async (filter) => {
    console.log('PAGE', filter.page)
    let coordinates = filter.coordinates && filter.coordinates.length > 0 ? filter.coordinates[0] : null;
    let page = filter.page  ? filter.page : 0;

    let f = {
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        rooms: filter.rooms,
        owner: filter.owner,
        subway: filter.subway,
        location: formatLocation(coordinates),
        page: page
    }


    return await axios
        .get(
            "http://46.101.244.156:5555/flats", {
                params: Object.assign({}, f, {size: 10}),
                paramsSerializer: function(params) {
                    return qs.stringify(params, {arrayFormat: 'repeat'})
                }
            }
        )
        .then(response => response.data)
        .then(flats => {
            return flats.map(flat => {
                flat.photos[0] = flat.smallPhoto;
                return flat;
            })
        })

        .catch(e => {
            console.error(e);
            dispatch(fetchListHasErrored(true))
        });
};

function pushNotification(title, message) {
    PushNotification.localNotification({
        /* Android Only Properties */
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        bigText: message, // (optional) default: "message" prop
        subText: "Новое объявление", // (optional) default: none
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000

        /* iOS and Android properties */
        title: title, // (optional)
        message: message, // (required)
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });
}

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
    this.initPushNotifications();
      //processBackgroundAsync();
    BackgroundTask.schedule();

      // Optional: Check if the device is blocking background tasks or not
      //this.checkStatus();
  }

  componentDidMount() {
      processBackgroundAsync()
  }

    async checkStatus() {
        const status = await BackgroundTask.statusAsync()

        if (status.available) {
            // Everything's fine
            return
        }

        const reason = status.unavailableReason
        if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
            Alert.alert('Denied', 'Please enable background "Background App Refresh" for this app')
        } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
            Alert.alert('Restricted', 'Background tasks are restricted on your device')
        }
    }

  async initPushNotifications() {
      PushNotification.configure({

          // (optional) Called when Token is generated (iOS and Android)
          onRegister: function(token) {
              console.log( 'TOKEN:', token );
          },

          // (required) Called when a remote or local notification is opened or received
          onNotification: function(notification) {
              console.log( 'NOTIFICATION:', notification );

              // process the notification

              // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
              notification.finish(PushNotificationIOS.FetchResult.NoData);
          },

          // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
          senderID: "YOUR GCM SENDER ID",

          // IOS ONLY (optional): default: all - Permissions to register.
          permissions: {
              alert: true,
              badge: true,
              sound: true
          },

          // Should the initial notification be popped automatically
          // default: true
          popInitialNotification: true,

          /**
           * (optional) default: true
           * - Specified if permissions (ios) and token (android and ios) will requested or not,
           * - if not, you must call PushNotificationsHandler.requestPermissions() later
           */
          requestPermissions: true,
      });
      PushNotification.cancelAllLocalNotifications()
  }

  async loadFonts() {
    /*await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });*/

    this.setState({ isReady: true });
  }

    async getLocationAsync() {
        /*const { Location, Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            return Location.getCurrentPositionAsync({enableHighAccuracy: true});
        } else {
            throw new Error('Location permission not granted');
        }*/
    }

  render() {
    if (!this.state.isReady || this.state.isLoading) {
      /*return <Expo.AppLoading />;*/
      return <View></View>
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
