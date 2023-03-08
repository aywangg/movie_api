const express = require('express'),
    app = express(),
    //Morgan middlewar
    morgan = require('morgan'),
    //uuid module
    uuid = require('uuid'),
    bodyParser = require('body-parser'),
    //requring Mongoose package and models.js file
    mongoose = require('mongoose'),
    Models = require('./models.js')
    Movies = Models.Movie,
    Users = Models.User,
    Genres = Models.Genre,
    Directors = Models.Director;

app.use(bodyParser.json());

//integrating REST API and db
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

//users
let users = [
    {
        Username: "zackm2",
        Password: "password123",
        Email: "newemail20@yahoo.com",
        Birthday: 1998-09-10
        favoriteMovies:[]
    },
    {
        Username: "ricardofresh",
        Password: "pwpwpw",
        Email: "freshrico@gmail.com",
        Birthday: 1983-05-01
        favoriteMovies:[]
    },
    {
        Username: "hayjosh",
        Password: "xyzxyz123",
        Email: "jooshhay@gmail.com",
        Birthday: 1998-12-20
        favoriteMovies:[]
    }
];

//movies with dsx, genres, directors, etc
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
            "Birth": "1972"
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
            "Birth": "1965"
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
            "Birth": "1930"
        },
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BMTkxNzI3ODI4Nl5BMl5BanBnXkFtZTgwMjkwMjY4MjE@._V1_.jpg",
        "Featured":true
    },
    {
        "Title": "Letters from Iwo Jima",
        "Description": "Long-buried missives from the island reveal the stories of the Japanese troops who fought and died there during World War II.",
        "Genre": {
            "Name": "War",
            "Description": "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama."
        },
        "Director": {
            "Name": "Clint Eastwood",
            "Bio": "Clinton Eastwood Jr. is an American actor and film director. After achieving success in the Western TV series Rawhide, he rose to international fame with his role as the 'Man with No Name' in Sergio Leone's 'Dollars Trilogy' of Spaghetti Westerns during the mid-1960s and as antihero cop Harry Callahan in the five Dirty Harry films throughout the 1970s and 1980s.",
            "Birth": "1930"
        },
        "ImageURL": "https://m.media-https://img.hulu.com/user/v3/artwork/3d1c37d7-6f26-4100-8f19-6e74d0fa6edd?base_image_bucket_name=image_manager&base_image=9b7af329-349d-4822-b603-f920b4b989f0&size=1200x630&format=jpeg&operations=%5B%7B%22gradient_vector%22%3A%22(0%2C0%2C0%2C0.5)%7C(0%2C0%2C0%2C0)%7C(0%2C600)%7C(0%2C240)%22%7D%2C%7B%22overlay%22%3A%7B%22position%22%3A%22SouthEast%7C(30%2C30)%22%2C%22operations%22%3A%5B%7B%22image%22%3A%22image_manager%7Ca82a93a7-1db2-4727-b79d-f1475dde344b%22%7D%2C%7B%22resize%22%3A%22204x204%7Cmax%22%7D%2C%7B%22extent%22%3A%22204x204%22%7D%5D%7D%7D%2C%5D.com/images/M/MV5BMTkxNzI3ODI4Nl5BMl5BanBnXkFtZTgwMjkwMjY4MjE@._V1_.jpg",
        "Featured":true
    },
    {
        "Title": "Flags of Our Fathers",
        "Description": "In February and March of 1945, U.S. troops fight and win one of the most crucial and costly battles of the war on the island of Iwo Jima. A photo of U.S. servicemen raising the flag on Mount Suribachi becomes an iconic symbol of victory to a war-weary nation. The individuals themselves become heroes, though not all survive the war and realize it.",
        "Genre": {
            "Name": "War",
            "Description": "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama."
        },
        "Director": {
            "Name": "Clint Eastwood",
            "Bio": "Clinton Eastwood Jr. is an American actor and film director. After achieving success in the Western TV series Rawhide, he rose to international fame with his role as the 'Man with No Name' in Sergio Leone's 'Dollars Trilogy' of Spaghetti Westerns during the mid-1960s and as antihero cop Harry Callahan in the five Dirty Harry films throughout the 1970s and 1980s.",
            "Birth": "1930"
        },
        "ImageURL": "https://image.tmdb.org/t/p/w500/bJ4h4TY6IOPpgZh9wtbPOgYrh4.jpg",
        "Featured":true
    },
    {
        "Title": "Hacksaw Ridge",
        "Description": "The true story of Pfc. Desmond T. Doss (Andrew Garfield), who won the Congressional Medal of Honor despite refusing to bear arms during WWII on religious grounds. Doss was drafted and ostracized by fellow soldiers for his pacifist stance but went on to earn respect and adoration for his bravery, selflessness and compassion after he risked his life -- without firing a shot -- to save 75 men in the Battle of Okinawa.",
        "Genre": {
            "Name": "War",
            "Description": "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama."
        },
        "Director": {
            "Name": "Mel Gibson",
            "Bio": "Mel Columcille Gerard Gibson, (born January 3, 1956, Peekskill, New York, U.S.), American-born Australian actor who became an international star with a series of action-adventure films in the 1980s and later earned acclaim as a director and producer.",
            "Birth": "1956"
        },
        "ImageURL": "https://img3.hulu.com/user/v3/artwork/c966e511-edbd-4f3b-929f-70c2fdb052f2?base_image_bucket_name=image_manager&base_image=ef02dd84-4c3c-4976-8bd6-0466b87b70cf&region=US&format=jpeg&size=952x536",
        "Featured":true
    },
    {
        "Title": "Fury",
        "Description": "In April 1945, the Allies are making their final push in the European theater. A battle-hardened Army sergeant named Don 'Wardaddy' Collier, leading a Sherman tank and a five-man crew, undertakes a deadly mission behind enemy lines. Hopelessly outnumbered, outgunned and saddled with an inexperienced soldier in their midst, Wardaddy and his men face overwhelming odds as they move to strike at the heart of Nazi Germany.",
        "Genre": {
            "Name": "Action",
            "Description": "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."
        },
        "Director": {
            "Name": "David Ayer",
            "Bio": "David Ayer is an American filmmaker known for making crime films that are set in Los Angeles and deal with gangs and police corruption.",
            "Birth": "1968"
        },
        "ImageURL": "https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/title-key-art/furty_onesheet_1400x2100.png?itok=h-B-1RCp",
        "Featured":true
    },
    {
        "Title": "Midway",
        "Description": "On Dec. 7, 1941, Japanese forces launch a devastating attack on Pearl Harbor, the U.S. naval base in Hawaii. Six months later, the Battle of Midway commences on June 4, 1942, as the Japanese navy once again plans a strike against American ships in the Pacific. For the next three days, the U.S. Navy and a squad of brave fighter pilots engage the enemy in one of the most important and decisive battles of World War II.",
        "Genre": {
            "Name": "War",
            "Description": "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama."
        },
        "Director": {
            "Name": "Roland Emmerich",
            "Bio": "Roland Emmerich is a German film director, screenwriter, and producer. He is widely known for his science fiction and disaster films and has been called a 'master of disaster' within the industry.",
            "Birth": "1955"
        },
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BNzQ2MGM0YjUtOWIxZC00YTI3LTgwNGUtMDFiYjAyMGYxNTNkXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
        "Featured":true
    },
    {
        "Title": "Dunkirk",
        "Description": "In May 1940, Germany advanced into France, trapping Allied troops on the beaches of Dunkirk. Under air and ground cover from British and French forces, troops were slowly and methodically evacuated from the beach using every serviceable naval and civilian vessel that could be found. At the end of this heroic mission, 330,000 French, British, Belgian and Dutch soldiers were safely evacuated.",
        "Genre": {
            "Name": "War",
            "Description": "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama."
        },
        "Director": {
            "Name": "Christopher Nolan",
            "Bio": "Christopher Edward Nolan CBE is a British-American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century.",
            "Birth": "1970"
        },
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BMmE0ZmUzYzUtMzE5Ni00OGM4LWJhMjEtOWZmYWQwYzA5NDM5XkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_.jpg",
        "Featured":true
    },
    {
        "Title": "The Imitation Game",
        "Description": "In 1939, newly created British intelligence agency MI6 recruits Cambridge mathematics alumnus Alan Turing (Benedict Cumberbatch) to crack Nazi codes, including Enigma -- which cryptanalysts had thought unbreakable. Turing's team, including Joan Clarke, analyze Enigma messages while he builds a machine to decipher them. Turing and team finally succeed and become heroes, but in 1952, the quiet genius encounters disgrace when authorities reveal he is gay and send him to prison.",
        "Genre": {
            "Name": "Drama",
            "Description": "Drama film is a genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well."
        },
        "Director": {
            "Name": "Morten Tyldum",
            "Bio": "Morten Tyldumis a Norwegian film director best known in his native Norway for directing the thriller film Headhunters (2011), based on the novel by Jo Nesbø, and internationally for directing the historical drama The Imitation Game (2014), for which he was nominated for the Academy Award for Best Director, and the science fiction drama Passengers (2016).",
            "Birth": "1967"
        },
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BOTgwMzFiMWYtZDhlNS00ODNkLWJiODAtZDVhNzgyNzJhYjQ4L2ltYWdlXkEyXkFqcGdeQXVyNzEzOTYxNTQ@._V1_.jpg",
        "Featured":true
    },
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
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
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
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
});

//DELETE
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    
    let user = users.find( user => user.id == id );

    if (user) {
        user = users.filter( user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
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