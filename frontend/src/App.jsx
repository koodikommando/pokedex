import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./index.css"
import getTypeColorHex from './components/utility.js'
import { setSelectedPokemon, setLoading, setInspectPokemon, setSearchFilters} from './reducers/pokemonReducer.js'
import { fetchPokemonList } from './api/fetchPokemonData.js';
import InspectPokemon from './pages/pokedex/inspectPokemon.jsx';
import SearchBar from './components/searchBar.jsx'
import { ClipLoader } from "react-spinners";
import { setLogIn, setLoggedIn, setSignUp } from './reducers/appReducers.js';

import ModalWrapper from './components/modals/modalWrapper.jsx';
import FormInput from './components/form/formInput.jsx';
import { SignUpWindow } from './components/modals/signUpWindow/signUpWindow.jsx';
import { LogInWindow}from './components/modals/loginWindow/loginWindow.jsx';
import { setUserId, setToken, setLikedPokemon } from './reducers/sessionReducer.js';
import heartIcon from './assets/heart_icon.png'
import HeartIcon from './components/likeIcon.jsx';
import axios from 'axios'
import {Header} from './components/header.jsx'
import Pokedex from './pages/pokedex.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  UserPage from './pages/userPage.jsx'

const fetchLikedPokemon = async (userId, dispatch) => {
  console.log("FETCHING USER LIKED POKEMON OF USER: ", userId)
  try {
    const response = await axios.get(`http://localhost:5001/user/getUserLikedPokemon`, {
      params: { userId: userId } // Pass userId as a query parameter
    });
    console.log(response.data)
    dispatch(setLikedPokemon(response.data)); // Save liked Pokémon to Redux store
  } catch (error) {
    console.error("Error fetching liked Pokémon:", error);
  }
};


const App = () => {
  const dispatch = useDispatch();
  const selectedPokemon = useSelector((state) => state.pokemon.selectedPokemon);
  const loading = useSelector((state) => state.pokemon.loading);
  const pokemonList = useRef(null);
  const searchPokemon = useSelector((state) => state.pokemon.searchPokemon);
  const loggedIn = useSelector((state) => state.app.loggedIn);
  const logIn = useSelector((state) => state.app.logIn);
  const signUp = useSelector((state) => state.app.signUp);
  const likedPokemon = useSelector((state) => state.session.likedPokemon);

  const [activeModal, setActiveModal] = useState(null);

  const closeLogin = () => dispatch(setLogIn(false));
  const closeSignUp = () => dispatch(setSignUp(false));
  const closeInspectPokemon = () => dispatch(setSelectedPokemon(null));

  useEffect(() => {
    handleSeeAllClick();
    }, []); 

    useEffect(() => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
    
      if (userId && token) {
        // If sessionStorage contains userId and token, update Redux store
        dispatch(setUserId(userId));
        dispatch(setToken(token));
        dispatch(setLoggedIn(true)); // Set logged-in status
    
        // Fetch liked Pokémon
        console.log("fetching liked pokemon");
        fetchLikedPokemon(userId, dispatch);
      }
    }, [dispatch]);

  const handleSeeAllClick = async () => {
    dispatch(setLoading(true));
    if (pokemonList.current === null)
    {
      const list = await fetchPokemonList(); // Wait for the API call to resolve
      pokemonList.current = list; // Assign directly if it's an array
    }
    dispatch(setLoading(false));
    console.log(pokemonList)
  };

  const handleLogOut = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.log('No userId found');
      return; // Early return if userId is not available
    }
  
    try {
      const response = await fetch('http://localhost:5001/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`,
        },
      });
  
      const data = await response.json();
      console.log("Server response:", data);
  
      // Optionally, clear local storage here
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      dispatch(setLoggedIn(false)); // Dispatch an action to update logged-in state
      dispatch(setLikedPokemon(null))
  
    } catch (error) {
      console.error('Error during log out:', error.message);
    }
  };
  
  return (
    <Router>
    <div className="App font-publicSans min-w-screen min-h-screen bg-pokered">
    <Header handleLogOut={handleLogOut}></Header>
      <main>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
        </main>
    </div>
    </Router>
  );
};


export default App;



