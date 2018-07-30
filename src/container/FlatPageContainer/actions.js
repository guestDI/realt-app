import { saveFlats, getFavoriteFlats, deleteFlatFromFavorites } from "../../asyncStorage";

export const addFavoriteFlat = favoriteFlat => {
    return (dispatch, getState) => {
        saveFlats([...getState().flatReducer.favoriteFlats, favoriteFlat]);
        dispatch({
            type: "SAVE_FLAT",
            favoriteFlat
        })
    }
};

export function fetchFavoritesFlats() {
    return dispatch => {
        getFavoriteFlats(function(favoriteFlats) {
            dispatch({ type: "FAVORITE_FLATS", favoriteFlats });
        });
    };
}

export function removeFromFavorite(id){
    deleteFlatFromFavorites(id);
    return ({ type: "REMOVE_FLAT", id});
}

