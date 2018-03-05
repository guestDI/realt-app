const initialState = {
  list: [],
  mapList: [],
  listIsLoading: false,
  listIsRefreshing: false,
  isLoading: true
};

export default function(state: any = initialState, action: Function) {
  if (action.type === "FETCH_LIST_SUCCESS") {
    return {
      ...state,
      list: [...state.list, ...action.list]
    };
  }

  if (action.type === "LIST_CLEAR") {
      console.log("List Clear Reducer")
      return {
          ...state,
          list: []
      };
  }

  if (action.type === "MAP_CLEAR") {
      return {
          ...state,
          mapList: []
      };
  }

  if (action.type === "LIST_IS_REFRESHING") {
    return {
      ...state,
      listIsRefreshing: action.listIsRefreshing
    };
  }

  if (action.type === "LIST_IS_LOADING") {
    return {
      ...state,
        listIsLoading: action.listIsLoading
    };
  }

  if (action.type === "FETCH_LIST_HAS_ERRORED") {
      return {
          ...state,
          listHasErrored: action.listHasErrored
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


