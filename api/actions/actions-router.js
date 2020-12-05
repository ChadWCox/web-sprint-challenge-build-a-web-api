// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const actions = require('./actions-model')
const { validateAct, validateActId } = require('../middleware/middleware')


router.get('/', (req, res) => {
    actions.get()
    .then(act => {
        if (!act.length) {
        res.status(404).json([])
        } else {
        res.status(200).json(act)
        } 
    })
    .catch(err => {
    res.status(500).json({ message: err.message })
    })})

router.get('/:id', validateActId, (req, res) => {
        res.status(200).json(req.action)
});
      
router.post('/', validateAct, async (req, res) => {
    await actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json( err.message )
        })    
})
       
router.put('/:id', validateAct, validateActId, async (req, res) => {
    const changes = req.body
    const { id } = req.params
    await actions.update(id, changes)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json( err.message )})
})
       
router.delete('/:id', validateActId, async (req, res) => {
    const { id } = req.params
        await actions.remove(id)
        .then(res => {
        res.status(200).json({ message: `Action with id ${id} deleted.`})   
        }).catch(err => {
        res.status(500).json({ message: err.message })
    })})

    module.exports = router