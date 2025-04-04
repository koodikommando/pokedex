const initialState = {
	pokemonList: null,
	selectedPokemon: null,
	evolutionChain: null,
	loading: false,
	inspectPokemon: false,
	searchPokemon: "",
	filterPokemon: false,
	searchFilters: {
		normal: false,
		fire: false,
		water: false,
		grass: false,
		electric: false,
		ice: false,
		fighting: false,
		poison: false,
		ground: false,
		flying: false,
		psychic: false,
		bug: false,
		rock: false,
		ghost: false,
		dragon: false,
		dark: false,
		steel: false,
		fairy: false
	  },
  };
  


  const SET_POKEMON_LIST = 'SET_POKEMON_LIST';
  const SET_SELECTED_POKEMON = 'SET_SELECTED_POKEMON';
  const SET_LOADING = 'SET_LOADING';
  const SET_EVOLUTION_CHAIN = 'SET_EVOLUTION_CHAIN';
  const SET_INSPECT_POKEMON = "SET_INSPECT_POKEMON";
  const SET_SEARCH_POKEMON = "SET_SEARCH_POKEMON";
  const SET_FILTER_POKEMON = "SET_FILTER_POKEMON";
  const SET_SEARCH_FILTERS = "SET_SEARCH_FILTERS"
  
  export const pokemonReducer = (state = initialState, action) => {
	switch (action.type) {
	  case SET_POKEMON_LIST:
		return { ...state, pokemonList: action.payload };
	  case SET_SELECTED_POKEMON:
		return { ...state, selectedPokemon: action.payload };
	  case SET_LOADING:
		return { ...state, loading: action.payload };
	  case SET_EVOLUTION_CHAIN:
		return { ...state, evolutionChain: action.payload };
	case SET_INSPECT_POKEMON:
		return { ...state, inspectPokemon: action.payload} ;
	case SET_SEARCH_POKEMON:
		return { ...state, searchPokemon: action.payload} ;
	case SET_FILTER_POKEMON:
		return { ...state, filterPokemon: action.payload} ;
	case SET_SEARCH_FILTERS:
		return { ...state, searchFilters: action.payload} ;
	  default:
		return state;
	}
  };
  
  export const setPokemonList = (pokemonList) => ({
	type: SET_POKEMON_LIST,
	payload: pokemonList,
  });

  export const setSearchPokemon = (searchPokemon) => ({
	type: SET_SEARCH_POKEMON,
	payload: searchPokemon,
  });

  export const setSearchFilters = (searchFilters) => ({
	type: SET_SEARCH_FILTERS,
	payload: searchFilters,
  });

  export const setFilterPokemon = (filterPokemon) => ({
	type: SET_FILTER_POKEMON,
	payload: filterPokemon,
  });

  export const setSelectedPokemon = (pokemon) => ({
	type: SET_SELECTED_POKEMON,
	payload: pokemon,
  });
  
  export const setLoading = (loading) => ({
	type: SET_LOADING,
	payload: loading,
  });
  
  export const setEvolutionChain = (evolutionChain) => ({
	type: SET_EVOLUTION_CHAIN,
	payload: evolutionChain,
  });

  export const setInspectPokemon = (inspectPokemon) => ({
	type: SET_INSPECT_POKEMON,
	payload: inspectPokemon
  })
  
