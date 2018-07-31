const initialState = {
    notInterestedFlats: []
};

export default function(state: any = initialState, action: Function) {
    if (action.type === "SAVE_NOT_INTERESTED_FLAT") {
        return Object.assign({}, state, {notInterestedFlats: [...state.notInterestedFlats, action.notInterestedFlat]});
    }

    if (action.type === "NOT_INTERESTED_FLATS") {
        return Object.assign({}, state, {notInterestedFlats: action.notInterestedFlats});
    }

    if(action.type === "REMOVE_NOT_INTERESTED_FLAT"){
        return Object.assign({}, state, {notInterestedFlats: state.notInterestedFlats.filter(flat => flat.id !== action.id)})
    }

    return state;
}
