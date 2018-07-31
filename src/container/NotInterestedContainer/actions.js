import { addNotInterestedFlat, getNotInterestedFlats, deleteFlatFromNotInterested } from "../../asyncStorage";

export const addFlatToInterested = notInterestedFlat => {
    return (dispatch, getState) => {
        addNotInterestedFlat([...getState().notInterestedFlatReducer.notInterestedFlats, notInterestedFlat]);
        dispatch({
            type: "SAVE_NOT_INTERESTED_FLAT",
            notInterestedFlat
        })
    }
};

export function fetchNotInterestedFlats() {
    return dispatch => {
        getNotInterestedFlats(function(notInterestedFlats) {
            dispatch({ type: "NOT_INTERESTED_FLATS", notInterestedFlats });
        });
    };
}

export function removeFromNotInterested(id){
    deleteFlatFromNotInterested(id);
    return ({ type: "REMOVE_NOT_INTERESTED_FLAT", id});
}
