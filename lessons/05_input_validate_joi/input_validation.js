// ** Never trust what the client sends you ! **

const express = require('express')

const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]
 // get all courses
app.get('/api/courses', (req, res) => res.send(courses))

// get one course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if(!course) res.status(404).send('course with given id not found')

    res.send(course)
})

// add a new course
app.post('/api/courses', (req, res) => {

    if(!req.body.name || req.body.name.length < '3') {
        //400 Bad Request
        res.status(400).send('Name is required and name should be minimum 3 characters long')
        return
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name // this input needs validation. Never trust what the client sends you.
    } //json object, needs to be parsed with express.json() middleware

    courses.push(course)

    res.send(course)
})

const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))