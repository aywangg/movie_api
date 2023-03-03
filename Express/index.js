const express = require('express'),
    app = express(),
    //Morgan middlewar
    morgan = require('morgan'),
    //uuid module
    uuid = require('uuid'),
    bodyParser = require('body-parser');

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Zack",
        favoriteMovies:["Top Gun"]
    },
    {
        id: 1,
        name: "Dylan",
        favoriteMovies: ["Avengers: Infinity War"]
    },
];

let movies = [];

//top 10 movies
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

//READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

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

app.listen(8080, () => 
    console.log('Your app is listening on port 8080.')
);