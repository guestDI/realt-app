import axios from "axios";
import { getFavoriteFlat, saveFavoriteFlat } from "../../asyncStorage";

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

// export const reloadFlats = filter => {
//     return dispatch => {
//         dispatch()
//         fetchFlats(filter)(dispatch);
//     }
// }

export const fetchFlats = filter => {
  return dispatch => {
    dispatch(listIsLoading(true));
    dispatch(fetchListHasErrored(false));
    axios
      .get(
        "http://46.101.244.156:5555/flats", {
          params: filter
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
  return dispatch => {
    dispatch(mapListIsLoading(true));
    axios
      .get(
        "http://46.101.244.156:5555/flats", {
              params: filter
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
