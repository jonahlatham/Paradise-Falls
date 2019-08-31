const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

massive(process.env.DATABASE_URL)
    .then((dbInstance) => {
        console.log(`DB is connected`)
        app.set('db', dbInstance)
    })
///////////////////////////////////////////////////
//Items
app.get('/api/paradisefalls', (req, res, next) => {
    const db = app.get('db')
    db.wanted_items.find()
        .then((items) => {
            res.send(items)
        })
})

app.post('/api/paradisefalls', (req, res, next) => {
    const db = app.get('db')
    const { name, price, amount_saved} = req.body
    db.wanted_items.insert({ name, price, amount_saved})
        .then((items) => {
            res.send(items)
        })
})

///////////////////////////////////////////////////
//People

app.get('/api/paridisefalls/people', (req, res, next)=>{
    const db = app.get('db')
    db.people.find()
    .then((people)=>{
        res.send(people)
    })
})

///////////////////////////////////////////////////
const port = process.env.PORT || 7070
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// http://localhost:7070/api/paradisefalls
