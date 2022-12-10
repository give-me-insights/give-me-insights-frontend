import { combineReducers } from 'redux';

import {reducer as user} from "./reducers/user/reducers";

export const store = combineReducers({
  user: user
});

export type RootState = ReturnType<typeof store>
