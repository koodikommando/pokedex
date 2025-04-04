const initialState = {
	logIn: false,
	signUp: false,
	loading: false,
	loggedIn: false
  };
  
  const SET_LOG_IN = 'SET_LOG_IN';
  const SET_SIGN_UP = 'SET_SIGN_UP';
  const SET_LOGGED_IN = 'SET_LOGGED_IN';
  const SET_LOADING = 'SET_LOADING';

  
  export const appReducer = (state = initialState, action) => {
	switch (action.type) {
	  case SET_LOG_IN:
		return { ...state, logIn: action.payload };
	  case SET_SIGN_UP:
		return { ...state, signUp: action.payload };
	  case SET_LOADING:
		return { ...state, loading: action.payload };
	  case SET_LOGGED_IN:
		return { ...state, loggedIn: action.payload };
	  default:
		return state;
	}
  };
  
  export const setLogIn = (logIn) => ({
	type: SET_LOG_IN,
	payload: logIn,
  });
  export const setSignUp = (signUp) => ({
	type: SET_SIGN_UP,
	payload: signUp,
  });

  export const setLoggedIn = (loggedIn) => ({
	type: SET_LOGGED_IN,
	payload: loggedIn,
  });
  
  export const setLoading = (loading) => ({
	type: SET_LOADING,
	payload: loading,
  });
  

  
