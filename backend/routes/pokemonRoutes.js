const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/all', pokemonController.getAllPokemon);
router.get('/:name', pokemonController.getPokemonByName);
router.get('/species/:id', pokemonController.getPokemonSpecies);
router.get('/evolution_chain/:url', pokemonController.getEvolutionChain);
router.get('/abilities/:url', pokemonController.getAbilities);

module.exports = router;
