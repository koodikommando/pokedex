const express = require('express');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemonRoutes'); // Import routes
// const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')
const pool = require('./database/db.js');  


  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Database connected:', res.rows);
    }
});

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/pokeapi', pokemonRoutes);
// app.use('/auth', authRoutes);
app.use('/user', userRoutes);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
