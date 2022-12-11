import { combineReducers } from 'redux';

import {reducer as user} from "./reducers/user/reducers";
import {reducer as projectContext} from "./reducers/project/reducers"

export const store = combineReducers({
  user: user,
  projectContext: projectContext,
});

export type RootState = ReturnType<typeof store>
