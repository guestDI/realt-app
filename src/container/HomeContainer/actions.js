import axios from 'axios';
import { getFavoriteFlat, saveFavoriteFlat } from '../../asyncStorage'

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

export function mapListIsLoading(bool: boolean) {
    return {
        type: "MAP_LIST_IS_LOADING",
        isLoading: bool,
    };
}

export function fetchMapListSuccess(mapList: Array) {
    return {
        type: "FETCH_MAP_LIST_SUCCESS",
        mapList,
    };
}

export const fetchFlats = (filter) => {
    return (dispatch) => {
        dispatch(listIsLoading(true));
        axios.get('http://46.101.244.156:5555/flats?page=' + filter.page + '&' + 'size=' + filter.size)
            .then((response) => response.data)
            .then((flats) => dispatch(fetchListSuccess(flats)))
            // .then(() => dispatch(usersFetchSuccess()))
            .catch((e) => {console.error(e);});
    }
};

export const fetchFlatsOnMap = (filter) => {
    return (dispatch) => {
        dispatch(mapListIsLoading(true));
        axios.get('http://46.101.244.156:5555/flats?page=' + filter.page + '&' + 'size=' + filter.size)
            .then((response) => response.data)
            .then((flatsOnMap) => dispatch(fetchMapListSuccess(flatsOnMap)))
            // .then(() => dispatch(usersFetchSuccess()))
            .catch((e) => {console.error(e);});
    }
};

