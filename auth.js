const jwtSecret = 'your_jwt_secret'; //must be same key in JWTStrategy

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport'); 

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, //username encoded in the JWT
        expiresIn: '7d',
        algorithm: 'HS256' // used to sign or encode values of JWT
    });
}

//POST Login with /login
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user ) {
                return res.status(400).json ({
                    message: 'Something is not right',
                    user: user
                });
            }
            reqlogin(user, { session: false }, (error) => {
                if(error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
} 