import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ModalWrapper from '../modalWrapper';
import FormInput from '../../form/formInput';
import { setLogIn, setSignUp, setLoggedIn } from '../../../reducers/appReducers';
import { setUserId, setUsername, setToken } from '../../../reducers/sessionReducer';
import pokeballBlack from '../../../assets/pokeball_black.png'; 
import axios from 'axios';



export const SignUpWindow = () => {
	const dispatch = useDispatch();
	const logIn = useSelector((state) => state.app.logIn)
	const signUp = useSelector((state) => state.app.signUp)
	const userId = useSelector((state) => state.session.userId)
	const token = useSelector((state) => state.session.token)
	const [error, setError] = useState();
  
	const handleOutsideClick = (e) => {
	  const modal = document.getElementById("loginModal");
	  if (modal && !modal.contains(e.target)) {
  
		console.log("set login to false")
		dispatch(setLogIn(false));
	  }
	};
  
	useEffect(() => {
	  document.addEventListener("click", handleOutsideClick);
  
	  return () => {
		document.removeEventListener("click", handleOutsideClick);
	  };
	}, [dispatch]);

  
	const handleLogInClick = () =>
	{
	  dispatch(setSignUp(false));
	  dispatch(setLogIn(true));
	}


	const handleSignUpSubmit = async (e) => {
		e.preventDefault();
		const username = document.getElementById('username').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const loginInfo = { username, email, password };
	  
		try {
		  const response = await axios.post('http://localhost:5001/auth/emailSignup/', loginInfo);
		  
		  console.log(response);
		  dispatch(setUsername(username))
		  dispatch(setUserId(response.data.userId))
		  dispatch(setToken(response.data.idToken))
		  dispatch(setLoggedIn(true))
		} catch (error) {
		  if (error.response) {
			const errorMessage = error.response.data.error;
			console.log('Error: ', errorMessage);
			setError(errorMessage);
		  } else if (error.request) {
			console.log('Network error: ', error.request);
			alert('Network error. Please try again later.');
		  } else {
			console.log('Error: ', error.message);
			alert('Something went wrong. Please try again.');
		  }
		}
	  };
	  
	return (
	  <ModalWrapper>
		<div className="relative h-96 w-80 bg-white rounded-lg flex flex-col items-center justify-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
		  <button
			onClick={() => dispatch(setSignUp(false))}
			aria-label="Close login window"
			className="absolute top-2 left-2 text-black"
		  >
			X
		  </button>
			<img className="absolute top-10 w-24 h-24 object-contain" src={pokeballBlack} alt="Pokeball" />
		  <form className="flex flex-col gap-2 mt-28" aria-labelledby="login-form-title" onSubmit={(e) => handleSignUpSubmit(e)}>
			<h2 id="login-form-title" className="sr-only">Login Form</h2>
			
			<FormInput id="username" placeholder="Username" ariaLabel="Enter your username" />
			<FormInput id="email" placeholder="Email" ariaLabel="Enter your email" />
			<FormInput id="password" type="password" placeholder="Password" ariaLabel="Enter your password" />

			
			<button type="submit" className="bg-violet-500 border-2 border-black shadow-brutalism-sm" aria-label="Sign up">
			  Sign up
			</button>
		  </form>
			{error ? (<p className="text-red-600">{error}</p>) : null}
  
		  <div className="flex mt-2 gap-1">
			<p>Already a member?</p>
			<p
			  className="text-pokeblue cursor-pointer"
			  onClick={handleLogInClick}
			  role="button"
			  tabIndex="0"
			  aria-label="Log in as a member"
			>
			  Log in
			</p>
		  </div>
		</div>
	  </ModalWrapper>
	);
  }