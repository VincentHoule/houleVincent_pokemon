const express = require('express');
const router = express.Router();
// À ajuster selon la structure
const pokemonsController = require('../controllers/pokemons.controller');

router.get('/liste', (req, res) => {
    // ici on ne fait que lancer la bonne fonction du controlleur. L'important est que l'objet res soit 
    // utilisé dans le controller (il y a un send() de fait) 
    pokemonsController.trouverUnType(req, res);
});

router.get('/:id', (req, res) => {
    // ici on ne fait que lancer la bonne fonction du controlleur. L'important est que l'objet res soit 
    // utilisé dans le controller (il y a un send() de fait) 
    pokemonsController.trouverUnPokemon(req, res);
});

router.post('/', (req, res) => {
    
    pokemonsController.ajouterUnPokemon(req, res);
});

router.put('/:id', (req, res) => {
    
    pokemonsController.modifierUnPokemon(req, res);
});

router.delete('/:id', (req, res) => {
    
    pokemonsController.supprimerUnPokemon(req, res);
})
module.exports = router;