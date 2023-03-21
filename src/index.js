const { request } = require('express')
const {v4: uuidv4} = require('uuid')
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

const projects = []

app.get('/projects', function(request, response) {
    return response.json(projects)
})

app.post('/projects', function(request, response) {
    const {name, owner} = request.body
    const project = {
        id: uuidv4(),
        name,
        owner
    }
    projects.push(project)

    return response.status(201).json(project)
})

app.put('/projects/:id', function(request, response) {
    const {id} = request.params
    const {name, owner} = request.body

    const projectIndex = projects.findIndex(p => p.id === id)

    if (projectIndex < 0) {
        return response.status(404).json({Error: 'Project not found'})
    }

    if (!name || !owner) {
        return response.status(400).json({error: 'Name and owner are required'})
    }

    const project = {
        id,
        name,
        owner
    }
    projects[projectIndex] = project

    return response.json(project)
})

app.delete('/projects/:id', function(request, response) {
    return response.json([
        'Project 1',
        'Project 2'
    ])
})

app.listen(port, () => {
    console.log(`Server started on port ${port}!`)
})