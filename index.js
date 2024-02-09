// Github M. Ly : layely2
// Mail: abdly@groupeisi.com
var express = require('express')

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

var app = express();
const PORT = 3000;

app.use(express.json());

var etudiants = [
    {
        id: 1,
        nom: 'toto',
        prenom: 'tintin'
    },
    {
        id: 2,
        nom: 'tata',
        prenom: 'tonton'
    }
]

app.get('/api/v2/etudiants', function(req, res) {
    res.json(etudiants);
})


app.post('/api/v2/etudiant', (req, res) => {
    const etudiant = req.body;
    etudiants.push({...etudiant, id: etudiants.length + 1});
    res.status(201).send(`Étudiant ajouté avec succès.`);
});

app.get('/api/v2/etudiant/:id', (req, res) => {
    const { id } = req.params;
    const etudiant = etudiants.find(e => e.id === parseInt(id));
    if (etudiant) {
        res.json(etudiant);
    } else {
        res.status(404).send('Étudiant non trouvé');
    }
});

app.put('/api/v2/etudiant/:id', (req, res) => {
    const { id } = req.params;
    const index = etudiants.findIndex(e => e.id === parseInt(id));
    if (index !== -1) {
        etudiants[index] = { ...etudiants[index], ...req.body };
        res.send('Étudiant mis à jour avec succès.');
    } else {
        res.status(404).send('Étudiant non trouvé');
    }
});

app.delete('/api/v2/etudiant/:id', (req, res) => {
    const { id } = req.params;
    etudiants = etudiants.filter(e => e.id !== parseInt(id));
    res.send('Étudiant supprimé avec succès.');
});

app.listen(PORT, function () {
    console.log(`Started at port ${PORT}`);
})