export function ratedFriendsListIsLoading(bool: boolean) {
	return {
		type: "RATED_FRIENDS_LIST_IS_LOADING",
		isLoading: bool,
	};
}
export function fetchRatedFriendsListSuccess(list: Array) {
	return {
		type: "FETCH_RATED_FRIENDS_LIST_SUCCESS",
		list,
	};
}
//
// export function fetchRatedFriendsList(id) {
// 	let prop = id;
// 	let friendsRatedMovie = [];
// 	let friend = {};
// 	return (dispatch, getState) => {
// 		const uid = getState().loginReducer.uid;
// 		firebase.database().ref('users/' + uid).child('friends').on('value', (snapshot) => {
// 			const friendIds = Object.keys(snapshot.val());
// 			loadFriendsParallel(friendIds).then(values => {
// 				values.map((val) => {
// 					let currentFriend = val.val();
// 					if(currentFriend.movies[prop]){
// 						friendsRatedMovie.push(currentFriend)
// 					}
// 				})
// 				// let ratedFriends = values.map(val => val.val());
//
// 				dispatch(fetchRatedFriendsListSuccess(friendsRatedMovie));
// 			})
// 		})
//         dispatch(ratedFriendsListIsLoading(false));
// 	};
// }
//
// function loadFriendsParallel(userIds) {
// 	const db = firebase.database();
//     return Promise.all(
//         userIds.map(id => db.ref('users').child(id).once('value'))
//     );
// }