//importing all local packages needed
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
//requring Mongoose package and models.js file
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//invoke Morgan middleware function
app.use(morgan('common'));

//shorthand for app.use('/', express.static('public'))
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { check, validationResult } = require('express-validator');

const cors = require('cors');
app.use(cors());
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

//integrating REST API and db
//mongoose.connect('mongodb://127.0.0.1:27017/test', {
mongoose.connect(process.env.CONNECTION_URI, 
{
  useNewUrlParser: true, useUnifiedTopology: true
});

//users
let users = [
    {
        Username: "zackm2",
        Password: "password123",
        Email: "newemail20@yahoo.com",
        Birthday: 1998-09-10
    },
    {
        Username: "ricardofresh",
        Password: "pwpwpw",
        Email: "freshrico@gmail.com",
        Birthday: 1983-05-01
    },
    {
        Username: "hayjosh",
        Password: "xyzxyz123",
        Email: "jooshhay@gmail.com",
        Birthday: 1998-12-20
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
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BNTEzMjk3NzkxMV5BMl5BanBnXkFtZTgwNjY2NDczNDM@._V1_.jpg",
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
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BYjY0OWVjMGQtNTIzZi00OGU5LWI4N2EtMGU0YzQ4OWM4ZmVhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
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
        "ImageURL": "https://upload.wikimedia.org/wikipedia/en/8/87/Letters_from_Iwo_Jima.jpg",
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

//READ welcome message CHECKED
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

//CREATE a new user CHECKED
app.post('/users',
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  let hashedPassword = Users.hashPassword(req.body.Password);  
  Users.findOne({ Username: req.body.Username })
      .then((users) => {
        if (users) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users.create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((users) =>{res.status(201).json(users) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

//UPDATE username of one user
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, 
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

//DELETE user by username CHECKED
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//READ all users CHECKED
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//READ specific user by username CHECKED
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// CREATE a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $push: { FavoriteMovies: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

//DELETE fav movie by username
app.delete('/users/:Username/movies/:MovieID',passport.authenticate('jwt', { session: false }), (req, res) => {
       Users.findOneAndUpdate(
          { Username: req.params.Username },
          { $pull: { FavoriteMovies: req.params.FavoriteMovies } },
          { new: true},
          (err, updatedUser) => {
             if (err) {
                console.error(err);
                res.status(500).send("Error: " + err);
             } else {
                res.status(200).json(updatedUser);
             }
          }
       );
    }
 );

//READ all movies CHECKED
app.get('/movies', //passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

//READ movie by movie title CHECKED
app.get('/movies/:Title',passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

//READ genre by genre name CHECKED
app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name })
    .then((movies) => {
      res.send(movies.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//READ director by director name
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.directorName })
    .then((movies) => {
      res.send(movies.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});