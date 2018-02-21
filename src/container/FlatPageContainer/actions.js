import { saveFlats, getFavoriteFlats, deleteFlatFromFavorites } from "../../asyncStorage";

export function ratedFriendsListIsLoading(bool: boolean) {
  return {
    type: "RATED_FRIENDS_LIST_IS_LOADING",
    isLoading: bool
  };
}
export function fetchRatedFriendsListSuccess(list: Array) {
  return {
    type: "FETCH_RATED_FRIENDS_LIST_SUCCESS",
    list
  };
}

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

