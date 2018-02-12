const initialState = {
    filter: {},
};

export default function(state: any = initialState, action: Function) {
    if(action.type === "FETCH_FILTER"){
        // console.log(action.filter)
        return {
            ...state,
            filter: action.filter,
        };
    }

    if(action.type === "ADD_FILTER"){
        return Object.assign({}, action.filter);
    }
    return state;
}