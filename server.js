const express = require ('express');

const app = express();
const PORT = 3000;

const morgan = require('morgan')

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/pokemons', require('./routes/pokemons'));

app.listen(PORT, () =>{
    console.log('Serveur partie')
});