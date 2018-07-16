const express = require('express')
const router = express.Router()
const path = require('path')
/* GET index html */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(`${__dirname}/../public/index.html`))
})

module.exports = router
