import axios from "axios";
import qs from 'qs'
import { getFavoriteFlat, saveFavoriteFlat, getFilter } from "../../asyncStorage";
import { formatLocation } from "../../utils/utils";
import {AsyncStorage} from "react-native";

export function listIsLoading(bool: boolean) {
  return {
    type: "LIST_IS_LOADING",
    listIsLoading: bool
  };
}

export function fetchListSuccess(list: Array) {
  return {
    type: "FETCH_LIST_SUCCESS",
    list
  };
}

export function isResultsEmpty(bool: boolean){
    return {
        type: "LIST_IS_EMPTY",
        listIsEmpty: bool
    };
}

export function clearFlatsList() {
    // console.log('clear')
    return {
        type: "LIST_CLEAR",
    }
}

export function clearFlatsOnMap() {
    return {
        type: "MAP_CLEAR",
    }
}

export function fetchListHasErrored(bool: boolean) {
    return {
        type: "FETCH_LIST_HAS_ERRORED",
        listHasErrored: bool
    };
}

export function mapListIsLoading(bool: boolean) {
  return {
    type: "MAP_LIST_IS_LOADING",
    isLoading: bool
  };
}

export function listIsRefreshing(bool: boolean) {
    return {
        type: "LIST_IS_REFRESHING",
        listIsRefreshing: bool
    };
}

export function fetchMapListSuccess(mapList: Array) {
  return {
    type: "FETCH_MAP_LIST_SUCCESS",
    mapList
  };
}

export const refreshFlats = filter => {
    return dispatch => {
        dispatch(listIsRefreshing(true))
        dispatch(clearFlatsList())
        dispatch(fetchFlats(Object.assign({}, filter, {page: 0})));
        dispatch(fetchFlatsOnMap(Object.assign({}, filter, {page: 0})));
    }
}

export const initFlatsLoad = () => {
    return dispatch => {
        dispatch(clearFlatsList())
        getFilter(function(filter) {
            fetchFlats(Object.assign({}, filter, {page: 0}))(dispatch);
            fetchFlatsOnMap(Object.assign({}, filter, {size: 150, page: 0}))(dispatch)
        });
    }
}

export const reloadFlats = filter => {
    return dispatch => {
        dispatch(clearFlatsList())
        dispatch(fetchFlats(Object.assign({}, filter, {page: 0})));
    }
}

export const reloadFlatsOnMap = filter => {
    return dispatch => {
        dispatch(clearFlatsOnMap())
        dispatch(fetchFlatsOnMap(filter));
    }
}

export const fetchFlats = filter => {
    console.log('PAGE', filter.page)
    const LAST_UPDATED_KEY = '@realrealt:last_updated';
    AsyncStorage.setItem(LAST_UPDATED_KEY, new Date());
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

  return dispatch => {
    dispatch(listIsLoading(true));
    dispatch(fetchListHasErrored(false));

    axios
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
      .then(flats => dispatch(fetchListSuccess(flats)))
      .then(() => dispatch(listIsLoading(false)))
      .then(() => dispatch(listIsRefreshing(false)))

      .catch(e => {
        console.error(e);
        dispatch(fetchListHasErrored(true))
      });
  };
};

export const fetchFlatsOnMap = filter => {
    let coordinates = filter.coordinates && filter.coordinates.length > 0 ? filter.coordinates[0] : null;

    let f = {
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        rooms: filter.rooms,
        owner: filter.owner,
        subway: filter.subway,
        location: formatLocation(coordinates),
        page: filter.page
    }

  return dispatch => {
    dispatch(mapListIsLoading(true));
    axios
      .get(
        "http://46.101.244.156:5555/flats", {
              params: Object.assign({}, f, {size: 150, page: 0}),
              paramsSerializer: function(params) {
                  return qs.stringify(params, {arrayFormat: 'repeat'})
              }
          }
      )
      .then(response => response.data)
      .then(flatsOnMap => dispatch(fetchMapListSuccess(flatsOnMap)))
      // .then(() => dispatch(usersFetchSuccess()))
      .catch(e => {
        console.error(e);
      });
  };
};
