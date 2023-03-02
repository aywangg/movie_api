const express = require('express'),
    //Morgan middlewar
    morgan = require('morgan');

const app = express();

let topMovies = [
    {
        title: 'Hacksaw Ridge',
        director: 'Mel Gibson'
    },
    {
        title: 'Fury',
        director: 'David Ayer'
    },
    {
        title: 'Midway',
        director: 'Roland Emmerich'
    },
    {
        title: 'Dunkirk',
        director: 'Christopher Nolan'
    },
    {
        title: 'Greyhound',
        director: 'Aaron Schneider'
    },
    {
        title: 'The Imitation Game',
        director: 'Morten Tyldum'
    },
    {
        title: 'Saving Private Ryan',
        director: 'Steven Spielberg'
    },
    {
        title: 'Letters From Iwo Jima',
        director: 'Clint Eastwood'
    },
    {
        title: 'Valkyrie',
        director: 'Bryan Singer'
    },
    {
        title: 'Flags of Our Fathers',
        director: 'Clint Eastwood'
    }
];

//invoke Morgan middleware function
app.use(morgan('common'));

//GET requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

//shorthand for app.use('/', express.static('public'))
app.use(express.static('public'));