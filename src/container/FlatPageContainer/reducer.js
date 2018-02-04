const initialState = {
	list: [],
	isLoading: true,
};

export default function(state: any = initialState, action: Function) {
	if (action.type === "FETCH_RATED_FRIENDS_LIST_SUCCESS") {
		return {
			...state,
			list: action.list,
		};
	}
	if (action.type === "RATED_FRIENDS_LIST_IS_LOADING") {
		return {
			...state,
			isLoading: action.isLoading,
		};
	}
	return state;
}
