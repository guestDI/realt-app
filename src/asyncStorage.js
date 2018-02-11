import { AsyncStorage } from 'react-native';

export const setFilter = (value) => {
    let filter = JSON.stringify(value);
    // console.log(filter)
    AsyncStorage.setItem('filter', filter);

    return value;
}

export const getFilter = async (callback) => {
    // let filter = null;
    let value = await AsyncStorage.getItem("filter").then(val => {
        callback(JSON.parse(val))
    });
}

