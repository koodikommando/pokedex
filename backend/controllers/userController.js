const axios = require('axios');
const pool = require('../database/db.js');  


// Like a Pokémon
exports.likePokemon = async (req, res) => {
  console.log("Request received at backend");
  const { userId, pokemonId } = req.body; // Get user ID and Pokémon ID from the request body
  console.log(userId, pokemonId);

  try {
    const queryText = "INSERT INTO user_likes (user_id, pokemon_id) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(queryText, [userId, pokemonId]);
    console.log("Like saved to database:", result.rows[0]);
    res.status(201).json({ message: "Pokémon liked successfully", like: result.rows[0] });
  } catch (error) {
    //console.error(error.message);

    // Handle unique constraint violations (if a user tries to like the same Pokémon again)
    if (error.code === '23505') { // Postgres error code for unique constraint violation
      return res.status(409).json({ message: "You have already liked this Pokémon." });
    }

    res.status(500).json({ message: 'Error saving like to the database', error: error.message });
  }
};

exports.getUserLikedPokemon = async (req, res) => {
	console.log("fetching usert liked pokemon")
    const { userId } = req.query; // Accessing userId from query parameters

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const result = await pool.query(
            `
            SELECT p.id, p.name
            FROM user_likes ul
            JOIN pokemon p ON ul.pokemon_id = p.id
            WHERE ul.user_id = $1
            ORDER BY ul.liked_at DESC;
            `,
            [userId]
        );

        if (result.rows.length > 0) {
            res.status(200).json(result.rows); // Send back the liked Pokémon
        } else {
            res.status(404).json({ message: "No liked Pokémon found." });
        }
    } catch (error) {
        console.error("Error fetching liked Pokémon:", error);
        res.status(500).json({ error: "Failed to fetch liked Pokémon" });
    }
};




  exports.dislikePokemon = async (req, res) => {
	console.log("Request received to dislike Pokémon");
	const { userId, pokemonId } = req.body; // Get user ID and Pokémon ID from the request body
	console.log(userId, pokemonId);
  
	try {
	  const queryText = "DELETE FROM user_likes WHERE user_id = $1 AND pokemon_id = $2 RETURNING *";
	  const result = await pool.query(queryText, [userId, pokemonId]);
  
	  if (result.rowCount === 0) {
		return res.status(404).json({ message: "Like not found. The Pokémon was not liked by the user." });
	  }
  
	  console.log("Dislike saved to database:", result.rows[0]);
	  res.status(200).json({ message: "Pokémon disliked successfully", dislike: result.rows[0] });
	} catch (error) {
	  console.error("Error disliking Pokémon:", error.message);
	  res.status(500).json({ message: 'Error removing like from the database', error: error.message });
	}
  };
  

  exports.getUserList = async (req, res) => {
	try {
	  const queryText = 'SELECT id, username, email, profile_picture, created_at FROM users';
	  const result = await pool.query(queryText);
	  res.status(200).json(result.rows); // Return all users as JSON
	} catch (error) {
	  console.error('Error fetching users:', error.message);
	  res.status(500).json({ message: 'Error fetching users' });
	}
  };