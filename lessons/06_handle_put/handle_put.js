const Joi = require('joi')
const express = require('express')

const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: 'Nepali'},
    {id: 2, name: 'Chemistry'},
    {id: 3, name: 'English'},
]

function validateSchema(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    
    return schema.validate(course)
}


// get all courses
app.get('/api/courses', (req, res) => res.send(courses))

// get one course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id))

    if(!course) res.status(404).send('course with given id not found')

    res.send(course)
})

// add a new course
app.post('/api/courses', (req, res) => {

    const { error } = validateSchema(req.body)  //destructuring of result, {error} = result.error

    if(error) {
        res.status(400).send(error.details[0].message)
        return
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name // needs validation
    } // json object, needs parsing

    courses.push(course)

    res.send(course)
})

//update a course
app.put('/api/courses/:id', (req, res) => {

    // first check if the course exists or not
    const course = courses.find( c => c.id === parseInt(req.params.id))

    if(!course) {
        res.status(404).send('course with given id not found')
        return
    }


    // then validate the input
    const { error } = validateSchema(req.body)  //destructuring of result, {error} = result.error

    if(error) {
        res.status(400).send(error.details[0].message)
        return
    }

    // finally update the course
    course.name = req.body.name

    res.send(course)

})



const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))