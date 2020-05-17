import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { profiles } from './profiles.reducer'
import { photos } from './photos.reducer'
import {comments} from './comments.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  profiles,
  photos,
  comments
});

export default rootReducer;