
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


// moddlewares
require('dotenv').config()
app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1g1im.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

    }

    finally {

    }

}


run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('hello todo app!')
})

app.listen(port, () => {
    console.log(`todo app is listining ${port}`)
})