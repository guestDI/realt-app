const initialState = {
	list: [],
	isLoading: true,
};

export default function(state: any = initialState, action: Function) {
	if (action.type === "FETCH_LIST_SUCCESS") {
		return {
			...state,
			list: [...state.list, ...action.list],
		};
	}
	if (action.type === "LIST_IS_LOADING") {
		return {
			...state,
			isLoading: action.isLoading,
		};
	}
	if (action.type === "SET_MOVIE_RATE_AND_COMMENT") {
		const moviesCopy = [...state.list];
		const movieForUpdate = moviesCopy.filter(movie => movie.id === action.movieId)[0];
		//additional logic, because we don't sure that users field exists
		const userRatings = movieForUpdate.ratings.users ? movieForUpdate.ratings.users : [];
		userRatings[action.userId] = {
			rate: action.rate,
			comment: action.comment
		};
		movieForUpdate.ratings['users'] = userRatings;
		return {
			...state,
			list: moviesCopy
		}
	}
	return state;
}
