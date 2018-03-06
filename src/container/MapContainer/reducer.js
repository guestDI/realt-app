const initialState = {
  mapList: [],
};

export default function(state: any = initialState, action: Function) {

  if (action.type === "MAP_CLEAR") {
      return {
          ...state,
          mapList: []
      };
  }

  if (action.type === "FETCH_MAP_LIST_SUCCESS") {
    return {
      ...state,
      mapList: [...state.mapList, ...action.mapList]
    };
  }

  if (action.type === "MAP_LIST_IS_LOADING") {
    return {
      ...state,
      isLoading: action.isLoading
    };
  }

  return state;
}


