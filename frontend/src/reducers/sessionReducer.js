const initialState = {
	userId: null,
	username: null,
	token: null,
	loggedIn: false,
	likedPokemon: null
  };
  
  const SET_USER_ID = 'SET_USER_ID';
  const SET_USERNAME = 'SET_USERNAME';
  const SET_TOKEN = 'SET_TOKEN';
  const SET_LOGGED_IN = 'SET_LOGGED_IN';
  const SET_LIKED_POKEMON = 'SET_LIKED_POKEMON';
  
  export const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
	  case SET_USER_ID:
		return { ...state, userId: action.payload };
	  case SET_TOKEN :
		return { ...state, token: action.payload };
	  case SET_LOGGED_IN:
		return { ...state, loggedIn: action.payload };
	  case SET_USERNAME:
		return { ...state, username: action.payload };
	  case SET_LIKED_POKEMON:
		return {...state, likedPokemon: action.payload } ;
	  default:
		return state;
	}
  };
  
  export const setUserId = (userId) => ({
	type: SET_USER_ID,
	payload: userId,
  });

  export const setUsername = (username) => ({
	type: SET_USERNAME,
	payload: username,
  });

  export const setLikedPokemon = (likedPokemon) => ({
	type: SET_LIKED_POKEMON,
	payload: likedPokemon
  });

  export const setToken = (token) => ({
	type: SET_TOKEN,
	payload:  token,
  });

  export const setLoggedIn = (loggedIn) => ({
	type: SET_LOGGED_IN,
	payload: loggedIn,
  });
  
