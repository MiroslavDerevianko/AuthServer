const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./database');

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    db.getUserByEmail(email, (err, user) => {
        if (err) {
            done(err);
        } else if (user) {
            if (user.Email === email && user.Password === password) {
                done(null, user);
            } else {
                done(null, false, {message: "Wrong Email Or Password"});
            }
        } else {
            done(null, false, {message: "User not exist"});
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.Id);
});

passport.deserializeUser((id, done) => {
    db.getUserById(id, (err, user) => {
        if (err) {
            done(err);
        } else if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});

module.exports = passport;