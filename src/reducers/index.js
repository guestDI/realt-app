import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../container/HomeContainer/reducer";
import mapReducer from "../container/MapContainer/reducer";
import ratedFriendsReducer from "../container/FlatPageContainer/reducer";
import filterReducer from "../container/FilterContainer/reducer";
import flatReducer from "../container/FlatPageContainer/reducer";

export default combineReducers({
  form: formReducer,
  homeReducer,
    mapReducer,
  ratedFriendsReducer,
  filterReducer,
    flatReducer
});
