// À ajuster selon la structure
const sql = require("../config/db.js");

// constructeur
const Pokemons = (pokemons) => {
    this.nom = pokemons.nom;
    this.type_primaire = pokemons.type_primaire;
    this.type_secondaire = pokemons.type_secondaire;
    this.pv = pokemons.pv;
    this.attaque = pokemons.attaque;
    this.defense = pokemons.defense;
};

Pokemons.trouverUnPokemon = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon WHERE id = ?;`;
        const params = [id]

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });
};

Pokemons.trouverUnType = (type) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT nom, type_primaire, type_secondaire, pv, attaque, defense 
        FROM pokemon WHERE type_primaire = ? OR type_secondaire = ?;`;
        const params = [type, type];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });

}

Pokemons.ajouterUnPokemon = (nom, type_primaire, type_secondaire, pv, attaque, defense) => {
    return new Promise((resolve, reject) => {

        const requete = `INSERT INTO pokemon (nom, type_primaire, type_secondaire, pv, attaque, defense) 
        VALUES (?, ?, ?, ?, ?, ?); `;
        const params = [nom, type_primaire, type_secondaire, pv, attaque, defense]

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        })
    });

}

module.exports = Pokemons;