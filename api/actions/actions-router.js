// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const actions = require('./actions-model')
const projects = require('../projects/projects-model')


router.get('/', (req, res) => {
        actions.get()
        .then(act => {
            if (!act.length) {
            res.status(404).json({message: 'Actions not found'})
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
        if (!action.length) {
            res.status(404).json({message: `action with id ${id} not found.`})
        } else {
        res.status(200).json(action)
        }
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })})

router.post('/', (req, res) => {
    const body = req.body
    const { id } = req.body.project_id
     
        projects.get(id).then(project => {
            if (!project.length) {
                res.status(404).json({ message: `Project with ID ${id} not found.`})
            } else if (!id || !body.discription || !body.notes) {
                res.status(400).json({message: 'Project_id, description, and notes are required'})
            } else {
                actions.insert(body)
                res.status(200).json(body)
            }
        }).catch(err => {
            res.status(500).json({ message: err.message })
        })})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const body = req.body

    projects.get(id).then(project => {
        if (!project.length) {
            res.status(404).json({ message: `Project with ID ${id} not found.`})
        } else if (!body.project_id || !body.discription || !body.notes) {
            res.status(400).json({message: 'Project_id, description, and notes are required'})
        } else {
            actions.update(id, body)
            res.status(200).json(body)
        }
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    projects.get(id).then(project => {
        if (!project.length) {
            res.status(404).json({ message: `Project with ID ${id} not found.`})
        } else {
            actions.remove(id)
            res.status(200).json({ message: `Message with id ${id} deleted.`})
        }
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })})
