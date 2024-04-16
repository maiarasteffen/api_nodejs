const mongoose = require('mongoose')

const Address = mongoose.model('Address', {
    id_pessoa: String,
    rua: String,
    numero: String,
    cep: String,
    cidade: String
})

module.exports = Address