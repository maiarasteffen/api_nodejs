const router = require('express').Router()
const Address = require('../models/Address')
const Person = require('../models/Person')

router.get('/', async (req, res) => {
    try {

        const address = await Address.find()
        res.status(200).json(address)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post('/', async (req, res) => {
    const {id_pessoa, rua, numero, cep, cidade} = req.body

    const address = {
        id_pessoa,
        rua,
        numero,
        cep,
        cidade
    }

    try {
        //Create 
        await Address.create(address)

        res.status(201).json({message: 'Endereço inserida no sistema com sucesso!'})
        return

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/pessoa=:id', async (req, res) => {
    const personId = req.params.id;

    try {
        const person = await Person.findOne({ _id: personId });

        if (!person) {
            res.status(422).json({ message: 'A pessoa não foi encontrada' });
            return;
        }

        const addresses = await Address.findOne({ id_pessoa: personId });

        if (addresses.length === 0) {
            res.status(422).json({ message: 'Nenhum endereço encontrado para esta pessoa' });
            return;
        }

        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {id_pessoa, rua, numero, cep, cidade} = req.body

    const address = {
        id_pessoa,
        rua,
        numero,
        cep,
        cidade
    }

    try {
        const updateAddress = await Address.updateOne({ _id: id }, address)

        if(updateAddress.matchedCount === 0 ) {
            res.status(422).json({message: 'O endereço não foi encontrado'})
        }

        res.status(200).json(address)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Delete - deletar dados
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const address = await Address.findOne({ _id: id })

    if(!address) {
        res.status(422).json({ message: 'O endereço não foi encontrado' })
        return
    }

    try {
        await Address.deleteOne({ _id: id })
        res.status(200).json({ message: 'Endereço excluído com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router

