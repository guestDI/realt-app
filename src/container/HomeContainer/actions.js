import axios from 'axios';

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

// function setUserRating(movieId: string, userId: string, rate: number, comment: string) {
// 	return {
// 		type: "SET_MOVIE_RATE_AND_COMMENT",
// 		movieId: movieId,
// 		userId: userId,
// 		rate: rate,
// 		comment: comment,
// 	}
// }
//
// export function fetchList(startDate, endDate) {
// 	return dispatch => {
// 		// console.log(startDate, endDate);
//         firebase.database().ref('movies').orderByChild('date').startAt(startDate).endAt(endDate).on('value', (snapshot) => {
//             const movies = [];
//         	snapshot.forEach(function(child) {
//                 const movie = child.val();
// 				movies.push(movie);
//             });
//             dispatch(fetchListSuccess(movies));
//         });
// 		dispatch(listIsLoading(false));
// 	};
// }
//
// export function setRate(movieId: string, userId: string, rate: number, comment: string) {
// 	return dispatch => {
// 		firebase.database().ref("movies/" + movieId + "/ratings/users").update({
// 			[userId]: {
// 				rate: rate,
// 				comment: comment,
// 			}
// 		});
//         firebase.database().ref("users/" + userId + "/movies").update({
//             [movieId]: {
//                 rate: rate,
//                 comment: comment,
//             }
//         });
// 		dispatch(setUserRating(movieId, userId, rate, comment));
// 	}
// }
