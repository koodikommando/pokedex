import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ModalWrapper from '../modalWrapper';
import FormInput from '../../form/formInput';
import { setLogIn, setSignUp, setLoggedIn } from '../../../reducers/appReducers';
import pokeballBlack from '../../../assets/pokeball_black.png'; 
import { setUserId, setToken } from '../../../reducers/sessionReducer';
import axios from 'axios';



export const LogInWindow = ({onClose}) => {
	const dispatch = useDispatch();
	const logIn = useSelector((state) => state.app.logIn)
	const signUp = useSelector((state) => state.app.signUp)
	const userId = useSelector((state) => state.session.userId)
	const token = useSelector((state) => state.session.token)
	const [error, setError] = useState();
  
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const email = document.getElementById('email').value;
			const password = document.getElementById('password').value;
			const loginInfo = { email, password };
			console.log(loginInfo)
			const response = await axios.post("http://localhost:5001/auth/emailLogin/", loginInfo);
			dispatch(setUserId(response.data.userId))
			dispatch(setToken(response.data.idToken))
			dispatch(setLoggedIn(true));
			dispatch(setLogIn(false));
			localStorage.setItem("userId", response.data.userId);
			localStorage.setItem("token", response.data.idToken);

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
	}
  
	const handleSignUpClick = () =>
	{
	  dispatch(setSignUp(true));
	  dispatch(setLogIn(false));
	}
  
	return (
	  <ModalWrapper onClose={onClose}>
		<div className="relative h-96 w-80 bg-white flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
			<button
			  onClick={() => dispatch(setLogIn(false))}
			  aria-label="Close login window"
			  className="absolute top-2 left-2 text-black"
			>
			  X
			</button>
			<img className="absolute top-10 w-24 h-24 object-contain" src={pokeballBlack} alt="Pokeball icon" />
		  <div className="login-form-container mt-28">
		  		<form className="flex flex-col gap-2 h-full" aria-labelledby="login-form-title">
					<h2 id="login-form-title" className="sr-only">Login Form</h2>
					<label htmlFor="email" className="sr-only">Email</label>
					<input
			  			id="email"
			  			className="border-black border-2 p-1 rounded-0 shadow-brutalism-sm"
			  			placeholder="email"
			  			aria-label="Enter your email"
						/>
					<label htmlFor="password" className="sr-only">Password</label>
					<input
			  		id="password"
			 	 	type="password"
			  		className="border-black border-2 p-1 rounded-0 shadow-brutalism-sm"
			  		placeholder="password"
			  		aria-label="Enter your password"
					/>
					<button type="submit" className="border-2  border-black shadow-brutalism-sm bg-violet-600" aria-label="Log in" onClick={(e) => handleSubmit(e)}>
			  			Log in
					</button>
		  		</form>
			</div>
		  	<div className="login-tip-container text-center mt-5">
				<p>Don't have an account?</p>
				<p
			  	className="text-pokeblue cursor-pointer mt-0"
			  	onClick={handleSignUpClick}
			  	role="button"
			  	tabIndex="0"
			  	aria-label="Sign up for a new account"
				>
			  	Sign up
				</p>
		  </div>
		</div>
	  </ModalWrapper>
	);  
  }
  