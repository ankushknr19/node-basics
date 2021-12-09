const Joi = require('joi')
const express = require('express')

const app = express()

app.use(express.json())

const courses = [
    {id:1, name: 'Economics'},
    {id:2, name: 'Account'},
    {id:3, name: 'Finance'},
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

    if(!course){
        res.status(404).send('course not found')
        return
    }

    res.send(course)
})

//insert a new course
app.post('/api/courses', (req, res) => {

    const {error} = validateSchema(req.body)

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

    // check if the course exist or not
    const course = courses.find( c => c.id === parseInt(req.params.id))

    if(!course){
        res.status(404).send('course not found')
        return
    }

    // validate input
    const { error } = validateSchema(req.body)

    if(error) {
        res.status(400).send(error.details[0].message)
        return
    }

    //update the course
    course.name = req.body.name

    res.send(course)
})


// handle delete request
app.delete('/api/courses/:id', (req, res) => {
    // check if the course exists or not
    const course = courses.find( c => c.id === parseInt(req.params.id))

    if(!course){
        res.status.send('course not found')
        return
    }

    //delete course

    //find the array index of the course
    const index = courses.indexOf(course)

    //use splice method to remove array element with given index
    courses.splice(index, 1) //(starting index, no. of elements to remove)

    res.send('course deleted successfully')
})




const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))