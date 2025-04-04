import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "../../index.css"
//import getTypeColorHex from '../../components/utility.js'
import { setSelectedPokemon, setEvolutionChain } from '../../reducers/pokemonReducer.js';
import { fetchEvolutionChain, fetchPokemonAbilities } from '../../api/fetchPokemonData.js';
import { getTypeColorHex } from '../../components/utility.js'
import { ClipLoader } from "react-spinners";
import axios from 'axios'
import ModalWrapper from '../../components/modals/modalWrapper.jsx';
import HeartIcon from '../../components/likeIcon.jsx';


const maxStats = new Map([
    ["hp", 0],
    ["attack", 0],
    ["defense", 0],
  ]);

const getEvolutionNames = (evolutionChain) => {
	if (!evolutionChain)
		return null
	console.log("traversing evolution names")
	console.log(evolutionChain);
	const evolutionList = []
	const traverseEvolutions = (chain) => {
	  evolutionList.push(chain.species.name);
	  if (chain.evolves_to && chain.evolves_to.length > 0) {
			chain = chain.evolves_to[0];
		  traverseEvolutions(chain);
		};
	  }
	traverseEvolutions(evolutionChain.chain);
	return evolutionList
  };



  const StatsBar = ({ currentValue, maxValue }) => {
	const percentage = (currentValue / maxValue) * 100;
	const textRef = useRef(null);
  
	useEffect(() => {
	  if (textRef.current) {
		const computedFontSize = window.getComputedStyle(textRef.current).fontSize;
		console.log(`Computed font size: ${computedFontSize}`);
	  }
	}, [percentage]);
  
	return (
	  <div className="w-full max-w-xs mx-auto py-2">
		<div className="bg-gray-300 relative border-2 h-5 border-black shadow-brutalism-sm overflow-hidden">
		  <div
			className={`${percentage > 60 ? 'bg-green-500' : percentage > 40 ? 'bg-yellow-500' : 'bg-red-500'} text-white max-h-full p-4`}
			style={{ width: `${percentage}%` }}
		  ></div>
		  <p
			ref={textRef}
			className="top-0 left-1/2 transform -translate-x-1/2 h-full w-full text-center absolute text-black flex items-center justify-center"
			aria-label="stat percent"
		  >
			{`${Math.round(percentage)}%`}
		  </p>
		</div>
	  </div>
	);
  };
  
  

