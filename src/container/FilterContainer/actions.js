import { setFilter, getFilter } from '../../asyncStorage'

export function fetchFilter() {
    return (dispatch) => {
        getFilter(function(filter) {
            // console.log(data)
            dispatch({type: "FETCH_FILTER", filter});
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

export function addFilter(filter: Object) {
    setFilter(filter);
    return {
        type: "ADD_FILTER",
        filter,
    };
}


