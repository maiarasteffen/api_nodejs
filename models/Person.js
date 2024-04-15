const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    nome: String,
    sexo: String,
    data_nasc: String,
    estado_civil: String
})

module.exports = Person