import { setFilter, getFilter } from '../../asyncStorage'

export function fetchFilter() {
    return (dispatch) => {
        getFilter(function(filter) {
            dispatch({type: "FETCH_FILTER_SUCCESS", filter});
        } )
    }


	// let filter = getFilter(function(val) {
     //    console.log(val)
    // })
	// return {
	// 	type: "FETCH_FILTER_SUCCESS",
     //    filter,
	// };
}

export function addFilter(filter: Array) {
    let tempFilter = setFilter(filter);
    return {
        type: "ADD_FILTER",
        tempFilter,
    };
}


