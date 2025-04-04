import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "../index.css"
import { setSearchPokemon, setSearchFilters } from '../reducers/pokemonReducer';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({pokemonList}) => {
	const dispatch = useDispatch();
	const searchPokemon = useSelector((state) => state.pokemon.searchPokemon);
	const searchFilters = useSelector((state) => state.pokemon.searchFilters);
	const [showFilters, setShowFilters] = useState(false); // 👈 toggle state

	useEffect(() => {
		console.log(searchFilters)
	}, [searchFilters]);

	if (!pokemonList) return null;

	const handleInputChange = (event) => {
		dispatch(setSearchPokemon(event.target.value));
	};

	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		const newFilters = {
			...searchFilters,
			[name]: checked,
		};
		dispatch(setSearchFilters(newFilters));
	};

	return (
		<>
			<form className="flex items-center gap-0" aria-label="Search bar">
				<label htmlFor="search-input" className="sr-only">Search Pokémon</label>
				<input
					className="rounded-0 text-black border-2 border-black shadow-brutalism-sm p-2"
					type="text"
					placeholder="Search..."
					value={searchPokemon}
					onChange={handleInputChange}
					aria-label="Search Pokémon"
				/>
				<button className="rounded-0 text-black border-2 border-black shadow-brutalism-sm p-2" type="submit" aria-label="Search button">
        				<MagnifyingGlassIcon className="size-6 h-full stroke-[2]"></MagnifyingGlassIcon>
				</button>
			</form>

			{/* Toggle Filters Button */}
			<div className="mt-4">
				<button
					type="button"
					onClick={() => setShowFilters(prev => !prev)}
					className="underline text-sm font-semibold"
				>
					{showFilters ? 'Hide Filters' : 'Show Filters'}
				</button>
			</div>

			{/* Filters Section (conditionally rendered) */}
			{showFilters && (
				<div className="mt-2">
					<h3 className="font-semibold mb-2">Filter by Type:</h3>
					<div className="flex gap-3 w-full flex-wrap">
						{Object.entries(searchFilters).map(([type, isActive]) => (
							<label key={type} className="flex items-center gap-2">
								<input
									type="checkbox"
									name={type}
									checked={isActive}
									onChange={handleCheckboxChange}
									aria-label={`${type} Type`}
									className={`appearance-none outline-none block relative text-center cursor-pointer m-auto w-5 h-5 
										before:rounded-sm before:block before:absolute before:content-[''] before:bg-white before:w-5 before:h-5 before:rounded-sm before:border-black before:border-2 before:hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]
										after:block after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-2 after:h-3 after:border-black after:border-r-2 after:border-b-2 after:origin-center after:rotate-45
										${isActive ? "after:opacity-1 before:checked:bg-gray-200" : 'after:opacity-0'}`}
								/>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</label>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default SearchBar;
