const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');
const cors = require('cors');


server.use(express.json());
server.get('/', (req, res) => {
    res.send('Lets the API live.')
})

server.use(cors())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)
server.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found'})
})

module.exports = server;
