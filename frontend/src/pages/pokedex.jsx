import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "../index.css"
import getTypeColorHex from '../components/utility.js'
import { setSelectedPokemon, setLoading, setInspectPokemon, setSearchFilters} from '../reducers/pokemonReducer.js'
import { fetchPokemonList } from '../api/fetchPokemonData.js';
import InspectPokemon from '../pages/pokedex/inspectPokemon.jsx';
import SearchBar from '../components/searchBar.jsx'
import { ClipLoader } from "react-spinners";
import { setLogIn, setLoggedIn, setSignUp } from '../reducers/appReducers.js';
import { SignUpWindow } from '../components/modals/signUpWindow/signUpWindow.jsx';
import { LogInWindow}from '../components/modals/loginWindow/loginWindow.jsx';
import { setUserId, setToken } from '../reducers/sessionReducer.js';
import heartIcon from '../assets/heart_icon.png'
import HeartIcon from '../components/likeIcon.jsx';





const PokemonCard = ({pokemon, index}) => {
  const dispatch = useDispatch();
  return (
  <div
    className="relative p-2 border-2 hover:scale-101 bg-white border-black shadow-brutalism-sm  h-52 flex flex-col items-center  overflow-hidden cursor-pointer"
    onClick={() => dispatch(setSelectedPokemon(pokemon))}

  >
    <span className="absolute top-0 left-0 z-4 border-2 border-black  bg-white px-2 "> #{pokemon.id} </span>
	<div className="h-full w-2 absolute z-1 left-0 bg-white"></div>
	<div className=" w-full h-2 absolute z-1 top-0 bg-white"></div>
    <div className='h-full w-full overflow-hidden border-2 border-black'>
    <div className="h-full w-full flex items-center justify-center  shadow-inset"
        style={{
          background: `${getTypeColorHex(pokemon.types[0])}`
        }}
    >
      <img className="max-h-full max-w-full object-contain"
       src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} />
    	<span className ="px-2 text-center absolute bottom-10 right-2 text-black opacity-50 p-1">{pokemon.types[0].type.name}</span>
    </div>
    </div>
  <div className=' bg-white flex justify-center w-full p-1 items-center'>
    <h2 className="text-black font-bold" aria-label='pokemon name'>{pokemon.name.toUpperCase()}</h2>
    <HeartIcon className={"h-5 w-5 absolute top-3 right-3 "} pokemonId={pokemon.id}/>
  </div>
  </div>
  )
}

const RenderPokemon =  ({ pokemonList }) => {
  const dispatch = useDispatch();
  const selectedPokemon = useSelector((state) => state.pokemon.selectedPokemon);
  const searchPokemon = useSelector((state) => state.pokemon.searchPokemon);
	const searchFilters = useSelector((state) => state.pokemon.searchFilters);
  console.log("Type of pokemonList:", typeof pokemonList);


  const anyFilterActive = Object.values(searchFilters).includes(true);

  if (anyFilterActive) {
    pokemonList = pokemonList.filter((pokemon) => {
      let matchesFilters = true;
      Object.entries(searchFilters).forEach(([type, isActive]) => {
        if (isActive && !pokemon.types.some(pokemonType => pokemonType.type.name === type)) {
          matchesFilters = false;
        }
      });
  
      return matchesFilters;
    });
  }
  

  if (searchPokemon != "")
  {
    pokemonList = searchPokemon
  ? (pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
    ))
  : pokemonList;
  }
  console.log("RENDER");

  if (!pokemonList)
    return null;
    return (
      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-4 gap-4">
          {pokemonList.map((pokemon, index) => (
            <PokemonCard pokemon={pokemon} index={index} key={index}/>
          ))}
      </div>
    );
};


const Pokedex = () => {
  const dispatch = useDispatch();
  const selectedPokemon = useSelector((state) => state.pokemon.selectedPokemon);
  const loading = useSelector((state) => state.pokemon.loading);
  const pokemonList = useRef(null);
  const searchPokemon = useSelector((state) => state.pokemon.searchPokemon);
  const loggedIn = useSelector((state) => state.app.loggedIn);
  const logIn = useSelector((state) => state.app.logIn);
  const signUp = useSelector((state) => state.app.signUp);

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
        dispatch(setLoggedIn(true));  // Set logged in status
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


  
  return (
	<div className="w-full min-h-full  p-11 pt-0">
	<div className="bg-gray-400 rounded-lg shadow-brutalism-lg border-2 border-black">
	<div className="p-4">
	<SearchBar pokemonList={(pokemonList)}></SearchBar>
	</div>
	{loading ? (
		<div className="flex items-center justify-center">
		  <ClipLoader color="white" size={50} />
		</div>
	  ) : (
	<>
		  <RenderPokemon 
			pokemonList={pokemonList.current} 
			setSelectedPokemon={dispatch(setSelectedPokemon)}
			/>
		  {selectedPokemon && (
			<InspectPokemon 
			pokemon={selectedPokemon} pokemonlist={pokemonList} onClose={closeInspectPokemon}/>
			)}
		</>
	  )}
	  {logIn ? (<LogInWindow onClose={closeLogin}/>) : null}
	  {signUp ? <SignUpWindow onClose={closeSignUp} /> : null}
	  {console.log("logged in: ", loggedIn)}
	  
	</div>
	</div>
  );
};


export default Pokedex;



