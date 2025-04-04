import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "../index.css"
import { setSearchPokemon, setSearchFilters, setFilterPokemon } from '../reducers/pokemonReducer';


const SearchBar = ({pokemonList}) => {
	const dispatch = useDispatch();
	const searchPokemon = useSelector((state) => state.pokemon.searchPokemon);
	const searchFilters = useSelector((state) => state.pokemon.searchFilters);
	const setFilterPokemon = useSelector((state) => state.pokemon.filterPokemon);
	
	useEffect(() => {
		console.log(searchFilters)
	}, [searchFilters])

	if (!pokemonList)
		return null;
	const handleInputChange = (event) => {
	  dispatch(setSearchPokemon(event.target.value));
	};


	
	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		const prevFilters = searchFilters;
		const newFilters = {
			...prevFilters,
			[name]: checked,
		  };
		dispatch(setSearchFilters(newFilters))
	  };

	return (
		<>
		<form className="flex items-center gap-5" aria-label="Search bar">
			<label htmlFor="search-input" className="sr-only">Search Pokémon</label>
			<input className="rounded-0 text-black border-2 border-black shadow-brutalism-sm p-2" type="text" placeholder="Search..." value={searchPokemon} onChange={handleInputChange} aria-label="Search Pokémon"></input>
			<button className="font-bold" type="submit" aria-label="Search button">search</button>
		</form>
		<div className="mt-4">
  <h3 className="font-semibold">Filter by Type:</h3>
  <div className="flex gap-3 w-1/2 flex-wrap">
  {Object.entries(searchFilters).map(([type, isActive]) => (
      <label key={type} className="flex items-center gap-2">
        <input
          type="checkbox"
          name={type}
          checked={isActive}
          onChange={handleCheckboxChange}
          aria-label={`${type} Type`}
        />
        {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize the type name */}
      </label>
    ))}
  </div>
</div>

		</>
	)
} 

export default SearchBar