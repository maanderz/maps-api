require('dotenv').config()

const express = require("express");
const bodyParser= require('body-parser');
const app = express();
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

let corsOptions = {
    origin: ['http://localhost:3000', 'https://cocky-brahmagupta-306473.netlify.app'],
    credentials: true
}
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log('listening on 3000')
});

MongoClient.connect(process.env.CONNECTION, {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('database');
    const collection = db.collection('addresses')

    app.post('/', (req, res) => {
        console.log(req.body)
        collection.insertOne(req.body)
        .then(result => {
            console.log(result)
        }).catch(error => console.log(error))
    })

    app.get('/', (req, res) => {
        db.collection('addresses').find().toArray()
            .then(results => res.send(results))
            .catch(err => console.log(err))
    });
    
})