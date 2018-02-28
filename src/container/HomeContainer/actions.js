import axios from "axios";
import { getFavoriteFlat, saveFavoriteFlat } from "../../asyncStorage";
import { formatLocation } from "../../utils/utils";

export function listIsLoading(bool: boolean) {
  return {
    type: "LIST_IS_LOADING",
    listIsLoading: bool
  };
}

export function fetchListSuccess(list: Array) {
    // console.log(list)
  return {
    type: "FETCH_LIST_SUCCESS",
    list
  };
}

export function clearFlatsList() {
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

export function fetchMapListSuccess(mapList: Array) {
  return {
    type: "FETCH_MAP_LIST_SUCCESS",
    mapList
  };
}

export const reloadFlats = filter => {
    return dispatch => {
        dispatch(clearFlatsList())
        dispatch(fetchFlats(filter));
    }
}

export const reloadFlatsOnMap = filter => {
    return dispatch => {
        dispatch(clearFlatsOnMap())
        dispatch(fetchFlatsOnMap(filter));
    }
}

export const fetchFlats = filter => {
    // console.log(filter.coordinates)
    let f = {
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        rooms: filter.rooms,
        owner: filter.owner,
        subway: filter.subway,
        location: formatLocation(filter.coordinates[0]),
        page: filter.page
    }

  return dispatch => {
    dispatch(listIsLoading(true));
    dispatch(fetchListHasErrored(false));

    axios
      .get(
        "http://46.101.244.156:5555/flats", {
          params: Object.assign({}, f, {size: 10})
          }
      )
      .then(response => response.data)
      .then(flats => dispatch(fetchListSuccess(flats)))
      .then(() => dispatch(listIsLoading(false)))
      .catch(e => {
        console.error(e);
        dispatch(fetchListHasErrored(true))
      });
  };
};

export const fetchFlatsOnMap = filter => {
    let f = {
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        rooms: filter.rooms,
        owner: filter.owner,
        subway: filter.subway,
        location: formatLocation(filter.coordinates[0]),
        page: filter.page
    }

  return dispatch => {
    dispatch(mapListIsLoading(true));
    axios
      .get(
        "http://46.101.244.156:5555/flats", {
              params: Object.assign({}, f, {size: 150, page: 0})
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
