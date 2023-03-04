const express = require('express'),
    app = express(),
    //Morgan middlewar
    morgan = require('morgan'),
    //uuid module
    uuid = require('uuid'),
    bodyParser = require('body-parser');

app.use(bodyParser.json());

//2 example users
let users = [
    {
        id: 1,
        name: "Zack",
        favoriteMovies:[]
    },
    {
        id: 1,
        name: "Dylan",
        favoriteMovies: ["Avengers: Infinity War"]
    },
];

//3 movies with dsx, genres, directors, etc
let movies = [
    {
        "Title": "12 Strong",
        "Description": "In the wake of the September 11 attacks, Captain Mitch Nelson leads a US Special Forces team into Afghanistan for an extremely dangerous mission. Once there, the soldiers develop an uneasy partnership with the Northern Alliance to take down the Taliban and its al-Qaida allies. Outgunned and outnumbered, Nelson and his forces face overwhelming odds in a fight against a ruthless enemy that takes no prisoners.",
        "Genre": {
            "Name": "Action",
            "Description": "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."
        },
        "Director": {
            "Name": "Nicolai Fuglsig",
            "Bio": "Nicolai Fuglsig is a Danish film director and photojournalist. He graduated from the Danish School of Journalism. In 1999, his book on an untold nuclear disaster won the ICP Infinity Award in New York City and the World Press Photo First Prize, as well as the Kodak prize for Best Photographer Under 30.",
            "Birth": "1972 Helsingor, Denmark"
        },
        "ImageURL": "https://www2.pictures.gi.zimbio.com/60th+Annual+DGA+Awards+Press+Room+IbIk9KmbnE_x.jpg",
        "Featured":true
    },
    {
        "Title": "13 Hours",
        "Description": "On Sept. 11, 2012, Islamic militants attack the U.S. Consulate in Benghazi, Libya, killing Ambassador J. Christopher Stevens and Sean Smith, an officer for the Foreign Service. Stationed less than one mile away are members of the Annex Security Team, former soldiers assigned to protect operatives and diplomats in the city. As the assault rages on, the six men engage the combatants in a fierce firefight to save the lives of the remaining Americans.",
        "Genre": {
            "Name": "Action",
            "Description": "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."
        },
        "Director": {
            "Name": "Michael Bay",
            "Bio": "Michael Benjamin Bay is an American film director and producer. He is best known for directing high-budget action films characterized by fast edits, polished visuals and substantial use of practical effects.",
            "Birth": "1965 Los Angeles, California"
        },
        "ImageURL": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F13%2FMichael-Bay-Pigeon-Italy-01-011223.jpg",
        "Featured":true
    },
    {
        "Title": "American Sniper",
        "Description": "Navy S.E.A.L. sniper Chris Kyle's pinpoint accuracy saves countless lives on the battlefield and turns him into a legend. Back home with his family after four tours of duty, however, Chris finds that it is the war he can't leave behind.",
        "Genre": {
            "Name": "War",
            "Description": "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama."
        },
        "Director": {
            "Name": "Clint Eastwood",
            "Bio": "Clinton Eastwood Jr. is an American actor and film director. After achieving success in the Western TV series Rawhide, he rose to international fame with his role as the 'Man with No Name' in Sergio Leone's 'Dollars Trilogy' of Spaghetti Westerns during the mid-1960s and as antihero cop Harry Callahan in the five Dirty Harry films throughout the 1970s and 1980s.",
            "Birth": "1930 San Francisco, California"
        },
        "ImageURL": "",
        "Featured":true
    },
];

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

//CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
});

//UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
});

//CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    
    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send;
    } else {
        res.status(400).send('no such user')
    }
});

//DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    
    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send;
    } else {
        res.status(400).send('no such user')
    }
});

//READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

//READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
});

//READ
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genres;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
});

//READ
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
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