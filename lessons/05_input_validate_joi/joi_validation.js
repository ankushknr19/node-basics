// Never trust what the client sends you.
// normal validation logic with if() gets complex for complex inputs
// npm i joi
// joi is the most powerful schema description language and data validator for JavaScript
// first make joi schema, schema defines the shape of our object, like - do we have email or string, length of char, range of num  etc 

const Joi = require('joi') // returns a class, so pascal convention Joi
const express = require('express')

const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

//get all courses
app.get('/api/courses', (req, res) => res.send(courses))

//get one course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if(!course) res.status(404).send('course with given id not found')

    res.send(course)
})

// insert a new course
app.post('/api/courses', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required() //creates a schema object that matches the datatype string
    })

    const validationResult = schema.validate(req.body)

    if(validationResult.error) {
        // 400 bad request
        res.status(400).send(validationResult.error.details[0].message) // see validationResult.error, gives 'details' array
        return
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name // this input needs validation. Never trust what the client sends you.
    } //this is a json object, needs to be parsed with express.json() middleware

    courses.push(course)

    res.send(course)
})

const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))