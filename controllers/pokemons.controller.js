const Pokemons = require("../models/pokemons.model.js");

exports.trouverUnPokemon = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if (!req.params.id || parseInt(req.params.id) <= 0) {
        res.status(400);
        res.send({
            message: "L'id du pokemon est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    // Appel à la fonction trouverUnpokemon dans le modèle
    Pokemons.trouverUnPokemon(req.params.id)
        // Si c'est un succès
        .then((Pokemons) => {
            // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
            if (!Pokemons[0]) {
                res.status(404);
                res.send({
                    message: `pokemon introuvable avec l'id ${req.params.id}`
                });
                return;
            }
            // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un pokemon par id
            res.send(Pokemons[0]);
        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la récupération du pokemon avec l'id " + req.params.id
            });
        });
};

exports.trouverUnType = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if (!req.query.type || parseInt(req.query.type) == "") {
        res.status(400);
        res.send({
            message: "Le type ne doit pas être vide"
        });
        return;
    }

    // Appel à la fonction trouverUnType dans le modèle
    Pokemons.trouverUnType(req.query.type)
        // Si c'est un succès
        .then((Pokemons) => {
            // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
            if (!Pokemons[0]) {
                res.status(404);
                res.send({
                    message: `pokemon introuvable ${req.query.type}`
                });
                return;
            }
            // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un pokemon par id
            res.send({
                Pokemons: Pokemons.slice(req.query.page * 25 - 25, req.query.page * 25),
                type: req.query.type,
                Nombre_de_Pokemons: Pokemons.length,
                page: req.query.page,
                Nombre_de_pages: Math.ceil(Pokemons.length / 25)
            });

        })
        // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la récupération du pokemon avec le type" + req.query.type
            });
        });
};

exports.ajouterUnPokemon = (req, res) => {

    var message = "";
    if (!req.body.nom || (req.body.nom.length <= 0 && req.body.nom.length > 100)) {
        message += "Le nom est vide ou manquant ";
    }
    if (!req.body.type_primaire || (req.body.type_primaire.length <= 0 && req.body.type_primaire.length > 100)) {
        message += "Le type primaire est vide ou manquant ";
    }
    if (!req.body.pv || parseInt(req.body.pv) < 0) {
        message += "Les pv est vide ou invalide ";
    }
    if (!req.body.attaque || parseInt(req.body.attaque) < 0) {
        message += "L'attaque est vide ou invalide ";
    }
    if (!req.body.defense || parseInt(req.body.defense) < 0) {
        message += "La defense est vide ou invalide ";
    }

    if (req.body.type_secondaire) {
        if (req.body.type_secondaire.length <= 0 && req.body.type_secondaire.length > 100) {
            message += "Le type secondaire est vide ou manquant ";
        }
    }
    else {
        type_secondaire = "";
    }
    if (message != "") {
        res.status(404);
        res.send({ message: `${message}` });
        return;
    }

    Pokemons.ajouterUnPokemon(req.body.nom, req.body.type_primaire, type_secondaire,
        req.body.pv, req.body.attaque, req.body.defense)
        .then(() => {
            // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404

            res.send(req.body);
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500);
            res.send({
                message: "Erreur lors de l'insertion"
            });
        });


};

