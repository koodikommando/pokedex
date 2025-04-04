const express = require('express');
const { likePokemon } = require('../controllers/userController.js'); 
const { dislikePokemon } = require('../controllers/userController.js'); 
const { getUserLikedPokemon } = require('../controllers/userController.js'); 
const { getUserList } = require('../controllers/userController.js'); 


const router = express.Router();

router.post('/likePokemon', likePokemon);
router.delete("/dislikePokemon", dislikePokemon);
router.get("/getUserLikedPokemon", getUserLikedPokemon);
router.get("/userList", getUserList);



module.exports = router;