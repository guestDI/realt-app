const initialState = {
	list: [],
    data: {},
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
    if(action.type === "FETCH_FILTER"){
        // console.log(action.data)
        return action.data;
    }

    if(action.type === "ADD_FILTER"){
        return Object.assign({}, action.filter);
    }
	return state;
}


