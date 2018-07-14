const express = require('express')
const router = express.Router()

const db = require('../services/database');
/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log(req.session)
  db.getUserById(1, (err, user) => {
    if (err){
      console.log(err);
      res.status(500).json({ message: "Server problem"});
    } else if (user) {
      req.session.userId = user.Id;
      res.json({user});
    } else {
      res.json({ message: "User not found"});
    }
  })
  //res.json({users: [{name: 'Timmy'}]})
})

module.exports = router
