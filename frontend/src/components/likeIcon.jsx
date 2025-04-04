import React, { useState} from 'react';
import notLikedIcon from '../assets/heart_icon.png'; // Import your default heart icon
import likedIcon from '../assets/heart_icon_full.png'; // Import the icon for hover
import { setLogIn } from '../reducers/appReducers.js';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPokemon } from '../reducers/pokemonReducer.js';
import { setLikedPokemon } from '../reducers/sessionReducer.js';


import { setUserId, setUsername, setToken } from '../reducers/sessionReducer.js';

import axios from 'axios';


const handleLikePokemon = async (userId, pokemonId, likedPokemon, dispatch) => {
  console.log("HANDLE LIKE POKEMON")
  const updatedLikes = [...(Array.isArray(likedPokemon) ? likedPokemon : []), { id: pokemonId }];
  console.log("likes updated: ", updatedLikes)
  dispatch(setLikedPokemon(updatedLikes));
  try {
    await axios.post(`http://localhost:5001/user/likePokemon/`, { userId, pokemonId });
  } catch (error) {
    console.error('Error liking the Pokémon:', error);
    dispatch(setLikedPokemon(likedPokemon));  // Revert to the previous state if theres an error saving to database
  }
};

const handleDislikePokemon = async (userId, pokemonId, likedPokemon, dispatch) => {
  // Handle local state update to reflect the dislike action
  console.log("HANDLE DISLIKE POKEMON")
  const updatedLikes = likedPokemon.filter(pokemon => pokemon.id !== pokemonId); // Remove the disliked Pokémon

  // Optimistically update the state before sending the request
  dispatch(setLikedPokemon(updatedLikes));
  
  try {
    // Send the dislike request to the backend (usually DELETE for removing data)
    await axios.delete(`http://localhost:5001/user/dislikePokemon`, {
      data: { userId, pokemonId } // Send userId and pokemonId in the request body
    });
  } catch (error) {
    // If there is an error, revert the local state to its previous value
    console.error('Error disliking the Pokémon:', error);
    dispatch(setLikedPokemon(likedPokemon)); // Revert to the previous state if there's an error
  }
};



// const likePokemon = async (userId, pokemonId) => {

//   console.log("user liked pokemon: ", pokemonId)
//   const loginInfo = { userId, pokemonId };
//   try {
//     const response = await axios.post('http://localhost:5001/user/likePokemon/', loginInfo);
//   }
//   catch {
//     console.log("error occured");
//   }
// }

const HeartIcon = ({className, pokemonId}) => {
  const [isHovered, setIsHovered] = useState(false);
  const userId = useSelector((state) => state.session.userId)
  const loggedIn = useSelector((state) => state.app.loggedIn);
  const likedPokemon = useSelector((state) => state.session.likedPokemon);
  const dispatch = useDispatch();
  let isPokemonLiked;
  if (loggedIn && Array.isArray(likedPokemon)) {
      isPokemonLiked = likedPokemon.some(pokemon => pokemon.id === pokemonId);
  } else {
    isPokemonLiked = false;
  }
  //console.log("POKEMON ID: ", pokemonId, "LIKED POKEMON: ", likedPokemon, "IS LIKED: ". isPokemonLiked)
  const handleIconClick = (event) => {
    event.stopPropagation();
    if (!loggedIn) {
      dispatch(setLogIn(true));
      return ;
    }
    console.log("IS POKEMON LIKED: ", isPokemonLiked, "LIKED POKEMON: ", likedPokemon)
    if (!isPokemonLiked)
      handleLikePokemon(userId, pokemonId, likedPokemon, dispatch);
    else
      handleDislikePokemon(userId, pokemonId, likedPokemon, dispatch)
    };

  return (
    <img
      src={(isPokemonLiked ? (isHovered ? notLikedIcon : likedIcon) : (isHovered ? likedIcon : notLikedIcon))}
      className={className}
      onMouseEnter={() => setIsHovered(true)}  // Set to true on hover
      onMouseLeave={() => setIsHovered(false)} // Set to false when not hovering
      alt="heart-icon"
	  onClick={(e) => handleIconClick(e)}
    />
  );
};

export default HeartIcon;
