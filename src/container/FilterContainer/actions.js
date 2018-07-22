import { setFilter, getFilter } from "../../asyncStorage";
import { fetchFlats, fetchFlatsOnMap, reloadFlats, reloadFlatsOnMap, isResultsEmpty } from "../HomeContainer/actions"

export function fetchFilter() {
  return dispatch => {
    getFilter(function(filter) {
      // console.log(data)
      dispatch({ type: "FETCH_FILTER", filter });
      // fetchFlats(filter)(dispatch);
      // fetchFlatsOnMap(filter)(dispatch)
    });

  };

}

export function addFilter(filter: Object) {
  return dispatch => {
      dispatch({
          type: "ADD_FILTER",
          filter
      });
      setFilter(filter);
      reloadFlats(filter)(dispatch);
      reloadFlatsOnMap(filter)(dispatch)
      // dispatch(isResultsEmpty(false))
  }
}
