import { AsyncStorage } from "react-native";
const FLAT_KEY = "FLAT_KEY";

export const setFilter = value => {
  let filter = JSON.stringify(value);
  // console.log(filter)
  AsyncStorage.setItem("filter", filter);

  return value;
};

export const getFilter = async callback => {
  // let filter = null;
  let value = await AsyncStorage.getItem("filter").then(val => {
    callback(JSON.parse(val));
  });
};

export const saveFlats = flats => {
    const serializedState = JSON.stringify(flats);
    // console.log('localstorageJSON', serializedState)
    AsyncStorage.setItem(FLAT_KEY, serializedState);
}

export const getFavoriteFlats = async callback => {
    await AsyncStorage.getItem(FLAT_KEY).then(val => {
        // console.log('PARSED FROM', JSON.parse(val))
        callback(JSON.parse(val));
    });
};

export const deleteFlatFromFavorites = async id => {
    getFavoriteFlats(items => {
        if (items) {
            let newState = items.filter((item) => item.id !== id);
            const serializedState = JSON.stringify(newState);
            AsyncStorage.setItem(FLAT_KEY, serializedState);
        }
    });

};
