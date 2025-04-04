
import axios from 'axios'

export const fetchEvolutionChain = async (selectedPokemon) => {
	if (!selectedPokemon) return null;
	try {
	  console.log("fetching evolution chain")
	  const url = encodeURIComponent(selectedPokemon.species.url);
	  const speciesResponse = await axios.get(`http://localhost:5001/pokeapi/species/${selectedPokemon.id}`);
	  console.log(speciesResponse.data)
	  const evolutionChainUrl = encodeURIComponent(speciesResponse.data.evolution_chain.url);
	  const evolutionChainResponse = await axios.get(`http://localhost:5001/pokeapi/evolution_chain/${evolutionChainUrl}`);
	  console.log(evolutionChainResponse.data);
	  console.log("---------")
	  return evolutionChainResponse.data;
	  //const chain = evolutionChain(evolutionChainResponse.data);
  
	}catch (error) {
	  console.error("Error fetching evolution chain:", error);
		return (null);
	}
  };


export const fetchPokemonList = async () => {

    console.log("FETCHING ALL")
    try { 
      const response = await fetch('http://localhost:5001/pokeapi/all/');
      const data = await response.json();
  
      // Step 2: Fetch detailed data for each Pokémon using Promise.all for concurrency
      const pokemonDetails = await Promise.all(
        data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
      );
	  console.log(pokemonDetails)
      return pokemonDetails;
      // Once all requests are complete, you can handle the response here
      console.log(pokemonDetails); // Assuming you're setting the detailed data
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
	  return null;
    }
  };



  export const fetchPokemonAbilities = async (pokemon) => {
	console.log("fetching pokemon abilities of: ")
	console.log(pokemon.abilities[0].ability.url)
	try {
	  const url = encodeURIComponent(pokemon.abilities[0].ability.url);
	  const response = await axios.get(`http://localhost:5001/pokeapi/abilities/${url}`);
	  console.log(response.data)
	  //const chain = evolutionChain(evolutionChainResponse.data);
  
	}catch (error) {
	  console.error("Error fetching evolution chain:", error);
		return (null);
	}
  }