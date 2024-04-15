// Configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')

// Forma de ler JSON / middlewares
app.use(
    express.urlencoded( {
        extended: true,
    }),
)

app.use(express.json())

//Rota da API
const personRoutes = require('./routes/routesPerson')

app.use('/person', personRoutes)
// Rota inicial / endpoint

app.get('/', (req, res) => {
    //Mostrar requisição

    res.json({message: 'Oi Express'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

// Entregar uma porta
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.bef4tsu.mongodb.net/bancodaapi?retryWrites=true&w=majority&appName=Cluster0`
)
.then(() => {
    console.log('Conectamos com MongoDb!')
    app.listen(process.env.PORT)
})
.catch((err) => console.log(err))