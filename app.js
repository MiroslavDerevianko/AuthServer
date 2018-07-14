const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// import cors
const cors = require('cors')

// import express-session
const session =  require('express-session')

// import express-mysql-session
const MySQLStore = require('express-mysql-session')(session)

// import DataBase
const db = require('./services/database')

// import configuration
const sessionConf = require('./configures/sessionconf')
const databaseConf = require('./configures/databseconf')

// import passport
const passport = require('./services/passport')

// import routes
const users = require('./routes/users')
const auth = require('./routes/auth')

const app = express()

// create mysql connection
const connection = db.getConnection()
const store = new MySQLStore({}, connection)

// If prod mode set trust proxy and secure cookie
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionConf.cookie.secure = true // serve secure cookies
}
// set config store
sessionConf.store = store;

// Use session in app
app.use(session(sessionConf))

// Use passport in app
app.use(passport.initialize())
app.use(passport.session())

// Use cors in app
app.use(cors({
    origin: 'localhost'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// conect routers
app.use('/api/v1/users', users)
app.use('/api/v1/auth', auth)

module.exports = app