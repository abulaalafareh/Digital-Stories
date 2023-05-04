import { combineReducers } from "redux";
import { userReducers } from "./StoryReducers";

const reducers = combineReducers({
  userReducer: userReducers,
});

export default reducers;
