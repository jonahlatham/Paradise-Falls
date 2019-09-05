const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const bcrypt = require('bcrypt')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

massive(process.env.DATABASE_URL)
    .then((dbInstance) => {
        console.log(`DB is connected`)
        app.set('db', dbInstance)
    })

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        //days hours minutes seconds milseconds
        expires: 5 * 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}))
///////////////////////////////////////////////////
//Items


//middleware
app.use('/api/*', (req, res, next) => {
    if (!req.session.user) {
        res.send({ success: false, message: 'Please login.' })
    } else {
        next()
    }
})

app.get('/auth/user', (req, res, next) => {
    // check to see if user is in session
    if (req.session.user) {
        res.send({ success: true, user: req.session.user })
    } else {
        res.send({ success: false })
    }
})

app.delete('/auth/user', (req, res, next) => {
    // this destroys the session and removes the user object
    //aka logs you out
    req.session.destroy()
    res.send({ success: true })
})

app.post('/auth/login', (req, res, next) => {
    //get the db context
    const db = app.get('db');
    //get stuff off of the body that will be sent from the user
    const { email, password } = req.body
    // variable to catch login user
    let catchUser = {}
    //check if email matches/exists
    db.people.findOne({ email })
        .then((user) => {
            if (!user) {
                // throw error if user already exists
                throw 'We could not find a user for this email. Please rgister.'
            } else {
                // compare password
                catchUser = user;
                return bcrypt.compare(password, user.password)
            }
        })
        .then((isMatch) => {
            // handle bad password
            if (!isMatch) {
                throw (`Your credentials don't match our records.`)
            }
            // prepare user for frontend
            delete catchUser.password
            req.session.user = catchUser;
            res.send({ success: true, catchUser })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

app.post('/auth/register', (req, res, next) => {
    //get the db context
    const db = app.get('db');
    //get stuff off of the body that will be sent from the user
    const { email, password, first_name, last_name } = req.body
    //check if user already exists in the db by their email
    db.people.findOne({ email })
        .then((user) => {
            if (user) {
                // throw error if user already exists
                throw 'This email is already in use, please login.'
            } else {
                // encrypt password
                return bcrypt.hash(password, 10)
            }
        })
        .then((hash) => {
            // add user to database
            return db.people.insert({ email, password: hash, first_name, last_name })
        })
        .then((user) => {
            // prepare user to be sent to the frontend and add user data to the session
            delete user.password
            req.session.user = user;
            res.send({ success: true, user })
        })
        .catch((err) => {
            res.send({ success: false, err })
        })
})

app.get('/api/paradisefalls', (req, res, next) => {
    const db = app.get('db')
    db.get.get_items({ people_id: req.session.user.id })
        .then((items) => {
            res.send(items)
        })
})

app.post('/api/paradisefalls', (req, res, next) => {
    const db = app.get('db')
    const { name, price, amount_saved } = req.body
    db.wanted_items.insert({ name, price, people_id: req.session.user.id, amount_saved })
        .then((items) => {
            res.send(items)
        })
})

app.put('/api/paradisefalls', (req, res, next) => {
    // const db = app.get('db')
    // const { amount_saved } = req.body
    // db.wanted_items.insert({ name, price, people_id, amount_saved: req.body })
    //     .then((items) => {
    //         res.send(items)
    //     })
})

///////////////////////////////////////////////////
//People

app.get('/api/paradisefalls/people', (req, res, next) => {
    const db = app.get('db')
    db.people.find()
        .then((people) => {
            res.send(people)
        })
})

///////////////////////////////////////////////////
const port = process.env.PORT || 7070
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// http://localhost:7070/api/paradisefalls
