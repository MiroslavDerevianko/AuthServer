const express = require('express')
const router = express.Router()
const passport = require('../services/passport');

const db = require('../services/database');

/* POST register new user */
router.post('/register', (req, res, next) => {
    if (!req.body) {
        res.send({message: "Empty data"});
    } else {
        db.addNewUser(req.body, (err, user, info) => {
            if (err) {
                res.status(500).send("Server error");
            } else if (info) {
                res.json(info);
            } else {
                res.json({user});
            }
        })
    }
});

/* POST login user. */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            res.status(500).send("Server error");
        } else if (info) {
            res.json(info);
        } else {
            req.login(user, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Server error");
                } else {
                    res.json({user});
                }
            })
        }
    })(req, res, next);
});
/* GET user data */
router.get('/getuser', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.json({user:req.user});
    } else {
        res.status(401).send({message: "Not auth"});
    }
});
/* GET log out */
router.get('/logout', (req, res, next) => {
    req.logout();
    res.json({ message: "You log out"});
});

module.exports = router