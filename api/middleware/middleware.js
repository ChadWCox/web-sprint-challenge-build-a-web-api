const projects = require('../projects/projects-model')
const actions = require('../actions/actions-model')

const validateProId = async (req, res, next) => {
    const { id } = req.params
    try {
        const project = await projects.get(id)
        if (!project) {
            res.status(404).json({ message: `Project with ID ${id} not found.`})
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

const validatePro = (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'Name and description fields are required.' })
    } else {
            next();
        }
};

const validateAct = (req, res, next) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: 'Project id, desription, and notes are required.' })
    } else {
            next();
        }
};

const validateActId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const action = await actions.get(id);
        if (!action) {
            res.status(404).json({ message: `Action with ID ${id} not found` })
        } else {
            req.action = action;
            next()
        }
    } catch (err) {
        res.status(500).json({ message: err.errorMessage })
    }
};



module.exports = { validateAct, validateActId, validatePro, validateProId } 