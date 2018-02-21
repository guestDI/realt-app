const initialState = {
  list: [],
  isLoading: true,
  favoriteFlats: []
};

export default function(state: any = initialState, action: Function) {
  if (action.type === "FETCH_RATED_FRIENDS_LIST_SUCCESS") {
    return {
      ...state,
      list: action.list
    };
  }
  if (action.type === "RATED_FRIENDS_LIST_IS_LOADING") {
    return {
      ...state,
      isLoading: action.isLoading
    };
  }

  if (action.type === "SAVE_FLAT") {
    // console.error(state.favoriteFlats)
    // console.log(action.favoriteFlat)
    return Object.assign({}, state, {favoriteFlats: [...state.favoriteFlats, action.favoriteFlat]});
  }

  if (action.type === "FAVORITE_FLATS") {
      // console.error(action.favoriteFlats)
      return Object.assign({}, state, {favoriteFlats: action.favoriteFlats});
  }

  if(action.type === "REMOVE_FLAT"){
      return Object.assign({}, state, {favoriteFlats: state.favoriteFlats.filter(flat => flat.id !== action.id)})
  }

  return state;
}
