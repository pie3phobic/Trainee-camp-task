import { createStore, combineReducers } from "redux";
import tripsReducer from "./reducers/tripReducer";

const rootReducer = combineReducers({
  trips: tripsReducer,
});

const store = createStore(rootReducer);

export default store;
