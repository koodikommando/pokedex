const axios = require('axios');
const pool = require('../database/db.js'); 

// Fetch all Pokémon data
exports.getAllPokemon = async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
    const pokemonList = response.data.results;

    // for (const [index, pokemon] of pokemonList.entries()) {
    //   const queryText = 'INSERT INTO pokemon (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING';
    //   await pool.query(queryText, [index + 1, pokemon.name]); // Insert Pokémon with ID and name
    // }

    res.json(response.data);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching data from PokeAPI', error: error.message });
  }
};

// Fetch a Pokémon by name
exports.getPokemonByName = async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from PokeAPI', error: error.message });
  }
};

// Fetch species details by ID
exports.getPokemonSpecies = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from PokeAPI', error: error.message });
  }
};

// Fetch evolution chain by URL
exports.getEvolutionChain = async (req, res) => {
  const { url } = req.params;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from PokeAPI', error: error.message });
  }
};

exports.getAbilities = async (req, res) => {
  const { url } = req.params;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching abilities data from PokeAPI', error: error.message });
  }
};
