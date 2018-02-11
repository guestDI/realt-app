const initialState = {
	filter: {},
	isLoading: true,
};

export default function(state: any = initialState, action: Function) {
    switch (action.type) {
        case "FETCH_FILTER_SUCCESS":
            console.log(action.filter)
            return action.filter;
        case "ADD_FILTER":
            return [...state,action.filter];
        default:
            return state;
    }
}
