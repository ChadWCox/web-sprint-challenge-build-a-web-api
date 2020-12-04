// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const projects = require('./projects-model')


router.get('/', (req, res) => {
    projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })})

router.get('/:id', (req, res) => {
    const { id } = req.params
    projects.get(id)
        .then(project => {
            if(!project) {
                res.status(404).json({ message: `No project with id ${id} found`})
            } else {
                res.status(200).json(project)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
        })})

router.post('/', (req, res) => {
    const body = req.body
    if(!body.name || !body.description){
        res.status(400).json({ message: 'Name and body are required'})
    } else {
    projects.insert(body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })}})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const body = req.body
    if(!body.name || !body.description){
        res.status(400).json({ message: 'Name and body are required'})
    } else {
        projects.update(id, body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err.message })
        })}})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    projects.remove(id)
    .then(project => {
        if(!project) {
            res.status(404).json({ message: `No project with id ${id} was found.`})
        } else {
            res.status(200).json({ message: "project deleted"})
        }})
        .catch(err => {
        res.status(500).json({ message: err.message })
    })})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    projects.getProjectActions(id)
        .then(projectAct => {
            if(!projectAct){
                res.status(404).json([])
            } else{
                res.status(200).json(projectAct)
            }})
        .catch(err => {
            res.status(500).json({ message: err.message })
        })})

module.exports = router