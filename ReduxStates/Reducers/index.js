import { combineReducers } from "redux";
import UsersAdminCheck from "./UsersAdminCheck";

const reducers = combineReducers({
    userAdmin: UsersAdminCheck
});

export default reducers;