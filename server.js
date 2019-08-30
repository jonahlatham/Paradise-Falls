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

app.get('/api/paradisefalls', (req, res, next) => {
    const db = app.get('db')
    db.get_items()
        .then((items) => {
            res.send(items)
        })
})

app.post('/api/paradisefalls', (req, res, next) => {
    const db = app.get('db')
    const { name, price, amount_saved, amount_left } = req.body
    db.insert_items({ name, price, amount_saved, amount_left })
        .then((items) => {
            res.send(items)
        })
})

///////////////////////////////////////////////////
const port = process.env.PORT || 7090
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// http://localhost:7090/api/paradisefalls
