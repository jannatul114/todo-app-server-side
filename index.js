
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// moddlewares
require('dotenv').config()
app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1g1im.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {


    try {
        await client.connect();
        const TaskCollection = client.db("allTasks").collection("task");

        app.post('/tasks', async (req, res) => {
            const body = req.body;
            const result = await TaskCollection.insertOne(body);
            res.send(result);
        })

        app.get('/tasks', async (req, res) => {
            const email = req.query.email;
            const query = { user: email }
            const cursor = TaskCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) }
            const cursor = await TaskCollection.findOne(quary);
            res.send(cursor);
        })

        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) }
            const result = await TaskCollection.deleteOne(quary);
            res.send(result);
        })


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