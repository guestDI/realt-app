import axios from "axios";
import qs from 'qs'
import { saveFavoriteFlat, getFilter } from "../../asyncStorage";
import { formatLocation } from "../../utils/utils";

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

export function isInitialLoad(bool: boolean){
    return {
        type: "INITIAL_LOAD",
        isInitialLoad: bool
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

export function networkError(bool: boolean) {
  return {
    type: "NETWORK_ERROR",
    networkError: bool
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
        dispatch(isInitialLoad(true));
        getFilter(function(filter) {
            // console.log(filter)
            fetchFlats(Object.assign({}, filter, {page: 0}))(dispatch);
            fetchFlatsOnMap(Object.assign({}, filter, {size: 150, page: 0}))(dispatch)
        });
    }
}

export const reloadFlats = filter => {
    return dispatch => {
        dispatch(isInitialLoad(false));
        dispatch(clearFlatsList())
        dispatch(fetchFlats(Object.assign({}, filter, {page: 0})));
    }
}

export const reloadFlatsOnMap = filter => {
    return dispatch => {
        dispatch(isInitialLoad(false));
        dispatch(clearFlatsOnMap())
        dispatch(fetchFlatsOnMap(filter));
    }
}

export const fetchFlats = filter => {
    let coordinates = filter.coordinates && filter.coordinates.length > 0 ? filter.coordinates[0] : null;
    let page = filter.page  ? filter.page : 0;
    // let subwayStations = filter.subwayStations ? filter.subwayStations : []
    let subwayCoordinates = []

    if(filter.subwayStations) {
        filter.subwayStations.map(item => {
            subwayCoordinates.push({
                latitude: item.latitude,
                longitude: item.longitude,
                radiusInKm: item.radiusInKm
            })
        })
    }


    let f = {
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        rooms: filter.rooms,
        owner: filter.owner,
        subway: filter.subway,
        circles: subwayCoordinates,
        location: formatLocation(coordinates),
        page: page
    }

    //console.log(f)

  return dispatch => {
    dispatch(isInitialLoad(false));
    dispatch(listIsLoading(true));
    dispatch(fetchListHasErrored(false));

    axios
      .get(
        "http://46.101.244.156:5555/flats", {
        // "http://192.168.32.27:8080/flats", {
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
      .then(() => dispatch(networkError(false)))

      .catch(e => {
        console.log(e.message);
        if(e.message === 'Network Error'){
          dispatch(networkError(true))
        }
        dispatch(fetchListHasErrored(true))
        dispatch(listIsLoading(false))
      });
  };
};

export const fetchFlatsOnMap = filter => {
    let coordinates = filter.coordinates && filter.coordinates.length > 0 ? filter.coordinates[0] : null;

    let subwayCoordinates = []

    if(filter.subwayStations) {
        filter.subwayStations.map(item => {
            subwayCoordinates.push({
                latitude: item.latitude,
                longitude: item.longitude,
                radiusInKm: item.radiusInKm
            })
        })
    }

    let f = {
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        rooms: filter.rooms,
        owner: filter.owner,
        subway: filter.subway,
        circles: subwayCoordinates,
        location: formatLocation(coordinates),
        page: filter.page
    }

    //console.log(f)

  return dispatch => {
    dispatch(isInitialLoad(false));
    dispatch(mapListIsLoading(true));
    axios
      .get(
        "http://46.101.244.156:5555/flats", {
        // "http://192.168.32.27:8080/flats", {
              params: Object.assign({}, f, {size: 150, page: 0}),
              paramsSerializer: function(params) {
                  return qs.stringify(params, {arrayFormat: 'repeat'})
              }
          }
      )
      .then(response => {
          const data = response.data;
          // console.log('count of flats', data.length);
          return data;
      })
      .then(flatsOnMap => dispatch(fetchMapListSuccess(flatsOnMap)))
      .then(() => dispatch(mapListIsLoading(false)))
      .then(() => dispatch(networkError(false)))
      .catch(e => {
        console.log(e.message);
        if(e.message === 'Network Error'){
           dispatch(networkError(true))
        }
      });
  };
};
