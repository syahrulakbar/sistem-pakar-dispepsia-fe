import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import blogReducer from "./blogReducer";
const reducer = combineReducers({ globalReducer, blogReducer });
export default reducer;
