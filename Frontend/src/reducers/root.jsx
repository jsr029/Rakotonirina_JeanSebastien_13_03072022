import { withReduxStateSync } from 'redux-state-sync';

export const rootReducer = (state = 0, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }
};
export default withReduxStateSync(rootReducer);