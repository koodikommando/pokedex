-- users table
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  profile_picture VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- pokemon table
CREATE TABLE pokemon (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- likes table
CREATE TABLE user_likes (
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  pokemon_id INT REFERENCES pokemon(id) ON DELETE CASCADE,
  liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, pokemon_id)
);