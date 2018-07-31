import { AsyncStorage } from "react-native";
const FLAT_KEY = "FLAT_KEY";
const NOT_INTEREST_FLAT_KEY = "NOT_INTEREST_FLAT_KEY"

export const setFilter = value => {
  let filter = JSON.stringify(value);
  AsyncStorage.setItem("filter", filter);
  return value;
};

export const getFilter = async callback => {
  let filter = {rooms: []};
  await AsyncStorage.getItem("filter").then(val => {
      if(val){
          callback(JSON.parse(val));
      } else {
          callback(filter);
      }
  });
};

export const saveFlats = flats => {
    const serializedState = JSON.stringify(flats);
    AsyncStorage.setItem(FLAT_KEY, serializedState);
}

export const getFavoriteFlats = async callback => {
    let flats = [];
    await AsyncStorage.getItem(FLAT_KEY).then(val => {
        if(val){
            callback(JSON.parse(val));
        } else {
            callback(flats);
        }
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

export const addNotInterestedFlat = flats => {
    const serializedState = JSON.stringify(flats);
    AsyncStorage.setItem(NOT_INTEREST_FLAT_KEY, serializedState);
}

export const deleteFlatFromNotInterested = async id => {
    getNotInterestedFlats(items => {
        if (items) {
            let newState = items.filter((item) => item.id !== id);
            const serializedState = JSON.stringify(newState);
            AsyncStorage.setItem(NOT_INTEREST_FLAT_KEY, serializedState);
        }
    });
};

export const getNotInterestedFlats = async callback => {
    let flats = [];
    await AsyncStorage.getItem(NOT_INTEREST_FLAT_KEY).then(val => {
        if(val){
            callback(JSON.parse(val));
        } else {
            callback(flats);
        }
    });
};
