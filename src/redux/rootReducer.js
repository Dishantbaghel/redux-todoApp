import { combineReducers } from "redux";
import { operationsReducer } from "./reducers/operationsReducer";

export const rootReducer = combineReducers({ // combineReducer connect all reducers
    operationsReducer,
//  more reducers can be added here 
})