const PokemonStats = ({pokemon}) => {
	const maxStat = Math.max(...pokemon.stats.map(stat => stat.base_stat));

	return (
	<div className="w-full bg-white p-10 pt-2 pb-10 h-3/5">
		<h2 className="mt-4 font-semibold flex-shrink">Stats:</h2>
		<ul className=" w-full bg-red">
		  {pokemon.stats
		  .filter((stat) => maxStats.has(stat.stat.name))
		  .map((stat, index) => (
		  <li key={index} className="items-center flex-shrink">
			<h3>{stat.stat.name}:</h3>
			<StatsBar
			currentValue={stat.base_stat}
			maxValue={maxStat}
			/>
		  </li>
		  ))}
		</ul>
	</div>
	);
  };




  const PokemonAbilities = ({pokemon}) => {
	console.log("from PokemonAbilities component: ", pokemon)
		fetchPokemonAbilities(pokemon);
		return (
			<div>

			</div>
		)
  }
  
  
  const InspectorHeader = ({pokemon}) => {
	const dispatch = useDispatch();
	return (
	  <div
		className="h-2/5 w-full rounded-lg" style={{background: `${getTypeColorHex(pokemon.types[0])}`}}
	  >
		<button 
				  onClick={() =>
					dispatch(setSelectedPokemon(null))
				  }
		  onClickCapture={() => setEvolutionChain(null)}
		  aria-label='close pokemon inspection card'
		  className=" text-white pt-2 pl-2 border-black"
		>
			X
		</button>
		<div className="relative flex gap-2 ml-5 mt-5 flex-col h-full w-full m-0">
			<h1 className="text-2xl text-white font-bold">{pokemon.name}</h1>
			<div>
  				{pokemon.types.map((type, index) => (
    			<button key={index} className="opacity-50 mr-2 mt-1 p-1 bg-white rounded-2xl px-2 border-2 border-black shadow-brutalism-sm">
      			{type.type.name}
    			</button>
  				))}
				</div>
		</div>
		</div>
  )
  }

  const InspectorTabs = ({setActiveTab}) => {

	return (
	  <div className="flex bg-white space-between">
		<div className="ml-10 mr-10"
		  onClick={() => setActiveTab("stats")}>Stats</div>
		<div className="ml-10 mr-10"
		  onClick={() => setActiveTab("abilites")}>abilites</div>
		<div className="ml-10 mr-10"
		onClick={() => setActiveTab("evolutions")}>Evolutions</div>
	  </div>
	);
  }
  
  const EvolutionTab = ({ pokemon , evolutionChain, loading ,pokemonlist}) => {

	const evolutionNames = getEvolutionNames(evolutionChain)
	return (
		<div className="bg-white h-3/5 w-full ">
		<h2>Evolutions:</h2>
		  {loading ? (
			  <div className="flex items-center justify-center h-full w-full">
			  <ClipLoader color="#09f" size={36} />
			</div>
		  ) : (
			  evolutionNames && pokemonlist && (
				  <div className="h-full w-full grid  grid-cols-2 grid-rows-2 p-4">
				{/* Filter the pokemonlist based on evolutionNames */}
				{pokemonlist.current
				  .filter((poke) => evolutionNames.includes(poke.name))
				  .map((poke, index) => (
					  <div className="max-h-full max-w-full">
						  {console.log(poke)}
						  <PokemonImage pokemon={poke} key={index} />
						  <p>{poke.name}</p>
					  </div>
				  ))}
			  </div>
			)
		  )}
		</div>
	  );
  
  };

  const PokemonImage = ({pokemon}) => {
	return (
			<img src={pokemon.sprites.other["official-artwork"].front_default} alt={`${pokemon.name} sprite`} className="inset-0 max-h-full bg-transparent object-contain z-50"/>
	)
  }
  
 export const InspectPokemon = ({ pokemon, pokemonlist, onClose }) => {
	const [activeTab, setActiveTab] = useState("stats");
	const [Loading, setLoading] = useState(null);
	const [evolutionChain, setEvolutionChain] = useState(null);
  
	console.log(pokemon)
	const getEvolutionChain = async () =>
	{
		if (evolutionChain)
			return ;
		setLoading(true);
		console.log("fetching evolution chain")
		const chain = await fetchEvolutionChain(pokemon);
		setEvolutionChain(chain);
		setLoading(false);
	}

	useEffect(() => {
		if (activeTab === "evolutions")
			getEvolutionChain();
	}, [activeTab]);

	return (
	  <ModalWrapper onClose={onClose}>
		  <div
			className="bg-white relative flex flex-shrink flex-col w-full overflow-hidden rounded-lg max-w-md"
			style={{
			  height: '450px',
			  width: '350px',
			  background: `${getTypeColorHex(pokemon.types[0])}`
			}}
		  >
		<HeartIcon className="h-5 w-5 absolute top-5 right-5" pokemonId={pokemon.id}/>
		  <div className="absolute mr-10  top-20 left-1/2 transform -translate-x-0">
			  <PokemonImage pokemon={pokemon} />
			</div>
		  <InspectorHeader pokemon={pokemon} />
			  {activeTab === "stats" && <PokemonStats pokemon={pokemon} />}
			  {activeTab === "abilites" && <PokemonAbilities pokemon={pokemon} />}
			  {activeTab === "evolutions" && <EvolutionTab pokemon={pokemon}evolutionChain={evolutionChain} loading={Loading} pokemonlist={pokemonlist}/>}
		  <InspectorTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
		  </div>
	  </ModalWrapper>
  
	)
  };
  
export default InspectPokemon
  



