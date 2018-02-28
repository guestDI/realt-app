import { setFilter, getFilter } from "../../asyncStorage";
import { reloadFlats, reloadFlatsOnMap } from "../HomeContainer/actions"

export function fetchFilter() {
  return dispatch => {
    getFilter(function(filter) {
      // console.log(data)
      dispatch({ type: "FETCH_FILTER", filter });
    });
  };

  // let filter = getFilter(function(val) {
  //    console.log(val)
  // })
  // return {
  // 	type: "FETCH_FILTER_SUCCESS",
  //    filter,
  // };
}

export function addFilter(filter: Object) {
  return dispatch => {
      setFilter(filter);
      // console.log(filter)
      reloadFlats(filter)(dispatch);
      reloadFlatsOnMap(filter)(dispatch)
      dispatch({
          type: "ADD_FILTER",
          filter
      });
  }
}
