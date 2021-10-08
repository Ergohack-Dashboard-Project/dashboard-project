import { configureStore } from '@reduxjs/toolkit';
import { Actions as authActions } from './auth';
import rootReducer from './rootReducer';
import { createWrapper } from 'next-redux-wrapper';

function configureReduxStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(), // add middleware in concat()
  });

  // store.dispatch(authActions.fetchUserFromToken())

  // enable hot reloading in development
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
  }

  return store;
}

export const wrapper = createWrapper(configureReduxStore, { debug: true });
