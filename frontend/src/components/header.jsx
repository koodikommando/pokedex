import React from "react"
import pokeballBlack from '../assets/pokeball_black.png'; 
import pokeballWhite from '../assets/pokeball_white.png';
import userIcon from '../assets/user_white.png';
import { setUserId, setToken } from '../reducers/sessionReducer.js';
import { setLogIn, setLoggedIn, setSignUp } from '../reducers/appReducers.js';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';




export function Header({handleLogOut, handleSeeAllClick}) {

	const dispatch = useDispatch();
	const loggedIn = useSelector((state) => state.app.loggedIn);
	return (
	<header className=" text-white items-center w-full gap-20 h-16 flex justify-center">
		<Link to="/">
		<div className="flex items-center">
		<h1 className="text-white ">POKEDEX</h1>
		<img src={pokeballWhite} className="w-8 h-8 max-w-full max-h-full object-contain" alt="Pokeball icon" />
		</div>
		</Link>
		<div className="flex gap-1 items-center">

		<Link to="/user">
		<img src={userIcon} className="w-8 h-8 max-w-full max-h-full object-contain" alt="user icon" aria-label="open profile modal"/>
		</Link>
  		<div>
  			{loggedIn ? (
			<p onClick={handleLogOut} className=" ml-6 mr-2 font-bold">log out</p>
  			) : ( <p className=" ml-6 mr-2 font-bold" onClick={ () => dispatch(setLogIn(true))} aria-label='log in button'>log in</p> )
			}
  		</div>
		</div>
	</header>
	)
}

