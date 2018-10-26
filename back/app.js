// Imports de nos modules
const tickets = require('./tickets.mock');
const utils = require('./utils');

// Librairies
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json()); // bodyParser() est obsolète depuis express 4

app.get('/tickets', (req, res) => {
    // res.json permet de notifier le client que le retour est de type "application/json"
    res.json(utils.formatSuccessResponse(tickets));
});

app.get('/tickets/:id', (req, res) => {
    let id = +req.params.id;

    let indexToFind = false;
    tickets.forEach((tick, index) => {
        if (tick.id === id) {
            indexToFind = index;
        }
    });

    res.json(utils.formatSuccessResponse(tickets[id]));

})
app.post('/tickets', (req, res) => {
    let {name, description, expiration, nbLefts, urlImage} = req.body; // Destructuration objet

    if (!(name && description && expiration && nbLefts && urlImage)) {
        throw new Error('Une information est manquante');
    }

    let newId = new Date().getUTCMilliseconds();
    let newTicket = {
        id: newId,
        ...req.body // Logique spread apparu en ES6
    };

    tickets.push(newTicket);

    res.json(utils.formatSuccessResponse(true));
});

app.put('/tickets/:id', (req, res) => {
    let id = +req.params.id;
    let {name, description, expiration, nbLefts, urlImage} = req.body;

    let indexToFind = false;
    tickets.forEach((tick, index) => {
        if (tick.id === id) {
            indexToFind = index;
        }
    });

    let updateTickets = {
        ...tickets[indexToFind],
        ...req.body
    };

    tickets[indexToFind] = updateTickets;

    res.json(utils.formatSuccessResponse(tickets[indexToFind]));
})

app.delete('/tickets/:id', (req, res) => {
    let id = +req.params.id; // Le + avant permet de convertir une chaine de caractère en number

    if (id === undefined) {
        throw new Error('Un paramètre est manquant !');
    }

    let indexToFind = false;
    tickets.forEach((tick, index) => {
        if (tick.id === id) {
            indexToFind = index;
        }
    });

    if (indexToFind === false) { // Triple égal et non pas double car sinon 0 serait considéré comme false
        throw new Error('Element introuvable');
    }

    // On retire l'élément avec splice en supprimant 1 élément à partir de l'index trouvé
    tickets.splice(indexToFind, 1);

    res.json(utils.formatSuccessResponse(true));
});

// GESTION DES ERREURS (4 paramètres)
app.use(function (err, req, res, next) {
    let message = err.message;

    res.json(utils.formatFailResponse(message));
});

// L'api écoute sur le port 3000
app.listen(3000);
