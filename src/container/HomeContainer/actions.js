import axios from 'axios';
import { setFilter, getFilter } from '../../asyncStorage'

export function listIsLoading(bool: boolean) {
	return {
		type: "LIST_IS_LOADING",
		isLoading: bool,
	};
}
export function fetchListSuccess(list: Array) {
	return {
		type: "FETCH_LIST_SUCCESS",
		list,
	};
}

export const fetchFlats = (filter) => {
    return (dispatch) => {
        dispatch(listIsLoading(true));

        axios.get('http://192.168.100.6:8080/flats?page=' + filter.page + '&' + 'size=' + filter.size)
            .then((response) => response.data)
            .then((flats) => dispatch(fetchListSuccess(flats)))
            // .then(() => dispatch(usersFetchSuccess()))
            .catch((e) => {console.error(e);});
    }
};

export function fetchFilter() {
    return (dispatch) => {
        getFilter(function(data) {
            // console.log(data)
            dispatch({type: "FETCH_FILTER", data});
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
    let saved_filter = setFilter(filter);
    return {
        type: "ADD_FILTER",
        saved_filter,
    };
}