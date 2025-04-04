import { configureStore } from '@reduxjs/toolkit';
import {pokemonReducer} from '../reducers/pokemonReducer';
import { appReducer } from '../reducers/appReducers';
import { sessionReducer } from '../reducers/sessionReducer';

const store = configureStore({
	reducer: {
	  pokemon: pokemonReducer,
	  app: appReducer,
	  session: sessionReducer,
	},
	// Disable middleware logging (default behavior doesn't log anything unless explicitly configured)
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
export default store;

