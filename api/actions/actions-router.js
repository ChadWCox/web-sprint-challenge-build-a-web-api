// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const actions = require('./actions-model')


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
        console.log(err)
        res.status(500).json({ message: err.message })
    })})

router.get('/:id', (req, res) => {
    const { id } = req.params
    actions.get(id)
    .then(action => {
        if (!action) {
            res.status(404).json({message: `action with id ${id} not found.`})
        } else {
        res.status(200).json(action)
        }
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })})

router.post('/', (req, res) => {
    const action  = req.body
    if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({ errorMessage: 'Project_id, description, and body are required.'} )
        }
        actions.insert(action)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })    
        })
       

router.put('/:id', (req, res) => {
    const { id } = req.params
    const body = req.body

    if (!body.project_id || !body.description || !body.notes ) {
        res.status(400).json({ message: 'Project_id, description, and body are required.'})
    } else {
        actions.update(id, body)
        .then(updatedAct => {
            res.status(200).json(updatedAct)
        }).catch(err => {
            res.status(500).json({ message: err.message })})
        }})

router.delete('/:id', (req, res) => {
    const { id } = req.params
        actions.remove(id)
        .then(res => {
        res.status(200).json({ message: `Message with id ${id} deleted.`})   
        }).catch(err => {
        res.status(500).json({ message: err.message })
    })})

    module.exports = router