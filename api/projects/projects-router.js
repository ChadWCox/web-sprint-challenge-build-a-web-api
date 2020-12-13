// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const projects = require('./projects-model')
const { validatePro, validateProId } = require('../middleware/middleware')


router.get('/', (req, res) => {
    projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message })
})});

router.get('/:id', validateProId, (req, res) => {
        res.status(200).json(req.project)
});
        
router.post('/', validatePro, (req, res) => {
    const body = req.body
    projects.insert(body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.put('/:id', validatePro, validateProId, (req, res) => {
    const { id } = req.params
    const body = req.body
    projects.update(id, body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

router.delete('/:id', validateProId, (req, res) => {
    const { id } = req.params
    projects.remove(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

router.get('/:id/actions', validateProId, (req, res) => {
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