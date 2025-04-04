import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setLogIn, setSignUp, setLoggedIn } from '../reducers/appReducers';
import pokeballBlack from '../assets/pokeball_black.png'; 
import { setUserId, setToken } from '../reducers/sessionReducer';
import axios from 'axios';


function Friends() {
	return (
	  <div id="friend-list" className="">
		<h2 className="text-xl">friends</h2>
		<ul className="grid grid-cols-2 gap-1 p-2 text-sm">
		  <li className="">
			<div className="h-24 w-24 border-2 border-black bg-gray-400"></div>
			<p className="w-full">markku</p>
		  </li>
		  <li className="">
			<div className="h-24 w-24 border-2 border-black bg-gray-400"></div>
			<p>seppo taalasmaa</p>
		  </li>
		  <li className="">
			<div className="h-24 w-24 border-2 border-black bg-gray-400"></div>
			<p className="w-full">pokemon fanboy 92</p>
		  </li>
		</ul>
	  </div>
	);
  }
  


const ProfileInfo = ({username}) => {


	return (
		<div id="profile-info" className="p-5 w-1/4">
			<div id="profile-pic-wrapper" className="relative">

			</div>
			<div className="bg-slate-400 relative w-28 h-28 rounded-full border-black border-2 mb-5">
				<span className="text-2xl bg-white rounded-full px-2 border-2 border-black right-0 absolute bottom-0"> + </span>
			</div>
			<ul>
				<li className="border-black border-dashed border-b-2 my-2">
					<p>{username}</p>
				</li>
				<li className="border-black border-dashed border-b-2 my-2">
					<p>friends: 0</p>
				</li>
				<li className="border-black border-dashed border-b-2 my-2">
					<p>country: asd</p>
				</li>
				<li className="border-black border-dashed border-b-2 my-2">
					<p>member since: asd</p>
				</li>
			</ul>
		</div>
	)
}

function UserPage() {
	const userId = useSelector((state) => state.session.userId)
	const username = useSelector((state) => state.session.username)
	console.log(username)
	console.log("user: ", userId)
	return (
		<>
		<div className='w-full h-96 flex justify-center items center'>
		<div className="w-4/5 h-full p-2 bg-white border-2 border-black shadow-brutalism-lg">
			<h1 className="w-full text-2xl mb-2 text-center">hello {username}</h1>
			<div className='flex justify-between'>
			<ProfileInfo username={username}></ProfileInfo>
			<Friends></Friends>

			</div>
		</div>
		</div>
		</>
	)
}

export default UserPage;